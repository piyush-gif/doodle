// const array = [1, 2, 3, 4, 5];
// const target = 2;
// let left = 0;
// let right = array.length - 1;

// while (left <= right) {
//   let mid = Math.floor((left + right) / 2);
//   if (array[mid] == target) {
//     console.log(mid);
//     break;
//   } else if (target > array[mid]) {
//     left = mid + 1;
//   } else {
//     right = mid - 1;
//   }
// }

let a = "";
let size = 5;

for (let i = 0; i < size; i++) {
  a = "";
  for (let j = i; j < size; j++) {
    a += " ";
  }
  for (let k = 0; k < i; k++) {
    a += "*";
  }
  for (let l = 0; l < i; l++) {
    a += "*";
  }
  console.log(a);
}

for (let i = 0; i < size; i++) {
  a = "";
  for (let j = 0; j < i; j++) {
    a += " ";
  }
  for (let k = i; k < size; k++) {
    a += "*";
  }
  for (let l = i; l < size; l++) {
    a += "*";
  }
  console.log(a);
}
