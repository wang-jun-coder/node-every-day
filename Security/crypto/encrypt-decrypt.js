const crypto = require('crypto');
const fs = require('fs');
const assert = require('assert');

// 可使用 node create-secret.js 生成公钥私钥
const publicKey = fs.readFileSync('./assets/public.pem');
const privateKey = fs.readFileSync('./assets/private.pem');
// 要传输的信息
const message = 'this is some message need be encrypt';


// 私钥加密公钥解密
const privateKeyEn = crypto.privateEncrypt({
    key: privateKey,
    passphrase: 'private-key-passphrase'
}, Buffer.from(message));
console.log(`私钥加密密文: ${privateKeyEn.toString('hex')}`);
const publicKeyDe = crypto.publicDecrypt(publicKey, privateKeyEn);
assert.deepStrictEqual(message, publicKeyDe.toString(), '公钥解密私钥加密的数据与原数据不一致');


// 公钥加密, 私钥解密
const publicKeyEn = crypto.publicEncrypt(publicKey, Buffer.from(message));
const privateKeyDe = crypto.privateDecrypt({
    key: privateKey,
    passphrase:'private-key-passphrase'
}, publicKeyEn);
console.log(`公钥加密密文: ${privateKeyEn.toString('hex')}`);
assert.deepStrictEqual(message, privateKeyDe.toString(), '私钥解密公钥加密的数据与原数据不一致');



// 对称加密
const algorithm = 'aes-256-cbc';
const key = '1234567890abcdef1234567890abcdef';
const iv = '1234567890abcdef';

const enCipher = crypto.createCipheriv(algorithm, key, iv);
let en = enCipher.update(message, 'utf8', 'hex');
en += enCipher.final('hex');
console.log(`对称加密密文: ${en}`);
const deCipher = crypto.createDecipheriv(algorithm, key, iv);
let de = deCipher.update(en, 'hex', 'utf8');
de += deCipher.final('utf8');
assert.deepStrictEqual(message, de, '解密对称加密数据与原数据不一致');

// // nodejs 支持的一些加密算法和 hash
// console.log(crypto.getCiphers());
// console.log(crypto.getCurves());
// console.log(crypto.getHashes());
