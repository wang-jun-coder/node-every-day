Function.prototype.custom_bind = Function.prototype.custom_bind || function bind(target) {
	const args = Array.prototype.slice.call(arguments, 1);
	const self = this;

	// 使用一个空函数, 接收当前函数的原型, 最终 new 出一个实例, 作为 bound 函数的原型, 可避免当前函数的原型污染
    var F = function () {};
    F.prototype = this.prototype;
    var bound = function () {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return self.apply(this.prototype &&  this instanceof F ? this : target || this, finalArgs);
    }
    bound.prototype = new F();
	return bound;
}

const a = {
	b: 1,
	c(add) {
		this.b += add || 0;
		return this.b;
	}
}

console.log(a.c());

const fn = a.c;
console.log(fn());

const fnBindA = fn.custom_bind(a);
console.log(fnBindA());


const b = new fnBindA();
console.log(b);




