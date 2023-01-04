/**
 * leetcode 128: 最长连续序列
 * 题目描述：
 *  给定一个未排序的整数数组，找出最长连续序列的长度
 *  要求算法的时间复杂度为 O(n)
 * 示例：
 *  输入: [100, 4, 200, 1, 3, 2]
 *  输出: 4
 *  解释: 最长连续序列是 [1, 2, 3, 4]。它的长度为 4
 */

const debug = require('debug')('longestConsecutive');

/**
 * 算法思想：空间换时间，利用哈希表
 */

/**
 * 解法1：
 *  1、用哈希表存储每个端点值对应的连续区间长度
 *  2、若当前元素已在哈希表中，跳过不做处理
 *  3、若当前元素不在哈希表中：
 *    - 取出其左右相邻数已有的连续区间长度 left 和 right
 *    - 计算当前数的区间长度为：cur_length = left + right + 1
 *    - 根据 cur_length 更新最大长度 max_length 的值
 *    - 更新区间两端点的长度值
 */

function longestConsecutiveV1(nums) {
  const hash = {};
  let leftLen = 0;
  let rightLen = 0;
  let maxLen = 0;

  for (let i = 0; i < nums.length; i++) {
    if (hash[nums[i]] === undefined) {
      let curLen = 0;
      leftLen = hash[nums[i] - 1] || 0;
      rightLen = hash[nums[i] + 1] || 0;
      curLen = leftLen + rightLen + 1;

      if (curLen > maxLen) {
        maxLen = curLen;
      }

      hash[nums[i]] = curLen;
      hash[nums[i] - leftLen] = curLen;
      hash[nums[i] + rightLen] = curLen;
    }
  }

  return maxLen;
}


// 解法2：
function longestConsecutiveV2(nums) {
  const hash = {};
  const visited = {};
  let maxLen = 0;

  for (let i = 0; i < nums.length; i++) {
    hash[nums[i]] = 1;
  }

  for (let i = 0; i < nums.length; i++) {
    const curVal = nums[i];
    if (visited[curVal]) continue;

    visited[curVal] = true;
    let curLen = 1;

    let preVal = curVal - 1;
    while (hash[preVal]) {
      curLen += 1;
      visited[preVal--] = true;
    }

    let nextVal = curVal + 1;
    while (hash[nextVal]) {
      curLen += 1;
      visited[nextVal++] = true;
    }

    if (curLen > maxLen) {
      maxLen = curLen;
    }
  }

  return maxLen;
}

// test-case

debug('case1: ', longestConsecutiveV1([100, 4, 200, 1, 3, 2]));
debug('case1: ', longestConsecutiveV2([100, 4, 200, 1, 3, 2]));