/**
 * - leetcode 14: 最长公共前缀
 * 题目描述：
 *  编写一个函数来查找字符串数组中的最长公共前缀
 *  如果不存在公共前缀，返回空字符串 ""
 * 示例：
 * 示例1：
 *  输入: ["flower","flow","flight"]
 *  输出: "fl"
 * 示例2：
 *  输入: ["dog","racecar","car"]
 *  输出: ""
 *  解释: 输入不存在公共前缀
 */

/**
 * @param {string[]} strs
 * @return {string}
 */

function longestCommonPrefix(strs) {
  const len = strs.length;
  let result = '';

  if (!strs || len === 0) return result;

  // 以第一个字符串作为标准
  for (let i = 0; i < strs[0].length; i++) {
    const curChar = strs[0][i];

    // 依次对比其他字符串中的相应字符
    for (let j = 1; j < len; j++) {
      if (curChar !== strs[j][i]) return result;
      if (strs[j].length === i) return result;
    }

    result += curChar;
  }

  return result;
}

// test-case
const strs1 = ['flower', 'flow', 'flight'];
const strs2 = ['dog', 'racecar', 'car'];

console.log('strs1: ', longestCommonPrefix(strs1));
console.log('strs2: ', longestCommonPrefix(strs2));