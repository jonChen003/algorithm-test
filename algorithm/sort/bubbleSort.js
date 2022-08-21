/**
 * - 冒泡排序
 */
function bubbleSort(arr) {
  let i = arr.length - 1;
  let pos; // 用于优化
  let temp;

  while (i > 0) {
    // 每次置为0
    pos = 0;

    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        // 记录发生交换的最后位置
        pos = j;
        // 交换位置
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }

    i = pos;
  }

  return arr;
}

console.log(
  bubbleSort([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]),
);
