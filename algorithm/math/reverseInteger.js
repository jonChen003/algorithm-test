/**
 * leetcode 7：整数反转
 * 题目描述：
 *  给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转
 * 示例：
 *  输入: 123
 *  输出: 321
 *
 *  输入: -123
 *  输出: -321
 *
 *  输入: 120
 *  输出: 21
 * 注意事项：
 *  假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2^31,  2^31 − 1]。
 *  请根据这个假设，如果反转后整数溢出那么就返回 0
 */
/* eslint-disable no-bitwise */

const debug = require('debug')('reverseInteger');

// 方法一
function reverseIntegerV1(num) {
  let result = 0;
  const sign = num < 0 ? -1 : 1;
  num *= sign; // 变成正数

  while (num !== 0) {
    result = result * 10 + (num % 10);
    num = ~~(num / 10); // 使用~~将操作数转化为32位有符号的整数
  }

  if (result > (2 ** 31) - 1 || result < -(2 ** 31)) return 0;
  return result * sign;
}

/**
 * 方法二：将整数转化为字符串
 * 主要思路：
 *  1、将整数转化为字符串
 *  2、将字符串反转
 *  3、判断是否有符号位
 *  4、重新转化为整数，并判断是否在指定范围内
 */
function reverseIntegerV2(num) {
  let numStr = num.toString().split('').reverse().join('');
  if (num < 0) {
    numStr = `-${numStr.slice(0, numStr.length - 1)}`;
  }
  const result = parseInt(numStr, 10);
  if (result > (2 ** 31) - 1 || result < -(2 ** 31)) return 0;
  return result;
}

const case1 = 123;
const case2 = -123;
const case3 = 120;
debug('case1: ', reverseIntegerV1(case1));
debug('case1: ', reverseIntegerV2(case1));

debug('case2: ', reverseIntegerV1(case2));
debug('case2: ', reverseIntegerV2(case2));

debug('case3: ', reverseIntegerV1(case3));
debug('case3: ', reverseIntegerV2(case3));