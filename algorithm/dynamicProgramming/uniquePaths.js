/**
 * - leetcode 62. 不同路径
 *
 * 题目描述：
 *  一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
 *  机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
 *  问总共有多少条不同的路径？
 *
 * 示例1：
 *  输入：m = 2, n = 3
 *  输出：3
 *  解释： 从左上角开始，总共有 3 条路径可以到达右下角。
 *    1. 向右 -> 向右 -> 向下
 *    2. 向右 -> 向下 -> 向右
 *    3. 向下 -> 向右 -> 向右
 *
 * 备注：
 *  本题其实也就是从棋盘左上角 (0,0) 走到一个坐标(x,y)，走法总数
 */

/**
 * 参考文档：
 *   https://programmercarl.com/0062.%E4%B8%8D%E5%90%8C%E8%B7%AF%E5%BE%84.html
 */

/**
 * 时间复杂度：O(m × n)
 * 空间复杂度：O(m × n)
 */
function uniquePaths(m, n) {
  // 确定dp数组以及下标的含义，dp[i][j] ：表示从（0 ，0）出发，到(i, j) 有dp[i][j]条不同的路径
  const dp = Array(m)
    .fill()
    .map(() => Array(n).fill());

  // dp数组初始化
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
  }

  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
  }

  // 确定遍历顺序
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // 确定递推公式
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
}

// test-case
console.log('不同路径数：', uniquePaths(2, 3));
console.log('不同路径数：', uniquePaths(3, 7));
console.log('不同路径数：', uniquePaths(3, 3));
