/**
 * - leetcode 560: 和为k的子数组
 * 题目描述：
 *  给定一个整数数组和一个整数 k，你需要找到该数组中和为 k 的连续的子数组的个数
 * 示例：
 *  输入:nums = [1,1,1], k = 2
 *  输出: 2 , [1,1] 与 [1,1] 为两种不同的情况
 */

/**
 * 算法思想：哈希表 + 前缀和
 * 题目转化为：有几种 i、j 的组合，满足 prefixSum[j] - prefixSum[i - 1] === k
 * 其实我们不关心具体是哪两项的前缀和之差等于k，只关心等于 k 的前缀和之差出现的次数c
 */

function subarraySum(nums, k) {
  // 初始化map
  const map = { 0: 1 };
  let prefixSum = 0;
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    if (typeof map[prefixSum - k] !== 'undefined') {
      count += map[prefixSum - k];
    }

    map[prefixSum] = (map[prefixSum] || 0) + 1;
  }

  return count;
}

// test-case

console.log('case1: ', subarraySum([1, 1, 1], 2));
console.log('case2: ', subarraySum([1, 2, 3, 1], 6));
console.log('case3: ', subarraySum([1, 2, 3, 1], 5));
