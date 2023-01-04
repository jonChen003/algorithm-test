/**
 * leetcode 10: 正则表达式匹配
 * 题目描述：
 *  给定一个字符串 (s) 和一个字符模式 (p)。实现支持 '.' 和 '*' 的正则表达式匹配
 *  '.' 匹配任意单个字符。
 *  '*' 匹配零个或多个前面的元素。
 *  匹配应该覆盖整个字符串 (s) ，而不是部分字符串
 *
 * 示例：https://leetcode-cn.com/problems/regular-expression-matching/
 * 参考解法：
 *  https://leetcode.com/problems/regular-expression-matching/discuss/5684/9-lines-16ms-c-dp-solutions-with-explanations
 *  https://blog.csdn.net/hk2291976/article/details/51165010
 */

const debug = require('debug')('isMatch');

// 方法一：使用动态规划
function isMatch(s, p) {
  const dp = [[]];
  const sLen = s.length;
  const pLen = p.length;
  dp[0][0] = true;

  for (let i = 0; i <= sLen; i++) {
    if (i > 0) dp.push([]);
    for (let j = 1; j <= pLen; j++) {
      if (p[j - 1] === '*') {
        dp[i][j] = dp[i][j - 2] || (i && dp[i - 1][j] && (s[i - 1] === p[j - 2] || p[j - 2] === '.'));
      } else {
        dp[i][j] = i && dp[i - 1][j - 1] && (s[i - 1] === p[j - 1] || p[j - 1] === '.');
      }
    }
  }

  return dp[sLen][pLen];
}

// 方法二：回溯法-递归
// 从后往前匹配
function myMatch(s, i, p, j) {
  if (j === -1) {
    return i === -1;
  }

  if (p[j] === '.' || p[j] === s[i]) {
    return myMatch(s, i - 1, p, j - 1);
  }

  if (p[j] === '*') {
    if (i > -1 && (p[j - 1] === '.' || p[j - 1] === s[i])) {
      if (myMatch(s, i - 1, p, j)) return true;
    }
    return myMatch(s, i, p, j - 2);
  }

  return false;
}

function isMatchV2(s, p) {
  return myMatch(s, s.length - 1, p, p.length - 1);
}

// test-case
debug('isMatch_v1_1', isMatch('aa', 'a*'));
debug('isMatch_v2_1', isMatchV2('aa', 'a*'));

debug('isMatch_v1_2', isMatch('ab', '.*'));
debug('isMatch_v2_2', isMatchV2('ab', '.*'));

debug('isMatch_v1_3', isMatch('aab', 'c*a*b'));
debug('isMatch_v2_3', isMatch('aab', 'c*a*b'));

debug('isMatch_v1_4', isMatchV2('aa', 'a'));
debug('isMatch_v2_4', isMatchV2('aa', 'a'));

debug('isMatch_v1_5', isMatchV2('mississippi', 'mis*is*p*.'));
debug('isMatch_v2_5', isMatchV2('mississippi', 'mis*is*p*.'));