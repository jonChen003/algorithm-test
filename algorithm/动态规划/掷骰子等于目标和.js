/**
 * 题目描述：
 * 	这里有 n 个一样的骰子，每个骰子上都有 k 个面，分别标号为 1 到 k 。
 * 	给定三个整数 n ,  k 和 target ，返回可能的方式(从总共 kn 种方式中)滚动骰子的数量，使正面朝上的数字之和等于 target 。
 * 	答案可能很大，你需要对 109 + 7 取模 。

 * 示例 1：
 * 	输入：n = 1, k = 6, target = 3
 * 	输出：1
 * 	解释：你扔一个有 6 个面的骰子。
 * 	得到 3 的和只有一种方法。
 *
 * 示例 2：
 * 输入：n = 2, k = 6, target = 7
 * 输出：6
 * 解释：你扔两个骰子，每个骰子有 6 个面。
 * 得到 7 的和有 6 种方法：1+6 2+5 3+4 4+3 5+2 6+1。
 */

/**
 * 方法一：类似于求路径总和，用回溯算法，但是leetcode上跑超时
 */
var numRollsToTarget = function (n, k, target) {
  let count = 0;

  function traverse(path) {
    const sum = path.reduce((acc, val) => acc + val, 0);
    if (path.length === n) {
      if (sum === target) {
        console.log('path---', [...path]);
        count++;
        count = count % (Math.pow(10, 7) + 7);
      }

      return;
    }

    for (let i = 1; i <= k; i++) {
      if (!path.includes(i)) {
        path.push(i);
        traverse(path);
        path.pop();
      }
    }
  }

  traverse([]);

  return count;
};

var numRollsToTarget_v2 = function (n, k, target) {
  const mod = Math.pow(10, 9) + 7;
  // dp[i][j]: 投第i个骰子时，总和为j的方案数
  const dp = Array(n + 1)
    .fill(0)
    .map(() => Array(target + 1).fill(0));

  // 初始化
  dp[0][0] = 1;

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= target; j++) {
      for (let x = 1; x <= k; x++) {
        if (j >= x) {
          dp[i][j] = (dp[i][j] + dp[i - 1][j - x]) % mod;
        }
      }
    }
  }

  return dp[n][target];
};

// test-case
// console.log('res: ', numRollsToTarget(1, 6, 3));
// console.log('res: ', numRollsToTarget(2, 6, 7));
console.log('res: ', numRollsToTarget_v2(1, 6, 3));
console.log('res: ', numRollsToTarget_v2(2, 6, 7));
