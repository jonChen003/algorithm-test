/**
 * 实现一个uniq函数，实现数组去重
 */

const debug = require('debug')('uniq');

// 方法一：利用es6新增数据类型set
function uniqV1(arr) {
  return [...new Set(arr)];
}

// 方法二：利用indexOf
function uniqV2(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    // result中没有arr[i]，则添加到数组中
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i]);
    }
  }

  return result;
}

// 方法三：利用includes
function uniqV3(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!result.includes(arr[i])) {
      result.push(arr[i]);
    }
  }

  return result;
}

// 方法四：利用reduce
function uniqV4(arr) {
  return arr.reduce(
    (acc, val) => (acc.includes(val) ? acc : [...acc, val]),
    [],
  );
}

// 方法五：利用Map
function uniqV5(arr) {
  const map = new Map();
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (!map.has(arr[i])) {
      map.set(arr[i], true);
      result.push(arr[i]);
    }
  }

  return result;
}

// test-case
debug('uniqV1: ', uniqV1([1, 2, 3, 2, 4]));
debug('uniqV2: ', uniqV2([1, 2, 3, 2, 4]));
debug('uniqV3: ', uniqV3([1, 2, 3, 2, 4]));
debug('uniqV4: ', uniqV4([1, 2, 3, 2, 4]));
debug('uniqV5: ', uniqV5([1, 2, 3, 2, 4]));
