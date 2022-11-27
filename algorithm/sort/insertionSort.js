/**
 * - 插入排序
 */

// 基本方法
function insertionSort(arr) {
  if (!Array.isArray(arr)) {
    return new Error('arr is not an array!');
  }

  const len = arr.length;
  let pos; // 记录位置，肯定要有一个位置指针
  let temp; // 比较过程中，要移动元素，所以要把当前元素保存下

  // 1. 第一个循环：针对数组每个元素处理
  for (let i = 1; i < len; i++) {
    temp = arr[i];
    pos = i - 1;

    // 2. 第二个循环：找个每个元素应该被插入的位置
    while (pos >= 0 && arr[pos] > temp) {
      // 在比较的过程中，就可以直接把元素往后移
      arr[pos + 1] = arr[pos];
      pos -= 1;
    }

    // 3. 找到位置后，在pos之后执行插入操作
    arr[pos + 1] = temp;
  }

  return arr;
}

// 改进：查找插入位置时使用二分查找的方法
function binaryInsertionSort(array) {
  if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
    console.time('二分插入排序耗时：');

    for (let i = 1; i < array.length; i++) {
      const key = array[i];
      let left = 0;
      let right = i - 1;
      while (left <= right) {
        const middle = parseInt((left + right) / 2, 10);
        if (key < array[middle]) {
          right = middle - 1;
        } else {
          left = middle + 1;
        }
      }
      for (let j = i - 1; j >= left; j--) {
        array[j + 1] = array[j];
      }
      array[left] = key;
    }
    console.timeEnd('二分插入排序耗时：');

    return array;
  } else {
    return 'array is not an Array!';
  }
}

console.log(
  insertionSort([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48])
);
