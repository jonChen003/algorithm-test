/**
 * - leetcode 5: 最长回文子串
 * 回文是指：正着读反着读是一样的
 *
 * 题目描述：
 *  给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000
 *
 * 示例1：
 *  输入: "babad"
 *  输出: "bab"
 *  注意: "aba" 也是一个有效答案
 * 示例2：
 *  输入: "cbbd"
 *  输出: "bb"
 *
 * 参考解法：
 *  https://www.zhihu.com/question/40965749
 *  https://leetcode-cn.com/problems/longest-palindromic-substring/comments/
 *  https://github.com/chihungyu1116/leetcode-javascript/blob/master/5%20Longest%20Palindromic%20Substring.js
 */

/**
 * 算法思想：
 * 求最长回文子串一般情况下有四种解法：
 *  1. 暴力解法，复杂度O(n^3)
 *  2. 动态规划，复杂度O(n^2)
 *  3. 中心扩展法，复杂度O(n^2)
 *  3. Manacher算法，复杂度O(n)
 *
 * 下面主要采用中心扩展法解决该问题
 */

/**
 * - 中心扩展法，复杂度O(n^2)
 *  算法主要思想：
 *    回文就是中心对称的单词
 *    从字符的中心开始，向两边扩散检查回文
 *    从头开始，以每一个位置为中心遍历一遍
 *    注意：回文需要同时检测单核‘aba’以及双核'abba'的情况
 */

// 双指针法
function checkPalindrome(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left -= 1;
    right += 1;
  }

  return s.substring(left + 1, right);
}

function longestPalindrome(s) {
  if (!s || s.length === 0) {
    return '';
  }

  const len = s.length;
  let result = '';
  let left = 0;
  let right = 0;

  // 从头开始，以每一个位置为中心遍历一遍
  for (let i = 0; i < len; i++) {
    left = i;
    right = i;
    // 单核情况
    let str = checkPalindrome(s, left, right);
    if (str.length > result.length) {
      result = str;
    }
    // 双核情况
    str = checkPalindrome(s, left, right + 1);
    if (str.length > result.length) {
      result = str;
    }
  }

  return result;
}

// test-case
const str1 = 'babad';
const str2 = 'cbbad';

console.log('str1: ', longestPalindrome(str1));
console.log('str2: ', longestPalindrome(str2));

/**
 * - 动态规划方法（推荐）
 * dp[i][j] 来判断[i, j]之间的字符是否是回文子串，值为boolean
 * 递推公式：
 *  dp[i][j]取值：
 *    1、s[i] === s[j]
 *    2、dp[i + 1]dp[j - 1]值为true，也就是i + 1 ~ j - 1之间的字符也应该是回文子串
 */
function longestPalindromeV2(s) {
  // 确定dp数组以及下标的含义
  // dp表示区间范围[i,j]的子串是否是回文子串，如果是回文子串，dp[i][j]为true，否则为false
  // i和j分别代表字符索引
  const dp = Array.from(Array(s.length), () => Array(s.length).fill(false));
  let result = '';

  // 确定遍历顺序：从下到上，从左到右
  for (let i = s.length - 1; i >= 0; i--) {
    for (let j = i; j < s.length; j++) {
      // 确定递推公式
      if (s[i] === s[j]) {
        if (j - i <= 1 || dp[i + 1][j - 1]) {
          result = result.length > j - i + 1 ? result : s.slice(i, j + 1);
          dp[i][j] = true;
        }
      }
    }
  }

  return result;
}

// test-case
console.log('longestPalindromeV2: ', longestPalindromeV2('babad'));
console.log('longestPalindromeV2: ', longestPalindromeV2('cbbd'));
