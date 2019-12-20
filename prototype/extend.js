const debug = require('debug')('prototypeExtend');

function Animal(name) {
  this.name = name;
}

Animal.prototype.getName = function () {
  return this.name;
};

function Cat(name, age) {
  Animal.call(this, name);
  this.age = age;
}

// 方式一：
// Cat.prototype = new Animal();

// 方式二：
// Cat.prototype = Object.create(Animal.prototype);

// Cat.prototype.constructor = Cat;

// Cat.prototype.meow = function () {
//   return `${this.getName()}eowww~~~~~, I'm ${this.age} year(s) old`;
// };

// 方法三：
Cat.prototype = Object.create(Animal.prototype, {
  constructor: {
    value: Cat,
  },
  meow: {
    value() { return `${this.getName()}eowww~~~~~, I'm ${this.age} year(s) old`; },
  },
});

const cat = new Cat('Lily', 2);

debug('getName：', cat.getName());
debug('meow：', cat.meow());
