## 闭包

### 前置概念
#### 作用域
**作用域实际上是一套规则，用于确定在特定场景下如何查找变量**

* 函数作用域与全局作用域
	* 函数作用域则表示在函数体内有效
	* 全局作用域，则在全局生效
	
	示例代码
	
	```js
	function fn() {
		// a 为函数作用域, 在 a 声明后, 函数体内均可访问该变量
		const a = 'a';
		console.log(a);
	}
	fn();

	// 变量 b 挂载在全局对象上, 其作用域是全局的, 无论嵌套多少层均可访问
	global.b = 'b';
	console.log(b);
	```
	
* 块级作用域
	* 作用于代码块内({})
	* 示例代码

	```js
	// 块级作用域, 作用范围为代码块内{}, 
	// ES6 之前, js 只有函数作用域, 部分使用场景必须使用闭包来进行变量保持
	// ES6 引入 let/const 关键字, 这两个关键字声明的变量具备块级作用域

	function f1() {
		// var 存在变量提升, 函数作用域内可在声明代码之前访问该变量
		console.log(a);	// undefined
		var a = 1;
		console.log(a);	// 1

		console.log(b);	// undefied
		// var 没有块级作用域, 此代码块无效
		{	
			var b = 2;
		}
		console.log(b); // 2
	}
	f1();

	function f2() {
		// 使用 let/const 存在暂时性死区, 在声明代码之前访问会报引用错误
		// console.log(a); // 暂时性死区
		// ReferenceError: a is not defined
		const a = 1;
		console.log(a);

		{
			const b = 2;
			console.log(b); // 块级作用域内有效
		}
		// console.log(b); // b 在代码块中声明, 使用 const 具备块级作用域, 故超出代码块该变量已失效
		// ReferenceError: b is not defined
	}
	f2();
	```
* 暂时性死区
	* 作用域内，变量声明前，不可访问该变量，这块区域称为暂时性死区
	* 示例代码
	
	```js
	function f1() {
		// 变量 a 由 var 声明, 存在变量提升, 声明提前, 函数体内均可访问
		console.log(a); // undefind 

		// 变量 b 由 const 声明, 具备块级作用域, 不存在变量提升. 在函数开始, 至变量 b 声明之前, b 变量不可访问, 这块区域称为暂时性死区
		//console.log(b); // ReferenceError: b is not defined

		var a = 1;
		const b = 2;

		console.log(`${a}, ${b}`);
	}
	f1();

	// 函数 f2 这也是一种暂时性死区, arg2 尚未声明, 故不能使用
	function f2(arg1 = arg2, arg2) {
		console.log(`${arg1} ${arg2}`);
	}
	f2(undefined, 1); // ReferenceError: arg2 is not defined
	```

#### js 执行

js 是解释性语言，没有编译型语言的编译，链接等预处理过程，下面所提到的预编译，实际上是js 被 js 引擎解释的过程

* 执行步骤
	* 预编译阶段
		* 预编译阶段是代码执行的前置阶段，这里的编译实际上是将 js 代码解释/翻译成可执行的代码
	* 执行阶段
		* 此阶段主要是执行代码，执行上下文在这个阶段全部创建完成
* 变量提升
	* 变量提升产生于预编译阶段，需注意以下几点
		* 预编译阶段进行变量声明
		* 预编译阶段进行变量提升，但值为 undefined
		* 预编译阶段所有非表达式的函数声明提升
	* 示例代码
	
	```js
	function fn1() {
		// 非表达式函数变量提升, 预编译时声明 bar 函数
		function bar() {
			console.log('bar1');
		}
		// 预编译时, bar 提前声明, 其值 undefined, 后被上面的非表达式函数bar提升覆盖
		// 代码执行时, 被重置为 下面的函数
		var bar = function() {
			console.log('bar2');
		}
		bar(); // bar2
	}
	fn1();

	function fn2() {
		var bar = function() {
			console.log('bar2');
		}
		function bar() {
			console.log('bar1');
		}
		// 预编译阶段, 先提升 var bar = undefined, 而后提升函数 bar, 
		// 执行阶段重新对 bar 赋值, 故输出 bar2
		bar(); // bar2
	}
	fn2();
	```
* 执行上下文与调用栈
	* 执行上下文
		* 是当前代码的执行环境/作用域，直观上看执行上下文包含了作用域链
	* 调用栈
		* 当前代码执行所经过的函数栈
		* 示例代码

		```js
		function f1() {
			f2();
		}
		function f2() {
			f3();
		}
		function f3() {
			f4();
		}
		function f4() {
			const err = new Error();
			console.log(err.stack);
			/*
		    at f4 (/Users/wangjun/Desktop/practice/opensource/node-every-day/Note/closure/closure.js:122:15)
		    at f3 (/Users/wangjun/Desktop/practice/opensource/node-every-day/Note/closure/closure.js:119:3)
		    at f2 (/Users/wangjun/Desktop/practice/opensource/node-every-day/Note/closure/closure.js:116:3)
		    at f1 (/Users/wangjun/Desktop/practice/opensource/node-every-day/Note/closure/closure.js:113:3)
		    at /Users/wangjun/Desktop/practice/opensource/node-every-day/Note/closure/closure.js:126:2
		    at Object.<anonymous> (/Users/wangjun/Desktop/practice/opensource/node-every-day/Note/closure/closure.js:127:3)
		    at Module._compile (module.js:635:30)
		    at Object.Module._extensions..js (module.js:646:10)
		    at Module.load (module.js:554:32)
		    at tryModuleLoad (module.js:497:12)
			*/
			// 这里的 tryModuleLoad -> Module.load -> Object.Module._extensions..js -> Module._compile -> closure.js -> f1 -> f2 -> f3 -> f4
			// 这就是一个调用栈, 这个栈是先进后出的
		}
		f1();
		```
	* 注意
		* 正常来说，在函数执行完毕并出栈时，函数内的变量将在下一个垃圾回收结点被回收，该函数对应的执行上下文也将被销毁
		* 只有在函数执行时，才可访问该变量，改变量预编译阶段进行创建，执行阶段进行激活，函数执行完毕后相关上下文被销毁
		* 由于调用栈的这种结构，故在 js 中递归操作是比较耗费内存的，尾递归优化（js 引擎），蹦床函数等进行优化

### 闭包

#### 闭包定义与示例
* 定义
	* 在函数嵌套函数时，内层函数引用了外层函数作用域下的变量，并且内层函数在全局环境下可访问，就形成了闭包
* 示例代码

	```js
	function numGen() {
		let num = 1;
		return () => {
			debugger; // 在 chrome console 执行时, 此处进入断点, 查看 Scope -> Closure 下存在一个 num 的闭包变量
			return num++;
		};
	}

	const getNum = numGen();
	console.log(getNum());	// 1
	console.log(getNum());	// 2
	``` 
* 闭包成因
	* 正常情况下外界无法访问函数内部变量，函数执行完上下文即被销毁
	* 若在该函数内返回了另一个函数，且这个返回的函数使用了该函数内的变量，
	* 此时外界可通过返回的函数访问到该函数内部的变量值，这个变量称为闭包变量

#### 内存管理基本概念

* 内存生命周期
	* 分配内存
	* 读写内存
	* 释放内存
* 内存空间分类
	* 栈内存
		* 由操作系统自动分配释放，存放函数的参数值，局部变量值等，
	* 堆内存
		* 一般由开发者负责分配释放，需考虑垃圾回收
* js 的数据类型
	* 基本类型：undefined，null，Boolean，Number，String，Symbol 等
	* 引用类型：Object，Array Function 等

* 注意：
	* 一般情况，js 中，基本类型保存在栈内存中，引用类型保存在堆内存中
	* 对于分配读写内存的行为，所有语言都基本一致，但是对于释放内存有所不同
	* js 中内存一般依赖宿主环境(如：v8)的垃圾回收机制, 一般不需过于注意，但也有可能导致内存泄露

#### 内存泄露
**内存泄露指 内存空间已不再使用，但仍由于某种原因仍未释放的现象**

一般情况常借助闭包保存某些变量，使得变量在闭包存活时不被垃圾回收，但是由于闭包的特性，若使用不当比较容易产生内存泄露，需要格外注意

常见内存泄露的 case

* 意外创建全局变量
* 遗忘的定时器和回调函数
* 多余的引用
* 闭包 

示例代码

```js
// 意外泄露的全局变量, 可通过开启严格模式避免
	function fn1() {
		// 'use strict'
		leak = 'xxx';
	}
	fn1();
	console.log(global.leak);

	// 定时器
	var timerUse = 'timer use'
	var timer = setInterval(()=> {
		// 引用 timerUse 直至 timer 被释放
		console.log(timerUse);
	}, 100);
	// 移除定时器后, timerUse 才可被释放
	clearInterval(timer);


	// 多余引用会使得内存无法释放
	var a = {
		b: { // 即将导致内存泄露的对象, 此时仅有 a.b 对其进行引用
			c: 'c'
		}
	}
	var b = a.b; // 新增一个变量 b, 引用 a.b 所引用的对象
	function remove() {
		delete a.b;
	}
	// 虽然移除了 a 对 b 对象的引用, 但是 var b 仍在持有该对象
	remove();
	// 此处仍可访问 b 对象
	console.log(b);
	b = null; // b 不再引用此对象, 则该对象可被回收

	// 闭包
	function foo() {
		var hello = `hello`;
		function bar(val) {
			// 该函数会持有对象 hello 的引用,直到自己被释放, hello 变量才可以被释放
			console.log(`${hello} ${val}`);
		}
		// 局部函数 bar 原本应在此函数执行完毕允许被清除释放空间
		// 但由于返回值导出了这个函数, 使得这个函数可能被外部变量持有, 无法释放
		return bar;
	}

	// 此处使用了一个变量 bar 引用了 foo 执行导出的函数, 其不会被释放
	var bar = foo();
	bar(1); 

	// 将 bar 指向 null, bar 不再引用原函数, 此时原函数才可以被释放
	bar = null;
```

#### 垃圾回收
浏览器的垃圾回收，一般依靠 标记清除和引用计数 这两种算法进行回收， nodejs 的 js 解释器基于 Chrome v8 引擎，其垃圾回收机制也类似，自 2012 年以来，JavaScript 引擎已经使用**标记清除**算法来代替引用计数垃圾回收。

* 引用计数垃圾回收
	* 记录每个对象被引用的次数，当该对象引用的变量个数为0 时，表示没有变量引用该对象，即可清空释放该对象所占内存
	* 此算法对于循环引用的变量所占内存无法释放，如示例代码：
	
	```js
	function leak() {
		const obj1 = {
			property: {
				subProperty: 1
			}
		}
		const obj2 = obj1.property;
		obj2.property = obj1;
		// obj1.property 引用了 obj1 , obj1 引用了 obj1.property, 若使用引用计数则无法释放这两个对象
		return 'some value'
	}
	leak();
	```
* 标记清除垃圾回收
	* 从根对象（window/global）开始分析对象引用关系，递归遍历所有对象，对有引用的对象进行标记，未被标记的对象即没有被引用，可以被释放
	* 需要注释的是，对于不使用的对象，需都手动移除引用，否则不会被回收（如：闭包）

### nodejs 中的垃圾回收

* node.js 本质上是一个 C++ 编写的程序，这个程序可以执行 JavaScript 代码，其底层主要由两部分组成  
	* Chrome V8： 这是一个 c++ 的 js 引擎，是 js 的运行时，用来解释执行 js 代码
	* libuv： 实现 node.js 中的事件循环

<!--* node.js 中的内存空间分类
	* 代码区：存放即将执行的代码片段
	* 栈内存：基本类型，局部变量等
	* 堆内存：对象，闭包，上下文等
	* 堆外内存：如：buffer-->
* Chrome V8 中的堆内存
	* 新生代内存区：基本的数据对象都被分配到这里，特点是小而频，空间虽小，但垃圾回收频繁
	* 老生代指针区：这是一堆指向老生代内存区具体数据内容的指针，基本上从新生代蜕变过来的对象会被移动到这里
	* 老生代数据区：存放数据对象，而不是指向对象的指针，老生代指针区的指针就是指向这里
	* 大对象区：存放体积超过其他区大小的对象，每个对象有自己的内存，垃圾回收并不会移动大对象
	* 代码区：代码对象，包含 JIT 之后的指令对象，会被分配到这里。这是唯一拥有执行权限的内存区
	* Cell区、属性 Cell 区，Map 区：存放 cell，属性 cell 和 Map，每个区域都是存放相同大小的元素，结构简单

* 新生代内存 老生代内存
	* 新生代内存
		* 绝大多数 js 对象会被分配到新生代内存中，内存区域小，但是垃圾回收频繁
		* 新生代内存中采用 scavenge 算法进行垃圾回收, 对于该算法的实现使用的是 Cheney 算法。
			* scavenge 大致思想为，将内存一分为二，每个部分都被称为 semispace。这两个空间中，总有一个处于使用状态，另一个处于闲置状态，处于使用状态的空间称为 From 空间，闲置状态的称为 To 空间
			* 分配对象时，总使用 From 空间进行分配，当进行垃圾回收时，V8 将检查 From 空间中存活的对象，并将其拷贝至 TO 空间，剩下的对象将被释放，完成复制后， From 空间与 To 空间角色互换。
			
	* 老生代内存
		* 当一个新生代中的对象经过多次垃圾回收仍然未被释放时，说明其生命周期较长，这时候会将其移动到老生代内存中。这种操作称为**对象晋升**
			* 晋升标准有两条
				* 在垃圾回收过程中，若该对象已经历过一次垃圾回收，那就会被晋升
				* 在垃圾回收过程中，若 To 空间的使用已超过 25%，那么这个对象也会被晋升
		* 老生代保存的对象大多是生命周期较长的甚至是常驻内存对象，同时老生代内存占用较多，此时不再适合使用 scavenge 算法，而是使用 mark-sweep 和 mark-compact 两种结合。主要采用 mark-sweep，只有当老生代空间不足以分配从新生代晋升过来的对象时，才会使用 mark-compact 。
			* mark-sweep(标记清除)
				* 标记清除实际上是两个动作，分为标记阶段和清除阶段，标记阶段遍历老生代内存区所有对象，标记出活着的对象，而后进入清除阶段，清除阶段则进行清除没有标记的对象
				* 一般情况老生代内存区对象死亡率较小，所以此算法效率还是比较高的
			* mark-compact(标记整理)
				* 标记清除时，极易产生内存碎片，标记整理则是在标记清除的基础上再进行修改，让活着的对象尽可能靠向内存区域的前面，这种算法效率较低，但是优势是不会产生内存碎片
			* 惰性清理
				* v8 对对象进行标记后，并不着急去清理，由于清理也需要开销，所以一般清理操作会延迟执行。垃圾回收器会根据需要来清理死掉的对象

### 参考资料
* [老司机也会在闭包相关知识点翻车](https://gitbook.cn/gitchat/column/5c91c813968b1d64b1e08fde/topic/5c99a9a3ccb24267c1d01960)
* [[译] 通过垃圾回收机制理解 JavaScript 内存管理](https://juejin.im/post/5c4409fbf265da616f703d5a)
* [V8 —— 你需要知道的垃圾回收机制](https://juejin.im/post/5b398981e51d455e2c33136b)
* [浅谈V8引擎中的垃圾回收机制](https://segmentfault.com/a/1190000000440270)
* 【node.js 来一打 c++扩展 死月 著】

