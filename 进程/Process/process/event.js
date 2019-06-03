// process 对象是 EventEmitter 的实例

// 仅正常结束程序才会回调(清空事件循环), 才会触发, 显式终止的条件，不会触发 'beforeExit' 事件. 在此回调可继续事件循环
// process.on('beforeExit', function (exitCode) {
//     console.log(`beforeExit: ${exitCode}`);
//
//     // 以下代码会导致死循环, 因为 timeout 结束后事件循环清空, 没有任务, 会触发 beforeExit 事件, 导致再次进入回调
//     // setTimeout(() => console.log(`beforeExit timeout`), 100);
// });
// 使用 process.exit() 终止进程, beforeExit 不会收到回调
// process.exit();


// // 程序正常结束或 process.exit() 均会回调, 此处无法继续事件循环
// process.on('exit', function (exitCode) {
//     console.log(`exit: ${exitCode}`);
//
//     // 本事件内无法继续循环, 所有监听回调完成后, 进程退出
//     setTimeout(() => console.log(`exit timeout`), 100); // 不会输出 log
// });


// // promise 相关 v10.12.0, promise 回调多次(resolve, resolve; resolve, reject; reject, resolve; reject, reject)
// process.on('multipleResolves', (type, promise, value) => {
//     console.log(`multipleResolves: ${type} ${promise} ${value}`);
// });
//
// new Promise((resolve, reject) => {
//     resolve(1);
//     resolve(2); // multipleResolves: resolve [object Promise] 2
//     reject(3);  // multipleResolves: reject [object Promise] 3
//     reject(4);  // multipleResolves: reject [object Promise] 4
//
// }).then(val => console.log(val));




// process.on(`unhandledRejection`, (reason, promise) => {
//     // 有新的未处理的拒绝发生
//     console.log(`unhandledRejection: ${reason}`);
// });
// process.on(`rejectionHandled`, promise => {
//     // 有未被处理的拒绝被处理了
//     console.log(`rejectionHandled: ${promise}`)
// });
//
// // 不会触发事件
// Promise.reject(`error1`).catch(e => console.log(`handle reject: ${e}`));
// // 出现未被处理的拒绝, 触发 unhandledRejection
// const p = Promise.reject(`error2`).then(val => console.log(`${val}`));
//
// // 下个循环处理掉这个拒绝, 触发 rejectionHandled
// setImmediate(() => {
//     p.catch(e => console.log(`${e}`));
// });





// process.on('uncaughtException', err => {
//     console.log(`${err}`);
// });
//
// throw new Error(`error`);
// console.log(`end`); // 依然可以输出, 因为异常被 uncaughtException 监听捕获


//
// const EventEmitter = require('events');
// process.on(`warning`, ({ name, message, stack }) => {
//    console.log(`warning: \n${name} \n${message} \n${stack}`);
// });
//
// // 人为制造一个警告
// EventEmitter.defaultMaxListeners = 1;
// const emitter = new EventEmitter();
// emitter.on('event', (e) =>console.log(`listener1: ${e}`));
// emitter.on('event', (e) =>console.log(`listener2: ${e}`));
// emitter.emit('event', `on event`);
//
// console.log(`end`);


// process.on(`warning`, ({ name, message, stack }) => {
//    console.log(`warning: \n${name} \n${message} \n${stack}`);
// });
// process.emitWarning(`error message`, `error name`);



// Begin reading from stdin so the process does not exit.
process.stdin.resume();
process.on('SIGINT', val => {
   console.log(`Received SIGINT. Press Control-D to exit. ${val}`);
});
process.on('SIGTERM', val => {
   console.log(`Received SIGTERM. ${val}`);
});
