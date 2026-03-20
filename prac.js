// let arr = [1, 2, 3, 4, 5, 6];
// let target = 5;
// let left = 0;
// let right = arr.length - 1;
// while (left <= right) {
//   let mid = Math.floor((right + left) / 2);
//   if (target === arr[mid]) {
//     console.log("found it!");
//     break;
//   } else if (target > arr[mid]) {
//     left = mid + 1;
//   } else {
//     right = mid - 1;
//   }
// }

let sudoku = [3, 1, 2, 6, 4, 5, 9, 7, 8];
let size = sudoku.length;
let main = [];

console.log(sudoku);
const shift = (num) => {
  let shifted = [];
  for (let i = num; i < size; i++) {
    shifted.push(sudoku[i]);
  }
  for (let j = 0; j < num; j++) {
    shifted.push(sudoku[j]);
  }
  sudoku = shifted;
  return shifted;
};

const sudokusolved = () => {
  for (let i = 0; i < size; i++) {
    if (i === 2 || i === 5) {
      main.push(shift(1));
    } else {
      main.push(shift(3));
    }
  }
};

sudokusolved();
console.log(main);
