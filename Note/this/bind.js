function bind(obj, ...args) {
	if ('function' !== typeof this) throw new TypeError('bind must be called by function');

	const self = this;
	// 构造原型
	function F(){};
	F.prototype = this;

	function bound(...innerArgs) {
		return self.apply(this.prototype && this.instanceof(F) ? this : obj || this, [...args, ...innerArgs]);
	}
	// new 一个实例, 避免原型污染
	bound.prototype = new F();
	return bound;
}

Function.prototype.c_bind = Function.prototype.c_bind || bind;


function fn(a, b) {
	this.c = a +b;
}

const a = {};

fn.c_bind(a)(1,2);
console.log(a);