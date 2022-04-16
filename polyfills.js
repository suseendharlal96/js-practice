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
    result[i] = cb(this[i], i, this);
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
  let callback = cb;
  let result = initValue ?? this[0];
  for (let i = initValue !== undefined ? 0 : 1; i < this.length; i++) {
    result = callback(result, this[i], i, this);
  }
  return result;
};

Array.prototype.myReduce = function (...args) {
  if (!Array.isArray(this)) {
    throw new Error("Not array");
  }
  let callback = args[0];

  if (typeof callback !== "function") {
    throw new Error("Callback is not a function");
  }
  if (this.length === 0 && args.length === 1) {
    throw new Error("Array cannot be empty without initial value");
  }

  let result = args.length > 1 ? args[1] : this[0];

  for (let i = args.length > 1 ? 0 : 1; i < this.length; i++) {
    result = callback(result, this[i], i, this);
  }

  return result;
};

console.log([1, 2, 3, 4].customReduce((acc, cur, i, ar) => acc + cur, 0));
console.log([1, 2, 3, 4].myReduce((acc, cur, i, ar) => acc + cur, 0));

// bind

const obj = {
  name: "sus",
  age: 25,
};

const deepObj = {
  a: 1,
  b(b, c) {
    return [this.a, b, c];
  },
};

function printDetails(args, args2) {
  console.log({ args, args2 });
  return this.name + " " + this.age;
}

Function.prototype.customBind = function (...args) {
  console.log(args);
  let [object, ...params] = args;
  let that = this;
  function a(...args2) {
    return that.apply(object, args2);
  }
  return a;
};

// console.log(printDetails.customBind(obj, "madurai", "chennai", "bangalore")("america"));
console.log(deepObj.b.customBind(deepObj, "madurai", "chennai", "bangalore")("america","london"));

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
Child2.prototype.constructor = Child2;

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

// Promise.all()

// 1. Takes an array of promises
// 2. Returns promise with array of resolved values in same order they sent
// 3. Incase if any fails it stops and gives that result

function customPromiseAll(arrPromise) {
  const result = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    arrPromise.forEach((promise, i) => {
      Promise.resolve(promise)
        .then((success) => {
          result[i] = success;
          count++;
          if (count === arrPromise.length) resolve(result);
        })
        .catch((err) => reject(err));
    });
  });
}

function createPromise(ms, type) {
  return new Promise((resolve, reject) => {
    setTimeout(() => (type === "fail" ? reject(ms) : resolve(ms)), ms);
  });
}

// customPromiseAll([createPromise(1000, "success"), createPromise(3000, "success"), createPromise(2000, "fail")])
//   .then((success) => console.log("success", success))
//   .catch((err) => console.log("err", err));

  customPromiseAll([[1,2,3,Promise.reject('error')]])

// ***********************************//
