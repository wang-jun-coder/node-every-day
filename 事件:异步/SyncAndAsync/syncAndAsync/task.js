const fs = require('fs');

// 置于 timer 阶段, 避免 log 不稳定
// fs.readFile('index.js', () => {
// setTimeout(() => {
//     console.log(`begin`);
//
//     // 追加次轮循环, 若本轮循环耗时低于 setTimeout 最小时间, 则回调不执行, 等待某次循环达到条件执行
//     setTimeout(() => {
//         console.log(`setTimeout`);
//     });
//     // 追加次轮循环, 次轮循环到 check 阶段执行
//     setImmediate(() => {
//         console.log(`setImmediate`);
//     });
//
//     process.nextTick(() => {
//         console.log(`process.nextTick`);
//     });
//
//     Promise.resolve().then(() => {
//         console.log(`Promise.resolve().then`);
//     }).then(() => {
//         console.log(`Promise.resolve().then().then()`);
//     });
//
//     console.log(`end`)
// });


// setTimeout(() => {
//     setTimeout(() => console.log('setTimeout: timeout in callback'));
//     setImmediate(() => console.log(`setTimeout: immediate in callback`));
//     // setTimeout: immediate in callback
//     // setTimeout: timeout in callback
//     // const start = Date.now();
//     // while (Date.now() - start < 100) {
//     //
//     // }
// });

//
// setTimeout(() => console.log('setTimeout: timeout in callback'));
// setImmediate(() => console.log(`setTimeout: immediate in callback`));
// const start = Date.now();
// while (Date.now() - start < 10) {
//
// }


setTimeout(() => console.log(`setTimeout1`));
setTimeout(() => {
    console.log(`setTimeout2`);
    Promise.resolve().then(() => console.log(`promise1`));
    process.nextTick(() => console.log(`nextTick1`));
    console.log(`setTimeout2 end`);
});

setTimeout(() => console.log(`setTimeout3`));
Promise.resolve().then(() => console.log(`promise2`));
process.nextTick(() => console.log(`nextTick2`));
/** node v8.9.1
 nextTick2
 promise2
 setTimeout1
 setTimeout2
 setTimeout2 end
 setTimeout3
 nextTick1
 promise1
 */
/** node v12.3.1
 nextTick2
 promise2
 setTimeout1
 setTimeout2
 setTimeout2 end
 nextTick1
 promise1
 setTimeout3
 * */
