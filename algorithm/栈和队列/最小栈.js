/**
 * - leetcode 155. 最小栈
 *
 * 题目描述：
 * 	设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
 *	实现 MinStack 类:
 *		MinStack() 初始化堆栈对象。
 *		void push(int val) 将元素val推入堆栈。
 *		void pop() 删除堆栈顶部的元素。
 *		int top() 获取堆栈顶部的元素。
 *		int getMin() 获取堆栈中的最小元素
 */

/**
 * 需要额外添加一个辅助栈，栈顶元素始终是最小元素
 * 正常栈每次push一个元素时，辅助栈也push最小元素
 * 正常栈每次pop一个元素时，辅助栈也pop栈顶元素
 */
var MinStack = function () {
  this.stack = [];
  // 辅助栈，用来存放每次最小元素
  this.minStack = [Infinity];
};

/**
 * @param {number} val
 * @return {void}
 */
// 向栈添加元素
MinStack.prototype.push = function (val) {
  this.stack.push(val);
  const curMin = Math.min(this.minStack[this.minStack.length - 1], val);
  this.minStack.push(curMin);
};

/**
 * @return {void}
 */
// 出栈
MinStack.prototype.pop = function () {
  this.stack.pop();
  this.minStack.pop();
};

/**
 * @return {number}
 */
// 获取栈顶元素
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
// 获取当前栈的最小元素
MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1];
};
