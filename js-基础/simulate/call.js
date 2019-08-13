Function.prototype.custom_call = Function.prototype.custom_call || function call(target, ...argsArray) {
	// 类型判断
	if ('function' !== typeof this) throw new TypeError('custom_call must be called by Function');

	// 以 targe 为原型, 构建一个具备当前函数的对象
	const ctx = Object.create(target);
	const key = Symbol('targetKey'); // 对于此处, 如不能利用 es5 的特性, 则可自建随机字符生成函数, 确保不会覆盖原有属性
	ctx[key] = this;

	// 调用函数, 并返回
	const ret = ctx[key](...argsArray);	// 参数收集可以通过 arguments 获取, 对象展开可以使用 eval/new function 实现
	// return this.apply(target, argsArray);

	delete ctx[key];
	return ret;
}

const a = {
	b : 2
}
function b(add) {
	return this.b + add;
}
console.log(b.custom_call(a, 1));
console.log(Math.max.custom_call(null, 1, 5, 3));