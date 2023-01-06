/**
 * - leetcode 394. 字符串解码
 *
 * 题目描述：
 * 	给定一个经过编码的字符串，返回它解码后的字符串。
 * 	编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
 * 	你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
 * 	此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
 *
 * 示例 1：
 * 输入：s = "3[a]2[bc]"
 * 输出："aaabcbc"
 *
 * 示例 2：
 * 输入：s = "3[a2[c]]"
 * 输出："accaccacc"
 *
 * 参考文档：
 *  https://leetcode.cn/problems/decode-string/solution/zhan-de-ji-yi-nei-ceng-de-jie-ma-liao-bie-wang-lia/
 *  https://leetcode.cn/problems/decode-string/solution/decode-string-fu-zhu-zhan-fa-di-gui-fa-by-jyd/
 */

/**
 * - 方式一： 栈 + 循环 (推荐)
 * 用一个栈，非"]"全部压入栈中
 */
function decodeString(s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    // 1. 非"]"字符先全部压入栈中
    if (s[i] !== ']') {
      stack.push(s[i]);
      continue;
    }

    // 2. 遇到"]"时，开始出栈直到遇到 [
    let str = '';
    let curChar = stack.pop();
    while (curChar !== '[') {
      str = curChar + str;
      curChar = stack.pop();
    }

    // 3. 此时curChar为 [，接下来要遇到数字，处理倍数
    let multi = '';
    curChar = stack.pop();
    while (!isNaN(curChar)) {
      multi = curChar + multi;
      curChar = stack.pop();
    }

    // 4. 现在要么是字母，要么是 [
    stack.push(curChar);
    stack.push(str.repeat(multi));
  }

  return stack.join('');
}

/**
 * - 递归法
 * 将 [ 和 ] 分别作为递归的开启与终止条件
 * 当 s[i] == ']' 时，返回当前括号内记录的 res 字符串；
 * 当 s[i] == '[' 时，开启新一层递归，记录此 [...] 内字符串 tmp并执行 res + multi * tmp 拼接字符串
 */
function decodeStringV2(s) {
  let i = 0; // i 作为外部变量，以便在每一次dfs调用时获取到实时值，即公用

  function dfs() {
    let res = '';
    let multi = 0;

    while (i < s.length) {
      const curChar = s[i];

      if (curChar.match(/\d/)) {
        // 当前字符是数字, 数字不止一位，比如 123 就是三位数
        multi = multi * 10 + Number(curChar);
      } else if (curChar === '[') {
        i++; // 跳到下一个坐标，然后再递归处理
        const innerStr = dfs();
        res += innerStr.repeat(multi);
        multi = 0; // reset 0
      } else if (curChar === ']') {
        return res;
      } else {
        res += curChar;
      }

      i++;
    }

    return res;
  }

  return dfs();
}

// test-case
const s1 = '3[a]2[bc]';
const s2 = '3[a2[c]]';
console.log('res---', decodeString(s1));
console.log('res---', decodeString(s2));

console.log('res2---', decodeStringV2(s1));
console.log('res2---', decodeStringV2(s2));
