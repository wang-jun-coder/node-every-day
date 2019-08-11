function only(obj={}, keys) {
	if ('string' === typeof keys) keys = keys.split(' ');
	return keys.reduce((pre, k) => {
		// 遇到空值不处理
		if (null === pre[k]) return ret; 
		pre[k] = obj[k];
		return pre;
	}, {});
}


const obj = {
	a: 1,
	b: 2,
	c: 3,
	d: 4 
};

console.log(only(obj, 'a b c'));
console.log(only(obj, ['a', 'b']));