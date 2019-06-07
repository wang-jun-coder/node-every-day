const { Writable } = require('stream');

const myWritable = new Writable({
    write(chunk, encoding, callback) {
        // ...
        console.log(chunk);
    },
    objectMode: true
});

// 如果不设置 objectMode: true, 会报错 TypeError [ERR_INVALID_ARG_TYPE]: The "chunk" argument must be one of type string or Buffer. Received type object
// 改变已存在流的对象模式是不安全的
myWritable.write({key1: 'value1', key2: 'value2'});
