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
* json
	* 返回 json 的封装，包括对 json 的删除，替换，设置响应头等
* jsonp
	* 返回 jsonp 请求，返回一串 js，调用传递过来的 callback 名称，并将 body 设置为参数
* sendStatus
	* 仅返回一个 http status code
* sendFile
	* 发送一个文件给客户端
* ~~sendfile~~
	* 已废弃，也是发送文件给客户端
* download
	* 发送一个文件给客户端，并设置 `Content-Disposition` 响应头 
* contentType/type
	* 设置响应头
* format
	* 设置客户端不同支持类型对应的响应回调，如：
	
		```js
		res.format({
			'text/plain': function(){
				res.send('hey');
			},
		
			'text/html': function(){
				res.send('<p>hey</p>');
			},
		
			'appliation/json': function(){
				res.send({ message: 'hey' });
			}
		});
		// or
		res.format({
		  text: function(){
		    res.send('hey');
		  },
		
		  html: function(){
		    res.send('<p>hey</p>');
		  },
		
		  json: function(){
		    res.send({ message: 'hey' });
		  }
		});
		```
* attachment
	* 设置 `Content-Disposition` 响应头， 指定下载文件
* append
	* 在原有值后拼接响应头，不覆盖原有值
* set、header
	* 设置响应头对应的值，如有则覆盖
* get
	* 获取响应头对应的当前值
* clearCookie
	* 设置 cookie 过期，客户端接收到设置的 cookie，触发过期，清空 cookie
* cookie
	* 设置 cookie 对应的值
* location
	* 设置 header 中的 Location 值
* redirect
	* 返回 302，指示浏览器重定向至另一个地址
* vary
	* 在没有vary 应答头部时增加Vary应答头部，用来给 cdn、缓存代理等，作为缓存key
* render
	* 渲染模板的封装方法
* 其他私有方法
	* sendfile
		* 使用 stream 来发送文件
	* stringify 
		* 提供json 格式化的方法，如替换，设置缩进等

#### util.js
此文件导出一些常用的方法，供 express 框架使用，这些方法通常是基于第三方包的封装

* etag
	* 返回一个 etag 计算函数
* wetag
	* 返回一个 弱 etag 计算函数
* isAbsolute
	* 判断路径是否是绝对路径
* ~~flatten~~
	* 已废弃
* normalizeType
	* 格式化类型，如： html -> text/html
* normalizeTypes
	* 循环调用 normalizeType
* ~~contentDisposition~~
	* 已废弃
* compileETag
	* 根据参数获取一个 etag 计算函数
* compileQueryParser
	* 根据参数返回一个 query 解析函数
* compileTrust
	* 转换 proxy trust 的值为一个函数
* setCharset
	* 根据传入的 conten-type 设置 charset
	
* 私有函数
	* acceptParams
		* 解析支持的类型
	* createETagGenerator
		* 创建一个 etag 的计算函数
	* parseExtendedQueryString
		* 返回一个支持原型解析的 query 解析函数
	* newObject
		* 返回一个空对象 
#### view.js
view 主要负责视图渲染相关的逻辑，如设置不同类型的模板文件对应的渲染引擎

* View
	* view.js 导出的函数，根据此函数初始化一个新的 view 实例
* lookup
	* 根据给定的文件名查询模板文件地址
* render 
	* 调用初始化给定的模板引擎，渲染模板文件
* resolve
	* 根据传入的路径和文件求文件地址
* 私有函数
	* tryStat
		* 尝试确认文件是否存在

#### middleware/init.js
此文件仅导出一个函数，这个函数作为express 默认的第一个中间件

* init
	* 传入一个 app，返回一个 express 中间件函数
	* 中间件函数，设置 req 持有 res，next， res 持有 req，
	* 设置 req， res 原型
	* 初始化 res.locals

#### middleware/query.js
此文件也仅导出一个函数

* query
	* 解析 query 参数，并将解析结果挂载到 req.query 上

#### router/index.js
router 是 express 中一个比较核心的概念，包括 express 实例，都借助 router 来实现实例间挂载能力。
router 在 koa 中被剥离出去，koa 框架本身只支持中间件的调用，如需使用路由等功能，需引入中间件

本文件默认导出一个匿名函数，此函数用来创建一个 router 实例，并对该实例进行初始化，这个实例又以此函数作为原型。

* proto，逻辑上来说，此函数是导出对象，并非 router 的属性或方法，暂时在此记录实现功能
	* 创建 router 函数，初始化参数和配置，并返回该函数
	* router 接收到请求后， 会将请求转发至 handle 函数中
* param
	* 用来设置指定单个参数对应的回调中间件，多个会被记录
* handle
	* 分发请求到 router 中去
	* 此函数中有一个局部函数，next，这是 express 中间件执行的逻辑，递归匹配执行中间件或路由
* process_params
	* 处理 params 参数，回调用 param 设置的中间件
* use
	* 设置中间件，将中间件使用 layer 包装，记录至 stack 中去

* route
	* 创建一个子 route 实例并使用 layer 包装后记录至 stack 中
* 特殊操作
	* 循环挂载 http method 和 all 方法至 router 上，
* 私有函数
	* appendMethods
		* 将一个函数数组放到另一个函数数组中，排重
	* getPathname 
		* 获取请求 req 的 pathname
	* getProtohost
		* 获取协议+host
	* gettype
		* 获取对象类型
	* matchLayer
		* 尝试匹配 layer 和 对应的 path
	* mergeParams
		* 合并参数
	* restore
		* 在函数执行完成后，恢复其 props
	* sendOptionsResponse
		* 返回一个 option 对应的响应值
	* wrap
		* 包裹一个函数，返回包裹后的函数

#### router/route.js
route 是用来处理单个路由对应请求的对象，负责管理各种 http 方法，
route.js 导出一个函数 Route, 此函数用于构造函数，可以 new 出多个实例，初始化当前的 path，stack，methods
其对应方法如下：

* _handles_method
	* 用来判断当前实例是否支持某个 http 方法
* _options
	* 返回当前支持的 http method 列表
* dispatch
	* 分发当前请求至指定函数
* all
	* 注册中间件函数，同样使用 layer 包装，记录至 stack
* 特殊操作
	* 依然 for 循环挂载 http method，内部实现依然适用 layer 包裹回调函数，并记录至 stack 中

#### router/layer.js

layer 是 express 框架中比较底层的数据结构，express 的中间件逻辑借助 router 实现，router 内部对各种http 回调的注册，均使用 layer 来包裹，此文件导出的是一个 Layer 函数，此函数做了兼容，可直接调用产生实例，也可通过 new 创建实例

* Layer
	* 导出函数，layer 构造函数
	* 初始化各种私有变量， 其中 handle用于记录被包装的回调
* handle_error
	* 处理当前 layer 对应的错误
* handle_request
	* 调用被包装的函数，执行请求，并进行异常保护
* match
	* 用来判断当前 layer 是否匹配某 path
* 其他操作
	* decode_param
		* 解码请求参数，若失败报错 400



### 请求示例
#### 示例代码

使用 express 框架，创建一个最简单的 http 服务器，使用中间件，路由等配置，分析执行过程

```js
const http = require('http');

const express = require('express');
const app = new express();

// app 实例级配置, 最终设置到 app._router 中去
app.use(function (req, res, next) {
	console.log(`app set middleware`);
    next()
});
app.get('/', function (req, res, next) {
    res.end(`hello express`);
});
app.post('/', function (req, res, next) {
    res.json({
        path: '/',
        method: 'post'
    });
});

// 单个 router 设置
const routerA = express.Router();
routerA.param('id', function (req, res, next, id) {
    console.log(`app.param id: ${id}`);
    next();
});
routerA.get('/user/:id', function (req, res, next) {
    res.end(`id is ${req.params.id}`);
});
app.use('/a', routerA);


// 单个 router 设置
const routerB = express.Router();
routerB.get('/', function (req, res, next) {
    res.end(`this is router B root path`);
});
app.use('/b', routerB);


// 全局异常处理
app.use(function (err, req, res, next) {
    console.log(`${err}`);
    res.statusCode = 500;
    res.end();
});

const server = http.createServer(app);
server.listen(3000, () => console.log(`express has listen`));
```
#### 调用分析
#### / 
* app 实例由 express.js -> createApplication 创建的匿名函数中
* app 实例转发请求到 app.handle, 此函数位于 application.js 中 
* app.handle 中异常处理，参数预处理，转到了 app 私有 router 对应的 handle 方法，此方法在 route/index.js 中
* handle, 此处才是请求的核心位置，此函数准备好参数后， 会调用函数体内部的 next 函数
	* next 函数
		* 循环 stack 中的 layer，判断是否符合当前路由
		* 执行 process_params 
			* process_params 用来分发注册的指定参数的中间件，其执行逻辑，类似当前的 next 函数逻辑
			* 
		* 执行 layer.handle_request
			* 转调 handle，即调用注册的函数
			* 通常在注册函数内结束请求

	
