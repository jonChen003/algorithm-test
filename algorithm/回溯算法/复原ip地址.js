/**
 * - leetcode 93. 复原IP地址
 *
 * 题目描述：
 * 	有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。
 *	例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，
 *	但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。
 *	给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能的有效 IP 地址
 *	这些地址可以通过在 s 中插入 '.' 来形成。你 不能 重新排序或删除 s 中的任何数字。你可以按 任何 顺序返回答案。

 * 示例 1：
 *	输入：s = "25525511135"
 *	输出：["255.255.11.135","255.255.111.35"]
 *
 * 示例 2：
 *	输入：s = "0000"
 *	输出：["0.0.0.0"]
 */

/**
 * 算法思想：回溯法 + 剪枝
 */
const restoreIpAddresses = function (s) {
  const SEG_COUNT = 4;
  const segments = []; // 放ip的每个片段，总共就4个片段
  const res = [];

  // 确定回溯函数入参
  // segId: 第几个ip字段
  // segStart: 当前开始的索引位置
  function dfs(s, segId, segStart) {
    // 递归终止条件
    // 找到4段ip地址了
    if (segId === SEG_COUNT) {
      // 并且遍历完整个字符串
      if (segStart === s.length) {
        res.push(segments.join('.'));
      }
      return;
    }
    // 剪枝
    // 遍历完字符串了，但是没收集到4段ip地址，直接返回
    if (segStart === s.length) {
      return;
    }

    // 处理前导0，如果当前数字是0，那么这一段ip地址只能为0
    if (s[segStart] === '0') {
      segments[segId] = 0;
      dfs(s, segId + 1, segStart + 1);
      return;
    }

    let num = 0;
    // 一般情况，枚举每一种可能性并递归
    for (let i = segStart; i < s.length; i++) {
      num = num * 10 + Number(s[i]);
      if (num > 0 && num <= 255) {
        // 满足要求才会继续递归
        segments[segId] = num;
        dfs(s, segId + 1, i + 1);
      } else {
        break;
      }
    }
  }

  dfs(s, 0, 0);

  return res;
};
