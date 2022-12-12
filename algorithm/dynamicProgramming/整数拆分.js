/**
 * - leetcode 343. 整数拆分
 *
 * 题目描述：
 * 	给定一个正整数 n ，将其拆分为 k 个 正整数 的和（ k >= 2 ）
 * 	并使这些整数的乘积最大化，返回 你可以获得的最大乘积
 *
 * 示例1：
 * 	输入: 2
 * 	输出: 1
 * 	解释: 2 = 1 + 1, 1 × 1 = 1
 *
 * 示例2：
 * 	输入: 10
 * 	输出: 36
 * 	解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
 * 	说明: 你可以假设 n 不小于 2 且不大于 58
 */

/**
 * 拆分一个数n 使之乘积最大，那么一定是拆分m个成近似相同的子数相乘才是最大的
 */

function integerBreak(n) {
  // dp[i]：分拆数字i，可以得到的最大乘积为dp[i]
  const dp = new Array(n + 1).fill(0);
  dp[2] = 1;

  // 对数字i进行遍历
  // 对每个数字i拆出来的数j遍历
  for (let i = 3; i <= n; i++) {
    for (let j = 1; j <= i / 2; j++) {
      // 递推公式
      dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j]);
    }
  }

  return dp[n];
}

// test-case
console.log('res---', integerBreak(10));
