const productExceptSelf = (arr) => {
  // const copy = [...arr];
  // for (let i = 0; i < arr.length; i++) {
  //   arr[i] =
  //     copy.slice(0, i).reduce((total, curr) => {
  //       return total * curr;
  //     }, 1) *
  //     copy.slice(i + 1, copy.length).reduce((total, curr) => {
  //       return total * curr;
  //     }, 1);
  // }
  // return arr;

  // let n = arr.length,
  //   leftProd = [],
  //   rightProd = [],
  //   res = [];

  // leftProd[0] = 1;
  // rightProd[n - 1] = 1;

  // for (let i = 1; i < n; i++) {
  //   leftProd[i] = arr[i - 1] * leftProd[i - 1];
  // }
  // for (let i = n - 2; i >= 0; i--) {
  //   rightProd[i] = arr[i + 1] * rightProd[i + 1];
  // }
  // for (let i = 0; i < n; i++) {
  //   res[i] = leftProd[i] * rightProd[i];
  // }
  // return res

  let n = arr.length,
    res = [];

  res[0] = 1;

  for (let i = 1; i < n; i++) {
    res[i] = arr[i - 1] * res[i - 1];
  }
  console.log(res);
  let rightCount = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] = res[i] * rightCount;
    rightCount = rightCount * arr[i];
  }

  return res;
};

// console.log(productExceptSelf([1, 2, 3, 4]));

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
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//   ])
// );

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

// console.log(
//   diagonalSum([
//     [7, 9, 8, 6, 3],
//     [3, 9, 4, 5, 2],
//     [8, 1, 10, 4, 10],
//     [9, 5, 10, 9, 6],
//     [7, 2, 4, 10, 8],
//   ])
// );

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

// 74
var searchMatrix = function (matrix, target) {
  // let bottles = 15,
  //   exchange = 4,
  //   drank = bottles,
  //   remain = 0;
  // while (bottles >= exchange) {
  //   remain = bottles % exchange;
  //   bottles = Math.floor(bottles / exchange);
  //   drank += bottles;
  //   bottles += remain;
  // }
  // return drank;

  // console.log(sum);

  // let rows = matrix.length,
  //   cols = matrix[0].length,
  //   left = 0,
  //   right = rows * cols - 1;
  // while (left <= right) {
  //   let midIndex = Math.floor(left + (right - left) / 2);
  //   let midElement = matrix[Math.floor(midIndex / cols)][midIndex % cols]; // matrix[row][col]
  //   if (midElement === target) {
  //     return true;
  //   } else if (target < midElement) {
  //     right = midIndex - 1;
  //   } else {
  //     left = midIndex + 1;
  //   }
  // }
  // return false;

  let row = 0,
    col = matrix[0].length - 1;
  while (row < matrix.length) {
    if (matrix[row][col] === target) {
      return true;
    }
    if (matrix[row][col] < target) {
      row++;
    } else {
      col--;
      if (col < 0) {
        row++;
      }
    }
    // console.log({ row, col });
  }
  return false;
};

// console.log(
//   searchMatrix(
//     [
//       [1, 3, 5, 7],
//       [10, 11, 16, 18],
//       [23, 30, 34, 60],
//     ],
//     23
//   )
// );

// 240

var searchMatrix2 = function (matrix, target) {
  let row = 0,
    col = matrix[0].length - 1;
  while (row < matrix.length) {
    if (matrix[row][col] === target) {
      return true;
    }
    if (matrix[row][col] < target) {
      row++;
    } else {
      col--;
      if (col === 0) {
        row++;
      }
    }
    console.log({ row, col });
  }
  return false;

  // let row = 0,
  //   col = matrix[0].length - 1;
  // while (row < matrix.length && col >= 0) {
  //   if (matrix[row][col] === target) {
  //     return true;
  //   }
  //   if (matrix[row][col] < target) {
  //     row++;
  //   } else {
  //     col--;
  //   }
  // }
  // return false;
};

// console.log(
//   searchMatrix2(
//     [
//       [1, 4, 7, 11, 15],
//       [2, 5, 8, 12, 19],
//       [3, 6, 9, 16, 22],
//       [10, 13, 14, 17, 24],
//       [18, 21, 23, 26, 30],
//     ],
//     3
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

// 35
const searchInsert = (arr, t) => {
  // console.log(arr[0] > t);
  // if (arr[0] > t) return 0;
  // for (let i = 0; i < arr.length - 1; i++) {
  //   if (arr[i] >= t) {
  //     return i;
  //   }
  // }
  // return arr.length;

  let start = 0,
    end = arr.length - 1;
  if (arr[start] > t) return start;
  if (arr[end] < t) return arr.length;
  let a;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    // console.log(mid);
    if (arr[mid] === t) {
      return mid;
    } else if (arr[mid] > t) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
    // if (Math.abs(t - arr[mid]) > 0) a = mid;
  }
  return start;
};
// console.log(searchInsert([1, 3, 5, 6], 5));
// console.log(searchInsert([1, 3, 5, 6], 2));
// console.log(searchInsert([3, 4, 9, 10], 5));
// console.log(searchInsert([1, 3, 5, 6], 7));
// console.log(searchInsert([1, 3, 5, 6], 0));
// console.log(searchInsert([1], 1));
// console.log(searchInsert([1, 3, 5], 1));

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

// 66
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
  if (isNinePresent) digits.splice(0, 0, 1);
  return digits;
};

console.log(plusOne([1, 2, 3]));
console.log(plusOne([8, 9, 9]));
// console.log(plusOne([6, 1, 4, 5, 3, 9, 0, 1, 9, 5, 1, 8, 6, 7, 0, 5, 5, 4, 3]));

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

// console.log(
//   oddCells(2, 3, [
//     [0, 1],
//     [1, 1],
//   ])
// );

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

// console.log(
//   shiftGrid(
//     [
//       [1, 2, 3],
//       [4, 5, 6],
//       [7, 8, 9],
//     ],
//     4
//   )
// );

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

// 54
var spiralOrder = function (matrix) {
  // Sol 1-Modifying the original matrix
  // let res = [];
  // while (matrix.length > 0) {
  //   let top = [],
  //     bottom = [],
  //     right = [],
  //     left = [];
  //   top = matrix.shift();
  //   bottom = matrix.length > 0 ? matrix.pop().reverse() : [];
  //   console.log({ top, bottom });
  //   for (let i = 0; i < matrix.length; i++) {
  //     matrix[i].length > 0 ? right.push(matrix[i].pop()) : [];
  //     matrix[i].length > 0 ? left.push(matrix[i].shift()) : [];
  //     console.log(matrix.length);
  //   }
  //   res.push(...top, ...right, ...bottom, ...left.reverse());
  // }

  // return res;
  // Sol 2
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
// console.log(
//   spiralOrder([
//    [1, 2, 3, 4],
//    [5, 6, 7, 8],
//    [9, 10, 11, 12],
//   ])
// );

// 59
var generateSpiralMatrix = function (n) {
  let rowBegin = 0,
    rowEnd = n - 1,
    colBegin = 0,
    colEnd = n - 1,
    count = 1,
    mat = new Array(n);
  for (let i = 0; i < n; i++) {
    mat[i] = [];
  }

  while (rowBegin <= rowEnd && colBegin <= colEnd) {
    for (let i = colBegin; i <= colEnd; i++) {
      mat[colBegin][i] = count++;
    }
    rowBegin++;
    for (let i = rowBegin; i <= rowEnd; i++) {
      mat[i][colEnd] = count++;
    }
    colEnd--;
    if (rowBegin <= rowEnd) {
      for (let i = colEnd; i >= colBegin; i--) {
        mat[rowEnd][i] = count++;
      }
    }
    rowEnd--;
    if (colBegin <= colEnd) {
      for (let i = rowEnd; i >= rowBegin; i--) {
        mat[i][colBegin] = count++;
      }
    }
    colBegin++;
  }
};

// console.log(generateSpiralMatrix(3));

var sortArrayByParity = function (A) {
  let even = [],
    odd = [];
  even = A.filter((item, i) => item % 2 === 0);
  odd = A.filter((item, i) => item % 2 !== 0);
  return even.concat(odd);

  // Solution 2
  // let even = 0;
  // let odd = A.length - 1;
  // let result = [];
  // for (i in A) {
  //   if (A[i] % 2 === 0) {
  //     result[even] = A[i];
  //     even++;
  //   } else {
  //     result[odd] = A[i];
  //     odd--;
  //   }
  // }
  // return result;
};

// console.log(sortArrayByParity([1, 2, 4, 6]));

var kidsWithCandies = function (candies, extraCandies) {
  let max = Math.max(...candies);
  console.log(max);
  candies.forEach((c, i) => {
    candies[i] = c + extraCandies >= max ? true : false;
  });
  return candies;
};

// console.log(kidsWithCandies([2, 3, 5, 1, 3], 3));

var sortArrayByParityII = function (A) {
  let oddParity = A.length - 1,
    evenParity = 0,
    arr = [],
    parity = [];
  for (let i = 0; i < A.length; i++) {
    if (A[i] % 2 == 0) {
      arr[evenParity] = A[i];
      evenParity++;
    } else {
      arr[oddParity] = A[i];
      oddParity--;
    }
  }
  for (let i = 0; i < A.length / 2; i++) {
    parity.push(arr[i], arr[arr.length - (i + 1)]);
  }
};

// console.log(sortArrayByParityII([4, 2, 5, 7]));

// 1160
var countCharacters = function (words, chars) {
  let counter = 0;
  words.forEach((word) => {
    let contains = true;
    let str = chars;
    if (word.length <= chars.length) {
      for (let w of word) {
        contains = contains && str.includes(w);
        contains ? (str = str.replace(w, "")) : null;
      }
    } else {
      contains = false;
    }
    console.log({ word, contains });
    if (contains) {
      counter += word.length;
    }
  });

  return counter;
};

// console.log(
//   countCharacters(
//     [
//       "dyiclysmffuhibgfvapygkorkqllqlvokosagyelotobicwcmebnpznjbirzrzsrtzjxhsfpiwyfhzyonmuabtlwin",
//       "ndqeyhhcquplmznwslewjzuyfgklssvkqxmqjpwhrshycmvrb",
//       "ulrrbpspyudncdlbkxkrqpivfftrggemkpyjl",
//       "boygirdlggnh",
//       "xmqohbyqwagkjzpyawsydmdaattthmuvjbzwpyopyafphx",
//       "nulvimegcsiwvhwuiyednoxpugfeimnnyeoczuzxgxbqjvegcxeqnjbwnbvowastqhojepisusvsidhqmszbrnynkyop",
//       "hiefuovybkpgzygprmndrkyspoiyapdwkxebgsmodhzpx",
//       "juldqdzeskpffaoqcyyxiqqowsalqumddcufhouhrskozhlmobiwzxnhdkidr",
//       "lnnvsdcrvzfmrvurucrzlfyigcycffpiuoo",
//       "oxgaskztzroxuntiwlfyufddl",
//       "tfspedteabxatkaypitjfkhkkigdwdkctqbczcugripkgcyfezpuklfqfcsccboarbfbjfrkxp",
//       "qnagrpfzlyrouolqquytwnwnsqnmuzphne",
//       "eeilfdaookieawrrbvtnqfzcricvhpiv",
//       "sisvsjzyrbdsjcwwygdnxcjhzhsxhpceqz",
//       "yhouqhjevqxtecomahbwoptzlkyvjexhzcbccusbjjdgcfzlkoqwiwue",
//       "hwxxighzvceaplsycajkhynkhzkwkouszwaiuzqcleyflqrxgjsvlegvupzqijbornbfwpefhxekgpuvgiyeudhncv",
//       "cpwcjwgbcquirnsazumgjjcltitmeyfaudbnbqhflvecjsupjmgwfbjo",
//       "teyygdmmyadppuopvqdodaczob",
//       "qaeowuwqsqffvibrtxnjnzvzuuonrkwpysyxvkijemmpdmtnqxwekbpfzs",
//       "qqxpxpmemkldghbmbyxpkwgkaykaerhmwwjonrhcsubchs",
//     ],
//     "usdruypficfbpfbivlrhutcgvyjenlxzeovdyjtgvvfdjzcmikjraspdfp"
//   )
// );

// 766
var isToeplitzMatrix = function (matrix) {
  for (let i = 0; i < matrix.length - 1; i++) {
    for (let j = 0; j < matrix[i].length - 1; j++) {
      console.log({ i, j });
      if (matrix[i + 1][j + 1] !== matrix[i][j]) return false;
    }
  }
  return true;
};

// console.log(
//   isToeplitzMatrix([
//     [1, 2, 3, 4],
//     [5, 1, 2, 3],
//     [9, 5, 1, 2],
//   ])
// );
// console.log(
//   isToeplitzMatrix([
//     [36, 86, 7, 94, 71, 59, 10],
//     [19, 0, 86, 7, 94, 71, 59],
//   ])
// );

// 1652
var decrypt = function (code, k) {
  const res = new Array(code.length).fill(0);
  if (k > 0) {
    for (let i = 0; i < code.length; i++) {
      let count = 0,
        j = i + 1;
      while (count < k) {
        if (j === code.length) j = 0;
        res[i] += code[j];
        j++;
        count++;
      }
    }
  }
  if (k < 0) {
    for (let i = 0; i < code.length; i++) {
      let count = Math.abs(k),
        j = i - 1;
      while (count--) {
        if (j === -1) j = code.length - 1;
        res[i] += code[j];
        j--;
      }
    }
  }
  return res;
};

// console.log(decrypt([2, 4, 9, 3], -2));

// 1491
var average = function (salary) {
  const min = Math.min(...salary);
  const max = Math.max(...salary);

  const minIndex = salary.indexOf(min);
  salary.splice(minIndex, 1);
  const maxIndex = salary.indexOf(max);
  console.log({ minIndex, maxIndex });
  salary.splice(maxIndex, 1);
  console.log(salary);
  let total = 0;
  salary.forEach((s) => {
    total += s;
  });

  return total / salary.length;
};

// console.log(average([1000, 2000, 3000]));

// 896
var isMonotonic = function (A) {
  let increasing = true;
  let decreasing = true;

  for (let i = 0; i < A.length - 1; i++) {
    if (A[i] > A[i + 1]) decreasing = false;
    if (A[i] < A[i + 1]) increasing = false;
    if (!increasing && !decreasing) return false;
  }

  return true;
};

// console.log(isMonotonic([1, 1, 1, 3, 3, 2]));

// 118
var pascalTriangle = function (numRows) {
  let triangle = [];
  if (numRows <= 0) return triangle;
  triangle.push([1]);
  for (let i = 1; i < numRows; i++) {
    triangle[i] = [];
    triangle[i].push(1);
    for (let j = triangle.length - 2; j > 0; j--) {
      triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
    }
    triangle[i].push(1);
  }
  return triangle;
};
console.log(pascalTriangle(5));

// 119
var pascalTriangle2 = function (rowIndex) {
  let triangle = [],
    numRows = rowIndex + 1;
  if (numRows <= 0) return triangle;
  triangle.push([1]);
  for (let i = 1; i < numRows; i++) {
    triangle[i] = [];
    triangle[i].push(1);
    for (let j = triangle.length - 2; j > 0; j--) {
      triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
    }
    triangle[i].push(1);
  }
  return triangle[rowIndex];
};
// console.log(pascalTriangle2(3));

// 485
var findMaxConsecutiveOnes = function (nums) {
  let arr = [],
    max = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      arr.push(nums[i]);
      max = Math.max(max, arr.length);
    } else {
      arr = [];
    }
  }
  return max;
};

// console.log(findMaxConsecutiveOnes([1, 1, 1, 1, 1, 0, 1, 1, 1]));

var minTimeToVisitAllPoints = function (points) {
  let time = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const x = Math.abs(points[i][0] - points[i + 1][0]);
    const y = Math.abs(points[i][1] - points[i + 1][1]);
    console.log({ x, y });

    const max = Math.max(x, y);
    time += max;
  }
  return time;
};

// console.log(
//   minTimeToVisitAllPoints([
//     [1, 1],
//     [3, 4],
//     [-1, 0],
//   ])
// );

var threeConsecutiveOdds = function (arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 !== 0) {
      count++;
      if (count === 3) return true;
    } else {
      count = 0;
    }
  }
  return false;
};

// console.log(threeConsecutiveOdds([2, 6, 4, 1]));

// 448
var findDisappearedNumbers = function (nums) {
  // if (nums.length === 0) return [];
  // const sorted = [...nums.sort()],
  //   arr = [];
  // // console.log(sorted);
  // if (sorted[0] !== 1) {
  //   arr.push(1);
  // }
  // for (let i = 0; i < nums.length - 1; i++) {
  //   if (!(sorted[i + 1] === sorted[i] + 1 || sorted[i + 1] === sorted[i])) {
  //     console.log(1)
  //     sorted.splice(i + 1, 0, sorted[i] + 1);
  //     arr.push(sorted[i] + 1);
  //   }
  // }
  // console.log(arr);
  let arr = new Array(nums.length);
  console.log(arr);
  let outputArr = [];
  for (let i = 0; i < nums.length; i++) {
    arr[nums[i] - 1] = 0;
  }
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == undefined) {
      outputArr.push(i + 1);
    }
  }
  return outputArr;
};

// console.log(findDisappearedNumbers([2, 2]));
// console.log(findDisappearedNumbers([1, 1]));

// 1337
var kWeakestRows = function (mat, k) {
  let a = [],
    m = new Map();
  for (let i = 0; i < mat.length; i++) {
    let count = 0;
    for (let j = 0; j < mat[i].length; j++) {
      if (mat[i][j] === 1) {
        count++;
      }
    }
    m.set(i, count);
  }
  // console.log(m);
  let sortMap = new Map([...m.entries()].sort((a, b) => a[1] - b[1]));
  console.log({ m, sortMap });

  sortMap.forEach((_, key) => {
    a.push(key);
  });

  return a.slice(0, k);
};

// console.log(
//   kWeakestRows(
//     [
//       [1, 0, 0, 0],
//       [1, 1, 1, 1],
//       [1, 0, 0, 0],
//       [1, 0, 0, 0],
//     ],
//     2
//   )
// );

const minStartValue = (nums) => {
  for (let i = 1; i < nums.length; i++) {
    nums[i] = nums[i] + nums[i - 1];
  }

  return Math.max(-Math.min(...nums) + 1, 1);
};

// console.log(minStartValue([-3, 2, -3, 4, 2]));

// 1619
var trimMean = function (arr) {
  // console.log(0.05 * arr.length);
  var take = arr.length / 20;
  const sort = arr.sort((a, b) => a - b);
  for (let i = 0; i < take; i++) {
    // removing smallest
    arr.shift();
    // removing largest
    arr.pop();
  }
  let count = 0;
  sort.forEach((it) => {
    count += it;
  });
  return (count = count / sort.length);
};

// console.log(trimMean([6, 0, 7, 0, 7, 4]));

// 1582
var numSpl = function (mat) {
  const rows = mat.length;
  const cols = mat[0].length;
  const rowArr = new Array(rows).fill(0);
  const colArr = new Array(cols).fill(0);
  const a = new Array();
  // console.log({ rowArr, colArr });
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (mat[i][j] === 1) {
        a.push([i, j]);
        rowArr[i]++;
        colArr[j]++;
      }
    }
  }
  console.table({ a, rowArr, colArr });

  let count = 0;
  for (const [x, y] of a) {
    console.log({ x, y });
    if (rowArr[x] === 1 && colArr[y] === 1) count++;
  }
  return count;
};

// console.log(
//   numSpl([
//     [0, 0, 0, 0, 0],
//     [1, 0, 0, 0, 0],
//     [0, 1, 0, 0, 0],
//     [0, 0, 1, 0, 0],
//     [0, 0, 0, 1, 1],
//   ])
// );

var isAnagram = function (s, t) {
  console.log(s.split("").sort());
  return s.split("").sort().join("") === t.split("").sort().join("");
};

// console.log(isAnagram("anagram", "nagaram"));

var shortestToChar = function (s, c) {
  let a = [];
  b = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) {
      a.push(i);
    }
  }
  for (let i = 0; i < s.length; i++) {
    b[i] = Number.POSITIVE_INFINITY;
    for (let j = 0; j < a.length; j++) {
      b[i] = Math.min(Math.abs(i - a[j]), b[i]);
    }
  }
  return b;
};
// console.log(shortestToChar("loveleetcode", "e"));

var numberOfSteps = function (num) {
  let count = 0;
  while (num > 0) {
    if (num % 2 === 0) {
      num = num / 2;
    } else {
      num -= 1;
    }
    count++;
  }
  return count;
};

// console.log(numberOfSteps(8));

var romanToInt = function (s) {
  const a = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  // console.log(object)
  s = s.split("").reverse();
  console.log(s);
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    console.log(a[s[i]]);
    if (i !== 0 && a[s[i - 1]] > a[s[i]]) {
      count = Math.abs(a[s[i]] - count);
    } else {
      count += a[s[i]];
    }
    console.log("count", count);
  }
  return count;
};

// console.log(romanToInt("MCMXCIV"));

// 413
var numberOfArithmeticSlices = function (A) {
  let count = 0;

  for (let i = 0; i < A.length - 2; i++) {
    for (let j = i + 2; j < A.length; j++) {
      const diffA = A[j - 1] - A[j - 2];
      const diffB = A[j] - A[j - 1];
      if (diffA === diffB) {
        count++;
      } else {
        break;
      }
    }
  }

  return count;
};

// console.log(numberOfArithmeticSlices([1, 2, 3, 8, 9, 10]));

var findLongestWord = function (chars, words) {
  let a = "";
  words.forEach((word) => {
    let pivot = -1;
    if (word.length <= chars.length) {
      for (let i = 0; i < word.length; i++) {
        pivot = chars.indexOf(word[i], pivot + 1);
        if (pivot == -1) break;
      }
    }
    if (pivot > -1) {
      if (a.length < word.length || (a.length === word.length && word < a)) {
        a = word;
      }
    }
  });
  return a;
};

// console.log(
//   findLongestWord("aewfafwafjlwajflwajflwafj", [
//     "apple",
//     "ewaf",
//     "awefawfwaf",
//     "awef",
//     "awefe",
//     "ewafeffewafewf",
//   ])
// );

// 728
var selfDividingNumbers = function (left, right) {
  let a = [];
  for (let i = left; i <= right; i++) {
    if (i.toString().search("0") === -1) {
      let self = true;
      for (let j = 0; j < i.toString().length; j++) {
        self = self && i % i.toString()[j] === 0;
      }
      if (self) {
        a.push(i);
      }
    }
  }
  return a;
};

// console.log(selfDividingNumbers(1, 22));

// 1704
var halvesAreAlike = function (s) {
  let arr = s.split("");
  let a = arr.splice(0, s.length / 2);
  let b = arr;

  let aVowels = 0,
    bVowels = 0,
    vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
  a.forEach((l) => {
    if (vowels.includes(l)) {
      aVowels++;
    }
  });
  b.forEach((l) => {
    if (vowels.includes(l)) {
      bVowels++;
    }
  });
  return aVowels === bVowels;

  // console.log({ a, b });
};

// console.log(halvesAreAlike("textbook"));

// 961
var repeatedNTimes = function (A) {
  let m = new Map();
  for (let i = 0; i < A.length; i++) {
    m.set(A[i], m.get(A[i]) + 1 || 1);
    if (m.get(A[i]) > 1) {
      return A[i];
    }
  }
};

// console.log(repeatedNTimes([2, 1, 2, 5, 3, 2]));

// 1486
var xorOperation = function (n, start) {
  // let arr = Array.from({ length: n });
  let res;
  for (let i = 0; i < n; i++) {
    res ^= start + 2 * i;
    // res ^= a[i];
  }
  return res;
};

// console.log(xorOperation(5, 0));

// 1051
var heightChecker = function (heights) {
  const sort = [...heights].sort((a, b) => a - b);
  let count = 0;
  for (let i = 0; i < heights.length; i++) {
    if (heights[i] !== sort[i]) {
      count++;
    }
  }
  return count;
};

// console.log(heightChecker([10,6,6,10,10,9,8,8,3,3,8,2,1,5,1,9,5,2,7,4,7,7]));

// 268
var missingNumber = function (nums) {
  if (!nums.includes(0)) return 0;
  const sort = nums.sort((a, b) => a - b);
  for (let i = 0; i < sort.length; i++) {
    if (sort[i + 1] !== sort[i] + 1) {
      return sort[i] + 1;
    }
  }
};

// console.log(missingNumber([1]));

// 1646
var getMaximumGenerated = function (n) {
  let arr = [];
  for (let i = 0; i <= n; i++) {
    if (i == 0 || i == 1) {
      arr[i] = i;
    } else if (i % 2 == 0) {
      arr[i] = arr[Math.floor(i / 2)];
    } else {
      arr[i] = arr[Math.floor((i - 1) / 2)] + arr[Math.floor((i + 1) / 2)];
    }
  }
  return Math.max(...arr);
};

// console.log(getMaximumGenerated(7));

// 1089
var duplicateZeros = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      arr.splice(i, 0, 0);
      i++;
      arr.pop();
    }
  }

  console.log(arr);
};

// console.log(duplicateZeros([1, 0, 2, 3, 0, 4, 5, 0]));

// 724
var pivotIndex = function (nums) {
  let lSum = nums.slice();
  let rSum = nums.slice();
  for (let i = 1; i < lSum.length; i++) lSum[i] += lSum[i - 1];
  for (let i = rSum.length - 2; i >= 0; i--) rSum[i] += rSum[i + 1];
  for (let i = 0; i < lSum.length; i++) {
    if (lSum[i] === rSum[i]) return i;
  }
  return -1;
};

console.log(pivotIndex([2, 1, -1]));

// 989
var addToArrayForm = function (A, K) {
  return (BigInt(A.join("")) + BigInt(K)).toString().split("");
};

// console.log(
//   addToArrayForm(
//     [1, 2, 6, 3, 0, 7, 1, 7, 1, 9, 7, 5, 6, 6, 4, 4, 0, 0, 6, 3],
//     516
//   )
// );

// 1346
var checkIfExist = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    const c = arr[i] * 2;
    const b = arr.findIndex((a) => a === c);
    if (b >= 0 && i !== b) return true;
  }
  return false;
};

// console.log(checkIfExist([-10, 12, -20, -8, 15]));
// console.log(checkIfExist([-2, 0, 10, -19, 4, 6, -8]));
// console.log(checkIfExist([0, 0]));

// 219
var containsNearbyDuplicate = function (nums, k) {
  // Solution 1(slow)
  // let left = 0;
  // for (let i = 1; i < nums.length; i++) {
  //   let a = i;
  //   while (a - left <= k) {
  //     if (nums[left] === nums[a]) {
  //       return true;
  //     }
  //     a++;
  //   }
  //   left++;
  // }
  // return false;
  const wnd = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (wnd.has(nums[i])) return true;
    wnd.add(nums[i]);
    if (wnd.size > k) wnd.delete(nums[i - k]);
  }
  return false;
};

// console.log(containsNearbyDuplicate([1, 0, 1, 1], 1));
// console.log(containsNearbyDuplicate([1, 2, 1], 0));
// console.log(containsNearbyDuplicate([1, 2, 3, 1], 3));
// console.log(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2));

// 1329
var diagonalSort = function (mat) {
  let rows = mat.length - 1,
    cols = mat[0].length;

  const sort = (i, j) => {
    i++;
    j++;
    while (i <= rows && j <= cols) {
      while (i > 0 && j > 0 && mat[i][j] < mat[i - 1][j - 1]) {
        [mat[i][j], mat[i - 1][j - 1]] = [mat[i - 1][j - 1], mat[i][j]];
        i--;
        j--;
      }
      i++;
      j++;
    }
  };

  // traverse the rows
  for (let i = 0; i <= rows; i++) {
    sort(i, 0);
  }
  // traverse the cols
  for (let i = 1; i <= cols; i++) {
    sort(0, i);
  }
  return mat;
};

console.log(
  diagonalSort([
    [3, 3, 1, 1],
    [2, 2, 1, 2],
    [1, 1, 1, 2],
  ])
);

// console.log(
//   diagonalSort([
//     [11, 25, 66, 1, 69, 7],
//     [23, 55, 17, 45, 15, 52],
//     [75, 31, 36, 44, 58, 8],
//     [22, 27, 33, 25, 68, 4],
//     [84, 28, 14, 11, 5, 50],
//   ])
// );
// [
//   [5, 17, 4, 1, 52, 7],
//   [11, 11, 25, 45, 8, 69],
//   [14, 23, 25, 44, 58, 15],
//   [22, 27, 31, 36, 50, 66],
//   [84, 28, 75, 33, 55, 68],
// ];

// 1287
var findSpecialInteger = function (arr) {
  let m = new Map();
  for (let i = 0; i < arr.length; i++) {
    m.set(arr[i], m.get(arr[i]) + 1 || 1);
  }
  console.log(m);
  let a;
  m.forEach((value, key) => {
    if (value > arr.length / 4) {
      return (a = key);
    }
  });
  return a;
};
// console.log(findSpecialInteger([5668, 5668, 5668, 5668, 22011]));

// 169
var majorityElement = function (nums) {
  let m = new Map();
  for (let i = 0; i < nums.length; i++) {
    m.set(nums[i], m.get(nums[i]) + 1 || 1);
  }
  let a;
  m.forEach((value, key) => {
    if (value > Math.floor(nums.length / 2)) {
      a = key;
    }
  });
  return a;
};

// console.log(majorityElement([2, 2, 1, 1, 1, 2, 2]));

// 1640
var canFormArray = function (arr, pieces) {
  for (let i = 0; i < pieces.length; i++) {
    let ind = -1;
    for (let j = 0; j < pieces[i].length; j++) {
      if (j == 0) {
        ind = arr.indexOf(pieces[i][j]);
      }
      if (ind !== -1) {
        if (j >= 1) {
          ind = ind + 1;
          if (ind !== arr.indexOf(pieces[i][j])) return false;
        }
      } else {
        return false;
      }
    }
  }
  return true;
};

// console.log(canFormArray([91, 4, 64, 78], [[78], [4, 64], [91]]));
// console.log(canFormArray([49, 18, 16], [[16, 18, 49]]));
// console.log(canFormArray([37, 69, 3, 74, 46], [[37, 69, 3, 74, 46]]));
// console.log(canFormArray([12], [[1]]));
// console.log(
//   canFormArray(
//     [12, 21, 11, 22],
//     [
//       [12, 21],
//       [1, 2],
//     ]
//   )
// );
// console.log(
//   canFormArray(
//     [91, 2, 4, 64, 5, 78, 12, 9],
//     [
//       [78, 12, 3],
//       [4, 64, 5],
//       [91, 2],
//     ]
//   )
// );

// 1758
var minOperations = function (s) {
  // let a = s[0],
  //   count = 0;
  // for (let i = 1; i < s.length; i++) {
  //   if (
  //     a === "0" &&
  //     ((i % 2 !== 0 && s[i] !== "1") || (i % 2 === 0 && s[i] !== "0"))
  //   ) {
  //     count++;
  //   }
  //   if (
  //     a === "1" &&
  //     ((i % 2 !== 0 && s[i] !== "0") || (i % 2 === 0 && s[i] !== "1"))
  //   ) {
  //     count++;
  //   }
  // }
  // return count;
  let chars = ["1", "0"];
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    console.log({ c: chars[i % 2], s: s[i] });
    if (chars[i % 2] === s[i]) {
      count++;
    }
  }
  console.log(count);
  return Math.min(count, s.length - count);
};

// console.log(minOperations("0100"));
// console.log(minOperations("10"));
// console.log(minOperations("1111"));
// console.log(minOperations("110010"));
// console.log(minOperations("10010100"));

// 747
var dominantIndex = function (nums) {
  let max = Math.max(...nums);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== max && nums[i] * 2 > max) {
      return -1;
    }
  }
  return nums.indexOf(max);
};
// console.log(dominantIndex([1, 2, 3, 4]));
// console.log(dominantIndex([3, 6, 1, 0]));

// 414
var thirdMax = function (nums) {
  const unique = [...new Set(nums)];
  if (unique.length >= 3) {
    return unique.sort((a, b) => b - a)[2];
  } else {
    return Math.max(...unique);
  }
};

// console.log(thirdMax([1, 2]));

// 1768
var mergeAlternately = function (word1, word2) {
  let a = "",
    max = Math.max(word1.length, word2.length);
  for (let i = 0; i < max; i++) {
    a += word1[i] ? word1[i] + (word2[i] ? word2[i] : "") : word2[i];
  }
  console.log(a);
};

// console.log(mergeAlternately("ab", "pqrs"));
// console.log(mergeAlternately("abcd", "pq"));

// 804
var uniqueMorseRepresentations = function (words) {
  // const morse=[".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."]
  let a = [];
  words.forEach((word, index) => {
    word.split("").forEach((letter) => {
      a[index] = a[index]
        ? a[index] + morse[letter.charCodeAt() - 97]
        : morse[letter.charCodeAt() - 97];
    });
  });
  return [...new Set(a)].length;
};

// console.log(uniqueMorseRepresentations(["gin", "zen", "gig", "msg"]));

// 1309
var freqAlphabets = function (s) {
  const alphabets = "abcdefghijklmnopqrstuvwxyz";
  let resArr = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i + 2] === "#") {
      resArr.push(s[i] + s[i + 1]);
      i += 2;
    } else {
      resArr.push(s[i]);
    }
  }
  return resArr.map((num) => alphabets[num - 1]).join("");
};

// console.log(freqAlphabets("10#11#12"));

// 1374
var generateTheString = function (n) {
  return n % 2 === 0 ? "a".repeat(n - 1) + "b" : "a".repeat(n);
};

// console.log(generateTheString(100));

// 557
var reverseWords = function (s) {
  let arr = s.split(" ");
  let rev = [];
  arr.forEach((a) => rev.push([...a].reverse().join("")));
  return rev.join(" ");
};

// console.log(reverseWords("ab cd"));

// 1455
var isPrefixOfWord = function (sentence, searchWord) {
  const arr = sentence.split(" ");
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    if (arr[i].startsWith(searchWord)) {
      return i + 1;
    }
  }
  return -1;
};

// console.log(isPrefixOfWord("this problem is an easy problem", "pro"));
// console.log(isPrefixOfWord("hellohello burger", "bur"));

// 1332
var removePalindromeSub = function (s) {
  let txt = s.split("").reverse().join("");
  if (s === "") return 0;
  if (s === txt) return 1;
  else return 2;
};

// console.log(removePalindromeSub("baabbababbba"));

// 1408
var stringMatching = function (words) {
  let a = [];
  for (let i = 0; i < words.length; i++) {
    words.forEach((w) => {
      if (w.search(words[i]) !== -1 && w !== words[i]) {
        a.push(words[i]);
      }
    });
  }
  return [...new Set(a)];
};

// console.log(stringMatching(["mass", "as", "hero", "superhero"]));
// console.log(stringMatching(["leetcode", "et", "code"]));
// console.log(stringMatching(["leetcoder", "leetcode", "od", "hamlet", "am"]));

// 125
var isPalindrome = function (s) {
  let a = [],
    b = s.split("");
  for (let i = 0; i < b.length; i++) {
    let charCode = b[i].charCodeAt();
    if (
      // numerals
      (48 <= charCode && charCode <= 57) ||
      // capital letters
      (65 <= charCode && charCode <= 90) ||
      // small letters
      (97 <= charCode && charCode <= 122)
    ) {
      a.push(b[i]);
    }
  }
  return [...a].reverse().join("").toLowerCase() === a.join("").toLowerCase();
};
// console.log(isPalindrome("0P"));
// console.log(isPalindrome("ab_a"));

// 1446
var maxPower = function (s) {
  let max = 1,
    count = 1;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === s[i + 1]) {
      count++;
      max = Math.max(count, max);
      // console.log(max);
    } else {
      count = 1;
    }
  }
  console.log(max);
};

// console.log(maxPower("abbcccddddeeeeedcba"));
// console.log(maxPower("triplepillooooow"));
// console.log(maxPower("hooraaaaaaaaaaay"));
// console.log(maxPower("leetcode"));
// console.log(maxPower("tourist"));

// 1507
var reformatDate = function (date) {
  const arr = date.split(" "),
    months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  const getDate = (date) => {
    let a = "";
    for (let i = 0; i < date.length; i++) {
      if (48 <= date[i].charCodeAt() && date[i].charCodeAt() <= 57) {
        a += date[i];
        console.log(a);
        console.log(a.length);
      }
    }
    if (a.length === 1) a = "0" + a;
    return a;
  };
  const month = (months.indexOf(arr[1]) + 1).toString();
  return (
    arr[2] +
    "-" +
    (month.length === 1 ? "0" + month : month) +
    "-" +
    getDate(arr[0])
  );
};

// console.log(reformatDate("20th Oct 2052"));
// console.log(reformatDate("6th Jun 1933"));
// console.log(reformatDate("26th May 1960"));

// 917
var reverseOnlyLetters = function (S) {
  let a = [],
    b = S.split(""),
    c = new Map();
  for (let i = 0; i < b.length; i++) {
    let charCode = b[i].charCodeAt();
    if (
      // capital letters
      (65 <= charCode && charCode <= 90) ||
      // small letters
      (97 <= charCode && charCode <= 122)
    ) {
      a.push(b[i]);
    } else {
      c.set(i, b[i]);
    }
  }
  console.log({ a, c });
  const reverse = a.reverse();
  console.log(reverse);
  for (let i = 0; i < reverse.length + 1; i++) {
    if (c.get(i)) {
      reverse.splice(i, 0, c.get(i));
      // i-=1
    }
  }
  console.log(reverse.join(""));
};

// console.log(reverseOnlyLetters("Test1ng-Leet=code-Q!!"));
// console.log(reverseOnlyLetters("a-bC-dEf-ghIj"));

// 1422
var maxScore = function (s) {
  let max = 0;
  for (let i = 0; i < s.length - 1; i++) {
    let a = [],
      b = [],
      aCount = 0,
      bCount = 0;
    a.push(s.substring(0, i + 1));
    b.push(s.substring(i + 1));
    a[0].split("").forEach((num) => {
      if (num === "0") {
        aCount++;
      }
    });
    b[0].split("").forEach((num) => {
      if (num === "1") {
        aCount++;
      }
    });
    max = Math.max(aCount + bCount, max);
  }
  return max;
};
// console.log(maxScore("1111"));

// 387
var firstUniqChar = function (s) {
  let map = new Map(),
    a = [];
  for (let i = 0; i < s.length; i++) {
    map.set(s[i], map.get(s[i]) + 1 || 1);
  }
  map.forEach((value, key) => {
    if (value == 1) {
      a.push(key);
    }
  });
  return s.split("").indexOf(a[0]);
};

// console.log(firstUniqChar("loveleetcode"));

// 345
var reverseVowels = function (s) {
  let b = [],
    v = ["a", "e", "i", "o", "u"];
  s.split("");
  for (let i = 0; i < s.length; i++) {
    if (v.includes(s[i].toLowerCase())) {
      b.push(s[i]);
    }
  }
  for (let i = 0; i < s.length; i++) {
    if (v.includes(s[i].toLowerCase())) {
      s[i] = b.pop();
    }
  }
  return s;
};

// console.log(reverseVowels("aeetcode"));

// 925
var isLongPressedName = function (name, typed) {
  let nameMap = new Map(),
    typedMap = new Map();

  for (let i = 0; i < name.length; i++) {
    nameMap.set(name[i], nameMap.get(name[i]) + 1 || 1);
  }

  for (let i = 0; i < typed.length; i++) {
    typedMap.set(typed[i], typedMap.get(typed[i]) + 1 || 1);
  }
  console.log({ typedMap, nameMap });
  if (typedMap.size < nameMap.size) return false;
  for (let i = 0; i < name.length; i++) {
    if (
      (typed.length !== name.length &&
        (!typedMap.has(name[i]) ||
          typedMap.get(name[i]) < nameMap.get(name[i]) ||
          name[name.length - 1] !== typed[typed.length - 1] ||
          typed[typed.length - 2] !== name[name.length - 1])) ||
      (typed.length === name.length && name[i] !== typed[i])
    ) {
      return false;
    }
  }
  return true;
  // console.log({ nameMap, typedMap });

  let arr1 = groupify(name);
  let arr2 = groupify(typed);
  if (arr1.length !== arr2.length) return false;
  for (i = 0; i < arr1.length; i++) {
    if (arr1[i][1] > arr2[i][1]) return false;
  }
  return true;
};

var groupify = function (word) {
  let str = "",
    arr = [];
  for (i = 0; i < word.length; i++) {
    str += word[i];
    if (word[i] !== word[i + 1]) {
      arr.push([str, str.length]);
      str = "";
    }
  }
  return arr;
};

// console.log(isLongPressedName("alex", "aaleex"));
// console.log(isLongPressedName("laiden", "laiden"));
// console.log(isLongPressedName("leelee", "lleeelee"));
// console.log(isLongPressedName("saeed", "ssaaedd"));
// console.log(isLongPressedName("xnhtq", "xhhttqq"));
// console.log(isLongPressedName("a", "b"));
// console.log(isLongPressedName("rick", "kric"));
// console.log(isLongPressedName("alex", "aaleexa"));
// console.log(isLongPressedName("axlex", "aaxleexexxx"));

// 520
var detectCapitalUse = function (word) {
  if (
    word === word.toUpperCase() ||
    word === word.toLowerCase() ||
    (word[0] === word[0].toUpperCase() &&
      word.substring(1) === word.substring(1).toLowerCase())
  ) {
    return true;
  }
  return false;
};

// console.log(detectCapitalUse("USA"));
// console.log(detectCapitalUse("usa"));
// console.log(detectCapitalUse("Google"));
// console.log(detectCapitalUse("GooglE"));

// 819
var mostCommonWord = function (paragraph, banned) {
  let paraArr = paragraph.split(/\W/g),
    max = 0,
    maxWord = "",
    map = new Map();
  console.log(paraArr);
  for (let i = 0; i < paraArr.length; i++) {
    if (paraArr[i] !== "") {
      let charCode = paraArr[i].toLowerCase().charCodeAt();
      if (97 <= charCode && charCode <= 122) {
        map.set(
          paraArr[i].toLowerCase(),
          map.get(paraArr[i].toLowerCase()) + 1 || 1
        );
      }
    }
  }
  console.log(map);
  map.forEach((value, key) => {
    if (!banned.includes(key)) {
      let currMax = Math.max(max, value);
      if (currMax > max) {
        max = currMax;
        maxWord = key;
      }
    }
  });
  console.log(maxWord);
};

// console.log(
//   mostCommonWord("Bob hit a ball, the hit BALL hit, hit, after it was hit.", [
//     "hit",
//   ])
// );
// console.log(mostCommonWord("a, a, a, a, b,b,b,c, c", ["a"]));

// 58
var lengthOfLastWord = function (s) {
  let a = s.trim();
  // console.log(arr)
  if (a === "") return 0;
  console.log(a.split(" ").pop().length);
};
// console.log(lengthOfLastWord("Hello World"))
// console.log(lengthOfLastWord(" "))

// 239
var maxSlidingWindow = function (nums, k) {
  let arr = [],
    max = [];
  for (let i = 0; i < nums.length; i++) {
    arr.push(nums[i]);
    if (arr.length === k) {
      max.push(Math.max(...arr));
      arr.splice(0, 1);
    }
  }
  return max;
};

// console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
// console.log(maxSlidingWindow([1], 1));
// console.log(maxSlidingWindow([1, -1], 1));
// console.log(maxSlidingWindow([9, 11], 2));
// console.log(maxSlidingWindow([4, -2], 2));

// 1773
var countMatches = function (items, ruleKey, ruleValue) {
  const a = ["type", "color", "name"],
    ruleIndex = a.indexOf(ruleKey);
  let count = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i][ruleIndex] === ruleValue) {
      count++;
    }
  }
  return count;
};
// console.log(
//   countMatches(
//     [
//       ["phone", "blue", "pixel"],
//       ["computer", "silver", "lenovo"],
//       ["phone", "gold", "iphone"],
//     ],
//     "type",
//     "phone"
//   )
// );

// 34
var searchRange = function (nums, target) {
  // Sol 1

  // let s = [-1, -1];
  // s[0] = nums.indexOf(target);
  // s[1] = nums.lastIndexOf(target);
  // return s;

  // Sol 2
  // let s = [-1, -1];
  // for (let i = 0; i < nums.length; i++) {
  //   if (nums[i] === target) {
  //     s[0] = i;
  //     break;
  //   }
  // }
  // for (let i = nums.length - 1; i >= 0; i--) {
  //   if (nums[i] === target) {
  //     s[1] = i;
  //     break;
  //   }
  // }

  // Sol 3
  let s = [];
  const findfirstIndex = (nums, target) => {
    let start = 0,
      end = nums.length - 1,
      index = -1;
    // console.log(nums[midIndex]);
    while (start <= end) {
      let midIndex = Math.floor(start + (end - start) / 2);
      if (nums[midIndex] >= target) {
        end = midIndex - 1;
      } else {
        start = midIndex + 1;
      }
      if (nums[midIndex] === target) {
        index = midIndex;
      }
    }
    return index;
  };
  const findlastIndex = (nums, target) => {
    let start = 0,
      end = nums.length - 1,
      index = -1;
    while (start <= end) {
      let midIndex = Math.floor(start + (end - start) / 2);
      if (nums[midIndex] <= target) {
        start = midIndex + 1;
      } else {
        end = midIndex - 1;
      }
      if (nums[midIndex] === target) {
        index = midIndex;
      }
    }
    return index;
  };

  s[0] = findfirstIndex(nums, target);
  s[1] = findlastIndex(nums, target);

  // console.log(s);
};

// console.log(searchRange([5, 7, 7, 8, 8, 10], 8));

// 120
var minimumTotal = function (triangle) {
  let count = 0;
  for (let i = 0; i < triangle.length; i++) {
    count += Math.min(...triangle[i]);
    console.log(count);
  }
  console.log(count);
};

// console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]));
// console.log(minimumTotal([[-10]]));
// console.log(minimumTotal(
//   [[-1],
//   [2,3],
//   [1,-1,-3]]));

// 643
var findMaxAverage = function (nums, k) {
  let max = Number.NEGATIVE_INFINITY,
    count = 0;
  for (let i = 0; i < nums.length; i++) {
    count += nums[i];
    if (i + 1 >= k) {
      let currAvg = count / k;
      let currMax = Math.max(currAvg, max);
      if (currMax > max) {
        max = currMax;
      }
      count -= nums[i + 1 - k];
    }
  }
  return max;
};

// console.log(findMaxAverage([1, 12, -5, -6, 50, 3], 4));
// console.log(findMaxAverage([5], 1));

// 442
var findDuplicates = function (nums) {
  // let set = new Set(),
  //   arr = [];
  // for (let i = 0; i < nums.length; i++) {
  //   if (set.has(nums[i])) {
  //     arr.push(nums[i]);
  //   }
  //   set.add(nums[i]);
  // }
  // return arr;

  let res = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[Math.abs(nums[i]) - 1] < 0) {
      res.push(Math.abs(nums[i]));
    }
    // if first duplicate
    // if (res.length > 0) {
    //   break;
    // }
    nums[Math.abs(nums[i]) - 1] = -1 * nums[Math.abs(nums[i]) - 1];
  }
  console.log(res);
  // console.log(nums);
};

// console.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1, 4]));
// console.log(findDuplicates([1]));

// 75
var sortColors = function (nums) {
  const k = [...new Set([1, 8, 6, 2, 5, 4, 8, 3, 7].sort((a, b) => a - b))];
  console.log(k);
  let a = nums.length,
    arr = [];
  for (let i = 0; i < a; i++) {
    // console.log(i);
    if (nums[i] === 2) {
      console.log(2);
      nums.push(nums[i]);
    } else if (nums[i] === 0) {
      console.log(0);
      nums.splice(0, 0, 0);
    } else {
      nums.splice(nums[i], 0, nums[i]);
    }
    nums.splice(nums.indexOf(nums[i]), 1);
  }
  // console.log(nums[nums.length-1]);
  // console.log(arr);
  console.log(nums);
};

// console.log(sortColors([2, 0, 2, 1, 1, 0]));
// console.log(sortColors([0]));
// console.log(sortColors([1]));

// 128

var longestConsecutive = function (nums) {
  let m = new Set(nums),
    maxLen = 0;
  // nums.forEach((num) => {
  //   m.add(num);
  // });
  for (let i = 0; i < nums.length; i++) {
    let currLen = 1,
      currNum = nums[i];
    if (!m.has(nums[i] - 1)) {
      while (m.has(currNum + 1)) {
        currLen += 1;
        currNum += 1;
      }
    }
    maxLen = Math.max(currLen, maxLen);
  }
  console.log(maxLen);
};

console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));

// 1
var twoSum = function (nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    } else {
      map.set(nums[i], i);
    }
  }
  return [];
};

// console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([2, 3, 4], 6));

// 15
const threeSum = (arr) => {
  arr.sort((a, b) => a - b);
  let res = [];
  for (let i = 0; i < arr.length - 2; i++) {
    if (i == 0 || (i > 0 && arr[i] !== arr[i - 1])) {
      let start = i + 1,
        end = arr.length - 1,
        sum = 0 - arr[i];
      while (start < end) {
        if (arr[start] + arr[end] === sum) {
          res.push([arr[i], arr[start], arr[end]]);
          while (arr[start] === arr[start + 1]) start++;
          while (arr[end] === arr[end - 1]) end--;
          start++;
          end--;
        } else if (arr[start] + arr[end] < sum) {
          start++;
        } else {
          end--;
        }
      }
    }
  }
  return res;
};
// console.log(threeSum([-1, 0, 1, 2, -1, -4]));
// console.log(threeSum([-2, 0, 0, 0, 2, 2, 2]));

// 16
var threeSumClosest = function (nums, target) {
  let minDiff = Number.MAX_VALUE,
    res = 0;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] === nums[i - 1]) continue; //avoid duplicate
    let start = i + 1,
      end = nums.length - 1;
    while (start < end) {
      const sum = nums[i] + nums[start] + nums[end];
      if (sum === target) return sum;
      if (sum > target) {
        end--;
      } else if (sum < target) {
        start++;
      }
      let currDiff = Math.abs(target - sum);
      if (currDiff < minDiff) {
        minDiff = currDiff;
        res = sum;
      }
    }
  }
  return res;
};

// console.log(threeSumClosest([-1, 2, 1, -4], 1));

// 5
var longestPalindrome = function (s) {
  const expandAroundCenter = (s, left, right) => {
    let L = left,
      R = right;
    console.log({ s, left, right });
    console.log(s.charAt(L));
    console.log(s.charAt(R));
    while (L >= 0 && R < s.length && s.charAt(L) == s.charAt(R)) {
      L--;
      R++;
    }
    return R - 1 - (L - 1) + 1;
  };

  if (s == null || s.length < 1) return "";
  let start = 0,
    end = 0;
  for (let i = 0; i < s.length; i++) {
    let len1 = expandAroundCenter(s, i, i);
    let len2 = expandAroundCenter(s, i, i + 1);
    console.log({ len1, len2 });
    let len = Math.max(len1, len2);
    if (len > end - start) {
      start = i - (len - 1) / 2;
      end = i + len / 2;
    }
  }
  return s.substring(start, end + 1);
};

// console.log(longestPalindrome("aba"));

var findTheDistanceValue = function (arr1, arr2, d) {
  // let ans = arr1.length;
  // console.log(ans);
  // for (let i = 0; i < arr1.length; i++) {
  //   for (let j = 0; j < arr2.length; j++) {
  //     if (Math.abs(arr1[i] - arr2[j]) <= d) {
  //       console.log(i,j)
  //       console.log(arr1[i],arr2[i])
  //       ans--;
  //       break;
  //     }
  //   }
  // }
  // return ans;

  let res = 0;
  for (let x of arr1) {
    let bool = true;
    for (let y of arr2) {
      if (Math.abs(x - y) <= d) {
        console.log(x, y);
        bool = false;
        break;
      }
    }
    if (bool) res++;
  }
  return res;
};
// console.log(findTheDistanceValue([4, 5, 8], [10, 9, 1, 8], 2));

// 1399
var countLargestGroup = function (n) {
  const sumDigit02 = (n) => {
    console.log(n);
    let sum = 0;
    while (n) {
      sum += n % 10;
      n = Math.floor(n / 10);
    }

    return sum;
  };

  const map = new Map();
  let max = 0;
  for (let i = 1; i <= n; i++) {
    const sum = sumDigit02(i);
    console.log(sum);

    map.set(sum, map.get(sum) + 1 || 1);

    max = Math.max(map.get(sum), max);
  }

  console.log(map);

  let count = 0;
  for (let value of map.values()) {
    if (max === value) count++;
  }

  return count;
};

// console.log(countLargestGroup(24));

// 9
var isPalindrome = function (x) {
  let numStr = x.toString();
  return numStr === numStr.split("").reverse().join("");
};

// console.log(isPalindrome(-121));

// 709
var toLowerCase = function (str) {
  let res = "";
  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i);
    console.log(charCode);
    if (65 <= charCode && charCode <= 90 && str[i] === str[i].toUpperCase()) {
      console.log(str[i]);
      res = res + String.fromCharCode(str.charCodeAt(i) + 32);
    } else {
      console.log(str[i]);
      res = res + str[i];
    }
  }
  return res;
};

// console.log(toLowerCase("He&LLo"));

// 21
var mergeTwoLists = function (l1, l2) {
  let res = [];
  for (let i = 0; i < l1.length; i++) {
    res.push(...l1.slice(i, i + 1), ...l2.slice(i, i + 1));
  }
  return res;
};

// console.log(mergeTwoLists([1, 2, 4], [1, 3, 4]));

// 1002
var commonChars = function (A) {
  let m = new Map(),
    res = [];
  A.forEach((word) => {
    for (let i = 0; i < word.length; i++) {
      m.set(word[i], m.get(word[i]) + 1 || 1);
    }
  });
  console.log(m);
  m.forEach((value, key) => {
    // if (value % A.length === 0) {
    let a = Math.floor(value / A.length);
    for (let i = 0; i < a; i++) {
      res.push(key);
    }
    // } else {
    //   let a = Math.floor(value / A.length);
    //   for (let i = 0; i < a; i++) {
    //     res.push(key);
    //   }
    // }
  });
  console.log(res);
};

// console.log(commonChars(["cl", "lock", "cook"]));
// console.log(commonChars(["bella", "label", "roller"]));

// 73
var setZeroes = function (mat) {
  let rows = mat.length,
    cols = mat[0].length,
    rowIndex = new Array(rows).fill(-1),
    colIndex = new Array(cols).fill(-1);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (mat[i][j] === 0) {
        rowIndex[i] = 0;
        colIndex[j] = 0;
      }
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if ((rowIndex[i] === 0 || colIndex[j] === 0) && mat[i][j] !== 0) {
        mat[i][j] = 0;
      }
    }
  }
  console.log(mat);
};
// console.log(
//   setZeroes([
//     [1, 1, 1],
//     [1, 0, 1],
//     [1, 1, 1],
//   ])
// );
// console.log(
//   setZeroes([
//     [0, 1, 2, 0],
//     [3, 4, 5, 2],
//     [1, 3, 1, 5],
//   ])
// );

// 75
var sortColors = function (nums) {
  let start = 0,
    end = nums.length - 1;
  for (let i = 0; i <= end; i++) {
    if (nums[i] == 0) {
      [nums[start], nums[i]] = [nums[i], nums[start]];
      start++;
    } else if (nums[i] == 2) {
      [nums[end], nums[i]] = [nums[i], nums[end]];
      end--;
      i--;
    }
  }
  return nums;
};

// console.log(sortColors([2, 0, 2, 1, 1, 0]));
// console.log(sortColors([2, 0, 1]));
// console.log(sortColors([1, 2, 0]));

// 121
var maxProfit = function (prices) {
  let res = 0,
    min = Number.MAX_VALUE;
  for (let i = 0; i < prices.length - 1; i++) {
    min = Math.min(min, prices[i]);
    res = Math.max(res, prices[i + 1] - min);
  }
  return res;
};

// console.log(maxProfit([7, 1, 5, 3, 6, 4]));
// console.log(maxProfit([7, 6, 4, 3, 1]));
// console.log(maxProfit([2, 4, 1]));

// 122
var maxProfit2 = function (prices) {
  let max = 0;
  for (let i = 1; i < prices.length; i++)
    if (prices[i] - prices[i - 1] > 0) max += prices[i] - prices[i - 1];
  return max;
};
// console.log(maxProfit2([7, 1, 5, 3, 6, 4]));

// 771
var numJewelsInStones = function (jewels, stones) {
  let sum = 0;
  for (let i = 0; i < stones.length; i++) {
    if (jewels.search(stones[i]) !== -1) {
      sum += 1;
    }
  }
  console.log(sum);
};

// console.log(numJewelsInStones("z", "ZZ"));

// 287
var findDuplicate = function (nums) {
  let set = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) {
      return nums[i];
    } else {
      set.add(nums[i]);
    }
  }
};

// console.log(findDuplicate([1, 3, 4, 2, 2]));

// 560
var subarraySum = function (nums, k) {
  let currSum = 0,
    count = 0,
    m = new Map();
  for (let i = 0; i < nums.length; i++) {
    currSum += nums[i];
    if (currSum === k) count += 1;
    if (m.has(currSum - k)) count += m.get(currSum - k);
    m.set(currSum, m.get(currSum) + 1 || 1);
  }
  console.log(m);
  return count;
};

// console.log(subarraySum([1, 2, 3], 3));
// console.log(subarraySum([1, 1, 1], 2));

// 605
var canPlaceFlowers = function (flowerbed, n) {
  let count = 0;
  for (let i = 0; i < flowerbed.length; i++) {
    console.log(flowerbed[i + 1]);
    if (
      (i == 0 && flowerbed[i] == 0 && flowerbed[i + 1] !== 1) ||
      (flowerbed[i - 1] === 0 && flowerbed[i] === 0 && flowerbed[i + 1] !== 1)
    ) {
      count += 1;
      flowerbed[i] = 1;
    }
  }
  if (count >= n) {
    return true;
  } else {
    return false;
  }
};

// console.log(canPlaceFlowers([1, 0, 0, 0, 1], 1));
// console.log(canPlaceFlowers([1, 0, 0, 0, 0, 1], 2));
// console.log(canPlaceFlowers([1, 0, 0, 0, 1, 0, 0], 2));

// 830

var largeGroupPositions = function (s) {
  let j = 0,
    res = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== s[i + 1]) {
      if (i - j + 1 >= 3) res.push([j, i]);
      j = i + 1;
    }
  }
  return res;
};

// console.log(largeGroupPositions("abcdddeeeeaabbbcd"));

// 33
var search = function (nums, target) {
  let start = 0,
    end = nums.length - 1;
  while (start < end) {
    let mid = Math.floor(start + (end - start) / 2);
    if (nums[mid] > nums[end]) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }

  let left = 0,
    right = nums.length - 1;
  if (target >= nums[start] && target <= nums[right]) {
    left = start;
  } else {
    right = start;
  }

  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
};

// console.log(search([4, 5, 6, 7, 0, 1, 2], 0));

// 209

var minSubArrayLen = function (target, nums) {
  let curr = 0,
    left = 0,
    res = Number.MAX_VALUE;
  for (let i = 0; i < nums.length; i++) {
    curr += nums[i];
    while (curr >= target) {
      res = Math.min(res, i - left + 1);
      curr -= nums[left];
      left++;
    }
  }
  console.log(res);
  // nums.sort((a, b) => a - b);
  // console.log(nums);
  // let start = 0,
  //   end = nums.length - 1,
  //   minSubArr = nums.length,
  //   minLength = 0;
  // while (start < end) {
  //   let sum = nums[start] + nums[end];
  //   while (sum >= target) {
  //     if (end - start + 1 <= minSubArr) {
  //       minSubArr = nums.slice(start, end + 1).length;
  //       minLength = end - start + 1;
  //       sum -= nums[start];
  //     }
  //   }
  //   start++;
  // }
  // return minLength;
};
// console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));
// console.log(minSubArrayLen(4, [1, 4, 4]));

// 713
var numSubarrayProductLessThanK = function (nums, k) {
  // for (let i = 0; i < nums.length; i++) {
  //   if (nums[i] < k) {
  //     count += 1;
  //     arr.push(nums[i]);
  //   }
  // }
  let left = 0,
    count = 0,
    curr = 1,
    right = 0,
    res = 0;
  while (right < nums.length) {
    // console.log('start')
    curr = curr * nums[right];
    count++;
    while (count && curr >= k) {
      curr /= nums[left];
      count--;
      left++;
    }
    // console.log(left)
    res += count;
    right++;
  }
  // console.log(arr);
  return res;
};

// console.log(numSubarrayProductLessThanK([10, 5, 2, 6], 100));
// console.log(
//   numSubarrayProductLessThanK(
//     [10, 9, 10, 4, 3, 8, 3, 3, 6, 2, 10, 10, 9, 3],
//     19
//   )
// );

// 525

var findMaxLength = function (nums) {
  let maxlen = 0,
    m = new Map(),
    count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      count += -1;
    } else {
      count += 1;
    }
    if (m.has(count)) {
      console.log(i);
      maxlen = Math.max(maxlen, i - m.get(count));
      console.log(maxlen);
    } else {
      m.set(count, i);
    }
  }
};
console.log(findMaxLength([0, 0, 1, 0, 0, 0, 1, 1]));
