/**
 * - letcode 151. 反转字符串里面的单词
 * 示例：
 * 输入: "the sky is blue",
 * 输出: "blue is sky the".
 * 说明：
 * 无空格字符构成一个单词。
 * 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
 * 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
 */

// 方法一：双指针
function reverseWords1(str) {
  const len = str.length;
  let rs = '';
  for (let i = len - 1, end = len; i >= 0; i--) {
    if (str.charAt(i) === ' ') {
      end = i;
    } else if (str.charAt(i - 1) === ' ' || i === 0) {
      if (rs.length) rs += ' ';
      rs += str.substring(i, end);
    }
  }
  return rs;
}

function reverseWord2(str) {
  const strArray = str.replace(/\s+/g, ' ').split(' ');
  let len = strArray.length;
  let tmp;
  for (let i = 0, j = len - 1; i <= j; i++, j--) {
    if (!strArray[i]) {
      strArray.splice(i, 1);
      i -= 1;
      j -= 1;
    }
    if (!strArray[j]) {
      strArray.splice(j, 1);
    }
  }

  len = strArray.length;
  for (let i = 0, j = len - 1; i <= j; i++, j--) {
    tmp = strArray[i].replace(/\s+/g, '');
    strArray[i] = strArray[j].replace(/\s+/g, '');
    strArray[j] = tmp;
  }

  return strArray.join(' ');
}

console.log('reverse:', reverseWords1('the sky is blue  '));
console.log('reverse:', reverseWords1('  the sky is blue  '));
