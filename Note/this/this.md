## this

### 作用域
* 静态作用域（词法作用域）
	* 变量的作用域，在定义时就已确定，js （大多数语言）采用的都是词法作用域
* 动态作用域
	* 变量的作用域，在使用时才确定（如宏定义）

### this 指向
**this 的指向是在调用函数时，根据函数执行上下文动态确定的**

* 函数体内，在直接调用该函数时（如：f()）, 严格模式this 指向 undefined，非严格模式指向全局（global/window）
* 一般构造函数，this 会绑定到新创建的对象上
* call，apply，bind，则绑定到指定的对象上
* 一般由某对象调用，则绑定到该对象上，（如：obj.fn()）
* 箭头函数则是根据其外层上下文确定

### 实例代码

#### 直接使用
**在执行函数时，若函数被上级对象所调用，则 this 指向上级对象，否则非严格模式下指向全局，严格模式下指向 undefined**

```js
function foo() {
	return this;
}
function bar() {
	'use strict'
	return this;
}
const obj = {
	toString() {
		return 'obj'
	},
	a: 1,
	fn() {
		return this;
	},
	b: {
		toString() {
			return 'obj.b';
		},
		c: 1,
		d() {
			return this;
		}
	},
}
const fn = obj.fn;
console.log(`${foo()} ${bar()} ${fn()} ${obj.fn()} ${obj.b.d()}`); 
// [object global] undefined [object global] obj obj.b
```

#### 构造函数

**构造函数中的 this，指向被new 出的实例，但若构造函数中返回了一个对象，则会导致 new 表达式结果为该对象**

```js
function P1(name) {
	this.name = name;
}
// 此时, this 指向 new 出的对象
const p1 = new P1('P1');
console.log(p1);
// P1 { name: 'P1' }

function P2(name) {
	this.name = name;
	const obj = {
		n: name
	};
	return obj;
}
// 此时 this 也指向 new 出的对象, 但是由于返回值是一个对象, 则表达式 new P2('P2') 返回的并非 new 出的对象,而是 obj 
const p2 = new P2('P2');
console.log(p2);
// { n: 'P2' }

function P3(name){
	this.name = name;
	return 1;
	// return name;
}
// 当返回值是基本类型时, 表达式返回结果仍为 new 出的对象
const p3 = new P3('P3');
console.log(p3);
// P3 { name: 'P3' }
```





### 参考资料
* [作用域](https://zh.wikipedia.org/wiki/%E4%BD%9C%E7%94%A8%E5%9F%9F)
* [一网打尽 this，对执行上下文说 Yes](https://gitbook.cn/gitchat/column/5c91c813968b1d64b1e08fde/topic/5c99a854ccb24267c1d0194f)
