/**
 * - leetcode 704：二分查找
 *
 * 题目描述：
 *  给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，
 *  写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1
 *
 * 示例1：
 *  输入: nums = [-1,0,3,5,9,12], target = 9
 *  输出: 4
 *  解释: 9 出现在 nums 中并且下标为 4
 * 示例2：
 *  输入: nums = [-1,0,3,5,9,12], target = 2
 *  输出: -1
 *  解释: 2 不存在 nums 中因此返回 -1
 */

/**
 * 算法思想：二分法关键在于对区间的定义，区间的定义就是不变量(循环不变量规则)，区间的定义决定了二分法怎么写
 * 方式一：区间定义为左闭右闭[left, right]
 * 方式二：区间定义为左闭右开[left, right)
 * 参考文档：
 *  https://www.programmercarl.com/0704.%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE.html#_704-%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE
 */

/**
 * 时间复杂度：O(log n)
 * 空间复杂度：O(1)
 */
/// 方式一：左闭右闭区间[left, right] （推荐）
function binarySearchV1(nums, target) {
  if (!nums || !nums.length) {
    return -1;
  }

  // 左闭右闭区间
  let left = 0;
  let right = nums.length - 1;

  // 当left=right时，由于nums[right]在查找范围内，所以要包括此情况
  while (left <= right) {
    // 这里注意middle的计算
    const middle = left + Math.floor((right - left) / 2);

    if (nums[middle] > target) {
      // 去左面闭区间寻找
      right = middle - 1;
    } else if (nums[middle] < target) {
      // 去右面闭区间寻找
      left = middle + 1;
    } else {
      return middle;
    }
  }

  return -1;
}

/// 方式二：左闭右开区间[left, right)
function binarySearchV2(nums, target) {
  if (!nums || !nums.length) {
    return -1;
  }

  // 左闭右开区间
  let left = 0;
  let right = nums.length;

  // 当left=right时，由于nums[right]不在查找范围内，所以不必包括此情况
  while (left < right) {
    // 这里注意middle的计算
    const middle = left + Math.floor((right - left) / 2);

    if (nums[middle] > target) {
      // 去左面闭区间寻找
      right = middle;
    } else if (nums[middle] < target) {
      // 去右面闭区间寻找
      left = middle + 1;
    } else {
      return middle;
    }
  }

  return -1;
}

// test-case
const num1 = [-1, 0, 3, 5, 9, 12];

console.log('result_1: ', binarySearchV1(num1, 9));
console.log('result_2: ', binarySearchV2(num1, 9));

console.log('result_2: ', binarySearchV1(num1, 4));
console.log('result_2: ', binarySearchV2(num1, 4));
