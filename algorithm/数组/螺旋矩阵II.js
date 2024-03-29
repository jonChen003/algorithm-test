/**
 * - leetcode 59: 螺旋矩阵II
 *
 * 题目描述：
 *  给你一个正整数 n ，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix
 *
 * 示例1：
 *  输入：n = 3
 *  输出：[[1,2,3],[8,9,4],[7,6,5]]
 *  1 2 3
 *  8 9 4
 *  7 6 5
 *
 * 示例2：
 *  输入：n = 4
 *  1  2  3  4
 * 12 13  14 5
 * 11 16  15 6
 * 10  9  8  7
 *
 * 示例3：
 *  输入：n = 1
 *  输出：[[1]]
 */

/**
 * 算法思想：
 *  关键在于坚持循环不变量原则，
 *  坚持每条边左闭右开原则[left, right)
 *  模拟顺时针画矩阵的过程:
 *   填充上行从左到右
 *   填充右列从上到下
 *   填充下行从右到左
 *   填充左列从下到上
 *  由外向内一圈一圈这么画下去
 *
 * 参考文档：
 *  https://programmercarl.com/0059.%E8%9E%BA%E6%97%8B%E7%9F%A9%E9%98%B5II.html
 */
// 推荐
function generateMatrix(n) {
  // 定义一个二维数组
  const nums = new Array(n).fill(0).map(() => new Array(n).fill(0));
  // 定义每循环一个圈的起始位置
  let startX = 0;
  let startY = 0;
  // 旋转圈数，当n为奇数时，矩阵中间的值需要单独处理
  let loop = Math.floor(n / 2);
  // 需要控制每一条边遍历的长度，每次循环右边界收缩一位
  let offset = 1;

  // 用来给矩阵中每一个空格赋值
  let count = 1;

  // 外层循环，按圈循环
  while (loop--) {
    let row = startX;
    let col = startY;

    // 下面开始的四个for就是模拟转了一圈
    // 模拟填充上行从左到右(左闭右开)
    for (; col < n - offset; col++) {
      nums[row][col] = count++;
    }

    // 模拟填充右列从上到下(左闭右开)
    for (; row < n - offset; row++) {
      nums[row][col] = count++;
    }

    // 模拟填充下行从右到左(左闭右开)
    for (; col > startY; col--) {
      nums[row][col] = count++;
    }

    // 模拟填充左列从下到上(左闭右开)
    for (; row > startX; row--) {
      nums[row][col] = count++;
    }

    // 第二圈开始的时候，起始位置要各自加1， 例如：第一圈起始位置是(0, 0)，第二圈起始位置是(1, 1)
    startX++;
    startY++;
    // offset 控制每一圈里每一条边遍历的长度
    offset++;
  }

  // 如果n为奇数的话，需要单独给矩阵最中间的位置赋值
  // 矩阵中间的位置，例如：n为3， 中间的位置就是(1，1)，n为5，中间位置为(2, 2)
  const mid = Math.floor(n / 2);
  if (n % 2 === 1) {
    nums[mid][mid] = count;
  }

  return nums;
}

function generateMatrix_v2(n) {
  // 定义一个二维数组
  const nums = new Array(n).fill(0).map(() => new Array(n).fill(0));
  // 定义每循环一个圈的起始位置
  let startX = 0;
  let startY = 0;
  // 旋转圈数，当n为奇数时，矩阵中间的值需要单独处理
  let loop = Math.floor(n / 2);
  // 需要控制每一条边遍历的长度，每次循环右边界收缩一位
  let offset = 1;
  // 用来给矩阵中每一个空格赋值
  let count = 1;

  // 外层循环，按圈循环
  while (loop--) {
    // 还是用上面的row和col更简洁
    for (let col = startY; col < n - offset; col++) {
      nums[startX][col] = count++;
    }

    for (let row = startX; row < n - offset; row++) {
      nums[row][n - offset] = count++;
    }

    for (let col = n - offset; col > startY; col--) {
      nums[n - offset][col] = count++;
    }

    for (let row = n - offset; row > startX; row--) {
      nums[row][startY] = count++;
    }

    startX++;
    startY++;
    offset++;
  }

  // 如果n为奇数的话，需要单独给矩阵最中间的位置赋值
  // 矩阵中间的位置，例如：n为3， 中间的位置就是(1，1)，n为5，中间位置为(2, 2)
  const mid = Math.floor(n / 2);
  if (n % 2 === 1) {
    nums[mid][mid] = count;
  }

  return nums;
}

// test-case
console.log('1*1的螺旋矩阵：', generateMatrix(1));
console.log('3*3的螺旋矩阵：', generateMatrix(3));
console.log('4*4的螺旋矩阵：', generateMatrix(4));
console.log('5*5的螺旋矩阵：', generateMatrix(5));

console.log('1*1的螺旋矩阵：', generateMatrix_v2(1));
console.log('3*3的螺旋矩阵：', generateMatrix_v2(3));
console.log('4*4的螺旋矩阵：', generateMatrix_v2(4));
console.log('5*5的螺旋矩阵：', generateMatrix_v2(5));
