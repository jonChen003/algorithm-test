/* eslint-disable no-empty */
/**
 * leetcode 15: 三数之和
 * 题目描述：
 *  给定一个包含 n个整数的数组nums，判断nums中是否存在三个元素 a，b，c
 *  使得a + b + c = 0 ？找出所有满足条件且不重复的三元组
 * 注意：
 *  答案中不可以包含重复的三元组
 * 示例：
 *  给定数组 nums = [-1, 0, 1, 2, -1, -4]
 *  满足要求的三元组集合为：[[-1, 0, 1], [-1, -1, 2]]
 * 参考解法：
 *  https://leetcode-cn.com/problems/3sum/solution/three-sum-ti-jie-by-wonderful611/
 *  https://github.com/chihungyu1116/leetcode-javascript/blob/master/15%203Sum.js
 */

const debug = require('debug')('threeSum');

/**
 * 算法思想：排序 + 双指针 + 边界判断
 */

function threeSum(nums) {
  const result = [];
  const len = nums.length;
  if (len < 3) return result;

  nums.sort((a, b) => a - b); // 对数组进行排序

  // 整个数组不能同符号
  if (nums[0] <= 0 && nums[len - 1] >= 0) {
    for (let i = 0; i < len - 2; i++) { // 从最左边的元素开始，依次作为C位元素
      if (i === 0 || nums[i] > nums[i - 1]) { // very important! 移除重复的三元组
        if (nums[i] > 0) break; // 最左值为整数则一定无解
        let first = i + 1;
        let last = len - 1;

        while (first < last) {
          if (nums[i] * nums[last] > 0) break; // 三个元素同符号，则一定无解
          const sum = nums[i] + nums[first] + nums[last];
          if (sum === 0) {
            result.push([nums[i], nums[first], nums[last]]);
          }
          if (sum <= 0) { // 把first指针往右移, 等于0时也得移
            while (first < last && nums[first] === nums[++first]) {}
          } else { // 把last指针往左移
            while (first < last && nums[last] === nums[--last]) {}
          }
        }
      }
    }
  }

  return result;
}

// test-case

debug('case1: ', threeSum([-1, 0, 1, 2, -1, -4]));
debug('case2: ', threeSum([0, 0, 0, 0]));