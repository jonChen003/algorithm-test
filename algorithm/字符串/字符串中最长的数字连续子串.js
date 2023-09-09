/**
 * - 找出字符串中的最长数字连续子串
 * 题目描述：
 *  给出一个字符串作为输入，找出其中最长的连续数字串并返回其长度和起始index
 *  如果存在长度相同的连续数字串，返回最后一个连续数字串。
 *  如果没有，返回0和0
 *
 * 示例：
 *  输入：a1234b457
 *  输出：[1, 4]，最长连续数字串是1234，起始index:1, 长度为4
 *
 * 参考链接：https://www.jianshu.com/p/b4dfc225dc77
 */

// 方法一：基础解法-空间复杂度为O(n)
/**
 * @param {*} str
 * @returns result[]
 *  result[0]: 连续数字字符串的起始index
 *  result[1]: 连续数字字符串的长度
 */
function findLongestNumberSubstringV1(str) {
  const result = [0, 0];
  if (!str || str.length === 0) return result;

  const strLen = str.length;
  let index = 0;
  // 1. 外层循环遍历字符串
  while (index < strLen) {
    const tmpArray = [];
    // 2. 内层循环寻找数字串
    while (index < strLen && /\d/.test(str.charAt(index))) {
      tmpArray.push(str.charAt(index));
      index += 1;
    }

    // 3. 判断是否需要更新结果数组
    const tmpArrLen = tmpArray.length;
    if (tmpArrLen && tmpArrLen >= result[1]) {
      result[0] = index - tmpArrLen;
      result[1] = tmpArrLen;
    }

    // 4. 指针继续往前走
    index += 1;
  }

  return result;
}

/**
 * 但事实上，考虑到我们需要的只是子字符串的起始index和长度
 * 这道题可以用2 pointers的方法解决
 * 并不需要记录中间产生的任何子字符串，这样的话我们可以将算法的空间复杂度降到O(1)
 * 具体算法为：
 *  从头到尾遍历字符串，每当遇到数字连续数字子串时，记录其长度
 *  并与全局记录的最长长度相比较
 *  如果更长的话，就记录当前长度和开始index
 */

// 方法二：优化解法-空间复杂度为O(1) (推荐)
/**
 * @param {*} str
 * @returns result[]
 *  result[0]: 连续数字字符串的起始index
 *  result[1]: 连续数字字符串的长度
 */
function findLongestNumberSubstringV2(str) {
  const result = [0, 0];
  if (!str || str.length === 0) return result;

  const strLen = str.length;
  let index = 0;
  let curLen = 0; // 记录最长长度的指针

  // 遍历字符串
  while (index < strLen) {
    curLen = 0;
    // 碰到数字的话，以当前为起点，往后连续找数字
    // 记录连续数字字符串长度
    while (index < strLen && /\d/.test(str.charAt(index))) {
      curLen += 1;
      index += 1;
    }
    // 与已有数据比较，判断是否需要更新结果数组
    if (curLen && curLen >= result[1]) {
      result[0] = index - curLen;
      result[1] = curLen;
    }

    index += 1;
  }

  return result;
}

// test-case
const str1 = 'a1234b457';

console.log('result: ', findLongestNumberSubstringV1(str1));
console.log('result: ', findLongestNumberSubstringV2(str1));
