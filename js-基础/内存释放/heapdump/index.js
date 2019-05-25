const heapdump = require('heapdump');

const a = [];
heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');

function run3() {
    const innerData =  Buffer.allocUnsafe(100);
    const outClosure3 = function () {
        void innerData;
    };
    a.push(function testLeak() {
        return innerData;
    });
    outClosure3();
}

for (let i = 0; i < 10; i++) {
    run3();
}
gc();

heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');


