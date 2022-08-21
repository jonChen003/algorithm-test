/**
 * - 完全背包问题
 *
 * 题目描述：
 *  有n件物品和一个最多能背重量为w 的背包。
 *  第i件物品的重量是weight[i]，得到的价值是value[i] 。
 *  每件物品都有无限个（也就是可以放入背包多次），求解将哪些物品装入背包里物品价值总和最大
 *
 * 示例1：
 *  输入：weight = [1, 3, 4], value = [15, 20, 30], bagweight = 4;
 *  输出：60
 *  解释：放4个物品1价值总和最大
 */

/**
 * 参考文档：
 *  https://programmercarl.com/%E8%83%8C%E5%8C%85%E9%97%AE%E9%A2%98%E7%90%86%E8%AE%BA%E5%9F%BA%E7%A1%80%E5%AE%8C%E5%85%A8%E8%83%8C%E5%8C%85.html
 */

function testCompletePack(weight, value, bagSize) {
  // 确定dp数组以及下标的含义，dp：容量为j的背包，所背的物品价值可以最大为dp[j]
  const dp = Array(bagSize + 1).fill(0);

  // 确定遍历顺序，这里先遍历物品和先遍历背包容量都是可以的
  for (let i = 0; i < weight.length; i++) {
    // 完全背包的物品是可以添加多次的，所以要从小到大去遍历
    for (let j = weight[i]; j <= bagSize; j++) {
      dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
    }
  }

  return dp[bagSize];
}

// test-case
const weight = [1, 3, 4];
const value = [15, 20, 30];
const size = 4;

console.log('maxValue: ', testCompletePack(weight, value, size));
