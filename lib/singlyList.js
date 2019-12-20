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
  const length = this._length;
  let currentNode = this.head;
  let count = 1;

  // 处理非法参数
  if (length === 0 || position < 1 || position > length) {
    throw new Error(MESSAGE.failure);
  }

  // 合法参数
  while (count < position) {
    currentNode = currentNode.next;
    count += 1;
  }

  return currentNode;
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

// 打印链表
SinglyList.prototype.print = function () {
  return printSinglyList(this.head);
};

export default SinglyList;

export {
  printSinglyList,
  Node,
};