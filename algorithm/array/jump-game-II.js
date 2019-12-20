/**
 * leetcode 45：跳跃游戏II
 * 题目描述：
 *  1、给定一个非负整数数组，你最初位于数组的第一个位置
 *  2、数组中的每个元素代表你在该位置可以跳跃的最大长度
 *  3、你的目标是使用最少的跳跃次数到达数组的最后一个位置
 *
 * 示例：
 *  输入: [2,3,1,1,4]
 *  输出: 2
 *  解释: 跳到最后一个位置的最小跳跃数是 2。
 *  从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置
 * 解题思路：贪心算法
 */

const debug = require('debug')('jumpGameII');

/**
 * 维护两个指针left和right
 * left：记录当前位置可到达的左边界
 * right：记录当前位置可到达的右边界
 */
function jumpGameV1(nums) {
  const len = nums.length;
  let jumpCnt = 0;
  let left = 0;
  let right = 0;

  while (right < len - 1) {
    let maxBound = right;
    for (let i = left; i <= right; i++) {
      maxBound = Math.max(i + nums[i], maxBound);
    }
    left = right + 1;
    right = maxBound;
    jumpCnt += 1;
  }
  return jumpCnt;
}

/**
 * curReach：当前元素所能跳跃的最大距离
 * maxBound：当前元素能跳跃范围内所能达到的最大范围
 */
function jumpGameV2(nums) {
  const len = nums.length;
  let jumpCnt = 0;
  let maxBound = 0;
  let curReach = 0;

  for (let i = 0; i < len; i++) {
    if (curReach < i) {
      // 需要跳跃
      jumpCnt += 1;
      curReach = maxBound;
    }
    // 能跳跃的最大距离
    maxBound = Math.max(maxBound, i + nums[i]);
  }

  return jumpCnt;
}

const testArr = [2, 3, 1, 1, 4];

debug('最少跳跃次数: ', jumpGameV1(testArr));
debug('最少跳跃次数: ', jumpGameV2(testArr));