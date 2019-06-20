// 基本类型的声明
// boolean
let isDone = false;
// number
let decimal = 6;
let hex = 0xf00d;
let binary = 0b1010;
let octal = 0o744;
// string
let color = 'blue';
color = 'red';
let fullName = `Bob Bobbington`;
let age = 37;
let sentence = `hello, my name is ${fullName}.
I'll be ${age + 1} years old next month/`;
// array
let list = [1, 2, 3];
// let list: Array<number> = [1, 2, 3];
// tuple
// let x: [string, number];
// x = ['hello', 10];
// // x = [10, 'hello']; // error
//
// console.log(x[0].substr(1));
// // console.log(x[1].substr(1)); // error
//
// x[2] = 'world';
let x;
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
// x = [10, "hello"]; // Error
console.log(x[0].substr(1)); // OK
// console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
x[2] = 'world';
