/**
 * - 01背包问题
 *
 * 题目描述：
 *  有n件物品和一个最多能背重量为w 的背包。
 *  第i件物品的重量是weight[i]，得到的价值是value[i] 。
 *  每件物品只能用一次，求解将哪些物品装入背包里物品价值总和最大
 *
 * 示例1：
 *  输入：weight = [1, 3, 4], value = [15, 20, 30], bagweight = 4;
 *  输出：35
 *  解释：放第1个和第2ge物品价值总和最大
 */

/**
 * 参考文档：
 *  https://programmercarl.com/%E8%83%8C%E5%8C%85%E7%90%86%E8%AE%BA%E5%9F%BA%E7%A1%8001%E8%83%8C%E5%8C%85-1.html
 */

/**
 * - 二维dp数组解法（易于理解）
 *  推导递推公式：
 *    不放当前商品：dp[i-1][j]
 *    放当前商品：dp[i-1][j - weight[i]] + value[i]
 */
function testWeightBagProblem(weight, value, bagSize) {
  // 确定dp数组以及下标的含义
  // dp[i][j]: 表示从下标为[0-i]的物品里任意取，放进容量为j的背包，价值总和最大是多少
  const dp = Array.from(Array(weight.length), () => Array(bagSize + 1).fill(0));

  // dp数组初始化
  for (let j = weight[0]; j <= bagSize; j++) {
    dp[0][j] = value[0];
  }

  // weight数组的大小 就是物品个数
  // 确定遍历顺序：先遍历物品，再遍历背包容量
  for (let i = 1; i < weight.length; i++) {
    for (let j = 0; j <= bagSize; j++) {
      // 确定递推公式
      if (weight[i] > j) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);
      }
    }
  }

  console.table(dp);

  return dp[weight.length - 1][bagSize];
}

/**
 * - 一维dp数组
 *  推导递推公式：
 *    不放当前商品：dp[j]
 *    放当前商品：dp[j - weight[i]] + value[i]
 *  为什么背包容量必须倒序遍历，就可以保证物品只放入一次呢？
 *    倒序就是先算dp[2]
 *    dp[2] = dp[2 - weight[0]] + value[0] = 15 （dp数组已经都初始化为0）
 *    dp[1] = dp[1 - weight[0]] + value[0] = 15
 *    所以从后往前循环，每次取得状态不会和之前取得状态重合，这样每种物品就只取一次了
 */
function testWeightBagProblemV2(weight, value, bagSize) {
  // 确定dp数组以及下标的含义
  // dp[j]: 容量为j的背包，所背的物品价值可以最大为dp[j]
  const dp = Array(bagSize + 1).fill(0);

  // 确定遍历顺序：先遍历物品，再遍历背包容量（也就是挨个把物品放到包中）
  for (let i = 0; i < weight.length; i++) {
    // 背包容量必须倒序遍历，为了保证每个物品仅被添加一次
    for (let j = bagSize; j >= weight[i]; j--) {
      // 确定递推公式
      dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
    }
  }

  console.table(dp);

  return dp[bagSize];
}

// test-case
const weight = [1, 4, 3];
const value = [15, 30, 20];
const size = 4;

console.log('maxValue: ', testWeightBagProblem(weight, value, size));
console.log('maxValue: ', testWeightBagProblemV2(weight, value, size));
