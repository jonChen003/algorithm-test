/**
 * - 冒泡排序
 *  需要考虑的点：
 *  一、平均/最差时间复杂度是：O(n^2)，肯定是两层循环，两层都用for还是先while和for结合？
 *  二、最好情况下时间复杂度是：O(n)，这是如何实现的？
 *    1、核心是记录发生交换的最后位置
 *    2、遍历顺序很重要：第一层从下往上，第二层从上往下，这样的话第二层遍历就知道到哪就结束，不再遍历了
 *    3、第一层用while，主要是记录每一轮终止的位置，第二层用for，在终止的位置前按个比较交换
 */
function bubbleSort(arr) {
  let lastPos = arr.length - 1; // 代表每一轮终止的位置
  let tempPos; // 用于优化
  let temp;

  while (lastPos > 0) {
    // 每次置为0，因为一轮下来都没有发生交换，那就表示后面都是有序的，不用再遍历了
    tempPos = 0;

    // 在终止位置前进行比较和交换
    for (let j = 0; j < lastPos; j++) {
      if (arr[j] > arr[j + 1]) {
        // 记录发生交换的最后位置
        tempPos = j;
        // 交换位置
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }

    lastPos = tempPos;
  }

  return arr;
}

console.log(
  bubbleSort([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48])
);
