
// case1 不稳定, 手动可重现
// setTimeout(() => console.log('timeout'));
// setImmediate(() => console.log(`immediate`));


// case2 稳定, timeout 先出现
// setTimeout(() => console.log('timeout'));
// setImmediate(() => console.log(`immediate`));
// const start = Date.now();
// while (Date.now() - start < 10) {
//
// }


/**
 * case1 case2
 *
 * 1. setTimeout, setImmediate 分别注册在下轮循环的 timer 和 check 阶段
 * 2. 若当前执行耗时超过 setTimeout 的最小时间阈值, 进入下轮 timer 阶段, timeout 输出
 * 3. 若当前执行耗时未超过 setTimeout 的最小时间阈值, 进入下轮 timer 阶段, timeout 不输出
 * 4. 经过下轮循环 check 阶段 immediate 输出
 * */



// watch -n 0.1 node test.js
// case3 发现不稳定
// setImmediate(() => {
//     setImmediate(() => console.log(`setImmediate: immediate in callback`));
//     setTimeout(() => console.log('setImmediate: timeout in callback'));
// });


// case4 稳定, setTimeout 先输出
// setImmediate(() => {
//     setImmediate(() => console.log(`setImmediate: immediate in callback`));
//     setTimeout(() => console.log('setImmediate: timeout in callback'));
//
//     // 打开本段注释, setTimeout 首先输出, 并稳定
//     const start = Date.now();
//     while (Date.now() - start < 10) {
//
//     }
// });


/**
 * case3 case 4
 *
 * 1. setImmediate 回调处于 check 阶段, 向下轮循环 timer check 阶段分别注册事件
 * 2. 若当前执行耗时超过 setTimeout 的最小时间阈值, 进入下轮 timer 时 timeout 输出
 * 3. 若当前执行耗时未超过 setTimeout 的最小时间阈值, 进入下轮 timer 时 timeout 不输出
 * 4. 经过下轮循环 check 阶段 immediate 输出
 *
 * */


// watch -n 0.1 node test.js
// case5 发现不稳定(node v8.9.1),  v10.16.0 稳定 immediate 先输出
// setTimeout(() => {
//     setImmediate(() => console.log(`setTimeout: immediate in callback`));
//     setTimeout(() => console.log('setTimeout: timeout in callback'));
// });


// watch -n 0.1 node test.js
// case6 稳定, immediate 先输出
// setTimeout(() => {
//
//     setImmediate(() => console.log(`setTimeout: immediate in callback`));
//     setTimeout(() => console.log('setTimeout: timeout in callback'));
//
//     // 打开本段注释, immediate 首先输出, 并稳定 为什么?????
//     const start = Date.now();
//     while (Date.now() - start < 10) {
//
//     }
// });

/**
 * case5 case6
 *
 * 我的默认 node 版本是 8.9.1, 一度让我认为之前的推论是错误的
 *
 * 1. setTimeout 进入 timer 阶段, 分别注册回调至 下轮的 timer 阶段和 check 阶段,(此处,我认为的下轮循环, 是指本阶段结束后的循环)
 * 2. 进入 check 阶段, 输出 immediate
 * 3. 进入 timer 阶段  输出 timeout , 或者时间未达到, 进入下下轮
 * */


// case7
// setTimeout(() => {
//
//     setImmediate(() => {
//         console.log(`setImmediate`);
//         process.nextTick(() => console.log(`setImmediate nextTick`));
//     });
//     setTimeout(() => {
//         console.log(`setTimeout`);
//         process.nextTick(() => console.log(`setTimeout nextTick`));
//     })
// });
