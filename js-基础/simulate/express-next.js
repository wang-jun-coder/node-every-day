// express 并不是一个库, 此处模拟 express router 中间件分发逻辑


function handle(middleware) {
	if (!Array.isArray(middleware)) throw new TypeError('middleware must be array');
	middleware.forEach(f => {
		if('function' !== typeof f) throw new TypeError('middleware must be composed by functions');
	});
	return function(req, res, next) {

		let idx = -1;
		function next(i) {
			if (i<idx) throw new Error('middleware called by mulity');
			idx = i;

			let fn = middleware[i];
			if (i===middleware.length) fn=next;
			if (!fn) fn = ()=>{};

			fn(req, res, next.bind(null, i+1));

		};
		next(0);
	}
}


const req = {};
const res = {
	end(ret) {
		console.log(ret);
		console.log(`ret from res.end`);
	} 
};
const complete = ret => {
	console.log(ret);
	console.log(`ret from complete`);
}
const middleware = [
	function m1(req, res, next) {
		next();
	},
	function m2(req, res, next) {
		next();
	},
	function m3(req, res, next) {
		res.end({a: 1});
	}
];
handle(middleware)(req, res, complete);