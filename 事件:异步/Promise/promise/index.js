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


const p1 = new Promise((resolve, reject) => {
    console.log(`on new Promise`);
    resolve();
});


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


const WJPromise = require('./lib/WJPromise');

const p = new WJPromise((resolve, reject) => {
    setTimeout(() => resolve('test'), 100)
});

const pLike = {
    then(onFulfilled, onRejected) {
        setTimeout(() => {
            onFulfilled(10);
        })
    }
};

p
    .then(val => console.log(`then: ${val}`))   // then: test
    .then(() => WJPromise.resolve(1))
    .then(val => console.log(`then: ${val}`))   // then: 1
    .then(() =>  {
        throw 'error'
    })
    .catch(e => console.log(`catch: ${e}`))    // catch: error
    .then(() => {
        return pLike
    })
    .then(val => {
        console.log(`then: ${val}`);                    // then: 10
    })
    .catch(e => console.log(e));


const p2 = new WJPromise((resolve, reject) => {
    setTimeout(()=> resolve('p2'), 100);
});
const p3 = new WJPromise((resolve, reject) => {
    setTimeout(()=> resolve('p3'), 150);
});

WJPromise.all([p2, p3])
    .then(val => console.log(`all then: ${val}`))   // all then: p2,p3
    .catch(e => console.log(`all catch: ${e}`));


WJPromise.race([p2, p3])
    .then(val => console.log(`race then: ${val}`))  // race then: p2
    .catch(e => console.log(`race catch: ${e}`));

