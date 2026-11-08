// let nums = [1, 2, 1];
// let ans = [...nums];
// for (let i = 0; i < nums.length; i++) {
//   ans.push(nums[i]);
// }

// console.log(ans);

let nums = [2, 5, 1, 3, 4, 7];
let n = 3;
let ans = [];
for (let i = 0; i < n; i++) {
  ans.push(nums[i], nums[i + n]);
}

for (let i = 0; i < n; i++) {
  let temp = nums[i + 1];
  nums[i + 1] = nums[i + n];
  nums[i + n] = temp;
}
console.log(nums);
