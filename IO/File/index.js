// const fs = require('fs');
// fs.open('index.js', 'r', (err, fd) => {
//     if (err) return console.error(err);
//
//     fs.fstat(fd, (err, stat) => {
//         if (err) return err;
//
//         const buffer = Buffer.alloc(512);
//         fs.read(fd, buffer, 0, 512, null, (error, bytesRead, buffer) => {
//
//             if (error) console.log(error);
//             console.log(`bytesRead: ${bytesRead}\nread: ${buffer.toString()}`);
//
//             fs.close(fd, err => {
//                 if (err) console.log(err);
//             })
//         });
//     })
// });


// const str1 = `1234567890`;
// console.log(`str1.length: ${str1.length}`);
//
// const str2 = '一二三四五六七八九零';
// console.log(`str2.length: ${str2.length}`);
// console.log(`str2.length: ${Buffer.from(str2).length}`);


const fs = require('fs');
// const read = fs.createReadStream('utf8.txt'); // 7574662d380a
const read = fs.createReadStream('utf16.txt'); // feff007500740066002d00310036000a, bom 头 feff
read.on('data', chunk => {
    const str = chunk.toString();
    let code = '';
    str.split('').map(char => {
        const result = char.charCodeAt(0).toString(16);
        code+= '0'.repeat(result.length%2) + result;
    });
    console.log(code);  // 7574662d380a
    console.log(chunk.toString('hex'));    // 7574662d380a
});






