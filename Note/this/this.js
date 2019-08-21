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
}); //();


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
});//()

// call apply bind 指定
(function(){
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
}); //();


// 上下文对象调用时, 指向调用对象, 多级调用, 指向最后一个调用的对象
(function() {
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
}); //();

// 箭头函数中的 this, 根据其上层上下文决定
(function() {

	
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
})();



