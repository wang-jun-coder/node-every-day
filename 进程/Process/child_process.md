## child_process

### 基本使用
spawn

```js
const ls = spawn(`ls`, [`-lh`, '../']);
ls.stdout.on('data', data => {
    console.log(`ls.stdout.on data: ${data}`);
});
ls.stderr.on('data', data => {
    console.log(`ls.stderr.on data: ${data}`);
});

ls.on('close', code => {
    console.log(`ls.on close: ${code}`);
});

```

exec

```js
const child = exec('sleep 1 && pwd && ls ./', {
    cwd: path.resolve(process.cwd(), '../'),
    timeout: 1100, // 脚本执行超时时间
}, (error, stdout, stderr) => {
    if (error) console.log(`error:\n${error}`);

    console.log(`stdout:\n${stdout}`);
    console.log(`stderr:\n${stderr}`);
});

child.stdout.on('data', data => {
    console.log(`child.stdout.on data:\n${data}`);
});
child.stderr.on('data', data => {
    console.log(`child.stderr.on data:\n${data}`);
});

child.on('close', code => {
    console.log(`child.on close:\n${code}`);
});

```

fork

```js
//  **************** index.js **************** 
const child = fork('p1.js', ['-a', '-b'], {
    cwd: path.resolve(__dirname, './child'),
    detached: true
});


child.on('message', msg => console.log(`index.js: process.on child message: ${JSON.stringify(msg)}`));
child.send({
    name: 'message',
    value: 'this is message value from index.js'
}, error => console.log(`index.js: child.send message error: ${error}`));


// process.exit();
setTimeout(() => child.kill(), 3000);

// **************** child/p1.js **************** 
console.log(`p1.js: ${__filename} argv: ${process.argv}`);

process.on('message', msg => console.log(`p1.js process.on message: ${JSON.stringify(msg)}`));
process.on('exit', code => console.log(`p1.js exit: ${code}`));

console.log(`p1.js process.connected: ${process.connected}`);
if (process.connected) {
    process.send({
        name: 'message',
        value: 'this is message value from p1.js'
    }, error => console.log(`p1.js send message p1 error: ${error}`));
}

setInterval(() => console.log(`p1.js alive`), 1000);
```


传递 TCP server 对象

```js
// ***************** index.js ***************** 
const child = fork('./child/p2.js');
const server = net.createServer();
server.on('connection', socket => {
    socket.end('主进程处理');
});
server.listen(3000, () => {
    console.log(`index.js server listen on ${3000}`);
    child.send('server', server);
});
server.on('error', err => console.log(`${err}`));

// ***************** child/p2.js ***************** 
// 从父进程接收 server
process.on('message', (name, server) => {
    if (name === 'server') {
        console.log(`p2.js: receive server`);
        server.on('connection', (socket) => {
            socket.end('子进程处理');
        });
    }
});

```
传递 socket 对象

```js
// ***************** index.js ***************** 
const special = fork('./child/p3.js', ['special']);
const normal = fork('./child/p3.js', ['normal']);

const server = net.createServer({pauseOnConnect: true});
server.on('connection', socket => {
    console.log(`index.js: socket.remoteAddress: ${socket.remoteAddress}`);
    // 通过 ip 和 通过 127.0.0.1 连接, 二者 remoteAddress 不同, 可做测试
    if (socket.remoteAddress === '::ffff:127.0.0.1') {
        special.send('socket', socket);
        return;
    }
    normal.send('socket', socket);
});
server.listen(3000, () => {
    console.log(`server listen on 3000`);
});

// ***************** child/p3.js ***************** 
process.on('message', (msg, socket) => {
    if (msg === 'socket' && socket) {
        console.log(`p3.js: 接收到 socket 信息`);
        socket.end(`请求被子进程处理: ${process.argv[2]}`)
    }
});

```























