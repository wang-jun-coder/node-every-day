
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
