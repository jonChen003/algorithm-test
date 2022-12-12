/**
 * - leetcode 300. 最长递增子序列
 *
 * 题目描述：
 *  给你一个整数数组 nums ，找到其中最长严格递增子序列的长度
 *
 * 示例1：
 *  输入：nums = [10,9,2,5,3,7,101,18]
 *  输出：4
 *  解释：最长递增子序列是 [2,3,7,101]，因此长度为 4
 */

/**
 * 参考文档：
 *   https://programmercarl.com/0300.%E6%9C%80%E9%95%BF%E4%B8%8A%E5%8D%87%E5%AD%90%E5%BA%8F%E5%88%97.html
 */

function lengthOfLIS(nums) {
  if (nums.length <= 1) return nums.length;

  // 确定dp数组以及下标的含义，dp[i]：下标为i时，以nums[i]结尾最长上升子序列的长度
  // dp数组初始化：每一个i，对应的dp[i]（即最长上升子序列）起始大小至少都是1
  const dp = Array(nums.length).fill(1);
  let result = 1;

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[j] + 1, dp[i]);
      }
    }

    // 取长的子序列
    result = Math.max(result, dp[i]);
  }

  return result;
}

// test-case
const nums = [10, 9, 2, 5, 3, 7, 101, 18];
console.log('lengthOfLIS: ', lengthOfLIS(nums));