## 同步异步

### 区别
* nodejs 中同步执行按代码顺序之上而下执行，异步则是将任务放入异步队列中，合适的时机再拿出来进行执行
* 同步执行可立即得到执行结果，异步执行一般需要借助回调函数
* 异步回调的嵌套容易引发回调地狱
* 解决回调地狱 async，Promise => generator + co => async/await

### nodejs 实现一个同步的 sleep 函数
nodejs的特性是异步非阻塞，一旦阻塞后续代码无法执行，事件循环无法继续，将导致程序无法继续响应外部事件。出于好玩的情况可以实现下

常规版，死循环，直至时间到, 虽然能达到目的，但是会导致 cpu 爆满

```js
    function sleep(ms) {
        let exp = Date.now() + ms;
        while (Date.now() < exp) {

        }
    }
    console.log(`begin: ${Date.now()}`);    // begin: 1559053118603
    sleep(100);
    console.log(`end: ${Date.now()}`);      // end: 1559053118707

```

另一种思路，可以借助一些同步方法实现。mac 和 Linux 环境默认存在 sleep 命令，node 提供有同步执行命令的接口，所以借助 execSync 来实现 sleep 函数，并且不会引起 cpu 大量占用的问题

```js
    const { execSync } = require('child_process');
    function sleep(second) {
        execSync(`sleep ${second}`);
    }

    console.log(`begin: ${Date.now()}`);    // begin: 1559053666202
    sleep(1);
    console.log(`end: ${Date.now()}`);      // end: 1559053667215
```

### 尝试实现一个异步的 reduce
```js
Array.prototype.AsyncReduce = function (callback, initValue) {
    if (!(this instanceof Array)) {
        throw new TypeError('必须是数组');
    }
    if (this.length === 0) return Promise.resolve(initValue);

    const init = typeof initValue === "undefined" ? this[0] : initValue;
    let start = typeof initValue === "undefined" ? 1 : 0;
    if (start === 1 && this.length === 1) {
        return Promise.resolve(this[0]);
    }
    return  this.reduce((preP, cur, index) => {
        return preP.then(preVal => {
            return callback(preVal, cur, index);
        });
    }, Promise.resolve(init))
};
```

### setTimeout 和 setImmediate

```js
setTimeout(() => console.log('timeout'));
setImmediate(() => console.log(`immediate`));

// case1:
// immediate
// timeout

// case2:
// timeout
// immediate

/**
 * 为什么会这样?
 *
 * 已知:
 * 1. 当 Node.js 启动后，它会初始化事件轮询
 * 2. setTimeout(fn, 0) 相当于 setTimeout(fn, 1); https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout
 * 3. setTimeout 不能保证时间到达立即执行, 仅保证不早于改时间执行
 *
 * 当 上述代码在主模块执行后, 下轮事件循环: timers 阶段有回调, check 阶段也有回调
 *
 * 当 主模块代码执行完毕后, 进入事件循环, 若系统状态良好, 经过 timers 阶段时, 不到 1ms, 则回调不执行
 * 当 轮询到 check 阶段 setImmediate 执行
 *
 * 当 主模块代码执行完毕后, 进入事件循环, 若系统状态良好, 经过 timers 阶段时, 超过 1ms, 则回调执行
 * 当 轮询到 check 阶段 setImmediate 执行
 *
 * */


```
### [事件循环 和 process.nextTick](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/)
	
	   ┌───────────────────────────┐
	┌─>│           timers          │
	│  └─────────────┬─────────────┘
	│  ┌─────────────┴─────────────┐
	│  │     pending callbacks     │
	│  └─────────────┬─────────────┘
	│  ┌─────────────┴─────────────┐
	│  │       idle, prepare       │
	│  └─────────────┬─────────────┘      ┌───────────────┐
	│  ┌─────────────┴─────────────┐      │   incoming:   │
	│  │           poll            │<─────┤  connections, │
	│  └─────────────┬─────────────┘      │   data, etc.  │
	│  ┌─────────────┴─────────────┐      └───────────────┘
	│  │           check           │
	│  └─────────────┬─────────────┘
	│  ┌─────────────┴─────────────┐
	└──┤      close callbacks      │
	   └───────────────────────────┘

* timers(定时器阶段)： 执行 `setTimeout()` 和 `setInterval()` 的回调
* pending callbacks(待定回调)：执行延迟到下一个循环迭代的 I/O 回调。
* idle, prepare：系统内部使用
* poll（轮询）：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，它们由计时器和 setImmediate() 排定的之外），其余情况 node 将在此处阻塞
* check （检测）：setImmediate() 回调函数在这里执行。
*  close callbacks（关闭的回调函数）： 一些准备关闭的回调函数，如：socket.on('close', ...)。

#### 备注
* 每个阶段都有一个 FIFO 队列来执行回调，process.nextTick 也有一个 nextTickQueue
* process.nextTick 不属于任何一个阶段，而是每个阶段执行完均会检查执行
* 若 process.nextTick 回调中继续添加 process.nextTick，则会导致死循环
* 当该队列已用尽或达到回调限制，事件循环将移动到下一阶段
* pending callbacks对某些系统操作（如 TCP 错误类型）执行回调。例如，如果 TCP 套接字在尝试连接时接收到 ECONNREFUSED，则某些 *nix 的系统希望等待报告错误。这将被排队以在 挂起的回调 阶段执行，与 poll 阶段不同



```js

const fs = require('fs');
fs.readFile('index.js', 'utf8',function (error, content) {
    console.log(`on io callback`);
    process.nextTick(() => {
        console.log(`process.nextTick on io callback 1`);
        process.nextTick(() => {
            console.log(`process.nextTick on io callback 2`);
        })
    })
});

setImmediate(() => {
    console.log(`on check`);
    process.nextTick(() => {
        console.log(`process.nextTick on check callback 1`);
        process.nextTick(() => {
            console.log(`process.nextTick on check callback 2`);
        })
    })
});
setTimeout(() => {
    console.log(`on timer`);
    process.nextTick(() => {
        console.log(`process.nextTick on timer callback 1`);
        process.nextTick(() => {
            console.log(`process.nextTick on timer callback 2`);
        })
    })
});
/**
 on check
 process.nextTick on check callback 1
 process.nextTick on check callback 2
 on timer
 process.nextTick on timer callback 1
 process.nextTick on timer callback 2
 on io callback
 process.nextTick on io callback 1
 process.nextTick on io callback 2
 * */
/**
 on timer
 process.nextTick on timer callback 1
 process.nextTick on timer callback 2
 on check
 process.nextTick on check callback 1
 process.nextTick on check callback 2
 on io callback
 process.nextTick on io callback 1
 process.nextTick on io callback 2
 * */
```




### 宏任务与微任务

* 异步任务分为两种，微任务和宏任务
* nodejs 环境下 微任务再事件循环的各阶段切换间时执行，且
* process.nextTick、Promise.then Promise.catch Promise.finally 属于微任务，且process.nextTick优先级较高
* setTimeout、setInterval、setImmediate 所创造的任务都是宏任务，注册到下轮事件循环














