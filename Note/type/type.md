## JavaScript 的类型

### 类型判断
js 中类型判断有以下几种方式，不同的方式各有优缺点，具体如下

* typeof
	* typeof 判断类型代码示例

	```js
	// 基本类型中可以检测出除 null 外的所有类型, null 会被判断为 Object
	console.log(typeof undefined);	// undefined
	console.log(typeof null);		// object
	console.log(typeof 1);			// number
	console.log(typeof true);		// boolean
	console.log(typeof '1');		// string
	console.log(typeof Symbol('1'));// symbol

	// 引用类型中,仅能检测出 function 类型
	console.log(typeof {});				// object
	console.log(typeof function(){});	// function
	console.log(typeof []);				// object
	console.log(typeof new Date());		// object
	```
	* **typeof 能判断除 null 外的基本类型，对于复杂类型仅能判断出 function 类型，null 会被判断为 object**

* instanceof
	* instanceof 的判断逻辑：a instanceof b, 则判断 a 是否为 b 的实例，即，a 的原型链上是否存在 b，因此 instanceof 无法准确判断基本类型
	* 代码示例
	
	```js
	// instanceof 无法判断基本类型
	console.log(1 instanceof Number);	
	console.log(Number(1) instanceof Number);
	console.log(new Number(1) instanceof Number); // new 使得对象为 Number 的实例
	// false false true

	// __proto__ 是一组 getter/setter 函数, 用于访问对象内部的原型
	// prototype 是对象继承属性方法的来源, 一般为了避免修改原型导致影响其他对象, 原型一般 new 实例
	console.log((1).__proto__ == Number.prototype && (Number(1)).__proto__.__proto__ == Number.prototype.__proto__);// true

	function Person(name) {
		this.name = name;
	}
	const p = new Person('somebody');
	console.log(p instanceof Person); // true
	console.log(p.__proto__ === Person.prototype); // true
	console.log(p.__proto__.__proto__ === Object.prototype); // true

	// 模拟实现 instanceof, 实际上就是遍历对比原型
	function isInstanceof(obj, p) {
		if (typeof obj !== 'object') return false;
		while(obj) {
			if (p.prototype === obj.__proto__ ) return true;
			obj = obj.__proto__;
		}
		return false;
	}
	console.log(isInstanceof(p, Person)); // true
	
	```

* constructor
	* 判断构造函数基本可以获取对象真实类型，除了 undefined 与 null， 这两种类型不存在 constructor 
	* 示例代码
	
	```js
	// constructor 判断
	console.log((1).constructor); // [Function: Number]
	console.log('1'.constructor); // [Function: String]
	console.log((true).constructor); // [Function: Boolean]
	console.log(Symbol('s').constructor); // [Function: Symbol]
	// console.log(null.constructor); // TypeError: Cannot read property 'constructor' of null
	// console.log(undefined.constructor); // TypeError: Cannot read property 'constructor' of undefined
	console.log({}.constructor); // [Function: Object]
	console.log([].constructor); // [Function: Array]
	console.log(new Set().constructor); // [Function: Set]
	console.log(new Date().constructor); // [Function: Date]
	console.log((() => 1).constructor);	// [Function: Function]

	function Person(){}
	const p = new Person();
	console.log(p.constructor); // [Function: Person]
	```
	
* Object.prototype.toString
	* toString 则是判断类型的终极方法
	* 示例代码
	
	```js
	const toString = Object.prototype.toString;
	
	console.log(toString.call(1)); // [object Number]
	console.log(toString.call('1')); // [object String]
	console.log(toString.call(true)); // [object Boolean]
	console.log(toString.call(Symbol('s'))); // [object Symbol]
	console.log(toString.call(null)); // [object Null]
	console.log(toString.call(undefined)); // [object Undefined]
	console.log(toString.call({})); // [object Object]
	console.log(toString.call([])); // [object Array]
	console.log(toString.call(new Set())); // [object Set]
	console.log(toString.call(new Date())); // [object Date]
	console.log(toString.call((()=>1))); // [object Function]
	
	function Person(){}
	const p = new Person();
	console.log(toString.call(p)); // [object Object]
	```



### 类型转换

#### + / -

* string + 其他类型，结果为 string，直接字符串拼接
	* 示例代码
	
	```js
	// string + => string
	console.log('1' + '1');	// 11
	console.log('1' + true);	// 1true
	console.log('1' + false);	// 1false
	console.log('1' + null);	// 1null
	console.log('1' + undefined); // 1undefined
	```
* number + 除 string 外的类型，转换为 number 后相加，undefined 转为 NaN，null 为 0
	* 	示例代码
	
	```js
	// number + 
	console.log(1 + '1');	// 11
	console.log(1 + true);	// 2
	console.log(1 + false);	// 1
	console.log(1 + null);	// 1
	console.log(1 + undefined); // NaN
	```
* 使用 - 时，两边对象均转为 number 后计算
	* 示例代码
	
	```js
	// number -
	console.log(1 - '1');	// 0
	console.log(1 - true);	// 0
	console.log(1 - false);	// 1
	console.log(1 - null);	// 1
	console.log(1 - undefined); // NaN

	// string - 
	console.log('1' - '1');		// 0
	console.log('1' - true);	// 0
	console.log('1' - false);	// 1
	console.log('1' - null);	// 1
	console.log('1' - undefined); // NaN

	// other -
	console.log(true - true); // 0
	console.log(true - false); // 1
	console.log(true - null); // 1
	console.log(true - undefined); // NaN
	```
* 与复杂对象的 + 、- 会先调用对象的 valueOf || toString 函数，将其转换为基本类型再进行 +、- 
	* 示例代码
	
	```js
	// 复杂类型
	const a = {
		valueOf(){
			return 1;
		}
	};
	const b = {
		toString() {
			return '2';
		}
	};
	const c = {
		valueOf(){
			return 3;
		},
		toString() {
			return '4';
		}	
	}
	console.log(1 + a);	// 2; -> a.valueOf
	console.log(1 + b);	// 12; -> b.toString
	console.log(1 + c);	// 4;	-> c.valueOf
	console.log("1" + a);	// 11; 
	console.log("1" + b);	// 12;
	console.log("1" + c);	// 13;

	console.log(1 - a);	// 0
	console.log(1 - b);	// -1	
	console.log(1 - c);	// -2
	console.log("1" - a); // 0
	console.log("1" - b); // -1
	console.log("1" - c); // -2
	```

#### == / === 

* == 称为抽象相等, 其逻辑如下
	* 两侧类型相同，返回 === 的结果
	* null 和 undefined 相等
	* string 与 number 比较，均转换为 number 比较
	* Boolean 与其他比较，将 Boolean 转换为 number 后， 在次使用 == 比较
	* 如果有一方为 String，Number，Symbol 中一种，且另一方为 Object，则 ToPrimitive Object 后再次使用 == 比较
		* ToPrimitive 逻辑如下
			* Undefined、Null、Boolean、Number、String、Symbol 均返回原始值
			* 获取转换类型
				* 未指定 为 default
				* string number，为对应类型
			* 获取转换方法
				* 若对象本身有 toPrimitive 方法，则取此方法
					* 调用对象方法，获取返回值，若返回值不是对象，则返回这个值，否则抛出异常
			* 若类型为 default，则改为 number
			* 执行 OrdinaryToPrimitive
				* 断言输入必须为对象，输出类型必须为 number 或 string
				* 如果输入为 string，则获取 [toString 、valueOf]，否则获取 [valueOf、toString]
				* 循环方法列表，获取执行结果，非对象类型直接返回，否则抛出异常

* 示例代码

```js

	console.log([10] == 10); 	// true; [10] == 10 => '10' == 10 => true
	console.log('10' == 10);
	console.log([] == 0); 		// true; [] == 0 => '' == 0 => Number('') == 0 => true
	console.log(true == 1); 	// true; true == 1 => Number(true) == 1 => true
	console.log([] == false);	// true; [] == false => '' == false => '' == 0 => true
	console.log(![] == false);	// true; ![] == false => false == false => true
	console.log('' == 0);
	console.log('' == false);
	console.log(null == false); // false; null == false =>  null == 0 => false
	console.log(!null == true); // true; !null == true => true == true => true;
	console.log(null == undefined); // true;
	
	// 注意:
	console.log([] == 0); // true;
	console.log([] == []); // false; // 两侧类型相同,均为 object, 相当于 [] === []

``` 



* === 称为严格相等, 其逻辑如下
	* 类型不同，false
	* 若左侧为 Number
		* 两侧有一个为 NaN，返回 false
		* x 和 y 表示的 Number值相等，true
		* -0 和 +0 比较，true
		* false
	* 执行 SameValueNonNumber 逻辑
		* 断言 x 非 number，x y 类型相同
		* 若 x 类型为 undefined、null， true
		* 若 x 类型为 string
			* x y 必须长度相同且每个字符都相同，true，否则 false
		* 若 x 类型为 Boolean，则 同为 true 或 同为 false 返回 true，否则 false
		* 若 x 类型为 Symbol，则 x y 指向相同 Symbol 值，为 true，否则 false
		* 如果 x y 指向相同对象，true，否则 false
* 示例代码

```js
	console.log(null === undefined); 	// false;
	console.log(NaN === NaN); 			// false;
	console.log(1 === 1);					// true;
	console.log(+0 === -0);				// true;
	console.log(undefined === undefined); // true;
	console.log(null === null); 		// true;
	console.log('aaab' === 'aaab');		// true;
	console.log(Symbol.for('1') === Symbol.for('1')); // true;
	console.log([] === []); // false;
	let a = b = [];
	console.log(a === b); // true;
``` 


### 函数传参

### 深度取值


### 参考资料
* [第1-6课](https://gitbook.cn/gitchat/column/5c91c813968b1d64b1e08fde/topic/5cbbe675bbbba80861a35bd4)
* [prototype](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)
* [__proto__](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)
* [ecma == ](http://www.ecma-international.org/ecma-262/7.0/index.html#sec-abstract-equality-comparison)
* [ecma ===](http://www.ecma-international.org/ecma-262/7.0/index.html#sec-strict-equality-comparison)
* [js 中 == 和 === 的区别
](https://juejin.im/entry/584918612f301e005716add6)

