
const fs = require('fs');
fs.readFile('index.js', 'utf8',function (error, content) {
    console.log(`on io callback`);
    process.nextTick(() => {
        console.log(`process.nextTick on io callback 1`);
        process.nextTick(() => {
            console.log(`process.nextTick on io callback 2`);
        })
    })
});

setImmediate(() => {
    console.log(`on check`);
    process.nextTick(() => {
        console.log(`process.nextTick on check callback 1`);
        process.nextTick(() => {
            console.log(`process.nextTick on check callback 2`);
        })
    })
});
setTimeout(() => {
    console.log(`on timer`);
    process.nextTick(() => {
        console.log(`process.nextTick on timer callback 1`);
        process.nextTick(() => {
            console.log(`process.nextTick on timer callback 2`);
        })
    })
});
/**
 on check
 process.nextTick on check callback 1
 process.nextTick on check callback 2
 on timer
 process.nextTick on timer callback 1
 process.nextTick on timer callback 2
 on io callback
 process.nextTick on io callback 1
 process.nextTick on io callback 2
 * */
/**
 on timer
 process.nextTick on timer callback 1
 process.nextTick on timer callback 2
 on check
 process.nextTick on check callback 1
 process.nextTick on check callback 2
 on io callback
 process.nextTick on io callback 1
 process.nextTick on io callback 2
 * */



// const read = fs.createReadStream('index.js');
// read.on('data', function () {
//     console.log(`on io callback`);
//
//     setTimeout(() => {
//         console.log(`on timer`);
//     });
//
//     setImmediate(() => {
//         console.log(`on check`);
//     });
// });
