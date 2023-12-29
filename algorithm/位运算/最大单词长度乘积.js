/**
 * - leetcode 318. 最大单词长度乘积
 *
 * 题目描述：
 * 	给你一个字符串数组 words ，找出并返回 length(words[i]) * length(words[j]) 的最大值
 * 	并且这两个单词不含有公共字母。如果不存在这样的两个单词，返回 0 。

 * 示例 1：
 *	输入：words = ["abcw","baz","foo","bar","xtfn","abcdef"]
 *	输出：16
 *	解释：这两个单词为 "abcw", "xtfn"。

 * 示例 2：
 *	输入：words = ["a","ab","abc","d","cd","bcd","abcd"]
 *	输出：4
 *	解释：这两个单词为 "ab", "cd"。

 * 示例 3：
 *	输入：words = ["a","aa","aaa","aaaa"]
 *	输出：0
 *	解释：不存在这样的两个单词。
 */

/**
 * 算法思想：位运算
 * 	每个单词的不同字母用一个二进制位标识
 * 	abc -> 111
 * 	abd -> 1101
 * 	判断两个单词有没有相同的字母就可以将两个单词的二进制标识位进行按位与运算
 */
/**
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(n)
 */
const maxProduct = function (words) {
  const n = words.length;
  const masks = Array(n).fill(0);
  let maxProd = 0;

  // 遍历每个单词，将每个单词转成对应的二进制位
  for (let i = 0; i < n; i++) {
    const word = words[i];
    for (let j = 0; j < word.length; j++) {
      // 例如'abc' -> 111
      // 将1左移
      masks[i] |= 1 << (word[j].charCodeAt(0) - 'a'.charCodeAt(0));
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // 注意运算优先级
      if ((masks[i] & masks[j]) === 0) {
        // words[i] 和words[j] 没有重复字符
        maxProd = Math.max(maxProd, words[i].length * words[j].length);
      }
    }
  }

  return maxProd;
};
