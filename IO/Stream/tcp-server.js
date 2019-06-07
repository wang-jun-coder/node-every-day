const net = require('net');
const server = net.createServer(socket => {
    console.log(`tcp-server.js on socket: ${socket.remoteAddress}`);
    // 这是一个双工流
    socket.on('data', chunk => {
        console.log(`tcp-server.js receive: ${chunk.toString()}`);
        socket.write(`tcp-server.js has receive: ${chunk.toString()}`);
    })
});
server.listen(3000);
