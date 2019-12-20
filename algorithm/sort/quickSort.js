const debug = require('debug')('quickSort');

function quickSort(arr) {
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

  return quickSort(left).concat([pivot], quickSort(right));
}

const arr = [85, 24, 63, 45, 17, 31, 96, 50];
debug('原始数据：', arr);
debug('快排后数据：', quickSort(arr));
