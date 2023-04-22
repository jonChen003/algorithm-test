/**
 * - leetcode 322. 零钱兑换
 *
 * 题目描述：
 *  给定不同面额的硬币 coins 和一个总金额 amount
 *  编写一个函数来计算可以凑成总金额所需的最少的硬币个数
 *  如果没有任何一种硬币组合能组成总金额，返回 -1
 *  可以认为每种硬币的数量是无限的
 *
 * 示例1：
 *  输入：coins = [1, 2, 5], amount = 11
 *  输出：3
 *  解释：11 = 5 + 5 + 1
 */

/**
 * 参考文档：
 *  https://programmercarl.com/0322.%E9%9B%B6%E9%92%B1%E5%85%91%E6%8D%A2.html
 */

/**
 * 每种硬币的数量是无限的，可以看出是典型的完全背包问题
 */

// - 双层循环：先遍历coins数组，再遍历金额
function coinChange(coins, amount) {
  // 确定dp数组以及下标的含义，dp[j]: 凑足总额为j所需钱币的最少个数为dp[j]
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      // 如果dp[j - coins[i]]是初始值则跳过
      if (dp[j - coins[i]] !== Infinity) {
        // 确定递推公式
        dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
      }
    }
  }

  if (dp[amount] === Infinity) return -1;

  return dp[amount];
}

// test-case
const coins = [1, 2, 5];
const amount = 11;
console.log('coinChange: ', coinChange(coins, amount));

// ---------------------------------------------------

/**
 * - 零钱兑换变种题目：完全平方数
 *
 * 题目描述：
 *  给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n
 *  需要让组成和的完全平方数的个数最少
 */

function numSquares(n) {
  const dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;

  const coins = [];
  for (let i = 1; i * i <= n; i++) {
    coins.push(i * i);
  }

  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= n; j++) {
      if (dp[j - coins[i]] !== Infinity) {
        dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
      }
    }
  }

  if (dp[n] === Infinity) return -1;

  return dp[n];
}
