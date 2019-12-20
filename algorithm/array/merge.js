/**
 * leetcode 88: 合并两个有序数组
 * 题目描述：
 *  给定两个有序整数数组 nums1 和 nums2，将 nums2 合并到 nums1 中，使得 num1 成为一个有序数组
 * 说明：
 *  1. 初始化 nums1 和 nums2 的元素数量分别为 m 和 n
 *  2. 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素
 * 示例：
 *  输入:
 *    nums1 = [1,2,3,0,0,0], m = 3
 *    nums2 = [2,5,6],       n = 3
 *  输出:
 *    [1,2,2,3,5,6]
 */

const debug = require('debug')('merge');

// 逆序求解：从后往前求解
function merge(nums1, m, nums2, n) {
  let p = m + n - 1;
  m -= 1;
  n -= 1;
  while (m >= 0 && n >= 0) {
    nums1[p--] = nums1[m] > nums2[n] ? nums1[m--] : nums2[n--];
  }

  while (n >= 0) {
    nums1[p--] = nums2[n--];
  }
}

// 写法二
function mergeV2(nums1, m, nums2, n) {
  while (m > 0 && n > 0) {
    if (nums1[m - 1] > nums2[n - 1]) {
      nums1[m + n - 1] = nums1[m - 1];
      m -= 1;
    } else {
      nums1[m + n - 1] = nums2[n - 1];
      n -= 1;
    }
  }

  while (n > 0) {
    nums1[n - 1] = nums2[n - 1];
    n -= 1;
  }
}

// test-case
const nums1 = [1, 2, 3, 0, 0, 0];
const m = 3;
const nums2 = [2, 5, 6];
const n = 3;

// merge(nums1, m, nums2, n);
// debug('result: ', nums1);

mergeV2(nums1, m, nums2, n);
debug('result: ', nums1);