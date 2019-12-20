/**
 * 实现一个flattenDeep函数，把嵌套的数组扁平化
 */

const debug = require('debug')('flattenDeep');

// 方法一：利用es6新增的flat方法(Array.prototype.flat)
function flattenDeepV1(arr, deepLength) {
  return arr.flat(deepLength);
}

// 方法二：递归-基本解法
function flattenDeepV2(arr) {
  const result = [];

  ((function flat(array) {
    array.forEach((el) => {
      if (Array.isArray(el)) flat(el);
      else result.push(el);
    });
  })(arr));

  return result;
}

// 方法三：递归-利用reduce
function flattenDeepV3(arr) {
  return Array.isArray(arr)
    ? arr.reduce((a, b) => [...a, ...flattenDeepV3(b)], [])
    : [arr];
}

function flattenDeepV4(arr) {
  return arr.reduce(
    (acc, val) => (Array.isArray(val) ? acc.concat(flattenDeepV4(val)) : acc.concat(val)),
    [],
  );
}

// 方法四：非递归-利用栈
function flattenDeepV5(arr) {
  const stack = [...arr];
  const result = [];

  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next); // 使用push送回内层数组中的元素
    } else {
      result.push(next);
    }
  }

  // 使用reverse恢复原数组顺序
  return result.reverse();
}

// test-case
const testArr = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]];

// debug('fv1: ', flattenDeepV1(testArr, 10));
debug('fv2: ', flattenDeepV2(testArr));
debug('fv3: ', flattenDeepV3(testArr));
debug('fv4: ', flattenDeepV4(testArr));
debug('fv5: ', flattenDeepV5(testArr));
