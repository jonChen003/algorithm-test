/**
 * - leetcode 540. 有序数组中的单一元素
 *
 * 示例 1:
 * 输入: nums = [1,1,3,3,5,4,4,8,8]
 * 输出: 2
 *
 * 示例 2:
 * 输入: nums =  [3,3,7,7,10,11,11]
 * 输出: 10
 */

/**
 * - 算法思想：二分查找
 * 1、确定采用左闭右闭区间还是左闭右开区间
 * 2、确定什么条件下移动左指针
 * 3、确定什么条件下移动右指针

 * 本题中，考虑mid是奇数还是偶数的情况
 * 如果mid是奇数
 *  [1, 1, 2]
 * 	nums[mid] === nums[mid - 1] -> 移动左指针
 * 如果mid是偶数
 *  [1, 1, 2, 2, 3]
 * 	nums[mid] === nums[mid + 1] -> 移动左指针
 *
 * 另外要和mid + 1 或者 mid - 1比较，更适合左闭右开区间
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const middle = Math.floor((right - left) / 2) + left;
    // 采用异或的写法：2 ^ 1 = 3; 3 ^ 1 = 2;
    if (nums[middle] === nums[middle ^ 1]) {
      left = middle + 1;
    } else {
      right = middle;
    }
  }

  return nums[left];
};
