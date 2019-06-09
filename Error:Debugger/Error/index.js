
//************ javascript 错误 ***************
// `<EvalError>` eval 执行  出错, 该错误类型已经不再在ES5中出现了，只是为了保证与以前代码兼容，才继续保留
// eval('xxx'); //ReferenceError: xxx is not defined

// `<SyntaxError>` js 语法错误
// const i-1;      // SyntaxError: Missing initializer in const declaration

// `<RangeError>` 数组越界错误
// const array = new Array(-1); // RangeError: Invalid array length

// `<ReferenceError>` 引用错误
// const a = b;    // ReferenceError: b is not defined

// `<TypeError>` 对象类型错误
// const c = (null).c; // TypeError: Cannot read property 'c' of null

// `<URIError>` url 错误
// decodeURI('%');  // URIError: URI malformed


//****************** 操作系统错误 **************************
// 由底层操作系触发的系统错误，例如试图打开不存在的文件
// const fs = require('fs');
// fs.openSync('x.js'); // Error: ENOENT: no such file or directory, open 'x.js'

// 权限不足
// const os = require('os');
// os.setPriority(-1); //SystemError [ERR_SYSTEM_ERROR]: A system error occurred: uv_os_setpriority returned EACCES (permission denied)

// 端口占用
// const http = require('http');
// http.createServer().listen(3000);
// http.createServer().listen(3000);   // Error: listen EADDRINUSE: address already in use :::3000


// ******************* 用户自定义错误 ****************
// throw new Error('CustomError'); // Error: CustomError


// ******************* 断言错误 ****************
// const assert = require('assert');
// assert.strictEqual(1, 2, 'assert error');   // AssertionError [ERR_ASSERTION]: assert error




// 错误捕获

// error first
// const fs = require('fs');
// fs.readFile('xxx.js', (err, data) => {
//     if (err) {
//         console.log(err);   // { [Error: ENOENT: no such file or directory, open 'xxx.js'] errno: -2, code: 'ENOENT', syscall: 'open', path: 'xxx.js' }
//         return;
//     }
//     console.log(data);
// });

// try catch
// try {
//     a ++;
// } catch (e) {
//     console.log(e); //ReferenceError: a is not defined
// }

// // EventEmitter on error
// const EventEmitter = require('events');
//
// const emitter = new EventEmitter();
// emitter.on("error", error => {
//     console.log(error); // Error: Some Error
// });
// emitter.emit("error", new Error('Some Error'));

// // uncaughtException, 非常规手段
// process.on("uncaughtException", (error) => {
//     console.log(error)  // ReferenceError: i is not defined
// });
// i++;

// promise unhandledRejection(未监听 uncaughtException时有效)
// process.on("unhandledRejection", (reason, p) => {
//    console.log(`${reason} ${p}`);   // unhandledRejection [object Promise]
// });
// Promise.reject('unhandledRejection');


// 异步导致堆栈丢失
const throwError = () => {
    throw new Error();
};

const doSth = () => {
    setImmediate(() => throwError());
};

const main = () => {
    doSth();
};

main();
/**
 throw new Error();
 ^

 Error
 at throwError (/Users/wangjun/Desktop/practice/opensource/node-every-day/Error:Debugger/Error/index.js:91:11)
 at Immediate.setImmediate (/Users/wangjun/Desktop/practice/opensource/node-every-day/Error:Debugger/Error/index.js:95:24)
 at runCallback (timers.js:705:18)
 at tryOnImmediate (timers.js:676:5)
 at processImmediate (timers.js:658:5)
 * */

