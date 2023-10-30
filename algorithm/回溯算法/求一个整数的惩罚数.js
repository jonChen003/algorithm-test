/**
 * - leetcode 2698. 求一个整数的惩罚数
 *
 * 题目描述：
 * 	给你一个正整数 n ，请你返回 n 的 惩罚数 。
 *	n 的 惩罚数 定义为所有满足以下条件 i 的数的平方和：
 *	1 <= i <= n
 *	i * i 的十进制表示的字符串可以分割成若干连续子字符串，且这些子字符串对应的整数值之和等于 i 。
 *
 * 示例 1：
 *	输入：n = 10
 *	输出：182
 *	解释：总共有 3 个整数 i 满足要求：
 *	- 1 ，因为 1 * 1 = 1
 *	- 9 ，因为 9 * 9 = 81 ，且 81 可以分割成 8 + 1 。
 *	- 10 ，因为 10 * 10 = 100 ，且 100 可以分割成 10 + 0 。
 *	因此，10 的惩罚数为 1 + 81 + 100 = 182
 */

/**
 * 算法思想：回溯法 - 检查若干连续子字符串之和等于i
 * 重点是检查若干连续子字符串之和等于i: 1296 = 1 + 29 + 6
 */

/**
 * @param {*} str: 字符串1296
 * @param {*} pos: 每次递归开始的位置
 * @param {*} total: 之前收集到的子串之和
 * @param {*} target: 目标之和
 * @return {*}
 */
function dfs(str, pos, total, target) {
  // 递归终止条件
  if (pos === str.length) {
    return total === target;
  }

  let sum = 0;
  // 列举本层的可能性：1、12、129、1296
  for (let i = pos; i < str.length; i++) {
    sum = sum * 10 + Number(str[i]);
    if (total + sum > target) {
      return false;
    }
    // 针对每一种可能性再去递归
    // 也就是 1 + dfs(296) 是否满足
    if (dfs(str, i + 1, total + sum, target)) {
      return true;
    }
  }

  return false;
}

var punishmentNumber = function (n) {
  let res = 0;

  for (let i = 1; i <= n; i++) {
    if (dfs(`${i * i}`, 0, 0, i)) {
      res += i * i;
    }
  }

  return res;
};
