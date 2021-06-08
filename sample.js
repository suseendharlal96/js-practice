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
  fName: "Luis",
  lName: "tim",
};

function fullName(args1) {
  let a = args1;
  console.log(this, args1);
  // console.log(this.fName, args1);
  return function sample(args2) {
    console.log(this);
    // console.log(this.fName, args2, a);
  };
  // sample(a);
}

// fullName.call(obj, "madurai").call(obj, "chennai");
// fullName.apply(obj, ["madurai", "India"]);
// fullName.bind(obj, "madurai")()();

// ********* //

function customBindFn(params1, params2, params3) {
  console.log(params1);
  console.log(params2);
  console.log(params3);
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
    console.log(this);
    return this.call(...arg, ...arg2);
  };
};

console.log(customBindFn.customBind(obj, "dubai", "india")("america"));

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
// console.log(one(1)(2)(3)(4));

let sum = (a) => (b) => b ? sum(a + b) : a;

// console.log(sum(1)(2)(3)(4)());

let count = 0;
const getData = (args) => {
  console.log(this);
  console.log("getting..", ++count, args);
};

const debounce = function (cb, delay) {
  console.log("debounce initialised");
  let timer;
  // console.log(this);
  return function (args) {
    // console.log(this);
    // console.log(args);
    clearTimeout(timer);
    timer = setTimeout(function () {
      // console.log(this);
      cb(args);
    }, delay);
  };
};

// let returnedDebounce = debounce(getData, 1000);
// document.getElementById("search").addEventListener("keyup", (e) => {
//   returnedDebounce(e.target.value);
// });

function throttle(cb, delay) {
  console.log("throttle initialiased");
  let trigger = true;
  console.log(this);
  let context = this;
  return function (...args) {
    console.log(this);
    if (!trigger) {
      return;
    } else {
      cb.apply(this, args);
      trigger = false;
    }
    setTimeout(() => {
      trigger = true;
    }, delay);
  };
}

let returnedThrottle = throttle(getData, 1000);
document.getElementById("search").addEventListener("keyup", (e) => {
  returnedThrottle(e.target.value);
});

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

const modifyObj = () => {
  let finalObj = {};
  return (recursive = (obj, parentName = "user") => {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        recursive(obj[key], parentName + "_" + key);
      } else {
        finalObj[key] = obj[key];
      }
    }
    return finalObj;
  });
};

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

let returnedCustomThrottle = customThrottle.call(
  customObj,
  myThrottleFunc,
  1000
);

document.getElementById("throttleSearch").addEventListener("keyup", (e) => {
  returnedCustomThrottle(e.target.value);
});
