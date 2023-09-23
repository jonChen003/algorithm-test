/**
 * - leetcode 541. 反转字符串II
 * 题目描述：https://leetcode.cn/problems/reverse-string-ii/description/
 */

/**
 * - 算法思想：双指针法（首尾指针）
 * 	细节：在遍历字符串的过程中，只要让 i += (2 * k)，i 每次移动 2 * k 就可以了，然后判断是否需要有反转的区间
 */

/**
 * 备注：在JavaScript中，字符串是不可变的，也就是说无法直接修改字符串中的某一位字符
 * - 在js中，修改字符串中的某一位字符有两种方法：
 * 	1、将字符串转为数组，修改数组元素，然后再将数组转换为字符串（推荐）
 * 	2、将字符串拆分为前后两个部分，然后将修改的字符插入到中间，最后再拼接起来
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
const reverseStr = function (s, k) {
  // 维护反转的首尾指针
  let left = 0;
  let right = 0;
  // 转换为数组方便操作
  const arr = s.split('');
  const len = arr.length;

  for (let i = 0; i < len; i += 2 * k) {
    // 确定左右指针
    left = i;
    right = i + k - 1 >= len ? len - 1 : i + k - 1;

    // 反转字符
    while (left < right) {
      // 在JavaScript中，字符串是不可变的，也就是说无法直接修改字符串中的某一位字符
      // 下面的操作改变不了字符串
      // [s[left], s[right]] = [s[right], s[left]];
      // 数组才可以
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }

  return arr.join('');
};
