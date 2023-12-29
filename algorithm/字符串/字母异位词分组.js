/**
 * - leetcode 49. 字母异位词分组
 *
 * 题目描述：
 * 	给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
 * 	字母异位词 是由重新排列源单词的所有字母得到的一个新单词。

 * 示例 1:
 *	输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 *	输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 */

/**
 * 字母异位词通用解法：
 *  - 方式一：排序（排序比较是否是异位词）
 *  - 方式二：计数（26位数组来计数）
 */

/**
 * 方式一：map + 排序（推荐）
 */
const groupAnagrams = function (strs) {
  const map = new Map();

  for (let str of strs) {
    // str转数组
    const arr = Array.from(str);
    // 默认将元素转换为字符串，然后按照它们的 UTF-16 码元值升序排序
    arr.sort();

    const key = arr.toString();

    const list = map.get(key) ? map.get(key) : [];
    list.push(str);

    map.set(key, list);
  }

  return Array.from(map.values());
};

/**
 * 方式二：map + 计数
 */
const groupAnagrams_v2 = function (strs) {
  const map = new Map();

  for (let str of strs) {
    const count = Array(26).fill(0);

    for (let char of str) {
      count[char.charCodeAt() - 'a'.charCodeAt()]++;
    }

    const key = count.toString();
    const list = map.get(key) ? map.get(key) : [];
    list.push(str);

    map.set(key, list);
  }

  return Array.from(map.values());
};
