## 正则

### 元字符
 * `.`   匹配除了换行符以外的所有字符
 * `\w`  匹配字母, 数字, 下划线
 * `\s`  匹配任意空白符
 * `\d`  匹配任意数字
 * `\b`  匹配单词的开始或结束
 * `^`   匹配字符串的开始
 * `$`   匹配字符串的结尾

```js
// .    // 匹配除了换行符以外的所有字符
const str1  = `1234
5678`;
console.log(/./.test(str1));     // true
console.log(str1.match(/./gi));  // [ '1', '2', '3', '4', '5', '6', '7', '8' ]

// \w   // 匹配字母, 数字, 下划线
const str2 = `abc
123
_---
哈哈哈
*&
...`;
console.log(/\w/.test(str2));       // true
console.log(str2.match(/\w/gi));    // [ 'a', 'b', 'c', '1', '2', '3', '_' ]

// \s   // 匹配任意空白符
const str3 = ` 
    a
abc`;
console.log(/\s/.test(str3));       // true
console.log(str3.match(/\s/gi));    // [ ' ', '\n', ' ', ' ', ' ', ' ', '\n' ]

// \d   // 匹配任意数字
const str4 = `123
abc45.6++--`;
console.log(/\d/.test(str4));       // true
console.log(str4.match(/\d/gi));    // [ '1', '2', '3', '4', '5', '6' ]

// \b   // 匹配单词的开始或结束
const str5 = `abc def. c`;
console.log(/\b/.test(str5));       // true
console.log(str5.match(/\b/gi));    // [ '', '', '', '', '', '' ]
// ^    // 匹配字符串的开始
console.log(/^/.test(str5));        // true
console.log(str5.match(/^/gi));     // [ '' ]
// $    // 匹配字符串的结尾
console.log(/$/.test(str5));        // true
console.log(str5.match(/$/gi));     // [ '' ]
```

### 限定符
* `*`	重复零次或更多次
* `+`	重复一次或更多次
* `?`	重复零次或一次
* `{n}`	重复n次
* `{n,}`	重复n次或更多次
* `{n,m}`	重复n到m次

```js
const str1 = 'reggger';

// *        // 重复 0 次或多次
console.log(str1.match(/b*/));    // [ '', index: 0, input: 'reggger' ]
console.log(str1.match(/r*/));    // [ 'r', index: 0, input: 'reggger' ]
console.log(str1.match(/eg*/));   // [ 'eggg', index: 1, input: 'reggger' ]

// +        // 重复 1 次或多次
console.log(str1.match(/g+/));      // [ 'ggg', index: 2, input: 'reggger' ]
console.log(str1.match(/f+/));      // null

// {n}      // 重复 n 次
console.log(str1.match(/g{2}/));    // [ 'gg', index: 2, input: 'reggger' ]
// {n,}     // 重复 n 次或更多次
console.log(str1.match(/g{2,}/));   // [ 'ggg', index: 2, input: 'reggger' ]
// {n,m}    // 重复 n 次到 m 次
console.log(str1.match(/eg{1,5}/)); // [ 'eggg', index: 1, input: 'reggger' ]
```
### | 分支
* `|` 或

```js
// |    // 分支


// 座机号码
// 三位区号+八位号码
// 四位区号+七位号码
// 区号以 0 开头
// 区号与号码之间用 - 链接
// 区号可以使用 () 括起来, 也可以不括起来


// | 分割分支条件
// 有括号 三位区号 + 八位号码
// 无括号 三位区号 + 八位号码
// 有括号 四位区号 + 七位号码
// 无括号 四位区号 + 七位号码

const reg = /^(\(0\d{2}\)-\d{8}$|0\d{2}-\d{8}|\(0\d{3}\)-\d{7}|0\d{3}-\d{7})$/;
console.log(reg.test('027-12345678'));  // true
console.log(reg.test('0558-1234567'));  // true
console.log(reg.test('(027)-87654321'));// true
console.log(reg.test('(0558)-7654321'));// true

console.log(reg.test('(027-87654321')); // false
console.log(reg.test('(027-77654321')); // false
console.log(reg.test('027)-87654321')); // false
console.log(reg.test('0558)-7654321')); // false
console.log(reg.test('(0558-7654321')); // false
console.log(reg.test('(0558-87654321'));// false
``` 

### 分组
* `()`指定子表达式

#### 匹配 ipv4 地址
```js

// @see http://www.regexlib.com/REDetails.aspx?regexp_id=2685
// ^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}$

// ipv4 地址分四段, 中间用 . 链接, 每段最大值为 255,
// 正则匹配单段, 分 4 种 case,
// case1: 三位数, 25 开头, 第三位跟 0-5 => 25[0-5]
// case2: 三位数, 2 开头, 第二位跟 0-4(5 分到 case1), 第三位可以跟 0-9 => 2[0-4]\d
// case3: 三位数, 1 开头, 第二位第三位, 都可以为 0-9   => 1\d{2}
// case4: 两位数, 第一位第二位都可以为 0-9  => \d{1,2}

// 单段匹配正则使用分支 25[0-5]|2[0-4]\d|1\d{2}|\d{1,2}
// 组合, 由于只有三个点, 所以正则分两段, . 可以分给前段也可分给后段, 这里分给后段, 后段使用分组后, 限定重复三次
// (25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})|(\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})){3}
// 为了检测更精确, 再匹配字符串开头和结尾

const reg = /^(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})(\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})){3}$/;

console.log(reg.test('127.0.0.1'));
console.log(reg.test('192.168.34.6'));
console.log(reg.test('42.28.99.47'));
console.log(reg.test('42.28.99.7'));
console.log(reg.test('42.28.99.267'));      // false
```

### 反义

* `\W` 匹配任意不是字母，数字，下划线的字符
* `\S` 匹配任意不是空白符的字符
* `\D` 匹配任意非数字字符
* `\B` 匹配不是单词开头或结尾的位置
* `[^x]` 匹配除x 以外的任意字符， 如 `[^aeiou]` 匹配除 aeiou 以外的任意字符

```js

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
```
### 后项引用

* `(exp)` 匹配 exp，并自动捕获文本到自动（从左到右， 1、2、......）命名的组里
* `(?<name>exp)` `(?'name'exp)` 匹配exp，并捕获文本至名称为 name 的组里
* `(?:exp)` 匹配 exp， 但是不捕获文本，不分配组号

```js
const reg1 = /\b([a-z]+)\s+\1\b/ig;  //([a-z]+) 默认分配组号 1, 并自动捕获匹配字符,在后段 \1 使用, 此表达式可用来匹配连续重复单词
console.log('Is is the cost of of gasoline going up up'.match(reg1));

const reg2 = /\b(?<Word>[a-z]+)\s+\k<Word>\b/ig;  // node 8.9.1 提示非法, 10.16.0 支持
console.log('Is is the cost of of gasoline going up up'.match(reg2));

// const reg3 = /\b(?'Word'[a-z]+)\s+\k<Word>\b/ig;  // js 提示非法
// console.log('Is is the cost of of gasoline going up up'.match(reg3));
```

### 零宽断言

* `(?=exp)` 匹配 exp 表达式前面的位置
* `(?<=exp)` 匹配 exp 表达式后面的位置
* `(?!exp)` 匹配后面跟的不是 exp 的位置
* `(?<!exp)` 匹配前面跟的不是 exp 的位置

```js

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

```

### 贪婪匹配与懒惰匹配
* 默认贪婪匹配，会在符合条件下匹配尽可能多的字符
* `?` 在限定符后跟 `?` 标记尽可能少的字符

```js
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
```


### 资料
* [nodejs 正则](https://nodejs.org/zh-cn/docs/guides/dont-block-the-event-loop/#redos)
* [正则入门](http://deerchao.net/tutorials/regex/regex.htm#mission)
* [正则基础语法](https://www.runoob.com/regexp/regexp-syntax.html)
