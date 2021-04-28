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
  console.log(this);
  console.log(this.fName, args1);
  return function sample(args2) {
    console.log(this);
    console.log(this.fName, args2, a);
  };
  // sample(a);
}

fullName.call(obj, "madurai").call(obj, "chennai");
// fullName.apply(obj, ["madurai", "India"]);
// fullName.bind(obj, "madurai")();

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
  // console.log(object);
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
console.log(one(1)(2)(3)(4));

let sum = (a) => (b) => (b ? sum(a + b) : a);

console.log(sum(1)(2)(3)(4)());
