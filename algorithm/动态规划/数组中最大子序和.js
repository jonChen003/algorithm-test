/**
 * - leetcode 53. 最大子序和
 *
 * 题目描述：
 *  给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和
 *
 * 示例1：
 *  输入：[-2,1,-3,4,-1,2,1,-5,4]
 *  输出：6
 *  解释：连续子数组 [4,-1,2,1] 的和最大，为 6
 */

/**
 * 参考文档：
 *   https://programmercarl.com/0053.%E6%9C%80%E5%A4%A7%E5%AD%90%E5%BA%8F%E5%92%8C%EF%BC%88%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%EF%BC%89.html
 */

/**
 * - 方式一：动态规划
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 *
 * 递归公式：
 *  Math.max(nums[i]加入当前连续子序列和，以nums[i]为头开始计算)
 */
function maxSubArray(nums) {
  if (!nums || !nums.length) {
    return 0;
  }

  // 确定dp数组以及下标的含义，dp[i]: 下标为i时最大连续子序列和为dp[i]
  // dp数组初始化，dp[0] = nums[0]
  const dp = [nums[0]];
  let result = dp[0];

  for (let i = 1; i < nums.length; i++) {
    // dp[i - 1] + nums[i]，即：nums[i]加入当前连续子序列和
    // nums[i]，即：从头开始计算当前连续子序列和
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);

    // result 保存dp[i]的最大值
    result = Math.max(result, dp[i]);
  }

  return result;
}

/**
 * - 方式二：贪心算法
 * 关键点：如果累加和小于0，重新开始累加
 */
var maxSubArray = function (nums) {
  let result = -Infinity;
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    count += nums[i];
    result = Math.max(result, count);

    // 如果累加和小于0，重新开始累加
    if (count < 0) {
      count = 0;
    }
  }

  return result;
};

// test-case
const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log('maxSubArray: ', maxSubArray(nums));
