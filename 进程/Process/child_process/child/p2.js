
// 从父进程接收 server
process.on('message', (name, server) => {
    if (name === 'server') {
        console.log(`p2.js: receive server`);
        server.on('connection', (socket) => {
            socket.end('子进程处理');
        });
    }
});
