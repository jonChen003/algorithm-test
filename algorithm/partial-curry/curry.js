const _debug = require('debug');

const debug = _debug('curry');

// 函数的柯里化
function _curry(fn) {
  const fnArgLength = fn.length;
  return function wrap(...args) {
    let argList = [...args];
    if (argList.length === fnArgLength) {
      return fn(...argList);
    }

    return function next(...nextArgs) {
      argList = argList.concat(nextArgs);
      if (argList.length === fnArgLength) {
        return fn(...argList);
      }
      return next;
    };
  };
}

// 阶乘的尾递归
function _factorial(num, total) {
  if (num === 1) return total;
  return _factorial(num - 1, num * total);
}

const curryFactorial = _curry(_factorial);

debug('res---', curryFactorial(5, 1));
debug(curryFactorial(5)(1));