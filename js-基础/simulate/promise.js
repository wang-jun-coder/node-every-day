const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promise1 {
	// 实现一个 Promise
	constructor(exector) {
		// 存储当前状态和最终值
		this.state = PENDING;
		this.value = undefined;
		this.reason = undefined;

		// 存储回调函数, 便于异步通知回调
		this.onFulfilledCallback = [];
		this.onRejectedCallback = [];
		this.finallyCallback = []

		const resolve = value => {
			// 若状态已改变, 则不再改变
			if (this.state !== PENDING) return;
			this.value = value;
			this.state = FULFILLED;

			// 异步回调通知回调函数
			process.nextTick(() => {
				this.onFulfilledCallback.forEach(fn => fn(value));
				this.finallyCallback.forEach(fn => fn());
			});
		}

		const reject = reason => {
			if (this.state !== PENDING) return;
			this.reason = reason;
			this.state = REJECTED;

			process.nextTick(() => {
				this.onRejectedCallback.forEach(fn => fn(reason));
				this.finallyCallback.forEach(fn => fn());
			});
		}

		// 开始执行
		try {
			exector(resolve, reject);
		} catch(e) {
			reject(e);
		}
	}

	// promise then 返回的并非 Promise 本身, 而是一个新的 Promise
	then(onFulfilled, onRejected) {
		onFulfilled = 'function' === typeof onFulfilled ? onFulfilled : value => value;
		onRejected = 'function' === typeof onRejected ? onRejected : err => {throw err};

		// 用于递归串联 Promise, 对可能是 Promise 的函数进行尝试调用, 对返回值进行处理, 
		function resolveRet(retPromise, ret, resove, reject) {
			if (ret === retPromise) return reject(new Error('retain circular'));
			if (ret instanceof Promise) {
				// 返回值本身就是 Promise, 对 Promise 进行递归调用
				try{
					ret.then(val => {
						resolveRet(retPromise, val, resolve, reject);
					});
				} catch(e) {
					reject(e);
				}
				return;
			}

			// 类似 Promise
			if (ret && ret.then 
				&& 'function' === typeof ret 
				&& 'function' === typeof ret.then) {
				let called = false;
				// 尝试调用
				try {
					ret.then(val => {
						if (called) return;
						called = true;
						return resolveRet(retPromise, val, resolve, reject);
					}, err => {
						if (called) return;
						called = true;
						return reject(err);
					});	
				} catch (e) {
					if (called) return;
					called = true;
					reject(e);
				}
				return;
			}
			// 其他值
			return resolve(ret);
		}

		
		const self = this;
		let retPromise = null;
		return retPromise = new Promise((resolve, reject) => {
			// 如果 self 状态已结束, 直接回调即可,
			if (self.state === FULFILLED) {
				// 此处不用 try catch 是因为在实例化 Promise 已进行了 try catch
				const ret = onFulfilled(self.value);
				// 还需对 返回值进行处理, 如: 对 Promise 进行串联, 类 Promise 进行转换, 其余类型再返回
				resolveRet(retPromise, ret, resolve, reject);
				return;
			}
			if (self.state === PENDING) {
				const ret = onRejected(self.reason);
				resolveRet(retPromise, ret, resolve, reject);
				return;
			}
			// 如果 self 尚未结束, 则记录至对应的回调函数
			self.onFulfilledCallback.push(value => {
				const ret = onFulfilled(val);
				resolveRet(retPromise, ret, resolve, reject);
			});
			self.onRejectedCallback.push(reason => {
				const ret = onRejected(reason);
				resolveRet(retPromise, ret, resolve, reject);
			});
		});
	}

	catch(onRejected) {
		return this.then(null, onRejected);
	}

	finally(onFinally) {
		this.then(
			val => Promise.resolve(onFinally()).then(() => val),
			reson => Promise.resolve(onFinally()).then(() => {throw reson})
			);
	}

	static resolve(val) {
		return new Promise((resolve, reject) => resolve(val)) ;
	}
	static reject(reason) {
		return new Promise((resolve, reject) => reject(reason));
	}
	static race(pArray) {
		return new Promise((resolve, reject) => {
			pArray.forEach(p => {
				p.then(resolve, reject);
			});
		});
	}
	static all(pArray) {
		let resArray = [];
		let retCnt = 0;

		return new Promise((resolve, reject) => {
			pArray.forEach((p, idx) => {
				p.then(val => {
					resArray[idx] = val;
					retCnt ++;
					if (retCnt === pArray.length) {
						resolve(resArray);
					}
				}).catch(e => {
					reject(e);
				}) 
			});
		});
	}
}


module.exports = Promise;








