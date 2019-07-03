## 服务注册发现

### 参考资料

* [基于Registrator、ZK（Zookeeper）以及docker实现的服务注册与发现。](https://github.com/jasonGeng88/service_registry_discovery)
* [基于Docker、Registrator、Zookeeper实现的服务自动注册](https://github.com/jasonGeng88/blog/blob/master/201703/service_registry.md)


### 为什么需要服务注册发现

* 单体应用开发部署测试不方便， 拆分成微服务  
* 微服务数量较多，扩容之类，导致服务地址不适合硬编码到工程内
* 需要一个服务注册中心，将微服务管理起来，需要调用微服务时，向注册中心查询微服务地址
* 面对大量微服务，可以在微服务外部署一套 微服务网关，负责代理微服务

### 注册中心
* 注册中心需要管理大量微服务，同时需对微服务进行检查
* 微服务有上线下线操作时，需要及时通知订阅者
* 常用 zookeepr 等分布式服务

### 项目结构
本机作为尝试， 仅使用一台设备进行模拟  
一般微服务之间通过 rpc 进行链接，此处为了模拟方便使用 http	

* service 充当微服务角色，会启动多份（不同端口）模拟一个服务
* zookeeper 充当服务注册中心，利用其临时顺序结点的特性
* gateway 充当网关角色，负责代理请求
* client 充当服务消费者角色


### 模拟步骤

* 依次启动 service/service1.js 和 service/service2.js， 服务功能相同，注册 demo 节点
* 启动 gateway/gateway.js，gateway 未做负载均衡，此处仅取 demo 下第一个结点
* node client/client.js 向 gateway 发起请求，可查看返回值
* 停掉 service2 
* node client/client.js 向 gateway 发起请求，可查看新的返回值

注意：  
* service 断开后，zookeeper 需要一段时间才能确认服务下线，确认下线后才会移除结点（临时顺序结点）
* 可使用 zkcli 链接 zookeeper 查看目录情况
