## net

### tcp

#### tcp 简单实用示例

```js
//************** server/tcp.js ***************
const net = require('net');

const server = net.createServer(socket => {
    socket.on("error", err => console.log(`sock on error: ${err.message}`));
    
    let data =``;
    const prefix = `)(}{->:`;
    const suffix = `:<-)(}{`;
    socket.on("data", chunk => {
        // console.log(`sock on data: ${chunk}`);
        // 不封包, 直接发送
        // socket.write(`tcp server has receive : ${chunk}`);

        // 拆包
        data += chunk;

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
        // 封包发送
        packs.forEach(msg => {
            console.log(`tcp server on data: ${msg}`);
           socket.write(`${prefix}${msg}${suffix}`);
        });
        
    });
    socket.on("end", () => {
        console.log(`client has disconnected`);
    });
});
server.listen(3000, () => console.log(`tcp server has listen: 3000`));


//************** client/tcp.js ***************
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

```

#### ipc 简单使用示例

```js
//************** server/ipc.js ***************
const net = require('net');
const fs = require('fs');


const sockPath = 'source/ipc.sock';
// 启动时尝试删除遗留文件(简单处理)
try {fs.unlinkSync(sockPath);} catch (e) {}

const server = net.createServer(socket => {
    socket.on("error", err => console.log(`ipc server on sock error: ${err}`));
    socket.on("data", chunk => {
        console.log(`ipc server on data: ${chunk}`);

        socket.write(`server has receive : ${chunk}`);
    });
    socket.on("end", () => {
        console.log(`client has disconnect`);
    })
});

server.listen(sockPath, () => {
    console.log(`server listen: ${sockPath} `);
});

//************** client/ipc.js ***************

const net = require('net');

const sockPath = 'source/ipc.sock';
const sock = net.connect(sockPath, () => {
    sock.on('error', error => console.log(`ipc client on err: ${error.message}`));
    sock.on('data', chunk => {
        console.log(`ipc client on data: ${chunk}`);
    });

    sock.write('hello ipc');
});
```

### udp 使用

```js
// ********************* server/udp.js *********************
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


// ********************* client/udp.js *********************
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

```

### http 简单使用

```js
// **************** server/http.js *******************
const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`-> ${req.method} ${req.url}`);

    setTimeout(() => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('charset', 'utf-8');
        res.end(`${JSON.stringify({
            errCode: 0,
            msg: '成功',
            data: {
                success: true,
                result: 'response success'
            }
        })}`);
    }, 1000);
});
server.listen(3000, () => {
    console.log(`server has listening ${server.address().port}`);
});

// **************** client/http.js *******************
const req = http.request({
    host: '127.0.0.1',
    port: 3000,
    path: '/a/b/c',
    method: 'POST'
}, res => {

    res.on('data', chunk => {
        console.log(`${chunk}`);
    });
    res.on("end", () => {
        console.log(`响应数据传输完毕`);
    });
});
req.end();

```

### dns

```js
const dns = require('dns');
// 不发请求, 直接调用系统底层方法, 受 host文件 影响
const label = 'dns.lookup: github.com';
const domain = `github.com`;
console.time(label);
dns.lookup(domain, (err, address, family) => {
    console.timeEnd(label); // dns.lookup: github.com: 9.383ms, 约 10ms 左右
    console.log(`${domain}: ${err} ${address} ${family}`); // 本地修改了 host, 导致解析结果为 host 内地址
});
```
```js

const { Resolver } = require('dns');
const resolver = new Resolver();
resolver.setServers(['4.4.4.4', '8.8.8.8', '114.114.114.114']);


const label = 'dns resolve4: github.com';
console.time(label);
const domain = `github.com`;

// 网络请求, 不受 host 影响, 请求速度较慢
resolver.resolve4(domain, (err, address)=> {
    // 4.4.4.4 超时
    // 114.114.114.114 约 20ms 左右
    // 8.8.8.8, 50-100ms 左右
    // 三个一起约 6s 左右
    console.timeEnd(label);
    console.log(`${err} ${address}`);
});
```
