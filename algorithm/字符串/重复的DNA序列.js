/**
 * - leetcode 187. 重复的DNA序列
 *
 * 题目描述：
 * 	DNA序列 由一系列核苷酸组成，缩写为 'A', 'C', 'G' 和 'T'.
 *	例如，"ACGAATTCCG" 是一个 DNA序列 。
 *	在研究 DNA 时，识别 DNA 中的重复序列非常有用。
 *	给定一个表示 DNA序列 的字符串 s ，返回所有在 DNA 分子中出现不止一次的 长度为 10 的序列(子字符串)。
 * 	你可以按 任意顺序 返回答案。
 *
 *	示例 1：
 *	输入：s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
 *	输出：["AAAAACCCCC","CCCCCAAAAA"]
 *
 *	示例 2：
 *	输入：s = "AAAAAAAAAAAAA"
 *	输出：["AAAAAAAAAA"]
 */

/**
 * 算法思想：哈希表 + 滑动窗口（每次以当前位置为起点，窗口大小为10）
 */
var findRepeatedDnaSequences = function (s) {
  const len = s.length;
  const res = [];
  const map = new Map();

  // 每个位置为窗口左位置，窗口大小固定10
  for (let i = 0; i <= len - 10; i++) {
    const str = s.slice(i, i + 10);
    const count = map.get(str) || 0;
    map.set(str, count + 1);

    if (map.get(str) === 2) {
      res.push(str);
    }
  }

  return res;
};
