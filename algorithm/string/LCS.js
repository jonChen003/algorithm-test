/* eslint-disable */
// 动态规划 -- 最长公共子序列

//! !!!  T[i][j] 计算，记住口诀：相等左上角加一，不等取上或左最大值

function longestSeq(input1, input2, n1, n2) {
  const T = []; // T[i][j]表示 公共子序列长度
  for (let i = 0; i < n1; i++) {
    T[i] = [];
    for (let j = 0; j < n2; j++) {
      if (j === 0 || i === 0) {
        T[i][j] = 0;
        continue;
      }
      if (input1[i] === input2[j]) {
        T[i][j] = T[i - 1][j - 1] + 1;
      } else {
        T[i][j] = Math.max(T[i - 1][j], T[i][j - 1]);
      }
    }
  }

  findValue(input1, input2, n1, n2, T);

  return T;
}

//! !!如果它来自左上角加一，则是子序列，否则向左或上回退，如果上左一样大，优先取左。
// findValue过程，其实就是和 就是把T[i][j]的计算反过来。
function findValue(input1, input2, n1, n2, T) {
  let i = n1 - 1;
  let j = n2 - 1;
  const result = []; // 结果保存在数组中
  while (i > 0 && j > 0) {
    if (input1[i] === input2[j]) {
      result.unshift(input1[i]);
      i--;
      j--;
    } else {
      // 向左或向上回退
      if (T[i - 1][j] > T[i][j - 1]) {
        // 向上回退
        i--;
      } else {
        // 向左回退
        j--;
      }
    }
  }

  console.log('寻找子串结果：', result);
}

// 两个序列，长度不一定相等, 从计算表格考虑，把input1和input2首位都补一个用于占位的空字符串
const input2 = ['', 'a', 'b', 'c', 'a', 'd', 'f'];

const input1 = ['', 'a', 'c', 'b', 'a', 'd'];

const n1 = input1.length;

const n2 = input2.length;

console.log('二维数组：', longestSeq(input1, input2, n1, n2));
