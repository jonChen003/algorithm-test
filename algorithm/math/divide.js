/* eslint-disable no-bitwise */

/**
 * leetcode 29：两数相除
 * 题目描述：
 *  给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。
 *  返回被除数 dividend 除以除数 divisor 得到的商
 *
 * 示例1：
 *  输入: dividend = 10, divisor = 3
 *  输出: 3
 * 示例2：
 *  输入: dividend = 7, divisor = -3
 *  输出: -2
 *
 * 说明：
 *  1、被除数和除数均为 32 位有符号整数。
 *  2、除数不为 0
 *  3、假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−2^31,  2^31 − 1]。本题中，如果除法结果溢出，则返回 2^31 − 1
 */

/**
 * 解题思路：这题是除法，所以先普及下除法术语
 * 商，公式是：(被除数-余数)÷除数=商，记作：被除数÷除数=商...余数，是一种数学术语。
 * 在一个除法算式里，被除数、余数、除数和商的关系为：(被除数-余数)÷除数=商，记作：被除数÷除数=商...余数，
 * 进而推导得出：商×除数+余数=被除数。
 *
 * 要求商，我们首先想到的是减法，能被减多少次，那么商就为多少，但是明显减法的效率太低
 *
 * 那么我们可以用位移法，因为计算机在做位移时效率特别高，向左移1相当于乘以2，向右位移1相当于除以2
 *
 * 我们可以把一个dividend（被除数）先除以2^n，n最初为31，不断减小n去试探,当某个n满足dividend/2^n>=divisor时，
 *
 * 表示我们找到了一个足够大的数，这个数*divisor是不大于dividend的，所以我们就可以减去2^n个divisor，以此类推
 *
 * 我们可以以100/3为例
 *
 * 2^n是1，2，4，8...2^31这种数，当n为31时，这个数特别大，100/2^n是一个很小的数，肯定是小于3的，所以循环下来，
 *
 * 当n=5时，100/32=3, 刚好是大于等于3的，这时我们将100-32*3=4，也就是减去了32个3，接下来我们再处理4，同样手法可以再减去一个3
 *
 * 所以一共是减去了33个3，所以商就是33
 *
 * 这其中得处理一些特殊的数，比如divisor是不能为0的，Integer.MIN_VALUE和Integer.MAX_VALUE
 *
 */

const debug = require('debug')('divide');

// 方法一：使用移位操作符
/**
 * @param {*} dividend：被除数
 * @param {*} divisor：除数
 */
function divideV1(dividend, divisor) {
  if (dividend === 0) return 0;
  const negative = (dividend ^ divisor) < 0; // 用异或来计算是否符号相异
  dividend = Math.abs(dividend);
  divisor = Math.abs(divisor);
  let result = 0;
  for (let i = 31; i >= 0; i--) {
    if (dividend >> i >= divisor) {
      // dividend >> i ：dividend / 2^i，例如100/32 = 3
      result += 1 << i; // result += 2^i, result += 32
      dividend -= divisor << i; // divisor * 2^i，divisor * 32; dividend = dividend - divisor * 2^i;
    }
  }
  if (negative && result < -(2 ** 31)) {
    return -(2 ** 31);
  }
  if (!negative && result > (2 ** 31) - 1) {
    return (2 ** 31) - 1;
  }
  return negative ? -result : result;
}

/* eslint-disable no-restricted-properties */
// 方法二：
function divideV2(dividend, divisor) {
  let result = 0;
  let sign = 1;
  let mul = 1;
  if ((dividend > 0 && divisor < 0) || (dividend < 0 && divisor > 0)) {
    sign = -1;
  }
  dividend = Math.abs(dividend);
  divisor = Math.abs(divisor);

  let divisor2 = divisor;

  while (dividend >= divisor2) {
    if (dividend > divisor2 + divisor2) {
      divisor2 += divisor2;
      mul += mul;
    }
    dividend -= divisor2;
    result += mul;
  }

  while (dividend >= divisor) {
    dividend -= divisor;
    result += 1;
  }

  if (sign === 1 && result > Math.pow(2, 31) - 1) {
    return Math.pow(2, 31) - 1;
  } else if (sign === -1 && result < -Math.pow(2, 31)) {
    return -Math.pow(2, 31);
  }

  return sign === 1 ? result : -result;
}

const dividend = 20;
const divisor = 3;

debug('result：', divideV2(dividend, divisor));