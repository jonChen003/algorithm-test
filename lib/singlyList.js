const MESSAGE = {
  failure: 'Failure: non-existent node in this list.',
};

function Node(data) {
  this.data = data;
  this.next = null;
}

// head非哨兵
function SinglyList() {
  this.head = null;
  this._length = 0;
}

function printSinglyList(head) {
  let currentNode = head;
  let string = '';

  while (currentNode) {
    string += currentNode.data + (currentNode.next ? '->' : '');
    currentNode = currentNode.next;
  }

  return string;
}

// 在链表尾部添加节点
SinglyList.prototype.append = function (data) {
  const node = new Node(data);

  // 使用虚拟头结点统一操作
  // const dummyHead = new Node(0);
  // let currentNode = dummyHead;

  // while (currentNode.next !== null) {
  //   currentNode = currentNode.next;
  // }

  // currentNode.next = node;
  // this._length++;

  // return node;

  let currentNode = this.head;
  // 空列表
  if (!currentNode) {
    this.head = node;
    this._length += 1;
    return node;
  }

  // 非空列表
  while (currentNode.next) {
    currentNode = currentNode.next;
  }

  currentNode.next = node;
  this._length += 1;
  return node;
};

// 找到特定位置的节点
SinglyList.prototype.searchNodeAt = function (position) {
  // 统一使用虚拟头结点
  const dummyHead = new Node(0);
  let currentNode = dummyHead.next;

  while (position--) {
    currentNode = currentNode.next;
  }

  return currentNode;

  // 不使用虚拟头结点
  // const length = this._length;
  // let currentNode = this.head;
  // let count = 1;

  // // 处理非法参数
  // if (length === 0 || position < 1 || position > length) {
  //   throw new Error(MESSAGE.failure);
  // }

  // // 合法参数
  // while (count < position) {
  //   currentNode = currentNode.next;
  //   count += 1;
  // }

  // return currentNode;
};

// 移除某一位置的节点
SinglyList.prototype.removeAt = function (position) {
  const length = this._length;
  let currentNode = this.head;
  let count = 0;
  let deletedNode = null;
  let beforeDeletedNode = null;
  let nodeWillDelete = null;
  // 校验参数
  if (position < 0 || position > length - 1) {
    throw new Error(MESSAGE.failure);
  }

  // 删除的是第一个节点(头节点)
  if (position === 0) {
    this.head = currentNode.next;
    deletedNode = currentNode;
    currentNode = null;
    this._length -= 1;
    return deletedNode;
  }

  // 其他位置要被删除的节点
  while (count < position) {
    beforeDeletedNode = currentNode;
    nodeWillDelete = currentNode.next;
    currentNode = currentNode.next;
    count += 1;
  }

  beforeDeletedNode.next = nodeWillDelete.next;
  deletedNode = nodeWillDelete;
  nodeWillDelete = null;
  this._length -= 1;

  return deletedNode;
};

// 删除链表中等于给定值 val 的所有节点
// 方式一：原链表中直接操作
SinglyList.prototype.removeByVal = function (val) {
  // 删除头部
  // 这里为什么需要while循环？
  // 主要是解决这种情况(val: 3)：head -> 3 -> 3 -> 3 -> 3
  while (this.head !== null && this.head.data === val) {
    let currentNode = this.head;
    this.head = currentNode.next;
    currentNode = null;
  }

  // 删除非头结点

  // 这里只定义一个临时变量，当然可以再定义一个pre指针
  // let currentNode = this.head;
  // while (currentNode !== null && currentNode.next !== null) {
  //   if (currentNode.next.data === val) {
  //     let tmp = currentNode.next;
  //     currentNode.next = currentNode.next.next;
  //     tmp = null;
  //   } else {
  //     currentNode = currentNode.next;
  //   }
  // }

  if (this.head === null) return this.head;

  let preNode = this.head;
  let currentNode = this.head.next;

  while (currentNode) {
    if (currentNode.data === val) {
      preNode.next = currentNode.next;
    } else {
      preNode = preNode.next;
    }

    currentNode = currentNode.next;
  }

  return this.head;
};

// 方式二： 使用虚拟头结点统一操作
SinglyList.prototype.removeByValWithDummyHead = function (val) {
  // 添加虚拟头结点
  const dummyHead = new Node(0);
  // 将虚拟头结点指向head，这样方面后面做删除操作
  dummyHead.next = this.head;

  // 用一个临时指针来遍历
  let currentNode = dummyHead;

  while (currentNode.next) {
    if (currentNode.next.data === val) {
      currentNode.next = currentNode.next.next;
    } else {
      currentNode = currentNode.next;
    }
  }

  return dummyHead.next;

  // 利用preNode和currentNode两个指针来遍历
  // let preNode = dummyHead;
  // let currentNode = dummyHead.next;

  // while (currentNode) {
  //   if (currentNode.data === val) {
  //     preNode.next = currentNode.next;
  //   } else {
  //     preNode = preNode.next;
  //   }

  //   currentNode = currentNode.next;
  // }

  // return dummyHead.next;
};

// 打印链表
SinglyList.prototype.print = function () {
  return printSinglyList(this.head);
};

// export default SinglyList;

// export { printSinglyList, Node };

module.exports = {
  SinglyList,
  printSinglyList,
  Node,
};
