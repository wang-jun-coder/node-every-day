
// 不稳定, 手动可重现
// setTimeout(() => console.log('timeout'));
// setImmediate(() => console.log(`immediate`));

// watch -n 0.1 node test.js
// 发现不稳定
// setTimeout(() => {
//     setTimeout(() => console.log('setTimeout: timeout in callback'));
//     setImmediate(() => console.log(`setTimeout: immediate in callback`));
// });

// watch -n 0.1 node test.js
// 发现不稳定
setImmediate(() => {
    setImmediate(() => console.log(`setImmediate: immediate in callback`));
    setTimeout(() => console.log('setImmediate: timeout in callback'));
});
