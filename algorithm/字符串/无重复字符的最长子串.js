/**
 * - leetcode 3: 无重复字符的最长子串
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

// 方法一：暴力解法
function lengthOfLongestSubstringV1(s) {
  const strLen = s.length;
  let maxLen = 0;

  for (let i = 0; i < strLen; i++) {
    const tmp = [s[i]];
    for (let j = i + 1; j < strLen; j++) {
      if (!tmp.includes(s[j])) {
        tmp.push(s[j]);
      } else {
        break;
      }
    }

    maxLen = Math.max(maxLen, tmp.length);
  }

  return maxLen;
}

/**
 * - 方法二：滑动窗口(双指针) + hashmap (推荐)
 *
 * 算法思想：
 *  可以定义字符到索引的映射
 *  当我们找到重复的字符时：
 *    如果 s[j] 在 [i, j)范围内有与 j'重复的字符
 *    我们不需要逐渐增加 i， 我们可以直接跳过 [i，j'] 范围内的所有元素，并将 i变为 j' + 1
 */
function lengthOfLongestSubstring(s) {
  if (!s || s.length === 0) return 0;

  const map = new Map(); // map: key是字符，value是该字符对应的位置
  let max = 0;
  let left = 0; // 滑动窗口开始的位置(左边界)

  // i是滑动窗口右边界
  for (let i = 0; i < s.length; i++) {
    const curChar = s[i];
    if (map.has(curChar)) {
      // 发现有重复的字符时，需要移动变换滑动窗口的左边界
      left = Math.max(left, map.get(curChar) + 1);
    }

    // 新增或更新map
    map.set(curChar, i);
    // 比较滑动窗口区间长度与当前最大值的大小
    max = Math.max(max, i - left + 1);
  }

  return max;
}

// test-case

console.log('case1: ', lengthOfLongestSubstringV1('abcabcbb'));
console.log('case1: ', lengthOfLongestSubstring('abcabcbb'));

console.log('case1: ', lengthOfLongestSubstringV1('bbbbb'));
console.log('case1: ', lengthOfLongestSubstring('bbbbb'));

console.log('case2: ', lengthOfLongestSubstringV1('pwwkew'));
console.log('case2: ', lengthOfLongestSubstring('pwwkew'));
