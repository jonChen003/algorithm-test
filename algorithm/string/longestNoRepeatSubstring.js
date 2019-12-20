/**
 * leetcode 3: 无重复字符的最长子串
 * 题目描述：
 *  给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度
 * 示例：
 * 示例1：
 *  输入: "abcabcbb"
 *  输出: 3
 *  解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3
 * 示例2：
 *  输入: "bbbbb"
 *  输出: 1
 *  解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1
 * 示例3：
 *  输入: "pwwkew"
 *  输出: 3
 *  解释: 因为无重复字符的最长子串是"wke"，所以其长度为 3
 *  请注意，你的答案必须是 子串 的长度，"pwke"是一个子序列，不是子串
 */

const debug = require('debug')('longestNoRepeatSubstring');

// 方法一：暴力解法
function allUnique(s, start, end) {
  const tmpArray = [];
  for (let i = start; i <= end; i++) {
    if (tmpArray.indexOf(s[i]) > -1) return false;
    tmpArray.push(s[i]);
  }

  return true;
}

function lengthOfLongestSubstringV1(s) {
  const strLen = s.length;
  let maxLen = 0;

  for (let i = 0; i < strLen; i++) {
    for (let j = i + 1; j < strLen; j++) {
      if (allUnique(s, i, j)) maxLen = Math.max(maxLen, j - i + 1);
    }
  }

  return maxLen;
}

// 方法二：滑动窗口+hashmap
/**
 * 算法思想：
 *  可以定义字符到索引的映射
 *  当我们找到重复的字符时：
 *    如果 s[j] 在 [i, j)范围内有与 j'重复的字符
 *    我们不需要逐渐增加 i， 我们可以直接跳过 [i，j'] 范围内的所有元素，并将 i变为 j' + 1
 */
function lengthOfLongestSubstring(s) {
  if (!s || s.length === 0) return 0;

  const map = {}; // key: 字符, value: 字符所处的位置
  let len = 0; // 记录每一次遍历不重复字符长度
  let maxLen = 0; // 记录最长的不重复字符长度
  let start = 0; // 不重复字符串开始指针

  // 从左到右遍历
  for (let i = 0; i < s.length; i++) {
    const curChar = s[i];
    // 如果存在重复的字符，移动窗口指针，重新计算此次不重复字符长度
    if (map[curChar] !== undefined && map[curChar] >= start) {
      start = map[curChar] + 1;
      len = i - start;
    }

    len += 1;

    if (len > maxLen) {
      maxLen = len;
    }
    // map如果存在则更新，不存在则添加
    map[curChar] = i;
  }

  return maxLen;
}

// test-case

debug('case1: ', lengthOfLongestSubstringV1('abcabcbb'));
debug('case1: ', lengthOfLongestSubstring('abcabcbb'));

debug('case2: ', lengthOfLongestSubstringV1('pwwkew'));
debug('case2: ', lengthOfLongestSubstring('pwwkew'));