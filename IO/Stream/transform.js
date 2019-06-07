
// transform 举例(实际上是 duplex 流的一种)
const zlib = require('zlib');
const gzip = zlib.createGzip();
// 实现了 readable 相关的接口, 可以输出数据
gzip.on('data', chunk => {
    console.log(`gzip on data: ${chunk}`);
});
// 实现了 writable 相关接口, 可以写入输入
gzip.write('this is some test string');
