
// 模块
const circle = require('./shape/circle');
console.log(`半径为 3 的圆的面积为: ${circle.area(3)}`);    // 半径为 3 的圆的面积为: 28.274333882308138

const Square = require('./shape/square');
const mySquare = new Square(4);
console.log(`mySquare 的面积为: ${mySquare.area()}`);         // mySquare 的面积为: 16

// 主模块
const isMain = require.main === module;
if (isMain) console.log(`main module: ${require.main.filename} `);// main module: /.../module/index.js

// 获取模块加载名
const cycleName = require.resolve('./shape/circle');
console.log(`${cycleName}`); // /.../module/index.js

// 模块加载缓存,
const Square1 = require('./shape/square'); // square.js 中的 console.log 只输出一次
const Square2 = require.cache[require.resolve('./shape/square')].exports;
console.log(`Square === Square1: ${Square === Square1}\nSquare === Square2: ${Square === Square2}`); // Square === Square1: true Square === Square2: true

// 循环导入问题
console.log(`circular load a.js and b.js begin`);
const a = require('./circular/a');
const b = require('./circular/b');
console.log(`index.js a.done = ${a.done}, b.done = ${b.done}`);
console.log(`circular load a.js and b.js end`);
/*
circular load a.js and b.js begin
a begin
b.js begin
b load a.js, a.done = false
b end
a load b.js, b.done = true
b end
index.js a.done = true, b.done = true
circular load a.js and b.js end

index.js 加载 a.js 时, a 尝试加载 b.js
但是 b.js 这时候尝试加载 a.js, 为防止死循环, 此时, b.js 只能拿到一个 a.js 的未完成的副本进行使用
b.js 完成加载后 a.js 拿到 b.js 的 exports, a.js 再完成剩余的加载
最终, 在 index.js 中 a.js 和 b.js 均完成加载
* */


// require 加载规则 -> http://nodejs.cn/api/modules.html#modules_all_together
// 文件加载 LOAD_AS_FILE(X)
const file1 = require('./fileModule/file1');        // If X is a file, load X as JavaScript text.  STOP,
console.log(`file1 is ${JSON.stringify(file1)}`);   //  file1 is {"name":"file1"}, 虽然 file1.js 存在, 但是查询到 file1 后停止

const file2 = require('./fileModule/file2');        // If X.js is a file, load X.js as JavaScript text.  STOP
console.log(`file2 is ${JSON.stringify(file2)}`);   // file2 is {"name":"file2.js"} 虽然 file2.json 存在, 但是查询到 file2.js 停止

const file3 = require('./fileModule/file3');        // If X.json is a file, parse X.json to a JavaScript Object.  STOP
console.log(`file3 is ${JSON.stringify(file3)}`);   // file3 is {"name":"file3.json"}, .node 文件未制作
// .node 插件待制作, 也会尝试加载 后缀为 .node的文件


// 目录加载, LOAD_AS_DIRECTORY(X)  ->  LOAD_INDEX(X)
// LOAD_AS_DIRECTORY(X)
// 1. If X/package.json is a file,
//     a. Parse X/package.json, and look for "main" field.
//     b. let M = X + (json main field)
// c. LOAD_AS_FILE(M)
// d. LOAD_INDEX(M)
// 2. LOAD_INDEX(X)
//
// LOAD_INDEX(X)
// 1. If X/index.js is a file, load X/index.js as JavaScript text.  STOP
// 2. If X/index.json is a file, parse X/index.json to a JavaScript object. STOP
// 3. If X/index.node is a file, load X/index.node as binary addon.  STOP


const dirModule1 = require('./dirModule/dirModule1'); // package.json -> main -> load file
console.log(`${JSON.stringify(dirModule1)}`);   // {"name":"dirModule1/index.js"}


const dirModule2 = require('./dirModule/dirModule2'); // package.json -> main -> LOAD_INDEX(main)
console.log(`${JSON.stringify(dirModule2)}`);   // {"name":"dirModule2/lib/index.js"}

const dirModule3 = require('./dirModule/dirModule3'); // package.json -> main? -> LOAD_INDEX(dir)
console.log(`${JSON.stringify(dirModule3)}`);   // {"name":"dirModule3/index.js"}  虽然也存在 index.json 但是优先级低

const dirModule4 = require('./dirModule/dirModule4'); // package.json -> main? -> LOAD_INDEX(dir)
console.log(`${JSON.stringify(dirModule4)}`);   // {"name":"dirModule4/index.json"}, addon 未准备

// 从 node_modules 目录加载, 此处已 is 模块演示
const is = require('is');
console.log(`${is.string}`);   // function (value) {return toStr.call(value) === '[object String]';}


// 从全局目录加载, 如安装的全局模块
// NODE_PATH
// $HOME/.node_modules
// $HOME/.node_libraries
// $PREFIX/lib/node


// 模块封装器

// (function(exports, require, module, __filename, __dirname) {
// // 模块的代码实际上在这里
// });
// 保持顶层变量,作用在模块范围内, 而不是全局对象
// 方便提供看似全局实际上是模块特有的变量

// 子模块可以泄露全局变量吗?
const leakGlobalVar = require('./global/leakGlobalVar');
console.log(`module: ${JSON.stringify(leakGlobalVar)}, leak: ${leak}`); // module: {"name":"leakGlobalVar.js"}, leak: this is a leak global variable

const vm1 = require('./global/vm');
console.log(vm1);       // { name: 'global/vm.js' }
console.log(leakInVm);  // this is a leak object in vm
// https://nodejs.org/docs/latest-v8.x/api/vm.html#vm_vm_runinthiscontext_code_options
//
