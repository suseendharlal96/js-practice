// "use strict"

console.log(hoist);
var hoist = "The variable has been hoisted.";

// const count = 0;
// function foo() {
//   // The function scope
//   console.log(count); // logs 0
// }

// foo();
// console.log(count);

// const myGlobal = 0;

// (function func() {
//   const myVar = 1;
//   console.log(myGlobal); //0

//   function innerOfFunc() {
//     const myInnerVar = 2;
//     console.log(myVar, myGlobal); //1,0

//     function innerOfInnerOfFunc() {
//       console.log(myInnerVar, myVar, myGlobal); //2,1,0
//     }

//     innerOfInnerOfFunc();
//   }

//   innerOfFunc();
// })();

function multiply(a) {
  return function executeMultiply(b) {
    return a * b;
  };
}

const double = multiply(2);
// console.log(multiply(2)(3)); // => 6
// console.log(1, double(3)); // => 10

function countWrapper() {
  var counter = 0;
  return function updateClickCount() {
    ++counter;
    return counter;
    // Do something with counter
  };
  //   return updateClickCount();
  // return counter;
}

const b = countWrapper();
// console.log(b());

// var count = 0;
function foo() {
  // "foo" function scope
  count = 0;
  // console.log(count); // logs 0
}

function bar() {
  // "bar" function scope
  count = 1;
  // console.log(count); // logs 1
}

//   foo();
//   console.log(count);
//   bar();
//   console.log(count);
console.log(12);

function mul(x) {
  return function (y) {
    return function (z) {
      return x * y * z;
    };
  };
}

console.log(mul(2)(3)(4));

function User(name) {
  this.name = name || "JsGeeks";
}

var person = (new User("xyz")["location"] = "USA");
console.log(person);

var employee = {
  name: "Nishant",
};

// Seal the object
Object.freeze(employee);

console.log(Object.isExtensible(employee)); // false
console.log(Object.isSealed(employee)); // true

employee.name = "susee"; // fails silently unless it's in strict mode
employee.age = 12; // fails silently unless it's in strict mode

// Trying to add new property will give an error
employee.age = 30;
console.log(employee);

var personalDetail = {
  name: "Nishant",
  address: {
    location: "xyz",
    zip: "123456",
    phoneNumber: {
      homePhone: 8797912345,
      workPhone: 1234509876,
    },
  },
};

const personalDetailCopy2 = deepClone(personalDetail);
function deepClone(obj) {
  const personalDetailCopy = {};
  for (let key in obj) {
    personalDetailCopy[key] = obj[key];
  }
  return personalDetailCopy;
}
console.log(11, personalDetailCopy2);
console.log(personalDetail.toString() === personalDetailCopy2.toString());

// console.log(typeof susee)(
//   (function () {
//     console.log(typeof displayFunc);
//     var displayFunc = function () {
//       console.log("Hi I am inside displayFunc");
//     };
//   })()
// );

var employeeId = "abc123";

function foo() {
  employeeId = "123bcd";
  return;
  function employeeId() {
    console.log("after return ");
  }
}
foo();
console.log(employeeId);

console.log([1, 2].toString() === [1, 2].toString());

const pal = "malayalam";
let x = [];
let y = [];
// console.log(object);
for (i = 0; i < pal.length; i++) {
  x.push(pal[i]);
}
for (i = pal.length - 1; i >= 0; i--) {
  y.push(pal[i]);
}
if (x.toString() === y.toString()) {
  console.log("palindrome");
} else {
  console.log("not palindrome");
}

(function () {
  var arrayNumb = [2, 8, 15, 16, 23, 42];
  arrayNumb.sort((a, b) => a - b);
  console.log(arrayNumb);
})();

var obj = {
  message: "Hello",
  innerMessage: !function () {
    console.log(this.message);
  },
};

console.log(1212, obj.innerMessage);

const words = (str) => {
  const a = {};
  for (i = 0; i < str.length; i++) {
    a[str[i]] = a[str[i]] ? a[str[i]] + 1 : 1;
  }
  return a;
};
console.log(words("susee"));

const arr = [];

arr["one"] = "susee";
arr["two"] = "lal";
arr[2] = "five";

console.log(arr);
console.log(arr[0]);
console.log(arr.length);

const obj2 = {
  name: "susee",
};

console.log(obj2[obj]);
