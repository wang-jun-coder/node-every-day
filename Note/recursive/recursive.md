## 递归

### 基本概念
* 递归定义：在函数内，直接或间接调用自己，且存在终止条件，此函数称为递归函数
	* 如：
	
	```js
	// 这就是一个递归函数
	function factorial(n) {
		if (n==1) return 1;
		return n * factorial(n-1);
	}
	```
* 尾调用：在函数最后一步，调用函数，称为尾调用
	* 如：
	
	```js
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
	```
	 
* 尾递归：如果尾调用调用自身，就称为尾递归
	* 如：
	
	```js
	// 尾递归
	function factorial(n, total=1) {
		if (n===1) return total;
		return factorial(n-1, n*total);
	}
	```

### 递归的优缺点
* 优点
	* 代码简洁，可读性高
	* 大问题分解为小问题，解决思路简单
* 缺点
	* 创造大量的执行栈，较深的递归可能造成堆栈溢出
	* 多层调用，浪费空间和时间

### 递归的优化
* 递归函数改写尾递归
	* 注意：尾递归有隐式优化和调用栈丢失的问题，通常默认不开启
* 递归改写迭代/循环
	
	```js
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
	```
	
* 蹦床函数
 
	```js
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
	```


### 参考资料
* [ECMAScript 6 入门 -- 函数的扩展](http://es6.ruanyifeng.com/#docs/function#%E5%B0%BE%E8%B0%83%E7%94%A8%E4%BC%98%E5%8C%96)
* [JavaScript专题之递归](https://juejin.im/post/59b88ede5188256c60692a85#heading-6)
* [尾调用优化](http://www.ruanyifeng.com/blog/2015/04/tail-call.html)

