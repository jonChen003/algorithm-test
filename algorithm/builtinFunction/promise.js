/* eslint-disable consistent-return, no-loop-func, no-plusplus */
const debug = require('debug')('promise');

// Promise构造函数实现
function Promise(executor) {
  const self = this;
  self.status = 'pending';
  self.data = undefined;
  self.onResolvedCallback = [];
  self.onRejectedCallback = [];

  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'resolved';
      self.data = value;
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected';
      self.data = reason;
    }
  }

  try {
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

// then方法实现
Promise.prototype.then = function (onResolved, onRejected) {
  const self = this;

  // then参数不是function，以如下方式处理
  // 同时考虑值穿透问题
  onResolved = typeof onResolved === 'function' ? onResolved : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : reason => reason;

  if (self.status === 'resolved') {
    return new Promise((resolve, reject) => {
      try {
        const res = onResolved(self.data);
        if (res instanceof Promise) {
          res.then(resolve, reject);
        }
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
  }

  if (self.status === 'rejected') {
    return new Promise((resolve, reject) => {
      try {
        const res = onRejected(self.data);
        if (res instanceof Promise) {
          res.then(resolve, reject);
        }
        reject(res);
      } catch (e) {
        reject(e);
      }
    });
  }
};

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
        Promise.resolve(promises[i]).then((data) => {
          result[i] = data;
          // 所有的promises状态都是fulfilled，promise.all返回的实例才变成fulfilled态
          if (++index === promises.length) {
            resolve(result);
          }
        }, (err) => {
          reject(err);
        });
      }
    }
  });
};

// test-case

const p = new Promise((resolve, reject) => {
  resolve('resolve');
});
p.then((res) => {
  debug('resolved：', res);
});
p.catch((err) => {
  debug('reject：', err);
});

const p2 = new Promise((resolve, reject) => {
  reject(new Error('rejectd'));
});
p2.then((res) => {
  debug('resolved：', res);
}, (reason) => {
  debug('reject：', reason);
});
