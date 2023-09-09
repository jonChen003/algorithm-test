/**
 * - leetcode 946. 验证栈序列
 *
 * 题目描述：
 * 	给定 pushed 和 popped 两个序列，每个序列中的 值都不重复，
 * 	只有当它们可能是在最初空栈上进行的推入 push 和弹出 pop 操作序列的结果时，返回 true；否则，返回 false
 *
 * 示例 1：
 * 输入：pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
 * 输出：true
 * 解释：我们可以按以下顺序执行：
 * push(1), push(2), push(3), push(4), pop() -> 4,
 * push(5), pop() -> 5, pop() -> 3, pop() -> 2, pop() -> 1
 *
 * 示例 2：
 * 输入：pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
 * 输出：false
 * 解释：1 不能在 2 之前弹出。
 *
 * 参考文档：
 * 	https://leetcode.cn/problems/validate-stack-sequences/solution/yan-zheng-zhan-xu-lie-by-leetcode-soluti-cql0/
 */

/**
 * - 模拟栈
 * 时间复杂度：O(n) 需要遍历数组pushed 和 popped 各一次
 * 空间复杂度：O(n) 需要一个辅助栈
 */
function validateStackSequences(pushed, popped) {
  const stack = []; // 需要利用到一个辅助栈做检查

  // 先遍历pushed数组，模拟入栈; 后遍历poped数组模拟出栈
  for (
    let pushIndex = 0, popIndex = 0;
    pushIndex < pushed.length;
    pushIndex++
  ) {
    // 1. 模拟入栈
    stack.push(pushed[pushIndex]);

    // 2. 看poped数组，模拟出栈
    while (stack.length && stack[stack.length - 1] === popped[popIndex]) {
      stack.pop();
      popIndex++;
    }
  }

  // 3. 最后看stack是否为空
  return stack.length === 0;
}

// test-case

console.log('res: ', validateStackSequences([1, 2, 3, 4, 5], [4, 5, 3, 2, 1]));
console.log('res: ', validateStackSequences([1, 2, 3, 4, 5], [4, 3, 5, 1, 2]));
