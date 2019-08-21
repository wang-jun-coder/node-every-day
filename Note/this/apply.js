// 完整实现 https://github.com/wang-jun-coder/node-every-day/blob/d5c57789152db6be0a80ac7a5cb4e66ec5790580/js-%E5%9F%BA%E7%A1%80/simulate/apply.js#L25
function apply(obj, args) {
	if ('function' !== typeof this) throw new TypeError('apply must be called by function');

	const target = new Object(obj);
	const key = Symbol('target-key');

	target[key] = this;

	const ret = target[key](...args);
	delete target[key];
	return ret;
}

Function.prototype.c_apply = Function.prototype.c_apply || apply;


function fn(a, b) {
	this.c = a+b;
}


const a = {};
fn.c_apply(a, [1, 2]);
console.log(a);


