/**
 * - leetcode 647: 回文子串
 *
 * 回文是指：正着读反着读是一样的
 *
 * 题目描述：
 *  给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目
 *
 * 示例1：
 *  输入: s = "abc"
 *  输出: 3
 *  解释 三个回文子串: "a", "b", "c"
 *
 * 示例2：
 *  输入: s = "aaa"
 *  输出: 6
 *  解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
 *
 * 参考文档：
 *  https://programmercarl.com/0647.%E5%9B%9E%E6%96%87%E5%AD%90%E4%B8%B2.html
 */

// 方式一： 动态规划（推荐，易于理解）
/**
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(n^2)
 */
function countPalindromeSubstrings(str) {
  // 确定dp数组以及下标的含义，dp[i][j]: 表示区间范围[i,j] （注意是左闭右闭）的子串是否是回文子串
  // dp数组初始化：dp[i][j]初始化为false
  const dp = Array.from(Array(str.length), () => Array(str.length).fill(false));
  let result = 0;

  // 确定遍历顺序：自下而上，自左向右遍历
  for (let i = str.length - 1; i >= 0; i--) {
    for (let j = i; j < str.length; j++) {
      // 确定递推公式
      if (str[i] === str[j]) {
        if (j - i <= 1 || dp[i + 1][j - 1]) {
          result++;
          dp[i][j] = true;
        }
      }
    }
  }

  return result;
}

// 方式二：双指针法
/**
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 */
function countPalindromeSubstringsV2(str) {
  let result = 0;

  // 在遍历中心点的时候，要注意中心点有两种情况：一个元素可以作为中心点，两个元素也可以作为中心点
  for (let i = 0; i < str.length; i++) {
    // 以i为中心，往外找
    result += findByExtend(str, i, i);
    // 以i和i+1为中心，往外找
    result += findByExtend(str, i, i + 1);
  }

  return result;
}

function findByExtend(str, left, right) {
  let res = 0;

  while (left >= 0 && right < str.length && str[left] === str[right]) {
    res++;
    left--;
    right++;
  }

  return res;
}

// test-case
console.log('countPalindromeSubstrings: ', countPalindromeSubstrings('abc'));
console.log('countPalindromeSubstringsV2: ', countPalindromeSubstringsV2('abc'));

console.log('countPalindromeSubstrings: ', countPalindromeSubstrings('aaa'));
console.log('countPalindromeSubstringsV2: ', countPalindromeSubstringsV2('aaa'));