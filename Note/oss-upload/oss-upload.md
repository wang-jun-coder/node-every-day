## oss 上传

前些天做一个功能的时候, 涉及到 oss 上传微信生成的小程序码, 神奇的是流上传失败. 具体情况如下:


* oss 流上传本地文件, 成功
* 流下载微信小程序码, 成功
* 将下载流 交由 oss 流上传, 失败

### 准备复现


### 查询

* 网络流直接写入本地文件, 文件政策, 直接使用流上传失败

* 报错签名问题, 检查签名后, 查验发现sdk 签名正常

* 目前猜测可能 oss 服务端暂不支持网络流上传但是文档表示支持, 猜测错误 

* request 流对象与本地文件流有区别? 本地文件流直接读取二进制数据, request 流不是

* 发现sdk 的下载流可以用于上传,准备分析 sdk 的下载流

* 查看源码 oss 下载流基于 urllib 实现, 提取关键参数 customresponse/streaming true

* 尝试使用 urllib streaming 上传, 上传成功

* [stream参数可以是任何实现了readable stream的对象](https://help.aliyun.com/document_detail/111267.html?spm=a2c4g.11186623.6.1119.21d615cdl19xsh)

### fs.createreadstream vs urllib vs request

* fs.createreadstream 返回是 readstream
* urllib.request 自定义返回的是 incommingmessage(继承 readstream )
* request 返回的是 request 类, 这是一个自定义类, 实现了可读可写的流接口, 并且对 pipe 等流方法进行了重写

### 为什么会失败?

#### request pipe fs.createWriteStream 可以成功
 request 是自定义的双工流, pipe 到一个可写流实际上是将 http 返回值 pipe 过来
 [pipe 方法](https://github.com/request/request/blob/212570b6971a732b8dd9f3c73354bcdda158a737/request.js#L1467)  
 [emit data](https://github.com/request/request/blob/212570b6971a732b8dd9f3c73354bcdda158a737/request.js#L1073)

#### 阿里云 sdk 实际上仅是做了签名授权, putStream 最终是将 stream 交给了 urllib 的 stream 参数
 [putStream](https://github.com/ali-sdk/ali-oss/blob/93ae26ef48a8cb3da5bfc80c8507265ce4e5f14d/lib/object.js#L125)  
 [createRequest](https://github.com/ali-sdk/ali-oss/blob/93ae26ef48a8cb3da5bfc80c8507265ce4e5f14d/lib/client.js#L268)  
 [request](https://github.com/ali-sdk/ali-oss/blob/93ae26ef48a8cb3da5bfc80c8507265ce4e5f14d/lib/client.js#L312)          
 
#### urllib 是怎么使用 stream 参数的

[args.stream pipe to req](https://github.com/node-modules/urllib/blob/bbb988780db6e18ada3283752412e429a0f1caa1/lib/urllib.js#L1100)  
[req 则是 http(s) Request](https://github.com/node-modules/urllib/blob/bbb988780db6e18ada3283752412e429a0f1caa1/lib/urllib.js#L969)  
[request pipe 后将 response header 放到了 req的 header 中](https://github.com/request/request/blob/212570b6971a732b8dd9f3c73354bcdda158a737/request.js#L1172)
[阿里云授权通过校验 header 中字段, 与上传请求内容不符, 导致请求失败](https://help.aliyun.com/document_detail/31951.html?spm=a2c4g.11186623.6.1196.69d95869NkX49U)


### 总结
request 库是自定义流, 其 pipe 到 dest 请求时, 会将请求头一并设置过去, 导致 ali-oss 设置的校验头校验失败
urllib streaming 返回的流, 是一个 IncomingMessage 不会对后续请求设置特殊操作, 所以可以成功  
         


  
























