const join = (a, b, c, d) => {
  console.log({ a, b, c, d });
  return `${a}_${b}_${c}_${d}`;
};

const curriedJoin = curry(join);

// console.log(curriedJoin(1, 2, 3)(4)); // '1_2_3_4'

// console.log(curriedJoin(1)(2, 3, 4)); // '1_2_3_4'

// console.log(curriedJoin(1, 2)(3, 4)); // '1_2_3_4'
// console.log(curriedJoin(1)(2)(3)(4)); // '1_2_3_4'

function curry(fn) {
  return function inner(...args) {
    console.log(1, args);
    if (args.length >= fn.length) {
      return fn.apply(null, args);
    } else {
      return inner.bind(null, ...args);
    }
  };
}

// ********************************** //

// const sum1 = sum(1);
// console.log(+sum(1) === 1); // true
// console.log(+sum(1)(3) === 4); // true
// console.log(+sum(1)(2)(3)() === 6); // true
// console.log(+sum()(5)(-1)()(2) === 6); // true
// console.log(+sum(1)(2)(-1)(2) === 4); // true
// console.log(+sum(1)(2)(3)()()()(1)); // 7

function sum(args1 = 0) {
  //   console.log({ args1 });
  function inner(args2 = 0) {
    // console.log({ args1, args2 });
    return sum(args1 + args2);
  }
  inner.valueOf = () => {
    // console.log("valueOf");
    return args1;
  };
  return inner;
}

// ********************************** //

const arr = [[1, [1.2], [2, [3, 4]]]];

console.log(flatten(arr));
console.log(flatten(arr, 2));

function flatten(arr, depth = Infinity) {
  return depth > 0 ? arr.reduce((acc, curr) => acc.concat(Array.isArray(curr) ? flatten(curr, depth - 1) : curr), []) : [...arr];
}

// ********************************** //

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

console.log(flattenObj(user));

function flattenObj(obj) {
  const res = {};
  inner(obj);
  function inner(obj, key = "user") {
    for (let [k, value] of Object.entries(obj)) {
      if (typeof value === "object") {
        inner(value, `${key}_${k}`);
      } else {
        res[`${key}_${k}`] = value;
      }
    }
  }
  return res;
}

// ********************************** //

const mixed = {
  A: "12",
  B: 23,
  C: {
    P: 23,
    O: {
      L: 56,
    },
    Q: [1, 2],
  },
};

console.log(flatMixed(mixed));

function flatMixed(obj) {
  const res = {};
  inner(obj);
  function inner(obj, k = "") {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        if (k.length > 0) {
          inner(obj[key], `${k}.${key}`);
        } else {
          inner(obj[key], `${key}`);
        }
      } else {
        if (k.length > 0) {
          res[`${k}.${key}`] = obj[key];
        } else {
          res[key] = obj[key];
        }
      }
    }
  }
  return res;
}

// ********************************** //

const stringObj = {
  a: 1,
  b: {
    c: "Hello World",
    d: 2,
    e: {
      f: {
        g: -4,
      },
    },
    h: "Good Night Moon",
  },
};

console.log(filterStringObj(stringObj));

function filterStringObj(obj) {
  const clone = JSON.parse(JSON.stringify(obj));

  filter(clone);
  function filter(obj) {
    for (let [k, value] of Object.entries(obj)) {
      if (typeof value === "object") {
        filter(value);
      } else {
        if (typeof value !== "string") {
          delete obj[k];
        }
      }
      if (JSON.stringify(value) === "{}") {
        delete obj[k];
      }
    }
  }
  return clone;
}

// ********************************** //

// const calc = {
//   total: 0,
//   add(val) {
//     this.total += val;
//     return this;
//   },
//   mul(val) {
//     this.total *= val;
//     return this;
//   },
//   sub(val) {
//     this.total -= val;
//     return this;
//   },
// };

// class Calc {
//   constructor(val) {
//     this.total = val;
//   }
//   add(val) {
//     this.total += val;
//     return this;
//   }
//   mul(val) {
//     this.total *= val;
//     return this;
//   }
//   sub(val) {
//     this.total -= val;
//     return this;
//   }
// }

function Calc(val) {
  this.total = val;

  this.add = function (val) {
    this.total += val;
    return this;
  };
  this.mul = function (val) {
    this.total *= val;
    return this;
  };
  this.sub = function (val) {
    this.total -= val;
    return this;
  };
}

const result = new Calc(0).add(10).mul(5).sub(30).add(10);
console.log(result.total);
