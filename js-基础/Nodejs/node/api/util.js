const util = require('util');

// // promise to callback
// const asyncFunc = async function() {
//     // return `hello world`;
//     return Promise.reject(null);
// };
// const callbackFunc = util.callbackify(asyncFunc);
// callbackFunc((err, value) => {
//     console.log(`${err}, ${value}`); // Error [ERR_FALSY_VALUE_REJECTION]: Promise was rejected with falsy value,
// });
//
// // debug log
// const debuglog = util.debuglog('foo');
// debuglog(`this is a debug log when NODE_DEBUG=foo`);    // when NODE_DEBUG=foo, FOO 55004: this is a debug log when NODE_DEBUG=foo
//
//
// // deprecate
// const somWillDeprecateFunc = () => {
//     console.log(`this a test func`);
// };
// const deprecate = util.deprecate(somWillDeprecateFunc, 'this function will deprecate', 'DEP00001');
// deprecate();
// // this a test func
// // (node:55008) [DEP00001] DeprecationWarning: this function will deprecate
// deprecate(); // this a test func, 仅首次调用触发 process.on('warning'),
//
// // format
// const circular = {a:{}};
// circular.a.b = circular;
// console.log(util.format('%s:%s', 'hello'));                 // hello:%s
// console.log(util.format('%s:%d', 'hello', 1.222));          // hello:1.222
// console.log(util.format('%s:%i', 'hello', 3));              // hello:3
// console.log(util.format('%s:%f', 'hello', 3.33));           // hello:3.33
// console.log(util.format('%s:%j', 'hello', {a:'b'}));        // hello:{"a":"b"}
// console.log(util.format('%s:%j', 'hello', circular));       // hello:[Circular]
// console.log(util.format('%o', {a:'b'}));                    // { a: 'b' }
// console.log(util.format('%O', {a:'b'}));                    // { a: 'b' }
// console.log(util.format('%O', circular));                   // { a: { b: [Circular] } }
// console.log(util.format('%s:%s', 'hello'));                 // hello:%s
// console.log(util.format('%s', 'hello', 'world'));           // hello world
//
//
// // format with option/ node v10.0.0 +
// console.log(util.formatWithOptions({ colors: true }, 'See object %O', { foo: 42 }));    // See object { foo: 42 } // 42 is yellow
//
//
// // getSystemErrorName
// const fs = require('fs');
// fs.access('file/that/does/not/exist', (err) => {
//     const name = util.getSystemErrorName(err.errno);
//     console.error(name);  // ENOENT
// });


// // inherits
// const EventEmitter = require('events');
// const MyStream = function () {
//
// };
// MyStream.prototype.write = function(chunk) {
//     this.emit('data', chunk);
// };
//
// util.inherits(MyStream, EventEmitter);
//
// const ms = new MyStream();
// ms.on('data', chunk => {
//     console.log(`ms on data: ${chunk}`);
// });
// ms.write('this is test data');  // ms on data: this is test data

// extends
// const EventEmitter = require('events');
// class MyStream  extends EventEmitter {
//     write(chunk) {
//         this.emit('data', chunk);
//     }
// }
// const ms = new MyStream();
// ms.on('data', chunk => {
//     console.log(`ms on data: ${chunk}`);
// });
// ms.write('this is test data');  // ms on data: this is test data

// inspect
// class Foo {
//     get [Symbol.toStringTag]() {
//         return `bar`;
//     }
// }
// class Bar {}
// const baz = Object.create(null, {[Symbol.toStringTag]: {value: 'foo'}});
//
// const foo = new Foo();
// const bar = new Bar();
// const weakSet = new WeakSet([{a:1}, {b:2}]);
//
// console.log(util.inspect(foo)); // Foo [bar] {}
// console.log(util.inspect(bar)); // Bar {}
// console.log(util.inspect(baz)); // [Object: null prototype] [foo] {}
// console.log(util.inspect(weakSet)); // WeakSet { [items unknown] }
// console.log(util.inspect(foo, {showHidden: true, depth: null})); // Foo [bar] {}
// console.log(util.inspect(bar, {showHidden: true, depth: null})); // Bar {}
// console.log(util.inspect(baz, {showHidden: true, depth: null})); // [Object: null prototype] [foo] { [Symbol(Symbol.toStringTag)]: 'foo' }
// console.log(util.inspect(weakSet, {showHidden: true, depth: null}));    // WeakSet { { a: 1 }, { b: 2 } }


// inspect color
// console.log(util.inspect.styles);
// // [Object: null prototype] {
// //   special: 'cyan',
// //   number: 'yellow',
// //   bigint: 'yellow',
// //   boolean: 'yellow',
// //   undefined: 'grey',
// //   null: 'bold',
// //   string: 'green',
// //   symbol: 'green',
// //   date: 'magenta',
// //   regexp: 'red' }
// console.log(util.inspect.colors);
// // [Object: null prototype] {
// //   bold: [ 1, 22 ],
// //   italic: [ 3, 23 ],
// //   underline: [ 4, 24 ],
// //   inverse: [ 7, 27 ],
// //   white: [ 37, 39 ],
// //   grey: [ 90, 39 ],
// //   black: [ 30, 39 ],
// //   blue: [ 34, 39 ],
// //   cyan: [ 36, 39 ],
// //   green: [ 32, 39 ],
// //   magenta: [ 35, 39 ],
// //   red: [ 31, 39 ],
// //   yellow: [ 33, 39 ] }
//
// util.inspect.styles.number = 'underline';
// const a = {a : 1};
// console.log(util.inspect(a));

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
