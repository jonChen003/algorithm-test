/* eslint-disable no-extend-native */
/**
 * bind实现的要点：
 *  1、返回一个待执行的函数
 *  2、绑定作用域，绑定传参
 *  3、动态参数
 *  4、原型链：需要继承原函数的原型链方法
 *  5、被当做构造函数时，需要把原函数的this对象继承过来
 * @param {*} that
 * @returns
 */
if (!Function.prototype.bind) {
  Function.prototype.bind = function (that) {
    const _this = this;
    const args = Array.prototype.slice.call(arguments, 1);
    const FNOP = function () {};
    const fBound = function () {
      return _this.apply(this instanceof fBound ? this : that, args.concat(Array.slice.call(arguments)));
    };

    if (this.prototype) {
      FNOP.prototype = this.prototype;
    }

    fBound.prototype = new FNOP();

    return fBound;
  };
}
