
// exports 仅是 module.exports 的一个引用, 直接修改 exports 的指向是无效的
module.exports = class Square{
    constructor(width) {
        this.width = width;
    }

    area() {
        return this.width ** 2;
    }
};


console.log(`${__filename} load`);  // /..../shape/Square.js load


const circle = require('./circle');
console.log(require.cache[require.resolve('./circle')].exports === circle);
