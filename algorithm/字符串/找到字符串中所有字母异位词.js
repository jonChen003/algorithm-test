/**
 * - leetcode 438. 找到字符串中所有字母异位词
 *
 * 题目描述：
 * 	给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
 * 	异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。

 * 示例 1:
 *	输入: s = "cbaebabacd", p = "abc"
 *	输出: [0,6]
 *	解释:
 *	起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
 *	起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
 */

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */

/**
 * 方式一：滑动窗口 + sort（基础版）
 * leetcode上跑超时
 */
const findAnagrams = function (s, p) {
  const len = p.length;
  const targetStr = Array.from(p).sort().toString();
  let res = [];

  for (let i = 0; i <= s.length - len; i++) {
    const str = s.slice(i, i + len);
    const sortStr = Array.from(str).sort().toString();

    if (sortStr === targetStr) {
      res.push(i);
    }
  }

  return res;
};

/**
 * 方式二：滑动窗口 + 计数（推荐）
 * leetcode跑没问题，容易理解，但不是最优解
 * 最优解参考：
 * 	https://leetcode.cn/problems/find-all-anagrams-in-a-string/solutions/1123971/zhao-dao-zi-fu-chuan-zhong-suo-you-zi-mu-xzin/?envType=study-plan-v2&envId=top-100-liked
 */
const findAnagrams_v2 = function (s, p) {
  const sLen = s.length;
  const pLen = p.length;
  const res = [];

  if (sLen < pLen) {
    return res;
  }

  const pCount = Array(26).fill(0);
  for (let i = 0; i < pLen; i++) {
    pCount[p[i].charCodeAt() - 'a'.charCodeAt()]++;
  }

  for (let i = 0; i <= sLen - pLen; i++) {
    const str = s.slice(i, i + pLen);

    const count = Array(26).fill(0);
    for (let j = 0; j < pLen; j++) {
      count[str[j].charCodeAt() - 'a'.charCodeAt()]++;
    }

    if (count.toString() === pCount.toString()) {
      res.push(i);
    }
  }

  return res;
};
