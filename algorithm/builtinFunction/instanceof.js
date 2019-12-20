/* eslint-disable no-proto */
/**
 * 手动实现instanceof
 */

function instanceOf(left, right) {
  // 获得right的显示原型
  const rPrototype = right.prototype;
  // 获得对象的隐式原型
  left = left.__proto__;
  // 判断对象的隐式类型是否等于类型的原型
  while (true) {
    if (left === null) return false;
    if (rPrototype === left) return true;
    left = left.__proto__;
  }
}