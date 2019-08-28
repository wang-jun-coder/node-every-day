(function(){
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
}); //();

(function() {

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

}); //();

(function(){
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

}); //();

(function(){

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
});//();


(function(){
	// number + 
	console.log(1 + '1');	// 11
	console.log(1 + true);	// 2
	console.log(1 + false);	// 1
	console.log(1 + null);	// 1
	console.log(1 + undefined); // NaN

	console.log('-------------------------');

	// string + => string
	console.log('1' + '1');	// 11
	console.log('1' + true);	// 1true
	console.log('1' + false);	// 1false
	console.log('1' + null);	// 1null
	console.log('1' + undefined); // 1undefined

	console.log('-------------------------');	

	// number -
	console.log(1 - '1');	// 0
	console.log(1 - true);	// 0
	console.log(1 - false);	// 1
	console.log(1 - null);	// 1
	console.log(1 - undefined); // NaN

	console.log('-------------------------');

	// string - 
	console.log('1' - '1');		// 0
	console.log('1' - true);	// 0
	console.log('1' - false);	// 1
	console.log('1' - null);	// 1
	console.log('1' - undefined); // NaN

	console.log('-------------------------');

	// other -
	console.log(true - true); // 0
	console.log(true - false); // 1
	console.log(true - null); // 1
	console.log(true - undefined); // NaN

	console.log('-------------------------');
	
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

});// ();

(function(){

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

	// 注意:
	console.log([] == 0); // true;
	console.log([] == []); // false; // 两侧类型相同,均为 object, 相当于 [] === []


}); //();

(function(){

	const a = 1;
	const b = {};
	const c = {};


	function func(a, b, c){
		a ++;
		b.name = 'b';
		c = {
			name: 'c'
		}

		console.log(a);	// 2
		console.log(b);	// { name: 'b' }
		console.log(c);	// { name: 'c' }
	}

	func(a, b, c);

	console.log(a);	// 1
	console.log(b);	// { name: 'b' }
	console.log(c);	// {}
}); //();

(function(){
	const obj = {
		root: {
			title: 'root',
			type: 'root',
			pos: {x: 0,y: 0,w: 100,h: 100,},
			children: [
				{
					title: 'image',
					type: 'img',
					src: 'https://xxx.jpg',
					pos: {x: 0,y: 0,w: 100,h: 100,},
					children: []
				}
			]
		}
	}

	// && 获取图片
	const url1 = obj && obj.root && obj.root.children && obj.root.children[0] ? obj.root.children[0].src : null;
	console.log(url1);

	// || 设置默认值
	const url2 = ((((obj || {}).root || {}).children || [])[0] || {}).src || null;
	console.log(url2);

	// try-catch 
	let url3 = null;
	try{
		url3 = obj.root.children[0].src;
	} catch(e){
		console.log(e);
	}
	console.log(url3);

	// get 
	const get = function(obj, propertys=[] ) { 
		return propertys.reduce((prev, cur) => {
			return prev && prev[cur] ? prev[cur] : null;
		}, obj);
	}

	const url4 = get(obj, ['root', 'children', '0', 'src']);
	console.log(url4);
	// curry get
	const get2 = function(propertys) {
		return function(obj) {
			return propertys.reduce((prev, cur) => {
				return prev && prev[cur] ? prev[cur] : null;
			}, obj);
		}
	}
	const getRootFirstObjectSrc = get2(['root', 'children', '0', 'src']);
	const url5 = getRootFirstObjectSrc(obj);
	console.log(url5);

	// tc39 提案
	// console.log(obj?.root?.children?[0]?.src)

})// ();




