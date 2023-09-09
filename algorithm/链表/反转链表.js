/**
 * - leetcode 206: 反转链表
 *
 * 题目描述：
 *  给你单链表的头节点 head ，请你反转链表，并返回反转后的链表
 *
 * 示例1：
 *  输入: 1->2->3->4->5->NULL
 *  输出: 5->4->3->2->1->NULL
 */

/**
 * 算法思想：
 *  只需要改变链表的next指针的指向，直接将链表反转 ，而不用重新定义一个新的链表
 * 双指针解法或者递归解法
 *  双指针解法：
 *    首先定义一个cur指针，指向头结点，再定义一个pre指针，初始化为null
 *
 * 参考文档：
 *  https://programmercarl.com/0206.%E7%BF%BB%E8%BD%AC%E9%93%BE%E8%A1%A8.htm
 */

const { SinglyList, printSinglyList } = require('../../lib/singlyList');

/// 方式一：双指针法(推荐)
/**
 * 双指针：cur指针和pre指针（因为是处理前和处理后两段，所以需要两个指针）
 * cur指针：当前节点
 * pre指针：前一个节点
 *
 * 1->2->3->4->5
 *  pre->1->null  cur->2->3->4->5
 *    pre->2->1->null  cur->3->4->5
 *      pre->3->2->1->null cur->4->5
 *        pre->4->3->2->1->null cur->5
 *          pre->5->4->3->2->1->null cur = null
 */
function reverseList(head) {
  let cur = head;
  let pre = null;
  let tmp = null; // 保存cur的下一个节点

  while (cur) {
    // 保存一下 cur的下一个节点，因为接下来要改变cur->next
    tmp = cur.next;
    // 翻转操作
    cur.next = pre;
    // 更新pre 和 cur指针
    pre = cur;
    cur = tmp;
  }

  return pre;
}

/// 方式二：递归法
function reverse(pre, cur) {
  if (cur === null) return pre;

  const tmp = cur.next;
  cur.next = pre;

  // 可以和双指针法的代码进行对比，如下递归的写法，其实就是做了这两步
  // pre = cur;
  // cur = temp;
  return reverse(cur, tmp);
}

function reverseListV2(head) {
  // 和双指针法初始化是一样的逻辑
  return reverse(null, head);
}

// test-case
const list = new SinglyList();
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);

console.log('originList: ', printSinglyList(list.head));

const result = reverseList(list.head);
console.log('reverseList: ', printSinglyList(result));
