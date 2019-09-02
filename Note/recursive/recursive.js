 'use strict';

(function(){


	function factorial(n) {
		if (n==1) return 1;
		return n * factorial(n-1);
	}

	// 这是一个尾调用
	function a(a){return a+1};
	function b(x) {
		return a(x);
	}
	function c(x) {
		if (x>0) {
			return a(x);
		}
		return b(x);
	}
	// 以下不属于尾调用
	function d(x) {
		return a(x)+1;
	}
	function e(x) {
		const res = a(x);
		return res;
	}

	// 尾递归
	function factorial(n, total=1) {
		if (n===1) return total;
		return factorial(n-1, n*total);
	}


}); //();



(function(){

	function fibonacci(n) {
		if (n===0) return 0;
		if (n===1) return 1;
		// 此处非尾调用, 需在当前函数内递归执行完两个函数, 相加后再返回销毁当前函数
		// 当递归较深时, 容易堆栈溢出
		return fibonacci(n-1) + fibonacci(n-2);
	}
	// 此时导致堆栈溢出
	// console.log(fibonacci(10000)); 
	// RangeError: Maximum call stack size exceeded

	// 如改成尾递归
	'use strict';
	function fibonacciTail(n, cur=0, next=1) {

		if (n===0) return cur;
		// n 作为计数器, 用来记录叠加几次
		// cur 作为当前次数, 对应的值
		// next 则是当前次数对应的下次的值
		// 此处属于尾调用, 但浏览器未必会进行尾递归优化
		return fibonacciTail(n-1, next, cur+next);
	}
	// 默认不优化,此处也会导致堆栈溢出
	console.log(fibonacciTail(10000)); 

}); //();

(function() {
	// 蹦床函数
	function trampoline(fn) {
		while(fn && typeof fn === 'function') {
			fn = fn();
		}
		return fn;
	}

	// 改写递归函数
	function fibonacci(n, a=0, b=1) {
		if (n<=0) return b;
		[a, b] = [b, a+b];
		return fibonacci.bind(null, a, b);
	}
	console.log(trampoline(fibonacci(10000)));
}); //();

(function(){

	function fibonacci(n) {
		let cur=0; 
		let next=1;
		while(n) {
			[cur, next] = [next, cur+next];
			n--;
		}
		return cur;
	}
	console.log(fibonacci(10000));

})();





