/* eslint-disable consistent-return, no-loop-func, no-plusplus */

/**
 * - Promise构造函数实现
 *  1、Promise中可能会存在异步逻辑
 *  2、then可能会链式调用
 *
 * 参考文档：
 *  https://juejin.cn/post/6945319439772434469 (推荐)
 *  https://juejin.cn/post/6844903625769091079
 */

function Promise(executor) {
  const self = this;
  self.status = 'pending';
  self.value = undefined;
  // 缓存成功与失败回调，then方法可能多次调用，所以这里回调都是数组
  self.onFulfilledCallback = [];
  self.onRejectedCallback = [];

  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'fulfilled';
      self.value = value;

      // 一旦resolve执行，调用成功数组的函数
      // resolve里面将所有成功的回调拿出来执行
      while (self.onFulfilledCallbacks.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        self.onFulfilledCallbacks.shift()(value);
      }
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected';
      self.value = reason;

      // 一旦reject执行，调用失败数组的函数
      // resolve里面将所有失败的回调拿出来执行
      while (self.onRejectedCallbacks.length) {
        self.onRejectedCallbacks.shift()(reason);
      }
    }
  }

  try {
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

// then方法实现，存在链式调用可能性，所以返回肯定是个promise
Promise.prototype.then = function (onResolved, onRejected) {
  const self = this;

  // then参数不是function，以如下方式处理
  // 同时考虑值穿透问题
  onResolved = typeof onResolved === 'function' ? onResolved : (value) => value;
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : (reason) => {
          throw reason;
        };

  const promise2 = new Promise((resolve, reject) => {
    const fulfilledAsyncTask = () => {
      // 之所以使用异步，是因为要等待 promise2 完成初始化，要不然下面resolvePromise里面使用promise2会报错
      setTimeout(() => {
        try {
          const res = onResolved(self.value);
          // resolvePromise函数，判断处理onFulfilled()或onRejected()执行后的值
          resolvePromise(promise2, res, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    };

    const rejectedAsyncTask = () => {
      setTimeout(() => {
        try {
          const res = onRejected(self.value);
          resolvePromise(promise2, res, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    };

    if (self.status === 'fulfilled') {
      fulfilledAsyncTask();
    }

    if (self.status === 'rejected') {
      rejectedAsyncTask();
    }

    if (self.status === 'pending') {
      // onResolved push到成功数组
      self.onFulfilledCallbacks.push(fulfilledAsyncTask);

      // onRejected push到失败数组
      self.onRejectedCallbacks.push(rejectedAsyncTask);
    }
  });

  return promise2;
};
/**
 * 首先，要看res是不是promise。
 * 如果是promise，则取它的结果，作为新的promise2成功的结果
 * 如果是普通值，直接作为promise2成功的结果
 * 所以要比较res和promise2
 * resolvePromise的参数有promise2（默认返回的promise）、res（我们自己return的对象）、resolve、reject
 * resolve和reject是promise2的
 */
// 简化版
function resolvePromise(promise2, res, resolve, reject) {
  // 处理循环引用：如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise2 === res) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<Promise>')
    );
  }

  // 判断res是不是 MyPromise 实例对象
  if (res instanceof Promise) {
    // res.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    res.then(resolve, reject);
  } else {
    // 普通值
    resolve(res);
  }
}

// 非简化版
function resolvePromiseV2(promise2, res, resolve, reject) {
  // 处理循环引用
  if (res === promise2) {
    // reject报错
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  // 防止多次调用
  let called;
  // x不是null 且x是对象或者函数
  if (res != null && (typeof res === 'object' || typeof res === 'function')) {
    try {
      // 如果then是函数，就默认是promise了
      let then = res.then;
      if (typeof then === 'function') {
        // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
        then.call(
          res,
          (y) => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            // resolve的结果依旧是promise 那就继续解析
            resolvePromise(promise2, y, resolve, reject);
          },
          (err) => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            reject(err); // 失败了就失败了
          }
        );
      } else {
        resolve(res); // 直接成功即可
      }
    } catch (e) {
      // 也属于失败
      if (called) return;
      called = true;
      // 取then出错了那就不要在继续执行了
      reject(e);
    }
  } else {
    resolve(res);
  }
}

// catch方法实现
Promise.prototype.catch = function (onRejected) {
  this.then(null, onRejected);
};

// Promise.all实现
Promise.all = function (promises) {
  // promises是可迭代对象，省略参数合法性检查
  return new Promise((resolve, reject) => {
    // 将可迭代对象转换成数组
    promises = Array.from(promises);
    if (promises.length === 0) {
      resolve([]);
    } else {
      const result = [];
      let index = 0;
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(
          (value) => {
            result[i] = value;
            // 所有的promises状态都是fulfilled，promise.all返回的实例才变成fulfilled态
            if (++index === promises.length) {
              resolve(result);
            }
          },
          (err) => {
            reject(err);
          }
        );
      }
    }
  });
};

// test-case

const p = new Promise((resolve, reject) => {
  resolve('resolve');
});
p.then((res) => {
  console.log('resolved：', res);
});
p.catch((err) => {
  console.log('reject：', err);
});

const p2 = new Promise((resolve, reject) => {
  reject(new Error('rejectd'));
});
p2.then(
  (res) => {
    console.log('resolved：', res);
  },
  (reason) => {
    console.log('reject：', reason);
  }
);
