/**
 * leetcode 1: 两数之和
 * 题目描述：
 *  给定一个整数数组 nums 和一个目标值 target
 *  请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。
 *  你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
 *
 * 示例：
 *  给定 nums = [2, 7, 11, 15], target = 9
 *  因为 nums[0] + nums[1] = 2 + 7 = 9
 *  所以返回 [0, 1]
 */

const debug = require('debug')('twoSum');

// 方法一：使用哈希表
function twoSumV1(nums, target) {
  const result = [];
  if (!nums || nums.length < 2) {
    return null;
  }
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const index = map.get(target - nums[i]);
    if (typeof index !== 'undefined') {
      result[0] = index;
      result[1] = i;
      return result;
    }
    map.set(nums[i], i);
  }

  return null;
}

// 方法二：先对数组进行排序，然后用夹边方法找出满足条件的pair


// test-case
const nums = [2, 7, 11, 15];
const target = 9;

debug('result: ', twoSumV1(nums, target));