## express vs koa2

### 不同点

* 目标不同
	* express 是 nodejs api 框架的祖先，是一个非常简洁的小框架，占用资源少
	* koa 以利用新的 Javascript 语言功能为目标，koa 比 express 更轻量
* router
	* express 默认带有 router
	* koa 默认不带 router，需要手动安装第三方
* 中间件模式不同
	* express 回调式串联中间件
	* koa 洋葱圈模型，可指定中间件执行位置
* 性能
	* express 性能较高，不少第三方框架基于其进行二次开发
	* koa 性能比 express 稍高
* 兼容性
	* express 对新特性依赖不高
	* koa2 依赖 asyn/await 需 node 版本大于 7.6

### 相同点
* 均是轻量级 web 框架，开发者都是同一拨人
* 均采用中间件形式来扩展功能
* session，cookie，等，均需要引入第三方中间件解析
* 所对外暴露的功能基本相同
