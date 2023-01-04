/**
 * leetcode 560: 和为k的子数组
 * 题目描述：
 *  给定一个整数数组和一个整数 k，你需要找到该数组中和为 k 的连续的子数组的个数
 * 示例：
 *  输入:nums = [1,1,1], k = 2
 *  输出: 2 , [1,1] 与 [1,1] 为两种不同的情况
 */

const debug = require('debug')('subarraySum');

/**
 * 算法思想：哈希表
 *  遍历数组nums，计算从第0个元素到当前元素的和
 *  用哈希表保存出现过的累积和sum的次数
 *  如果sum - k在哈希表中出现过，则代表从当前下标i往前有连续的子数组的和为sum
 */

function subarraySum(nums, k) {
  const map = {};
  let sum = 0;
  let result = 0;
  map[0] = 1;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (typeof map[sum - k] !== 'undefined') {
      result += map[sum - k];
    }

    map[sum] = (map[sum] || 0) + 1;
  }

  return result;
}

// test-case

debug('case1: ', subarraySum([1, 1, 1], 2));
debug('case2: ', subarraySum([1, 2, 3, 1], 6));
debug('case3: ', subarraySum([1, 2, 3, 1], 5));