/**
 * - leetcode 1402. 做菜顺序
 *
 * 题目描述：
 * 	一个厨师收集了他 n 道菜的满意程度 satisfaction ，这个厨师做出每道菜的时间都是 1 单位时间。
 * 	一道菜的 「 like-time 系数 」定义为烹饪这道菜结束的时间（包含之前每道菜所花费的时间）乘以这道菜的满意程度，也就是 time[i]*satisfaction[i] 。
 * 	返回厨师在准备了一定数量的菜肴后可以获得的最大 like-time 系数 总和。
 * 	你可以按 任意 顺序安排做菜的顺序，你也可以选择放弃做某些菜来获得更大的总和。
 *
 * 示例 1：
 * 输入：satisfaction = [-1,-8,0,5,-9]
 * 输出：14
 * 解释：去掉第二道和最后一道菜，最大的 like-time 系数和为 (-1*1 + 0*2 + 5*3 = 14) 。每道菜都需要花费 1 单位时间完成。
 *
 * 示例 2：
 * 输入：satisfaction = [4,3,2]
 * 输出：20
 * 解释：可以按照任意顺序做菜 (2*1 + 3*2 + 4*3 = 20)
 */

/**
 * 算法思想：贪心算法
 * 先从大到小排序
 * [a0, a1, a2, ..., an]
 * f(3) = 3 * a0 + 2 * a1 + 1 * a2;
 * f(2) = 2 * a0 + 1 * a1
 * f(n) = f(n - 1) + 前缀和
 */
const maxSatisfaction = function (satisfaction) {
  // 满意度从大到小排序
  satisfaction.sort((a, b) => b - a);

  let preSum = 0;
  let res = 0;

  for (sa of satisfaction) {
    // 当前前缀和
    preSum += sa;
    if (preSum > 0) {
      // 当前f(n) = f(n - 1) + 前缀和
      res += preSum;
    } else {
      break;
    }
  }

  return res;
};
