
const reg1 = /\S+/; // 任意非空白符至少出现一次, 匹配非空白字符串

console.log(reg1.test(`a b`));  // true
console.log(reg1.test(` b`));   // true
console.log(reg1.test(' '));    // false
console.log(reg1.test(`


`));  // false


const reg2 = /<a[^>]+>/;    // 匹配<> 括起的, 以 a 开头, 除> 以外的字符串
console.log(reg2.test('<a >')); // true
console.log(reg2.test('<a>'));  // false
console.log(reg2.test('<a->')); // true
