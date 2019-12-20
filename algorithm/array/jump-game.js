/**
 * leetcode 55：跳跃游戏
 * 题目描述：
 *  1、给定一个非负整数数组，你最初位于数组的第一个位置
 *  2、数组中的每个元素代表你在该位置可以跳跃的最大长度
 *  3、判断你是否能够到达最后一个位置
 *
 * 示例1：
 *  输入: [2,3,1,1,4]
 *  输出: true
 *  解释: 从位置 0 到 1 跳 1 步, 然后跳 3 步到达最后一个位置
 *
 * 示例2：
 *  输入: [3,2,1,0,4]
 *  输出: false
 *  解释: 无论怎样，你总会到达索引为 3 的位置。但该位置的最大跳跃长度是 0 ， 所以你永远不可能到达最后一个位置
 */

const debug = require('debug')('jumpGame');

/**
 * 方法一: 贪心算法 - 维护一个变量reach表示能够到达的最远的距离
 * 算法主要思路：
 *  1、维护一个变量reach，用来表示能够到达的最远距离
 *  2、循环遍历数组中的每一个数字：
 *    - 如果当前位置大于reach或者reach已经能够抵达最后一个位置，则跳出循环
 *    - 否则，更新reach的值为max(reach, i + nums[i])
 */
function jumpGameV1(nums) {
  if (!Array.isArray(nums) || !nums.length) {
    throw new Error('请输入非空数组');
  }
  const len = nums.length;
  let reach = 0;
  for (let i = 0; i < len; ++i) {
    // i > reach 已经到不了最后位置
    // reach >= n - 1 已经确定能达到最后位置
    if (i > reach || reach >= len - 1) break;
    // 更新reach
    reach = Math.max(reach, i + nums[i]);
  }
  return reach >= len - 1;
}

/**
 * 方法二：贪心算法 - 维护一个变量far表示当前位置能够跳跃的最远的距离
 * @param {Array} nums
 * far表示当前位置能够跳跃的最远距离
 */
function jumpGameV2(nums) {
  const len = nums.length;
  let far = 0;
  for (let j = 0; j < len; ++j) {
    // 当前位置所能够跳跃的最远距离
    far = Math.max(far, nums[j]);
    // 如果当前位置跳跃far步能够到达最后一个位置，直接返回true
    if (far > len - 1 - j) return true;
    // 如果far为0，说明在当前位置一步也无法跳跃，所以停止遍历并返回false
    if (far === 0) break;
    // 继续判断下一个位置所能跳跃的最远距离
    far -= 1;
  }
  return false;
}


const example1 = [2, 3, 1, 1, 4];
const example2 = [3, 2, 1, 0, 4];

debug(example1, jumpGameV1(example1));
debug(example2, jumpGameV1(example2));

debug(example1, jumpGameV2(example1));
debug(example2, jumpGameV2(example2));
