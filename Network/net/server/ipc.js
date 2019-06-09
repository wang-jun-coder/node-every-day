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
