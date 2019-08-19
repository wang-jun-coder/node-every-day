## this

### 作用域
* 静态作用域（词法作用域）
	* 变量的作用域，在定义时就已确定，js （大多数语言）采用的都是词法作用域
* 动态作用域
	* 变量的作用域，在使用时才确定（如宏定义）

### this 指向
**this 的指向是在调用函数时，根据函数执行上下文动态确定的**

* 函数体内，在直接调用该函数时（如：f()）, 严格模式this 指向 undefined，非严格模式指向全局（global/window）
* 一般构造函数，this 会绑定到新创建的对象上
* call，apply，bind，则绑定到指定的对象上
* 一般由某对象调用，则绑定到该对象上，（如：obj.fn()）
* 箭头函数则是根据其外层上下文确定





### 参考资料
* [作用域](https://zh.wikipedia.org/wiki/%E4%BD%9C%E7%94%A8%E5%9F%9F)
* [一网打尽 this，对执行上下文说 Yes](https://gitbook.cn/gitchat/column/5c91c813968b1d64b1e08fde/topic/5c99a854ccb24267c1d0194f)
