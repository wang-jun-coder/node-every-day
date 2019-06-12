## url

url 规范仅允许 英文字母、数字和一些保留字符存在，其他字符均需要编码
编码规则很简单， 使用 %+一个字节的十六进制，
如：

* ` `(空格)，十六进制为 20，编码为 %20
* `哈`, 十六进制为 E59388，编码为 %E5%93%88

```js
const cn = '哈'; // %E5%93%88
console.log(Buffer.from(cn).toString('hex'));    // e59388

const space =' ';
console.log(Buffer.from(space).toString('hex'));    // 20
const url = `http://localhost:3000/test?title=${cn}&a=b&c=d${space}`;
const enUrl = encodeURI(url);
const deUrl = decodeURI(enUrl);

console.log(enUrl); // http://localhost:3000/test?title=%E5%93%88&a=b&c=d%20,
console.log(deUrl); // http://localhost:3000/test?title=哈&a=b&c=d
```

### querystring vs qs
url 格式中的 querystring 解析

node.js querystring

```js
const querystring = require('querystring');
const qs = require('qs');


// stringify
const obj1 = {a:'a', b:['b', 'b'], c:'哈'};
const obj2 = {a:'a', b:['b', 'b', {c:'c'}], d:{e:'e'}};
const str1 = `a=a&b=b&b=b&c=%E5%93%88`;                                     // a=a&b=b&b=b&c=哈
const str2 = `a=a&b%5B0%5D=b&b%5B1%5D=b&c=%E5%93%88`;                       // a=a&b[0]=b&b[1]=b&c=哈
const str3 = `a=a&b%5B0%5D=b&b%5B1%5D=b&b%5B2%5D%5Bc%5D=c&d%5Be%5D=e`;      // a=a&b[0]=b&b[1]=b&b[2][c]=c&d[e]=e


const qStr1 = querystring.stringify(obj1);
console.log(qStr1); // a=a&b=b&b=b&c=%E5%93%88
const qStr2 = qs.stringify(obj1);
console.log(qStr2); // a=a&b%5B0%5D=b&b%5B1%5D=b&c=%E5%93%88 // a=a&b[0]=b&b[1]=b&c=哈


const qStr3 = querystring.stringify(obj2);
console.log(qStr3); //a=a&b=b&b=b&b=&d=       // 嵌套对象有问题
const qStr4 = qs.stringify(obj2);
console.log(qStr4); // a=a&b%5B0%5D=b&b%5B1%5D=b&b%5B2%5D%5Bc%5D=c&d%5Be%5D=e   // a=a&b[0]=b&b[1]=b&b[2][c]=c&d[e]=e



// parse querystring 格式
const qObj1 = querystring.parse(str1);
console.log(qObj1); // { a: 'a', b: [ 'b', 'b' ], c: '哈' }
const qObj2 = qs.parse(str1);
console.log(qObj2); // { a: 'a', b: [ 'b', 'b' ], c: '哈' }

// parse qs 格式
const qObj3 = querystring.parse(str2);
console.log(qObj3); // { a: 'a', 'b[0]': 'b', 'b[1]': 'b', c: '哈' }, // querystring 不支持 qs 的对象格式
const qObj4 = qs.parse(str2);
console.log(qObj4); // { a: 'a', b: [ 'b', 'b' ], c: '哈' }, // qs 可以自己还原自己的格式

// parse qs 复杂对象格式
const qObj5 = querystring.parse(str3);
console.log(qObj5); // { a: 'a', 'b[0]': 'b', 'b[1]': 'b', 'b[2][c]': 'c', 'd[e]': 'e' }
const qObj6 = qs.parse(str3);
console.log(qObj6); // { a: 'a', b: [ 'b', 'b', { c: 'c' } ], d: { e: 'e' } }

``
