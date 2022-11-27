/**
 * - 选择排序(不稳定排序)
 */
function selectionSort(arr) {
  const len = arr.length - 1;
  let minIndex;
  let temp;

  // 第一层循环，遍历每一个元素，其实i也代表第i个最小数
  for (let i = 0; i < len; i++) {
    minIndex = i;
    // 寻找最小的数，将最小数的位置保存
    for (let j = i + 1; j <= len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // 找到最小数之后，进行交换，因为有交换的逻辑，所以可能会破坏相对顺序，固是不稳定排序
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}

console.log(
  selectionSort([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48])
);
