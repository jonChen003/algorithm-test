function DlinkedNode(key = null, value = null) {
  this.key = key;
  this.value = value;
  this.pre = null;
  this.next = null;
}

// 双向循环列表 - head和tail哨兵节点
function DlinkedList() {
  this.head = new DlinkedNode();
  this.tail = new DlinkedNode();
  this.head.next = this.tail;
  this.tail.pre = this.head;
}

// 增加节点：总是在head节点之后增加新的节点
DlinkedList.prototype.addNode = function (node) {
  node.pre = this.head;
  node.next = this.head.next;
  this.head.next.pre = node;
  this.head.next = node;
};

// 删除一个节点
DlinkedList.prototype.removeNode = function (node) {
  node.pre.next = node.next;
  node.next.pre = node.pre;
};

// 移动某一个节点到头部
DlinkedList.prototype.moveNodeToHead = function (node) {
  this.removeNode(node);
  this.addNode(node);
};

// 删除链表最后一个节点
DlinkedList.prototype.popTailNode = function () {
  const tailNode = this.tail.pre;
  this.removeNode(tailNode);
  return tailNode;
};

DlinkedList.prototype.print = function () {
  const arr = [];
  let currentNode = this.head.next;
  while (currentNode !== this.tail) {
    arr.push(currentNode.value);
    currentNode = currentNode.next;
  }
  console.log('current-list: ', arr.join('->'));
  return arr.join('->');
};

module.exports = {
  DlinkedList,
  DlinkedNode,
};
