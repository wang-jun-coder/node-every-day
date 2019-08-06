## koa2 源码阅读

### 核心文件

#### application.js
application 就是 koa 库默认导出的对象

此对象有如下方法：

* **constructor** 
	* 对象初始化，设置默认配置
* **listen**
	* 创建 server，并设置 http 回调至当前 koa 实例的工具方法
* toJSON
	* 自定义当前实例 toJson 对象，仅返回部分字段
* inspect
	* 用来自定义 console.log 输出值（util.inspect.custom）
* **use** 
	* 用来录入中间件，保存至实例的 middleware 中去
* **callback**
	* 创建并返回 http 响应的回调函数，在回调函数中已组合中间件， 并根据 req，res 创建好了 koa 上下文
* **handleRequest**
	* 执行串联好的中间件，并在中间件执行完毕后，使用 res 返回给客户端响应数据（返回方法也在此文件实现，但并未导出）
* **createContext**
	* 初始化一个 context，在中间件执行中，作为参数传递
* **onerror**
	* 默认的 error 响应函数 

#### context.js
context 是一个上下文对象，每一个 http 请求，都会对应一个上下文，上下文包含了 req, res 等信息，并且代理了部分 req 和 res 的相关方法

context 返回的是一个对象，这个对象在 application 创建 context 时作为原型使用，此原型有如下方法：

* inspect
	* 自定义输出
* toJSON
	* 自定义转 json 对象
* assert
	* 实际上是 httpAssert 的引用，便于 ctx 断言条件抛出响应错误，如：`ctx.assert(ctx..user, 401, 'Please login!');`
* throw
	* 实际上转调 createError，并抛出异常，如：`ctx.throw(403)`, `ctx.throw(403,'name required')` 等


#### request.js
#### response.js

