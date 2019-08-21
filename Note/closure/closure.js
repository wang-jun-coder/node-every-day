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
	'use strict'

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



})();












