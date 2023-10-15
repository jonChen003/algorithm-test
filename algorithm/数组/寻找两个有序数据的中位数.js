/**
 * - leetcode 4：寻找两个有序数组的中位数
 *
 * 题目描述：
 *  给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。
 *  请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
 *  你可以假设 nums1 和 nums2 不会同时为空。
 *
 * 示例：
 * 示例1：
 *  nums1 = [1, 3]
 *  nums2 = [2]
 *  则中位数是 2.0
 *
 * 示例2：
 *  nums1 = [1, 2]
 *  nums2 = [3, 4]
 *  则中位数是 (2 + 3)/2 = 2.5
 */

/**
 * 算法思想：二分查找
 *  该算法的核心是将原问题转变成一个寻找第k小数的问题
 *  假设数组A和B的元素个数都大于k/2，比较A[k/2-1]和B[k/2-1]两个元素
 *  如果A[k/2-1]<B[k/2-1]，表示A[0]到A[k/2-1]的元素都在A和B合并之后的前k小的元素中；
 *  换句话说，A[k/2-1]不可能大于两数组合并之后的第k小值，所以我们可以将其抛弃
 *  A[k/2-1]>B[k/2-1]时，剔除B中的B[0]到B[k/2-1]之间元素
 *  当A[k/2-1]=B[k/2-1]时，这个相等的元素就是第k小的数
 *
 * 参考链接：
 *  https://blog.csdn.net/yutianzuijin/article/details/11499917
 *  https://blog.csdn.net/zxzxy1988/article/details/8587244
 *  https://github.com/chihungyu1116/leetcode-javascript/blob/master/4.%20Median%20of%20Two%20Sorted%20Arrays.js
 */

function findKth(nums1, start1, nums2, start2, kth) {
  const len1 = nums1.length - start1;
  const len2 = nums2.length - start2;

  // 总是假设len1 <= len2
  if (len1 > len2) return findKth(nums2, start2, nums1, start1, kth);

  if (len1 === 0) return nums2[kth - 1];

  if (kth === 1) return Math.min(nums1[start1], nums2[start2]);

  // 将kth划分为2个部分
  // nums1根据part1划分
  const part1 = Math.min(Math.floor(kth / 2), len1);
  // nums2根据part2划分
  const part2 = kth - part1;

  if (nums1[start1 + part1 - 1] < nums2[start2 + part2 - 1]) {
    // 舍弃nums1 part1左边部分的元素，只需要找到第kth-part1大元素
    return findKth(nums1, start1 + part1, nums2, start2, kth - part1);
  } else if (nums1[start1 + part1 - 1] > nums2[start2 + part2 - 1]) {
    // 舍弃nums2 part2左边部分的元素，只需要找到第kth-part2大元素
    return findKth(nums1, start1, nums2, start2 + part2, kth - part2);
  } else {
    // 如果相等，直接取即可
    return nums1[start1 + part1 - 1];
  }
}

// 这种方式更容易理解(推荐)
function findKthNum(nums1, start1, nums2, start2, kth) {
  // 递归终止条件
  if (start1 > nums1.length - 1) {
    return nums2[start2 + kth - 1];
  }

  if (start2 > nums2.length - 1) {
    return nums1[start1 + kth - 1];
  }

  if (kth === 1) {
    return Math.min(nums1[start1], nums2[start2]);
  }

  // 划分
  // 取k2为(k/2)或者数组1的长度或者数组2的长度的最小值
  // 这一步可以避免k2大于某个数组的长度（长度为从起始坐标到结尾）

  let k2 = Math.floor(kth / 2);
  const len1 = nums1.length - start1;
  const len2 = nums2.length - start2;
  k2 = Math.min(k2, len1, len2);

  // 比较两个数组的起始坐标的值
  const value1 = nums1[start1 + k2 - 1];
  const value2 = nums2[start2 + k2 - 1];

  if (value1 < value2) {
    // 就舍弃nums1前i + k2部分
    return findKthNum(nums1, start1 + k2, nums2, start2, kth - k2);
  } else {
    // 否则舍弃nums2前j + k2部分
    return findKthNum(nums1, start1, nums2, start2 + k2, kth - k2);
  }
}

function findMedianSortedArrays(nums1, nums2) {
  const total = nums1.length + nums2.length;

  if (total % 2 === 1) {
    // 总长度为奇数情况，例如长度为7，只要找第4大元素
    return findKthNum(nums1, 0, nums2, 0, Math.floor(total / 2) + 1);
  }

  // 总长度为偶数情况，例如长度为8，找到第4大和第5大元素，然后求平均值
  return (
    (findKthNum(nums1, 0, nums2, 0, total / 2) +
      findKthNum(nums1, 0, nums2, 0, total / 2 + 1)) /
    2
  );
}

// test-case
console.log('case1: ', findMedianSortedArrays([1, 3], [2]));
console.log('case2: ', findMedianSortedArrays([1, 2], [3, 4]));
console.log('case3: ', findMedianSortedArrays([1, 3, 5, 7], [2, 4, 6]));
