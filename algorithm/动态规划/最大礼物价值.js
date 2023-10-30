/**
 * - 最大礼物价值
 *
 * 题目描述：
 * 	在一个 m*n 的棋盘的每一格上的数字表示价值
 *	从左上角出发捡礼物，每次向右或者向下移动一格，直到到达棋盘的右下角。
 *	求：如何走，可以让捡到的礼物价值总和最大化？
 *
 * 题目与这题类似：
 * 	https://leetcode.cn/problems/li-wu-de-zui-da-jie-zhi-lcof/description/
 *
 */

/**
 * 算法思想：动态规划
 */

var jewelleryValue = function (frame) {
  const m = frame.length;
  const n = frame[0].length;

  // 定义dp数组
  const dp = Array.from(Array(m), () => Array(n).fill(0));
  // 初始化
  dp[0][0] = frame[0][0];
  let max = dp[0][0];

  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + frame[i][0];
    max = Math.max(max, dp[i][0]);
  }

  for (let j = 1; j < n; j++) {
    dp[0][j] = dp[0][j - 1] + frame[0][j];
    max = Math.max(max, dp[0][j]);
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.max(
        dp[i - 1][j] + frame[i][j],
        dp[i][j - 1] + frame[i][j]
      );
      max = Math.max(max, dp[i][j]);
    }
  }

  return max;
};
