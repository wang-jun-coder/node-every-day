// const asyncFunc =async function() {
//     return `hello world`;
// };
// const customCallbackify = fn => {
//     // 需判断 promise 和 async 函数
//     // if(!fn || !(fn instanceof Promise)) throw new TypeError(`fn must be a promise, but now is: ${fn}`);
//     return function (...args) {
//         let cb = args.pop();
//         if (!cb && typeof cb !== 'function') {
//             args.push(cb);
//             cb = null;
//         }
//         if (!cb) return;
//         try {
//             fn.apply(null, args).then(value => cb(null, value)).catch(e => cb(new Error(e), null));
//         } catch (e) {
//             cb(e, null);
//         }
//     }
// };
// const cbFn = customCallbackify(asyncFunc);
// cbFn((err, value) => {
//     console.log(`custom callbackify: ${err} ${value}`);
// });



const promisify = function (fn) {
    if (!fn || typeof fn !== "function") throw new TypeError('fn must be a function');
    return function (...args) {
        return new Promise((resolve, reject) => {

            args.push((err, ...res) => {
                if (err) return reject(err);
                if (!res || res.length <= 1) {
                    return resolve(res || res[0]);
                }
                return resolve(res);
            });
            fn.apply(this, args);
        });
    }
};

const fs = require('fs');
// const path = '.';
const path = '';    // { [Error: ENOENT: no such file or directory, stat ''] errno: -2, code: 'ENOENT', syscall: 'stat', path: '' }
const stat = promisify(fs.stat);
stat(path).then(res => {
    console.log(res);
}).catch(e => {
    console.log(e);
});

// util.inherits()
// ctor.super_ = superCtor;
// Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
