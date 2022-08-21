/**
 * 阶乘的实现
 *  1、递归解法
 *  2、非递归解法
 */

const debug = require('debug')('Factorial');

// 递归解法
function f(n) {
  if (n === 1) return 1;
  return n * f(n - 1);
}

// 非递归解法
function fn(n) {
  let res = n;
  while (n > 1) {
    res *= n;
  }

  return res;
}