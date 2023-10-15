/**
 * - leetcode 25. K个一组翻转链表
 */

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */

// 翻转每一轮链表
const reverseList = (head) => {
  let preNode = null;
  let currentNode = head;
  let tmp = null;

  while (currentNode) {
    tmp = currentNode.next;
    currentNode.next = preNode;

    preNode = currentNode;
    currentNode = tmp;
  }

  return preNode;
};

const reverseKGroup = function (head, k) {
  // 新建一个虚拟节点方便操作链表
  const dummy = new ListNode(0);
  dummy.next = head;

  // pre: 代表待翻转链表的前一个元素
  let pre = dummy;
  // end: 代表待翻转链表的最后一个元素
  let end = dummy;

  while (end.next) {
    // 移动end指针到待翻转链表的最后一个元素
    for (let i = 0; i < k && end !== null; i++) {
      end = end.next;
    }
    // 如果不足k个元素无须再操作
    if (end === null) break;

    // 每一轮的开始元素
    let start = pre.next;
    // 下一轮的开始元素
    let next = end.next;

    // 开始翻转当前轮的元素
    end.next = null;
    pre.next = reverseList(start);

    // 移动指针，准备下一轮
    start.next = next;
    pre = start;
    end = start;
  }

  return dummy.next;
};
