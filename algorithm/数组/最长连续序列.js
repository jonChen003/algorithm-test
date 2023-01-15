/**
 * - leetcode 128: 最长连续序列
 *
 * 题目描述：
 *  给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
 *  请你设计并实现时间复杂度为 O(n) 的算法解决此问题
 *
 * 示例：
 *  输入: [100, 4, 200, 1, 3, 2]
 *  输出: 4
 *  解释: 最长连续序列是 [1, 2, 3, 4]。它的长度为 4
 */

/**
 * 算法思想：空间换时间，利用哈希表
 */

/**
 * 解法1：
 *  1、用哈希表存储每个x对应的连续区间长度
 *  2、若当前元素已在哈希表中，跳过不做处理
 *  3、若当前元素不在哈希表中：
 *    - 取出其左右相邻数已有的连续区间长度 left 和 right
 *    - 计算当前数的区间长度为：cur_length = left + right + 1
 *    - 根据 cur_length 更新最大长度 max_length 的值
 *    - 重点：只需要更新区间左右端点的长度值即可
 */

function longestConsecutiveV1(nums) {
  // key: nums[i], value: nums[i]对应的连续区间长度
  const hash = {};
  let leftLen = 0; // 最左边的连续长度
  let rightLen = 0; // 右边对应的连续长度
  let maxLen = 0;

  for (let i = 0; i < nums.length; i++) {
    const curVal = nums[i];
    // 先判断是不是已经存在hash表中了，如果存在表示计算过了
    if (hash[curVal] === undefined) {
      let curLen = 0;
      leftLen = hash[curVal - 1] || 0; // 左边连续长度
      rightLen = hash[curVal + 1] || 0; // 右边连续长度
      curLen = leftLen + rightLen + 1;

      maxLen = Math.max(maxLen, curLen);

      hash[curVal] = curLen;
      hash[curVal - leftLen] = curLen; // 更新最左端点的值
      hash[curVal + rightLen] = curLen; // 更新最右端点的值
    }
  }

  return maxLen;
}

/**
 * 解法2：
 *  哈希表存放去重数字，方便访问
 *  找每个数x, ……, x - 2, x - 1, x + 1, x + 2, ……
 *  再通过设置访问标识，降低时间复杂度
 */
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

console.log('case1: ', longestConsecutiveV1([100, 4, 200, 1, 3, 2]));
console.log('case1: ', longestConsecutiveV2([100, 4, 200, 1, 3, 2]));
