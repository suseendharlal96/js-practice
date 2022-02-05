const obj = {
  name: "sus",
  age: 24,
};

// obj.__proto__.toString = function () {
//   return this.name;
// };

obj[Symbol.toPrimitive] = function (hint) {
  console.log(hint);
  return hint === "default" ? this.name : this.age;
};

console.log(+obj);

const map = new Map(Object.entries(obj));
console.log(map);
console.log(Array.from(map.values()));
const newObj = Object.fromEntries(map);
console.log(newObj);

const numObj = {
  two: "1",
  four: "2",
  six: "3",
};

const doubleNumObj = Object.fromEntries(Object.entries(numObj).map((e) => [e[0], e[1] * 2]));

console.log(doubleNumObj);

const loopObj = {
  0: "1",
  1: "2",
  2: "3",
  length: 3,
};

numObj[Symbol.iterator] = function () {
  let that = this;
  return {
    start: 0,
    next() {
        if (this.start < Object.values(that).length) {
        //   console.log({done: false, value: Object.values(that)[this.start++] });
        return { done: false, value: Object.values(that)[this.start++] };
      } else {
        return { done: true,value:'sd' };
      }
    },
  };
};
// console.log(Array.from(numObj));
for (let a of numObj) {
  console.log(a);
}
