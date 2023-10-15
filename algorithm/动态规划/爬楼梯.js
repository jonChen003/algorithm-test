/**
 * - leetcode 70. 爬楼梯
 *
 * 题目描述：
 *  假设你正在爬楼梯。需要 n 阶你才能到达楼顶
 *  每次你可以爬 1 或 2 个台阶
 *  你有多少种不同的方法可以爬到楼顶呢？
 * 说明：假使现在位于第0阶
 * 示例：
 * 示例1：
 *  输入： 2
 *  输出： 2
 *  解释： 有两种方法可以爬到楼顶
 *    1.  1 阶 + 1 阶
 *    2.  2 阶
 * 示例2：
 *  输入： 3
 *  输出： 3
 *  解释： 有三种方法可以爬到楼顶。
 *    1.  1 阶 + 1 阶 + 1 阶
 *    2.  1 阶 + 2 阶
 *    3.  2 阶 + 1 阶
 */

/**
 * 算法思想：
 *  其实只要找到状态转移方程：f(n) = f(n-1) + f(n-2)
 *  类似于菲波那切数列规律
 *
 * 参考文档：
 *   https://programmercarl.com/0509.%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91%E6%95%B0.html
 */

// 方法一：递归法
function climbStairs(n) {
  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }

  return climbStairs(n - 1) + climbStairs(n - 2);
}

/**
 * 方法二：非递归法
 *  1. 递推法-双指针
 *  2. 数组法-使用数组存储
 */

// 递推法-只需要维护两个数值就可以了，不需要记录整个序列
function climbStairsV2(n) {
  if (n === 1 || n === 2) return n;

  let first = 1;
  let second = 2;
  let result = 0;

  for (let i = 3; i <= n; i++) {
    result = first + second;
    // 移动两个数
    first = second;
    second = result;
  }

  return result;
}

// test-case
console.log('case1: ', climbStairs(2));
console.log('case1: ', climbStairsV2(2));

console.log('case2: ', climbStairs(3));
console.log('case2: ', climbStairsV2(3));

console.log('case3: ', climbStairs(4));
console.log('case3: ', climbStairsV2(4));
