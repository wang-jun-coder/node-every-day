const net = require('net');
const socket = net.connect(3000, '127.0.0.1', () => {
    socket.write(Buffer.from(`this is a message from duplex.js`));
    socket.on('data', chunk => {
        console.log(`duplex.js has receive: ${chunk.toString()}`)
    })
});
