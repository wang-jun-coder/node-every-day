

process.on('message', (msg, socket) => {
    if (msg === 'socket' && socket) {
        console.log(`p3.js: 接收到 socket 信息`);
        socket.end(`请求被子进程处理: ${process.argv[2]}`)
    }
});
