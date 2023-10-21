/**
 * - leetcode 122. 买卖股票的最佳时机 II
 *
 * 题目描述：
 * 	给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。
 *	在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。
 *	返回 你能获得的 最大 利润

 *	示例 1：
 *	输入：prices = [7,1,5,3,6,4]
 *	输出：7
 *	解释：在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4 。
 *	随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6 - 3 = 3 。
 *	总利润为 4 + 3 = 7 。
 */

/**
 * 参考文档：
 * 	https://programmercarl.com/0122.%E4%B9%B0%E5%8D%96%E8%82%A1%E7%A5%A8%E7%9A%84%E6%9C%80%E4%BD%B3%E6%97%B6%E6%9C%BAII.html#%E6%80%9D%E8%B7%AF
 */

/**
 * 算法思想：贪心算法（局部最优推到全局最优）
 */
const maxProfit = function (prices) {
  let result = 0;

  for (let i = 1; i < prices.length; i++) {
    // 昨天买，今天卖
    const profit = prices[i] - prices[i - 1];
    // 收集正利润，推到全局最大利润
    // result += Math.max(profit, 0);
    if (profit > 0) {
      result += profit;
    }
  }

  return result;
};
