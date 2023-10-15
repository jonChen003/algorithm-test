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
  const len = str.length;

  // 确定dp数组以及下标含义：从0到索引i的位置总共有dp[i]种翻译方法
  const dp = Array(len).fill(0);
  // 初始化：索引0的位置只有一个翻译方法
  dp[0] = 1;

  // 循环
  for (let i = 1; i < len; i++) {
    const n = Number(`${str[i - 1]}${str[i]}`);
    // 确定递推公式
    if (n >= 10 && n <= 25) {
      if (i === 1) {
        dp[i] = 2;
      } else {
        dp[i] = dp[i - 1] + dp[i - 2];
      }
    } else {
      dp[i] = dp[i - 1];
    }
  }

  return dp[len - 1];
}

// test-case
const num = 12258;
console.log('count: ', translateNum(num));
