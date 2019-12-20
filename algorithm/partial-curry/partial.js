const debug = require('debug')('partial');

// 方法一：使用bind
/**
 * 使用bind
 * 最简单的方法
 */

function add(x, y) {
  return x + y;
}

const addOne = add.bind(null, 1);

debug(addOne(2));

/**
 * 使用bind改变了this的指向
 */

// 方法二：简略版
function partialV1(fn) {
  const args = [].slice.call(arguments, 1);
  return function () {
    const newArgs = args.concat([].slice.call(arguments));
    return fn.apply(this, newArgs);
  };
}

const addOneV2 = partialV1(add, 1);

debug(addOneV2(3));

// 方法三：可以使用占位符

const _ = '_';
function partialV2(fn) {
  const args = [].slice.call(arguments, 1);
  return function () {
    let position = 0;
    const len = args.length;
    for (let i = 0; i < len; i++) {
      args[i] = args[i] === _ ? arguments[position++] : args[i];
    }
    while (position < arguments.length) {
      args.push(arguments[position++]);
    }
    return fn.apply(this, args);
  };
}

const addOneV3 = partialV2(add, _, 1);

debug(addOneV3(4));