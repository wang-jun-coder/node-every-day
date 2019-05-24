// typeof

const t1 = typeof undefined; 	// undefined
const t2 = typeof null;			// object 			typeof null is object
const t3 = typeof true;			// boolean
const t4 = typeof 1;			// number
const t5 = typeof '1';			// string
const t6 = typeof Symbol();		// symbol
const t7 = typeof {};			// object
const t8 = typeof [];			// object 			typeof [] is object
const t9 = typeof (() => 1); 	// function
const t10 = typeof new Date();	// object 			typeof new Date() is object
console.log(`${t1} ${t2} ${t3} ${t4} ${t5} ${t6} ${t7} ${t8} ${t9} ${t10}`);
// 注意: null, {}, [], 都是 object


const i1 = undefined instanceof Object;		// false
const i2 = null instanceof Object;			// false
const i3 = true instanceof Object;			// false
const i4 = 1 instanceof Number;				// false 	1 instanceof Number is false
const i5 = '1' instanceof String;			// false 	'1' instanceof String is false
const i6 = Symbol() instanceof Symbol;		// false
const i7 = {} instanceof Object;			// true
const i8 = [] instanceof Object;			// true 	[] instanceof object is true
const i9 = [] instanceof Array;				// true
const i10 = new Number(1) instanceof Number;// true
const i11 = new String(1) instanceof String;// true
const i12 = new Date() instanceof Date;		// true
const i13 = (() => 1) instanceof Function;	// true

console.log(`${i1} ${i2} ${i3} ${i4} ${i5} ${i6} ${i7} ${i8} ${i9} ${i10} ${i11} ${i12} ${i13}`);
// 注意: instanceof 判断的是左表达式原型链中是否存在有右表达式的构造函数

const instanceofSimulator = (L, R) => {
	if (typeof L !== 'object') return false;
	let p = L.__proto__;
	while(p) {
		console.log(p);
		if (p === R.prototype) return true;
		if (!p) return false;
		p = p.__proto__;
	}
	return false
};

const is1 = instanceofSimulator([], Object);
const is2 = instanceofSimulator([], Array);
console.log(`${is1} ${is2}`);



const s1 = Object.prototype.toString.call(undefined); 	// [object Undefined]
const s2 = Object.prototype.toString.call(null);		// [object Null]
const s3 = Object.prototype.toString.call(true);		// [object Boolean]
const s4 = Object.prototype.toString.call(1);			// [object Number]
const s5 = Object.prototype.toString.call('1');			// [object String]
const s6 = Object.prototype.toString.call({});			// [object Object]
const s7 = Object.prototype.toString.call([]);			// [object Array]
const s8 = Object.prototype.toString.call(Symbol());			// [object Symbol]
const s9 = Object.prototype.toString.call(new Date());			// [object Date]
const s10 = Object.prototype.toString.call(()=>1);		// [object Function]
const s11 = Object.prototype.toString.call(function test() {});	// [object Function]

console.log(`${s1} ${s2} ${s3} ${s4} ${s5} ${s6} ${s7} ${s8} ${s9} ${s10} ${s11}`);
// Object.prototype.toString 完美判断


const c1 = undefined;				//  Cannot read property 'constructor' of undefined
const c2 = null;					// Cannot read property 'constructor' of null
const c3 = true;					// function Boolean() { [native code] }
const c4 = 1;						// function Number() { [native code] }
const c5 = '1';						// function String() { [native code] }
const c6 = {};						// function Object() { [native code] }
const c7 = [];						// function Array() { [native code] }
const c8 = Symbol();				// function Symbol() { [native code] }
const c9 = new Date();				// function Date() { [native code] }
const c10 = function test () {};	// function Function() { [native code] }
const c11 = () => 1;				// function Function() { [native code] }

console.log(`
\${c1.constructor} \${c2.constructor} 
${c3.constructor} ${c4.constructor} ${c5.constructor} ${c6.constructor} ${c7.constructor} ${c8.constructor} ${c9.constructor} ${c10.constructor} ${c11.constructor}`);
// null 和 undefined 不能通过 constructor 进行判断

const n1 = null === undefined;	// false
const n2 = null == undefined;	// true  	null == undefined is true, 并非隐式转换, 而是 ecma 规定: https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3
const n3 = null === false;		// false
const n4 = null == false;		// false
const n5 = null === 0;			// false
const n6 = null == 0;			// false
console.log(`${n1} ${n2} ${n3} ${n4} ${n5} ${n6}`);

if(!(false)) console.log(false);
if(!(undefined)) console.log(undefined);
if(!(null)) console.log(null);
if(!(0)) console.log(0);
if(!('')) console.log('');
if(!(NaN)) console.log(NaN);

console.log(null === false);
console.log(null == false);
console.log(null === undefined);
console.log(null == undefined);
console.log(null === null);
console.log(null == null);
console.log(null === 0);
console.log(null == 0);
console.log(null === '');
console.log(null == '');
console.log(null === NaN);
console.log(null == NaN);


console.log('s' + undefined);	// sundefined
console.log('s' + null);		// snull
console.log('s' + true);		// strue
console.log('s' + 1);			// s1
console.log('s' + '1');			// s1
console.log('s' + {});			// s[object Object]
console.log('s' + {
	toString() {return '3'}
});								// s3
console.log('s' + {
	valueOf() {return 2},
});								// s2
console.log('s' + {
	valueOf() {return 2},
	toString() {return '3'}
});								// s2
// console.log('' + Symbol()); // Cannot convert a Symbol value to a string
// string + 其他类型, 都会转换为 string 进行相加, Symbol 不能转换为 string, 不可与字符串相加,
// string + 复杂类型, 会转为基本类型, valueOf/toString 再进行相加


console.log(1 + undefined);	// NaN
console.log(1 + null);		// 1
console.log(1 + true);		// 2
console.log(1 + 1);			// 2
console.log(1 + '1');		// 11
console.log(1 + {});		// 1[object Object]
// console.log(1 + Symbol()); 	// Cannot convert a Symbol value to a number

console.log(1 + {
	valueOf() {return 2}
});								// 3
console.log(1 + {
	toString() {return '2'}
});								// 12
console.log(1 + {
	valueOf() {return 2},
	toString() {return '2'}
});								// 3

// number + undefined is NAN, number + null/boolean/number 转换为 number 相加, number+string 转换为 string相加
// number + 复杂对象时, 先将复杂对象转换为基本对象再进行相加, valueOf 和 toString

console.log(Infinity + Infinity);		// Infinity
console.log(1 + NaN);					// NaN
console.log(-Infinity + (-Infinity));	// -Infinity
console.log(Infinity + (-Infinity)); 	// NaN


console.log('1' - '2');	// -1
console.log('xx' - 'x');	// NaN
