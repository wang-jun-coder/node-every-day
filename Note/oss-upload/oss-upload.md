## OSS 上传

前些天做一个功能的时候, 涉及到 OSS 上传微信生成的小程序码, 神奇的是流上传失败. 具体情况如下:


* OSS 流上传本地文件, 成功
* 流下载微信小程序码, 成功
* 将下载流 交由 OSS 流上传, 失败

### 准备复现


### 查询

* 网络流直接写入本地文件, 文件政策, 直接使用流上传失败

* 报错签名问题, 检查签名后, 查验发现sdk 签名正常

* 目前猜测可能 oss 服务端暂不支持网络流上传但是文档表示支持, 猜测错误 

* request 流对象与本地文件流有区别? 本地文件流直接读取二进制数据, request 流不是

* 发现sdk 的下载流可以用于上传,准备分析 sdk 的下载流

* 查看源码 OSS 下载流基于 urllib 实现, 提取关键参数 customResponse/streaming true

* 尝试使用 urllib streaming 上传, 上传成功

### fs.createWriteStream vs urllib vs request



