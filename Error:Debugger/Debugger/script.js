global.a = 1;
setTimeout(() => {
    debugger;
    console.log(global.a);
}, 1000);
console.log('hello world');
