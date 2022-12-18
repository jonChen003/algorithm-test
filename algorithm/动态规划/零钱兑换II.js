/**
 * - leetcode 518. 零钱兑换II
 *
 * 题目描述：
 *  给定不同面额的硬币 coins 和一个总金额 amount
 *  写出函数来计算可以凑成总金额的硬币组合数
 *  假设每一种面额的硬币有无限个
 *
 * 示例1：
 *  输入：coins = [1, 2, 5], amount = 5
 *  输出：4
 *  解释：有四种方式可以凑成总金额: 5=5 5=2+2+1 5=2+1+1+1 5=1+1+1+1+1
 */

/**
 * 参考文档：
 *  https://programmercarl.com/0518.%E9%9B%B6%E9%92%B1%E5%85%91%E6%8D%A2II.html
 */

/**
 * 本题强调的是凑成总金额的硬币组合数
 * 组合不强调元素之间的顺序，排列强调元素之间的顺序
 */

function coinChangeII(coins, amount) {
  // 确定dp数组以及下标的含义，dp[j]: 凑成总金额j的货币组合数为dp[j]
  // dp数组初始化
  const dp = Array(amount + 1).fill(0);
  dp[0] = 1;

  // 确定遍历顺序
  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      // 确定递推公式
      // 加入该硬币和不加入该硬币两种方式
      dp[j] += dp[j - coins[i]];
    }
  }

  return dp[amount];
}

// test-case
const coins = [1, 2, 5];
const amount = 5;

console.log('coinChangeII: ', coinChangeII(coins, amount));
