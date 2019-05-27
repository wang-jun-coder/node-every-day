## Promise

### promise 简单实用

```js
const sthPromise = () => {
    return Promise.resolve('sthPromise');
};

// 无返回值
Promise.resolve()
    .then(() => {
        sthPromise(); // sthPromise 会执行, 但是此处没有返回值, 链式调用拿不到值
    })
    .then(value => {
        console.log(value)          // undefined
    })
    .catch(e => console.log(e));

// 返回一个 Promise
Promise.resolve()
    .then(() => {
        return sthPromise();
    })
    .then(value => {
        console.log(value)          // sthPromise
    })
    .catch(e => console.log(e));

// 返回基本值
Promise.resolve()
    .then(() => {
        return 'sthPromise';
    })
    .then(value => {
        console.log(value)          // sthPromise
    })
    .catch(e => console.log(e));
```

### then 第二个参数 和 catch 的区别
```js
// then 的第二个参数和 catch
Promise.resolve()
    .then(val => {
    throw new Error('test error');
}, reason => {
    console.log(`onRejected: ${reason}`); // 没有获取到 ERROR
}).catch(e => {
    console.log(`onCatch: ${e}`)    // onCatch: Error: test error
});

Promise.resolve()
    .then(() => {
        throw new Error('test error');
    })
    .then(val => {
        console.log(`onFulfilled: ${val}`);
    }, reason => {
        console.log(`onRejected: ${reason}`); // onRejected: Error: test error
    }).catch(e => {
    console.log(`onCatch: ${e}`)    // onCatch: Error: test error
});

Promise.resolve()
    .then(() => {
        throw new Error('test error');
    }).catch(e => {
    console.log(`onCatch: ${e}`)   // onCatch: Error: test error
});
```

**一般认为 catch 是 then(nul, onRejected) 的语法糖。then(onFulfilled, onRejected) 中，onFulfilled 若抛出异常，onRejected 无法捕获，但是 catch 可以捕获到**

### promise 构造函数中是同步执行
```js
const p1 = new Promise((resolve, reject) => {
    console.log(`on new Promise`);
    resolve();
});
// console.log(`on new Promise`);
```

### promise 的执行顺序
```js
setTimeout(() => {
    console.log(1);
});

new Promise((resolve,reject) => {
    console.log(2);
    resolve();
    console.log(3);
}).then(() => {
    console.log(4);
});
console.log(5);
// 2 3 5 4 1
```
**Promise 回调时是一个微任务，并非同步回调，会在事件循环的下一阶段前执行**

### 错误优先回调 与 Promisify

```js
const fs = require('fs');
const path = `./package.json`;
fs.readFile(path, 'utf8', function (error, content) {
    // 错误优先回调, 回调函数的第一个参数表示函数调用过程中是否发生错误, 当第一个函数为 null 后后面的参数才有效
    // 错误优先回调只是一个约定, 但最好还是遵守, 便于统一代码风格
    if (error) return console.log(error);
    console.log(content);
});

// 利用错误优先回调可以简单实现一个 Promisify 函数,
const promisify = func => {
    return (...args) => {
        return new Promise((resolve, reject) => {
            func(...args, (error, data)=> {
                if (error) return reject(error);
                return  resolve(data);
            });
        });
    }
};

const readFileP = promisify(fs.readFile);
readFileP(path, 'utf8')
    .then(data => {
        console.log(data);
    })
    .catch(e => console.log(e));
```

### 尝试实现一个 Promise
* Promise 在回调 onFulfilled 或 onRejected 时是一个微任务
* then 返回的是一个新的 Promise
* Promise 执行的结果若是一个 Promise 应该链式调用
* Promise 返回值若是一个类似 Promise 的结构应该尝试执行

```js
class WJPromise {

    constructor(exector) {
        if (typeof exector !== 'function') {
            throw Error('参数错误');
        }

        // 状态
        this.status = PENDING;

        // 值
        this.value = null;
        this.reason = null;

        // 回调
        this.onFulFilledCallback = [];
        this.onRejectedCallback = [];
        this.onFinallyCallback = [];

        const resolve = value => {
            process.nextTick(() => {
                if (this.status !== PENDING) {
                    return;
                }
                this.status = FULFILLED;
                this.value = value;
                this.onFulFilledCallback.forEach(cb => {
                    cb(this.value);
                });
                this.onFinallyCallback.forEach(cb => cb());
            })
        };

        const reject = reason => {
            process.nextTick(() => {
                if (this.status !== PENDING) {
                    return;
                }
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallback.forEach(cb => {
                    cb(this.reason);
                });
                this.onFinallyCallback.forEach(cb => cb());
            })
        };

        try {
            exector(resolve, reject);
        } catch (e) {
            reject((e));
        }
    }

    then(onFulFilled, onRejected) {

        onFulFilled = onFulFilled && typeof onFulFilled === 'function' ? onFulFilled : value => value;
        onRejected = onRejected && typeof onRejected === 'function' ? onRejected : reason => {throw reason};

        // 处理返回结果,与 Promise 对接
        const resolvePromise = function (promise, ret, resolve, reject) {
            // 不能使用返回的 Promise 做结果, 会导致死循环
            if (promise === ret) throw Error('循环引用');

            // 如果返回的是一个 Promise, 获取其执行结果, 并链式调用
            if (promise instanceof WJPromise) {
                promise.then(value => {
                    resolvePromise(newPromise, value, resolve, reject);
                }, reason => reject(reason));
                return;
            }
            // 若执行结果是一个类似 Promise 的结构, 尝试对其进行调用
            if (ret && ret.then && typeof ret.then === 'function') {
                let called = false; // 使用变量控制不重复调用

                try {
                    ret.then(value => {
                        if (called) return;
                        called = true;
                        resolvePromise(newPromise, value, resolve, reject);
                    }, reason => {
                        if (called) return;
                        reject(reason);
                    });
                } catch (e) {
                    if (called) return;
                    called = true;
                    reject(e);
                }
                return;
            }
            // 如果是其他类型, 直接返回处理
            resolve(ret);
        };
        const self = this;
        let newPromise = null;


        return  newPromise = new Promise((resolve, reject)=>{
            // 当前 promise 还未返回, 加入回调等待执行
            if (self.status === PENDING) {
                this.onFulFilledCallback.push(value => {
                    try {
                        const ret = onFulFilled(value);
                        resolvePromise(newPromise, ret, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
                this.onRejectedCallback.push(reason => {
                    try {
                        const ret = onRejected(reason);
                        resolvePromise(newPromise, ret, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                })
            }
            if (self.status === FULFILLED) {
                try {
                    const ret = onFulFilled(value);
                    resolvePromise(newPromise, ret, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            }
            if (self.status === REJECTED) {
                try {
                    const ret = onRejected(reason);
                    resolvePromise(newPromise, ret, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            }
        })
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value);
        })
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        })
    }

    static all(promises) {
        return new Promise((resolve, reject) => {
            const ret = [];
            let resolveCnt = 0;
            promises.forEach((p, i) => {
                p.then(val => {
                    ret[i] = val;
                    resolveCnt ++;
                    if (resolveCnt === promises.length) {
                        resolve(ret);
                    }
                }).catch(error => {
                    return reject(error);
                })
            });
        });
    }

    static race(promises) {
        return new Promise((resolve, reject) => {
            promises.forEach(p => {
                p.then(resolve).catch(reject);
            });
        });
    }
}
```
