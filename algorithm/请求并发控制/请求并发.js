/**
 * - 实现请求并发控制
 * 	比如并发5个请求，当一个请求返回时，开始添加下一个，每次保证5个并行；
 *  不是分批并行
 */

/**
 * - 方式一：首批并行 + next机制
 */

function multiRequest_v0(urls = [], limit) {
  // 请求总数量
  const len = urls.length;
  // 根据请求数量创建一个数组来保存请求的结果
  const result = new Array(len).fill(false);
  // 当前完成的数量
  let count = 0;

  return new Promise((resolve, reject) => {
    // 请求limit个
    while (count < limit) {
      next();
    }

    function next() {
      // 临时变量保存当前的索引位置
      let current = count++;

      // 处理边界条件
      if (current >= len) {
        resolve(result);
        return;
      }

      const url = urls[current];

      fetch(url)
        .then((res) => {
          // 保存请求结果
          result[current] = res;

          // 请求没有全部完成, 就递归
          if (current < len) {
            next();
          }
        })
        .catch((err) => {
          result[current] = err;

          // 请求没有全部完成, 就递归
          if (current < len) {
            next();
          }
        });
    }
  });
}

function multiRequest_v1(urls = [], limit) {
  const totalNum = urls.length;
  // 保存请求的结果
  const result = [];
  // 当前并发数
  let currentCount = 0;
  let completedIndex = 0;

  return new Promise((resolve, reject) => {
    while (currentCount < limit) {
      next();
    }

    const next = () => {
      if (completedIndex >= totalNum) {
        return resolve(result);
      }

      if (currentCount < limit) {
        const url = urls[completedIndex];
        fetchUrl(url, completedIndex);
        completedIndex++;
      }
    };

    const fetchUrl = (url, index) => {
      currentCount++;

      fetch(url)
        .then((res) => {
          result[index] = res;
        })
        .catch((error) => {
          result[index] = null;
        })
        .finally(() => {
          currentCount--;

          next();
        });
    };
  });
}

/**
 * - 方式二：使用promise.all + promise.race（推荐）
 * 参考文档：
 * 	https://juejin.cn/post/7219961144584552504?searchId=20230819164136A4ED1432BAE7B26505B7#heading-6
 *  https://juejin.cn/post/6976028030770610213?searchId=20230819164136A4ED1432BAE7B26505B7
 */
async function multiRequest_v2(urls, limit) {
  const promiseList = [];

  // 当前的并发池,用Set结构方便删除
  // set也是Iterable<any>[]类型，因此可以放入到race里
  const pool = new Set();

  // 开始并发执行所有的任务
  for (const url of urls) {
    // 开始执行前，先await判断当前的并发数是否超过限制
    if (pool.size >= limit) {
      await Promise.race(pool);
    }

    const promise = fetch(url);

    const cb = () => {
      pool.delete(promise);
    };
    // 请求结束后，从pool里面移除
    promise.then(cb, cb);

    pool.add(promise);

    promiseList.push(promise);
  }

  return Promise.allSettled(promiseList);
}
