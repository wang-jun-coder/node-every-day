function curry(func, ...args) {
	const len = func.length;
	const totalArgs = args;
	return function curredFunc(...innerArgs) {
		totalArgs.push(...innerArgs);
		if (totalArgs.length >= len) {
			return func.call(null, ...totalArgs);
		}
		return curredFunc;
	}
}


function add(x, y, z) {
	return x + y + z;
}

const addTen = curry(add);
console.log(addTen(1)(2)(3));

