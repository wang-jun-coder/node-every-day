/*
简单模拟 co 的实现

co 返回的是 Promise, 其主要作用是作为 generator 函数的执行器
co 内部为了兼容 thunk 函数, generator 函数, array object 等操作, 此处仅模拟最核心的方法 co

*/
function co(gen){

	return new Promise((resolve, reject) => {
		// 需判断 gen
		if ('function' === typeof gen) gen = gen();
		if ('function' !== typeof gen.next || 'function' !== typeof gen.throw) {
			return reject(new Error('gen must be a generator'));
		}

		// 开始执行
		onFullfiled();

		// 尝试执行
		function onFullfiled(res) {
			let ret = null;
			// 尝试执行
			try {
				ret = gen.next(res);
			} catch(e) {
				return reject(e);
			}
			next(ret);

		}
		// 尝试处理异常
		function onRejected(err) {
			let ret = null;
			try {
				ret = gen.throw(err);
			} catch (e) {
				return reject(e);
			}
			next(ret);
		}
		// 尝试执行或结束
		function next(ret) {
			if (ret.done) return resolve(ret.value);
			Promise.resolve(ret.value).then(onFullfiled, onRejected);
		}
	});
}

co(function*() {
	yield 1;
	const res = yield co(function*() {
		yield 2;
		const a = yield new Promise((resolve, reject) => {
			setTimeout(() => resolve(100), 1000);
		});
		return a;
	})
	return res;
}).then(console.log).catch(console.error);



