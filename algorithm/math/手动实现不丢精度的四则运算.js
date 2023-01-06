/**
 * 手动实现不丢精度的四则运算
 */

/* eslint-disable no-restricted-properties */

// 转化为整数进行运算
function add(a, b) {
  let c;
  let d;

  // a: 1.1
  // c: 1
  try {
    c = a.toString().split('.')[1].length;
  } catch (error) {
    c = 0;
  }

  // b: 2.22
  // d: 2
  try {
    d = b.toString().split('.')[1].length;
  } catch (error) {
    d = 0;
  }

  // e: 2
  const e = Math.pow(10, Math.max(c, d));
  // (110 + 222) / 100
  return (mul(a, e) + mul(b, e)) / e;
}

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

function mul(a, b) {
  let c = 0;

  // a: 1.11
  // b: 2.22
  // c: 4
  try {
    c += a.toString().split('.')[1].length;
  } catch (error) {}

  try {
    c += b.toString().split('.')[1].length;
  } catch (error) {}

  // (111 * 222) / 10^4
  const num1 = Number(a.toString().replace('.', ''));
  const num2 = Number(b.toString().replace('.', ''));
  return (num1 * num2) / Math.pow(10, c);
}

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
