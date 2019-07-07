### SourceIp

[使用 SourceIp](https://kubernetes.io/zh/docs/tutorials/services/source-ip/)

### 创建服务

```bash
# 注意镜像是否可获取
kubectl run source-ip-app --image 192.168.31.51:5000/k8s.gcr.io/echoserver:1.4
```
#### Type=ClusterIP 类型 Services 的 SourceIP

```bash
# 暴露进程
kubectl expose deployment source-ip-app --name=clusterip --port=80 --target-port=8080

# 查看服务信息
kubectl get svc clusterip

# 再开启一个 pod，从相同集群的 pod 访问这个 cluster ip
kubectl run -it --image busybox:1.28.3 --restart=Never --rm 
wget -qO - 10.96.9.191
```

#### Type=NodePord 类型 service 的 SourceIP

```bash
# 暴露 NodePort 的服务
kubectl expose deployment source-ip-app --name=nodeport --port=80 --target-port=8080 --type=NodePort

# 设置端口变量和结点变量
NODEPORT=$(kubectl get -o jsonpath="{.spec.ports[0].nodePort}" services nodeport)
NODES=$(kubectl get nodes -o jsonpath='{ $.items[*].status.addresses[?(@.type=="ExternalIP")].address }')

# 注意：本机使用 minikube 只有一个主节点，所以暂时使用主节点 ip
NODES=192.168.99.100

# 循环访问所有节点的指定 ip
for node in $NODES; do curl -s $node:$NODEPORT | grep -i client_address; done

# 设置保留客户端源 ip 地址
kubectl patch svc nodeport -p '{"spec": {"externalTrafficPolicy":"Local"}}'

```
#### Type=LoadBalancer 类型 Services 的 Source IP

```bash
暴露服务
kubectl expose deployment source-ip-app --name loadbalancer --port=80 --target-port=8080 --type=LoadBalancer

# 强制将没有 endpoint 的节点把自己从负载均衡流量的可选结点中删除
kubectl patch svc loadbalancer -p '{"spec":{"externalTrafficPolicy":"Local"}}'

# 查看健康检查端口
kubectl get svc loadbalancer -o yaml | grep -i healthCheckNodePort

# 测试
curl 192.168.99.100:32101/healthz

```

#### 资源删除
```
# 删除服务
kubectl delete svc -l run=source-ip-app

# 删除部署
kubectl delete deployment source-ip-app

```

























