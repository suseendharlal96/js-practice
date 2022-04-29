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

let Foo = function (a) {
  this.a = a;
  this.bar = function () {
    return a;
  };
  this.baz = () => {
    return a;
  };
};
Foo.prototype = {
  biz: function () {
    return this.a;
  },
};

let f = new Foo(7);
console.log(f);
console.log(f.bar());
console.log(f.baz());
console.log(f.biz());

// ################################################### //

const iteratorObj = {
  a: 1,
  b: 2,
};

// iteratorObj[Symbol.iterator] = function () {
//   return {
//     len: Object.keys(this).length,
//     start: 0,
//     obj: this,
//     next() {
//       if (this.start < this.len) {
//         return { done: false, value: `${Object.keys(this.obj)[this.start]} : ${Object.values(this.obj)[this.start++]}` };
//       } else {
//         return { done: true };
//       }
//     },
//   };
// };

// using generators

iteratorObj[Symbol.iterator] = function* () {
  for(let i=0;i<Object.keys(this).length;i++){
    yield `${Object.keys(this)[i]} : ${Object.values(this)[i]}`
  }
};

for (let val of iteratorObj) {
  console.log(val);
}

const person = {
  name: 'Prabhat',
  address: {
  street: 'Kondapur HYD',
  },
  };
  
  Object.freeze(person);
 
 person.address.street = "Hi-Tech City HYD"
 delete person.address.street
 
 console.log(person)
 
  const add = x => y => z => {
  console.log(x, y, z);
  return x + y + z;
  };
  
 console.log( add(7)(8)(9));
 
  (function test() {
  console.log('len',
  function () {}.apply.length
  );
  })();
 
 
  class Animal {
  constructor() {
  console.log("I'm a Cat");
  }
  }
  
  class Wild extends Animal {
  constructor() {
  console.log("I'm a Tiger");
  super();
  }
  }
  
  const pet = new Wild();
 
 
  var o = Object.assign(Object.create(null), { a: 1 }, { a: 2 }, { a: 3 });
 //  Object.assign(Object.prototype, { f: function() {} });
  
  for (var i in o) {
  console.log(o[i]);
  }
 
 
 
  declareBlock: {
  var x, y
  }
  
  forLoop1:
  for (x = 0; x < 3; x++){
  forLoop2:
  for (y = 0; y < 3; y++) {
  if (x === 1 && y === 1){
  continue forLoop1
  }
  console.log('x = ' + x + ', y = ' + y)
  }
  }
 
  loopBlock4: {
  console.log('Hey There ! My name is Sam')
  break loopBlock4
  console.log('I love singing')
  }
 
 
 
  const functionRadar = function() {
  console.log(arguments.callee.name)
  console.log(arguments.callee.caller.name)
  console.log("This is a JavaScript Program!")
  }
  
  void function main() {
  functionRadar()
  }()
 
 
 // [1, 2, 3, 4, 5].map(function(n) {
 // //    console.log(arguments.callee)
 //     return !(n > 1) ? 1 : arguments.callee(n - 1) * n;
 // });
 
 
 function create() {
   console.log(arguments.callee.name)
    return function(n) {
 //      console.log(arguments.callee.caller)
       if (n <= 1)
          return 1;
       return n * arguments.callee(n - 1);
    };
 }
 
 // var result = create()(5);
 // 
 //  Set.prototype.union = (otherSet) =>
 //  { 
 //  let unionSet = new Set(); 
 //  for (let elem of this) 
 //  { 
 //  unionSet.add(elem); 
 //  } 
 //  for(let elem of otherSet) {
 //  unionSet.add(elem); 
 //  return unionSet; 
 //  } 
 // }
  
 //  let set1 = new Set([10, 20, 30, 40, 50]); 
 //  let set2 = new Set([40, 50, 60, 70, 80]); 
  
 //  let unionSet = set1.union(set2); 
 //  console.log(unionSet.values()); 
 
 
  function Friend(name1, name2) {
    console.log(2,this)
  this.name1 = name1 || "unknown";
  this.name2 = name2 || "unknown"; 
  }
  
  Friend.prototype.fun = function () {
  return this.name1 + " " + this.name2;
  }
  function Student(name1, name2, schoolName, grade)
  {
    console.log(1,this)
  Friend.call(this, name1, name2);
  
  this.SchoolName = schoolName || "unknown";
  this.Grade = grade || 0;
  }
  Student.prototype = new Friend();
  Student.prototype.constructor = Student;
  
  var std = new Student("Lily","Collins", "XYZ", 15);
  
  console.log(std.fun()); 
  console.log(std instanceof Student); 
  console.log(std instanceof Friend); 
 
 
 class Test{
   constructor(){
     
   }
   
   test(){
     
   }
 }
 
 console.log(typeof Test)
 const t=new Test()
 
 function TestFn(){
   this.test=function(){}
 }
 
 TestFn.prototype.test=function(){}
 
 const t2=new TestFn()
 
 console.log('Fn')
 console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(TestFn.prototype)),
             Object.getOwnPropertyNames(TestFn),
             Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(TestFn))),
             Object.getOwnPropertyNames(Object.getPrototypeOf(t2))
            )
 console.log('Class')
 console.log(Object.getOwnPropertyNames(Test.prototype),
             Object.getOwnPropertyNames(Test),
             Object.getOwnPropertyNames(Object.getPrototypeOf(Test)),
             Object.getPrototypeOf(t)
            )
 
 
 // console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(Test)),Object.getOwnPropertyNames(Object.getPrototypeOf(t)))
 console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(t2))),Object.getOwnPropertyNames(Test))
 
 
 
 var x=4
 const thisObj={
   x:3,
   foo:function(){
     let x=2;
     setTimeout(()=>{
       var x=1
       console.log(this);
       console.log(this.x);
     })
   }
 }
 
 thisObj.foo.call(thisObj.foo)
 
 
 
 
 