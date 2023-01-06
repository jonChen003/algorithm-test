/**
 * leetcode 146: LRU缓存机制
 */

const { DlinkedList, DlinkedNode } = require('./DlinkedList');

/**
 * 实现思想：基于HashMap和双向循环链表实现LRU
 *  双向循环列表头节点指向最新鲜节点
 *  cache满的时候，删除双向循环尾部节点
 */
const LRUCache = function (capacity) {
  this.capacity = capacity;
  this.count = 0;
  this.dlinkedList = new DlinkedList();
  this.map = new Map();
};

LRUCache.prototype.get = function (key) {
  const node = this.map.get(key);
  if (typeof node === 'undefined') return -1;
  // 移到链表最前面
  this.dlinkedList.moveNodeToHead(node);
  return node.value;
};

LRUCache.prototype.put = function (key, value) {
  const node = this.map.get(key);
  if (typeof node === 'undefined') {
    const newNode = new DlinkedNode(key, value);
    this.map.set(key, newNode);
    this.dlinkedList.addNode(newNode);
    this.count += 1;

    if (this.count > this.capacity) {
      const tailNode = this.dlinkedList.popTailNode();
      this.map.delete(tailNode.key);
      this.count -= 1;
    }
  } else {
    // 更新值和新鲜度
    node.value = value;
    this.dlinkedList.moveNodeToHead(node);
  }
};

const cache = new LRUCache(3);
cache.put('key1', 7);
cache.dlinkedList.print();
cache.put('key2', 0);
cache.dlinkedList.print();
cache.put('key3', 1);
cache.dlinkedList.print();
cache.put('key4', 2);
cache.dlinkedList.print();

cache.get('key2');
cache.dlinkedList.print();
cache.put('key5', 3);
cache.dlinkedList.print();
cache.get('key2');
cache.dlinkedList.print();
cache.put('key6', 4);
cache.dlinkedList.print();
