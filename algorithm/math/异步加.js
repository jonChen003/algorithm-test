/**
 * - 异步加逻辑实现
 * 题目描述：
 * 	假设有一台本地机器，无法做加减乘除运算（包括位运算），因此无法执行 a + b、a+ = 1 这样的 JS 代码，
 * 然后我们提供一个服务器端的 HTTP API，可以传两个数字类型的参数，响应结果是这两个参数的和，
 * 这个 HTTP API 的 JS SDK（在本地机器上运行）的使用方法如下：
 * asyncAdd(3, 5, (err, result) => {
 *   console.log(result); // 8
 * });
 * 要求：现在要求在本地机器上实现一个 sum 函数，支持以下用法：
 * (async () => {
 *   const result1 = await sum(1, 4, 6, 9, 2, 4);
 *   const result2 = await sum(3, 4, 9, 2, 5, 3, 2, 1, 7);
 *   const result3 = await sum(1, 6, 0, 5);
 *   console.log([result1, result2, result3]); // [26, 36, 12]
 * })();
 */

function asyncAdd(a, b, callback) {
  const res = a + b;
  setTimeout(() => callback(null, res), 100);
}

/// 方法一：实现类似generator的功能
function sum(...args) {
  return new Promise((resolve, reject) => {
    let s = 0;

    function next(i) {
      asyncAdd(s, args[i], (_, result) => {
        if (i < args.length) {
          s = result;
          next(i + 1);
        } else {
          resolve(s);
        }
      });
    }

    next(0);
  });
}

/// 方法二：Promise.all + 递归
async function sum2(...args) {
  // 1. 确定递归中止条件
  if (args.length === 1) {
    return args[0];
  }

  // 2. 补齐为偶数个数的数组
  const nums = [...args];
  if (nums.length % 2 !== 0) {
    nums.push(0);
  }

  // 3. 两两相加作为一个Promise task
  const tasks = [];
  for (let i = 0; i < nums.length; i += 2) {
    tasks.push(
      new Promise((resolve) =>
        asyncAdd(nums[i], nums[i + 1], (_, res) => resolve(res))
      )
    );
  }

  // 4. 执行Promise.all
  const sumList = await Promise.all(tasks);

  // 5. 对结果递归执行
  return sum2(...sumList);
}

// test-case
(async () => {
  const res1 = await sum(1, 4, 6, 9, 2, 4);
  const res2 = await sum2(1, 4, 6, 9, 2, 4);
  console.log('res1---', res1);
  console.log('res2---', res2);
})();
