(function() {

	function fn() {
		// a 为函数作用域, 在 a 声明后, 函数体内均可访问该变量
		const a = 'a';
		console.log(a);
	}
	fn();

	// 变量 b 挂载在全局对象上, 其作用域是全局的, 无论嵌套多少层均可访问
	global.b = 'b';
	console.log(b);

}); //();

(function(){

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
}); // ();


(function(){

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
}); // ();

(function(){

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

}); //();


(function(){

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
}); //();


(function(){

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

}); //();


(function(){

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


}) ();


(function(){

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


}); //();











