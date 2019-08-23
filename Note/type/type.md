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
	
	```
	
* Object.prototype.toString
* constructor


### 类型转换

#### +
#### == 

### 函数传参

### 深度取值


### 参考资料
* [第1-6课](https://gitbook.cn/gitchat/column/5c91c813968b1d64b1e08fde/topic/5cbbe675bbbba80861a35bd4)


