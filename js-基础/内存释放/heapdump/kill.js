const heapdump = require('heapdump');
heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');

const generator = function () {
    let a = 0;
    return function () {
        return a++;
    }
};

const createNum = generator();


setInterval(() => {
    console.log(createNum());
}, 10);

heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');
