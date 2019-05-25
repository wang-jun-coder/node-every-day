console.log(process.memoryUsage());

(function demo1() {
    console.log('------------------ demo1 ------------------');
    console.log(process.memoryUsage());
    let arr = [];
    let i = 10000;
    while(i) {
        arr.push(1);
        i--;
    }
    console.log(process.memoryUsage());
    console.log('------------------ demo1 ------------------');
})();

(function demo2() {
    console.log('------------------ demo2 ------------------');
    console.log(process.memoryUsage());
    let arr = [];
    let i = 10000;
    while(i) {
        arr.push(1);
        i--;
    }
    console.log(process.memoryUsage());
    console.log('------------------ demo2 ------------------');
})();

(function demo1() {
    console.log('------------------ demo3 ------------------');
    console.log(process.memoryUsage());
    let arr = [];

    let i=10000;
    while(i) {
        arr.push(Buffer.allocUnsafe(10000));
        i--;
    }
    console.log(process.memoryUsage());
    console.log('------------------ demo3 ------------------');
})();


setTimeout(() => console.log(process.memoryUsage()), 100);
