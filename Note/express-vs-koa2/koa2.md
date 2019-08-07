## koa2 源码阅读

### 核心文件

#### application.js
application 就是 koa 库默认导出的对象

此对象有如下方法：

* constructor 
	* 对象初始化，设置默认配置
* listen
	* 创建 server，并设置 http 回调至当前 koa 实例的工具方法
* **use** 
	* 用来录入中间件，保存至实例的 middleware 中去
* **callback**
	* 创建并返回 http 响应的回调函数，在回调函数中已组合中间件， 并根据 req，res 创建好了 koa 上下文
* **handleRequest**
	* 执行串联好的中间件，并在中间件执行完毕后，使用 res 返回给客户端响应数据（返回方法也在此文件实现，但并未导出）
* **createContext**
	* 初始化一个 context，在中间件执行中，作为参数传递
* onerror
	* 默认的 error 响应函数 
* toJSON
	* 自定义当前实例 toJson 对象，仅返回部分字段
* inspect
	* 用来自定义 console.log 输出值（util.inspect.custom）

#### context.js
context 是一个上下文对象，每一个 http 请求，都会对应一个上下文，上下文包含了 req, res 等信息，并且代理了部分 req 和 res 的相关方法

context 返回的是一个对象，这个对象在 application 创建 context 时作为原型使用，此原型有如下方法：

* assert
	* 实际上是 httpAssert 的引用，便于 ctx 断言条件抛出响应错误，如：`ctx.assert(ctx..user, 401, 'Please login!');`
* throw
	* 实际上转调 createError，并抛出异常，如：`ctx.throw(403)`, `ctx.throw(403,'name required')` 等
* onerror
	* 默认的异常处理
* **cookies**
	* 指定了 get 和 set 方法，使得 cookies 可以当做属性使用
* inspect
	* 自定义输出
* toJSON
	* 自定义转 json 对象
* **其他操作**
	* 设置对象的自定义输出为 inspect `util.inspect.custom`
	* **delegate Response 的部分方法**
		* 代理方法
			* attachment
			* redirect
			* remove
			* vary
			* set
			* append
			* flushHeaders
		* 代理属性（getter，setter）
			* status
			* message
			* body
			* length
			* type
			* lastModified
			* etag
		* 代理 getter
			* headerSent
			* writable 
	* **delegate Request 的相关方法**
		* 代理方法
			* acceptsLanguages
			* acceptsEncodings
			* acceptsCharsets
			* accepts
			* get
			* is
		* 代理属性（getter、setter）
			* querystring
			* idempotent
			* socket
			* search
			* method
			* query
			* path
			* url
			* accept
			* origin
			* href
			* subdomains
			* protocol
			* host
			* hostname
			* URL
			* header
			* headers
			* secure
			* stale
			* fresh
			* ips
			* ip

#### request.js
request 对象是对 http req 的封装，此文件导出的对象，也是在 context 中用作原型。  
该对象有如下方法

* **header** 
	* 重写了 header 的 get set 方法，使得 header 可以用作属性
* headers 
	* header 的别名，实现方式相同
* url 
	* get、set，返回请求地址
* origin 
	* get 方法，返回 协议+domain， 如：http://test.com
* href 
	* get 方法，返回请求的全地址，
* **method** 
	* get、set 方法，获取、设置请求方法
* path 
	* get、set 方法，请求地址的 pathname
* **query** 
	* get、set 方法，request 解析后的 query
* querystring 
	* get、set 方法，request querystring
* search 
	* get、set，querystring 带 ？ 
* host 
	* get 方法，返回 host:port
* **hostname** 
	* get 方法，支持 ipv6
* URL 
	* get 方法，懒加载，返回 URL 或 对象
* fresh 
	* get 方法，根据 Last-Modified and/or the ETag 判断 get、head 请求是否过期
* stale 
	* get 方法，fresh 的相反含义
* idempotent
	* get 判断当前请求是否是幂等的（依据 method，'GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'TRACE'， 都是幂等的）
* socket 
	* get 请求，获取当前请求的 socket 对象
* charset
	* get，获取请求参数字符集
* length
	* get，请求头中的 Content-Length
* **protocol** 
	* get，获取请求协议
* **secure**  
	* get，判断是否是 https 请求
* ips 
	* get，若允许代理（app.proxy）， 代理路径中的 ip 列表
* ip 
	* get、set，获取、设置	当前请求的远端地址
* **subdomains**
	* get 获取子域名
* accept
	* get、set，请求可接受的字段(依赖库 accpet 对象) 
* accepts
	* 普通方法，检测给定的类型是否可被客户端接受，返回客户端接受的数组
* acceptsEncodings
	* 普通方法，检测给定编码是否可被客户端接受，返回客户端接受的数组
* acceptsCharsets
	* 普通方法，检测给定的编码是否可被客户端接受，返回客户端接受的数组
* acceptsLanguages
	* 普通方法，检测给定的语言是否可被客户端接受，返回客户端接受的数组
* is
	* 普通方法，判断请求 Content-Type 是否包含给定类型，如： 	`this.is('html', 'application/*'); // => 'application/json'`
* type
	* 获取 header 中的 Content-Type
* get
	* 普通函数，获取 header 中的元素
* inspect
	* 设置 `util.inspect.custom` 使用
* toJSON
	* 转 json 对象

#### response.js
此文件导出的对象，在 context 中用作 request 的原型，实际上是对 http res 的封装，提供一些常用方法

* socket
	* get，获取 res 的 socket
* header
	* get，响应头
* headers
	* get 同 header
* **status**
	* get、set，设置 http 响应码，会自动配置 statusMessage
* **message**
	* get，set，设置 http 响应信息（statusMessage）
* **body**
	* get、set，设置响应体，内部会对 body 类型进行判断，并设置不同的响应头等操作，如果 body 为 stream，传输完毕后还负责 destory
* length
	* get、set， 设置响应头中的 content-length，根据不同body 类型计算
* headerSent
	* get，检查响应头是否已发送
* vary
	* 普通方法，添加给定字段到 header 中
* **redirect**
	* 普通方法，返回 302，让客户端重新发起请求到指定地址
* attachment
	* 普通方法，添加下载头（Content-Disposition），可以指定文件名和其他配置
* type
	* get、set，设置响应头 content-type
* lastModified
	* set， 设置响应头 lastModified
* etag
	* get、set，设置响应头 etag
* is
	* 普通方法 判断 content-type
* get
	* 普通方法 获取响应头中的值
* set
	* 普通方法，设置响应头，已有会被覆盖
* append
	* 普通方法，追加响应头（已有响应头，追加在后，不会覆盖）
* remove
	* 普通方法，移除响应头
* writable
	* get 方法，判断响是否可写
* flushHeaders
	*  刷新 header
* inspect
	* 设置 `util.inspect.custom` 
* toJSON
	* 转 json 对象

### 请求示例
#### 示例代码如下

```js
const Koa = require('koa');
const http = require('http');
const app = new Koa();
app.use(async (ctx, next) => {
    console.log(` <- ${ctx.method} ${ctx.originalUrl} `);
    const begin = Date.now();
    await next();
    console.log(` -> ${ctx.method} ${ctx.originalUrl} ${Date.now()-begin} ms`);
});
app.use( async ctx => {
    ctx.body = 'hello koa';
});

const server = http.createServer(app.callback());
server.on('error', err => console.error);
server.on('listening', () => console.log('server listening'));
server.listen(3000);
// curl http://localhost:3000/
```	
#### 调用分析

#### 初始化
* 初始化 koa 对象（ application.js -> Application -> constructor）
* 注册中间件 (application.js -> Application -> use)
	* use 方法中，将传入的中间件函数，缓存到 middleware 中
	* 若传入的是 generator 函数 会尝试使用 koa-convert 进行转换
* 使用原生 http 模块，创建一个 server 实例，并指定回调函数 （application.js -> Application -> callback ）
	* callback 函数会返回一个新的函数（handleRequest），用来处理 http 回调
* 开启监听，服务启动
	
#### 请求时
* 当有请求回来时，http 模块会回调注册的回调函数
* server 创建时，指定的是 callback 的返回值  handleRequest，所以请求回调至此函数内
* handleRequest 
	* 创建上下文 （createContext）
		* 使用 context 作为原型（context.js -> proto）创建上下文对象
		* 使用 request 作为原型 (request.js -> proto) 创建封装的请求对象
		* 使用 response 作为原型 (response.js -> proto) 创建封装的响应对象
		* 组装 context 对象属性，app, req，res, request, response, state, originUrl, state 等
	* 处理请求 （handleRequest）
		* 传递 ctx，和 组合后的中间件函数（洋葱圈模型 -> koa-compose, 不到 30 行的串联中间件实现）
		* 执行中间件并进行异常事件注册
		* 中间件执行完毕后，发送响应（application.js -> handleResponse -> respond）
			* 处理 http 响应码
			* 忽略 body
			* head 请求特殊处理
			* body 处理，设置 content-length 等
			* 对于不同类型的 body 分别调用 res.end, res.pipe 等方法








