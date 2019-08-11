## JS 异步发展路线

### 异步回调
示例代码：

```js
// 传统回调, 遵循 error-first 约定, 回调函数的第一个参数,标识操作中产生的错误, 若为 null, 则操作正常
stepA((errA, valA) => {
    stepB((errB, valB) => {
        stepC((errC, valC) => {
            stepD((errD, valD) => {

            });
        });
    });
});

```

js 传统回调遵循 error-first 约定  
有回调函数的代码未必是异步执行， 如：  

```js
// 虽使用回调函数，但代码本身是同步执行的
const add = (a, b, callback) => {
    callback(null, a+b);
};
```  

异步回调的嵌套容易造成回调地狱，多层回调，异常和逻辑处理也会变得复杂起来  
node.js 中对于异步任务的管理也是发展的很快的，下面介绍一个利用回调来解决 callback-hell 的库

```js
const async = require('async');
cconst tasks = [
    function (callback) {
        return stepA(callback);
    },
    function (callback) {
        return stepB(callback);
    },
    function (callback) {
        return stepC(callback);
    },
    function (callback) {
        return stepD(callback);
    },
];
console.time('series');
// 串行
async.series(tasks, function (error, data) {
    console.timeEnd('series'); // series: 4011.462ms
    console.log(`${error} ${JSON.stringify(data)}`); // null ["A","B","C","D"]
});

console.time('parallel');
// 并发
async.parallel(tasks, function (error, data) {
    console.timeEnd('parallel'); // parallel: 1002.985ms
    console.log(`${error} ${JSON.stringify(data)}`); // null ["A","B","C","D"]
});

console.time('parallelLimit');
// 限定并发个数
async.parallelLimit(tasks, 2, function (error, data) {
    console.timeEnd('parallelLimit'); // parallelLimit: 2005.171ms
    console.log(`${error} ${JSON.stringify(data)}`); // null ["A","B","C","D"]
});

// 流式执行
async.waterfall([
    function (callback) {
        setTimeout(() => {
            return callback(null, {A: 'a'}, {'1': '1'});
        }, 1000);
    },
    function (p1, p2, callback) {
        console.log(`waterfall: ${JSON.stringify(p1)} ${JSON.stringify(p2)}`); // waterfall: {"A":"a"} {"1":"1"}
        return callback(null, {
            ...p1,
            B: 'b'
        });
    },
    function (p1, callback) {
        console.log(`waterfall: ${JSON.stringify(p1)}`); // waterfall: {"A":"a","B":"b"}
        return callback(null, {
            ...p1,
            C: 'c'
        });
    }
], function (error, data) {
    console.log(`waterfall complete: ${error} ${JSON.stringify(data)}`); // waterfall complete: null {"A":"a","B":"b","C":"c"}
});
```

### thunk
#### 参考资料
[Thunk 函数的含义和用法](http://www.ruanyifeng.com/blog/2015/05/thunk.html)

#### 示例
Thunk 函数的定义：它是"传名调用"的一种实现策略，用来替换某个表达式。  
在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数。  
所以在 js 中 thunk 函数具备两个要素  

* thunk 函数有且只有一个 callback 函数作为参数
* callback 函数遵循 error-first 约定

如：

```js
const fs = require('fs');
const co = require('co');

// 正常函数
fs.readFile('package.json', 'utf8', function (error, json) {
    console.log(`${error} -- ${json}`);
});

// Thunk 转换函数
const Thunkify = function (fn) {
    return  function (...args) {
        return function(callback) {
            fn.call(this, ...args, callback);
        };
    };
};
const readFileThunk = Thunkify(fs.readFile);
const packageJsonThunk = readFileThunk('package.json');
packageJsonThunk(function (error, json) {
    console.log(`${error} ${json}`);
});

// co + thunkify
co(function* () {
    const packageJson = yield readFileThunk('package.json', 'utf8');
    const callbackJs = yield readFileThunk('callback.js', 'utf8');
    const thunkJs = yield readFileThunk('thunk.js', 'utf8');
    return Promise.resolve([packageJson, callbackJs, thunkJs]);
}).then(val => {
    console.log(val);
}).catch(e => {
    console.log(e);
});

```
co 是一个开源第三方包，其主要作用是对 generator 函数进行操作，将其用于流程控制  
co + thunk 函数，可以解决回调地狱的问题  
不过现在 nodejs 中，逐渐 Promise 化，nodejs v4 之后，thunk 函数慢慢被 Promise 取代
不过上述代码中存在 generator 和 Promise 的操作，下面分别看下其实现吧


### Promise

#### 参考资料
[Promise 对象](http://es6.ruanyifeng.com/#docs/promise)

#### 示例
简而言之，Promise 是一种异步解决方案，其比 callback 方式更为简洁，ES6 将其写入语言标准   
所谓 Promise 简单说就是一个容器，里面保存着某个未来才会结束的事件的结果  
Promise 是一个状态机，初始 pending，可转换为 fulfilled 或 rejected  
co 模块对其返回值做了 Promisify，返回一个 Promise 函数，操作更方便

```js
const fs = require('fs');
const co = require('co');

const promisify = fn => {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn.call(this, ...args, function (error, data) {
                if (error) return reject(error);
                return resolve(data);
            })
        });
    };
};

const readFile = promisify(fs.readFile);

const readPackageJson = readFile('package.json', 'utf8');
const readCallbackJs = readFile('callback.js', 'utf8');
const readThunk = readFile('thunk.js', 'utf8');
const readPromise = readFile('promise.js', 'utf8');

// 单步promise
readPackageJson.then(packageJson => {
   console.log(packageJson);
   return readCallbackJs;
}).then(callbackJs => {
    console.log(callbackJs);
    return readThunk;
}).then(thunkJs => {
    console.log(thunkJs);
    return readPromise;
}).then(promiseJs => {
    console.log(promiseJs);
}).catch(e => {
    console.log(e);
});

// promise all
Promise.all([readPackageJson, readCallbackJs, readThunk, readPromise])
    .then(contents => {
        console.log(contents);
    })
    .catch(e => {
        console.log(e);
    });

// co
co(function* () {
    const packageJson = yield readPackageJson;
    const callbackJs = yield readCallbackJs;
    const thunkJs = yield readThunk;
    const promiseJs = yield readPromise;
    return Promise.resolve([packageJson, callbackJs, thunkJs, promiseJs]);
}).then(contents => {
    console.log(contents);
}).catch(e => {
    console.log(e);
});

```
可以看到 co + Promise 操作依然比纯 Promise 更简洁方便  
co 的参数，是一个 generator 函数，generator 函数内可使用 yield 关键字

### generator
#### 参考资料
[Generator 函数的语法](http://es6.ruanyifeng.com/#docs/generator)
[Generator 函数的异步应用](http://es6.ruanyifeng.com/#docs/generator-async)

####示例
generator 于 es6 加入语言标准，这是一种异步解决方案  
从语法上来说，可以将 generator 理解为一个状态机，内部封装了多个状态  
执行 generator 函数，返回一个迭代器对象，可以依次遍历 generator 函数内部的每一个状态  
generator 函数有两个特征

* 函数声明，function 与 name 之间带有一个 * 号
* 函数体内部可以使用 yield 表达式

```js
const fs = require('fs');
const util = require('util');

// generator 简单使用
function* gen1() {
    yield 1;
    yield 2;
    yield 3;
}
let iterator = gen1();
let cur = iterator.next();
while (!cur.done) {
    console.log(`${cur.value}`);
    cur = iterator.next();
}


// co 模拟实现, 简洁版
const co = function (gen) {
    return new Promise((resolve, reject) => {
        gen = gen(); // 执行 generator, 获取迭代器对象
        // 某个成功操作
        function onFulfilled(res) {
            let ret = null;
            try {
                ret = gen.next(res);
            } catch (e) {
                return reject(e);
            }
            next(ret);
        }
        // 某个失败操作
        function onRejected(error) {
            let ret = null;
            try {
                ret = gen.throw(error)
            } catch (e) {
                return reject(e);
            }
            next(ret);
        }

        // 遍历迭代
        function next(ret) {
            // 若遍历完成, 返回完成值
            if (ret.done) return resolve(ret.value);

            // 若未完成, promisify 继续遍历
            let value = Promise.resolve(ret.value);
            return value.then(onFulfilled).catch(onRejected);
        }

        onFulfilled();
    });
};


const readFile = util.promisify(fs.readFile);
co(function* () {
    const a = yield readFile('package.json', 'utf8');
    const b = yield readFile('package.json', 'utf8');
    const c = yield readFile('package.json', 'utf8');
    return Promise.resolve([a, b, c]);
}).then(contents => {
    console.log(contents);
}).catch(e => {
    console.log(e);
});

```

### async/await

#### 参考资料
[async 函数](http://es6.ruanyifeng.com/#docs/async)

#### 示例
ES2017 引入了 async 函数，可以说得上是异步流程的终极解决方案  
async 函数可以认为是 generator 的改进版本  

* 语义优化，async和await 比起 * 和 yield 表达更清楚
* 内置执行器，不像 generator 还需要 co 做执行器
* 更广的适用性，await 后可跟 promise 对象和原始类型的值
* 返回值是 promise，调用更方便


示例如下

```js
const fs = require('fs');
const util = require('util');

async function readFiles(files) {
    return Promise.all(files.map(file => util.promisify(fs.readFile)(file, 'utf-8')));
}
async function main() {
    try {
        const files = ['package.json', 'async.js'];
        const contents = await readFiles(files);
        console.log(contents);
    } catch (e) {
        console.log(e);
    }
}
main().catch(e => console.log(e));
```

可见 async、await 大大简化了异步任务管理




















  
