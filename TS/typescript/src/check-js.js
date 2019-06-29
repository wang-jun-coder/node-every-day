
// checkJs 时, 若类型可推断, 则推断, 不能推断时, 可通过 JSDoc 指定
/** @type {number} */
let x; // let x: number
x = 0;
//x = false; // 不能将类型“false”分配给类型“number”。ts(2322)

// 属性的推断来自于类内的赋值语句
// 若构造函数内未定义类型, 则类型将是所有类型的联合类型
class C {
  constructor() {
    this.constructorOnly = 0; // 锁定 number 类型
    this.constructorUnknow = undefined; // 未指定, 后续类型联合
  }
  method() {
    // this.constructorOnly = false; // 不能将类型“false”分配给类型“number”。ts(2322)
    this.constructorUnknow = 'plunkbat'; // (property) C.constructorUnknow: string | undefined
    this.methodOnly = 'ok'; // (property) C.methodOnly: string | undefined
  }
  method2() {
    this.methodOnly = true; // (property) C.methodOnly: string | boolean | undefined
  }
}

// 还可以通过 JSDoc 声明类型, 不需要在构造函数赋值
class C1 {
  constructor() {
    /**@type {number | undefined} */
    this.prop = undefined;
    /**@type {number | undefined} */
    this.count;
  }
}
let c1 = new C1();
c1.prop = 0;
//c1.count = 'string'; //不能将类型“"string"”分配给类型“number | undefined”。ts(2322)

// 构造函数等同于类
function C2() {
  // @ts-ignore
  this.constructorOnly = 0;
  // @ts-ignore
  this.constructorUnknown = undefined;
}
C2.prototype.method = function() {
  // this.constructorOnly = false; // 不能将类型“false”分配给类型“number”。ts(2322)
  this.constructorUnknown = 'plunkbat'; // (property) C2.constructorUnknown: string | undefined
}

// 支持 CommonJS 模块
const fs = require("fs");
/** 
 * @param f {string}
 */
module.exports.readFile = function(f) {
  return fs.readFileSync(f);
}

// 类, 函数, 对象字面量是命名空间
class C3 {}
C3.D = class {}
function Outer() {
  // @ts-ignore
  this.y = 2;
}
Outer.Inner = function() {
  // @ts-ignore
  this.yy = 2;
}
// 创建简单的命名空间
const ns = {};
ns.C = class{};
ns.func = function(){};

const ns1 = (function(n){
  return n || {};
})();
// @ts-ignore
ns1.CONST = 1;

const assign = assign || function() {};
assign.extra = 1;

// 字面量是开放的, 但可以通过 JSDoc 限定
const obj = {a : 1};
obj.b = 2;
/** @type {{a: number}} */
const obj2 = {a : 1};
//obj2.b = 2; //类型“{ a: number; }”上不存在属性“b”。ts(2339)

// undefined null 和空数组的类型 是 any 或 any[]
function Foo(i = null) {
  if(!i) i =1;
  let j = undefined;
  j = 2;
  //@ts-ignore
  this.l = [];
}
const f = new Foo();
f.l.push(undefined);
f.l.push("end");

// 函数参数默认可选, 但是过多参数会报错
function bar(a, b) {
  console.log(`${a} ${b}`);
}
bar();
bar(1);
bar(1, 2);
//bar(1, 2, 3); // 应有 0-2 个参数，但获得 3 个。ts(2554)

// 可以通过 JSDoc 注解移除规则
/** 
 * @param {string} [somebody] - somebody's name
*/
function sayHello(somebody) {
  if(!somebody) {
    somebody = 'John Doe';
  }
  console.log(`hello ${somebody}`);
}

// 由 arguments 推断出的 var-args 参数声明
/**
 * @param {...number} args
 */
function sum(/* numbers */) {
  let total = 0;
  for(let i=0; i<arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}
sum(1);
// sum(1, 'ss'); // 类型“"ss"”的参数不能赋给类型“number”的参数。ts(2345)

// 未指定参数类型默认 any
import { Component } from 'react'
import { func } from '_@types_prop-types@15.7.1@@types/prop-types';

/**
 * @augments {Component<{a: number}>}
 */
class MyComponent extends Component {
    //@ts-ignore
    render() {
        // this.props.b; // 类型“Readonly<{ a: number; }> & Readonly<{ children?: ReactNode; }>”上不存在属性“b”。ts(2339)
    }
}


let x1 = []; // let x1: any[]
x1.push(1);
x1.push('string');

/** @type{Array.<number>} */
let y1 = [];
y1.push(1);
//y1.push('string'); // 类型“"string"”的参数不能赋给类型“number”的参数。ts(2345)

// 在函数中调用
// 泛型函数的调用使用 arguments 来推断参数, 缺少推断源, 默认 any
let p = new Promise((resolve, reject) => reject({}));
p; //let p: Promise<any>


// 已支持的 JSDoc 注解
// @type
// @param (or @arg or @argument)
// @returns (or @return)
// @typedef
// @callback
// @template
// @class (or @constructor)
// @this
// @extends (or @augments)
// @enum

// @type 
/** @type {string} */
let s; // let s: string
/** @type {Window} */
let win; // let win: Window
/** @type {Promise<string>} */
let promiseString; //let promiseString: Promise<string>

/** @type {boolean | string} */
let bs; // let bs: string | boolean

/** @type {number[]} */
let ns;
/** @type {Array.<number>} */
let nds;
/** @type {Array<number>} */
let nas;
/** @type {{a: string, b: number}} */
let obj3; // let obj3: {a: string;b: number;}
/** @type { Object.<string, number>} */
let strToNum; // let strToNum: {[x: string]: number;}
/** @type {Object.<number, object>} */
let arrayLike; // let arrayLike: {[x: number]: any;}
/** @type {function(string, boolean):number} */
let sbn; // let sbn: (arg0: string, arg1: boolean) => number
/** @type {(s:string, b:boolean)=>number} */
let sbn2; // let sbn2: (s: string, b: boolean) => number
/** @type {Function} */
let fn; // let fn: Function

// 转换
let numOrStr = Math.random() < 0.5 ? "hello" : 100; // let numOrStr: string | number
let typeAssertedNum = /** @type {number} */(numOrStr); // let typeAssertedNum: number

// 导入类型
/**
 * //@param p { import("./a").pet} // 文件不存在, 注解报错
 */
function walk(p) {
  console.log(`walking ${p.name}...`);
}
// 类型声明
/** 
 * @typedef {{name: string}} Pet
*/
/** @type Pet */
let myPet = {};
myPet.name = 'pet';
// myPet.age = 12; // 类型“{ name: string; }”上不存在属性“age”。ts(2339)


// @param 和 @returns
/**
 *
 * @param {string} p1 - a string param
 * @param {string=} p2 - an optional param
 * @param {string} [p3] - another optional param
 * @param {string} [p4="test"] - an optional param with default value
 * @param {object} p5 - an object param
 * @param {string} p5.str - an object param str property
 * 
 * @return {string} this is return value
 */
function stringStringString(p1, p2, p3, p4, p5) {
  return '';
}
/**
 * @returns {{a: string, b: number}} 
 */
function ab() { return {a:'s', b:1}};

// @typedef, @callback @param

/** 
 * @typedef {Object} SpecialType - 创建 SpecialType类型
 * @property {string} prop1 
 * @property {number} prop2 
 * @property {number=} prop3
 * @property {number} [prop4] 
 * @property {number} [prop5=42] 
 */
/**@type SpecialType */
let specialTypeObject; // let specialTypeObject: SpecialType

// @callback @typedef
/** 
 * @callback Predicate
 * @param {string} data
 * @param {number} [index]
 * @returns {boolean}
 */
/** @type {Predicate} */
const ok = s => !(s.length %2);

///** @type {{prop1: string, prop2:number, prop3?:boolean}} SpecialType1*/
///** @type {(data: string, index?:number)=>boolean} Predicate1*/

//使用 @template 声明泛型

/**
 * @template T
 * @param {T} x 
 * @return {T}
 */
function id(x){return x};

// 约束泛型
/** 
 * 
 * @template {string} K  - K must be a string or string literal
 * @template {{serious():string}} Seriousalizable - must have a serious methor
 * @param {K} key
 * @param {Seriousalizable} obj
 */
function seriousalize(key, obj) {

}

// @constructor
// 通过 this 推断都早函数
/** 
 * @constructor
 * @param {number} data
*/
function C4(data) {
  this.size = 0;
  //this.initalize(data); // (method) C4.initalize(data: string): void
}
/** 
 * @param {string} data;
*/
C4.prototype.initalize = function(data) {

}

// @this, 可以指定上下文类型
/** 
 * @this {HTMLElement}
 * @param {string} e
*/
function callbackForLater(e) {
  this.nodeValue = e;
}

// @extends, 继承基类无处指定参数类型时
/**  
 * @template T
 * @extends {Set<T>}
*/
class SortableSet extends Set {

}

// @enum 指定枚举
/** @enum {number} */
const Color = {
  Red: 0,
  Green: 1,
  Yellow: 2
}

// @enum 与 Ts 不同, 更简单更灵活
/** @enum {function(number):number} */
const Math = {
  add1: n=>n+1,
  id: n=> -n,
  sub1: n=>n-1
}