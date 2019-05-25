## 内存释放

### js 中变量的释放
* 引用类型：没有引用后，由 V8 GC 回收
* 值类型
	* 闭包情况下，需等待闭包没有引用才回收
	* 非闭包，等待 V8 新生代切换时回收

### 特殊 case
```js
let arr = [];
while(true)
  arr.push(1);
  
// 不停向数组中添加元素，导致数组占用内存过大，直至内存溢出  
```	

```js
let arr = [];
while(true)
  arr.push();
  
// arr.push 不传递参数，对数组无影响，但是 while（true）  会导致代码死循环
```


