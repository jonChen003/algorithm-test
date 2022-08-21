/**
 * - 解码数字多少解法(爬楼梯变种)
 *
 * 题目描述：
 *  给定一个数字，我们按照如下规则把它翻译为字符串：
 *  0 翻译成 “a”
 *  1 翻译成 “b”
 *  …
 *  25 翻译成 “z”
 *  一个数字可能有多个翻译。请编程实现一个函数，用来计算一个数字有多少种不同的翻译方法。
 *
 * 示例1:
 *  输入: 12258
 *  输出: 5
 *  解释: 12258有5种不同的翻译，分别是"bccfi", "bwfi", "bczi", "mcfi"和"mzi"
 */

function translateNum(num) {
  const str = `${num}`;

  if (str.length === 1) return 1;

  // 确定dp数组以及下标的含义，dp[i]：长度为i的字符串，有dp[i]种翻译方法
  const dp = [];
  /**
   * 初始化dp数组，长度为1，只有一种翻译方法，
   * 但是当长度为2时，可能有一种，可能有两种，所以放到循环里面去根据条件初始化
   */
  dp[1] = 1;

  for (let i = 2; i <= str.length; i++) {
    const n = Number(`${str[i - 2]}${str[i - 1]}`);

    if (n >= 10 && n <= 25) {
      if (i === 2) {
        dp[2] = 2;
      } else {
        dp[i] = dp[i - 1] + dp[i - 2];
      }
    } else {
      dp[i] = dp[i - 1];
    }
  }

  return dp[str.length];
}

// test-case
const num = 12258;
console.log('count: ', translateNum(num));
