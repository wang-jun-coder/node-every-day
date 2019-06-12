
/**
 * 常用元字符
 *
 * .    // 匹配除了换行符以外的所有字符
 * \w   // 匹配字母, 数字, 下划线
 * \s   // 匹配任意空白符
 * \d   // 匹配任意数字
 * \b   // 匹配单词的开始或结束
 * ^    // 匹配字符串的开始
 * $    // 匹配字符串的结尾
 * */

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
