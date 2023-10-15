/**
 * - 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序
 *
 * 示例
 * 	输入: [0,1,0,3,12]
 *  输出: [1,3,12,0,0]
 *
 * 说明:
 * 	必须在原数组上操作，不能拷贝额外的数组。
 * 	尽量减少操作次数
 */

/**
 * 算法思想：双指针法（快慢指针）
 */

/**
 * 方式一：先移动元素，然后再把慢指针后面的元素置为0
 */
function moveZero_v1(nums) {
  let left = 0; // 慢指针
  let right = 0; // 快指针

  while (right < nums.length) {
    if (nums[right] === 0) {
      right++;
    } else {
      nums[left] = nums[right];
      left++;
      right++;
    }
  }

  while (left < nums.length) {
    nums[left] = 0;
    left++;
  }

  return nums;
}

/**
 * 方式二：移动元素过程中，判断是否需要交换（推荐）
 * 	快指针每次+1
 * 	当慢指针的值不等于0的时候也往后移动
 * 	当慢指针等于0并且快指针不等于0的时候，交换快慢指针的值，慢指针再+1
 */
function moveZero_v2(nums) {
  let left = 0; // 慢指针
  let right = 0; // 快指针

  while (right < nums.length) {
    if (nums[left] !== 0) {
      // 当慢指针的值不等于0的时候，也往后移动
      left++;
    } else if (nums[right] !== 0) {
      // 当慢指针的值等于0，快指针的值不等于0的时候，需要交换快慢指针的值
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left++;
    }
    // 当慢指针和快指针的值都为0时，只需要移动快指针即可

    right++; // 快指针每次往后移动一个
  }

  return nums;
}

// test-case
const nums1 = [0, 1, 0, 3, 12];
const nums2 = [0, 0, 1, 3, 12];

console.log('res1: ', moveZero_v1(nums1));
console.log('res2: ', moveZero_v2(nums1));

console.log('res1: ', moveZero_v1(nums2));
console.log('res2: ', moveZero_v2(nums2));