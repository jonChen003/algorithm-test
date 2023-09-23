/**
 * - leetcode 344. 反转字符串
 *
 * 题目描述：https://leetcode.cn/problems/reverse-string/
 */

/**
 * - 算法思想：双指针法（首尾指针）
 */

const reverseString = function (s) {
  let left = 0;
  let right = s.length - 1;

  while (left <= right) {
    // 交换left和right位置的值
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
};
