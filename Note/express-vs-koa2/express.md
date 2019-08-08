## express 源码阅读
express 是一个基于 node.js 的轻量级 web 服务框架，基于 callback 机制，实现中间件管道串联调用。

### 基本文件

#### express.js
express.js 是 express 框架导出的文件（index.js 仅中转）。
本文件提供了一个快速创建 express 实例的函数，同时负责导出相关模块，最后对一些废弃中间件进行提示（报错）。
具体函数如下：

* createApplication
	* 创建一个回调函数 app，此函数作为 express 实例返回，
		* 当请求回调此函数，其将回调转至 app.handle 函数
	* 将 application.js 导出的函数，和 EventEmitter 原型链上的函数，复制到 app 上，时期具备二者的方法
	* 在 app 上挂载一个 request 对象，此对象以 request.js 导出的对象为原型，同时反向持有 app 
	* 在 app 上挂载一个 response 对象，此对象以 response.js 导出的对象为原型，同时反向持有 app 
	* 初始化 app，调用 app.init 方法
* 导出一些预定函数，如 proto，request，response，Router 和部分中间件
* 废弃部分中间件，当引用这些中间件时，抛出异常

#### application.js
application.js 实际上是作为 express 实例的原型使用，此处简称 express 实例为 app。
其包含方法如下：

* init 
	* 普通函数，初始化内部变量，如：cache，engines，settings 等
	* 设置默认配置，转调 this.defaultConfiguration()
* defaultConfiguration
	* 配置 app 默认参数
	* 监听 mount 事件，对app 持有的 request，response 等设置原型（当当前 app 挂载至另一个 app 实例上时）
	* 监听事件，初始化 local，废弃 router 等 
* lazyrouter
	* 懒加载一个 router
	* 配置默认 query 中间件，解析 query 参数使用
	* 配置默认初始化中间件，对请求参数进行配置，持有对象，设置 req, res 原型等
* handle
	* 当网络请求来临时，node.js 将请求回调至 app，app 转调此函数
	* 获取当前 app 的默认 router，创建最终回调函数（finalhandler，用来最终返回数据给客户端）
	* 转交请求和回调给 router.handle
	* 注意：此处的 router 是 router/index.js 导出的对象
* use
	* express 实例通过此方法加载中间件函数，对单个函数，或函数数组均支持
	* 调用 lazyrouter 初始化app 的私有 router
	* 对于非 express app，将中间件挂载至 app 私有 router 上 返回
	* 若挂载的中间件是一个 express app，会对中间件进行封装，将请求转调至 app 的 handle 方法，同时使用挂载的 app 发送 mount 事件，促使挂载的 app 进行配置
* route	
	* 代理方法，获取指定 path 的 route 
	* 实际上转调 router.route
* engine
	* 指定模板文件后缀对应的渲染函数
* param
	* 代理 router.param, 对指定的参数设置回调中间件
	* 如：
		
		```js 
		app.param('id', function (req, res, next, id) {
		    console.log(`app.param id: ${id}`);
		    next();
		});
		app.get('/user/:id', function (req, res, next) {
		    res.end(`id is ${req.params.id}`);
		});
		// curl http://localhost:3000/user/1
		```
* set
	* 设置配置项的值，若只传递配置项名称，则返回已配置的值
* path
	* 返回当前 app 所挂载的路径
* enabled
	* 确认 app 是否已开启某项配置，查看标记位是否为 true
* disabled
	* 确认 app 是否已关闭某项配置，查看标记位是否为 false
* enable
	* 开启某项配置，设置标记位为 true
* disable 
	* 关闭某项配置，设置标记位为 false
* 为 app 批量挂载 http 方法
	* 挂载 get，post head put delete 等等
	* 此处 get 有特殊处理，若传递参数仅有一个，则认为是获取指定项的配置，其他 case 认为是 http 请求函数
	* 实际上是转调 router 的对应 get，post 等函数
	* 主要功能，设置指定 path 的指定 http 方法的回调函数/函数列表
* all
	* 设置指定 path 的 http 回调/回调列表，不管 http method 是什么
	* 实际上也是转调 router 的 all 方法
* render
	* 用于初始化渲染函数，提前准备渲染所需的数据结构（将app.locals合并到数据源中）以及渲染文件路径
	* 按需缓存渲染函数至 app.cache 中
	* 尝试使用渲染函数去渲染模板
* listen
	* 一个快速创建 http 服务的方法
* 模块内私有函数，非 app 函数
	* logerror
		* 输出 log 日志
	* tryRender
		* 调用设置的渲染引擎，渲染模板
		
#### request.js
request.js 被用来作为 req 的原型（application.js -> lazyrouter -> middleware.init(this) -> 设置了 req，res 的原型），相当于对 req 的封装。同时，request.js 导出的对象，使用 http.IncomingMessage.prototype 作为原型，所以 res 原来的属性并不会丢失。
对应函数如下：

* get，header
	* 获取请求头内的值
* accepts
	* 判断请求头声明的是否支持响应类型
	* 如： req.accepts('html, json'); => json
* acceptsEncodings
	* 判断支持的编码
* acceptsCharsets
	* 判断支持的字符集
* acceptsLanguages
	* 判断支持的语言
* range
	* 解析请求头中的 range 字段，便于做断点续传等功能
* param
	* 获取请求参数（RESTful 参数，body 参数，query 参数，传递的默认值）
* is
	* 判断请求的 content-type
	* 如：req.is('application/*'); => true
* protocol
	* get 方法，返回请求协议，如信任代理，则返回代理的协议
* secure
	* get 方法，判断代理是否是 https
* ip
	* get 方法，返回远端地址
* ips
	* get 方法，如信任代理，返回从客户端到服务端 ip 列表
* subdomains
	* get 方法， 子域名列表
* path
	* get 方法，获取请求的 path
* hostname
	* get 方法，获取请求域名
* host
	* get 方法，同 hostname，建议使用 hostname
* fresh
	* get 方法，根据 etag，last-modified 等判断请求是否新鲜
* stale
	* get 方法，fresh 的想反值
* xhr
	* get 方法，判断是否是 XMLHttpRequest
* 模块内工具方法
	* defineGetter
		* 用来辅助声明 getter 方法

#### response.js
response 用来做 res 的原型，设置位置同 req，同时 response 的原型是 http.ServerResponse.prototype，故不会影响 res 原有方法。
其封装方法如下：

* status
	* 设置 http 响应码
* links
	* 设置响应头 Link 字段
* send
	* 响应数据给客户端
	* 函数内部进行了多参数适配，对于传入的对象也进行了适配
	* 函数内自己计算了 etag，设置 请求头等操作
* 

#### util.js

#### view.js

#### middleware/init.js

#### middleware/query.js

#### router/index.js

#### router/layer.js

#### router/route.js





