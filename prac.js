let array = [1, 2, 2, 3, 5, 6];
max = array[0];
min = array[0];

for (let i = 0; i < array.length; i++) {
  if (max < array[i]) {
    max = array[i];
  } else if (min < array[i]) {
    min = array[i];
  }
}

console.log(max);
console.log(min);


