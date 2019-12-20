/**
 * leetcode 165：比较版本号
 * 题目地址：https://leetcode-cn.com/problems/compare-version-numbers/
 */

const debug = require('debug')('compareVersion');

// 方法一
function compareVersion1(curV, reqV) {
  if (curV && reqV) {
    const curVerArr = curV.split('.');
    const reqVerArr = reqV.split('.');

    const minLength = Math.min(curVerArr.length, reqVerArr.length);
    let position = 0;
    let diff = 0;

    while (position < minLength) {
      diff = Number(curVerArr[position]) - Number(reqVerArr[position]);
      if (diff !== 0) break;
      position += 1;
    }
    diff = (diff !== 0) ? diff : (curVerArr.length - reqVerArr.length);
    return diff > 0;
  } else {
    debug('版本号不能为空');
    return false;
  }
}

// 方法二
// 假定每个版本位字节数都在5位以下
function normalize(version) {
  const paddingNum = ['0000', '000', '00', '0', ''];
  let arr = version.split('.');
  arr = arr.map((value) => {
    const len = value.length;
    return `${paddingNum[len]}${value}`;
  });
  debug('new-version---', arr.join(''));
  return arr.join('');
}

function compareVersion2(curV, reqV) {
  const newCurV = normalize(curV);
  const newReqV = normalize(reqV);
  return newCurV > newReqV;
}

const VERSION1 = '2.2.3';
const VERSION2 = '2.1.15';
debug('compareVersion_1：', compareVersion1(VERSION1, VERSION2));
debug('compareVersion_2：', compareVersion2(VERSION1, VERSION2));