const net = require('net');

const sock = net.connect({
    port: 3000,
    host: '127.0.0.1'
});
sock.on("connect", () => {

    // 封包拆包
    const prefix = `)(}{->:`;
    const suffix = `:<-)(}{`;
    let data = ``;

    sock.on("error", err => {
        console.log(`sock on error: ${err.message}`);
    });
    sock.on("data", chunk => {
        console.log(`sock on data: ${chunk}`);
        data += chunk;

        // 拆包(服务端也进行封包发送)
        const unpack = () => {
            const packs = [];
            const begin = data.indexOf(prefix);
            const end = data.indexOf(suffix);
            // data 中至少有一个完整的包
            if (begin !== -1 && end !== -1) {
                const pack = data.substring(begin+prefix.length, end);
                data = data.substring(end+suffix.length, data.length);
                packs.push(pack);
                return packs.concat(unpack());
            }
            return packs;
        };

        const packs = unpack();
        packs.forEach(msg => {
            console.log(`sock on data: ${msg}`);
        })
    });
    sock.setNoDelay();
    //禁止 Nagle (延迟传输)。默认情况下 TCP 连接使用 Nagle 算法，在发送之前缓冲数据。将 noDelay 设置为 true 将会在每次 socket.write() 被调用的时候立即发送数据。noDelay默认是 true。

    // 短时间内多次发送短消息, 可能导致粘包
    // sock.write('hello server');
    // sock.write('message1');
    // sock.write('message2');
    // sock.write('message3');

    // 延迟发送, 避免粘包
    // sock.write('hello server');
    // setTimeout(() => sock.write('message1'),1);
    // setTimeout(() => sock.write('message2'), 2);
    // setTimeout(() => sock.write('message3'), 3);

    // 封包
    sock.write(`${prefix}hello world${suffix}`);
    sock.write(`${prefix}message1${suffix}`);
    sock.write(`${prefix}message2${suffix}`);
    sock.write(`${prefix}message3${suffix}`);

    setTimeout(() => process.exit(), 1000);
});
