/**
 * - leetcode 63. 不同路径II
 *
 * 题目描述：
 *  一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
 *  机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
 *  现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
 *
 * 示例1：
 *  输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
 *  输出：2
 *  解释： 3x3 网格的正中间有一个障碍物，从左上角到右下角一共有 2 条不同的路径
 *    1. 向右 -> 向右 -> 向下 -> 向下
 *    2. 向下 -> 向下 -> 向右 -> 向右
 */

/**
 * 参考文档：
 *   https://programmercarl.com/0063.%E4%B8%8D%E5%90%8C%E8%B7%AF%E5%BE%84II.html
 */

/**
 * 时间复杂度：O(m × n)
 * 空间复杂度：O(m × n)
 */
function uniquePathsWithObstacles(obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;

  //如果在起点或终点出现了障碍，直接返回0
  if (obstacleGrid[m - 1][n - 1] === 1 || obstacleGrid[0][0] === 1) return 0;

  // 确定dp数组以及下标的含义，dp[i][j] ：表示从（0 ，0）出发，到(i, j) 有dp[i][j]条不同的路径
  const dp = Array(m)
    .fill()
    .map(() => Array(n).fill(0));

  // dp数组初始化
  for (let i = 0; i < m && obstacleGrid[i][0] === 0; i++) {
    dp[i][0] = 1;
  }

  for (let j = 0; j < n && obstacleGrid[0][j] === 0; j++) {
    dp[0][j] = 1;
  }

  // 确定遍历顺序
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // 确定递推公式
      dp[i][j] = obstacleGrid[i][j] === 1 ? 0 : dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
}

// test-case
const obstacleGrid1 = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];
const obstacleGrid2 = [
  [0, 1],
  [0, 0],
];
console.log('不同路径数：', uniquePathsWithObstacles(obstacleGrid1));
console.log('不同路径数：', uniquePathsWithObstacles(obstacleGrid2));
