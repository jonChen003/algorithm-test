/**
 * - leetcode 156. 合并乱序区间
 * 示例 1：
 * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
 * 输出：[[1,6],[8,10],[15,18]]
 * 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

 * 示例 2：
 * 输入：intervals = [[1,4],[4,5]]
 * 输出：[[1,5]]
 * 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间
 */

/**
 * 算法思想
 *  1、先排序
 *  2、按个合并区间
 *    不重合：直接加入
 *    重合：比较两个区间的右侧端点
 */
const merge = function (intervals) {
  if (intervals.length <= 1) return intervals;
  const res = [];

  // 先根据第一个数字进行排序
  intervals.sort((a, b) => a[0] - b[0]);

  for (intv of intervals) {
    if (res.length === 0 || intv[0] > res[res.length - 1][1]) {
      // 不重合：直接加入
      res.push(intv);
    } else {
      // 重合：比较两个区间的右侧端点
      res[res.length - 1][1] = Math.max(res[res.length - 1][1], intv[1]);
    }
  }

  return res;
};
