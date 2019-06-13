


const reg1 = /\b([a-z]+)\s+\1\b/ig;  //([a-z]+) 默认分配组号 1, 并自动捕获匹配字符,在后段 \1 使用, 此表达式可用来匹配连续重复单词
console.log('Is is the cost of of gasoline going up up'.match(reg1));

const reg2 = /\b(?<Word>[a-z]+)\s+\k<Word>\b/ig;  // node 8.9.1 提示非法, 10.16.0 支持
console.log('Is is the cost of of gasoline going up up'.match(reg2));


// const reg3 = /\b(?'Word'[a-z]+)\s+\k<Word>\b/ig;  // js 提示非法
// console.log('Is is the cost of of gasoline going up up'.match(reg3));
