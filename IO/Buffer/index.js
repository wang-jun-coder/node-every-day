

// Buffer 类在全局作用域中，因此无需使用 require('buffer').Buffer。
// buffer 实例类似于整数数组, 但对应于 v8 堆外部的固定大小的原始内存分配
// const char = '我';
//
// const buffer = Buffer.from(char);
// console.log(buffer);        // <Buffer e6 88 91>
//
// const hex = buffer.toString('hex');
// console.log(hex);           // e68891
//
// const utf8 = buffer.toString('utf8');
// console.log(utf8);          // 我
//
// const ascii = buffer.toString('ascii');
// console.log(ascii);
//
//
// const binary = char.charCodeAt(0).toString(2);
// console.log(binary);         // 110001000010001
//
// const eight = char.charCodeAt(0).toString(8);
// console.log(eight);         // 61021
//
// const ten = char.charCodeAt(0);
// console.log(ten);           // 25105
//
// const sixteen = char.charCodeAt(0).toString(16);
// console.log(sixteen);       // 6211
// // 我的 Unicode 值 uni6211, uni6211, &#x6211;



// 使用 buffer
// const buffer = Buffer.allocUnsafe(26);
// for (let i = 0; i < 26; i++) {
//     // 存入十进制的 ASCII 值, 97 为 十进制 a 的 ASCII 值
//     buffer[i] = i+ 97;
// }
// console.log(buffer);                             // <Buffer 61 62 63 64 65 66 67 68 69 6a 6b 6c 6d 6e 6f 70 71 72 73 74 75 76 77 78 79 7a>
// console.log(buffer.toString('ascii'));  // abcdefghijklmnopqrstuvwxyz
// console.log(buffer.toString('hex'));    // 6162636465666768696a6b6c6d6e6f707172737475767778797a
// console.log(buffer.toString('utf8'));   // abcdefghijklmnopqrstuvwxyz
// console.log(buffer.toString('base64')); // YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXo=



// 获取文件头
// const fs = require('fs');
// const read = fs.createReadStream('arrow.png');
// let pngBuffer = null;
// read.on('data', data => {
//     if (!pngBuffer) pngBuffer = data;
//     else pngBuffer = pngBuffer.concat(data);
// });
//
// read.on('close', () => {
//     console.log(pngBuffer);
//     const hex = pngBuffer.toString('hex');
//
//     const len = 8;
//     const header = hex.substr(0,len);
//     console.log(header);    // 89504e47, png 文件头
//     const end = hex.substr(hex.length-len, len);
//     console.log(end);       // ae426082, png 文件尾
// });



// // Buffer 与 TypeArray
// const arr = new Uint16Array(2);
// // const arr = new Uint8Array(2);
// arr[0] = 7000;
// arr[1] = 8000;
// console.log(arr);   // Uint16Array [ 7000, 8000 ]
//
// const buf1 = Buffer.from(arr);          // 拷贝 buffer
// const buf2 = Buffer.from(arr.buffer);   // 共享 buffer
//
//
// console.log(buf1);      // <Buffer 58 40>
// console.log(buf2);      // <Buffer 58 1b 40 1f>
//
// arr[0] = 63;
// arr[1] = 64;
//
// console.log(buf1);      // <Buffer 58 40>
// console.log(buf2);      // <Buffer 3f 00 40 00>



// buffer 与 StringDecode

const { StringDecoder } = require('string_decoder');

// Decode to utf8
const decode = new StringDecoder('utf8');
const cent = Buffer.from([0xC2, 0xA2]);
console.log(cent);                      // <Buffer c2 a2>
console.log(`${decode.write(cent)}`);   // ¢

const euro = Buffer.from([0xE2, 0x82, 0xAC]);
console.log(euro);                      // <Buffer e2 82 ac>
console.log(`${decode.write(euro)}`);   // €

// 分段 Decode
let str = decode.write(Buffer.from('e2', 'hex'));
console.log(`${str}`);  //
str = decode.write(Buffer.from('82', 'hex'));
console.log(`${str}`);  //
str = decode.end(Buffer.from('ac', 'hex'));
console.log(`${str}`);  // €


// Decode to hex
const decodeHex = new StringDecoder('hex');
const centStr = '¢';
console.log(`${decodeHex.write(Buffer.from(centStr, 'utf8'))}`);   // c2a2
const euroStr = '€';
console.log(`${decodeHex.write(Buffer.from(euroStr, 'utf8'))}`);   // e282ac
