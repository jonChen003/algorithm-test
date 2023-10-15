/**
 * - 手动实现不丢精度的四则运算
 */

/* eslint-disable no-restricted-properties */

/**
 * - 整体思想：转化为整数进行运算
 * 关键是乘法的实现，其他三个都是基于乘法实现
 */

/**
 * 实现加法
 */
function add(a, b) {
  let c;
  let d;

  // a: 1.1
  // 取a的小数位数 c: 1
  try {
    c = a.toString().split('.')[1].length;
  } catch (error) {
    c = 0;
  }

  // b: 2.22
  // 取b的小数位数 d: 2
  try {
    d = b.toString().split('.')[1].length;
  } catch (error) {
    d = 0;
  }

  // 取a和b最长的小数位数 e: 2
  const e = Math.pow(10, Math.max(c, d));
  // (110 + 222) / 100
  return (mul(a, e) + mul(b, e)) / e;
}

/**
 * 实现减法（和加法逻辑类似）
 */
function sub(a, b) {
  let c;
  let d;

  try {
    c = a.toString().split('.')[1].length;
  } catch (error) {
    c = 0;
  }

  try {
    d = b.toString().split('.')[1].length;
  } catch (error) {
    d = 0;
  }

  const e = Math.pow(10, Math.max(c, d));
  return (mul(a, e) - mul(b, e)) / e;
}

/**
 * 实现乘法
 *  a: 1.11
 *  b: 2.22
 *  c: 4
 */
function mul(a, b) {
  let c = 0;

  // c: 小数点后面的位数和
  try {
    c += a.toString().split('.')[1].length;
  } catch (error) {}

  try {
    c += b.toString().split('.')[1].length;
  } catch (error) {}

  /**
   * 关键：通过替换掉小数点，再转换成整数
   * (111 * 222) / 10^4
   */
  const num1 = Number(a.toString().replace('.', ''));
  const num2 = Number(b.toString().replace('.', ''));
  return (num1 * num2) / Math.pow(10, c);
}

/**
 * 实现除法
 */
function div(a, b) {
  let c = 0;
  let d = 0;

  try {
    c = a.toString().split('.')[1].length;
  } catch (error) {}

  try {
    d = b.toString().split('.')[1].length;
  } catch (error) {}

  const num1 = Number(a.toString().replace('.', ''));
  const num2 = Number(b.toString().replace('.', ''));

  return mul(num1 / num2, Math.pow(10, d - c));
}

// test-case
console.log('add: ', add(1.11, 2.22));
console.log('sub: ', sub(2.22, 1.22));
console.log('mul: ', mul(1.1, 2.22));
console.log('div: ', div(1.1, 2.22));
