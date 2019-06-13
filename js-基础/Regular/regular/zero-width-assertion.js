
const reg1 = /\b[a-zA-Z']+(?=ing\b)/gi;
// (?=ing\b) 正向零宽断言, 表示以 ing 后跟单词结尾的一个位置, 该位置无宽度,
console.log(`I'm singing while you're dancing`.match(reg1));    // [ 'sing', 'danc' ]


const reg2 = /(?<=\bsing)[a-zA-Z']+\b/gi;
// (?<=\bsing) 匹配单词开头 + sing 开头的位置
console.log(`I'm singing while you're dancing`.match(reg2));    // [ 'ing' ]


const reg3 = /\b[a-zA-Z']+(?!ing\b)/gi;
// (?=ing\b) 正向零宽断言, 表示不是以 ing 后跟单词结尾的一个位置, 该位置无宽度,
console.log(`I'm singing while you're dancing`.match(reg3));    // [ 'I\'m', 'singing', 'while', 'you\'re', 'dancing' ]


const reg4 = /((?<=\d)\d{3})+\b/gi;
// 数字的结尾的位置, 比如 0123456789, 第一个匹配到的位置就是 01 之间, 然后跟着三位的数字, 这种组合至少出现一次,后面跟单词结尾
console.log(`0123456789`.match(reg4));


const reg5 = /(?<=\s)\d+(?=\s)/gi;
// 匹配任意空白符的结尾, 然后跟上数字至少出现一次, 再跟上空白符的开头
console.log(`12 34   56 78`.match(reg5));   // [ '34', '56' ]

// 匹配 无属性 html 标签内的内容
const reg6 = /(?<=<(\w+)>).*(?=<\/\1>)/gi;
// (?<=<(\w+)>), 零宽断言, 匹配 <(\w+)> 表达式后的位置, <(\w+)> 则标记 <开始, 然后是至少一次的 字母数组下划线, 最后是 >
// .* 则匹配除换行以外的所有字符, 出现零次或更多
// (?=<\/\1>) 零宽断言, 匹配 <\/\1 表达式前面的位置, <\/\1> 标记, <\ 开头, 然后后项引用分组 1 的匹配值(\w+), 最后是>

console.log(`<a>hhhh</a>`.match(reg6)); // [ 'hhhh' ]
console.log(`<a>hhhh</b>`.match(reg6)); // null


// 零宽断言, 使用表达式来匹配, 然后通过取这个匹配字符的开头或结尾的位置, 但是长度为 0,
