const net = require('net');

const sockPath = 'source/ipc.sock';
const sock = net.connect(sockPath, () => {
    sock.on('error', error => console.log(`ipc client on err: ${error.message}`));
    sock.on('data', chunk => {
        console.log(`ipc client on data: ${chunk}`);
    });

    sock.write('hello ipc');
});

