// 普通调用, 非严格模式指向 global, 严格模式指向 undefined

(function(){
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
})();


// 一般构造函数, 指向 new 出来的对象
(function(){
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
})()




