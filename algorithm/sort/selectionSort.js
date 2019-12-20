const debug = require('debug')('selectionSort');

function selectionSort(arr) {
  const len = arr.length - 1;
  let minIndex;
  let temp;
  for (let i = 0; i < len; i++) {
    minIndex = i;
    // 寻找最小的数，将最小数的索引保存
    for (let j = i + 1; j <= len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}

debug(selectionSort([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]));
