const fs = require('fs');
const co = require('co');

// 正常函数
fs.readFile('package.json', 'utf8', function (error, json) {
    console.log(`${error} -- ${json}`);
});

// Thunk 转换函数
const Thunkify = function (fn) {
    return  function (...args) {
        return function(callback) {
            fn.call(this, ...args, callback);
        };
    };
};
const readFileThunk = Thunkify(fs.readFile);
const packageJsonThunk = readFileThunk('package.json');
packageJsonThunk(function (error, json) {
    console.log(`${error} ${json}`);
});

// co + thunkify
co(function* () {
    const packageJson = yield readFileThunk('package.json', 'utf8');
    const callbackJs = yield readFileThunk('callback.js', 'utf8');
    const thunkJs = yield readFileThunk('thunk.js', 'utf8');
    return Promise.resolve([packageJson, callbackJs, thunkJs]);
}).then(val => {
    console.log(val);
}).catch(e => {
    console.log(e);
});

