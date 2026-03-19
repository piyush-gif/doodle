let arr = [1, 2, 3, 4, 5, 6];
let target = 5;
let left = 0;
let right = arr.length - 1;
while (left <= right) {
  let mid = Math.floor((right + left) / 2);
  if (target === arr[mid]) {
    console.log("found it!");
    break;
  } else if (target > arr[mid]) {
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}
