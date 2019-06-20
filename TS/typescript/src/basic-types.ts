// 基本类型的声明

// boolean
let isDone: boolean = false;


// number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// string
let color: string = 'blue';
color = 'red';
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `hello, my name is ${ fullName }.
I'll be ${ age + 1 } years old next month/`;


// array
let list: number[] = [1, 2, 3];
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

let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
// x = [10, "hello"]; // Error
console.log(x[0].substr(1)); // OK
// console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'

x[2] = 'world';
