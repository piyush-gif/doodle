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

// let nums = [1, 1, 0, 1, 0, 1, 1];
// let store = 0;
// let compare = 0;

// for (let i = 0; i < nums.length; i++) {
//   if (nums[i] == 1) {
//     store++;
//     if (compare <= store) {
//       compare = store;
//     }
//   } else {
//     store = 0;
//   }
// }

// console.log(compare);

// ARRAY 2

let nums = [1, 1]; // [3, 2, 1]
let n = nums.length;
let seen = {};
let duplicate = -1;
let actualSum = 0;

for (let i = 0; i < n; i++) {
  let num = nums[i];
  actualSum += num;

  // Check if we've already seen this number using our object
  if (seen[num]) {
    duplicate = num;
  } else {
    seen[num] = true;
  }
}

// Mathematical sum of numbers from 1 to n
let expectedSum = (n * (n + 1)) / 2;

// The missing number is the expected sum minus the actual sum without the duplicate
let missing = expectedSum - (actualSum - duplicate);

return [duplicate, missing];
