/**
 * - leetcode 69. x的平方根
 *
 * 题目描述：
 * 	给你一个非负整数 x ，计算并返回 x 的 算术平方根
 * 	由于返回类型是整数，结果只保留 整数部分 ，小数部分将被舍去
 * 	注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5
 *
 * 示例 1：
 *	输入：x = 4
 *	输出：2
 *
 * 示例 2：
 *	输入：x = 8
 *	输出：2
 *	解释：8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。
 */

/**
 * 算法思想：二分查找法（推荐）
 * 左闭右闭区间[left, right]
 *
 * 时间复杂度：O(logx)
 * 空间复杂度：O(1)
 */
const mySqrt = function (x) {
  if (x <= 1) return x;

  let left = 1;
  let right = Math.floor(x / 2);

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (mid * mid <= x && (mid + 1) * (mid + 1) > x) {
      return mid;
    } else if (mid * mid > x) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return 0;
};

/**
 * 暴力解法
 */
const mySqrt_v2 = function (x) {
  if (x <= 1) return x;
  let res = 0;

  for (let i = 1; i <= x / 2; i++) {
    if (i * i <= x) {
      res = i;
    } else {
      break;
    }
  }

  return res;
};
