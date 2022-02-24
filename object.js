// all props will be true
// const original = {
//   name: "sus",
//   age: 25,
// };

// "use strict";

const original = {};

// all props will be false
const afterChanges = Object.defineProperties(original, {
  name: {
    value: "sus",
    enumerable: true,
    writable: true,
  },
  age: {
    value: 25,
    enumerable: true,
  },
});

Object.defineProperties(afterChanges, {
  name: {
    writable: false,
  },
});

console.log({ afterChanges: Object.getOwnPropertyDescriptors(afterChanges) });

delete afterChanges.name;
console.log({ afterChanges });

// Object.defineProperty(original,'name',{
//     writable:true
// })

// not for deep clone
// const clone1 = Object.assign({}, original);
// console.log({ clone1: Object.getOwnPropertyDescriptors(original) });
// Object.defineProperty(clone1, "name", {
//   writable: true,
//   value:'lal'
// });
// console.log({ clone1: Object.getOwnPropertyDescriptors(clone1) });

// clone2's prototype will be the obj 'original'
const clone2 = Object.create(afterChanges);
console.log({ clone2: Object.getOwnPropertyDescriptors(original) });
// same as Object.assign
const clone3 = { ...afterChanges };
console.log({ clone3 });
// for deep clone
const clone4 = JSON.parse(JSON.stringify(afterChanges));
console.log({ clone4 });
const clone5 = Object.defineProperties({}, Object.getOwnPropertyDescriptors(original));
console.log({ clone5 });

function foo() {
  console.log(this.a);
}

const obj = {
  a: "inside obj",
  foo: foo,
};

a = "outside obj";

function doFoo(fn) {
  console.log(this);
  function x() {
    console.log(this);
  }
  const y = () => console.log(this);
  x();
  y();
  fn();
}

// doFoo.call(obj, obj.foo);
doFoo.call(obj, obj.foo.bind(obj));
