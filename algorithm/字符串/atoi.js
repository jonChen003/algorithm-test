/**
 * - leetcode 8: 字符串转换整数
 * 题目描述：
 *  实现一个 atoi 函数，使其能将字符串转换成整数
 * 备注：
 *  类似于js中parseInt功能函数
 * 说明：
 *  假设我们的环境只能存储32位大小的有符号整数，那么其数值范围为[−231, 231 − 1]
 *  如果数值超过这个范围，qing返回 INT_MAX (231 − 1)或INT_MIN (−231)
 * 示例
 * 示例1：
 *  输入: "42"
 *  输出: 42
 * 示例2：
 *  输入: "   -42"
 *  输出: -42
 * 示例3：
 *  输入: "4193 with words"
 *  输出: 4193
 * 示例4：
 *  输入: "words and 987"
 *  输出: 0
 * 示例5：
 *  输入: "-91283472332"
 *  输出: -2147483648
 *  解释: 数字 "-91283472332" 超过 32 位有符号整数范围。 因此返回 INT_MIN (−231)
 */

/**
 * 解题思路：此题主要是要考虑多种情况，考虑测试用例的完备性
 */

function myAtoi(str) {
  const baseCharCode = '0'.charCodeAt(0);
  let num = 0;
  let sign = 1;
  str = str.trim();

  // 判断首字母是不是+/-号
  if (str[0] === '+' || str[0] === '-') {
    if (str[0] === '-') {
      sign = -1;
    }
    str = str.substring(1);
  }

  // 遍历转化
  for (let i = 0; i < str.length; i++) {
    const curChar = str[i];
    const curNum = curChar.charCodeAt(0) - baseCharCode;
    if (curNum >= 0 && curNum <= 9) {
      num *= 10;
      num += curNum;
    } else break;
  }

  const maxInt = 2 ** 31 - 1;
  const minNegInt = -(2 ** 31);
  num *= sign;

  if (num > 0 && num > maxInt) return maxInt;
  if (num < 0 && num < minNegInt) return minNegInt;

  return num;
}
