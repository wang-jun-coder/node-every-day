### Process


### 进程与线程
* 进程有独立的地址空间，保护模式下一个进程崩溃不影响其他进程
* 线程没有独立的地址空间，同一进程下的线程共享内存
* 进程资源开销比较大，线程开销比进程少
* 一个程序至少有一个进程，一个进程至少有一个线程


### nodejs 是单线程应用吗
* nodejs 的 js 代码执行是单线程的
* nodejs io 操作，基于 libuv，而处理 io 任务显然是多线程的

### nodejs 中的 process
* nodejs 中的 process 是一个全局变量，提供进程相关操作能力

### 进程有哪些属性
* pid
* uid
* gid
* ppid
* ...


### process 相关使用

#### 进程事件
beforeExit

```js
// 仅正常结束程序才会回调(清空事件循环), 才会触发, 显式终止的条件，不会触发 'beforeExit' 事件. 在此回调可继续事件循环
process.on('beforeExit', function (exitCode) {
    console.log(`beforeExit: ${exitCode}`);

    // 以下代码会导致死循环, 因为 timeout 结束后事件循环清空, 没有任务, 会触发 beforeExit 事件, 导致再次进入回调
    // setTimeout(() => console.log(`beforeExit timeout`), 100);
});
// 使用 process.exit() 终止进程, beforeExit 不会收到回调
// process.exit();
```

exit

```js
// 程序正常结束或 process.exit() 均会回调, 此处无法继续事件循环
process.on('exit', function (exitCode) {
    console.log(`exit: ${exitCode}`);

    // 本事件内无法继续循环, 所有监听回调完成后, 进程退出
    setTimeout(() => console.log(`exit timeout`), 100); // 不会输出 log
});
```
multipleResolves  

```js
// promise 相关 v10.12.0, promise 回调多次(resolve, resolve; resolve, reject; reject, resolve; reject, reject)
process.on('multipleResolves', (type, promise, value) => {
    console.log(`multipleResolves: ${type} ${promise} ${value}`);
});

new Promise((resolve, reject) => {
    resolve(1);
    resolve(2); // multipleResolves: resolve [object Promise] 2
    reject(3);  // multipleResolves: reject [object Promise] 3
    reject(4);  // multipleResolves: reject [object Promise] 4

}).then(val => console.log(val));
```

rejectionHandled && unhandledRejection

```js
process.on(`unhandledRejection`, (reason, promise) => {
    // 有新的未处理的拒绝发生
    console.log(`unhandledRejection: ${reason}`);
});
process.on(`rejectionHandled`, promise => {
    // 有未被处理的拒绝被处理了
    console.log(`rejectionHandled: ${promise}`)
});

// 不会触发事件
Promise.reject(`error1`).catch(e => console.log(`handle reject: ${e}`));
// 出现未被处理的拒绝, 触发 unhandledRejection
const p = Promise.reject(`error2`).then(val => console.log(`${val}`));

// 下个循环处理掉这个拒绝, 触发 rejectionHandled
setImmediate(() => {
    p.catch(e => console.log(`${e}`));
});
```

uncaughtException

```js
process.on('uncaughtException', err => {
    console.log(`${err}`);
});

throw new Error(`error`);
console.log(`end`); // 依然可以输出, 因为异常被 uncaughtException 监听捕获
```

warning

```js
const EventEmitter = require('events');
process.on(`warning`, ({ name, message, stack }) => {
   console.log(`warning: \n${name} \n${message} \n${stack}`);
});

// 人为制造一个警告
EventEmitter.defaultMaxListeners = 1;
const emitter = new EventEmitter();
emitter.on('event', (e) =>console.log(`listener1: ${e}`));
emitter.on('event', (e) =>console.log(`listener2: ${e}`));
emitter.emit('event', `on event`);

console.log(`end`);
```

process.emitWarning

```js
process.on(`warning`, ({ name, message, stack }) => {
   console.log(`warning: \n${name} \n${message} \n${stack}`);
});
process.emitWarning(`error message`, `error name`);
```

#### 常用方法

```js
// 强行结束进程
setTimeout(() => process.abort(), 1000);

// 输出允许的 node 环境变量, 对此数组进行操作静默失败
process.allowedNodeEnvironmentFlags.forEach(env => console.log(`allowedNodeEnvironmentFlags: ${env}`));

// 输出 CPU 架构, x64, arm64, 等
console.log(`${process.arch}`);


// 输出启动时的命令行参数列表
process.argv.forEach(el => console.log(el));


// node 路径
console.log(`${process.argv0}`);


// 获取工作目录, 切换工作目录
console.log(`${process.cwd()}`);
process.chdir(`../`);
console.log(`${process.cwd()}`);


// 编译当前 node 执行程序的配置信息
console.log(`${JSON.stringify(process.config)}`);

// 获取 cpu 信息, 或差值
const first = process.cpuUsage();
console.log(`${JSON.stringify(first)}`);
const diff = process.cpuUsage(first);
console.log(`${JSON.stringify(diff)}`);


// nodejs 调试端口
console.log(`${process.debugPort}`);


// 加载 c++ 插件, 待试用
process.dlopen(module, filename)


// 用户环境变量, 可在程序内部修改, 但 work 线程是只读的
console.log(`${JSON.stringify(process.env)}`);


// node --harmony operation.js --version , --harmony
console.log(`${process.execArgv}`);


// nodejs 执行文件路径, /Users/wangjun/.nvm/versions/node/v10.16.0/bin/node
console.log(`${process.execPath}`);


// 尽快关闭进程, 部分异步任务可能会提前终止, 但是在 exit 监听器执行完成前, 程序不会退出
process.on('exit', code => console.log(code));
process.exit();


// nodejs 正常退出/process.exit() 时, 默认使用此值作为退出码
console.log(`${process.exitCode}`);



// 返回Node.js进程的有效数字标记的组身份
console.log(`${process.getegid()}`);


// 返回Node.js进程的有效数字标记的用户身份
console.log(`${process.geteuid()}`);


// 返回Node.js进程的数字标记的组身份
console.log(`${process.getgid()}`);



// 返回数组，其中包含了补充的组ID
console.log(`${JSON.stringify(process.getgroups())}`);



// 返回Node.js进程的数字标记的用户身份
console.log(`${process.getuid()}`);



// 返回当前时间以[seconds, nanoseconds] tuple Array表示的高精度解析值
const first = process.hrtime();
console.log(`${first}`);
const diff = process.hrtime(first);
console.log(`${diff}`);



// returning the current high-resolution real time in a bigint
console.log(`${process.hrtime.bigint()}`);


//
console.log(`${process.getgroups()}`);
console.log(`${process.initgroups('wangjun', 1)}`); // 进程需要权限
console.log(`${process.getgroups()}`);


// 发送信号至指定进程(虽然名字叫 kill)
process.on('SIGHUP', e => console.log(`${e}`));
setTimeout(() => {
     console.log('Exiting.');
     process.exit(0);
}, 100);
process.kill(process.pid, 'SIGHUP');


// 获取主模块
console.log(`${process.mainModule === require.main}`);



// 内存使用
// heapTotal 和 heapUsed 代表V8的内存使用情况。 external代表V8管理的，绑定到Javascript的C++对象的内存使用情况。
// rss, 驻留集大小, 是给这个进程分配了多少物理内存(占总分配内存的一部分) 这些物理内存中包含堆，栈，和代码段
// 对象，字符串，闭包等存于堆内存。 变量存于栈内存。 实际的JavaScript源代码存于代码段内存
console.log(`${JSON.stringify(process.memoryUsage())}`);
// {"rss":29868032,"heapTotal":9682944,"heapUsed":4693976,"external":14864}



// 注意 nextTick Queue 优先级, 死循环, 执行于事件循环各阶段切换
process.nextTick(() => {
     console.log(`process.nextTick()`);
     process.nextTick(() => {
         console.log(`process.nextTick() 2`);
     });
});



console.log(`${process.noDeprecation}`);
console.log(`${process.pid}`);
console.log(`${process.platform}`);
console.log(`${process.ppid}`); // 父进程的进程id



// 返回与当前发布相关的元数据对象，包括源代码和源代码头文件 tarball的URLs。
console.log(`${JSON.stringify(process.release)}`);
// {"name":"node","lts":"Dubnium","sourceUrl":"https://nodejs.org/download/release/v10.16.0/node-v10.16.0.tar.gz","headersUrl":"https://nodejs.org/download/release/v10.16.0/node-v10.16.0-headers.tar.gz"}




// process.stdin 是一个双工流
 process.stdin.setEncoding('utf8');
 process.stdin.on('readable', () => {
     const chunk = process.stdin.read();
     if (chunk !== null) {
         process.stdout.write(`数据: ${chunk}`);
     }
 });

 process.stdin.on('end', () => {
     process.stdout.write('结束');
});



// 将输入 pipe 到 输出
process.stdin.pipe(process.stdout);


// 判断流是否在终端中
console.log(`${process.stdin.isTTY}`);


// nodejs 程序创建文件的默认权限值
const newmask = 0o022;
const oldmask = process.umask(newmask);
console.log(`Changed umask from ${oldmask.toString(8)} to ${newmask.toString(8)}`);



// nodejs 程序启动后运行时间
setTimeout(() => console.log(`${process.uptime()}`, 1000));
console.log(`${process.uptime()}`);



// 当前 node 版本信息
console.log(`${process.version}`);


// 列出了Node.js和其依赖的版本信息
console.log(JSON.stringify(process.versions));
// {"http_parser":"2.8.0","node":"10.16.0","v8":"6.8.275.32-node.52","uv":"1.28.0","zlib":"1.2.11","brotli":"1.0.7","ares":"1.15.0","modules":"64","nghttp2":"1.34.0","napi":"4","openssl":"1.1.1b","icu":"64.2","unicode":"12.1","cldr":"35.1","tz":"2019a"}

```
