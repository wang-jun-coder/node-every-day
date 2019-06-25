// var, 与 js 保持一致, 变量提升, 函数作用域等
import get = Reflect.get;

var a:number = 10;
function f():string {
    var message:string = 'hello, world';
    return message;
}

// let & const 与 es6 一致
const hello:string = "hello";
// 块级作用域
function f1(input:boolean) {
    const a:number = 100;
    if (input) {
        let b:number = a +1;
        return  b;
    }
    //return  b; // Cannot find name 'b'.
}


// 重定义与屏蔽
// 这个函数中的所有 x声明 引用相同的 x
function f2(x:any) {
    var x;
    var x;
    if (true) {
        var x;
    }
}
// 块级作用域变量的获取
function f3() {
    let getCity = null;
    if (true) {
        const city = 'seattle';
        getCity = function () {
            return city;
        }
    }
    return getCity();
}


// const 声明, 但被赋值后不能再改变
const numLivesForCat = 9;
const kitty = {
    name: 'Aurora',
    numLives: numLivesForCat
};

//kitty = {} // Cannot assign to 'kitty' because it is a constant.
kitty.name = 'Rory';
kitty.numLives--; // 可设置const 属性为只读


// 解构数组
let input:[number, number] = [1, 2];
let [first, second] = input;
console.log(`${first} ${second}`); // 1, 2
// 交换变量
[first, second] = [second, first];
console.log(`${first} ${second}`); // 2, 1
// 函数参数
function f4([first, second]: [number, number]) {
    console.log(`${first} ${second}`); // 1, 2
}
f4(input);
// 剩余变量
let [, , third, ...rest] = [1, 2, 3, 4];
console.log(`${third} -- ${rest}`); // 3 -- 4
// 对象解构
let o = {
    a: 'foo',
    b: 12,
    c: 'bar'
};
let {a:a1, b} = o;
console.log(`${a1} -- ${b}`); // foo -- 12
let {a: a2, ...rest1} = o;
console.log(`${a2} -- ${JSON.stringify(rest1)}`); // foo -- {"b":12,"c":"bar"}
// 属性重命名
let {a: newName1, b: newName2}:{a: string, b: number} = o;
// 默认值
function f5(wholeObject: { a: string, b?: number }) {
    let {a, b=1001} = wholeObject;
}


// 函数声明
type C = {a:string, b?:number};
function f6({a, b}: C):void {}
function f7({a, b = 0} = {a: 'a'}) {
    console.log(`${a} ${b}`);
}
f7({a:'yes'}); // yes 0
f7(); // a 0
//f7({}); // Error:(98, 4) TS2345: Argument of type '{}' is not assignable to parameter of type '{ a: string; b?: number | undefined; }'.Property 'a' is missing in type '{}' but required in type '{ a: string; b?: number | undefined; }'.


// 展开
let first1 = [1, 2];
let second1 = [3, 4];
let bothPlus = [0, ...first1, ...second1, 5]; // [0, 1, 2, 3, 4, 5]
let defaults = {food: 'spicy', price:'$$', ambiance: 'noisy'};
let search = {...defaults, food: 'rich'};
console.log(search); // { food: 'rich', price: '$$', ambiance: 'noisy' }
search = {food: 'rich', ...defaults};
console.log(search); // { food: 'spicy', price: '$$', ambiance: 'noisy' }
// 对象展开仅包含自身可枚举属性, 比如: 展开一个对象实例, 会丢失其方法
class C1 {
    p = 12;
    s = 's';
    m() {

    }
}
let c1 = new C1();
let clone = {...c1};
console.log(`${clone.p} ${clone.s}`);
//clone.m(); // Property 'm' does not exist on type '{ p: number; }'.
