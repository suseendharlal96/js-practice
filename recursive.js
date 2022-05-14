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

console.log("flatmixed", flatMixed(mixed));

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

const deepObj = {
  a: 1,
  b: {
    c: 2,
    d: -3,
    e: {
      f: {
        g: -4,
      },
    },
    h: {
      i: 5,
      j: 6,
    },
  },
};

const filter = (n) => n >= 0;

function deepFilter(obj, fn) {
  for (let [key, val] of Object.entries(obj)) {
    if (typeof val === "object") {
      deepFilter(val, fn);
    } else if (typeof val === "number") {
      if (!fn(val)) delete obj[key];
    }
    if (JSON.stringify(val) === "{}") delete obj[key];
  }
}

console.log(deepFilter(deepObj, filter));

// ********************************** //

// Input:
Array.prototype.multiFilter = function (filterCb) {
  let originalArr = this;

  function inner(arr, cb) {
    const res = [];

    console.log(1, { arr, res });
    for (let a of arr) {
      if (Array.isArray(a)) {
        res.push(inner(a, cb));
      } else {
        if (cb(a)) res.push(a);
      }
    }
    console.log(2, { arr, res });
    return res;
  }
  return inner(originalArr, filterCb);
};

const filtered = [[1, [2, [3, "foo", { a: 1, b: 2 }]], "bar"]].multiFilter((e) => typeof e === "number");
console.log(filtered);

// Output:
// [[[["foo"]],"bar"]]

// ********************************** //

function countInArray(arr, cb) {
  let count = 0;
  function inner(data, cb) {
    console.log({ data });
    for (let i = 0; i < data.length; i++) {
      if (Array.isArray(data[i])) {
        inner(data[i], cb);
      } else {
        if (cb(data[i])) {
          // console.log("here",data[i]);
          count++;
        }
      }
    }
    return count;
  }

  return inner(arr, cb);
}

//   Input:

const count = countInArray([[1, [2, [3, 4, "foo", { a: 1, b: 2 }]], 5]], (e) => typeof e === "number");
console.log(count);

// Output:
// 5

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
// console.log(result.total);

// ********************************** //

const quesObj = {
  a: 1,
  b: () => 2,
  c: {
    d: () => 3,
  },
  e: [1, 2],
};

console.log(getResult(quesObj));
console.log(
  getResult({
    a: 1,
    b: (a, b) => a * b,
    c: "OMG!! This is working",
    d: [1, 2, 3, 4],
    e: null,
    f: {
      a: 1,
      b: [99, 98, 97],
      c: { a: 1, b: 2 },
      d: function () {
        return 2;
      },
    },
  })
);

function getResult(obj) {
  // inner(obj);
  function inner(obj) {
    const result = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === "number" || !value || typeof value === "string") {
        result[key] = value;
      } else if (typeof value === "function") {
        // console.log({ value, len: value.length,args:[...new Array(value.length).fill(Math.floor(Math.random() * value.length + 1)) ]});

        result[key] = value(...new Array(value.length).fill(Math.floor(Math.random() * 10 + 1)));
      } else if (typeof value === "object" && !Array.isArray(value)) {
        result[key] = inner(value);
      } else if (Array.isArray(value)) {
        result[key] = value;
      }
    });
    return result;
  }
  return inner(obj);
}

// Output:
// {
// a: 1,
// b: 2,
// c:{ d : 3},
// e:[1,2]
// }

// ********************************** //

function pipe(...func) {
  return (arg) => {
    func.reduce((acc, curr) => {
      return curr.call(this, acc);
    }, arg);
  };
}

let multiplyBy3AndAbsolute = pipe((num) => num * 2, Math.abs, console.log);
multiplyBy3AndAbsolute(-50); // 100

const times = (y) => (x) => x * y;
const plus = (y) => (x) => x + y;
const subtract = (y) => (x) => x - y;
const divide = (y) => (x) => x / y;

function pipeAdv(arr) {
  return (arg) => {
    return arr.reduce((a, c) => c.call(this, a), arg);
  };
}

console.log(pipeAdv([times(2), times(3)])(2));
console.log(pipeAdv([times(2), subtract(3), divide(4)])(2));

// ********************************** //

const arr = [[1, [1.2], [2, [3, 4]]]];

console.log(flatten(arr));
console.log(flatten(arr, 2));

// function flatten(arr, depth = Infinity) {
//   return depth > 0 ? arr.reduce((acc, curr) => acc.concat(Array.isArray(curr) ? flatten(curr, depth - 1) : curr), []) : [...arr];
// }

function flatten(arr, depth = Infinity) {
  const stack = [...arr.map((el) => [el, depth])];
  const res = [];
  while (stack.length) {
    const [last, depth] = stack.pop();
    if (Object.prototype.toString.call(last) === "[object Array]" && depth) {
      stack.push(...last.map((el) => [el, depth - 1]));
    } else {
      res.push(last);
    }
  }
  return res.reverse();
}

// ********************************** //

class CustNode {
  constructor(name) {
    this.name = name;
    this.innerHTML = "";
    this.children = [];
  }
  appendChild(child) {
    this.children.push(child);
  }
}

class CustDocument extends CustNode {
  constructor(rootNode) {
    super(rootNode);
  }

  createElement(nodeName) {
    return new CustNode(nodeName);
  }

  calcSpace(level) {
    return new Array(level * 4).fill(" ").join("");
  }

  render() {
    function printDOM(node, level) {
      const space = this.calcSpace(level);
      let res = "";
      res += `${space}<${node?.name}>\n`;
      if (node?.innerHTML) {
        res += `${space}${this.calcSpace(1)}${node?.innerHTML}\n`;
      }
      if (node?.children.length > 0) {
        for (let child of node?.children) {
          res += printDOM.call(this, child, level + 1);
        }
      }
      res += `${space}<${node?.name}/>\n`;
      return res;
    }

    return printDOM.call(this, this, 0);
  }
}

const doc = new CustDocument("html");
const body = doc.createElement("body");
const div = doc.createElement("div");
const span = doc.createElement("span");

div.innerHTML = "Im div";
span.innerHTML = "Im span";
div.appendChild(span);
body.appendChild(div);
doc.appendChild(body);
console.log(doc.render());

{
  /* <html>
  <body>
    <div>Im div</div>
  </body>
</html> */
}
