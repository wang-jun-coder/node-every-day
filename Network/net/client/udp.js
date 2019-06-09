const dgram = require('dgram');

const socket = dgram.createSocket('udp4');
socket.bind(3001);

let i = 0;
while (i < 10) {
    socket.send('this is a msg from udp client', 3000, '127.0.0.1', (error, bytes) => {
        console.log(`socket send:${error} ${bytes}`);
    });
    i++;
}



