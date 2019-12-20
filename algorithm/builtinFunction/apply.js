/* eslint-disable no-extend-native */
/**
 * applay实现要点：
 *  apply的实现思路和call一致，仅参数处理略有差别
 */

Function.prototype.apply = function (thisArg, rest) {
  let result;
  if (!thisArg) {
    thisArg = typeof window === 'undefined' ? global : window;
  }

  thisArg.func = this;

  if (!rest) {
    result = thisArg.func();
  } else {
    result = thisArg.func(...rest);
  }

  delete thisArg.func;

  return result;
};
