
const PENDING = 'PENDING';
const REJECTED = 'REJECTED';
const FULFILLED = 'FULFILLED';
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

        // promise 值穿透?
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

module.exports = WJPromise;
