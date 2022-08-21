/**
 * - leetcode 1143. 最长公共子序列
 *
 * 题目描述：
 *  给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列的长度
 *
 * 示例1：
 *  输入：text1 = "abcde", text2 = "ace"
 *  输出：3
 *  解释：最长公共子序列是 "ace"，它的长度为 3
 */

/**
 * 参考文档：
 *   https://programmercarl.com/1143.%E6%9C%80%E9%95%BF%E5%85%AC%E5%85%B1%E5%AD%90%E5%BA%8F%E5%88%97.html
 */

//! !!!  T[i][j] 计算，记住口诀：相等左上角加一，不等取上或左最大值
function longestCommonSubsequence(text1, text2) {
  // 确定dp数组以及下标的含义，dp[i][j]: 长度为i的字符串text1与长度为j的字符串text2的最长公共子序列为dp[i][j]
  // dp数组初始化：长度为i的test1和空串的最长公共子序列自然是0，所以dp[i][0] = 0; 同理dp[0][j]也是0
  const dp = Array.from(Array(text1.length + 1), () =>
    Array(text2.length + 1).fill(0)
  );

  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // return dp[text1.length][text2.length];
  // 进一步：找出这个最长公共子序列
  /* eslint-disable no-use-before-define */
  return getLCS(text1, text2, dp);
}

function getLCS(text1, text2, dp) {
  let i = text1.length;
  let j = text2.length;
  const result = [];

  while (i > 0 && j > 0) {
    if (text1[i - 1] === text2[j - 1]) {
      result.unshift(text1[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      // 向上回退
      i--;
    } else {
      // 向左回退
      j--;
    }
  }

  return result;
}

// test-case
console.log('lcs: ', longestCommonSubsequence('abcde', 'ace'));
console.log('lcs: ', longestCommonSubsequence('abc', 'abc'));
console.log('lcs: ', longestCommonSubsequence('abc', 'def'));

// -------------------------------------------------------------

// 方式二：在原字符串之前添加一个占位空字符
// 两个序列，长度不一定相等, 从计算表格考虑，把input1和input2首位都补一个用于占位的空字符串
function longestSeq(input1, input2, n1, n2) {
  const T = []; // T[i][j]表示 公共子序列长度
  for (let i = 0; i < n1; i++) {
    T[i] = [];
    for (let j = 0; j < n2; j++) {
      if (j === 0 || i === 0) {
        T[i][j] = 0;
        continue;
      }
      if (input1[i] === input2[j]) {
        T[i][j] = T[i - 1][j - 1] + 1;
      } else {
        T[i][j] = Math.max(T[i - 1][j], T[i][j - 1]);
      }
    }
  }

  findValue(input1, input2, n1, n2, T);

  return T;
}

//! !!如果它来自左上角加一，则是子序列，否则向左或上回退，如果上左一样大，优先取左。
// findValue过程，其实就是和 就是把T[i][j]的计算反过来。
function findValue(input1, input2, n1, n2, T) {
  let i = n1 - 1;
  let j = n2 - 1;
  const result = []; // 结果保存在数组中
  while (i > 0 && j > 0) {
    if (input1[i] === input2[j]) {
      result.unshift(input1[i]);
      i--;
      j--;
    } else {
      // 向左或向上回退
      if (T[i - 1][j] > T[i][j - 1]) {
        // 向上回退
        i--;
      } else {
        // 向左回退
        j--;
      }
    }
  }

  console.log('寻找子串结果：', result);
}

const input2 = ['', 'a', 'b', 'c', 'a', 'd', 'f'];

const input1 = ['', 'a', 'c', 'b', 'a', 'd'];

const n1 = input1.length;

const n2 = input2.length;

// console.log('二维数组：', longestSeq(input1, input2, n1, n2));
