function carry(fn) {
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

function add1(a, b, c) {
  return a + b + c;
}

const add = carry(add1);

console.log('res: ', add(1, 2, 3));
console.log('res: ', add(1)(2, 3));
console.log('res: ', add(1, 2)(3));
