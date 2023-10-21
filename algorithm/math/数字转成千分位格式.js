/**
 * - 数字或者数字字符串转成千分位格式
 */

const addSeparator = (str) => {
  let num = Number(str);
  const arr = [];

  while (num) {
    const rest = num % 1000;
    arr.unshift(rest);
    num = Math.floor(num / 1000);
  }

  return arr.join(',');
};

// test-case
const str1 = '1234567789';

console.log('addSeparator---', addSeparator(str1));
