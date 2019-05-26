console.log(`a begin`);
exports.done = false;

const b = require('./b');
console.log(`a load b.js, b.done = ${b.done}`);

exports.done = true;
console.log(`b end`);
