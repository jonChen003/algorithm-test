/**
 * - leetcode 121. 买卖股票的最佳时机
 *
 * 题目描述：
 *  给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格
 *  你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票
 *  设计一个算法来计算你所能获取的最大利润
 *  返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0
 *
 * 示例1：
 *  输入：[7,1,5,3,6,4]
 *  输出：5
 *  解释：
 *    在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5
 *    注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票
 */

/**
 * 参考文档：
 * 	https://programmercarl.com/0121.%E4%B9%B0%E5%8D%96%E8%82%A1%E7%A5%A8%E7%9A%84%E6%9C%80%E4%BD%B3%E6%97%B6%E6%9C%BA.html#%E6%80%9D%E8%B7%AF
 */

/**
 * - 贪心算法（推荐）
 *	算法思想：
 *		最左最小值，每次当前值 - 最小值，比较利润，那么得到的差值就是最大利润
 */
function maxProfit(prices) {
  let result = 0;
  let min = prices[0];

  for (let i = 1; i < prices.length; i++) {
    min = Math.min(prices[i], min); // 取最左最小价格

    result = Math.max(prices[i] - min, result); // 直接取最大区间利润
  }

  return result;
}

/**
 * - 动态规划
 * 	当天持有 dp[i][0]
 * 		递推公式：dp[i][0] = max(dp[i-1][0], -prices[i])
 * 	当天不持有 dp[i][1]
 * 		递推公式：dp[i][1] = max(dp[i-1][1], prices[i] + dp[i-1][0])
 */
// - 单层循环，遍历prices数组
function maxProfitV2(prices) {
  const len = prices.length;
  // 确定dp数组（dp table）以及下标的含义
  // dp[i][0] 表示第i天持有股票所得最多现金
  // dp[i][1] 表示第i天不持有股票所得最多现金
  const dp = Array(len).fill([0, 0]);

  // dp数组初始化
  dp[0] = [-prices[0], 0];

  // 确定遍历顺序
  for (let i = 1; i < len; i++) {
    // 确定递推公式
    dp[i] = [
      Math.max(dp[i - 1][0], -prices[i]),
      Math.max(dp[i - 1][1], prices[i] + dp[i - 1][0]),
    ];
  }

  return dp[len - 1][1];
}

// test-case
const prices = [7, 1, 5, 3, 6, 4];
console.log('maxProfit---', maxProfit(prices));
console.log('maxProfit---', maxProfitV2(prices));
