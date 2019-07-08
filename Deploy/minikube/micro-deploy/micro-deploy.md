## 微服务部署

[zookeeper.yaml](config/zookeeper.yaml)  
[micro.yaml](config/zookeeper.yaml)  
[gateway.yaml](config/gateway.yaml)  
[服务注册与发现 demo](../../registry-discovery/registry-discovery.md)

### 准备相关镜像

[micro-service-Dockerfile](project/service/Dockerfile)
[gateway-Dockerfile](project/gatewat/Dockerfile)

```bash
# 制作service镜像
docker build -t micro/service:v1.0.0 .
# 启动镜像 访问 http://localhost:3000/ 测试服务是否正常
docker run -d --name micro-service -e ZOOKEEPER_HOST=192.168.31.51 -e ZOOKEEPER_PORT=2181 -p:3000:4000  micro/service:v1.0.0

# 上传至私有仓库
docker tag micro/service:v1.0.0 127.0.0.1:5000/micro/service:v1.0.0
docker push 127.0.0.1:5000/micro/service:v1.0.0

# 制作 gateway 镜像
docker build -t 127.0.0.1:5000/micro/gateway:v1.0.0 .

# 启动 gateway 并验证 
 docker run -d --name micro-gateway -e ZOOKEEPER_HOST=192.168.31.51 -e ZOOKEEPER_PORT=2181 -p 3001:3000 127.0.0.1:5000/micro/gateway:v1.0.0
 
# 注意：gateway 读取 header， 使用 curl 验证
curl -H 'service:demo' http://127.0.0.1:3001
 
# 上传至私有库
docker push 127.0.0.1:5000/micro/gateway:v1.0.0
```

### 部署微服务

#### 编写 yaml
[zookeeper.yaml](config/zookeeper.yaml)
[micro-service.yaml](config/micro-service.yaml)
[micro-gateway.yaml](config/micro-gateway.yaml)

#### 部署服务
```bash
# 创建 zookeeper 服务
kubectl create -f zookeeper.yaml

# 创建 micro-service 服务
kubectl create -f micro-service.yaml

# 创建网关服务
kubectl create -f micro-gateway.yaml

# 访问 micro-geteway 对外的端口和 ip，验证部署是否成功
curl -H 'service:demo' http://192.168.99.101:31621

# 扩容微服务
kubectl scale deployment micro-service --replicas=2
```

#### 清除资源
```bash
kubectl delete deployment,service -l app=micro
kubectl delete sts -l app=zk
kubectl delete svc zk-headless
```




