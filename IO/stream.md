## Stream

### 基本使用
#### 可写流基本使用

```js
// 可写流使用
const fs = require('fs');
const writeStream = fs.createWriteStream('test.txt');
let times = 1000000;
const write = () => {
    let ok = true;
    while (times >= 0 && ok) {
        ok = writeStream.write(`this is text ${times}\n`);
        times --;
    }
    if (!ok) {
        writeStream.once('drain', write);
    }
};
write();
```

```js
// pipe && unpipe
const fs = require('fs');
const readStream =  fs.createReadStream('./index.js');
process.stdout.on('pipe', src => {
    console.log(`有数据通过管道写入数据: ${src === readStream}`);
});
readStream.pipe(process.stdout);

// unpipe
process.stdout.on('unpipe', src => {
    console.log(`已移除可写流管道: ${src === readStream}`);
});
readStream.unpipe(process.stdout);

```

```js
// cork && uncork
process.stdout.cork();
process.stdout.cork();  // cork 与 uncork 成对出现, cork 几次, 就需要 uncork 几次

process.stdout.write('this is 1\n');
process.stdout.write('this is 2\n');
process.stdout.write('this is 3\n');
process.stdout.write('this is 4\n');
process.stdout.write('this is 5\n');
console.error(`write complete`);

// console.log 基于 process.stdout, 此处将 process.stdout cork, 暂时无法使用 console.log, 使用 console.error 代替输出
process.nextTick(() => {        //  使用 process.nextTick 延迟调用, 确保本事件循环阶段的 write 均被处理
    console.error(`will output write data`);
    process.stdout.uncork();
    console.error('uncork will complete');
    process.stdout.uncork();

});
```

#### 可读流基本使用

```js
// 消费流
// 手动 read
const fs = require('fs');
const readStream = fs.createReadStream('test.txt');
readStream.on('readable', function(){
    let data = null;
    // read 完毕后, 再调用返回的为 null
    while (null !== (data = this.read())) {
        console.log(`read: ${data}`)
    }
});
// *******************************
// on data
const fs = require('fs');
const readStream = fs.createReadStream('test.txt');
readStream.on('data', data=>{
    console.log(`data: ${data}`);
});
// 注意: 不是所有的流都会触发 close 事件
readStream.on('close', ()=>{
    console.log(`close: reading complete`);
});
// end. 流的数据处理完毕
readStream.on('end', () => {
    console.log(`end: readStream has end`);
});
```

```js
// readable.readableFlowing
const { PassThrough, Writable } = require('stream');

const pass = new PassThrough();
const writable = new Writable();

// 注意: readable.readableFlowing, null, false, true
pass.pipe(writable);
pass.unpipe();

pass.on('data', chunk => console.log(chunk.toString()));
pass.end('some data');

pass.resume(); // 当 readableFlowing 为 false, 添加 on data 无法自动开启流, 需手动开始
```

```js
// pipe and pipeline
const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream'); // nodejs v10.0.0 add

const read = fs.createReadStream('test.txt');
const gzip = zlib.createGzip();
const write = fs.createWriteStream('test.txt.gz');

// read.pipe(gzip).pipe(write);
// // 应对其他流 均做 error 监听, 此处简化
// write.on('close', () => {
//     console.log(`file write end`);
// });

// nodejs v10.0.0 添加
pipeline(read, gzip, write, err => {
    console.log(`complete: ${err}`);
});

```

#### Duplex 流基本使用

```js
// duplex.js 
const net = require('net');
const socket = net.connect(3000, '127.0.0.1', () => {
    socket.write(Buffer.from(`this is a message from duplex.js`));
    socket.on('data', chunk => {
        console.log(`duplex.js has receive: ${chunk.toString()}`)
    })
});

// tcp-server.js
const net = require('net');
const server = net.createServer(socket => {
    console.log(`tcp-server.js on socket: ${socket.remoteAddress}`);
    // 这是一个双工流
    socket.on('data', chunk => {
        console.log(`tcp-server.js receive: ${chunk.toString()}`);
        socket.write(`tcp-server.js has receive: ${chunk.toString()}`);
    })
});
server.listen(3000);
```
#### transfrom 流基本使用

```js
// transform 举例(实际上是 duplex 流的一种)
const zlib = require('zlib');
const gzip = zlib.createGzip();
// 实现了 readable 相关的接口, 可以输出数据
gzip.on('data', chunk => {
    console.log(`gzip on data: ${chunk}`);
});
// 实现了 writable 相关接口, 可以写入输入
gzip.write('this is some test string');

```

#### 对象模式
```js
const { Writable } = require('stream');

const myWritable = new Writable({
    write(chunk, encoding, callback) {
        // ...
        console.log(chunk);
    },
    objectMode: true
});

// 如果不设置 objectMode: true, 会报错 TypeError [ERR_INVALID_ARG_TYPE]: The "chunk" argument must be one of type string or Buffer. Received type object
myWritable.write({key1: 'value1', key2: 'value2'});
// 改变已存在流的对象模式是不安全的
```

### 自定义流

#### 只读流(_read)

```js
// @see http://nodejs.cn/api/stream.html#stream_an_example_counting_stream
const { Readable } = require('stream');

class CRStream extends Readable {

    constructor(opt) {
        super(opt);
        this._index = 1;
        this._max = 100000;
    }

    _read(size) {
        const i = this._index++;
        if (i > this._max) {
            return this.push(null); // 标记结束
        }
        const str = String(i);
        return this.push(Buffer.from(str, 'ascii'));
    }
}
module.exports = CRStream;
```
#### 只写流(_write, _writev, _final)

```js
// @see https://nodejs.cn/api/stream.html#stream_decoding_buffers_in_a_writable_stream
const { Writable } = require('stream');
const { StringDecoder } = require('string_decoder');

class CWStream extends Writable {
    constructor(opt) {
        super(opt);
        this._decode = new StringDecoder(opt && opt.defaultEncoding);
        this.data = '';
    }

    _write(chunk, encoding, callback) {
        let err = null;
        try {
            if (encoding === 'buffer') {
                chunk = this._decode.write(chunk);
            }
            this.data += chunk;
        } catch (e) {
            err = e;
        }

        if (typeof callback === 'function') callback(err);
    }

    _writev(chunks, callback) {
        let err = null;
        try {
            chunks.forEach(chunkv => {
                const {chunk, encoding} = chunkv;
                this.data += encoding === 'buffer' ? this._decode.write(chunk) : chunk;
            });
        } catch (e) {
            err = e;
        }
        if (typeof callback === 'function') callback(err);
    }

    _final(callback) {
        this.data += this._decode.end();
        if (typeof callback === 'function') callback();
    }
}
module.exports = CWStream;

```

#### 可读可写流(_read, _write, _writev, _final)

```js
// 分别实现 _read, _write, _writev, _final 方法即可
```


#### 转换流(_transform, _flush, _final)

```js

// @see http://nodejs.cn/api/stream.html#stream_an_example_counting_stream
const { Transform } = require('stream');

class CTStream extends Transform {
    constructor(opt={}) {
        super({
            ...opt,
            objectMode: true
        });
    }

    _transform(chunk, encoding, callback) {
        chunk |= 0;
        const data = chunk.toString(16);
        callback(null, '0'.repeat(data.length%2) + data)
    }

}
module.exports = CTStream;
```

