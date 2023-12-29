/**
 * - leetcode 2103. 环和杆
 *
 * 题目描述：
 * 	总计有 n 个环，环的颜色可以是红、绿、蓝中的一种。这些环分别穿在 10 根编号为 0 到 9 的杆上。
 * 	给你一个长度为 2n 的字符串 rings ，表示这 n 个环在杆上的分布。rings 中每两个字符形成一个 颜色位置对 ，用于描述每个环：
 * 	第 i 对中的 第一个 字符表示第 i 个环的 颜色（'R'、'G'、'B'）。
 * 	第 i 对中的 第二个 字符表示第 i 个环的 位置，也就是位于哪根杆上（'0' 到 '9'）。
 *
 * 例如，"R3G2B1" 表示：共有 n == 3 个环，红色的环在编号为 3 的杆上，绿色的环在编号为 2 的杆上，蓝色的环在编号为 1 的杆上。
 * 找出所有集齐 全部三种颜色 环的杆，并返回这种杆的数量
 */

/**
 * 算法思想：利用按位或的方式来保存状态
 *  用一个 3位二进制整数来表示每个杆的状态
 *  具体的，在二进制表示中，从低到高的第 0,1,2位分别表示是否有红、绿、蓝色
 */
const countPoints = function (rings) {
  // 使用一维数组
  const state = Array(10).fill(0);
  const len = rings.length;
  let count = 0;

  for (let i = 0; i < len; i += 2) {
    const index = Number(rings[i + 1]);
    const color = rings[i];
    // 采用按位或的方式来保存状态
    if (color === 'R') {
      // 最低位标识是否有R环
      state[index] |= 1;
    }
    if (color === 'G') {
      // 低位第二位来标识是否有G环
      state[index] |= 2;
    }
    if (color === 'B') {
      // 低位第三位来标识是否有B环
      state[index] |= 4;
    }
  }

  for (let j = 0; j < state.length; j++) {
    if (state[j] === 7) {
      count++;
    }
  }

  return count;
};
