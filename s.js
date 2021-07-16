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
    console.log(nums);
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

var minOperations = function (s) {
  let a = ["0", "1"],
    count = 0;
  for (let i = 0; i < s.length; i++) {
    console.log(a[i % 2], s[i]);
    if (a[i % 2] === s[i]) {
      count++;
    }
  }
  console.log(count);
  return Math.min(count, s.length - count);
};
// console.log(minOperations("0100"));

var findDisappearedNumbers = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    console.log(nums[Math.abs(nums[i]) - 1]);
    nums[Math.abs(nums[i]) - 1] = -1 * Math.abs(nums[Math.abs(nums[i]) - 1]);
  }
  let res = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      res.push(i + 1);
    }
  }
  return res;
};

// console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]));

var generate2 = function (rows) {
  let arr = [];
  arr.push([1]);
  for (let i = 1; i < rows.length; i++) {
    console.log("in");
    const temp = [];
    temp.push(1);
    for (let j = 1; j < i; j++) {
      temp.push(arr[j - 1][j - 1], arr[j - 1][j]);
    }
    temp.push(1);
    arr.push([...temp]);
  }
  return arr;
};

// console.log(generate2(5))

var largeGroupPositions = function (s) {
  let count = 0,
    set = new Set(),
    left = 0;
  for (let i = 0; i < s.length; i++) {
    count++;
    if (s[i] !== s[i + 1]) {
      if (count >= 3) {
        set.add([left, i]);
      }
      left = i + 1;
      count = 0;
    }
  }
  if (set.size === 0) {
    return [];
  } else {
    const res = [];
    for (let value of set) {
      res.push(value);
    }
    return res;
  }
};

// console.log(largeGroupPositions("abcdddeeeeaabbbcdddddd"));
// console.log(largeGroupPositions("abbxxxxzzy"));
// console.log(largeGroupPositions("abc"));
// console.log(largeGroupPositions("aba"));
// console.log(largeGroupPositions("nnnhaaannnm"));

var findDuplicate = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    console.log(nums[Math.abs(nums[i])]);
    if (nums[Math.abs(nums[i])] < 0) {
      return Math.abs(nums[i]);
    }

    nums[Math.abs(nums[i])] = -1 * nums[Math.abs(nums[i])];
  }
  console.log(nums);
};

// console.log(findDuplicate([1, 2, 2]));

// 950
var deckRevealedIncreasing = function (deck) {
  const sorted = [...deck].sort((a, b) => a - b);
  const mid = Math.floor(deck.length / 2);
  console.log(deck);
  let low = [],
    res = [];
  for (let i = 0; i <= mid; i++) {
    low.push(sorted[i]);
  }
  for (let i = 0; i < low.length; i++) {
    const index = deck.indexOf(low[i]);
    deck.splice(index, 1);
  }
  // deck = deck.slice(mid + 1);
  // deck.sort((a,b)=>b-a)
  let i = 0,
    j = 0;
  while (i < deck.length && j < low.length) {
    res.push(low[j], deck[i]);
    i++;
    j++;
  }
  while (j < low.length) {
    res.push(low[j]);
    j++;
  }
  while (i < deck.length) {
    res.push(deck[i]);
    i++;
  }
  return { deck, res };
};

// console.log(deckRevealedIncreasing([17, 13, 11, 2, 3, 5, 7]));

// 1395
var numTeams = function (rating) {
  const len = rating.length;
  let sum = 0;
  for (let i = 1; i < len - 1; i++) {
    const l = [0, 0];
    const r = [0, 0];
    for (let j = 0; j < len; j++) {
      if (rating[j] < rating[i]) {
        j < i ? l[0]++ : r[0]++;
      }

      if (rating[j] > rating[i]) {
        j < i ? l[1]++ : r[1]++;
      }
    }

    console.log({ l, r });
    sum += l[0] * r[1] + l[1] * r[0];
  }
  return sum;
};

// console.log(numTeams([2, 5, 3, 4, 1]));

// 1277
var countSquares = function (matrix) {
  let count = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) continue;
      console.log({ i, j });
      if (i > 0 && j > 0) {
        matrix[i][j] += Math.min(
          matrix[i - 1][j],
          matrix[i - 1][j - 1],
          matrix[i][j - 1]
        );
      }
      console.log(matrix[i][j]);
      count += matrix[i][j];
    }
  }
  return count;
};

// console.log(
//   countSquares([
//     [0, 1, 1, 1],
//     [1, 1, 1, 1],
//     [0, 1, 1, 1],
//   ])
// );

var sumSubarrayMins = function (A) {
  let stack1 = [],
    stack2 = [],
    prevSmaller = new Array(A.length),
    nextSmaller = new Array(A.length);
  for (let i = 0; i < A.length; i++) {
    nextSmaller[i] = A.length - i - 1;
    prevSmaller[i] = i;
  }
  console.log({ prevSmaller, nextSmaller });
  // [2, 13, 13, 13, 13, 13, 13, 13, 1]
  for (let i = 0; i < A.length; i++) {
    while (stack1.length !== 0 && A[stack1[stack1.length - 1]] > A[i]) {
      nextSmaller[stack1[stack1.length - 1]] =
        i - stack1[stack1.length - 1] - 1;
      stack1.pop();
    }
    stack1.push(i);
    // console.log(stack1);
  }
  for (let i = A.length - 1; i >= 0; i--) {
    if (stack2.length !== 0) {
      console.log(i, A[stack2[stack2.length - 1]]);
    }
    while (stack2.length !== 0 && A[stack2[stack2.length - 1]] >= A[i]) {
      prevSmaller[stack2[stack2.length - 1]] =
        stack2[stack2.length - 1] - i - 1;
      stack2.pop();
    }
    stack2.push(i);
    // console.log(stack2);
  }

  let res = 0;
  for (let i = 0; i < A.length; i++) {
    res += A[i] * (prevSmaller[i] + 1) * (nextSmaller[i] + 1);
  }
  return res % (10 ** 9 + 7);
};

// console.log(sumSubarrayMins([3,3,6,2,5,6,7,8]));
// console.log(sumSubarrayMins([2, 13, 13, 13, 13, 13, 13, 13, 1]));
// console.log(sumSubarrayMins([3, 1, 2, 4]));
// console.log(sumSubarrayMins([2, 9, 7, 8, 3, 4, 6, 1]));

// 1046
var lastStoneWeight = function (stones) {
  stones.sort((a, b) => b - a);
  function recurse(stones) {
    console.log(stones);
    for (let i = 0; i < stones.length; i++) {
      if (stones[i] >= 0 && stones[i + 1] >= 0) {
        if (stones[i] >= stones[i + 1]) {
          stones[i] = stones[i] - stones[i + 1];
          stones.splice(i + 1, 1);
        } else {
          stones[i + 1] = stones[i + 1] - stones[i];
          stones.splice(i, 1);
          // stones.sort((a, b) => b - a);
          // recurse(stones);
        }
        stones.sort((a, b) => b - a);
        recurse(stones);
      }
      return stones;
    }
  }
  return recurse(stones).length === 0 ? 0 : recurse(stones)[0];
};

// console.log(lastStoneWeight([7, 6, 7, 6, 9]));
var reverseList = function (head) {
  let start = 0,
    end = head.length - 1;
  while (start < end) {
    [head[start], head[end]] = [head[end], head[start]];
    start++;
    end--;
  }
  return head;
};

console.log(reverseList([1, 2]));

var deckRevealedIncreasing = function (deck) {
  deck.sort((a, b) => a - b);
  const res = [];
  function recursive(cards) {
    console.log(cards);
    res.push(cards.shift());
    console.log(res);
    cards.push(cards.shift());
    if (cards.length !== 0 && cards[0]) {
      recursive(cards);
    } else {
      return;
    }
  }
  recursive(deck);
  return res;
};

// console.log(deckRevealedIncreasing([17, 13, 11, 2, 3, 5, 7]));

var makeGood = function (s) {
  function recursive(s) {
    for (let i = 0; i < s.length - 1; i++) {
      if (
        (s[i] !== s[i].toUpperCase() && s[i].toUpperCase() === s[i + 1]) ||
        (s[i + 1].toUpperCase() !== s[i + 1] && s[i] === s[i + 1].toUpperCase())
      ) {
        s.splice(i, 2);
        recursive(s);
      }
    }
    return s;
  }
  return recursive(s.split("")).join("");
};

// console.log(makeGood("Pp"));

// 0 1 1 2 3 5

const fiboSeries = (n) => {
  if (n <= 1) {
    return n;
  }
  return fiboSeries(n - 1) + fiboSeries(n - 2);
};
console.log(fiboSeries(5));

const sort0 = (arr) => {
  let start = 0;
  let end = arr.length - 1;
  for (let i = 0; i <= end; i++) {
    console.log(arr);
    if (arr[i] === 0) {
      [arr[start], arr[i]] = [arr[i], arr[start]];
      start++;
    } else if (arr[i] === 2) {
      [arr[i], arr[end]] = [arr[end], arr[i]];
      end--;
      i--;
    }
  }
  return arr;
};
// console.log(sort0([0, 2, 1, 2, 0]));

const rev = (str) => {
  console.log(str[0]);
  let start = 0,
    end = str.length - 1,
    strArr = str.split("");
  while (start <= end) {
    // console.log(str)
    [strArr[start], strArr[end]] = [strArr[end], strArr[start]];
    start++;
    end--;
  }
  return strArr.join("");
};
// console.log(rev('Acecademy'))

const sortStack = (arr, order) => {
  for (let i = 1; i < arr.length; i++) {
    if (order === "desc") {
      while (arr[i - 1] < arr[i] && i >= 0) {
        [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
        i--;
      }
    } else {
      while (arr[i] < arr[i - 1] && i >= 0) {
        [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
        i--;
      }
    }
  }
  return arr;
};
// console.log(sortStack([11, 2, 32, 3, 41], "desc"));
// console.log(sortStack([7, 3, 1, 4, 6, 2, 3], "asc"));
// console.log(sortStack([0, 2, 1, 2, 0], "asc"));

const arr = [];
const printSubsequence = (input, output) => {
  if (input.length === 0) {
    console.log(output);
    arr.push(output);
    return;
  }

  // output is passed with including
  // the Ist characther of
  // Input string
  printSubsequence(input.substr(1), output + input[0]);
  // output is passed without
  // including the Ist character
  // of Input string
  printSubsequence(input.substr(1), output);
};
// console.log(printSubsequence("abcd", ""));

var findLength = function (nums1, nums2) {
  const set = new Set();
  let setCount = 0;
  for (let i = 0; i < nums1.length; i++) {
    set.add(nums1[i]);
  }

  for (let i = 0; i < nums2.length; i++) {
    if (set.has(nums2[i])) {
      count += 1;
    }
  }

  let start = 0;
  const arr = [];
  while (start <= nums1.length) {
    if (nums1.toString().includes(nums2.slice(start).toString())) {
      console.log("sds", nums2.slice(start).length);
      arr.push(nums2.slice(start).length);
      // break;
    }
    start++;
  }
  let end = nums2.length;
  while (end >= 0) {
    if (nums1.toString().includes(nums2.slice(0, end).toString())) {
      arr.push(nums2.slice(0, end).length);
      // break;
    }
    end--;
  }
  console.log(arr);
  let res;
  if (arr.length > 1) {
    res = Math.max(...arr, 0);
  } else {
    res = arr[0];
  }
  return res > 0 ? res : setCount;
};

// console.log(findLength([5, 14, 53, 80, 48], [50, 47, 3, 80, 83]));
// console.log(findLength([0, 0, 0, 0, 1], [1, 0, 0, 0, 0]));
// console.log(findLength([1, 2, 3, 2, 1], [3, 2, 1, 4, 7]));

var addStrings = function (num1, num2) {
  let res = "";
  let num1Start = num1.length - 1;
  let num2Start = num2.length - 1;
  let carryOver = 0;

  while (num1Start >= 0 || num2Start >= 0) {
    let total = carryOver;

    if (num1Start >= 0) {
      // console.log(+num1[num1Start])
      total += +num1[num1Start--];
    }
    if (num2Start >= 0) {
      // console.log(+num2[num2Start])
      total += +num2[num2Start--];
    }
    console.log(total);
    res += total % 10;
    carryOver = Math.floor(total / 10);
  }
  if (carryOver !== 0) {
    res += carryOver;
  }

  return res;
};

// console.log(addStrings("11", "123"));

var exist = function (board, word) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      console.log("inside forloop");
      if (board[i][j] === word[0] && search(board, i, j, 0, word)) {
        return true;
      }
    }
  }
  return false;

  function search(b, row, col, wordIndex, w) {
    console.log("start");
    if (wordIndex === w.length) {
      console.log("all words found");
      return true;
    }

    if (
      row < 0 ||
      col < 0 ||
      row >= b.length ||
      col >= b[row].length ||
      b[row][col] !== w[wordIndex]
    ) {
      console.log({ row, col });
      return false;
    } else {
      console.log({ row, col, el: b[row][col] });
    }

    console.log(b);
    const temp = b[row][col];
    let isFound =
      search(b, row - 1, col, wordIndex + 1, w) ||
      search(b, row + 1, col, wordIndex + 1, w) ||
      search(b, row, col + 1, wordIndex + 1, w) ||
      search(b, row, col - 1, wordIndex + 1, w);
    b[row][col] = temp;
    if (true) {
      console.log("last return", isFound);
      return isFound;
    }
  }
};
// console.log(
//   exist(
//     [
//       ["C", "A", "A"],
//       ["A", "A", "A"],
//       ["B", "C", "D"],
//     ],
//     "AAB"
//   )
// );

// console.log(
//   exist(
//     [
//       ["A", "B", "C", "E"],
//       ["Z", "F", "C", "S"],
//       ["P", "D", "E", "E"],
//     ],
//     "ABSED"
//   )
// );
var uniquePaths2 = function (obstacleGrid) {
  let m = obstacleGrid.length;
  let n = obstacleGrid[0].length;
  const dp = Array(m)
    .fill(0)
    .map((el) => Array(n).fill(0));
  dp[0][0] = 1;
  console.log(dp);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (obstacleGrid[i][j] === 1 || (i === 0 && j === 0)) {
        console.log(i, j);
        console.log("cont");
        continue;
      } else {
        console.log("else");
        dp[i][j] = (i ? dp[i - 1][j] : 0) + (j ? dp[i][j - 1] : 0);
      }
    }
  }
  console.log(dp);
  return dp[m - 1][n - 1];
};

// console.log(
//   uniquePaths2([
//     [0, 0, 0],
//     [0, 1, 0],
//     [0, 0, 0],
//   ])
// );

var uniquePaths = function (m, n) {
  const dp = Array(m)
    .fill(0)
    .map((row) => Array(n).fill(0));
  dp[0][0] = 1;
  // for (let i = 0; i < m; i++) {
  //   dp[i][0] = 1;
  // }
  // for (let i = 0; i < n; i++) {
  //   dp[0][i] = 1;
  // }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== 0 || j !== 0) {
        console.log(i, j);
        dp[i][j] = (i ? dp[i - 1][j] : 0) + (j ? dp[i][j - 1] : 0);
      }
    }
  }
  console.log(dp);
  return dp[m - 1][n - 1];
};

// console.log(uniquePaths(3, 7));

var letterCombinations = function (digits) {
  if (digits.length === 0) return [];

  const L = [
    "0",
    "1",
    "abc",
    "def",
    "ghi",
    "jkl",
    "mno",
    "pqrs",
    "tuv",
    "wxyz",
  ];

  const res = [];
  let combinationStr = "";
  dfs(0, "");
  return res;
  function dfs(startIndex, str) {
    console.log(startIndex);
    if (startIndex === digits.length) {
      res.push(str);
    } else {
      console.log(startIndex);
      const letters = L[digits[startIndex]];
      for (let i = 0; i < letters.length; i++) {
        dfs(startIndex + 1, str + letters[i]);
      }
    }
  }
};

// console.log(letterCombinations("23"));

const gates = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 0) {
        dfs(grid, i, j, 0);
      }
    }
  }
  return grid;
  function dfs(grid, row, col, current) {
    if (
      row < 0 ||
      col < 0 ||
      row >= grid.length ||
      col >= grid[row].length ||
      grid[row][col] < current
    ) {
      return false;
    }

    grid[row][col] = current;

    dfs(grid, row + 1, col, current + 1);
    dfs(grid, row - 1, col, current + 1);
    dfs(grid, row, col + 1, current + 1);
    dfs(grid, row, col - 1, current + 1);
  }
};
console.log(
  gates([
    [Number.MAX_SAFE_INTEGER, -1, 0, Number.MAX_SAFE_INTEGER],
    [
      Number.MAX_SAFE_INTEGER,
      Number.MAX_SAFE_INTEGER,
      Number.MAX_SAFE_INTEGER,
      -1,
    ],
    [Number.MAX_SAFE_INTEGER, -1, Number.MAX_SAFE_INTEGER, -1],
    [0, -1, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  ])
);

var countSquares = function (matrix) {
  let count = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) continue;
      if (i > 0 && j > 0) {
        matrix[i][j] += Math.min(
          matrix[i - 1][j],
          matrix[i - 1][j - 1],
          matrix[i][j - 1]
        );
        // console.log({ i, j });
      }
      // console.log({ i, j }, matrix[i][j]);
      count += matrix[i][j];
    }
  }
  return count;
};

// console.log(
//   countSquares([
//     [0, 1, 1, 1],
//     [1, 1, 1, 1],
//     [0, 1, 1, 1],
//   ])
// );
var partitionLabels = function (s) {
  const alphabetArr = new Array(26);
  s.split("").forEach((letter, i) => {
    alphabetArr[letter.charCodeAt() - 97] = i;
  });
  console.log(alphabetArr);
};

console.log(partitionLabels("ababcbacadefegdehijhklij"));

const commonNum = (A, B, C) => {
  let a = 0;
  let b = 0;
  let c = 0;
  const res = [];
  while (a < A.length && b < B.length && c < C.length) {
    if (A[a] === B[b] && B[b] === C[c]) {
      // console.log(a)
      res.push(A[a]);
      a++;
      b++;
      c++;
    } else if (A[a] > B[b]) {
      b++;
    } else if (A[a] < B[b]) {
      a++;
    } else {
      c++;
    }
  }
  return res;
};
// console.log(
//   commonNum(
//     [1, 5, 10, 20, 40, 80],
//     [6, 7, 20, 80, 100],
//     [3, 4, 15, 20, 30, 70, 80, 120]
//   )
// );
var shortSub = function (s, t) {
  let count = 0;
  let remaining = t;
  while (remaining.length > 0) {
    let subseq = "";
    let i = 0;
    let j = 0;
    while (i < s.length && j < remaining.length) {
      console.log(s[i], remaining[j]);
      if (s[i++] === remaining[j]) {
        subseq += remaining[j++];
      }
    }
    if (subseq.length === 0) return -1;
    count++;
    remaining = remaining.substring(subseq.length);
  }
  return count;
};

// console.log(shortSub("abc", "acdbc"));
// console.log(shortSub("xyz", "xzyxz"));

// 1616
var checkPalindromeFormation = function (a, b) {
  return validate(a, b) || validate(b, a);

  function validate(a, b) {
    console.log(1, { a, b });
    let l = 0,
      r = a.length - 1;
    while (l < r) {
      if (a.charAt(l) != b.charAt(r)) break;
      l++;
      r--;
    }
    return isPalindrom(a, l, r) || isPalindrom(b, l, r);
  }

  function isPalindrom(a, l, r) {
    console.log({ a, l, r });
    while (l < r) {
      console.log("in");
      if (a.charAt(l) != a.charAt(r)) break;
      l++;
      r--;
    }
    return l >= r;
  }
};

// console.log(
//   checkPalindromeFormation("pvhmupgqeltozftlmfjjde", "yjgpzbezspnnpszebzmhvp")
// );

function isPalindrom(str) {
  let l = 0;
  r = str.length - 1;
  while (l < r) {
    if (str.charAt(l) !== str.charAt(r)) break;
    l++;
    r--;
  }
  return l >= r;
}

// console.log(isPalindrom("pvhmzbezspnnpszebzmhvp"));

// 46
const permutation = (nums) => {
  // const res = [];
  // if (arr.length === 1) return [[...arr]];
  // for (let d of arr) {
  //   const firstEl = arr.shift();
  //   const perms = permutation(arr);
  //   for (let perm of perms) {
  //     perm.push(firstEl);
  //   }
  //   res.push(...perms);
  //   arr.push(firstEl);
  // }
  // return res;
  const len = nums.length;
  const res = [];
  recursive2(nums, 0, len - 1);
  return res;
  function recursive2(num, start, end) {
    if (start === end) {
      res.push([...num]);
    } else {
      for (let i = start; i <= end; i++) {
        [nums[start], nums[i]] = [nums[i], nums[start]];
        recursive2(num, start + 1, end);
        [nums[start], nums[i]] = [nums[i], nums[start]];
      }
    }
  }
};
// console.log(permutation([1, 2, 3]));

// 994
var orangesRotting = function (grid) {
  let rotten = new Set();
  const fresh = new Set();

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 2) {
        rotten.add(i + "_" + j);
      } else if (grid[i][j] === 1) {
        fresh.add(i + "_" + j);
      }
    }
  }

  const directions = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];
  let minutes = 0;
  while (fresh.size > 0) {
    const newlyInfected = new Set();
    rotten.forEach((r) => {
      console.log(r);
      const rottenRow = +r.split("_")[0];
      const rottenCol = +r.split("_")[1];
      directions.forEach((d) => {
        const row = rottenRow + d[0];
        const col = rottenCol + d[1];
        console.log({ row, col });
        if (fresh.has(row + "_" + col)) {
          fresh.delete(row + "_" + col);
          newlyInfected.add(row + "_" + col);
        }
      });
    });
    if (newlyInfected.size === 0) return -1;
    rotten = new Set(newlyInfected);
    minutes++;
  }
  return minutes;
};

// console.log(
//   orangesRotting([
//     [2, 1, 1],
//     [1, 1, 0],
//     [0, 1, 1],
//   ])
// );

var reverseOnlyLetters = function (s) {
  let i = 0,
    j = s.length - 1;
  let arr = s.split("");
  while (i < j) {
    const charCode1 = arr[i].toLowerCase().charCodeAt();
    const charCode2 = arr[j].toLowerCase().charCodeAt();
    if (97 > charCode1 || charCode1 > 122) {
      console.log({ charCode1, charCode2 });
      i++;
    }
    if (97 > charCode2 || charCode2 > 122) {
      console.log({ charCode1, charCode2 });
      j--;
    }
    console.log({ charCode1, charCode2 });
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i++;
    j--;
  }
  return arr.join("");
};

// console.log(reverseOnlyLetters("a-bC-dEf-ghIj"));

var characterReplacement = function (s, k) {
  let left = 0;
  let maxCharCount = 0;
  const alphabetArr = new Array(26).fill(0);
  let maxLen = 0;

  for (let i = 0; i < s.length; i++) {
    alphabetArr[s[i].charCodeAt() - 65] += 1;
    console.log(alphabetArr);
    maxCharCount = Math.max(maxCharCount, alphabetArr[s[i].charCodeAt() - 65]);
    while (i - left + 1 - maxCharCount > k) {
      alphabetArr[s[left++].charCodeAt() - 65] -= 1;
    }
    maxLen = Math.max(maxLen, i - left + 1);
  }
  return maxLen;
};
// console.log(characterReplacement("BAAA", 0));

var minimumTotal = function (triangle) {
  const dp = new Array(triangle.length + 1).fill(0);

  for (let i = triangle.length - 1; i >= 0; i--) {
    for (let j = 0; j < triangle[i].length; j++) {
      dp[j] = triangle[i][j] + Math.min(dp[j] + dp[j + 1]);
      console.log(dp);
    }
  }
  console.log(dp);
};

console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]));

function maxElement(n, maxSum, k) {
  // Write your code here
  let sum = 0;
  const res = new Array(n).fill(0);
  res[k] = 1;
  sum = 1;
  let init = 1;
  let endInit = 1;
  while (sum < maxSum) {
    let start = k - init;
    let end = k + endInit;
    if (start < 0) start = 0;
    if (end >= n) end = n - 1;
    for (let i = start; i <= end; i++) {
      res[i] += 1;
    }
    sum += end - start + 1;
    init++;
    endInit++;
    console.log(res, sum);
  }
  return res[k] - 1;
}

console.log(maxElement(4, 4, 3));

const perm = (arr) => {
  const set = [...new Set(arr)];
  let min = Number.MAX_VALUE;
  let max = Number.MAX_VALUE;
  let sum = 0;
  set.forEach((a) => {
    min = Math.min(a, min);
    max = Math.max(a, max);
  });
  const permutations = [];
  helper(0);
  console.log(permutations);

  function helper(start) {
    let end = set.length - 1;
    if (start === end) {
      permutations.push([...set]);
    } else {
      for (let i = start; i <= end; i++) {
        [set[i], set[start]] = [set[start], set[i]];
        helper(start + 1);
        [set[i], set[start]] = [set[start], set[i]];
      }
    }
  }
};
console.log(perm([2, 2, 4, 4, 6, 6]));
