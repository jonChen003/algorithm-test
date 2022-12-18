/**
 * - leetcode 674. 最长连续递增序列
 *
 * 题目描述：
 *  给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度
 *
 * 示例1：
 *  输入：nums = [1,3,5,4,7]
 *  输出：3
 *  解释：
 *    最长连续递增序列是 [1,3,5], 长度为3
 *    尽管 [1,3,5,7] 也是升序的子序列, 但它不是连续的，因为 5 和 7 在原数组里被 4 隔开
 */

/**
 * 参考文档：
 *   https://programmercarl.com/0300.%E6%9C%80%E9%95%BF%E4%B8%8A%E5%8D%87%E5%AD%90%E5%BA%8F%E5%88%97.html
 */

/**
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
function findLengthOfLCIS(nums) {
  if (!nums.length) return 0;

  // 确定dp数组以及下标的含义，dp[i]：下标为i时，以nums[i]结尾的连续递增子序列长度为dp[i]
  // dp数组初始化：以nums[i]结尾的数组连续递增的子序列长度最少也应该是1，dp[i] = 1
  const dp = Array(nums.length).fill(1);
  let result = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      dp[i] = dp[i - 1] + 1;
    }

    result = Math.max(result, dp[i]);
  }

  return result;
}

// test-case
const nums = [1, 3, 5, 4, 7];
console.log('findLengthOfLCIS: ', findLengthOfLCIS(nums));
