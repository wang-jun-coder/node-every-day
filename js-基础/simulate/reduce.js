Array.prototype.custom_reduce = Array.prototype.custom_reduce || function reduce(fn, initVal) {
	if (!Array.isArray(this)) throw new TypeError('custom_reduce must be called by array');

	const first = initVal === undefined ? 1 : 0;
	let val = initVal === undefined ? this[0] : initVal;

	for (var i = first; i < this.length; i++) {
		val = fn(val, this[i]);
	}
	return val;
}

const array = [1, 2, 3];

console.log(array.custom_reduce((total, cur) => total+cur, 0));