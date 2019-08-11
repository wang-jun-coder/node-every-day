const fs = require('fs');
const util = require('util');
const co = require('co');

// generator 简单使用
function* gen1() {
    yield 1;
    yield 2;
    yield 3;
}
let iterator = gen1();
let cur = iterator.next();
while (!cur.done) {
    console.log(`${cur.value}`);
    cur = iterator.next();
}


// co 模拟实现, 简洁版
const co = function (gen) {
    return new Promise((resolve, reject) => {
        gen = gen(); // 执行 generator, 获取迭代器对象
        // 某个成功操作
        function onFulfilled(res) {
            let ret = null;
            try {
                ret = gen.next(res);
            } catch (e) {
                return reject(e);
            }
            next(ret);
        }
        // 某个失败操作
        function onRejected(error) {
            let ret = null;
            try {
                ret = gen.throw(error)
            } catch (e) {
                return reject(e);
            }
            next(ret);
        }

        // 遍历迭代
        function next(ret) {
            // 若遍历完成, 返回完成值
            if (ret.done) return resolve(ret.value);

            // 若未完成, promisify 继续遍历
            let value = Promise.resolve(ret.value);
            return value.then(onFulfilled).catch(onRejected);
        }

        onFulfilled();
    });
};


const readFile = util.promisify(fs.readFile);
co(function* () {
    const a = yield readFile('package.json', 'utf8');
    const b = yield readFile('package.json', 'utf8');
    const c = yield readFile('package.json', 'utf8');
    return Promise.resolve([a, b, c]);
}).then(contents => {
    console.log(contents);
}).catch(e => {
    console.log(e);
});
