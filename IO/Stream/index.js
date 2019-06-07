

// 基本使用
// const stream = require('stream');
// 读取流使用
// const readStream = fs.createReadStream('test.txt');
// readStream.on('data', chunk => {
//     console.log(readStream._readableState.buffer);
// });


// 使用流实现 http
// const http = require('http');
// const server = http.createServer((req, res) => {
//     let body = ``;
//     // 以 utf8 编码获取 请求 body 数据, 使用 curl localhost:3000 -d "{\"key\":\"value\"}"
//     req.setEncoding('utf8');
//     req.on('data', chunk => body+=chunk);
//     req.on('end', () => {
//         console.log(req.url);
//         try {
//             const data = JSON.parse(body);
//             res.write(typeof data);
//             res.end();
//         } catch (e) {
//             res.statusCode = 400;
//             res.end(`请求错误: ${e.message}`);
//         }
//     });
// });
// server.listen(3000);


// const CWStream = require('./lib/CWStream');
//
// const euro = [[0xE2, 0x82], [0xAC]].map(Buffer.from);
// const w = new CWStream();
//
// w.write('货币: ');
// w.write(euro[0]);
// w.end(euro[1]);
// console.log(w.data); // 货币: €


// const CRStream = require('./lib/CRStream');
// const r = new CRStream();
// r.on('data', chunk => {
//     console.log(`${chunk}`);
// });
// r.on('end', () => {
//     console.log(`on read end`);
// });


const CTStream = require('./lib/CTStream');

const t = new CTStream();
t.on('data', chunk => console.log(chunk));

t.write(1);
t.write(10);
t.write(100);

