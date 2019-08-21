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

### 示例代码

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

#### call/apply/bind 指定

**call/apply/bind 均用来改变 this 指向，call 不定参数，apply 使用数组包裹参数， bind 返回函数需再次执行，bind 返回函数也可当做构造函数**

```js
function foo(arg) {
	console.log(arg);
	return this;
}
const a = {
	toString() {
		return 'a';
	}
};
const b = {
	toString() {
		return 'b';
	}
}
// 一般使用, this 指向 call/apply/bind 所指定的值
const fooApplyRes = foo.apply(a, ['apply']);
const fooCallRes = foo.call(a, 'call');
const fooBindRes = foo.bind(a)('bind');
// bind 再次绑定仍然指向初始绑定的 this 值
const fooBindBindRes = foo.bind(a).bind(b)('bind');
// 对 bind 函数进行 new 操作, 返回 new 出的实例对象
const fooBind = foo.bind(a);
const obj = new fooBind();

console.log(`${fooApplyRes} ${fooCallRes} ${fooBindRes} ${fooBindBindRes} ${obj}`);
// a a a a [object Object]
```
#### 上下文对象中调用的 this

**一般由上下文对象调用时，绑定在该对象上，对于多级调用，绑定至最后调用它的对象上**

```js
const obj1 = {
	text: 'obj1',
	func() {
		return this.text;
	}
}
const obj2 = {
	text: 'obj2',
	obj3: {
		text: 'obj3',
		func() {
			return this.text;
		}	
	}
}
console.log(`${obj1.func()} ${obj2.obj3.func()}`);
// obj1 obj3
const o1 = {
	text: 'o1',
	fn() {
		return this.text;
	}
}
const o2 = {
	text:'o2',
	fn() {
		// p1 调用其 fn, this 指向 o1
		return o1.fn();
	}
}
const o3 = {
	text: 'o3',
	fn() {
		const fn = o1.fn;
		// 直接调用 fn, 非严格模式 this 指向 global
		return fn();
	}
}

console.log(`${o1.fn()} ${o2.fn()} ${o3.fn()}`);
// o1 o1 undefined
```

#### 箭头函数中的 this

**箭头函数的this 由其上层上下文 this 决定**

```js
function f1() {
	const arrowFn = () => {
		return this;
	};
	return arrowFn();
}

const obj = {
	toString() {
		return 'obj'
	},
	f1: f1
};

// 直接调用f1, 函数指向 global
const res1 = f1();

// 由 obj 调用, 指向 obj
const res2 = obj.f1();
console.log(`${f1()} ${res2}`);
// [object global] obj

function f2() {
	return () => {
		return this;
	}
}

const arrow = f2();
const obj1 = {
	toString() {
		return 'obj1'
	},
	f2: f2,
	obj2: {
		toString() {
			return 'obj3'
		},
	}
}
obj1.obj2.f2 = obj1.f2();
console.log(`${arrow()} ${obj1.f2()()} ${obj1.obj2.f2()}`);
// [object global] obj1 obj1
```

### 应用

* 模拟 apply 函数（实际上模拟出 apply，则 call 也就出来了）
	
	```js
	function apply(obj, args) {
		if ('function' !== typeof this) throw new TypeError('apply must be called by function');
	
		const target = new Object(obj);
		const key = Symbol('target-key');
	
		target[key] = this;
	
		const ret = target[key](...args);
		delete target[key];
		return ret;
	}
	```
	
* 模拟 bind 函数

	```js
	function bind(obj, ...args) {
		if ('function' !== typeof this) throw new TypeError('bind must be called by function');
	
		const self = this;
		// 构造原型
		function F(){};
		F.prototype = this;
	
		function bound(...innerArgs) {
			return self.apply(this.prototype && this.instanceof(F) ? this : obj || this, [...args, ...innerArgs]);
		}
		// new 一个实例, 避免原型污染
		bound.prototype = new F();
		return bound;
	}
	``` 
* hook 函数（如：express 中间件，拦截 res.end 函数，统计请求时长）

	```js
	const express = require('express');
	const app = express();
	app.use(function(req, res, next) {
		// 利用 apply/call 可以 hook 函数的对应事件, 比如此处用于统计请求时间
		console.time(`${req.method} ${req.url}`);
		const end = res.end;
		res.end = function(...args) {
			end.apply(res, args);
			console.timeEnd(`${req.method} ${req.url}`);
		}
		next();
	});
	app.get('/', function(req, res, next) {
		res.end('hello world');
	});
	app.listen(3000);
	```

### 参考资料
* [作用域](https://zh.wikipedia.org/wiki/%E4%BD%9C%E7%94%A8%E5%9F%9F)
* [一网打尽 this，对执行上下文说 Yes](https://gitbook.cn/gitchat/column/5c91c813968b1d64b1e08fde/topic/5c99a854ccb24267c1d0194f)
