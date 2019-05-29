(function demo1() {

    function sleep(ms) {
        let exp = Date.now() + ms;
        while (Date.now() < exp) {

        }
    }
    console.log(`begin: ${Date.now()}`);    // begin: 1559053118603
    sleep(100);
    console.log(`end: ${Date.now()}`);      // end: 1559053118707

})();


(function demo2() {
    const { execSync } = require('child_process');
    function sleep(second) {
        execSync(`sleep ${second}`);
    }

    console.log(`begin: ${Date.now()}`);    // begin: 1559053666202
    sleep(1);
    console.log(`end: ${Date.now()}`);      // end: 1559053667215

})();

(function demo2() {


    Array.prototype.AsyncReduce = function (callback, initValue) {
        if (!(this instanceof Array)) {
            throw new TypeError('必须是数组');
        }
        if (this.length === 0) return Promise.resolve(initValue);

        const init = typeof initValue === "undefined" ? this[0] : initValue;
        let start = typeof initValue === "undefined" ? 1 : 0;
        if (start === 1 && this.length === 1) {
            return Promise.resolve(this[0]);
        }

        const reduce = (ret, vals, index) => {
            if (vals.length === 1) return callback(ret, vals.shift(), index++);
            return callback(ret, vals.shift(), index++).then((res) => {
                return reduce(res, vals, index++)
            });
        };
        return reduce(init, this.slice(start), start);
    };


    Array.prototype.AsyncReduce2 = function (callback, initValue) {
        if (!(this instanceof Array)) {
            throw new TypeError('必须是数组');
        }
        if (this.length === 0) return Promise.resolve(initValue);

        const init = typeof initValue === "undefined" ? this[0] : initValue;
        let start = typeof initValue === "undefined" ? 1 : 0;
        if (start === 1 && this.length === 1) {
            return Promise.resolve(this[0]);
        }
        return  this.reduce((preP, cur, index) => {
            return preP.then(preVal => {
                return callback(preVal, cur, index);
            });
        }, Promise.resolve(init))
    };



    [1].AsyncReduce((pre, cur, index) => {
        return new Promise((resolve, reject) => {
            console.log(`${pre} ${cur} ${index}`);
            resolve(pre + cur);
        });
    }).then(result => {
        console.log(`result: ${result}`);
    });

    [].AsyncReduce((pre, cur, index) => {
        return new Promise((resolve, reject) => {
            console.log(`${pre} ${cur} ${index}`);
            resolve(pre + cur);
        });
    }).then(result => {
        console.log(`result: ${result}`);
    });



    [].AsyncReduce2((pre, cur, index) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`${pre} ${cur} ${index}`);
                resolve(pre + cur)
            }, 1000);
        })
    }, Promise.resolve(10))
        .then(result => {
            console.log(`result: ${result}`);
        });

    [1].AsyncReduce2((pre, cur, index) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`${pre} ${cur} ${index}`);
                resolve(pre + cur)
            }, 10);
        })
    }, Promise.resolve(10))
        .then(result => {
            console.log(`result: ${result}`);
        })


})();
