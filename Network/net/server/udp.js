const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('error', err => console.log(`udp server on error: ${err.message}`));
server.on('message', (msg, rinfo) => {
    console.log(`udp server on data: ${msg} ${rinfo.address}:${rinfo.port}`);
});
server.on('listening', () => {
    console.log(`udp server has listening: ${server.address().address}:${server.address().port}`);
});

server.bind(3000, '127.0.0.1');
