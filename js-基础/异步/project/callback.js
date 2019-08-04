const async = require('async');


const stepA = callback => {
    setTimeout(() => {
        if (callback) callback(null, 'A');
    }, 1000);
};
const stepB = callback => {
    setTimeout(() => {
        if (callback) callback(null, "B");
    }, 1000);
};

const stepC = callback => {
    setTimeout(() => {
        if (callback) callback(null, "C");
    }, 1000);
};

const stepD = callback => {
    setTimeout(() => {
        if (callback) callback(null, 'D');
    }, 1000);
};

// 传统回调, 遵循 error-first 约定, 回调函数的第一个参数,标识操作中产生的错误, 若为 null, 则操作正常
stepA((errA, valA) => {
    stepB((errB, valB) => {
        stepC((errC, valC) => {
            stepD((errD, valD) => {
                console.log(`${errA} ${valA} -- ${errB} ${valB} -- ${errC} ${valC} -- ${errD} ${valD}`);
            });
        });
    });
});

const add = (a, b, callback) => {
    callback(null, a+b);
};


const tasks = [
    function (callback) {
        return stepA(callback);
    },
    function (callback) {
        return stepB(callback);
    },
    function (callback) {
        return stepC(callback);
    },
    function (callback) {
        return stepD(callback);
    },
];
console.time('series');
// 串行
async.series(tasks, function (error, data) {
    console.timeEnd('series'); // series: 4011.462ms
    console.log(`${error} ${JSON.stringify(data)}`); // null ["A","B","C","D"]
});

console.time('parallel');
// 并发
async.parallel(tasks, function (error, data) {
    console.timeEnd('parallel'); // parallel: 1002.985ms
    console.log(`${error} ${JSON.stringify(data)}`); // null ["A","B","C","D"]
});

console.time('parallelLimit');
// 限定并发个数
async.parallelLimit(tasks, 2, function (error, data) {
    console.timeEnd('parallelLimit'); // parallelLimit: 2005.171ms
    console.log(`${error} ${JSON.stringify(data)}`); // null ["A","B","C","D"]
});

// 流式执行
async.waterfall([
    function (callback) {
        setTimeout(() => {
            return callback(null, {A: 'a'}, {'1': '1'});
        }, 1000);
    },
    function (p1, p2, callback) {
        console.log(`waterfall: ${JSON.stringify(p1)} ${JSON.stringify(p2)}`); // waterfall: {"A":"a"} {"1":"1"}
        return callback(null, {
            ...p1,
            B: 'b'
        });
    },
    function (p1, callback) {
        console.log(`waterfall: ${JSON.stringify(p1)}`); // waterfall: {"A":"a","B":"b"}
        return callback(null, {
            ...p1,
            C: 'c'
        });
    }
], function (error, data) {
    console.log(`waterfall complete: ${error} ${JSON.stringify(data)}`); // waterfall complete: null {"A":"a","B":"b","C":"c"}
});
