/**
 * - leetcode 64. 最小路径和
 *
 * 题目描述：
 * 	给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 * 	说明：每次只能向下或者向右移动一步
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
/**
 * 算法思想：动态规划
 */
const minPathSum = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  // dp[i][j]: 走到[i,j]网格时最小路径和
  const dp = Array(m)
    .fill(0)
    .map(() => Array(n).fill(0));

  // dp数组初始化
  dp[0][0] = grid[0][0];

  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }

  for (let j = 1; j < n; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }

  return dp[m - 1][n - 1];
};
