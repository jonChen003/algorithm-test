/**
 * leetcode 146: LRU缓存机制
 * 题目描述：
 *  运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制。
 *  它应该支持以下操作： 获取数据 get 和 写入数据 put
 *  获取数据 get(key) - 如果密钥 (key) 存在于缓存中，则获取密钥的值（总是正数），否则返回 -1。
 *  写入数据 put(key, value) - 如果密钥不存在，则写入其数据值。
 *  当缓存容量达到上限时，它应该在写入新数据之前删除最近最少使用的数据值，从而为新的数据值留出空间
 *
 * 进阶:
 *  你是否可以在 O(1) 时间复杂度内完成这两种操作？
 *
 * 示例：
 *  LRUCache cache = new LRUCache(2);
 *  cache.put(1, 1);
 *  cache.put(2, 2);
 *  cache.get(1);       // 返回  1
 *  cache.put(3, 3);    // 该操作会使得密钥 2 作废
 *  cache.get(2);       // 返回 -1 (未找到)
 *  cache.put(4, 4);    // 该操作会使得密钥 1 作废
 *  cache.get(1);       // 返回 -1 (未找到)
 *  cache.get(3);       // 返回  3
 *  cache.get(4);       // 返回  4
 */

/**
 * 实现思想：单纯利用map堪称完美方案
 */
const LRUCache = function (capacity) {
  this.capacity = capacity;
  this.map = new Map();
};

LRUCache.prototype.get = function (key) {
  const val = this.map.get(key);
  if (typeof val === 'undefined') return -1;
  // 最新鲜的放到最后
  this.map.delete(key);
  this.map.set(key, val);
  return val;
};

LRUCache.prototype.put = function (key, value) {
  if (this.map.has(key)) {
    this.map.delete(key);
  }
  this.map.set(key, value);
  const keys = this.map.keys();
  while (this.map.size > this.capacity) {
    // cache满的时候，删除最前面的元素
    this.map.delete(keys.next().value);
  }
};
