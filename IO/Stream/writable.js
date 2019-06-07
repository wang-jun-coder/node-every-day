
// 可写流使用(注意流的背压)
// const fs = require('fs');
// const writeStream = fs.createWriteStream('test.txt');
// let times = 1000000;
// const write = () => {
//     let ok = true;
//     while (times >= 0 && ok) {
//         ok = writeStream.write(`this is text ${times}\n`);
//         times --;
//     }
//     if (!ok) {
//         writeStream.once('drain', write);
//     }
// };
// write();


// // pipe && unpipe
// const fs = require('fs');
// const readStream =  fs.createReadStream('./index.js');
// process.stdout.on('pipe', src => {
//     console.log(`有数据通过管道写入数据: ${src === readStream}`);
// });
// readStream.pipe(process.stdout);
//
// // unpipe
// process.stdout.on('unpipe', src => {
//     console.log(`已移除可写流管道: ${src === readStream}`);
// });
// readStream.unpipe(process.stdout);


// cork && uncork
process.stdout.cork();
process.stdout.cork();  // cork 与 uncork 成对出现, cork 几次, 就需要 uncork 几次

process.stdout.write('this is 1\n');
process.stdout.write('this is 2\n');
process.stdout.write('this is 3\n');
process.stdout.write('this is 4\n');
process.stdout.write('this is 5\n');
console.error(`write complete`);

// console.log 基于 process.stdout, 此处将 process.stdout cork, 暂时无法使用 console.log, 使用 console.error 代替输出
process.nextTick(() => {        //  使用 process.nextTick 延迟调用, 确保本事件循环阶段的 write 均被处理
    console.error(`will output write data`);
    process.stdout.uncork();
    console.error('uncork will complete');
    process.stdout.uncork();

});
