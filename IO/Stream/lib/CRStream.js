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
