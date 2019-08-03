const flat = array => {
	return array.reduce((prev, cur) => Array.isArray(cur) ? prev.concat(flat(cur)) : prev.concat(cur), []);
}

const flat2 = array => {
	const ret = [];
	const stack = [...array];
	while(stack.length) {
		const cur = stack.shift();
		if (Array.isArray(cur)) {
			stack.unshift(...cur);
		} else {
			ret.push(cur);
		}
	}
	return ret;
}

console.log(flat2([0, [1, [2], 3, [4]]]));