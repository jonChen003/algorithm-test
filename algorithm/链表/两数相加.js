/**
 * leetcode 2：两数相加
 * 题目描述：
 *  给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，
 *  并且它们的每个节点只能存储 一位 数字。
 *  如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
 *  可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 * 示例：
 *  输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
 *  输出：7 -> 0 -> 8
 *  原因：342 + 465 = 807
 */

/**
 * 解题思路：
 *  1. 三个链表的current指针：c1, c2, c3
 *  2. 新链表：l3
 *  3. 放到下一位相加的数字：carry
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let current1 = l1;
  let current2 = l2;
  let head = null;
  let current3 = null;
  let carry = 0;

  // while循环的判定条件
  while (current1 || current2 || carry) {
    let value = 0;

    if (current1) {
      // 取值
      value += current1.val;
      // 移动
      current1 = current1.next;
    }
    if (current2) {
      // 取值
      value += current2.val;
      // 移动
      current2 = current2.next;
    }
    value += carry;

    // 无论value大于9还是小于等于9，都可以统一计算carry和value
    carry = Math.floor(value / 10);
    value %= 10;

    const node = new ListNode(value);
    if (current3) {
      current3.next = node;
      current3 = current3.next;
    } else {
      current3 = node;
      head = current3;
    }
  }

  return head;
};
