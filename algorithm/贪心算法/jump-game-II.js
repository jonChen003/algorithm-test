/**
 * - leetcode 45：跳跃游戏II
 *
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
 */

/**
 * 这里需要统计两个覆盖范围，当前这一步的最大覆盖和下一步最大覆盖
 * 如果移动下标达到了当前这一步的最大覆盖最远距离了，还没有到终点的话，那么就必须再走一步来增加覆盖范围，直到覆盖范围覆盖了终点
 */
function jumpGameII(nums) {
  if (nums.length === 1) return 0;

  let jumpCnt = 0; // 记录走的最大步数
  let curDistance = 0; // 当前覆盖最远距离下标
  let nextDistance = 0; // 下一步覆盖最远距离下标

  for (let i = 0; i < nums.length; i++) {
    // 更新下一步覆盖最远距离下标
    nextDistance = Math.max(i + nums[i], nextDistance);
    // 遇到当前覆盖最远距离下标
    if (i === curDistance) {
      // 如果当前覆盖最远距离下标不是终点
      if (curDistance !== nums.length - 1) {
        // 需要走下一步
        jumpCnt++;
        // 更新当前覆盖最远距离下标
        curDistance = nextDistance;
        // 下一步的覆盖范围已经可以达到终点，结束循环
        if (nextDistance >= nums.length - 1) break;
      } else break; // 当前覆盖最远距离下标是集合终点，不用再跳了，直接结束
    }
  }

  return jumpCnt;
}

/**
 * (推荐)
 * 针对于方法一的特殊情况，可以统一处理，即：移动下标只要遇到当前覆盖最远距离的下标，直接步数加一，不考虑是不是终点的情况。
 * 想要达到这样的效果，只要让移动下标，最大只能移动到nums.size - 2的地方就可以了
 */
/* eslint-disable camelcase */
function jumpGameII_V2(nums) {
  let jumpCnt = 0; // 记录走的最大步数
  let curDistance = 0; // 当前覆盖的最远距离下标
  let nextDistance = 0; // 下一步覆盖的最远距离下标

  // 注意这里是小于nums.length - 1，这是关键所在
  for (let i = 0; i < nums.length - 1; i++) {
    // 更新下一步覆盖的最远距离下标
    nextDistance = Math.max(nums[i] + i, nextDistance);

    // 遇到当前覆盖的最远距离下标
    if (i === curDistance) {
      jumpCnt++;
      // 更新当前覆盖的最远距离下标
      curDistance = nextDistance;
    }
  }

  return jumpCnt;
}

/**
 * (更推荐)
 * 维护两个指针left和right
 * left：记录当前位置可到达的左边界
 * right：记录当前位置可到达的右边界
 */
function jumpGameV1(nums) {
  const len = nums.length;
  let jumpCnt = 0;
  let left = 0;
  let right = 0;

  // 注意循环的边界条件，这里right < len - 1
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
    if (i > curReach) {
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

console.log('最少跳跃次数: ', jumpGameV1(testArr));
console.log('最少跳跃次数: ', jumpGameV2(testArr));

console.log('最少跳跃次数: ', jumpGameII(testArr));
console.log('最少跳跃次数: ', jumpGameII_V2(testArr));
