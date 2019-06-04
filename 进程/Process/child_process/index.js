const { spawn, exec, fork } = require('child_process');
const path = require('path');
const net = require('net');

// spawn 基本使用
// const ls = spawn(`ls`, [`-lh`, '../']);
// ls.stdout.on('data', data => {
//     console.log(`ls.stdout.on data: ${data}`);
// });
// ls.stderr.on('data', data => {
//     console.log(`ls.stderr.on data: ${data}`);
// });
//
// ls.on('close', code => {
//     console.log(`ls.on close: ${code}`);
// });



// exec 基本使用
// const child = exec('sleep 1 && pwd && ls ./', {
//     cwd: path.resolve(process.cwd(), '../'),
//     timeout: 1100, // 脚本执行超时时间
// }, (error, stdout, stderr) => {
//     if (error) console.log(`error:\n${error}`);
//
//     console.log(`stdout:\n${stdout}`);
//     console.log(`stderr:\n${stderr}`);
// });
//
// child.stdout.on('data', data => {
//     console.log(`child.stdout.on data:\n${data}`);
// });
// child.stderr.on('data', data => {
//     console.log(`child.stderr.on data:\n${data}`);
// });
//
// child.on('close', code => {
//     console.log(`child.on close:\n${code}`);
// });


// fork 基本使用
// const child = fork('p1.js', ['-a', '-b'], {
//     cwd: path.resolve(__dirname, './child'),
//     detached: true,
//     stdio: ["ignore", "inherit", "inherit", "ipc"], //"ignore",
// });
//
//
// child.on('message', msg => console.log(`index.js: process.on child message: ${JSON.stringify(msg)}`));
// child.on('close', (code, signal) => console.log(`index.js : code: ${code} signal: ${signal}`));
// child.send({
//     name: 'message',
//     value: 'this is message value from index.js'
// }, error => console.log(`index.js: child.send message error: ${error}`));
//
//
// // process.exit();
// setTimeout(() => {
//     child.kill(`SIGTERM`);
//     // child.unref();
//     // process.exit();
// }, 3000);
//
//
// // process.exit();
// setInterval(() => {
//     console.log(`index.js alive`);
// }, 1000);


// 发送 server 对象
// const child = fork('./child/p2.js');
// const server = net.createServer();
// server.on('connection', socket => {
//     socket.end('主进程处理');
// });
// server.listen(3000, () => {
//     console.log(`index.js server listen on ${3000}`);
//     child.send('server', server);
// });
// server.on('error', err => console.log(`${err}`));
// // 进行一定量的请求, 可以发现请求被分别分配到子进程和主进程处理


// 发送 socket 对象
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

