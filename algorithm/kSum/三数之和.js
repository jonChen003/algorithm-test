/* eslint-disable no-empty */
/**
 * - leetcode 15: 三数之和
 * 题目描述：
 *  给定一个包含 n个整数的数组nums，判断nums中是否存在三个元素 a，b，c
 *  使得a + b + c = 0 ？找出所有满足条件且不重复的三元组
 * 注意：
 *  答案中不可以包含重复的三元组
 *
 * 示例：
 *  给定数组 nums = [-1, 0, 1, 2, -1, -4]
 *  满足要求的三元组集合为：[[-1, 0, 1], [-1, -1, 2]]
 *
 * 参考解法：
 *  https://leetcode.cn/problems/3sum/solution/pai-xu-shuang-zhi-zhen-zhu-xing-jie-shi-python3-by/
 *  https://github.com/chihungyu1116/leetcode-javascript/blob/master/15%203Sum.js
 */

/**
 * 算法思想：排序 + 双指针 + 边界判断
 * - 对数组进行排序。
 * - 遍历排序后数组：
 *  - 若 nums[i]>0：因为已经排序好，所以后面不可能有三个数加和等于 00，直接返回结果。
 *  - 对于重复元素：跳过，避免出现重复解
 *  - 令左指针 L=i+1，右指针 R=n-1，当 L<R 时，执行循环：
 *    - 当 nums[i]+nums[L]+nums[R]==0，执行循环，同时将 L移到下一位置，寻找新的解
 *    - 若和大于 0，说明 nums[R] 太大，R 左移
 *    - 若和小于 0，说明 nums[L] 太小，L 右移
 */

function threeSum(nums) {
  const result = [];
  const len = nums.length;
  if (len < 3) return result;

  nums.sort((a, b) => a - b); // 对数组进行排序

  // 整个数组不能同符号
  if (nums[0] > 0 || nums[len - 1] < 0) return result;

  // 从最左边的元素开始，依次作为第一个元素
  for (let i = 0; i < len - 2; i++) {
    // very important! 移除重复的三元组
    if (i === 0 || nums[i] > nums[i - 1]) {
      if (nums[i] > 0) break; // 最左值为整数则一定无解
      // 定义双指针
      let left = i + 1;
      let right = len - 1;

      while (left < right) {
        if (nums[i] * nums[right] > 0) break; // 三个元素同符号，则一定无解
        const sum = nums[i] + nums[left] + nums[right];

        // sum === 0时，加入到结果数组中
        if (sum === 0) {
          result.push([nums[i], nums[left], nums[right]]);
        }

        // 移动指针
        if (sum <= 0) {
          // 把left指针往右移, 等于0时也得移
          while (left < right && nums[left] === nums[++left]) {}
        } else {
          // 把right指针往左移
          while (left < right && nums[right] === nums[--right]) {}
        }
      }
    }
  }

  return result;
}

// test-case

console.log('case1: ', threeSum([-1, 0, 1, 2, -1, -4]));
console.log('case2: ', threeSum([0, 0, 0, 0]));
