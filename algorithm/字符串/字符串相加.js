/**
 * - leetcode 415. 字符串相加
 * https://leetcode.cn/problems/add-strings/description/
 *
 * 题目描述：
 * 	给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。
 * 	你不能使用任何內建的用于处理大整数的库（比如 BigInteger）， 也不能直接将输入的字符串转换为整数形式。
 *
 * 	示例 1：
 * 	输入：num1 = "11", num2 = "123"
 * 	输出："134"

 * 	示例 2：
 * 	输入：num1 = "456", num2 = "77"
 * 	输出："533"
 */

/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
/**
 * 算法思想：从后往前依次做加法
 */
const addStrings = function (str1, str2) {
  let i = str1.length - 1;
  let j = str2.length - 1;
  // 进位
  let add = 0;
  const res = [];

  // 只要str1没结束或者str2没结束或者有进位循环继续
  while (i >= 0 || j >= 0 || add) {
    // 当前的两个相加数字
    const x = i >= 0 ? Number(str1[i]) : 0;
    const y = j >= 0 ? Number(str2[j]) : 0;

    // 计算当前值和进位
    const value = x + y + add;
    res.unshift(value % 10);
    add = Math.floor(value / 10);

    i--;
    j--;
  }

  return res.join('');
};
