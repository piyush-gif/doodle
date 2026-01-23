const array = [1, 2, 3, 4, 5];
const target = 2;
let left = 0;
let right = array.length - 1;

while (left <= right) {
  let mid = Math.floor((left + right) / 2);
  if (array[mid] == target) {
    console.log(mid);
    break;
  } else if (target > array[mid]) {
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}
