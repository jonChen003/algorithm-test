/* eslint-disable no-extend-native */
/**
 * call实现要点：
 *  1、获取调用call()的函数
 *  2、如果第一个参数没有传入，那么默认指向window/global（非严格模式）
 *  3、转化为隐式调用：thisArgs.func(...args)
 *  4、返回执行结果
 */

Function.prototype.call = function () {
  let [thisArg, ...args] = [...arguments];
  if (!thisArg) {
    // 非严格模式下，context为null或者是undefined
    thisArg = typeof window === 'undefined' ? global : window;
  }

  // this指向的是当前函数(func.call)
  thisArg.func = this;
  // 执行函数
  const result = thisArg.func(...args);
  delete thisArg.func;

  return result;
};
