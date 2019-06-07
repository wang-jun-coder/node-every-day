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
