let arr = [1, 2];

// const doubles = arr.map((n) => n * 2);
// console.log(doubles); // return's the a updated copy of the origial arr

// const filtering = arr.filter((n) => n !=1 );
// console.log(filtering);// return's the filtered values only

// const sum = arr.reduce((total, n) => total + n, 0); // 2 params(1st callback funciton, 2nd 0 = where to start from)
// console.log(sum);// return's the sum

// const user = arr.find((a) => a == 1);
// console.log(user);//return's the actual value

// const check = arr.some((n) => n === 3);
// console.log(check);// return's bool
// // all of these can't alter the values of the original element

// const [whatever, ever] = [1, 2, 3];
// console.log(ever, whatever);

// const obj1 = {1: "name", 2: "birthdate", 3: 3};
// const num1 = {...obj1};
// console.log(num1);

// const obj2 = {3: 4, 5: "piyush"};
// const obj3 = {...obj2, ...obj1};
// console.log(obj3);

// const obj3 = [{"1": "piyush", 2: "khadka", "chhetri": 4},
//             {4: 5, 5: "piyush", 6: "chhetri"}];
// const obj4 = obj3[0];
// console.log(obj4.chhetri)
// console.log(obj3[0].1); // this doesnt work as well
// //numbers cant be accessed with using . notation, only strings can be.

// obj3.map((item) =>  {
//     Object.values(item).map((values) => console.log(values));
// })
//Object.values are for key with numbers.

// ... is for combining, removing the rested arrays and obj.
// having same key, overwrites the latest key value

// const getData = async() => {
//     try{
//         const response = await fetch(url);
//         const data = await response.json();
//         return data;
//     }catch(err){
//         console.error(err);
//     }
// };

// const status = isLoggedIn ? "Welcome Back" : "Please Sign in";

// {data && data.map((n, index)=> <div key= {index}>{index + 1} : {n}</div>)}

// const greeting = `hello, ${user.name}`;

// const cart = [
//     {
//         id: 1,
//         name: "piyush",
//         age: 7
//     },
//     {
//         id: 2,
//         name: "luna",
//         age: 11
//     }
// ]

// const updatecart = cart.map((item) => item.id === 1 ? {...item, age : 24} : item);
// console.log(updatecart);
