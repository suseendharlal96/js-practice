// setTimeout(() => {
//   console.log(p);
// }, 0);

// console.log(k);
// console.log(k++);
// console.log(k++);

// {
//   let a = 10;
//   {
//     // let a = 100;
//     {
//       // let a = 200;
//       console.log(a);
//     }
//   }
// }

// // console.log(a);

// const x = () => {
//   let s = 100;
//   const y = () => {
//     let m = 200;
//     const z = () => {
//       console.log(s, m);
//     };
//     s = 200;
//     return z;
//   };
//   return y;
// };
// let returnedY = x();
// let returnedZ = returnedY();
// console.log(returnedY);
// returnedZ();

function Counter() {
  console.log(this);
  var count = 0;
  this.increment = function () {
    console.log(this);
    count++;
    console.log(count);
  };
  this.decrement = function () {
    count--;
    console.log(count);
  };
  // return [this.increment, this.decrement];
}
// let counter1 = new Counter();
// counter1.count;
// counter1.increment();
// counter1.decrement();
// Counter()[0]();
// Counter()[1]();

// console.log("start");
// console.log("start");
// console.log("start");
// console.log("start");
// function addEvents() {
//   inner();
//   function inner() {
//     let click = "outer click";
//     document
//       .getElementById("button")
//       .addEventListener("click", function myClick() {
//         setTimeout(() => {
//           console.log(click);
//         }, 2000);
//       });
//   }
// }

// addEvents();

// console.log("end");
// console.log("end");
// console.log("end");
// console.log("end");

const obj = {
  fName: "LUIS",
  lName: "TOM",
};
const obj1 = {
  fName: "KAREN",
  lName: "ELENA",
};

function innerFn(args2) {
  console.log(this, args2);
  // console.log(this.fName, args2, a);
}

const fullName = function (args1, fn) {
  let a = args1;
  console.log(this, args1);
  // console.log(this.fName, args1);
  return fn;

  // sample(a);
};

// fullName.call(obj, "madurai", innerFn).call(obj1, "chennai");
// fullName.apply(obj, ["madurai", "India"]);
// fullName.bind(obj, "madurai", innerFn)().call(obj1, "chennai");

// ********* //

function customBindFn(...params1) {
  console.log(...params1.flat());
  // console.log(params2);
  // console.log(params3);
  return params1;
}

// Function.prototype.customBind = function (...args) {
//   console.log(args);
//   console.log(this);
//   let obj = this;
//   return function (...args2) {
//     console.log(args2);
//     obj.apply(args[0], [...args.slice(1), ...args2]);
//   };
// };

Function.prototype.customBind = function (...arg) {
  console.log(arg);
  console.log(this);
  return (...arg2) => {
    console.log(arg2);
    console.log(this);
    return this.call(this, arg);
  };
};

// console.log(customBindFn.customBind(obj, "dubai", "india")("america"));

// var outerMost = 2;
function one(a) {
  return function two(b) {
    return function three(c) {
      return function four(d) {
        return a + b + c + d;
      };
    };
  };
}
console.log(one(1)(2)(3)(4));

let sum = (a) => (b) => b ? sum(a + b) : a;

// console.log(sum(1)(2)(3)(4)());

let count = 0;
const getData = (args) => {
  // console.log(this);
  console.log("getting..", ++count, args);
};

const debounce = function (cb, delay) {
  console.log("debounce initialised");
  let timer;
  // console.log(this);
  return function ({ target: { value } }) {
    // console.log(this);
    // console.log(args);
    clearTimeout(timer);
    timer = setTimeout(function () {
      // console.log(this);
      cb(value);
    }, delay);
  };
};

document.getElementById("search").addEventListener("keyup", debounce(getData, 3000));

function throttle(cb, delay) {
  console.log("throttle initialiased");
  let trigger = true;
  let lastArgs = null;
  console.log(this);
  let context = this;
  return function (...args) {
    console.log(this);
    if (!trigger) {
      lastArgs = args;
    } else {
      cb.apply(this, args);
      trigger = false;
    }
    setTimeout(() => {
      trigger = true;
      if (lastArgs) cb.apply(this, lastArgs);
    }, delay);
  };
}

// let returnedThrottle = throttle(getData, 1000);
// document.getElementById("search").addEventListener("keyup", (e) => {
//   returnedThrottle(e.target.value);
// });

/**********/

const avg = (...params) => {
  let total = 0;
  for (let i = 0; i < params.length; i++) {
    total += params[i];
  }
  return total / params.length;
};

const curryFn = (fn, ...param1) => {
  return (...param2) => {
    return fn.apply(this, param1.concat(param2));
  };
};

console.log(curryFn(avg, 1, 2, 3)(4, 5, 6));

function add(param) {
  if (param <= 0) {
    return 0;
  } else {
    return param + add(param - 1);
  }
}
console.log(add(3));

// let startTime = new Date().getTime();
// let endTime = startTime;
// while (endTime < startTime + 10000) {
//   endTime = new Date().getTime();
// }

// document.getElementById("button").addEventListener("click", () => {
//   console.log("clicked");
// });

// const modifyObj = () => {
//   let finalObj = {};
//   return (recursive = (obj, parentName = "user") => {
//     for (let key in obj) {
//       if (typeof obj[key] === "object") {
//         recursive(obj[key], parentName + "_" + key);
//       } else {
//         finalObj[parentName + "_" + key] = obj[key];
//       }
//     }
//     return finalObj;
//   });
// };

const user = {
  name: "Susee",
  address: {
    personal: {
      city: "Madurai",
      state: "TN",
      area: "KP",
    },
    office: {
      city: "Chennai",
      area: {
        landmark: "Ascendas",
      },
    },
  },
};

const flattenObj = (obj) => {
  const flattendObj = {};
  const innerFn = (obj, parentName = "user") => {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === "object") {
        innerFn(obj[key], key);
      } else {
        flattendObj[parentName + "_" + key] = obj[key];
      }
    });

    return flattendObj;
  };
  innerFn(obj);
};

const helperObjFn = flattenObj(user);
console.log(helperObjFn);

// console.log(modifyObj()(user));

const printChildren = (obj) => {
  console.log(obj);
  obj?.children?.forEach((child) => {
    console.log(child.name);
    printChildren(child);
  });
};

const familyTree = {
  name: "john",
  children: [
    {
      name: "Jim",
      children: [],
    },
    {
      name: "Zoe",
      children: [
        {
          name: "Kyle",
          children: [],
        },
        {
          name: "Sophia",
          children: [],
        },
      ],
    },
  ],
};

// printChildren(familyTree);

function normal() {
  console.log(this);
  const arrow = () => {
    console.log(this.name);
    function inner() {
      console.log(this);
    }
    inner();
  };
  arrow();
}

const obj2 = {
  name: "susee",
};

normal.call(obj2);
// arrow.call(obj2);

const recur = (n) => {
  if (n > 0) {
    console.log(n);
    recur(n - 1);
  }
  console.log(n);
};

// recur(3);

var lastStoneWeight = function (stones) {
  stones.sort((a, b) => b - a);
  function recurse(stones) {
    for (let i = 0; i < stones.length; i++) {
      if (stones[i] >= 0 && stones[i + 1] >= 0) {
        if (stones[i] >= stones[i + 1]) {
          stones[i] = stones[i] - stones[i + 1];
          stones.splice(i + 1, 1);
        } else {
          stones[i + 1] = stones[i + 1] - stones[i];
          stones.splice(i, 1);
        }
        stones.sort((a, b) => b - a);
        recurse(stones);
      }
      return stones;
    }
  }
  return recurse(stones).length === 0 ? 0 : recurse(stones)[0];
};

console.log(lastStoneWeight([2, 7, 4, 1, 8, 1]));

var numWaterBottles = function (numBottles, numExchange) {
  let count = numBottles;
  function recursive(bottles, ex) {
    // execute until we have bottles that are sufficient to be exchanged
    if (bottles >= ex) {
      let fullBottles = Math.floor(bottles / ex);
      count += fullBottles;
      // or let emptyBottles = bottles % ex;
      let emptyBottles = bottles - fullBottles * ex;
      let totalBottles = emptyBottles + fullBottles;
      recursive(totalBottles, ex);
    }
  }
  recursive(numBottles, numExchange);
  return count;
};

console.log(numWaterBottles(15, 4));

var divisorGame = function (n) {
  let isAliceWon = false;
  function recursive(currentMoves) {
    if (currentMoves > 1) {
      isAliceWon = !isAliceWon;
      recursive(currentMoves - 1);
    }
  }
  recursive(n);
  return isAliceWon;
};

console.log(divisorGame(3));

const countDown = (n) => {
  console.log(n);
  if (n > 1) {
    countDown(n - 1);
    return;
  }
  console.log(n);
};
countDown(3);

let total = 0;
const sumRange = (n) => {
  if (n === 1) {
    return 1;
  }
  return n + sumRange(n - 1);
};
console.log(sumRange(5));

let customDebounceCount = 0;
const myDebounceFunc = (params) => {
  console.log(params, ++customDebounceCount);
};

const customDebounce = (fn, timeLimit) => {
  console.log("debouce init");
  let timer;
  return (args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (args.length !== 0) {
        fn(args);
      }
    }, timeLimit);
  };
};

let returnedCustomDebouce = customDebounce(myDebounceFunc, 1000);

document.getElementById("debouceSearch").addEventListener("keyup", (e) => {
  returnedCustomDebouce(e.target.value);
});

let customThrottleCount = 0;
const myThrottleFunc = (...params) => {
  console.log(params, ++customThrottleCount);
};

const customThrottle = function (fn, timeLimit) {
  console.log("throttle init", this);
  let shouldCall = true;
  return (args) => {
    if (shouldCall) {
      console.log(this);
      fn(this, args);
      shouldCall = false;
    }
    setTimeout(() => {
      shouldCall = true;
    }, timeLimit);
  };
};

const customObj = {
  name: "susee",
  age: "24",
};

let returnedCustomThrottle = customThrottle.call(customObj, myThrottleFunc, 1000);

document.getElementById("throttleSearch").addEventListener("keyup", (e) => {
  returnedCustomThrottle(e.target.value);
});

// var x = 4;
// const obj = {
//   x: 3,
//   bar: function () {
//     var x = 2;
//     alert(this.x);
//     setTimeout(() => {
//       var x = 1;
//       alert(this.x);
//     }, 1000);
//   },
// };
// obj.bar();

// function bar() {
//   return foo;
//   var foo = 11;
//   // foo = 10;
//   function foo() {}
// }

// alert(typeof bar());

// function testfn() {
//   var test = [];
//   for (let z = 0; z < 5; z++) {
//     test[z] = () => z;
//   }
//   console.log(test);
//   return test;
// }
// var test = testfn();
// console.log(test[4]());

// var result = (function (x){
//   delete x;
//   return x;

// })(0)
// console.log(result)

function a() {
  console.log(b);
}
var b = 10;
a();

var c = 100;
function x() {
  var c = 30;
  console.log(window.c);
  window.c = 20;
}
x();
console.log(c);

Array.prototype.print = function (dd) {
  console.log(this, dd);
  for (let elem of this) {
    console.log(elem + dd);
  }
};

[1, 2].print(132);

// const aa = function (x) {
//   this.x = x;
// };

// const bb = function (x, y) {
//   this.y = y + "y";
//   aa.call(this, x);
//   this.getX = () => {
//      console.log(this.x);
//   };
//   this.getY = () => {
//     // console.log(this)
//      console.log(this.y);
//   };
// };

// const B = new bb("x", "y");
// B.getX();
// B.getY();

// const obj3 = {
//   x2: 1,
//   getX() {
//     console.log(this);
//     function inner() {
//       console.log(this);
//       console.log(this.x2);
//     }
//     inner();
//   },
// };

// obj3.getX();

// function add(x, y=0) {
//   if (y) {
//     console.log(x + y);
//   }
//   return (y) => {
//     console.log(x + y);
//   };
// }

// add(1, 2);
// add(1)(2);

// const profile = {
//   name: "a",
//   age: 12,
//   kids: [
//     {
//       name: "b",
//       age: 20,
//       kids: [
//         { name: "c", age: 20 },
//         { name: "d", age: 20 },
//       ],
//     },
//   ],
// };
// let age = 0;
// const calcAge = (profile) => {
//   Object.keys(profile).forEach((key) => {
//     if (key === "age") {
//       age += profile[key];
//     } else if (key === "kids") {
//       profile[key].forEach((obj) => {
//         calcAge(obj);
//       });
//     }
//   });
// };
// calcAge(profile);
// console.log(age);

let limit = 10;

for (let i = 1; i <= limit / 2; i++) {
  for (let j = 1; j <= limit - i; j++) {
    // console.log(`${i} + ${j} = `);
  }
}

// var i = 1;
// for (; i <= 5; i++) {
//   ((a) => {
//     // console.log(arguments);
//     setTimeout(
//       (e) => {
//         console.log(e, a);
//       },
//       i * 1000,
//       "a"
//     );
//   })(i);
// }

// function sampleEvent() {
var eventCount = 0;
document.getElementById("button2").addEventListener("click", function x() {
  console.log("clicked", ++eventCount);
});
// }
// sampleEvent()

// constructor()
// static getDerivedStateFromProps(props,state)
// render();
// componentDidMount();

// static getDerivedStateFromProps()
// shouldComponentUpdate(nextProps,nextState)
// render();
// static getSnapshotBeforeUpdate(prevPRops,prevState)
// componentDidUpdate(prevProps,prevState)

// componentWillUnmount

function sample2(fname, ...lname) {
  console.log(this);
  this.name = "sad";
  console.log(fname, lname);
}
let fname = "sus";
let lname = "lal";
sample2`${fname} is  a  ${lname}`;

// [...fname].forEach((n) => {
//   console.log(n);
// });

function car() {
  console.log(this);
  this.make = "Lamborghini";
}

car();
const myCar = new car();
console.log(myCar.make);
console.log(make);

const arr = [1, 2, 2, 3, 4, 5, 5];
console.log([...new Set(arr)]);
const person = { name: "Lydia" };

Object.defineProperty(person, "age", { value: 21 });

console.log(Object.keys(person));

// JSON.stringify()
const value = { number: 10 };

const multiply = (x = { ...value }) => {
  console.log((x.number *= 2));
};

multiply();
multiply();
multiply(value);
multiply(value);

const innerobj = {
  a: "",
  sample() {
    console.log(this);
    function innerSamp() {
      console.log(this);
    }
    innerSamp();
  },
};

innerobj.sample();

// console.log("start");
// setTimeout(function cb() {
//   console.log("cb");
// }, 5000);
// console.log("end");

// const ab = [1, 2];
// ab[100]=101;
// delete ab[0];
// ab.splice(0,1)
// console.log(ab, ab[0], ab.length);

Function.prototype.myCustBind = function (...args) {
  const [thisContext, ...params] = args;
  const that = this;
  return function ab() {
    that.call(thisContext, params);
  };
};

function sampleFn(args) {
  console.log(args);
  args.forEach((ar) => {
    console.log(`${this.fname} ${this.lname} ${ar}`);
  });
}

const sampleObj = {
  fname: "sus",
  lname: "lal",
};

// sampleFn.myCustBind(sampleObj, "chennai", "madurai")();

const sampleArr = [1, 2, 3];

const newarr = sampleArr.map((d) => d * 2);

Array.prototype.myCustMap = function () {
  const tempArr = [];
  this.forEach((a) => {
    tempArr.push(a * 2);
  });
  return tempArr;
};

console.log(sampleArr.myCustMap());

let myNumber = 100;
let myString = "100";

console.log(!typeof myNumber === "string");

class Rectangle {
  static logNbSides() {
    return "I have 4 sides";
  }
}

class Square extends Rectangle {
  constructor() {
    super();
  }
  static logDescription() {
    return super.logNbSides() + " which are all equal";
  }
}
const sq = new Square();
console.log(Square.logDescription());

const f = (i, j) => (k, l) => (m, n) => i * k * m + j * l * n;

console.log(f(1, 2)(1, 2)(1, 2));

const mul = (...params) => {
  let res = 1;
  params.forEach((p) => {
    p ? (res *= p) : (res += p);
  });
  return res;
};

console.log(mul(1, 2, 0, 5));

function sum2(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum2);
console.log(curriedSum);
let curriedSum1 = curriedSum(1);
console.log(curriedSum1);
let curriedSum2 = curriedSum1(2, 3);
console.log(curriedSum2);

function curry(fn) {
  console.log(fn.length);
  console.log(fn.name);
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(null, args);
    } else {
      return function (...args2) {
        return curried.apply(null, args.concat(args2));
      };
    }
  };
}

let outerVar = 10;
function outerMost(a) {
  return function inner() {
    console.log(a);
    console.log(a + 5);
  };
}
const returned1 = outerMost(outerVar);
outerVar = 20;
const returned2 = outerMost(outerVar);
returned1();
returned2();

Math.printName = function () {
  return "name";
};

console.log(Math.random());

console.log(Math.printName());
// console.log(typeof Crypto.prototype.getRandomValues());
// console.log(window.crypto.getRandomValues([1, 9]));
