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
