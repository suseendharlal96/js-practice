const longestIncreaseWithInBoundary = (arr, indices) => {
  // converting 2D array to 1D
  // [[0, 5],[1, 5],[2, 5],[2, 2]] will be [0, 5, 1, 5, 2, 5, 2, 2]
  const flatIndices = indices.flat();

  const findLongest = (sliced) => {
    // this is the old method which is used in this question
    let count = 1,
      max = 0;
    for (let i = 1; i < sliced.length; i++) {
      if (sliced[i] > sliced[i - 1]) {
        count++;
        max = Math.max(count, max);
      } else {
        count = 1;
      }
    }
    return max > 0 ? max : count;
  };

  let res = [],
    map = new Map();
  // iterating the 1D(which we converted...we converted because we can avoid inner for loop)
  for (let i = 0; i < flatIndices.length; i += 2) {
    // this takes a part of given nums
    // for example, part of [2,1,3,5,4,7] with  boundary [2,5] is [3,5,4,7]
    const slicedArr = arr.slice(flatIndices[i], flatIndices[i + 1] + 1);
    // if that value is already stored we can take from that map(no need to pass to the helper func)
    if (map.has(flatIndices[i] + "" + flatIndices[i + 1])) {
      res.push(map.get(flatIndices[i] + "" + flatIndices[i + 1]));
    } else {
      // passing that sliceArr into the helper function(name whatever u want)
      const length = findLongest(slicedArr);
      // storing that returned value in the map
      map.set(flatIndices[i] + "" + flatIndices[i + 1], length);
      // pushing the returned max subarray value
      res.push(length);
    }
  }
  // returning the array which holds the max subarray correspondingly.
  // [3,3,2,1]
  return res;
};
// console.log(
//   longestIncreaseWithInBoundary(
//     [2, 1, 3, 5, 4, 7],
//     [
//       [0, 5],
//       [1, 5],
//       [2, 5],
//       [2, 2],
//     ]
//   )
// );

function timeConversion(s) {
  let hr = s.split(":")[0],
    min = s.split(":")[1],
    sec = s.split(":")[2];
  let actualSec = sec.split("")[0] + sec.split("")[1],
    isNight = sec.split("")[2] === "A";

  let hour = "";
  hour =
    isNight && hr === "12"
      ? "00"
      : !isNight && hr !== "12"
      ? (+hr + 12).toString()
      : hr;
  return hour + ":" + min + ":" + actualSec;
}

// console.log(timeConversion("12:00:00AM"));
// console.log(timeConversion("12:00:00PM"));
// console.log(timeConversion("01:00:00PM"));
// console.log(timeConversion("07:00:00AM"));

// 541
var reverseStr = function (s, k) {
  console.log(s.length);
  let str = s.split("");
  if (s.length < k) {
    console.log(1);
    let start = 0,
      end = str.length - 1;
    while (start <= end) {
      [str[start++], str[end--]] = [str[end], str[start]];
    }
  } else if (s.length >= k && s.length < 2 * k + k) {
    console.log(2);
    let start = 0,
      end = start + k - 1;
    while (start <= end) {
      [str[start++], str[end--]] = [str[end], str[start]];
    }
    // if(end+k<s.length){

    // }
  } else {
    console.log("sdsd");
    let start = 0,
      end = k - 1,
      i = 0;
    while (i <= str.length) {
      // console.log(start);
      while (start <= end) {
        [str[start++], str[end--]] = [str[end], str[start]];
        i++;
      }
      if (start > end) {
        start = k * 2;
        // console.log(start);
        end = start + k - 1;
        // i++;
      }
    }
    // console.log(start);
    // start = k * 2;
    // console.log(start);
    // end = start + k - 1;
    // console.log(end);
  }
  return str.join("");
};

console.log(reverseStr("abcdefghijkl", 3));
// console.log(reverseStr("abcdefg", 1));
// console.log(reverseStr("ab", 2));
// console.log(reverseStr("abcdefg", 2));
// console.log(
//   reverseStr(
//     "hyzqyljrnigxvdtneasepfahmtyhlohwxmkqcdfehybknvdmfrfvtbsovjbdhevlfxpdaovjgunjqlimjkfnqcqnajmebeddqsgl",
//     39
//   )
// );

// 680
var validPalindrome = function (s) {
  let start = 0,
    end = s.length - 1;

  const checkMiddle = (start, end, s) => {
    while (start < end) {
      if (s[start] !== s[end]) {
        return false;
      }

      start++;
      end--;
    }
    return true;
  };

  while (start < end) {
    if (s[start] !== s[end]) {
      return checkMiddle(start + 1, end, s) || checkMiddle(start, end - 1, s);
    }
    start++;
    end--;
  }
  return true;
};

// console.log(validPalindrome("abca"))

// 1451
var arrangeWords = function (text) {
  let words = text.split(" ");
  console.log(words);
  let arr = [];
  for (let i = 0; i < words.length; i++) {
    arr.push([words[i], words[i].length]);
  }
  let sorted = [...arr].sort((a, b) => a[1] - b[1]);
  console.log(arr);
  console.log(sorted);
  let str = "";
  for (let i = 0; i < sorted.length; i++) {
    if (i === 0) {
      str += sorted[i][0].charAt(0).toUpperCase() + sorted[i][0].slice(1);
    } else {
      str += sorted[i][0].toLowerCase();
    }
    if (i !== sorted.length - 1) {
      str += " ";
    }
  }
  return str;
};

// console.log(arrangeWords("Leetcode is cool"));
// console.log(arrangeWords("To be or not to be"));

// 929
var numUniqueEmails = function (emails) {
  let arr = [];
  for (let email of emails) {
    let local = email.split("@")[0],
      domain = email.split("@")[1];

    if (local.includes("+")) {
      local = local.split("+")[0];
    }
    if (local.includes(".")) {
      for (let i = 0; i < local.length; i++) {
        if (local[i] === ".") {
          local = local.replace(".", "");
        }
      }
    }
    console.log(local);
    arr.push(local + "@" + domain);
  }
  console.log(arr);
  return [...new Set(arr)].length;
};

// console.log(
//   numUniqueEmails([
//     "test.email+alex@leetcode.com",
//     "test.email.leet+alex@code.com",
//   ])
// );

var reformatNumber = function (number) {
  let s = "";
  for (let i = 0; i < number.length; i++) {
    if (number[i] !== " " && number[i] !== "-") {
      s += number[i];
    }
  }
  return s;
};

console.log(reformatNumber("1-23-45 6"));

var maxNumberOfBalloons = function (text) {
  let map = new Map();
  for (let i = 0; i < text.length; i++) {
    map.set(text[i], map.get(text[i]) + 1 || 1);
  }

  if (
    map.has("b") &&
    map.has("a") &&
    map.has("l") &&
    map.has("o") &&
    map.has("n")
  ) {
    return Math.min(
      map.get("b"),
      map.get("a"),
      Math.floor(map.get("l") / 2),
      Math.floor(map.get("o") / 2),
      map.get("n")
    );
  }
  return 0;
};

// 1556

var thousandSeparator = function (n) {
  if (n.toString().length <= 3) return n.toString();
  let str = "",
    j = 0;
  for (let i = n.toString().length - 1; i >= 0; i--) {
    str += n.toString()[i];
    j++;
    if (i !== 0 && j % 3 === 0) {
      str += ".";
      j = 0;
    }
  }
  return str.split("").reverse().join("");
};

// console.log(thousandSeparator(1234));
// console.log(thousandSeparator(123456789));

// 402

var removeKdigits = function (num, k) {
  if (num.length === k) return "0";
  let minStack = [];
  for (let i = 0; i < num.length; i++) {
    while (
      minStack.length !== 0 &&
      minStack[minStack.length - 1] > num[i] &&
      k > 0
    ) {
      minStack.pop();
      k--;
    }
    minStack.push(+num[i]);
    // i++;
  }

  while (minStack[0] === 0 && minStack.length > 1) {
    minStack.shift();
  }

  while (k--) {
    minStack.pop();
  }

  return minStack.join("");
};
// console.log(removeKdigits("112", 1));
// console.log(removeKdigits("1234567890", 9));

// 32

/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  let left = 0,
    right = 0,
    max = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      left++;
    } else {
      right++;
    }
    if (left === right) {
      max = Math.max(max, 2 * right);
      // left=right=0
    } else if (right >= left) {
      left = right = 0;
    }
  }

  left = right = 0;

  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === "(") {
      left++;
    } else {
      right++;
    }
    if (left === right) {
      max = Math.max(max, 2 * left);
      // left=right=0
    } else if (left >= right) {
      left = right = 0;
    }
  }
  return max;
};

// console.log(longestValidParentheses('()((()))'))

// 14
var longestCommonPrefix = function (strs) {
  if (strs.length == 0) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    // console.log({ index: strs[i].indexOf(prefix), prefix, str: strs[i] });
    while (strs[i].indexOf(prefix) != 0) {
      console.log({ index: strs[i].indexOf(prefix), prefix, str: strs[i] });
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix.length === 0) return "";
    }
  }
  return prefix;
};

// console.log(longestCommonPrefix(["flower", "flow", "fl"]));

// 22
var generateParenthesis = function (n) {
  let res = [];
  const go = (s = "", l = 0, r = 0) => {
    if (s.length === 2 * n) {
      res.push(s);
      return;
    }
    if (l < n) go(s + "(", l + 1, r);
    console.log("between");
    if (r < l) go(s + ")", l, r + 1);
    console.log({ l, r, res });
  };
  go();
  return res;
};

// console.log(generateParenthesis(3));

// 39
var combinationSum = function (candidates, target) {
  if (candidates === null || candidates.length === 0) return [];
  candidates.sort((a, b) => a - b);
  var results = [];
  var combinations = [];
  toFindCombinations(0, target);
  return results;

  function toFindCombinations(strtIdx, target) {
    // console.log({ strtIdx, target });
    if (target === 0) {
      results.push([...combinations]);
      return;
    }

    for (let i = strtIdx; i < candidates[i]; i++) {
      if (candidates[i] > target) {
        continue;
      }
      combinations.push(candidates[i]);
      console.log("before return", combinations);
      toFindCombinations(i, target - candidates[i]);
      console.log("before pop", combinations);
      combinations.pop();
      console.log("after pop", combinations);
    }
  }
};

// console.log(combinationSum([2, 3, 5], 8));

// 26
var removeDuplicates = function (nums) {
  let p1 = 0;
  for (let p2 = 1; p2 < nums.length; p2++) {
    if (nums[p1] !== nums[p2]) {
      p1++;
      nums[p1] = nums[p2];
    }
  }
  return p1 + 1;
};

// console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));
// console.log(removeDuplicates([1, 1, 2]));

var oddCells2 = function (row, col, indices) {
  let arr = [];
  for (let i = 0; i < row; i++) {
    arr.push(new Array(col).fill(0));
  }
  console.log(arr);
  const flatIndices = indices.flat();

  for (let i = 0; i < flatIndices.length; i++) {
    if (i % 2 === 0) {
      for (let j = 0; j < col; j++) {
        arr[flatIndices[i]][j] += 1;
      }
    } else {
      for (let j = 0; j < row; j++) {
        arr[j][flatIndices[i]] += 1;
      }
    }
  }

  const flatArr = arr.flat();
  let count = 0;
  flatArr.map((a) => a % 2 !== 0 && count++);
  return count;
};

// console.log(
//   oddCells2(2, 2, [
//     [1, 1],
//     [0, 0],
//   ])
// );

// 1779
var nearestValidPoint = function (x, y, points) {
  let validArr = [];
  points.forEach(([xPt, yPt]) => {
    if (xPt === x || yPt === y) {
      console.log(1);
      validArr.push([xPt, yPt]);
    }
  });
  console.log(validArr);
  if (validArr.length === 0) return -1;
  if (validArr.length === 1) {
    for (let i = 0; i < points.length; i++) {
      if (points[i][0] == validArr[0][0] && points[i][1] == validArr[0][1]) {
        return i;
      }
    }
  }

  let map = new Map();
  validArr.forEach(([xPt, yPt]) => {
    const xDist = Math.abs(x - xPt);
    const yDist = Math.abs(y - yPt);
    const max = Math.max(xDist, yDist);
    map.set([xPt, yPt], max);
  });
  const sortedMap = new Map([...map.entries()].sort((a, b) => a[1] - b[1]));
  console.log(map, sortedMap);
  const keys = sortedMap.keys();
  const coordinates = keys.next().value;
  const xCoordinate = coordinates[0];
  const yCoordinate = coordinates[1];
  console.log({ xCoordinate, yCoordinate });
  for (let i = 0; i < points.length; i++) {
    if (points[i][0] == xCoordinate && points[i][1] == yCoordinate) {
      return i;
    }
  }
};

// console.log(
//   nearestValidPoint(3, 6, [
//     [1, 3],
//     [9, 8],
//     [3, 8],
//     [3, 9],
//     [7, 4],
//     [3, 1],
//     [8, 1],
//   ])
// );
// console.log(
//   nearestValidPoint(3, 4, [
//     [1, 2],
//     [3, 1],
//     [2, 4],
//     [2, 3],
//     [4, 4],
//   ])
// );

var findTheDistanceValue = function (arr1, arr2, d) {
  let res = 0;
  loop1: for (let i = 0; i < arr1.length; i++) {
    let isLessThanD = true;
    loop2: for (let j = 0; j < arr2.length; j++) {
      if (Math.abs(arr1[i] - arr2[j]) <= d) {
        isLessThanD = false;
        continue loop1;
      }
    }
    if (isLessThanD) {
      res++;
    }
  }
  return res;
};

// console.log(findTheDistanceValue([4, 5, 8], [10, 9, 1, 8], 2));

var canFormArray = function (arr, pieces) {
  if (pieces.length === 1) return arr.toString() === pieces[0].toString();

  let map = new Map();

  pieces.forEach((piece) => {
    map.set(piece[0], piece);
  });
  console.log(map);
  loop1: for (let i = 0; i < arr.length; i++) {
    console.log("i loop");
    if (map.has(arr[i])) {
      const wholeElements = map.get(arr[i]);

      console.log(wholeElements);
      loop2: for (let j = 0; j < wholeElements.length; j++) {
        console.log(arr[i]);
        if (wholeElements[j] !== arr[i]) {
          return false;
        } else {
          i++;
        }
      }
      i--;
    } else {
      return false;
    }
  }
  return true;
};

// console.log(canFormArray([49, 18, 16], [[16, 18, 49]]));
// console.log(canFormArray([91, 4, 64, 78], [[78], [4, 64], [91]]));

var slowestKey = function (releaseTimes, keysPressed) {
  let map = new Map();

  for (let i = 0; i < releaseTimes.length; i++) {
    if (i === 0) {
      map.set(keysPressed[i], releaseTimes[i]);
    } else {
      if (
        map.has(keysPressed[i]) &&
        map.get(keysPressed[i]) < releaseTimes[i] - releaseTimes[i - 1]
      ) {
        map.set(keysPressed[i], releaseTimes[i] - releaseTimes[i - 1]);
      } else if (!map.has(keysPressed[i])) {
        map.set(keysPressed[i], releaseTimes[i] - releaseTimes[i - 1]);
      }
    }
  }
  const sortedMap = new Map(
    [...map.entries()].sort((a, b) => +(a[0] > b[0]) || -(a[0] < b[0]))
  );

  let max = -1,
    maxKey;
  for (let [key, value] of sortedMap) {
    if (value >= max) {
      max = value;
      maxKey = key;
    }
  }

  return maxKey;
};

// console.log(slowestKey([19, 22, 28, 29, 66, 81, 93, 97], "fnfaaxha"));
// console.log(slowestKey([12, 23, 36, 46, 62], "spuda"));
// console.log(slowestKey([9, 29, 49, 50], "cbcd"));
