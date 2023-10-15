/**
 * - leetcode 20. 有效的括号
 *
 * 题目描述：
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 * 	有效字符串需满足：
 * 	左括号必须用相同类型的右括号闭合。
 * 	左括号必须以正确的顺序闭合。
 * 	每个右括号都有一个对应的相同类型的左括号
 *
 * 示例 1：
 * 输入：s = "()"
 * 输出：true
 *
 * 示例 2：
 * 输入：s = "()[]{}"
 * 输出：true
 *
 * 示例 3：
 * 输入：s = "(]"
 * 输出：false
 *
 * 参考文档：
 * 	https://leetcode.cn/problems/valid-parentheses/solution/you-xiao-de-gua-hao-by-leetcode-solution/
 * 	https://leetcode.cn/problems/valid-parentheses/solution/zhu-bu-fen-xi-tu-jie-zhan-zhan-shi-zui-biao-zhun-d/
 */

/* eslint-disable */
/**
 * - 利用栈 + map来解决
 * 我们遍历给定的字符串 ss。当我们遇到一个左括号时，我们会期望在后续的遍历中，有一个相同类型的右括号将其闭合。
 * 由于后遇到的左括号要先闭合，因此我们可以将这个左括号放入栈顶。
 * 当我们遇到一个右括号时，我们需要将一个相同类型的左括号闭合
 * 此时，我们可以取出栈顶的左括号并判断它们是否是相同类型的括号。
 * 	如果不是相同的类型，或者栈中并没有左括号，那么字符串 ss 无效，返回 False
 * 为了快速判断括号的类型，我们可以使用哈希表存储每一种括号。哈希表的键为右括号，值为相同类型的左括号。
 * 在遍历结束后，如果栈中没有左括号，说明我们将字符串 ss 中的所有左括号闭合，返回 True，否则返回 False。

 */
function isValid(s) {
  const stack = [];
  const map = new Map([
    [')', '('],
    [']', '['],
    ['}', '{'],
  ]);

  for (const char of s) {
    if (map.has(char)) {
      // 碰到右括号)、]、}开始判断是否匹配并出栈
      if (!stack.length || stack[stack.length - 1] !== map.get(char)) {
        return false;
      }

      stack.pop();
    } else {
      // (、[、{遇到左括号压入栈中
      stack.push(char);
    }
  }

  return !stack.length;
}

// test-case
console.log('res: ', isValid('()'));
console.log('res: ', isValid('()[]{}'));
console.log('res: ', isValid('(]'));
console.log('res: ', isValid(')('));
