/**
 * - leetcode 215: 数组中的第K个最大元素
 *
 * 算法描述：
 *  在未排序的数组中找到第 k 个最大的元素
 *  请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素
 *
 * 示例：
 * 示例1：
 *  输入: [3,2,1,5,6,4] 和 k = 2
 *  输出: 5
 * 示例2：
 *  输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
 *  输出: 4
 *
 * 说明：
 *  你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度
 */

/**
 * 算法思想：利用快速排序中partition思想解决
 * 方式一：不考虑空间复杂度，可以新增辅助空间
 * 方式二：考虑空间复杂度，在原数组上操作
 */

/// 方式一：不考虑空间复杂度，新增辅助空间
function findKthLargestV1(nums, k) {
  const smaller = [];
  const larger = [];
  const pivot = nums[parseInt(nums.length / 2, 10)];
  let pivotCnt = 0;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (num > pivot) {
      larger.push(num);
    } else if (num < pivot) {
      smaller.push(num);
    } else {
      pivotCnt += 1;
    }
  }

  if (k <= larger.length) {
    return findKthLargestV1(larger, k);
  } else if (k - larger.length - pivotCnt <= 0) {
    return pivot;
  } else {
    return findKthLargestV1(smaller, k - larger.length - pivotCnt);
  }
}

/// 方式二：考虑时间复杂度，在原数组上操作
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function partition(nums, l, r) {
  const randIndex = Math.floor((l + r) / 2);
  swap(nums, l, randIndex); // 将基元素换到左边

  // 获取到基元素，维护两个指针
  const pivot = nums[l];
  let i = l + 1;
  let j = l;

  while (i <= r) {
    if (nums[i] >= pivot) swap(nums, i, ++j); // 把比基元素大的元素换到前面去
    i += 1;
  }

  swap(nums, l, j); // 最后将基元素换到分割界点，将数组分为一边大一边小
  return j;
}

function findKthLargest(nums, l, r, k) {
  const pivotIndex = partition(nums, l, r); // 将数组划分为两半

  if (pivotIndex === k - 1) return nums[pivotIndex];
  if (pivotIndex < k - 1) return findKthLargest(nums, pivotIndex + 1, r, k); // 在右边继续找
  if (pivotIndex > k - 1) return findKthLargest(nums, l, pivotIndex - 1, k); // 在左边继续找

  return -1;
}

function findKthLargestV2(nums, k) {
  return findKthLargest(nums, 0, nums.length - 1, k);
}

// test-case
const nums1 = [3, 2, 1, 5, 6, 4];
const nums2 = [3, 2, 3, 1, 2, 4, 5, 5, 6];

console.log('result_1: ', findKthLargestV1(nums1, 2));
console.log('result_1: ', findKthLargestV2(nums1, 2));

console.log('result_2: ', findKthLargestV1(nums2, 4));
console.log('result_2: ', findKthLargestV2(nums2, 4));
