/**
 * leetcode 17: 电话号码的字母组合
 * 题目描述：
 *  给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合
 *  给出数字到字母的映射（与电话按键相同）。注意 1 不对应任何字母
 * 示例：
 *  输入："23"
 *  输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
 */

const debug = require('debug')('letterCombinations');

const numToLetters = {
  0: ' ',
  1: '',
  2: 'abc',
  3: 'def',
  4: 'ghi',
  5: 'jkl',
  6: 'mno',
  7: 'pqrs',
  8: 'tuv',
  9: 'wxyz',
};

function letterCombinations(digits) {
  const result = [];

  if (!digits || digits.length === 0) return result;

  function dfs(str, curLen, curStr) {
    if (str.length === curLen) {
      result.push(curStr);
      return;
    }

    const letters = numToLetters[str[curLen]];
    for (let i = 0; i < letters.length; i++) {
      dfs(str, curLen + 1, curStr + letters[i]);
    }
  }

  dfs(digits, 0, '');
  return result;
}

// test-case

debug('case1: ', letterCombinations('23'));