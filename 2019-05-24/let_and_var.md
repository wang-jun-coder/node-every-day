## let 和 var 的区别

### 变量提升与暂时性死区
```js
console.log(a);     // undefined
var a = 3;
console.log(a);     // 3

console.log(b);     // ReferenceError: b is not defined
let b = 2;
console.log(b);     // 2

```
**var 存在变量提升，let、const 不会进行提升，存在暂时性死区**

### 函数作用域与块级作用域

```js
    let t = true;
    if (t) {
        let a = 1;
        var b = 2;
    }
    console.log(a);     // ReferenceError: a is not defined
    console.log(b);     // 2
```
**var 是函数作用域， let、const 是块级作用域**

### 重复声明
```js
console.log(a);     // undefined
var a = 1;
console.log(a);     // 1
var a;
console.log(a);     // 1
a = 2;
console.log(a);     // 2
var a = 3;
console.log(a);     // 3

let b = 1;
let b = 2;      // SyntaxError: Identifier 'b' has already been declared
console.log(b);
```
**var 可以重复声明，let、const 不可以重复声明**


### for 与 let
```js
for (var i = 0; i < 10; i++) {
    setTimeout(() => console.log(i), 100);
}
// 10 10 10 10 10 10 10 10 10 10

for (var k = 0; k < 10; k++) {
    (l => {
        setTimeout(() => console.log(l), 100);
    })(k)
}
// 0 1 2 3 4 5 6 7 8 9

for (let j = 0; j < 10; j++) {
    setTimeout(() => console.log(j), 100);
}
// 0 1 2 3 4 5 6 7 8 9
```
**for 循环头部的 let 声明, 每次迭代都会重新声明, 且每个迭代都会使用上一个迭代结束时的值来初始化这个变量**

### 作用域劫持
```js

(function demo1() {
    for (var i = 0; i < 3; i++) {
        console.log(i);             // 0
        var i = 4;                  // 修改了循环的 i 值, 此处仅执行一次
        console.log(i);             // 4
    }

})();

(function demo2() {
    for (var i = 0; i < 3; i++) {
        // console.log(i);          // ReferenceError: i is not defined, i 的暂时性死区
        let i = 4;                  // let 劫持了块级作用域, 该块级作用域以 此处定义的 i 为准
        console.log(i);             // 4 4 4
    }

})();

(function demo3() {
    for (let i = 0; i < 3; i++) {   // 循环的 let 定义的作用域
        // console.log(i);          // ReferenceError: i is not defined
        let i = 4;                  // let 劫持了块级作用域, 该块级作用域以 此处定义的 i 为准
        console.log(i);             // 4 4 4
    }

})();

(function demo4() {
    for (let i = 0; i < 3; i++) {   // 循环的 let 定义的作用域
        // var i = 4;                  // SyntaxError: Identifier 'i' has already been declared, var 为函数作用域, 不能劫持块级作用域
        console.log(i);             // 0 1 2
    }

})();

(function demo5() {
    let i = 1;
    {
        // console.log(i);    // ReferenceError: i is not defined, 下面的 let i 劫持了本块级作用域, 本作用域内, 以下面的 i 为准备
        let i = 2;
        console.log(i);     // 2
    }
    console.log(i);         // 1
})();

```
