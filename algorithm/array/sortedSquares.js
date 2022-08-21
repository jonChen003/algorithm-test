/**
 * - leetcode 977: 有序数组的平方
 *
 * 题目描述：
 *  给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组
 *  要求也按 非递减顺序 排序
 *
 * 示例1：
 *  输入：nums = [-4,-1,0,3,10]
 *  输出：[0,1,9,16,100]
 *  解释：平方后，数组变为 [16,1,0,9,100]
 *  排序后，数组变为 [0,1,9,16,100]
 * 示例2：
 *  输入：nums = [-7,-3,2,3,11]
 *  输出：[4,9,9,49,12
 */

/**
 * 算法思想：双指针法
 *  数组其实是有序的， 只不过负数平方之后可能成为最大数了。
 *  那么数组平方的最大值就在数组的两端，不是最左边就是最右边，不可能是中间。
 *  此时可以考虑双指针法了，i指向起始位置，j指向终止位置
 *
 * 参考文档：
 *  https://programmercarl.com/0977.%E6%9C%89%E5%BA%8F%E6%95%B0%E7%BB%84%E7%9A%84%E5%B9%B3%E6%96%B9.html
 */

/**
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
function sortedSquares(nums) {
  const len = nums.length;
  const newArr = new Array(len).fill(0);
  let i = 0;
  let j = len - 1;
  let k = nums.length - 1;

  while (i <= j) {
    const leftSquare = nums[i] * nums[i];
    const rightSquare = nums[j] * nums[j];

    if (leftSquare > rightSquare) {
      newArr[k--] = leftSquare;
      i++;
    } else {
      newArr[k--] = rightSquare;
      j--;
    }
  }

  return newArr;
}

// test-case
const nums1 = [-4, -1, 0, 3, 10];
const nums2 = [-7, -3, 2, 3, 11];

console.log('res1---', sortedSquares(nums1));
console.log('res2---', sortedSquares(nums2));
