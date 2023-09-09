/**
 * - leetcode 24: 两两交换链表中的节点
 *
 * 题目描述：
 *  给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。
 *  你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）
 *
 * 示例1：
 *  输入: 1->2->3->4
 *  输出: 2->1->4->3
 */

/**
 * 算法思想：
 *  建议使用虚拟头结点，这样会方便很多，要不然每次针对头结点（没有前一个指针指向头结点），还要单独处理
 *
 * 参考文档：
 *  https://programmercarl.com/0024.%E4%B8%A4%E4%B8%A4%E4%BA%A4%E6%8D%A2%E9%93%BE%E8%A1%A8%E4%B8%AD%E7%9A%84%E8%8A%82%E7%82%B9.html
 */

const { SinglyList, Node, printSinglyList } = require('../../lib/singlyList');

/**
 * 方式1： 使用虚拟头结点（推荐）
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function swapPairs(head) {
  // 设置一个虚拟头结点
  const dummyHead = new Node(0);
  // 将虚拟头结点指向head，这样方便后面做删除操作
  dummyHead.next = head;
  let cur = dummyHead;

  // cur -> 1 -> 2 -> 3 -> 4
  while (cur.next !== null && cur.next.next !== null) {
    // firstNode和thirdNode用于记录临时节点
    const firstNode = cur.next;
    const thirdNode = cur.next.next.next;

    // cur -> 2
    cur.next = cur.next.next;
    // 2 -> 1
    cur.next.next = firstNode;
    // 1 -> 3
    firstNode.next = thirdNode;

    // cur移动两位，准备下一轮交换
    cur = cur.next.next;
  }

  return dummyHead.next;
}

/**
 * 方式2：不使用虚拟头结点的方式（不推荐）
 */
function swapPairsV2(head) {
  let cur = head;
  let pre = null;

  while (cur && cur.next) {
    const tmp = cur.next.next;
    cur.next.next = cur;
    if (!pre) {
      pre = cur.next;
      head = cur.next;
    } else {
      pre.next = cur.next;
    }

    cur.next = tmp;

    pre = cur;
    cur = cur.next;
  }

  return head;
}

// test-case
const list = new SinglyList();
list.append(1);
list.append(2);
list.append(3);
list.append(4);
// list.append(5);

console.log('originList: ', printSinglyList(list.head));

const result = swapPairs(list.head);
console.log('swapPairs: ', printSinglyList(result));
