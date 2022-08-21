/**
 * - 函数的柯里化
 */

/// 经典版
function _curry(fn) {
  // fn.length获取函数的参数个数
  const fnArgLength = fn.length;

  // 注意这里需要包一层，如果没有这个wrap，可以参考下方示例
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

/// 错误写法
function _curry2(fn) {
  // fn.length获取函数的参数个数
  const fnArgLength = fn.length;
  // 不能这样写，argList不释放
  let argList = [];

  return function next(...nextArgs) {
    argList = argList.concat(nextArgs);
    if (argList.length === fnArgLength) {
      return fn(...argList);
    }
    return next;
  };
}

// 阶乘的尾递归
function _factorial(num, total) {
  if (num === 1) return total;
  return _factorial(num - 1, num * total);
}

const curryFactorial = _curry(_factorial);
const curryFactorial2 = _curry2(_factorial);

console.log('res---', curryFactorial(5, 1));
console.log(curryFactorial(5)(1));

console.log('res---', curryFactorial2(5, 1));
console.log('res2---', curryFactorial2(5)(1));
