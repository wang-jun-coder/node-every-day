
// this 指向
exports.name = 'exports';
global.name = 'global';
const a = {
    name: 'a',
    fn0() {
        return this.name;   // 等同 普通方式, 非严格模式, this 指向 global
    },
    fn1: function() {
        return this.name;   // 普通模式, this 指向 global
    },
    fn2: () => {
        return this.name;   // 箭头函数的 this 指向声明时的 this, 此处为 exports/module.exports
    }

};
const fn0 = a.fn0;
const fn1 = a.fn1;
const fn2 = a.fn2;
console.log(`${a.fn0()} ${fn0()}`); // a global
console.log(`${a.fn1()} ${fn1()}`); // a global
console.log(`${a.fn2()} ${fn2()}`); // exports exports
console.log(`${fn1.call(a)}`);      // a
console.log(`${fn2.call(a)}`);      // exports


// 不能做构造函数
const foo = function foo() {};
const bar = () => {};

const f1 = new foo();
// const b1 = new bar();   // TypeError: bar is not a constructor


// arguments 对象
const processArguments = arguments; // 执行本文件时的 arguments 参数
const func1 = function () {
    console.log(arguments);
};
const func2 = (...args) => console.log(args);
const func3 = () => console.log(arguments === processArguments); // 箭头函数内部没有 arguments 对象, 会取得外层 argument

func1(1, 2, 3);         // { '0': 1, '1': 2, '2': 3 }
func2(1, 2, 3);   // [ 1, 2, 3 ]
func3(1, 2, 3);         // true


{
    // 块级作用域内, 在此处没有 arguments 对象, 函数内部取时报错
    const func4 = () => console.log(arguments);     // ReferenceError: arguments is not defined
    // func4(1, 2, 3);
    const arguments = null; // 使用 const 劫持当前块级作用域, 使得上层作用域 arguments 失效
}


const generator1 = function* () {
    yield 4;
    yield 5;
    yield 6;
};
const gen1 = generator1();
const generator2 = function* () {
    yield 1;
    yield 2;
    yield 3;
    yield* gen1;
    yield 7;
};
const gen2 = generator2();

let next = gen2.next();
while (!next.done) {
    console.log(next.value);    // 依次输出: 1 2 3 4 5 6 7
    next = gen2.next();
}
