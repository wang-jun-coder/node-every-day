## cluster -- 集群


### 基本使用

```js
const cluster = require('cluster');
const os = require('os');
const http = require('http');

console.log(`${process.pid}: begin`);
console.log(`cluster.schedulingPolicy: ${cluster.schedulingPolicy}`);
// 如果当前进程是主进程, 创建 fork 出工作进程
if (cluster.isMaster) {

    const len = os.cpus().length;
    // let len = 2;
    for (let i = 0; i < len; i++) {
        const worker = cluster.fork();

        worker.on('disconnect',() => {
            console.log(`主进程监听到: ${worker.process.pid} disconnect`);
        });

        worker.on('message', msg => {
            console.log(`主进程收到: ${JSON.stringify(msg)} from ${worker.process.pid}`);
            // response to worker
            worker.send({
                name: 'masterToWorker',
                value: `master has receiver ${JSON.stringify(msg)} from ${worker.process.pid}`
            })
        });

        worker.on('online', () => {
            console.log(`主进程收到: ${worker.process.pid} has online`);
        });

        console.log(`主进程的工作进程: ${worker.process.pid} has connected: ${worker.isConnected()}`);

        if (i % 2 === 0) {
            setTimeout(()=> {
                worker.disconnect();
                console.log(`主进程的工作进程: ${worker.process.pid} has dead: ${worker.isDead()}`);
            }, 1000);
        }
    }
    cluster.on('exit', ((worker, code, signal) => {
        console.log(`${worker.process.pid}: 退出运行: ${code} ${signal}`);
    }));
    console.log(`${process.pid}: 主进程 fork 出 ${len} 工作进程`);


    for (let key in cluster.workers) {
        console.log(`主进程的工作进程: ${cluster.workers[key].process.pid}`)
    }
}

// 若当前进程是工作进程, 创建服务
if (cluster.isWorker) {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`${process.pid} response: hello world!`);
        console.log(`${process.pid}: 工作进程响应请求`);
    }).listen(3000, () => {
        console.log(`${process.pid}: 工作进程已开启监听`);
    });

    // console.log(`${process.pid}: 子进程: ${cluster.worker.process.pid}`);
    process.on('message', msg => {
        console.log(`工作进程: ${process.pid} 收到主进程消息: ${JSON.stringify(msg)}, 主进程 id: ${cluster.worker.process.ppid}`);
    });

    process.send({
        name: 'sendToMaster',
        value: `this is msg from ${process.pid} to ${process.ppid}`
    });
}

console.log(`${process.pid}: load complete`);

// curl http://localhost:3000
// 多次请求后, 可发现请求被不同工作进程处理

```

### 实现一个简单的守护进程

```js
/******************* daemon.js ******************/ 

const {spawn}= require('child_process');

const sub = spawn(process.argv0, ['worker.js'], {
    detached: true,
    stdio: "ignore"
});
sub.unref();

console.log(`${process.pid} has create ${sub.pid}`);
process.exit();

// 可通过  ps -ef | grep node 查看当前 node 相关的进程, 使用 kill 命令关闭这个进程

/******************* worker.js ******************/ 
const fs = require('fs');

const output = fs.createWriteStream(`${process.pid}.log`, {
    encoding: 'utf8'
});

const times = 0;
setInterval(() => {
    output.write(`${Date.now()}: ${process.pid} ${times}\n`);
}, 1000);

```
