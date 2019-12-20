const _debug = require('debug');

const debug = _debug('max-path-sum');
// 方式1
const arr = [
  [0, 0, 7, 0, 0],
  [0, 0, 0, 5, 0],
  [2, 0, 4, 0, 0],
  [0, 0, 0, 3, 0],
];
// const arr = new Array(
//     [0, 0, 7, 0, 0],
//     [0, 0, 0, 5, 0],
//     [2, 0, 4, 0, 0],
//     [0, 0, 0, 3, 0],
// );

// 方式2
// function createArray(m, n) {
//     const arr2 = new Array(m);
//     for (let ind = 0; ind < m; ind++) {
//         arr2[ind] = new Array(n);
//     }
//     return arr2;
// }

// 动态规划
function maxPathSum(grid, m, n) {
  for (let i = 1; i < m; i++) {
    grid[i][0] += grid[i - 1][0];
  }
  for (let j = 1; j < n; j++) {
    grid[0][j] += grid[0][j - 1];
  }
  for (let a = 1; a < m; a++) {
    for (let b = 1; b < n; b++) {
      grid[a][b] += Math.max(grid[a - 1][b], grid[a][b - 1]);
    }
  }
  return grid[m - 1][n - 1];
}

debug('res---', maxPathSum(arr, 4, 5));
