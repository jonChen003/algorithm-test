/**
 * 方式一：
 * 参考文档：
 *  https://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html
 */

function quickSortV1(arr) {
  if (arr.length <= 1) return arr;

  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr.splice(pivotIndex, 1)[0];
  const left = [];
  const right = [];
  arr.forEach((value) => {
    if (value < pivot) {
      left.push(value);
    } else {
      right.push(value);
    }
  });

  return quickSortV1(left).concat([pivot], quickSortV1(right));
}

/* eslint-disable no-param-reassign */
/**
 * 方式二：原数组上操作，填坑法，pivot会放在排序后应该在的位置
 * 根据pivot切分左右[left, right] pivot [left, right]
 * 参考文档：
 *  https://zhuanlan.zhihu.com/p/35946897
 */
function quickSortV2(arr, left, right) {
  if (left >= right) {
    // 注意这里的临界条件
    return;
  }

  // 前后双指针
  let i = left;
  let j = right;
  // 取最左边的数作为基准数
  const pivot = arr[i];

  while (i < j) {
    // 先从后往前寻找比基准点小的数
    while (i < j && arr[j] >= pivot) {
      j--;
    }
    if (i < j) {
      // 找到比基准点小的数时，交换，然后再从前往后找
      arr[i++] = arr[j];
    }

    // 从前往后寻找比基准点大的数
    while (i < j && arr[i] < pivot) {
      i++;
    }
    if (i < j) {
      // 找到比基准点大的数时，交换，然后再从后往前找
      arr[j--] = arr[i];
    }
  }

  // 将基准数填入最后的坑中
  arr[i] = pivot;
  // 递归调用，分治
  quickSortV2(arr, left, i - 1);
  quickSortV2(arr, i + 1, right);

  // return arr;
}

/**
 * 方式三：原数组上操作，无须关注pivot在排序后的位置
 * 参考文档：
 *  https://javascript.ruanyifeng.com/library/sorting.html#toc12
 */

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function partition(arr, left, right) {
  const pivotIndex = Math.floor((left + right) / 2);
  const pivot = arr[pivotIndex];

  let i = left;
  let j = right;

  while (i <= j) {
    // 从前往后寻找比基准点大的数
    while (arr[i] < pivot) {
      i++;
    }

    // 从后往前寻找比基准点小的数
    while (arr[j] > pivot) {
      j--;
    }

    if (i <= j) {
      // 交换两个值
      swap(arr, i, j);
      i++;
      j--;
    }
  }

  return i;
}

function quickSortV3(arr, left, right) {
  if (arr.length < 2) return arr;

  const partitionIndex = partition(arr, left, right);

  if (left < partitionIndex - 1) {
    quickSortV3(arr, left, partitionIndex - 1);
  }

  if (partitionIndex < right) {
    quickSortV3(arr, partitionIndex, right);
  }

  return arr;
}

const arr = [85, 24, 63, 45, 17, 31, 96, 50];

console.log('原始数据：', arr);
// console.log('快排后数据：', quickSortV1(arr));
// quickSortV2(arr, 0, arr.length - 1);
// console.log('快排后数据：', arr);

console.log('快排后数据：', quickSortV3(arr, 0, arr.length - 1));
