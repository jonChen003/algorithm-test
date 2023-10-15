/**
 * - leetcode 509: 斐波那契数
 * 菲波那切数列，又称黄金分割数列，
 * 指的是这样的一个数列：1、1、2、3、5、8、13、21、……
 * 在数学上，菲波那切数列定义：F0=0，F1=1，Fn=F(n-1)+F(n-2)（n>=2，n∈N*）
 */

/**
 * 菲波那切数列的实现
 *  1、递归解法（两种）
 *    - 经典解法
 *    - 优化解法
 *  2、非递归解法
 *    - 递推法
 *    - 数组法
 */

/**
 * 参考文档：
 *   https://programmercarl.com/0509.%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91%E6%95%B0.html
 */

// 经典递归解法
function f(n) {
  if (n === 1 || n === 2) return 1;

  return f(n - 1) + f(n - 2);
}

/**
 * 优化的递归解法
 * 我们可以这样看：fib(1,1,5) = fib(1,2,4) = fib(2,3,3) = 5
 * 也就是说，以1,1开头的斐波那契数列的第五项正是以1,2开头的斐波那契数列的第四项，
 * 而以1,2开头的斐波那契数列的第四项也正是以2,3开头的斐波那契数列的第三项，
 * 更直接地，我们就可以一步到位：fib(2,3,3) = 2 + 3 = 5,计算结束。
 */

/**
 * @param {*} first: 数列开头的第一项
 * @param {*} second: 数列开头的第二项
 * @param {*} n: 以前两个参数开头的数列第n项
 */
// 尾递归解法
function fb(first, second, n) {
  if (n < 1) return 0;
  if (n === 1) return first;
  if (n === 2) return second;
  if (n === 3) return first + second;

  return fb(second, first + second, n - 1);
}

/**
 * 非递归解法：动态规划
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
function fib(n) {
  if (n <= 1) return n;

  const arr = [0, 1];

  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }

  return arr[n];
}

// 非递归解法：只需要维护两个数值就可以了，不需要记录整个序列
function fibV2(n) {
  if (n <= 1) return n;

  let result = 0;
  let first = 0; // 第一项
  let second = 1; // 第二项

  // 两个数移动
  for (let i = 2; i <= n; i++) {
    result = first + second;
    first = second;
    second = result;
  }

  return result;
}

// test-case
const n = 5;
console.log(`fib(${n}):`, fib(n));
console.log(`fib(${n}):`, fibV2(n));
