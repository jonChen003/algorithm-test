/**
 * - leetcode 516: 最长回文子序列
 *
 * 回文是指：正着读反着读是一样的
 * 回文子串是要连续的，回文子序列可不是连续的！
 *
 * 题目描述：
 *  给定一个字符串 s ，找到其中最长的回文子序列，并返回该序列的长度
 *
 * 示例1：
 *  输入: s = "bbbab"
 *  输出: 4
 *  解释 一个可能的最长回文子序列为 "bbbb"
 *
 * 示例2：
 *  输入: s = "cbbd"
 *  输出: 2
 *  解释：一个可能的最长回文子序列为 "bb"
 *
 * 参考文档：
 *  https://programmercarl.com/0516.%E6%9C%80%E9%95%BF%E5%9B%9E%E6%96%87%E5%AD%90%E5%BA%8F%E5%88%97.htmlf
 */

function longestPalindromeSubseq(str) {
  // 确定dp数组以及下标的含义，dp[i][j]: 字符串s在[i, j]范围内最长的回文子序列的长度为dp[i][j]
  const dp = Array.from(Array(str.length), () => Array(str.length).fill(0));
  // dp数组初始化
  for (let i = 0; i < str.length; i++) dp[i][i] = 1;

  // 确定遍历顺序：自下而上，自左向右遍历
  for (let i = str.length - 1; i >= 0; i--) {
    for (let j = i + 1; j < str.length; j++) {
      // 确定递推公式
      if (str[i] === str[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[0][str.length - 1];
}

// test-case
console.log('longestPalindromeSubseq: ', longestPalindromeSubseq('bbbab'));
console.log('longestPalindromeSubseq: ', longestPalindromeSubseq('cbbd'));