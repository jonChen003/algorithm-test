/* eslint-disable no-restricted-syntax, guard-for-in */
/**
 * 深拷贝的实现以及探索:
 *  1、如何解决引用丢失问题
 *  2、如何解决循环引用问题
 *  3、如何解决Date、RegExp等特殊对象问题
 *  4、如何解决爆栈问题
 */

// 简单实现方式
function deepCopy(source) {
  if (!source || typeof source !== 'object') {
    return source;
  }
  const targetObj = Array.isArray(source) ? [] : {};
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object') {
        // targetObj[key] = Array.isArray(source[key]) ? [] : {};
        targetObj[key] = deepCopy(source[key]);
      } else {
        targetObj[key] = source[key];
      }
    }
  }
  return targetObj;
}

function deepCopyV2(obj) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  let newobj = Array.isArray(obj) ? [] : {};
  if (window.JSON) {
    const str = JSON.stringify(obj); // 系列化对象
    newobj = JSON.parse(str); // 还原
  } else {
    for (const i in obj) {
      newobj[i] = typeof obj[i] === 'object' ? deepCopyV2(obj[i]) : obj[i];
    }
  }
  return newobj;
}

/**
 * 1、解决引用丢失和循环引用问题
 * 2、解决Date、RegExp特殊对象问题
 */
function deepCopyV3(obj, map = new WeakMap()) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  let newObj;
  const Constructor = obj.constructor;
  switch (Constructor) {
  case RegExp:
    newObj = new Constructor(obj);
    break;
  case Date:
    newObj = new Constructor(obj.getTime());
    break;
  default:
    if (map.has(obj)) return map.get(obj);
    newObj = new Constructor();
    map.set(obj, newObj);
  }

  for (const key in obj) {
    newObj[key] = typeof obj[key] === 'object' ? deepCopyV3(obj[key], map) : obj[key];
  }

  return newObj;
}
