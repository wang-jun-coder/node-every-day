'use strict'
/*
利用 es6 特性, 快速简单模拟 apply 实现
*/
Function.prototype.custom_apply = Function.prototype.custom_apply || function apply(target, argsArray=[]) {
	// 类型判断
	if ('function' !== typeof this) throw new TypeError('custom_apply must called by function');
	if (!Array.isArray(argsArray)) throw new TypeError('argsArray must be array');

	// 构建 target 作为原型的镀锡, 其有一个属性对应到当前函数
	const ctx = Object.create(target || null);
	const key = Symbol('targetKey');	// 可生成随机字符串替代 es6 的 Symbol 属性
	ctx[key] = this;

	// 利用 this 的动态作用域, 调用完毕后, 恢复对象状态
	const ret = ctx[key](...argsArray); // 参数展开, 可通过 eval/new function 实现
	delete ctx[key];
	return ret;
}

/*
尽可能不使用 es6 实现 apply 函数
*/

Function.prototype.custom_apply2 = Function.prototype.custom_apply2 || function custom_apply2(target, argsArray) {
	// 函数预处理, 异常报错
	if ('function' !== typeof this) throw new TypeError('custom_apply2 must called by function');
	if (undefined === argsArray || null === argsArray) argsArray = [];
	if ('object' !== typeof argsArray) throw new TypeError('argsArray must be array');

	function getDefaultThis() {return this;}

	var ctx = new Object(target || getDefaultThis()); // 若本身就是对象, 则返回本身
	var key = '__' + Date.now() + '__';
	var originVal = undefined;
	var hasOriginVal = ctx.hasOwnProperty(key);
	if (hasOriginVal) originVal = ctx[key];
	ctx[key] = this;


	var funcBody = 'return arguments[0][arguments[1]]('
	for(var i=0; i<argsArray.length; i++) {
		funcBody += i>0?',':'';
		funcBody += 'arguments[2][' + i + ']';
	}
	funcBody += ')';
	// 构建一个函数, 使之具备三个参数, 参数一作为被调用对象, 参数二维 key, 参数三为调用参数,  函数内部对第三个参数进行展开(argument[2][0],argument[2][1] 等)
	var ret = (new Function(funcBody))(ctx, key, argsArray);
	if (hasOriginVal) ctx[key] = originVal;
	else delete ctx[key];
	return ret;
}




const a = {
	b : 2
}
function b(add) {
	return this.b + add;
}

console.log(b.apply(a, [1]))
console.log(b.custom_apply(a, [1]));
console.log(b.custom_apply2(a, [1]));

console.log(Math.max.apply(null, [1, 5, 3]));
console.log(Math.max.custom_apply(null, [1, 5, 3]));
console.log(Math.max.custom_apply2(null, [1, 5, 3]));













