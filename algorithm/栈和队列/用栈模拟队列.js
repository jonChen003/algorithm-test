/**
 * - leetcode 232. 用栈模拟队列
 *
 * 题目描述：
 * 	请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）
 * 	实现 MyQueue 类：
 *		void push(int x) 将元素 x 推到队列的末尾
 *		int pop() 从队列的开头移除并返回元素
 *		int peek() 返回队列开头的元素
 *		boolean empty() 如果队列为空，返回 true ；否则，返回 false
 */

/**
 * 用两个栈模拟队列
 * 两个栈：入队栈、出队栈
 * 入队栈：每次向队列添加元素时，进入入队栈
 * 出队栈：当出队栈存在内容时，出队栈的栈顶，即为第一个要出队的元素
 */
var MyQueue = function () {
  // 入队栈
  this.inStack = [];
  // 出队栈
  this.outStack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
// 向队列末尾添加元素
MyQueue.prototype.push = function (x) {
  this.inStack.push(x);
};

/**
 * @return {number}
 */
// 弹出队列的第一个元素
MyQueue.prototype.pop = function () {
  if (!this.outStack.length) {
    // 如果出队栈没有元素，依次将入队栈的元素放到出队栈中
    while (this.inStack.length) {
      this.outStack.push(this.inStack.pop());
    }
  }
  // 取出出队栈中的第一个元素
  return this.outStack.pop();
};

/**
 * @return {number}
 */
// 获取队列中的第一个元素
MyQueue.prototype.peek = function () {
  if (!this.outStack.length) {
    while (this.inStack.length) {
      this.outStack.push(this.inStack.pop());
    }
  }
  // 返回出队栈中的第一个元素
  return this.outStack[this.outStack.length - 1];
};

/**
 * @return {boolean}
 */
// 判断队列是否为空
MyQueue.prototype.empty = function () {
  return this.inStack.length === 0 && this.outStack.length === 0;
};
