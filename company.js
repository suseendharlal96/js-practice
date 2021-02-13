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

console
  .log
  // smallestSubArrayGreaterOrEqBySum([4, 2, 2, 7, 9, 1, 2, 9, 1, 0], 8)
  ();

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
  // let max = arr[0],
  //   currentSum = max,
  //   maxArray = [];
  // for (let i = 1; i < arr.length; i++) {
  //   currentSum = Math.max(currentSum + arr[i], arr[i]);
  //   max = Math.max(currentSum, max);
  //   console.log({ currentSum, max });
  // }
  // return { max, maxArray };

  let maxArr = [],
    ar = [];

  for (let i = 0; i < arr.length; i++) {
    // currentSum += arr[i];
    console.log(maxArr.length);
    if (maxArr.length > 0) {
      console.log(maxArr);
      ar.forEach((a) => {
        if (a + arr[i] > a) {
          console.log(arr[i]);
          maxArr = [arr[i]];
        } else {
          maxArr.push(arr[i]);
        }
      });
    } else {
      maxArr.push(arr[i]);
      // console.log(maxArr)
      ar.push(arr[i]);
    }
    // while (currentSum > max) {
    //   max = currentSum;
    // }
  }
  return maxArr;
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

// console.log(sumOfUnique([1, 2, 3, 2,5,5]));

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
