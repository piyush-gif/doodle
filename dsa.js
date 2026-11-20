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

// let nums = [1, 1]; // [3, 2, 1]
// let n = nums.length;
// let seen = {};
// let duplicate = -1;
// let actualSum = 0;

// for (let i = 0; i < n; i++) {
//   let num = nums[i];
//   actualSum += num;

//   if (seen[num]) {
//     duplicate = num;
//   } else {
//     seen[num] = true;
//   }
// }
// let expectedSum = (n * (n + 1)) / 2;
// let missing = expectedSum - (actualSum - duplicate);

// return [duplicate, missing];

let nums = [8, 1, 2, 2, 3];
let compare = [];
for (let i = 0; i < nums.length; i++) {
  let count = 0;
  for (let j = 0; j < nums.length; j++) {
    if (i !== j && nums[i] > nums[j]) {
      count++;
    }
  }
  compare.push(count);
}

console.log(compare);
