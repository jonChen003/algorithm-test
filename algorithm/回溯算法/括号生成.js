/**
 * - leetcode 22. 括号生成
 *
 * 题目描述
 * 	数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合
 *
 * 示例 1：
 * 输入：n = 3
 * 输出：["((()))","(()())","(())()","()(())","()()()"]
 *
 * 示例 2：
 * 输入：n = 1
 * 输出：["()"]
 *
 * 参考文档：
 * 	https://leetcode.cn/problems/generate-parentheses/solution/hui-su-suan-fa-by-liweiwei1419/
 * 	https://leetcode.cn/problems/generate-parentheses/solution/shou-hua-tu-jie-gua-hao-sheng-cheng-hui-su-suan-fa/
 */

/**
 * - 回溯算法 + 剪枝
 * 通过深度优先遍历来实现
 * [流程图](https://pic.leetcode-cn.com/efbe574e5e6addcd1c9dc5c13a50c6f162a2b14a95d6aed2c394e18287a067fa-image.png)
 */
function generateParenthesis(n) {
  const res = [];

  // 1. 确定回溯函数入参
  function dfs(curStr, leftCount, rightCount) {
    // 2. 确定终止条件
    if (leftCount === n && rightCount === n) {
      res.push(curStr);
      return;
    }

    // 剪枝操作
    if (leftCount < rightCount) {
      return;
    }
    // 3. 深度优先遍历
    // 加左括号
    if (leftCount < n) {
      dfs(curStr + '(', leftCount + 1, rightCount);
    }

    // 加右括号
    if (rightCount < n) {
      dfs(curStr + ')', leftCount, rightCount + 1);
    }
  }

  dfs('', 0, 0);

  return res;
}

// test-case

console.log('res: ', generateParenthesis(2));
console.log('res: ', generateParenthesis(3));
