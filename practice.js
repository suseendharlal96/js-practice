const smallestSubArrayGreaterOrEqBySum2 = (arr, t) => {
  let curr = 0,
    left = 0,
    subArr = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    curr += arr[i];
    while (curr > t) {
      if (i - left + 1 === 1) {
        subArr = arr.slice(left, i + 1);
        return { min: subArr.length, subArr };
      } else {
        if (i - left + 1 <= subArr.length) {
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
//   smallestSubArrayGreaterOrEqBySum2([4, 2, -2, 7, -4, 1, 2, 4, 1, 0], 8)
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
//   longestSubArrayEqBySum2([1, 2, 3, 4, 5, 0, 0, 0, 0, 8, 7, 8, 19, 20], 15)
// );

const maxSumOfSubArray2 = (arr) => {
  let max = arr[0],
    curr = arr[0];
  for (let i = 1; i < arr.length; i++) {
    curr = Math.max(arr[i], curr + arr[i]);
    console.log(curr);
    max = Math.max(max, curr);
  }
  return max;
};

console.log(maxSumOfSubArray2([-2, 2, 5, -11, 6]));
console.log(maxSumOfSubArray2([5, 4, -1, 7, 8]));

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

// This rotation is for matrix whose rows and cols dont match or match
var rotate90 = (arr) => {
  let a = [];
  for (let i = 0; i < arr[0].length; i++) {
    const temp = [];
    for (let j = arr.length; j >= 0; j--) {
      temp.push(arr[j][i]);
    }
    a[i] = temp;
  }
  return a;
};

// console.log(
//   rotate90([
//     [1, 2, 3, 4, 13],
//     [5, 6, 7, 8, 14],
//     [9, 10, 11, 12, 15],
//     [16, 17, 18, 19, 20],
//   ])
// );
// console.log(
//   rotate90Two([
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//     [10, 11, 12],
//     [13, 14, 15],
//   ])
// );
// console.log(
//   rotate90([
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//   ])
// );

// This rotation is for matrix whose rows and cols match
var rotate90Match = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      // array destructure
      [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]];
      // traditional
      // const temp = arr[i][j];
      // arr[i][j] = arr[j][i];
      // arr[j][i] = temp;
    }
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].reverse();
    // for (let j = 0; j < arr.length / 2; j++) {
    //   const temp = arr[i][j];
    //   arr[i][j] = arr[i][arr.length - 1 - j];
    //   arr[i][arr.length - 1 - j] = temp;
    // }
  }
  return arr;
};

console.log(
  rotate90Match([
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

// console.log(
//   reshape(
//     [
//       [1, 2],
//       [3, 4],
//     ],
//     1,
//     4
//   )
// );

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
  for (let i = 0; i < rows; i++) {
    arr[i] = [];
  }
  if (rows <= 0) return arr;
  arr[0].push(1);
  for (let i = 1; i < rows; i++) {
    arr[i] = [];
    arr[i].push(1);
    for (let j = 1; j < i; j++) {
      arr[i].push(arr[i - 1][j - 1] + arr[i - 1][j]);
    }
    arr[i].push(1);
  }
  return arr;
};
// console.log(pascal(6));

const shift = (arr, k) => {
  let a = arr.flat();
  while (k--) {
    a.unshift(a.pop());
  }
  let temp = [];
  for (let i = 0; i < arr.length; i++) {
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
//       [5, 6],
//     ],
//     2,
//     3
//   )
// );

const spiralMatrix2 = (mat) => {
  let rowStart = 0,
    rowEnd = mat.length - 1,
    colStart = 0,
    colEnd = mat[0].length - 1,
    res = [];
  while (rowStart <= rowEnd && colStart <= colEnd) {
    for (let i = colStart; i <= colEnd; i++) {
      res.push(mat[rowStart][i]);
    }
    rowStart++;
    for (let i = rowStart; i <= rowEnd; i++) {
      res.push(mat[i][colEnd]);
    }
    colEnd--;
    if (rowStart <= rowEnd) {
      for (let i = colEnd; i >= colStart; i--) {
        res.push(mat[rowEnd][i]);
      }
    }
    rowEnd--;
    if (colStart <= colEnd) {
      for (let i = rowEnd; i >= rowStart; i--) {
        res.push(mat[i][colStart]);
      }
    }
    colStart++;
  }
  return res;
};
// console.log(
//   spiralMatrix2([
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12],
//     [13, 14, 15, 16],
//     [17, 18, 19, 20],
//   ])
// );

// console.log(
//   spiralMatrix2([
//     [1, 11],
//     [2, 12],
//     [3, 13],
//     [4, 14],
//     [5, 15],
//     [6, 16],
//     [7, 17],
//     [8, 18],
//     [9, 19],
//     [10, 20],
//   ])
// );

// console.log(
//   spiralMatrix2([
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12],
//   ])
// );

const generateSpiralMatrix2 = (r, c) => {
  let rowStart = 0,
    rowEnd = r - 1,
    colStart = 0,
    colEnd = c - 1,
    mat = [],
    count = 1;
  for (let i = 0; i < r; i++) {
    mat[i] = [];
  }

  while (rowStart <= rowEnd && colStart <= colEnd) {
    for (let i = colStart; i <= colEnd; i++) {
      mat[rowStart][i] = count++;
    }
    rowStart++;
    for (let i = rowStart; i <= rowEnd; i++) {
      mat[i][colEnd] = count++;
    }
    colEnd--;
    if (rowStart <= rowEnd) {
      for (let i = colEnd; i >= colStart; i--) {
        mat[rowEnd][i] = count++;
      }
    }
    rowEnd--;
    if (colStart <= colEnd) {
      for (let i = rowEnd; i >= rowStart; i--) {
        mat[i][colStart] = count++;
      }
    }
    colStart++;
  }
  console.log(mat);
};

// console.log(generateSpiralMatrix2(5, 4));

var doBinarySearch = function (array, targetValue) {
  let start = 0,
    end = array.length - 1;
  while (start <= end) {
    let midPoint = Math.floor(start + (end - start) / 2);
    if (array[midPoint] === targetValue) {
      return midPoint;
    } else if (targetValue > array[midPoint]) {
      start = midPoint + 1;
    } else if (targetValue < array[midPoint]) {
      end = midPoint - 1;
    }
  }
  return -1;
};

// console.log(
//   doBinarySearch(  [ 2, 3, 5, 7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97]
//     ,67
//   )
// );

const productExceptSelf2 = (arr) => {
  // let res = [];
  // res[0] = 1;

  // for (let i = 1; i < arr.length; i++) {
  //   res[i] = arr[i - 1] * res[i - 1];
  // }
  // let rightCount = 1;

  // for (let i = arr.length - 1; i >= 0; i--) {
  //   res[i] = res[i] * rightCount;
  //   rightCount = rightCount * arr[i];
  // }

  let res = [],
    leftProd = [],
    rightProd = [];
  leftProd[0] = 1;
  rightProd[arr.length - 1] = 1;

  // left products
  for (let i = 1; i < arr.length; i++) {
    leftProd[i] = leftProd[i - 1] * arr[i - 1];
  }
  // right products
  for (let i = arr.length - 2; i >= 0; i--) {
    rightProd[i] = rightProd[i + 1] * arr[i + 1];
  }
  for (let i = 0; i < arr.length; i++) {
    res[i] = leftProd[i] * rightProd[i];
  }
  return res;
};

// console.log(productExceptSelf2([1, 2, 3, 4, 5]));

const numSpl2 = (mat) => {
  let arr = [],
    count = 0,
    row = new Array(mat.length).fill(0),
    col = new Array(mat[0].length).fill(0);
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      if (mat[i][j] === 1) {
        arr.push([i, j]);
        row[i]++;
        col[j]++;
      }
    }
  }
  for (let [r, c] of arr) {
    if (row[r] === 1 && col[c] === 1) {
      count++;
    }
  }
  console.log(count);
};
// console.log(
//   numSpl2([
//     [0, 0, 0, 0, 0],
//     [1, 0, 0, 0, 0],
//     [0, 1, 0, 0, 0],
//     [0, 0, 1, 0, 0],
//     [0, 0, 0, 1, 1],
//   ])
// );

const bubSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        // const temp = arr[j];
        // arr[j] = arr[j + 1];
        // arr[j + 1] = temp;
      }
    }
  }
  return arr;
};

// console.log(bubSort([7, 3, 1, 4, 6, 2, 3]));

const insSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;
    console.log(j);
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    console.log(j);
    arr[j + 1] = current;
    console.log(arr);
  }
};

// console.log(insSort([7, 3, 1, 4, 6, 2, 3]));
// console.log(insSort([8, 2, 4, 1, 3]));

const lucky2 = (mat) => {
  let lucky = [];
  mat.forEach((item) => {
    const min = Math.min(...item);
    const minIndex = item.indexOf(min);
    let max = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < mat.length; i++) {
      max = Math.max(mat[i][minIndex], max);
    }
    if (min === max) {
      lucky.push(min);
    }
  });
  return lucky;
};

// console.log(
//   lucky2([
//     [1, 10, 4, 2],
//     [9, 3, 8, 7],
//     [15, 16, 17, 12],
//   ])
// );
// console.log(
//   lucky2([
//     [3, 7, 8],
//     [9, 11, 13],
//     [15, 16, 17],
//   ])
// );

const printDiagMat1 = (mat) => {
  // top left to bottom right(upward direction)
  let rows = mat.length - 1,
    cols = mat[0].length - 1,
    res = [];
  // traverse rows
  for (let i = 0; i <= rows; i++) {
    let j = 0,
      k = i;
    while (j <= i) {
      res.push(mat[k][j]);
      k -= 1;
      j += 1;
    }
  }
  // traverse cols
  for (let i = 1; i <= cols; i++) {
    let j = rows,
      k = i;
    while (j >= 0 && k <= cols) {
      res.push(mat[j][k]);
      j -= 1;
      k += 1;
    }
  }
  console.log(res);
};

// console.log(
//   printDiagMat1([
//     [3, 7, 8],
//     [9, 11, 13],
//     [15, 16, 17],
//   ])
// );
// console.log(
//   printDiagMat1([
//     [3, 3, 1, 1],
//     [2, 2, 1, 2],
//     [1, 1, 1, 2],
//   ])
// );

const printDiagMat2 = (mat) => {
  // bottom left top right(downward direction)
  let rows = mat.length - 1,
    cols = mat[0].length - 1,
    res = [];

  // traverse rows
  for (let i = rows; i >= 0; i--) {
    let j = i,
      k = 0;
    while (j <= rows) {
      res.push(mat[j][k]);
      j += 1;
      k += 1;
    }
  }
  // traverse cols
  for (let i = 1; i <= cols; i++) {
    let j = i,
      k = 0;
    while (k <= rows && j <= cols) {
      res.push(mat[k][j]);
      k += 1;
      j += 1;
    }
  }
  console.log(res);
};
// console.log(
//   printDiagMat2([
//     [3, 3, 1, 1, 7],
//     [2, 2, 1, 2, 5],
//     [1, 1, 1, 2, 4],
//   ])
// );
// console.log(
//   printDiagMat2([
//     [3, 7, 8],
//     [9, 11, 13],
//     [15, 16, 17],
//   ])
// );

const twoSum2 = (arr, target) => {
  let m = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (m.has(target - arr[i])) {
      return [m.get(target - arr[i]), i];
    }
    m.set(arr[i], i);
  }
};
// console.log(twoSum2([2, 7, 11, 15], 9));

const diagonalSort2 = (mat) => {
  // top-left to bottom-right(downward direction)

  let rows = mat.length - 1,
    cols = mat[0].length - 1;

  const sortDiag = (i, j) => {
    i++;
    j++;
    while (i <= rows && j <= cols) {
      while (i > 0 && j > 0 && mat[i - 1][j - 1] > mat[i][j]) {
        [mat[i][j], mat[i - 1][j - 1]] = [mat[i - 1][j - 1], mat[i][j]];
        i--;
        j--;
      }
      i++;
      j++;
    }
  };

  // traverse rows
  for (let i = 0; i <= rows; i++) {
    sortDiag(i, 0);
  }
  // traverse cols
  for (let i = 1; i <= cols; i++) {
    sortDiag(0, i);
  }
  return mat;
};

// console.log(
//   diagonalSort2([
//     [11, 25, 66, 1, 69, 7],
//     [23, 55, 17, 45, 15, 52],
//     [75, 31, 36, 44, 58, 8],
//     [22, 27, 33, 25, 68, 4],
//     [84, 28, 14, 11, 5, 50],
//   ])
// );

const maxProdSubArray2 = (arr) => {
  let max = arr[0],
    min = arr[0],
    result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    const num = arr[i];
    const minProd = num * min;
    const maxProd = num * max;
    max = Math.max(num, maxProd, minProd);
    min = Math.min(num, maxProd, minProd);
    result = Math.max(max, result);
  }
  return result;
};
// console.log(maxProdSubArray2([2, 3, -2, 4]));
// console.log(maxProdSubArray2([-2, 0, -1]));


