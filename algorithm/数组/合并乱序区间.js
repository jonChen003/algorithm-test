/**
 * - 合并乱序区间
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
 * 1、sort
 * 2、逐个比较
 *   []  [[1,3],[2,6],[8,10],[15,18]]
 *  [[1,3]]  [[2,6],[8,10],[15,18]]
 *  [[1,6]]  [[8,10],[15,18]]
 *  [[1,6],[8,10]]  [[15,18]]
 *  [[1,6],[8,10],[15,18]]
 */

function mergeInterval(intervals) {
  if (intervals.length <= 1) {
    return intervals;
  }

  // 1. 先根据第一个数字进行排序
  intervals.sort((a, b) => a[0] - b[0]);

  const res = [];

  // 2. 将每一个区间与现有的结果进行比较
  for (const itv of intervals) {
    pushToRes(itv);
  }
  return res;

  function pushToRes(interval) {
    const [start, end] = interval;

    if (res.length === 0) {
      res.push(interval);
    } else {
      // 与res里面每个区间进行比较
      let pushed = false;
      for (let i = 0; i < res.length; i++) {
        // 3. 处理重合的部分
        const newRange = mergeRange(res[i][0], res[i][1], start, end);
        if (newRange) {
          res[i] = newRange;
          pushed = true;
        }
      }
      // 4. 如果都不相交，那就直接塞入
      !pushed && res.push(interval); // 不相交，直接塞入
    }
  }
}

function mergeRange(start1, end1, start2, end2) {
  if (end1 < start2) {
    // 不相交
    return false;
  }
  if (start1 <= start2 && start2 <= end1 && end1 <= end2) {
    // 相交（包含相等）
    return [start1, end2];
  }
  if (start1 <= start2 && end1 >= end2) {
    // 1 包含 2
    return [start1, end1];
  }
  if (start1 >= start2 && end1 <= end2) {
    // 2 包含 1
    return [start2, end2];
  }
}
