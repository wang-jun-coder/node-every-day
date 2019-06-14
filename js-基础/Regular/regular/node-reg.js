
//
// ReDOS(Regular expression Denial of Service) 正则表达式拒绝服务攻击
//

// 匹配linux文件路径(漏洞表达式)
const reg = /(\/.+)+$/gi;
// 匹配 / 开始, 任意字符除了换行出现一次或多次, 整体出现一次或多次, 直到结尾


let str = `/`;

while (str.length < 1000) {
    str+='/';
}
str += '\n';

const label = `reg`;
console.time(label);
console.log(str.match(str));    // 同步操作
console.timeEnd(label); // 约 4ms 左右


// nodejs 指南建议使用 node-reg2 @see https://nodejs.org/zh-cn/docs/guides/dont-block-the-event-loop/#redos

// 一类称为DFA（确定性有限状态自动机），另一类称为NFA（非确定性有限状态自动机）。
// js 正则属于 nfa 类型

/**
 DFA对于文本串里的每一个字符只需扫描一次，比较快，但特性较少；NFA要翻来覆去吃字符、吐字符，速度慢，但是特性丰富，所以反而应用广泛，当今主要的正则表达式引擎，如Perl、Ruby、Python的re模块、Java和.NET的regex库，都是NFA的。
 只有NFA才支持lazy和backreference等特性；
 NFA急于邀功请赏，所以最左子正则式优先匹配成功，因此偶尔会错过最佳匹配结果；DFA则是“最长的左子正则式优先匹配成功”。
 NFA缺省采用greedy量词（见item 4）；
 NFA可能会陷入递归调用的陷阱而表现得性能极差。
 * */

const reg1 = /perl|perlman/gi;
console.log(`perlmanbook`.match(reg1));
// [ 'perl' ]
