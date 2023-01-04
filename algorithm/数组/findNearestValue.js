const debug = require('debug')('findNearestValue');

// 方法一：使用递归
function findNearesetValue(array, start, end, num) {
  const midIndex = (start + end) / 2;
  if (start >= end) {
    return start;
  }
  const midValue = array[midIndex];
  const leftValue = array[midIndex - 1 < start ? start : midIndex - 1];
  const rightValue = array[midIndex + 1 > end ? end : midIndex + 1];

  const dm = Math.abs(num - midValue);
  const dl = Math.abs(num - leftValue);
  const dr = Math.abs(num - rightValue);

  let findIndex = 0;
  if (dm <= dl && dm <= dr) {
    findIndex = midIndex;
  } else if (dl < dr) {
    findIndex = findNearesetValue(array, start, midIndex - 1, num);
  } else {
    findIndex = findNearesetValue(array, midIndex + 1, end, num);
  }
  return findIndex;
}

// 方法二：使用循环
function findNearestValueV2(arr, num) {
  let mid;
  let low = 0;
  let high = arr.length - 1;
  while (high - low > 1) {
    mid = Math.floor((low + high) / 2);
    if (arr[mid] === num) return arr[mid];
    if (arr[mid] < num) {
      low = mid;
    } else {
      high = mid;
    }
  }
  if (num - arr[low] <= arr[high] - num) {
    return arr[low];
  }
  return arr[high];
}

const testArray = [1, 4, 6, 11, 15, 16, 18];

// const resIndex = findNearesetValue(testArray, 0, testArray.length - 1, 10);
// debug('findNearestIndex: ', resIndex);
// debug('findNearestValue: ', testArray[resIndex]);

const value = findNearestValueV2(testArray, 11);
debug('findNearestValue: ', value);
