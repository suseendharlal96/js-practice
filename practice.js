const smallestSubArrayGreaterOrEqBySum2 = (arr, t) => {
  let curr = 0,
    left = 0,
    subArr = [...arr];
  for (let i = 0; i < arr.length; i++) {
    curr += arr[i];
    while (curr === t) {
      if (i - left + 1 === 1) {
        subArr = arr.slice(left, i + 1);
        return { min: subArr.length, subArr };
      } else {
        if (i - left + 1 < subArr.length) {
          subArr = arr.slice(left, i + 1);
        }
        curr -= arr[left];
        left++;
      }
    }
  }
  return { min: subArr.length, subArr };
};

// console.log(
//   smallestSubArrayGreaterOrEqBySum2([4, 2, 2, 7, 4, 1, 2, 4, 1, 0], 8)
// );

const longestSubArrayEqBySum2 = (arr, t) => {
  let curr = 0,
    subArr = [],
    boundary = [],
    left = 0;
  for (let i = 0; i < arr.length; i++) {
    curr += arr[i];
    while (curr > t) {
      curr -= arr[left];
      left++;
    }
    if (curr === t) {
      if (i - left + 1 > subArr.length) {
        subArr = arr.slice(left, i + 1);
        boundary = left === i ? [left] : [left + 1, i + 1];
      }
    }
  }
  return { subArr, boundary };
};

// console.log(longestSubArrayEqBySum2([1, 2, 3, 5, 1, 12], 12));
// console.log(
//   longestSubArrayEqBySum2([1, 2, 3, 4, 5, 0, 0, 0,
//      0, 8, 7, 8, 19, 20], 15)
// );

const maxSumOfSubArray2 = (arr) => {
  let max = arr[0],
    curr = arr[0],
    sub = [];
  //   for (let i = 1; i < arr.length; i++) {
  //     curr = Math.max(arr[i], curr + arr[i]);
  //     console.log(curr);
  //     max = Math.max(max, curr);
  //   }
  //   return max;
  for (let i = 0; i < arr.length; i++) {
    if (sub.length === 0) {
      sub.push(arr[i]);
    } else {
      let total = sub.reduce((prev, curr) => prev + curr, 0);
      //   console.log(total);
      //   if (arr[i] > 0) {
      if (total + arr[i] > arr[i]) {
        sub.push(arr[i]);
        // console.log(sub);
      } else {
        sub = [arr[i]];
      }
      //   }
      //   sub.forEach((item) => {
      //       sub.splice(sub.indexOf(item), 1);
      //       sub = [arr[i]];
      //     } else {
      //       console.log(sub);
      //     }
      //   });
    }
  }
  return sub;
};

// console.log(maxSumOfSubArray2([-2, 2, 5, 6, -11, 23, 12]));

var luckyNumbers = function (matrix) {
  let data = [];
  matrix.forEach((item, index) => {
    let min = Math.min(...item);
    let minIndex = matrix[index].indexOf(min);
    let a = matrix.length;
    let max = Number.NEGATIVE_INFINITY;
    while (a--) {
      // console.log(a)
      max = Math.max(max, matrix[a][minIndex]);
    }
    // max = Number.NEGATIVE_INFINITY;
    console.log(max);
    if (min === max) {
      return (data = [min]);
    }
  });
  return data;
};

// console.log(
//   luckyNumbers([
//     [3, 7, 8],
//     [9, 11, 13],
//     [15, 16, 17],
//   ])
// );

var rotate90 = (arr) => {
  let a = [];
  for (let i = 0; i < arr[0].length; i++) {
    const temp = [];
    for (let j = 0; j < arr.length; j++) {
      temp.push(arr[j][i]);
      // rotate
      for (let i = 0; i <= Math.floor(temp.length / 2); i++) {
        const t = temp[i];
        temp[i] = temp[temp.length - 1];
        temp[temp.length - 1] = t;
      }
    }
    a[i] = temp;
  }
  return a;
};

console.log(
  rotate90([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
);

var reshape = (nums, r, c) => {
  if (nums.length * nums[0].length !== r * c) return nums;
  let arr = nums.flat(),
    a = [];
  for (let i = 0; i < r; i++) {
    a.push(arr.splice(0, c));
  }
  return a;
};

console.log(
  reshape(
    [
      [1, 2],
      [3, 4],
    ],
    1,
    4
  )
);

const longestSubArrayEqBySum3 = (arr, t) => {
  let curr = 0,
    left = 0,
    subArr = [],
    max = Number.NEGATIVE_INFINITY,
    boundary = [];
  for (let i = 0; i < arr.length; i++) {
    curr += arr[i];
    while (curr > t) {
      curr -= arr[left];
      left++;
    }
    if (curr === t) {
      max = Math.max(i - left + 1, max);
      if (arr.slice(left, i + 1).length > subArr.length) {
        subArr = arr.slice(left, i + 1);
        boundary = [left + 1, i + 1];
      }
    }
  }
  return { boundary, max, subArr };
};

// console.log(longestSubArrayEqBySum3([1, 2, 3, 5, 12], 12));
// console.log(
//   longestSubArrayEqBySum3([1, 2, 3, 4, 5, 0, 0, 0, 0, 8, 7, 8, 15, 5], 15)
// );

const smallestSubArrayGreaterOrEqBySum3 = (arr, t) => {
  let curr = 0,
    subArr = new Array(arr.length),
    left = 0;
  for (let i = 0; i < arr.length; i++) {
    curr += arr[i];
    while (curr > t) {
      curr -= arr[left];
      left++;
    }
    while (curr === t) {
      if (arr.slice(left, i + 1).length < subArr.length) {
        subArr = arr.slice(left, i + 1);
      }
      curr -= arr[left];
      left++;
    }
  }
  return subArr;
};

// console.log(
//   smallestSubArrayGreaterOrEqBySum3([4, 2, 2, 7, 4, 1, 2, 4, 1, 0], 8)
// );

const pascal = (rows) => {
  let arr = [];
  if (rows <= 0) return arr;
  arr.push([1]);
  for (let i = 1; i < rows; i++) {
    arr[i] = [];
    arr[i].push(1);
    for (let j = 1; j < arr.length - 1; j++) {
      arr[i][j] = arr[i - 1][j - 1] + arr[i - 1][j];
    }
    arr[i].push(1);
  }
  console.log(arr);
};
// console.log(pascal(5));

const shift = (arr, k) => {
  let a = arr.flat();
  while (k--) {
    a.unshift(a.pop());
  }
  let temp = [];
  for (let i = 0; i < 3; i++) {
    temp.push(a.splice(0, arr[i].length));
  }
};

// console.log(
//   shift(
//     [
//       [1, 2, 3],
//       [4, 5, 6],
//       [7, 8, 9],
//     ],
//     4
//   )
// );

const reshape2 = (nums, r, c) => {
  if (nums.length * nums[0].length !== r * c) return nums;
  let a = [],
    arr = nums.flat();
  for (let i = 0; i < r; i++) {
    a[i] = arr.splice(0, c);
  }
  console.log(a);
};

// console.log(
//   reshape2(
//     [
//       [1, 2],
//       [3, 4],
//     ],
//     1,
//     4
//   )
// );

const numspl2 = (mat) => {
  let rowArr = new Array(mat[0].length).fill(0),
    colArr = new Array(mat[0].length).fill(0),
    a = new Array(),
    count = 0;
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      if (mat[i][j]) {
        a.push([i, j]);
        rowArr[i]++;
        colArr[j]++;
      }
    }
  }
  console.log({ a, rowArr, colArr });
  for (let [r, c] of a) {
    if (rowArr[r] === 1 && colArr[c] === 1) count++;
  }
  return count;
};

// console.log(
//   numspl2([
//     [0, 0, 0, 0, 0],
//     [1, 0, 0, 0, 0],
//     [0, 1, 0, 0, 0],
//     [0, 0, 1, 0, 0],
//     [0, 0, 0, 1, 1],
//   ])
// );
