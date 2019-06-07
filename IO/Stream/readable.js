
// // 消费流
// // 手动 read
// const fs = require('fs');
// const readStream = fs.createReadStream('test.txt');
// readStream.on('readable', function(){
//     let data = null;
//     // read 完毕后, 再调用返回的为 null
//     while (null !== (data = this.read())) {
//         console.log(`read: ${data}`)
//     }
// });

// // on data
// const fs = require('fs');
// const readStream = fs.createReadStream('test.txt');
// readStream.on('data', data=>{
//     console.log(`data: ${data}`);
// });
// // 注意: 不是所有的流都会触发 close 事件
// readStream.on('close', ()=>{
//     console.log(`close: reading complete`);
// });
// // end. 流的数据处理完毕
// readStream.on('end', () => {
//     console.log(`end: readStream has end`);
// });
//


// // readable.readableFlowing
// const { PassThrough, Writable } = require('stream');
//
// const pass = new PassThrough();
// const writable = new Writable();
//
// // 注意: readable.readableFlowing, null, false, true
// pass.pipe(writable);
// pass.unpipe();
//
// pass.on('data', chunk => console.log(chunk.toString()));
// pass.end('some data');
//
// pass.resume(); // 当 readableFlowing 为 false, 添加 on data 无法自动开启流, 需手动开始


// // pipe and pipeline
// const fs = require('fs');
// const zlib = require('zlib');
// const { pipeline } = require('stream'); // nodejs v10.0.0 add
//
// const read = fs.createReadStream('test.txt');
// const gzip = zlib.createGzip();
// const write = fs.createWriteStream('test.txt.gz');
//
// // read.pipe(gzip).pipe(write);
// // // 应对其他流 均做 error 监听, 此处简化
// // write.on('close', () => {
// //     console.log(`file write end`);
// // });
//
// // nodejs v10.0.0 添加
// pipeline(read, gzip, write, err => {
//     console.log(`complete: ${err}`);
// });
