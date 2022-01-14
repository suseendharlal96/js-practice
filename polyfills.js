// forEach

const arr = [1, 2, 3, 4];

Array.prototype.customForEach = function (cb) {
  for (let i = 0; i < this.length; i++) {
    cb(this[i], i, this);
  }
};

arr.customForEach((el, index, ar) => {
  console.log({ el, index, ar });
});

// map

Array.prototype.customMap = function (cb) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(cb(this[i], i, this));
  }
  return result;
};

console.log(arr.customMap((el, i) => el * 2));

// filter

Array.prototype.customFilter = function (cb) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      res.push(cb(this[i]));
    }
  }
  return res;
};

console.log(arr.customFilter((el) => el % 2 === 0 && el));

// find

Array.prototype.customFind = function (cb) {
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i])) {
      return this[i];
    }
  }
};

console.log(arr.customFind((el) => el > 2));

// reduce

Array.prototype.customReduce = function (cb, initValue) {
  let result = 0;
  console.log(initValue);
  let startValue = initValue ?? this[0];
  for (let i = 0; i < this.length; i++) {
    result += cb(startValue, this[i], i, this);
  }
  return result;
};

console.log(arr.customReduce((acc, cur, i, ar) => acc + cur, 0));

// bind

const obj = {
  name: "sus",
  age: 25,
};

function printDetails(args, args2) {
  console.log({ args, args2 });
  return this.name + " " + this.age;
}

Function.prototype.customBind = function (...args) {
  console.log(args);
  let [object, ...params] = args;
  let that = this;
  function a(args2) {
    return that.call(object, params, args2);
  }
  return a;
};

console.log(printDetails.customBind(obj, "madurai", "chennai", "bangalore")("america"));

function sample() {}
sample.a = 12;

console.log(sample.a);

function Parent2(name) {
  console.log(this);
  this.name = name;
  console.log(this.name);
}

Parent2.prototype.setName = (name) => {
  console.log(this); // window(arrow func)
  this.name = name;
  console.log(this.name);
};

Parent2.prototype.getName = function () {
  console.log(this); // Parent2(normal func)
  return this.name;
};

function Child2(name, age) {
  console.log(this);
  Parent2.call(this, name);
  this.age = age;
}

Child2.prototype = Object.create(Parent2.prototype);
// Child2 = parProto;

Child2.prototype.setAge = function (age) {
  console.log(this);
  this.age = age;
};

Child2.prototype.getAge = function () {
  console.log(this);
  return this.age;
};

const childProto = Object.create(Child2.prototype);
Parent2.prototype = childProto;
Child2.prototype.constructor=Child2;

const parObj = new Parent2("sus");
parObj.setName("lal");
console.log(parObj.getName());
const chiObj = new Child2("suseendhar", 25);
console.log(chiObj.getName());
parObj.setAge(30);
console.log(parObj.getAge());

class Parent {
  constructor(name) {
    console.log(this);
    this.name = name;
  }
  getParentName() {
    return this.getChildName();
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
    console.log(this);
  }
  getName() {
    return super.getParentName();
  }
  getChildName() {
    return this.name;
  }
}

// console.log(new Child("sus",25).getName());
