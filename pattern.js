// // 1
// // 0 1
// // 1 0 1
// // 0 1 0 1
// // 1 0 1 0 1

const printStars = (N) => {
  for (let i = 1; i <= N; i++) {
    if (i % 2 == 0) {
      for (let j = 1; j <= i; j++) {
        if (j % 2 == 0) {
          document.write("1 ");
        } else {
          document.write("0 ");
        }
      }
    } else {
      for (let j = 1; j <= i; j++) {
        if (j % 2 == 0) {
          document.write("0 ");
        } else {
          document.write("1 ");
        }
      }
    }

    document.write("</br>");
  }
  document.write("</br>");
  document.write("</br>");
};
// printStars(10);

// var num, p, q, m, n;
// num = 10;
// for (m = 1; m <= num; m++) {
//   if (m % 2 == 0) {
//     p = 1;
//     q = 0;
//   } else {
//     p = 0;
//     q = 1;
//   }
//   for (n = 1; n <= m; n++)
//     if (n % 2 == 0) document.write("" + p + " ");
//     else document.write("" + q + " ");
//   document.write("<br/>");
// }

const printNum = (num) => {
  //   let a = 1;
  for (let i = 1; i <= num; i++) {
    for (let j = num; j >= num + 1 - i; j--) {
      document.write(j);
    }

    document.write("</br>");
  }
};

// printNum(5);

const startPattern = (n) => {
  for (let i = 0; i < n * 2; i++) {
    console.log(i);
    if (i < 5) {
      for (let j = n * 2; j > i; j--) {
        document.write("&nbsp");
      }
      for (let j = 0; j <= i; j++) {
        document.write("*");
        document.write("\t");
      }
    } else {
      for (let j = i; j < n * 2; j++) {
        document.write("*");
        document.write("\t");
      }
      for (let j = n * 2; j > i; j--) {
        document.write("&nbsp");
      }
    }
    document.write("</br>");
  }
};

// console.log(startPattern(5));

const printNum2 = (num) => {
  let a = 1;
  let b = num - 1;
  console.log(a);
  for (let i = 0; i < num * 2; i++) {
    if (a <= num) {
      console.log(a);
      if (a === 1) {
        document.write(1);
      } else {
        for (let i = a - 1; i <= a; i++) {
          document.write(a);
        }
      }
      a += 1;
      document.write("</br>");
    } else {
      console.log(a);
      if (b === 1) {
        document.write(1);
      } else if (b !== 0) {
        for (let i = b; i <= b + 1; i++) {
          document.write(b);
        }
      } else {
        return;
      }
      document.write("</br>");
      b--;
    }
  }
};

// printNum2(10);

const printWithZero = (num) => {
  let a = 1;
  let b = 1;
  for (let i = 0; i < Math.floor(num / 3); i++) {
    for (let j = 1; j <= a; j++) {
      document.write(b);
      b++;
    }
    document.write("</br>");
    a += 2;
  }
};

// printWithZero(10);

const numPattern = (num) => {
  for (let i = 1; i <= num; i++) {
    for (let j = 1; j <= i; j++) {
      document.write(j);
      document.write("&nbsp&nbsp");
    }
    document.write("</br>");
  }
};

// console.log(numPattern(2));

const mulPattern = (num) => {
  let a = 2;
  for (let i = 0; i < num; i++) {
    for (let j = i; j <= i; j++) {
      document.write(j + 1);
    }
    for (let k = a; k <= num - i; k++) {
      document.write(k);
    }
    document.write("</br>");
  }
};

// mulPattern(5);

const sortedSquareNum = (arr) => {
  const a = [];
  let left = 0;
  let right = arr.length - 1;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (Math.abs(arr[left]) > arr[right]) {
      a[i] = arr[left] * arr[left];
      left++;
    } else {
      a[i] = arr[right] * arr[right];
      right--;
    }
  }
  return a.sort((a, b) => a - b);
};

// console.log(sortedSquareNum([-7, -3, -1, 4, 8, 12]));

// Sliding window approach:
const longestSubArrayBySum = (arr) => {
  let left = 0,
    right = 0;
  let result = [-1];
  const sum = 15;
  currentSum = 0;
  while (right < arr.length) {
    console.log(currentSum);
    if (sum === currentSum) {
      console.log(result);
      result = [left + 1, right + 1];
    } else if (sum < currentSum) {
      console.log("midle");
      currentSum = currentSum - left;
      left++;
    } else {
      console.log("last");
      currentSum += arr[right];
    }
    right++;
  }
  return result;
};

// longestSubArrayBySum([1, 2, 3, 4, 5, 0, 0, 0, 7, 8, 9, 10]);

var twoSum = function (numbers, target) {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j <= numbers.length; j++) {
      console.log({ i, j });
      if (numbers[i] + numbers[j] === target) {
        return [i, j];
      }
    }
  }
};

// console.log(twoSum([3, 2, 4], 6));

var runningSum = function (nums) {
  let a = 0;
  for (let i in nums) {
    a += nums[i];
    nums[i] = a;
  }
  return nums;
};

// console.log(runningSum([1, 2, 3, 4]));

var reverse = (x) => {
  // let rev = x.toString().split("").reverse().join("");
  // if (x.toString().startsWith("-")) {
  //   rev =
  //     x.toString().charAt(0) +
  //     x.toString().split("-")[1].split("").reverse().join("");
  //   if (rev.startsWith("0")) {
  //     return (
  //       +rev.toString().split("-")[0] +
  //       rev.toString().split("-")[1].splice(0, 1)
  //     );
  //   } else {
  //     return +rev;
  //   }
  // } else {
  //   if (rev.startsWith("0")) {
  //     rev.split("").splice(0, 1);
  //     return +rev;
  //   } else {
  //     return +rev;
  //   }
  // }
  const limit = 2147483648;
  const k = x < 0 ? -1 : 1;
  const n = Math.abs(x).toString().split("").reverse().join("");
  console.log("reverse");
  return n > limit ? 0 : n * k;
};

console.log(reverse(12000000000));

var romanToInt = function (s) {
  const roman = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let numb = 0;
  for (let i = 0; i < s.length; i++) {
    console.log(numb);
    if (roman[s[i]] < roman[s[i + 1]]) {
      numb -= roman[s[i]];
    } else {
      numb += roman[s[i]];
    }
  }
  return numb;
};

// console.log(romanToInt("MCMXCIV"));

var removeDuplicates = function (nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      nums.splice(i, 1);
      console.log(nums);
      i--;
    }
  }
  return nums;
};

// console.log(removeDuplicates([1, 1, 2, 3, 3, 5, 5, 6, 6, 6, 6, 6, 6]));

var removNum = function (nums, val) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      console.log(i);
      nums.splice(i, 1);
      i--;
      console.log(i);
    }
  }
  return nums;
};

// console.log(removNum([1, 2, 2], 2));

var smallerNumbersThanCurrent = function (nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  return nums.map((num) => sorted.indexOf(num));
};

// console.log(smallerNumbersThanCurrent([8, 1, 2, 2, 3]));

var shuffle = function (nums, n) {
  // const left = nums.slice(0, n);
  // const right = nums.slice(n, nums.length);
  // console.log({ left, right });
  const a = [];
  for (let i = 0; i < n; i++) {
    a.push(nums.slice(0, n)[i], nums.slice(n, nums.length)[i]);
  }
  return a;
};

// console.log(shuffle([1, 2, 3, 4, 4, 3, 2, 1], 4));

var restoreString = function (s, indices) {
  let a = [];
  for (let i = 0; i < s.length; i++) {
    a[indices[i]] = s[i];
  }
  return a.join("");
};

// console.log(restoreString("codeleet", [4, 5, 6, 7, 0, 2, 1, 3]));

var balancedStringSplit = function (s) {
  let balance = 0;
  let count = 0;
  let str = "";
  const arr = [];
  s.split("").forEach((element, index) => {
    console.log(index);
    if (element === "L") {
      balance++;
      str += element;
    } else {
      balance--;
      str += element;
    }
    if (balance === 0) {
      arr.push(str);
      str = "";
      count++;
    }
  });
  console.log(arr);
  return count;
};

// console.log(balancedStringSplit("RLLLLRRRLR"));

function maxOfAdjacentElementsProduct(inputArray) {
  let max;
  // for (let i = 0; i < inputArray.length - 1; i++) {
  //   if (inputArray[i] * inputArray[i + 1] > max) {
  //     max = inputArray[i] * inputArray[i + 1];
  //   }
  // }
  let i = 0;
  while (i < inputArray.length - 1) {
    if (max) {
      if (inputArray[i] * inputArray[i + 1] > max) {
        max = inputArray[i] * inputArray[i + 1];
      }
    } else {
      max = inputArray[i] * inputArray[i + 1];
    }
    i++;
  }
  return max;
}
// console.log(maxOfAdjacentElementsProduct([-23, 4, -3, 8, -12]));

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
        console.log(odd);
      }
    }
    odd.length = 0;
  }
  return count;
};

// console.log(sumOddLengthSubarrays([1, 4, 2, 5, 3]));

var createTargetArray = function (nums, index) {
  const a = [];
  for (let key in index) {
    a.splice(index[key], 0, nums[key]);
  }
  return a;
};

// console.log(createTargetArray([0, 1, 2, 3, 4], [0, 1, 2, 2, 1]));

var countConsistentStrings = function (allowed, words) {
  let count = 0;
  // let a = allowed.split("");
  for (let value of words) {
    let ok = true;
    // for (let word of value.split("")) {
    //   ok = allowed.search(word) !== -1 ? ok && true : ok && false;
    // }
    for (let i = 0; i < value.length; i++) {
      if (!allowed.includes(value[i])) {
        ok = false;
        // i = value.length;
      }
    }
    if (ok) {
      count++;
    }
  }
  return count;
};

// console.log(
//   countConsistentStrings("ab", ["ad","bd","aaab","baa","badab"])
// );

var arrayStringsAreEqual = function (word1, word2) {
  let str1 = "";
  let str2 = "";
  word1.forEach((w1) => {
    str1 += w1;
  });
  if (word2.length > 1) {
    word2.forEach((w2) => {
      str2 += w2;
    });
  } else {
    str2 = word2[0];
  }
  return str1 === str2 ? true : false;
};

// console.log(arrayStringsAreEqual(["ab", "c"], ["a", "bc"]));

var numberOfMatches = function (n) {
  let teams = n;
  let matches = 0;
  while (teams >= 2) {
    // console.log(1)
    matches += Math.floor(teams / 2);
    teams = teams - Math.floor(teams / 2);
  }
  return { teams, matches };
};

// console.log(numberOfMatches(14));

var largestAltitude = function (gain) {
  const arr = [0, gain[0]];
  for (let i = 1; i < gain.length; i++) {
    let a = 0;
    for (let j = 0; j <= i; j++) {
      a += gain[j];
    }
    arr.push(a);
  }
  return Math.max(...arr);
};

// console.log(largestAltitude([-4, -3, -2, -1, 4, 3, 2]));

const printStars2 = (n) => {
  let m = 3;
  for (let i = 0; i < n * 2 - 1; i++) {
    let content = "";

    for (let k = 0; k < n - 1 - i; k++) {
      content += " ";
    }

    if (i > 0) {
      if (i > 4) {
        content += " ".repeat((i % 5) + 1) + "*".repeat(n * 2 - m);
        m += 2;
      } else {
        content +=  "*".repeat(i * 2 + 1);
      }
    } else {
      content += "*";
    }
    console.log(" " + content + " ");
  }
};
printStars2(5);

const printNumber = (n) => {
  for (let i = 0; i < n; i++) {
    let content = "";

    for (let j = 0; j <= i; j++) {
      if ((i + j) % 2 === 0) {
        content += "1 ";
      } else {
        content += "0 ";
      }
    }
    console.log(content);
  }
};
printNumber(5);
