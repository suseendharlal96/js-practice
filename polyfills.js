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

const Parent2 = function (name) {
  console.log(this);
  console.log(name);
  this.name = name;
};

Parent2.prototype.setName = function (name) {
  console.log(this);
  this.name = name;
};

Parent2.prototype.getName = function () {
  return this.name;
};

const Child2 = function (name, age) {
  console.log(this);
  Parent2.call(this, name);
  this.age = age;
};

const parProto = Object.create(Parent2.prototype);
Child2.prototype = parProto;

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

// const parObj = new Parent2("sus");
// parObj.setName("lal");
// console.log(parObj.getName());
// const chiObj = new Child2("suseendhar", 25);
// parObj.setAge(30);
// console.log(parObj.getAge());

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
  constructor(name) {
    super(name);
    console.log(this);
  }
  getName() {
    return super.getParentName();
  }
  getChildName() {
    return this.name;
  }
}

console.log(new Child("sus").getName());
