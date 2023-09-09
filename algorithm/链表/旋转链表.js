/**
 * - leetcode 61: 旋转链表
 * 题目描述：
 *  给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数
 *
 * 示例：
 * 示例1：
 *  输入: 1->2->3->4->5->NULL, k = 2
 *  输出: 4->5->1->2->3->NULL
 *  解释:
 *  向右旋转 1 步: 5->1->2->3->4->NULL
 *  向右旋转 2 步: 4->5->1->2->3->NULL
 *
 * 示例2：
 *  输入: 0->1->2->NULL, k = 4
 *  输出: 2->0->1->NULL
 *  解释:
 *  向右旋转 1 步: 2->0->1->NULL
 *  向右旋转 2 步: 1->2->0->NULL
 *  向右旋转 3 步: 0->1->2->NULL
 *  向右旋转 4 步: 2->0->1->NULL
 */

const { SinglyList, printSinglyList } = require('../../lib/singlyList');

/**
 * 算法思路：
 *  1、遍历链表，获取链表总长度
 *  2、遍历后将单链表改成循环列表
 *  3、找到下一次头节点、尾节点
 *  4、改成单链表
 */
function rotateRight(head, k) {
  if (head === null || k <= 0) return head;

  let current = head;
  let tail = null;
  let length = 1;

  // 移动current指针到尾节点，并获取链表总长度
  while (current.next !== null) {
    current = current.next;
    length += 1;
  }

  // 改成循环链表：可以同时移动当前指针和尾指针
  tail = current;
  tail.next = head;
  current = head;

  // 找到新的头节点和尾节点
  let step = length - (k % length);
  while (step--) {
    current = current.next;
    tail = tail.next;
  }

  // 改成单链表
  tail.next = null;
  return current;
}

// test-case
const list = new SinglyList();
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);
console.log('originList: ', printSinglyList(list.head));

const result = rotateRight(list.head, 2);
console.log('rotateList: ', printSinglyList(result));
