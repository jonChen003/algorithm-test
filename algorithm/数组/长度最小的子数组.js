/**
 * - leetcode 209: 长度最小的子数组
 *
 * 题目描述：
 *  给定一个含有n个正整数的数组和一个正整数 target，
 *  找出该数组中满足其和 ≥ target 的长度最小的连续子数组[numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。
 *  如果不存在符合条件的子数组，返回 0 。
 *
 * 示例 1：
 *  输入：target = 7, nums = [2,3,1,2,4,3]
 *  输出：2
 *  解释：子数组[4,3]是该条件下的长度最小的子数组。
 * 示例 2：
 *  输入：target = 4, nums = [1,4,4]
 *  输出：1
 * 示例 3：
 *  输入：target = 11, nums = [1,1,1,1,1,1,1,1]
 *  输出：0
 */

/**
 * 算法思想：滑动窗口（本质上也是双指针法）
 *  窗口就是满足其和≥s的长度最小的 连续 子数组
 *  窗口的起始位置如何移动：如果当前窗口的值大于s了，窗口就要向前移动了（也就是该缩小了）
 *  窗口的结束位置如何移动：窗口的结束位置就是遍历数组的指针，也就是for循环里的索引。
 *  滑动窗口的精妙之处在于根据当前子序列和大小的情况，不断调节子序列的起始位置。从而将O(n^2)暴力解法降为O(n)
 *
 * 参考文档：
 *  https://programmercarl.com/0209.%E9%95%BF%E5%BA%A6%E6%9C%80%E5%B0%8F%E7%9A%84%E5%AD%90%E6%95%B0%E7%BB%84.html
 */

/**
 * 算法思想：双指针法（滑动窗口）
 * 时间复杂度：O(n)
 *  解释：时间复杂度是 2 × n 也就是O(n)
 * 空间复杂度：O(1)
 */
function minSubArrayLen(nums, target) {
  const len = nums.length;
  let left = 0; // 滑动窗口左指针
  let minLen = len + 1;
  let sum = 0; // 窗口内的元素和

  // 一步步移动滑动窗口的右指针
  for (let i = 0; i < len; i++) {
    sum += nums[i];

    // 一旦窗口内的和大于目标值，就缩小窗口
    while (sum >= target) {
      minLen = Math.min(minLen, i - left + 1);
      sum -= nums[left];
      // 一步步移动滑动窗口的左指针缩小窗口
      left++;
    }
  }

  return minLen === len + 1 ? 0 : minLen;
}

// test-case
const nums1 = [2, 3, 1, 2, 4, 3];
const nums2 = [1, 4, 4];
const nums3 = [1, 1, 1, 1, 1, 1, 1, 1];

console.log('res1---', minSubArrayLen(nums1, 7));
console.log('res2---', minSubArrayLen(nums2, 4));
console.log('res3---', minSubArrayLen(nums3, 11));
