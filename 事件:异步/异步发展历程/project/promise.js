const fs = require('fs');
const co = require('co');

const promisify = fn => {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn.call(this, ...args, function (error, data) {
                if (error) return reject(error);
                return resolve(data);
            })
        });
    };
};

const readFile = promisify(fs.readFile);

const readPackageJson = readFile('package.json', 'utf8');
const readCallbackJs = readFile('callback.js', 'utf8');
const readThunk = readFile('thunk.js', 'utf8');
const readPromise = readFile('promise.js', 'utf8');

// 单步promise
readPackageJson.then(packageJson => {
   console.log(packageJson);
   return readCallbackJs;
}).then(callbackJs => {
    console.log(callbackJs);
    return readThunk;
}).then(thunkJs => {
    console.log(thunkJs);
    return readPromise;
}).then(promiseJs => {
    console.log(promiseJs);
}).catch(e => {
    console.log(e);
});

// promise all
Promise.all([readPackageJson, readCallbackJs, readThunk, readPromise])
    .then(contents => {
        console.log(contents);
    })
    .catch(e => {
        console.log(e);
    });

// co
co(function* () {
    const packageJson = yield readPackageJson;
    const callbackJs = yield readCallbackJs;
    const thunkJs = yield readThunk;
    const promiseJs = yield readPromise;
    return Promise.resolve([packageJson, callbackJs, thunkJs, promiseJs]);
}).then(contents => {
    console.log(contents);
}).catch(e => {
    console.log(e);
});

