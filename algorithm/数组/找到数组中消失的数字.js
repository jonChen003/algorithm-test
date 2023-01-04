/**
 * - leetcode 448. 找到所有数组中消失的数字
 *
 * 题目描述：
 * 	给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内
 * 	请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。

 * 示例 1：
 * 输入：nums = [4,3,2,7,8,2,3,1]
 * 输出：[5,6]
 *
 * 示例 2：
 * 输入：nums = [1,1]
 * 输出：[2]
 */

/**
 * 算法思想：本题主要是利用原数组来充当哈希表的作用
 */

// 解法一：将对应位置的数字变成负数
function findDisappearedNumbers(nums) {
  // 1. 第一次循环，将对应位置的数字变成负数
  for (let i = 0; i < nums.length; i++) {
    const originVal = Math.abs(nums[i]);
    nums[originVal - 1] = -Math.abs(nums[originVal - 1]);
  }

  const res = [];

  // 2. 第二次循环，找到数字为正数的位置
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] > 0) {
      res.push(j + 1);
    }
  }

  return res;
}

/* eslint-disable */
// 解法二：将对应位置的数组加上n
function findDisappearedNumbersV2(nums) {
  const n = nums.length;

  for (const num of nums) {
    const index = (num - 1) % n;
    nums[index] += n;
  }

  const res = [];
  for (const [i, num] of nums.entries()) {
    if (num <= n) {
      res.push(i + 1);
    }
  }

  return res;
}

// test-case
const nums1 = [4, 3, 2, 7, 8, 2, 3, 1];
const nums2 = [1, 1];
console.log('res---', findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]));
console.log('res---', findDisappearedNumbersV2([4, 3, 2, 7, 8, 2, 3, 1]));

console.log('res---', findDisappearedNumbers(nums2));
console.log('res---', findDisappearedNumbersV2(nums2));
