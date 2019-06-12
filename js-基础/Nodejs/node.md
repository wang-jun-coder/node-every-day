## node 基础库

### util
```js
onst util = require('util');
// promise to callback
const asyncFunc = async function() {
    // return `hello world`;
    return Promise.reject(null);
};
const callbackFunc = util.callbackify(asyncFunc);
callbackFunc((err, value) => {
    console.log(`${err}, ${value}`); // Error [ERR_FALSY_VALUE_REJECTION]: Promise was rejected with falsy value,
});

// promisify
const fs = require('fs');
fs.stat[util.promisify.custom] = function(...args) {
    console.log(`this is custom fs.stat`);
    return new Promise((resolve, reject) => {
        fs.stat.call(this, ...args, function (err, ...res) {
            if (err) return reject(err);
            if (res && res.length > 1) {
                return resolve(res);
            }
            return  resolve(res[0]);
        })
    });
};
const stat = util.promisify(fs.stat);
const path = '.';
// const path = '';    // { [Error: ENOENT: no such file or directory, stat '-'] errno: -2, code: 'ENOENT', syscall: 'stat', path: '-' }
stat(path).then(res => {
    console.log(res);
}).catch(e => {
    console.log(e);
});
```
```js
onst util = require('util');
// debug log
const debuglog = util.debuglog('foo');
debuglog(`this is a debug log when NODE_DEBUG=foo`);    // when NODE_DEBUG=foo, FOO 55004: this is a debug log when NODE_DEBUG=foo


// deprecate
const somWillDeprecateFunc = () => {
    console.log(`this a test func`);
};
const deprecate = util.deprecate(somWillDeprecateFunc, 'this function will deprecate', 'DEP00001');
deprecate();
// this a test func
// (node:55008) [DEP00001] DeprecationWarning: this function will deprecate
deprecate(); // this a test func, 仅首次调用触发 process.on('warning'),

// format
const circular = {a:{}};
circular.a.b = circular;
console.log(util.format('%s:%s', 'hello'));                 // hello:%s
console.log(util.format('%s:%d', 'hello', 1.222));          // hello:1.222
console.log(util.format('%s:%i', 'hello', 3));              // hello:3
console.log(util.format('%s:%f', 'hello', 3.33));           // hello:3.33
console.log(util.format('%s:%j', 'hello', {a:'b'}));        // hello:{"a":"b"}
console.log(util.format('%s:%j', 'hello', circular));       // hello:[Circular]
console.log(util.format('%o', {a:'b'}));                    // { a: 'b' }
console.log(util.format('%O', {a:'b'}));                    // { a: 'b' }
console.log(util.format('%O', circular));                   // { a: { b: [Circular] } }
console.log(util.format('%s:%s', 'hello'));                 // hello:%s
console.log(util.format('%s', 'hello', 'world'));           // hello world


// format with option/ node v10.0.0 +
console.log(util.formatWithOptions({ colors: true }, 'See object %O', { foo: 42 }));    // See object { foo: 42 } // 42 is yellow


// getSystemErrorName
const fs = require('fs');
fs.access('file/that/does/not/exist', (err) => {
    const name = util.getSystemErrorName(err.errno);
    console.error(name);  // ENOENT
});
```

```js
const EventEmitter = require('events');
const MyStream = function () {

};
MyStream.prototype.write = function(chunk) {
    this.emit('data', chunk);
};

util.inherits(MyStream, EventEmitter);

const ms = new MyStream();
ms.on('data', chunk => {
    console.log(`ms on data: ${chunk}`);
});
ms.write('this is test data');  // ms on data: this is test data
// ****************** 等同于 *********************
const EventEmitter = require('events');
class MyStream  extends EventEmitter {
    write(chunk) {
        this.emit('data', chunk);
    }
}
const ms = new MyStream();
ms.on('data', chunk => {
    console.log(`ms on data: ${chunk}`);
});
ms.write('this is test data');  // ms on data: this is test data
```
