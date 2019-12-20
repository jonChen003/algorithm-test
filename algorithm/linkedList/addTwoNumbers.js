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

import SinglyList, {
  printSinglyList,
  Node,
} from '../../lib/singlyList';

const debug = require('debug')('addTwoNumbers');

/**
 * 解题思路：
 *  1. 三个链表的current指针：c1, c2, c3
 *  2. 新链表：l3
 *  3. 放到下一位相加的数字：carry
 */

/**
 * @param {*} l1：链表1
 * @param {*} l2：链表2
 */
function addTwoNumbers(l1, l2) {
  const list3 = new SinglyList();
  let currentNode1 = l1;
  let currentNode2 = l2;
  let currentNode3 = null;
  let carry = 0;

  while (currentNode1 || currentNode2 || carry) {
    let v1 = 0;
    let v2 = 0;

    if (currentNode1) {
      v1 = currentNode1.data;
      currentNode1 = currentNode1.next;
    }
    if (currentNode2) {
      v2 = currentNode2.data;
      currentNode2 = currentNode2.next;
    }

    const sum = v1 + v2 + carry;
    carry = Math.floor(sum / 10);

    if (!currentNode3) {
      currentNode3 = new Node(sum % 10);
    } else {
      currentNode3.next = new Node(sum % 10);
      currentNode3 = currentNode3.next;
    }
    list3.append(currentNode3.data);
  }

  return list3;
}

const l1 = new SinglyList();
l1.append(2);
l1.append(4);
l1.append(6);
console.log('l1:', printSinglyList(l1.head));

const l2 = new SinglyList();
l2.append(5);
l2.append(6);
l2.append(4);
console.log('l2:', printSinglyList(l2.head));

const l3 = addTwoNumbers(l1.head, l2.head);
const resList = printSinglyList(l3.head);
debug('resList: ', resList);