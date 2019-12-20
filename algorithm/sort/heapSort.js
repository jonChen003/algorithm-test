/**
 * 堆排序：
 *  堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。
 *  堆是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点
 *
 * 堆排序算法描述：
 *  1、将初始待排序关键字序列(R1,R2....Rn)构建成大顶堆，此堆为初始的无序区
 *  2、将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,......Rn-1)和新的有序区(Rn),且满足R[1,2...n-1]<=R[n]
 *  3、由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,......Rn-1)调整为新堆，
 *    然后再次将R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2....Rn-2)和新的有序区(Rn-1,Rn)
 *  4、不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成
 */

const debug = require('debug')('heapSort');

// 调整大根堆
/**
 * @param {*} arr 数组
 * @param {*} x 数组下标
 * @param {*} len 堆大小
 */
function maxHeapify(array, x, heapSize) {
  const lChildIndex = 2 * x + 1;
  const rChildIndex = 2 * x + 2;
  let largest = x;
  let temp;

  if (lChildIndex < heapSize && array[lChildIndex] > array[largest]) {
    largest = lChildIndex;
  }
  if (rChildIndex < heapSize && array[rChildIndex] > array[largest]) {
    largest = rChildIndex;
  }
  if (largest !== x) {
    temp = array[x];
    array[x] = array[largest];
    array[largest] = temp;
    maxHeapify(array, largest, heapSize);
  }
}

// 构建大根堆
function buildMaxHeap(array) {
  const heapSize = array.length;
  for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
    maxHeapify(array, i, heapSize);
  }
}

function heapSort(array) {
  // 可以使用Array.isArray(), 这里只是换种方法
  if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
    // 建堆
    buildMaxHeap(array);

    // 堆排序
    let heapSize = array.length;
    let temp;
    for (let i = heapSize - 1; i >= 1; i--) {
      temp = array[0];
      array[0] = array[i];
      array[i] = temp;
      maxHeapify(array, 0, --heapSize);
    }

    return array;
  } else {
    throw new Error('array is not an Array!');
  }
}

// test-case
const testArray = [91, 60, 96, 13, 35, 65, 46, 65, 10, 30, 20, 31, 77, 81, 22];

debug('result: ', heapSort(testArray));