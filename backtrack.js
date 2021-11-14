const permu = (nums) => {
  const res = [];
  nums.sort((a, b) => a - b);
  const vis = new Array(nums.length).fill(false);
  recursive([], vis);
  return res;

  function recursive(curr, vis) {
    if (curr.length === nums.length) {
      res.push([...curr]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (vis[i]) continue;
      if (i > 0 && nums[i] === nums[i - 1] && !vis[i - 1]) continue;
      vis[i] = true;
      curr.push(nums[i]);
      recursive(curr, vis);
      curr.pop();
      vis[i] = false;
    }
  }
};
console.log(permu([1, 1, 2]));

var subsets = function (nums) {
  const res = [];
  const subset = [];

  recur(0);

  function recur(startIndex) {
    if (startIndex === nums.length) {
      res.push([...subset]);
      return;
    }
    subset.push(nums[startIndex]);
    recur(startIndex + 1);
    subset.pop();
    recur(startIndex + 1);
  }

  return res;
};

console.log(subsets([1, 2, 3]));
