console.log(`b.js begin`);
exports.done = false;

const a = require('./a');
console.log(`b load a.js, a.done = ${a.done}`);

exports.done = true;
console.log(`b end`);
