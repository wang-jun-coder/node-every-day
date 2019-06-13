
const reg1 = /a.*b/gi;  // a 任意字符任意多次 b
const reg2 = /a.*?b/gi; // a 任意字符任意多次, 但是尽可能少, b
console.log(`aaaaaaaxbbbbbb`.match(reg1));  // [ 'aaaaaaaxbbbbbb' ]
console.log(`aaaaaaaxbbbbbb`.match(reg2));  // [ 'aaaaaaaxb' ]



const reg3 = /a+/gi;    // a 出现一次或多次
const reg4 = /a+?/gi;   // a 出现一次或多次,但尽可能少
console.log(`aaaa`.match(reg3));    // [ 'aaaa' ]
console.log(`aaaa`.match(reg4));    // [ 'a', 'a', 'a', 'a' ]


const reg5 = /ca?b/gi;  // a 出现 0 次或一次
const reg6 = /ca??b/gi; // a 出现 0 次或一次, 但尽可能少
console.log(`cbcab`.match(reg5));   // [ 'cb', 'cab' ]
console.log(`cbcab`.match(reg6));   // [ 'cb', 'cab' ]

const reg7 = /ba{3,5}/gi; // a 重复 3 到 五次
const reg8 = /ba{3,5}/gi; // a 重复 3 到 五次, 但尽可能少
console.log(`bbbbbbaaaaaa`.match(reg7));    // [ 'baaaaa' ]
console.log(`bbbbbbaaaaaa`.match(reg8));    // [ 'baaaaa' ]


// 所谓贪婪懒惰, 是在已匹配的基础上, 尽量缩短或延长,
// 如: reg2, 首先匹配到 aaaaaaaxb 已满足要求, 但是继续增也符合条件, 所以默认会继续向后匹配直到结束或不匹配
