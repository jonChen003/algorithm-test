/**
 *  - leetcode 10: 正则表达式匹配
 *
 * 题目描述：
 *  给定一个字符串 (s) 和一个字符模式 (p)。实现支持 '.' 和 '*' 的正则表达式匹配
 *  '.' 匹配任意单个字符。
 *  '*' 匹配零个或多个前面的元素。
 *  匹配应该覆盖整个字符串 (s) ，而不是部分字符串
 *
 * 示例：https://leetcode-cn.com/problems/regular-expression-matching/
 *
 * 参考解法：
 *  https://leetcode.cn/problems/regular-expression-matching/solution/shou-hui-tu-jie-wo-tai-nan-liao-by-hyj8/
 *  https://leetcode.cn/problems/regular-expression-matching/solution/dong-tai-gui-hua-zen-yao-cong-0kai-shi-si-kao-da-b/
 *  https://blog.csdn.net/hk2291976/article/details/51165010
 */

// 方法一：使用动态规划
function isMatch(s, p) {
  const sLen = s.length;
  const pLen = p.length;
  // 确定dp数组以及下标的含义
  // dp[i][j]: 表示长度为i的s串是否能被长度为j的p串匹配
  const dp = Array.from(Array(sLen + 1), () => Array(pLen + 1).fill(false));
  // dp数组初始化
  // s和p都是空串
  dp[0][0] = true;
  // s为空串，p不为空串，要想匹配，p右侧只能是*
  for (let j = 1; j <= pLen; j++) {
    if (p[j - 1] === '*') dp[0][j] = dp[0][j - 2];
  }

  for (let i = 1; i <= sLen; i++) {
    for (let j = 1; j <= pLen; j++) {
      if (s[i - 1] === p[j - 1] || p[j - 1] === '.') {
        // s.charAt(i - 1) === p.charAt(j - 1) 或者p.charAt(j - 1) === '.'的情况
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] === '*') {
        // p最后一个字符是*的情况
        if (s[i - 1] === p[j - 2] || p[j - 2] === '.') {
          // p.charAt(j - 2) === s.charAt(i - 1)或者p.charAt(j - 2) === '.'的情况
          dp[i][j] = dp[i][j - 2] || dp[i - 1][j - 2] || dp[i - 1][j];
        } else {
          // p.charAt(j - 2) !== s.charAt(i - 1)的情况
          dp[i][j] = dp[i][j - 2];
        }
      }
    }
  }

  return dp[sLen][pLen];
}

// 方法二：递归 + 从后往前匹配（推荐）
function isMatchV2(s, p) {
  function myMatch(i, j) {
    if (j === -1) return i === -1;

    if (p[j] === '.' || p[j] === s[i]) {
      return myMatch(i - 1, j - 1);
    }

    if (p[j] === '*') {
      if ((i > -1 && p[j - 1] === '.') || p[j - 1] === s[i]) {
        // myMatch(i - 1, j) in this case, a* counts as multiple a
        // myMatch(i, j - 2) in this case, a* counts as empty
        // myMatch(i - 1, j - 2) in this case, a* counts as single a
        return myMatch(i - 1, j) || myMatch(i, j - 2) || myMatch(i - 1, j - 2);
      } else {
        // p.charAt(j-1) != s.charAt(i) in this case, a* only counts as empty
        return myMatch(i, j - 2);
      }
    }

    return false;
  }

  return myMatch(s.length - 1, p.length - 1);
}

// test-case
console.log('isMatch_v1_1', isMatch('aa', 'a*'));
console.log('isMatch_v2_1', isMatchV2('aa', 'a*'));

console.log('isMatch_v1_2', isMatch('ab', '.*'));
console.log('isMatch_v2_2', isMatchV2('ab', '.*'));

console.log('isMatch_v1_3', isMatch('aab', 'c*a*b'));
console.log('isMatch_v2_3', isMatchV2('aab', 'c*a*b'));

console.log('isMatch_v1_4', isMatch('aa', 'a'));
console.log('isMatch_v2_4', isMatchV2('aa', 'a'));

console.log('isMatch_v1_5', isMatch('mississippi', 'mis*is*p*.'));
console.log('isMatch_v2_5', isMatchV2('mississippi', 'mis*is*p*.'));
