/**
 * - leetcode 455: 分发饼干
 *
 * 题目描述：
 *  假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。
 *  对每个孩子 i，都有一个胃口值 g[i]，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j，都有一个尺寸 s[j] 。
 *  如果 s[j] >= g[i]，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。
 *  你的目标是尽可能满足越多数量的孩子，并输出这个最大数值
 *
 * 示例1：
 *  输入：g = [1,2], s = [1,2,3]
 *  输出： 2
 *  解释：你有两个孩子和三块小饼干，2个孩子的胃口值分别是1,2。你拥有的饼干数量和尺寸都足以让所有孩子满足。所以你应该输出2.
 */

/**
 * 算法思想：
 *  使用贪心策略，先将饼干数组和小孩数组排序
 *  然后从后向前遍历小孩数组，用大饼干优先满足胃口大的，并统计满足小孩数量
 *
 * 参考文档：
 *  https://programmercarl.com/0455.%E5%88%86%E5%8F%91%E9%A5%BC%E5%B9%B2.html
 */

/**
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(1)
 */
/**
 * @param {*} g: 小孩胃口数组
 * @param {*} s: 饼干数组
 */
function findContentChildren(g, s) {
  // 先将饼干数组和小孩数组从小到大排序
  g = g.sort((a, b) => a - b);
  s = s.sort((a, b) => a - b);

  let index = s.length - 1; // 饼干数组的下标
  let result = 0;

  for (let i = g.length - 1; i >= 0; i--) {
    if (index >= 0 && s[index] >= g[i]) {
      result++;
      index--;
    }
  }

  return result;
}

// test-case
const g = [1, 2];
const s = [1, 2, 3];

console.log('findContentChildren---', findContentChildren(g, s));
