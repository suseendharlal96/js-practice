// APPLE
const productExceptSelf = (arr) => {
  const copy = [...arr];
  for (let i = 0; i < arr.length; i++) {
    arr[i] =
      copy.slice(0, i).reduce((total, curr) => {
        return total * curr;
      }, 1) *
      copy.slice(i + 1, copy.length).reduce((total, curr) => {
        return total * curr;
      }, 1);
  }
  return arr;
};

// console.log(productExceptSelf([1, 2, 3, 4]));

//   AMAZON
const rotateImage = (arr) => {
  // Transpose:
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      //   console.log(j)
      //   console.log(arr[i][j]);
      const temp = arr[i][j];
      arr[i][j] = arr[j][i];
      arr[j][i] = temp;
    }
  }
  // swap horizondal
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length / 2; j++) {
      const temp = arr[i][j];
      arr[i][j] = arr[i][arr.length - 1 - j];
      arr[i][arr.length - 1 - j] = temp;
    }
  }
  return arr;
};

// console.log(
//   rotateImage([
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12],
//     [13, 14, 15, 16],
//   ])
// );

// GOOGLE

// Brute force(not optimal solution)
// const sumOfTwo = (arr1, arr2, t) => {
//   const a = [];
//   for (let i = 0; i < arr1.length; i++) {
//     for (let j = 0; j < arr2.length; j++) {
//       if (arr1[i] + arr2[j] === t) {
//         a.push(arr1[i], arr2[j]);
//         return { ok: true, a };
//       }
//     }
//   }
//   return false;
// };

// Second solution
const sumOfTwo = (arr1, arr2, t) => {
  const myset = new Set();
  for (let i = 0; i < arr1.length; i++) {
    myset.add(t - arr1[i]);
  }
  for (let j = 0; j < arr2.length; j++) {
    if (myset.has(arr2[j])) {
      return true;
    }
  }
  return false;
};

// console.log(sumOfTwo([0, 0, -5, 30212], [-10, 40, -3, 9], -8));

// SLIDING WINDOW

//1. Smallest subarray by Sum(greater than or equal to given target)
const smallestSubArrayGreaterOrEqBySum = (arr, t) => {
  // sum of subarray can be 8 or more than that
  let currentSum = 0,
    min = 100,
    left = 0;
  for (let i = 0; i < arr.length; i++) {
    currentSum += arr[i];
    // console.log(i)
    while (currentSum >= t) {
      if (i - left + 1 === 1) {
        return (min = 1);
      } else {
        min = Math.min(min, i - left + 1);
        currentSum -= arr[left];
        left++;
      }
    }
  }
  return min;
};

// console.log(
//   smallestSubArrayGreaterOrEqBySum([4, 2, 2, 7, 7, 1, 2, 7, 1, 0], 8)
// );

//2. Smallest subarray by Sum(Exactly equal to given target)
const smallestSubArrayEqBySum = (arr, t) => {
  // sum of subarray should be 8
  let currentSum = 0,
    min = 100,
    left = 0;
  for (let i = 0; i < arr.length; i++) {
    currentSum += arr[i];
    // console.log(i)
    while (currentSum === t) {
      if (i - left + 1 === 1) {
        return (min = 1);
      } else {
        min = Math.min(min, i - left + 1);
        currentSum -= arr[left];
        left++;
      }
    }
    while (currentSum > t) {
      currentSum -= arr[left];
      left++;
    }
  }
  return min;
};

// console.log(smallestSubArrayEqBySum([4, 2, 2, 7, 9, 1, 2, 9, 1, 0], 8));

//3. Smallest subarray by Sum(Greater than given target)
const smallestSubArrayGreaterThanBySum = (arr, t) => {
  console.log("smallestSubArrayGreaterThanBySum");
  let currentSum = 0,
    min = arr.length,
    left = 0,
    smallArr = [...arr];

  for (let i = 0; i < arr.length; i++) {
    currentSum += arr[i];
    while (currentSum > t) {
      if (i - left + 1 === 1) {
        smallArr.push(1);
        min = 1;
        return { min, smallArr };
      } else {
        min = Math.min(i - left + 1, min);
        currentSum -= arr[left];
        if (smallArr.length > min) {
          smallArr = arr.slice(left, i + 1);
        }
        left++;
      }
    }
  }
  return { min, smallArr };
};

// console.log(
//   smallestSubArrayGreaterThanBySum([4, 2, 2, 1, 8, 1, 2, 8, 1, 0], 9)
// );

//4. Longest subarray by Sum(Exactly equal to given target)
// FACEBOOK
const longestSubArrayEqBySum = (arr, t) => {
  // let right = 0,
  //   left = 0,
  //   currSum = 0,
  //   result = [-1];
  // while (right < arr.length) {
  //   currSum += arr[right];
  //   if (
  //     (currSum === t && result.length < 2) ||
  //     (currSum === t &&
  //       result.length === 2 &&
  //       result[1] - result[0] < right - left)
  //   ) {
  //     result = [left + 1, right + 1];
  //   }

  //   if (currSum > t) {
  //     currSum -= arr[left];
  //     left++;
  //   }
  //   right++;
  // }
  // return result;
  let currentSum = 0,
    max = 0,
    res = [],
    left = 0,
    boundary = [-1];
  for (let i = 0; i < arr.length; i++) {
    currentSum += arr[i];
    console.log(i);
    if (currentSum === t) {
      max = Math.max(max, i - left + 1);
      if (max > res.length) {
        res = arr.slice(left, i + 1);
        boundary = [left + 1, i + 1];
      }
    }
    while (currentSum > t) {
      currentSum -= arr[left];
      left++;
    }
  }
  return { boundary, res };
};

// console.log(
//   longestSubArrayEqBySum([1, 2, 3, 4, 5, 0, 0, 0, 0, 6, 7, 8, 19, 20], 15)
// );

//5. Longest subarray with K distinct characters
const longestSubArrayOfKDistinctChar = (arr, t) => {
  let maxArr = [],
    a = [],
    max = 0,
    mySet = new Set(),
    left = 0;

  for (let i = 0; i < arr.length; i++) {
    mySet.add(arr[i]);
    console.log(mySet.size);
    if (mySet.size <= t) {
      a.push(arr[i]);
      max = Math.max(a.length, max);
      if (max > maxArr.length) {
        maxArr = [...a];
        console.log(maxArr);
      }
    } else {
      a = arr.slice(left + 1 + 1, i + 1);
      mySet.delete(arr[left]);
      console.log(a);
      left++;
    }
  }
  return maxArr;
};
// console.log(
//   longestSubArrayOfKDistinctChar(["A", "A", "A", "I", "H", "H", "B", "C"], 2)
// );

// 6. Maximum Sum from a sub array(No target given)
// AMAZON

const maxSumOfSubArray = (arr) => {
  let max = arr[0],
    currentSum = max;
  for (let i = 1; i < arr.length; i++) {
    currentSum = Math.max(currentSum + arr[i], arr[i]);
    max = Math.max(currentSum, max);
    // console.log({ currentSum, max });
  }
  return max;

  // let maxArr = [],
  //   ar = [];

  // for (let i = 0; i < arr.length; i++) {
  //   // currentSum += arr[i];
  //   console.log(maxArr.length);
  //   if (maxArr.length > 0) {
  //     console.log(maxArr);
  //     ar.forEach((a) => {
  //       if (a + arr[i] > a) {
  //         console.log(arr[i]);
  //         maxArr = [arr[i]];
  //       } else {
  //         maxArr.push(arr[i]);
  //       }
  //     });
  //   } else {
  //     maxArr.push(arr[i]);
  //     // console.log(maxArr)
  //     ar.push(arr[i]);
  //   }
  //   // while (currentSum > max) {
  //   //   max = currentSum;
  //   // }
  // }
  // return maxArr;
};

// console.log(maxSumOfSubArray([-2, 2, 5, 6, -11]));

var diagonalSum = function (mat) {
  let currentSum = 0;
  for (let i = 0; i < mat.length; i++) {
    for (let j = i; j < mat.length; j++) {
      if (i == j) {
        currentSum += mat[i][j];
      }
    }

    currentSum += mat[i][mat.length - (i + 1)];
  }
  if (mat.length === 1) {
    return (currentSum -= mat[0][0]);
  } else if (mat.length % 2 !== 0) {
    return (currentSum -=
      mat[Math.floor(mat.length / 2)][Math.floor(mat.length / 2)]);
  }
  return currentSum;
};

console.log(
  diagonalSum([
    [7, 9, 8, 6, 3],
    [3, 9, 4, 5, 2],
    [8, 1, 10, 4, 10],
    [9, 5, 10, 9, 6],
    [7, 2, 4, 10, 8],
  ])
);

var flipAndInvertImage = function (A) {
  let b = 0;
  for (let i = 0; i < A.length; i++) {
    while (b < A.length / 2) {
      const temp = A[i][b] === 0 ? 1 : 0;
      A[i][b] = A[i][A.length - 1 - b] === 0 ? 1 : 0;
      A[i][A.length - 1 - b] = temp;
      b++;
    }
    b = 0;
  }
  return A;
  // Short solution(es6)
  // return A.map(a => a.reverse().map(v => v===0?1:0));
};

// console.log(
//   flipAndInvertImage([
//     [1, 1, 0, 0],
//     [1, 0, 0, 1],
//     [0, 1, 1, 1],
//     [1, 0, 1, 0],
//   ])
// );
new String().replace();

var maximum69Number = function (num) {
  let max = 0;
  for (let i = 0; i < num.toString().length; i++) {
    max = Math.max(
      num.toString()[i] === "6"
        ? num.toString().replace(num.toString()[i], "9")
        : num.toString().replace(num.toString()[i], "6"),
      num > max ? num : max
    );
  }
  return max;
};

// console.log(maximum69Number(9669));

var sumOfUnique = function (nums) {
  let numMap = new Map(),
    curr = 0;
  nums.forEach((n) => {
    numMap.set(n, numMap.get(n) + 1 || 1);
  });
  numMap.forEach((value, key) => {
    if (value === 1) {
      curr += key;
    }
  });
  return curr;
};

// console.log(sumOfUnique([1, 2, 3, 2, 5, 5]));

// Given the array of integers nums,
//  you will choose two different indices i and j of that array.
//  Return the maximum value of (nums[i]-1)*(nums[j]-1).
var maxProduct = function (nums) {
  const sorted = nums.sort((a, b) => a - b);
  return (sorted[nums.length - 1] - 1) * (sorted[nums.length - 2] - 1);
};

// console.log(maxProduct([3,7]));

var destCity = function (paths) {
  let destMap = new Map();
  let dest;
  if (paths.length === 1) {
    dest = paths[0][paths[0].length - 1];
  } else {
    paths.forEach((path) => {
      path.forEach((p, index) => {
        destMap.set(p, destMap.get(p) ? [...destMap.get(p), index] : [index]);
      });
    });
  }
  destMap.forEach((value, key) => {
    if (value.length === 1 && value[0] === 1) {
      return (dest = key);
    }
  });
  return dest;
};

// console.log(
//   destCity([
//     ["A", "B"],
//     ["C", "A"],
//   ])
// );

var replaceElements = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i + 1] ? Math.max(...arr.slice(i + 1, arr.length + 1)) : -1;
  }
  return arr;
};

// console.log(replaceElements([17, 18, 5, 4, 6, 1]));

const numSquares = (n) => {
  const dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;
  console.log(dp);

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j * j <= i; j++) {
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
    }
  }
  return dp[n];
};

// console.log(numSquares(12));

var searchMatrix = function (matrix, target) {
  const rows = matrix.length;
  let col = matrix[0].length - 1;
  let row = 0;
  while (row < rows) {
    if (matrix[row][col] === target) {
      return true;
    }
    console.log(matrix[row][col]);
    if (matrix[row][col] < target) {
      row++;
    } else {
      col--;
    }
  }
  return false;
};

// console.log(
//   searchMatrix(
//     [
//       [1, 4, 7, 11, 15],
//       [2, 5, 8, 12, 19],
//       [3, 6, 9, 16, 22],
//       [10, 13, 14, 17, 24],
//       [18, 21, 23, 26, 30],
//     ],
//   )
// );

var findEvenDigitNumbers = function (nums) {
  let count = 0;
  nums.forEach((n) => {
    n.toString().length % 2 === 0 ? (count += 1) : null;
  });
  return count;
};

// console.log(findEvenDigitNumbers([555,901,482,1771]));

var searchInsert = function (nums, target) {
  if (nums[0] > target) return 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target || nums[i] > target) return i;
  }
  return nums.length;
};

// console.log(searchInsert([1, 3, 5, 6], 2));

var maxSubArray = function (nums) {
  if (nums.length === 1) return nums[0];
  let max = nums[0],
    curr = max;
  for (let i = 1; i < nums.length; i++) {
    curr = Math.max(nums[i], nums[i] + curr);
    max = Math.max(max, curr);
  }
  return max;
};

// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

var plusOne = function (digits) {
  let isNinePresent = true;
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] > 8) {
      digits[i] = 0;
    } else {
      isNinePresent = false;
      digits[i] += 1;
      break;
    }
  }
  if (isNinePresent) digits.unshift(1);
  return digits;
};

// console.log(plusOne([9, 9, 9]));

var merge = function (nums1, m, nums2, n) {
  if (n === 0) return nums1;
  for (let i = m; i < nums1.length; i++) {
    nums1[i] = nums2[n - (nums1.length - i)];
  }
  return nums1.sort((a, b) => a - b);
};

// console.log(merge([0], 0, [1], 1));

var canBeEqual = function (target, arr) {
  const a = target.sort((a, b) => a - b);
  const b = arr.sort((a, b) => a - b);
  return a.toString() == b.toString();
};

// console.log(canBeEqual([1, 12], [12, 1,1]));

var sumZero = function (n) {
  // if (n === 1) return [0];
  let arr = [];
  if (n % 2 !== 0) {
    arr.push(0);
  }
  while (arr.length < n) {
    const a = arr.length + 1;
    arr.push(a, -a);
  }
  console.log(arr.length);
  return arr;
};

// console.log(sumZero(6));

var sortedSquares = function (nums) {
  let arr = [];
  for (let i = 0; i < nums.length; i++) {
    nums[i] = nums[i] * nums[i];
  }
  return nums.sort((a, b) => a - b);
};

// console.log(sortedSquares([-4, -1, 0, 3, 10]));

var maximumWealth = function (accounts) {
  let max = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < accounts.length; i++) {
    let curr = 0;
    for (let j = 0; j < accounts[i].length; j++) {
      curr += accounts[i][j];
    }
    max = Math.max(curr, max);
  }
  return max;
};

// console.log(
//   maximumWealth([
//     [2, 8, 7],
//     [7, 1, 3],
//     [1, 9, 5],
//   ])
// );

var numIdenticalPairs = function (nums) {
  let count = 0,
    numMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (numMap.has(nums[i])) {
      count += numMap.get(nums[i]);
      numMap.set(nums[i], numMap.get(nums[i]) + 1);
    } else {
      numMap.set(nums[i], 1);
    }
  }
  console.log(numMap);
  return count;
};

// console.log(numIdenticalPairs([1, 2, 3, 1, 1, 3, 3]));

var oddCells = function (n, m, indices) {
  // first solution
  let count = 0;
  let matrix = [];
  for (let i = 0; i < n; i++) {
    matrix.push(new Array(m).fill(0));
  }
  // console.log(matrix);
  indices.forEach((item) => {
    item.forEach((ind, indexx) => {
      console.log(ind);
      if (indexx === 0) {
        matrix[ind].forEach((item, index) => {
          // console.log(item)
          item += 1;
          matrix[ind][index] = item;
        });
      } else {
        matrix.forEach((_, i) => {
          matrix[i][ind] += 1;
        });
      }
    });
  });
  // for (let i = 0; i < indices.length; i++) {
  //   for (let j = i; j <= i; j++) {
  //   }
  // }
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      // console.log(matrix[i][j]);
      if (matrix[i][j] % 2 !== 0) {
        count += 1;
      }
    }
  }
  return { count, matrix };

  // Second solution
  const [rows, cols] = [new Array(n).fill(0), new Array(m).fill(0)];
  for (const [ri, ci] of indices) [rows[ri]++, cols[ci]++];
  const rowOdds = rows.filter((n) => 1 === n % 2).length;
  const rowEvens = rows.length - rowOdds;
  const colOdds = cols.filter((n) => 1 === n % 2).length;
  const colEvens = cols.length - colOdds;
  return rowOdds * colEvens + rowEvens * colOdds;
  console.log({ matrix, count });
};

console.log(
  oddCells(2, 3, [
    [0, 1],
    [1, 1],
  ])
);

var finalPrices = function (prices) {
  for (let i = 0; i < prices.length - 1; i++) {
    if (prices[i] >= prices[i + 1]) {
      prices[i] = prices[i] - prices[i + 1];
    } else {
      const min = prices
        .slice(i + 1, prices.length)
        .find((d) => prices[i] - d >= 0);
      prices[i] = min ? prices[i] - min : prices[i];
    }
  }
  return prices;
};

// console.log(finalPrices([8, 7, 4, 2, 8, 1, 7, 7, 10, 1]));

var luckyNumbers = function (matrix) {
  for (let i = 0; i < matrix.length; i++) {
    let min = Number.POSITIVE_INFINITY;
    min = Math.min(min, ...matrix[i]);
    minIndex = matrix[i].indexOf(min);
    let a = 0;
    max = Number.NEGATIVE_INFINITY;
    while (a < matrix.length) {
      console.log({ a, minIndex });
      max = Math.max(matrix[a][minIndex], max);
      a++;
    }
    if (min === max) {
      return [min];
    }
  }
  return [];
};

// console.log(
//   luckyNumbers([
//     [3, 7, 8],
//     [9, 11, 13],
//     [15, 16, 17],
//   ])
// );

var countNegatives = function (grid) {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = grid[i].length - 1; j >= 0; j--) {
      if (grid[i][j] < 0) {
        count += 1;
      } else {
        break;
      }
    }
  }
  return count;
};

// console.log(
//   countNegatives([
//     [5, 1, 0],
//     [-5, -5, -5],
//   ])
// );

var busyStudent = function (startTime, endTime, queryTime) {
  let count = 0;
  if (
    startTime.length === 1 &&
    startTime[0] === endTime[0] &&
    (startTime[0] === queryTime || endTime[0] === queryTime)
  )
    return 1;
  for (let i = 0; i < startTime.length; i++) {
    if (startTime[i] <= queryTime && queryTime <= endTime[i]) {
      count += 1;
    }
  }
  return count;
};

// console.log(busyStudent([1, 2, 3], [3, 2, 7], 4));

var commonChars = function (A) {
  let res = [];
  for (let i = 0; i < A[0].length; i++) {
    let letter = A[0][i];
    if (A.every((word) => word.indexOf(letter) !== -1)) {
      res.push(letter);
      A = A.map((word) => word.replace(letter, ""));
      i--;
    }
  }

  return res;
};

// console.log(commonChars(["bella", "label", "roller"]));

var relativeSortArray = function (arr1, arr2) {
  // needs changes
  let arr = [],
    d = [];
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) !== -1) {
      if (arr.includes(arr1[i])) {
        console.log(arr1[i]);
        // console.log(arr.indexOf(arr1[i]));
        const a = arr.splice(
          arr.lastIndexOf(arr1[i]) + 1,
          arr.slice(arr.lastIndexOf(arr1[i]) + 1, arr.length).length
        );
        console.log(a);
        // console.log(arr);
        arr[arr.lastIndexOf(arr1[i]) + 1] = arr1[i];
        // console.log(arr);
        let combined = arr.concat(a);
        arr = combined;
        console.log(arr);
      } else {
        arr[arr2.indexOf(arr1[i])] = arr1[i];
      }
    } else {
      arr.push(arr1[i]);
    }
    // console.log(arr);
  }
  console.log({ arr, d });
};

// console.log(
//   relativeSortArray([2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19], [2, 1, 4, 3, 9, 6])
// );

var findLucky = function (arr) {
  let m = new Map(),
    max = -1;
  for (let i = 0; i < arr.length; i++) {
    m.set(arr[i], m.get(arr[i]) + 1 || 1);
  }
  console.log(m);
  m.forEach((value, key) => {
    if (key === value) {
      max = Math.max(value, max);
    }
  });
  return max;
};

// console.log(findLucky([4, 3, 2, 2, 4, 1, 3, 4, 3]));

var fib = function (N) {
  var memo = {};
  var helper = (x) => {
    if (memo[x]) return memo[x];
    if (x == 1 || x == 0) return x;
    console.log(helper(x - 1));
    return (memo[x] = helper(x - 1) + helper(x - 2));
  };
  return helper(N);
};

// console.log(fib(3));

var canThreePartsEqualSum = function (A) {
  let avg = 0;
  A.forEach((item) => {
    avg += item;
  });
  avg = avg / 3;
  let a = 0,
    count = 0;
  console.log(avg);
  A.forEach((item) => {
    console.log(a);
    a += item;
    if (a === avg) {
      count++;
      a = 0;
    }
  });
  return count >= 3;
};

// console.log(canThreePartsEqualSum([10, -10, 10, -10, 10, -10, 10, -10]));

var frequencySort = function (nums) {
  let m = new Map();
  nums.forEach((n) => {
    m.set(n, m.get(n) + 1 || 1);
  });
  // console.log(m);
  return nums.sort((a, b) =>
    m.get(a) === m.get(b) ? b - a : m.get(a) - m.get(b)
  );
};

// console.log(frequencySort([2, 3, 1, 3, 2]));

var transpose = function (A) {
  // Solution 1
  let a = [];
  for (let i = 0; i < A[0].length; i++) {
    let res = [];
    for (let j = 0; j < A.length; j++) {
      res.push(A[j][i]);
    }
    a[i] = res;
  }
  console.log(a);

  // Solution 2
  // let result = [];
  // A.forEach((el, i) =>
  //   el.forEach((elIn, iIn) => {
  //     if (i === 0) {
  //       console.log(elIn);
  //       result.push([elIn]);
  //     } else result[iIn].push(elIn);
  //   })
  // );

  return a;
};

// console.log(
//   transpose([
//     [1, 2, 3],
//     [4, 5, 6],
//   ])
// );

var shiftGrid = function (grid, k) {
  var arr = grid.flat();
  while (k--) {
    console.log(k);
    arr.unshift(arr.pop());
  }

  var res = [];
  for (let i = 0; i < grid.length; i++) {
    res.push(arr.splice(0, grid.length));
  }

  return res;
};

console.log(
  shiftGrid(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    4
  )
);

var matrixReshape = function (nums, r, c) {
  if (nums[0].length * nums.length !== r * c) return nums;
  let arr = nums.flat(),
    a = [];
  for (let i = 0; i < r; i++) {
    a.push(arr.splice(0, c));
  }
  console.log(a);
};

// console.log(
//   matrixReshape(
//     [
//       [1, 2],
//       [3, 4],
//     ],
//     1,
//     4
//   )
// );

var containsDuplicate = function (nums) {
  let dupMap = new Map();
  nums.forEach((n) => {
    dupMap.set(n, dupMap.get(n) + 1 || 1);
  });
  let a = false;
  dupMap.forEach((value, key) => {
    if (value > 1) {
      a = true;
    }
  });
  return a;
};

// console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]));

var maximumProductOf3 = function (nums) {
  nums = nums.sort((a, b) => Math.abs(a) - Math.abs(b));
  console.log(nums);
  let len = nums.length - 1;
  let product1 = nums[0] * nums[1] * nums[2];
  let product2 = nums[0] * nums[1] * nums[len];
  let product3 = nums[len] * nums[len - 1] * nums[len - 2];

  return Math.max(product1, product2, product3);
};

// console.log(maximumProductOf3([-100, -98, -1, 2, 3, 4]));

var maxProdSubArray = function (nums) {
  let min = nums[0],
    max = nums[0],
    currMin = 0,
    currMax = 0,
    result = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currMax = Math.max(min * nums[i], nums[i], max * nums[i]);
    currMin = Math.min(max * nums[i], nums[i], min * nums[i]);
    console.log({ currMin, currMax });
    max = currMax;
    min = currMin;
    result = Math.max(max, result);
  }
  return result;
};

// console.log(maxProdSubArray([-2, 3, -4]));

var sumOddLengthSubarrays = function (arr) {
  const odd = [];
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      odd.push(arr[j]);
      if (odd.length % 2 !== 0) {
        for (let val of odd) {
          count += val;
        }
      }
    }
    odd.length = 0;
  }
  return count;
};
// console.log(sumOddLengthSubarrays([1, 2]));

var createTargetArray = function (nums, index) {
  const a = [];
  for (let key in index) {
    a.splice(index[key], 0, nums[key]);
  }
  return a;
};
// console.log(createTargetArray([0, 1, 2, 3, 4], [0, 1, 2, 2, 1]));

var arrayPairSum = function (arr) {
  let sorted = arr.sort((a, b) => b - a);
  console.log(sorted);
  let filter = sorted.filter((item, i) => i % 2 !== 0);
  console.log(filter);
  let count = 0;
  filter.forEach((item) => {
    count += item;
  });
  return count;
};

// console.log(arrayPairSum([6, 2, 6, 5, 1, 2]));

var sumSubarrayMins = function (arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    let a = [];
    let right = i;
    while (right < arr.length) {
      a.push(arr[right]);
      let min = Math.min(...a);
      count += min;
      right++;
    }
  }
  return (count % 1e9) + 7;
};

// console.log(sumSubarrayMins([11, 81, 94, 43, 3]));

var rotate = function (nums, k) {
  while (k--) {
    nums.unshift(nums.pop());
  }
  return nums;
};

// console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3));

var minSubarray = function (arr, p) {
  // let count = 0;
  if (arr.reduce((prev, curr) => prev + curr, 0) % p === 0) return 0;
  let allPossiblePairs = [];
  for (let i = 0; i < arr.length; i++) {
    let a = [];
    let right = i;
    while (right < arr.length) {
      let temp = [];
      a.push(arr[right]);
      temp = [...a];
      // unique contiguous sub array pairs
      allPossiblePairs.push(temp);
      let sum = a.reduce((prev, curr) => prev + curr, 0);
      if (sum % p === 0) {
        console.log(a);
        return arr.length - a.length;
      }
      right++;
    }
  }
  console.log(allPossiblePairs);
  return -1;
};

// console.log(minSubarray([3, 1, 4, 2], 6));

var spiralOrder = function (matrix) {
  let res = [];
  while (matrix.length > 0) {
    let top = [],
      bottom = [],
      right = [],
      left = [];
    top = matrix.shift();
    bottom = matrix.length > 0 ? matrix.pop().reverse() : [];
    console.log({ top, bottom });
    for (let i = 0; i < matrix.length; i++) {
      matrix[i].length > 0 ? right.push(matrix[i].pop()) : [];
      matrix[i].length > 0 ? left.push(matrix[i].shift()) : [];
      console.log(matrix.length);
    }
    res.push(...top, ...right, ...bottom, ...left.reverse());
  }

  return res;
};

// console.log(
//   spiralOrder([
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
//   spiralOrder([
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12],
//     [13, 14, 15, 16],
//     [17, 18, 19, 20],
//   ])
// );
