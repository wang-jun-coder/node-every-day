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

	// 实际上 1. Number(1) 的原型 与 Number 对应的原型相同
	console.log(1 instanceof Number);	
	console.log(Number(1) instanceof Number);
	console.log(new Number(1) instanceof Number); // new 使得对象为 Number 的实例
	console.log((1).prototype == Number.prototype && (Number(1)).prototype == Number.prototype);
	// false false true


})();