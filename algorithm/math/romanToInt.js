/**
 * leetcode 13: 罗马数字转整数
 * 题目描述：
 *  罗马数字包含以下七种字符: I， V， X， L，C，D 和 M
 *
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
* 例如，罗马数字2写做II，即为两个并列的 1
* 12写做XII，即为X+II。 27写做XXVII, 即为XX+V+II
* 通常情况下，罗马数字中小的数字在大的数字的右边
* 但也存在特例，例如 4 不写做IIII，而是IV
* 数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4
* 同样地，数字 9 表示为IX
* 具体描述参考leetcode: https://leetcode-cn.com/problems/roman-to-integer/
 */

const debug = require('debug')('romanToInt');

/**
 * 解题思路：
 *  1、建立一个HashMap来映射符号和值
 *  2、从左到右遍历字符串：
 *    - 当前字符代表的值不小于右边，就加上该值
 *    - 当前字符代表的值小于右边，就减去该值
 */
function romanToInt(str) {
  const map = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  const len = str.length;
  let result = 0;

  for (let i = 0; i < len; i++) {
    if (i < len - 1 && map[str[i]] < map[str[i + 1]]) {
      result -= map[str[i]];
    } else {
      result += map[str[i]];
    }
  }

  return result;
}

// test-case

debug('case1: ', romanToInt('III'));
debug('case2: ', romanToInt('IV'));
debug('case3: ', romanToInt('IX'));
debug('case4: ', romanToInt('LVIII'));
debug('case5: ', romanToInt('MCMXCIV'));