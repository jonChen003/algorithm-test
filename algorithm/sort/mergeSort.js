/**
 * - 归并排序
 */

// 既然是两两归并，必然涉及到递归实现
function mergeSort(nums) {
  const len = nums.length;

  // 涉及到递归就必然要有终止条件
  if (nums.length <= 1) {
    return nums;
  }

  // 1. 把原数组拆分为左右两个数组
  const mid = parseInt(len / 2, 10);
  const leftArr = nums.slice(0, mid);
  const rightArr = nums.slice(mid, len);

  // 2. 对左右两个有序数组做归并排序
  return merge(mergeSort(leftArr), mergeSort(rightArr));
}

function merge(arr1, arr2) {
  const res = [];
  const len1 = arr1.length;
  const len2 = arr2.length;
  let i = 0;
  let j = 0;

  while (i < len1 && j < len2) {
    if (arr1[i] < arr2[j]) {
      res.push(arr1[i]);
      i++;
    } else {
      res.push(arr2[j]);
      j++;
    }
  }

  while (i < len1) {
    res.push(arr1[i]);
    i++;
  }

  while (j < len2) {
    res.push(arr2[j]);
    j++;
  }

  return res;
}

// test-case
console.log(mergeSort([1, 1, 4, 7, 0, 9, -911, -1, 2, 3]));
