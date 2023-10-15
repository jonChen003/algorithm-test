/**
 * - leetcode 26. 删除有序数组中的重复项
 */

/**
 * 算法思想：双指针法
 * 	left: 指向待赋值的元素
 * 	right: 向右移动指针
 * 	nums[right] !== nums[right - 1] 时开始把值赋给left指针
 */

const removeDuplicates = (nums) => {
  const len = nums.length;
  if (len <= 1) return nums;

  let left = 1;
  let right = 1;

  while (right < len) {
    if (nums[right] !== nums[right - 1]) {
      nums[left] = nums[right];
      left++;
    }

    right++;
  }

  return left;
};
