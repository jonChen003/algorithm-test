/**
 * - leetcode 221. 最大正方形面积
 *
 * 题目描述：
 * 	在一个由 '0' 和 '1' 组成的二维矩阵内，找到只包含 '1' 的最大正方形，并返回其面积。
 *
 * 示例：
		输入：matrix =
		[
			["1","0","1","0","0"],
			["1","0","1","1","1"],
			["1","1","1","1","1"],
			["1","0","0","1","0"]
		]
		输出：4

 *  https://leetcode.cn/problems/maximal-square/description/
 */

/**
 * 推导递推公式：
 * 	第i行第j列为右下角的正方形边长由：左上角、左边、上边三个因素来推导
 */
// - 二维dp数组，双层循环
function maximalSquare(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  // (m + 1) * (n + 1)
  // dp[i][j]: 表示第i行第j列为右下角「边界」，所能构成的 「最大正方形边长」
  const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

  let maxLen = 0;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (matrix[i - 1][j - 1] === '1') {
        dp[i][j] = 1 + min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
        maxLen = Math.max(maxLen, dp[i][j]);
      }
    }
  }

  return maxLen * maxLen;
}

function min(a, b, c) {
  return Math.min(Math.min(a, b), c);
}

/**
 * m * n
 * dp[i][j]: 表示第i行第j列为右下角「边界」，所能构成的 「最大正方形边长」
 */
const maximalSquare_v2 = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  const dp = Array.from(Array(m), () => Array(n).fill(0));
  let maxLen = 0;

  // dp数组初始化
  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === '1') {
      dp[i][0] = 1;
      maxLen = 1;
    }
  }
  for (let j = 0; j < n; j++) {
    if (matrix[0][j] === '1') {
      dp[0][j] = 1;
      maxLen = 1;
    }
  }

  // 从(1, 1)位置开始遍历
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === '1') {
        dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
        maxLen = Math.max(maxLen, dp[i][j]);
      }
    }
  }

  return maxLen * maxLen;
};

// test-case
const matrix = [
  ['1', '0', '1', '0', '0'],
  ['1', '0', '1', '1', '1'],
  ['1', '1', '1', '1', '1'],
  ['1', '0', '0', '1', '0'],
];

const matrix2 = [
  ['1', '0', '1', '0', '0'],
  ['1', '0', '1', '1', '1'],
  ['1', '1', '1', '1', '1'],
  ['1', '0', '1', '1', '1'],
];

console.log('res---', maximalSquare(matrix));
console.log('res2---', maximalSquare(matrix2));
