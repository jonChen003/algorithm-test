/**
 * - leetcode 27: 移除元素
 *
 * 题目描述：
 *  给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
 *  不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并原地修改输入数组。
 *  元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
 *
 * 示例1：
 *  给定 nums = [3,2,2,3], val = 3
 *  函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2
 * 示例2：
 *  给定 nums = [0,1,2,2,3,0,4,2], val = 2
 *  函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4
 */

/**
 * 算法思想：双指针法（快慢指针）
 *  通过一个快指针和慢指针在一个for循环下完成两个for循环的工作
 *  快指针：寻找新数组的元素，新数据就是不含有目标元素的数组
 *  慢指针：指向更新新数组下标的位置
 *
 * 双指针法（快慢指针法）在数组和链表的操作中是非常常见的
 * 很多考察数组、链表、字符串等操作的面试题，都使用双指针法
 *
 * 参考文档：
 *  https://programmercarl.com/0027.%E7%A7%BB%E9%99%A4%E5%85%83%E7%B4%A0.html
 */

/**
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function removeElement(nums, val) {
  let slowIndex = 0;

  for (let fastIndex = 0; fastIndex < nums.length; fastIndex++) {
    // 遇到不等于val的元素，快慢指针都需要往后移
    if (nums[fastIndex] !== val) {
      nums[slowIndex++] = nums[fastIndex];
    }
    // 如果遇到等于val的元素，只需要移动快指针即可
  }

  return slowIndex;
}

// test-case
const nums1 = [0, 1, 2, 3, 3, 0, 4, 2];
const size = removeElement(nums1, 2);
console.log('result: ', size);
console.log('result-arr: ', nums1.slice(0, size));
