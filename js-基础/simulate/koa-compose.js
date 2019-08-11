function compose(middleware) {
	if (!Array.isArray(middleware)) throw new TypeError('middleware must be array');
	middleware.forEach(f => {
		if('function' !== typeof f) throw new TypeError('middleware must be composed by functions');
	});

	return function composed(ctx, next) {
		let idx = -1; // 用作标记, 避免中间件重复调用
		function dispatch(i) {
			if (i<=idx) throw new Error('middleware has been mulity called');
			idx = i; // 更新已调用标记

			// 获取将要执行的中间件, 均执行完毕, 调用 next
			let fn = middleware[i]; 
			if (i === middleware.length) fn = next;
			if (!fn) fn = Promise.resolve();
			try {	
				return Promise.resolve(fn(ctx, dispatch.bind(null, i+1)));

			} catch (e) {
				return Promise.reject(e);
			}
		}
		return dispatch(0);	// 开始分发第一个中间件
	}	
}


function compose2(middleware) {
	if (!Array.isArray(middleware)) throw new TypeError('middleware must be array');
	middleware.forEach(f => {
		if('function' !== typeof f) throw new TypeError('middleware must be composed by functions');
	});
	return async function composed(ctx, next) {
		let idx = -1;
		async function dispatch(i) {
			if (i<=idx) throw new Error('middleware has been called mulity');
			idx = i;
			let fn = middleware[i];
			if (i===middleware.length) fn = next; // 确保 next 调用一次
			if (!fn) fn = Promise.resolve();
			return await fn(ctx, dispatch.bind(null, i+1));
		}
		return dispatch(0);
	}
}

const ctx = {};
const next = ret => {
	console.log(ret);
};
const composed = compose2([
	async (ctx, next) => {
		ctx.m1 = 'm1';
		await next();
		return 1;
	}
])

composed(ctx, next).catch(console.error);














