// let nums = [1, 2, 1];
// let ans = [...nums];
// for (let i = 0; i < nums.length; i++) {
//   ans.push(nums[i]);
// }

// console.log(ans);

// let nums = [2, 5, 1, 3, 4, 7]; // 2 3 5 4 1 7
// let n = 3;
// let ans = [];
// for (let i = 0; i < n; i++) {
//   ans.push(nums[i], nums[i + n]);
// }

// console.log(nums);

let nums = [1, 1, 0, 1, 0, 1, 1];
let store = 0;
let compare = 0;
let myMap = new Map();

for (let i = 0; i < nums.length; i++) {
  if (nums[i] == 1) {
    store++;
  }
  if (nums[i] == 0 || i === nums.length - 1) {
    if (compare <= store) {
      compare = store;
    }
    store = 0;
  }
}
console.log(compare);
