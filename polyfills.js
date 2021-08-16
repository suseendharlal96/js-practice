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

function printDetails(args) {
  console.log(args);
  return this.name + " " + this.age;
}

Function.prototype.customBind = function (...args) {
  console.log(args);
  let [object, ...params] = args;
  //   let that = this;
  function a() {
    return this.call(object, params);
  }
  return a.bind(this);
};

console.log(printDetails.customBind(obj, "madurai", "chennai", "bangalore")());
