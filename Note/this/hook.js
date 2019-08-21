const express = require('express');
const app = express();
app.use(function(req, res, next) {
	// 利用 apply/call 可以 hook 函数的对应事件, 比如此处用于统计请求时间
	console.time(`${req.method} ${req.url}`);
	const end = res.end;
	res.end = function(...args) {
		end.apply(res, args);
		console.timeEnd(`${req.method} ${req.url}`);
	}
	next();
});
app.get('/', function(req, res, next) {
	res.end('hello world');
});
app.listen(3000);