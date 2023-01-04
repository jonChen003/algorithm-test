/**
 * - 实现36进制转换
 * 进制转换主要原理：除x取余，逆序排列
 */

function numTo36(num) {
  const res = [];

  while (num) {
    const rest = num % 36;
    res.unshift(numToChar(rest));
    num = Math.floor(num / 36);
  }

  return res.join('');
}

function numToChar(num) {
  return num < 10 ? num : String.fromCharCode(97 + (num - 10));
}

console.log('res: ', numTo36(35));