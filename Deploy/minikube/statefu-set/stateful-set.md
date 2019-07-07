## StatefulSet 
[StatefulSet 基本使用](https://kubernetes.io/zh/docs/tutorials/stateful-application/basic-stateful-set/)

### 创建一个 StatefulSet

#### [配置文件](config/web.yaml)
注意事项： 

* 若网络环境允许，可移除配置文件中的本地仓库前缀
* 若网络环境不允许，可寻找替代镜像，转存到私有仓库

#### 创建命令
```bash
# 根据配置文件创建相关配置
kubectl create -f web.yaml
```
#### statefulset 中的 pod

```bash
# 获取标签 app 为 nginx 的 pods
kubectl get pods -l app=nginx

# 获取 nginx service
kubectl get service nginx

# 获取标签为 nginx 的 statefulset
kubectl get statefulset -l app=nginx

# 循环获取 web-0 到 web-1 的主机名
for i in 0 1; do kubectl exec web-$i -- sh -c 'hostname'; done

# 以终端的形式运行一个 pod， 在内部可执行 nslookup 查询对应主机的 dns 解析地址（busybox 新版本解析出错，这里换回老版本）
kubectl run -it --image busybox:1.28.3 dns-test --restart=Never --rm /bin/sh
nslookup web-0.nginx 

# 监视并列出 app=nginx 的 pod
kubectl get pod -w -l app=nginx 

# 删除所有app=nginx 的 pod， 但是由于配置文件要求至少保持两个 pod，可以在监视窗口看到 pod 会自动创建两个兵运行
kubectl delete pod -l app=nginx

# 重新查看主机型，并未变化，但是重新查看 dns 地址，发现改变

# 查看 pod 的持久化卷
kubectl get pvc -l app=nginx

# 循环将各个 pod 主机名写入 index.html 
for i in 0 1; do kubectl exec web-$i -- sh -c 'echo $(hostname) > /usr/share/nginx/html/index.html'; done

# 循环访问 pod 的 localhost，并输出响应值
for i in 0 1; do kubectl exec -it  web-$i -- curl localhost; done

# 此时可以在一个终端查看 pod 列表，另一个删除所有 pod
# 等 pod 重启完成，再次查看 localhost，看数据是否丢失

```

#### 扩容缩容

```bash
# 扩容 statefulset
kubectl scale sts web --replicas=5

# 缩容 statefulset
kubectl scale sts web --replicas=2
kubectl patch sts web -p '{"spec":{"replicas":2}}'

# 查看持久卷，发现 pod 终止后，其持久卷并未终止
 kubectl get pvc -l app=nginx
```

#### 更新

```bash
# 更新 statefulset 镜像， 注意镜像地址
kubectl patch sts web --type='json' -p='[{"op":"replace", "path": "/spec/template/spec/containers/0/image", "value":"192.168.31.51:5000/k8s.gcr.io/nginx-slim:0.7"}]'

# 删除 web-0 pod 后，等待 web-0 重启，然后查看 pod 镜像, 发现 web-0 镜像已更新
kubectl get pod -l app=nginx -o jsonpath='{range.items[*]}{.metadata.name}{"\t"}{.spec.containers[0].image}{"\n"}{end}'

# 设置pod rolling update
kubectl patch sts web -p '{"spec":{"updateStrategy":{"type":"RollingUpdate"}}}'

# 重新改变镜像， 可以看到以 pod 相反的序号进行终止重新更新
kubectl patch sts web --type='json' -p='[{"op":"replace", "path": "/spec/template/spec/containers/0/image", "value":"192.168.31.51:5000/k8s.gcr.io/nginx-slim:0.8"}]'

# 循环查看 pod 的镜像, pod 镜像都已更新
for p in 0 1; do kubectl get pod web-$p --template '{{range $i, $c := .spec.containers}}{{$c.image}}{{end}}'; echo; done

# 设置更新策略为滚动更新，同时设置分区
kubectl patch sts web -p '{"spec":{"updateStrategy":{"type":"RollingUpdate","rollingUpdate":{"partition":3}}}}'

#此时再次更新镜像，并删除 web-2, 等待重启后再次查看镜像，发现并未更新镜像
kubectl get pod web-2 --template '{{range $i, $c := .spec.containers}}{{$c.image}}{{end}}

# 减少 partition 至 2，再次重启 web-2，进行灰度扩容, 可以看到 web-2 自动重启，镜像同时也更新了
# 但此时重启 web-1 镜像并不会更，以为 小于 partition 数量
# 若指定 partition 至 0， 则会继续更新，所有镜像都会恢复最新
```

#### 删除
```bash

# 仅删除 statefulset, 并不会影响 pod 状态
kubectl delete sts web --cascade=false

# 删除 web-0 后重新创建 service
# 因为新创建指定 replicas 为 2，所以 web-1 被接收 web-2 被终止

# 级联删除 statefulset 以及相关的 pod （service 需手动删除）
kubectl delete sts web

# 删除相关服务
kubectl delete service nginx

```


#### pod 管理策略
[配置文件](config/webp.yaml) 

```bash
# 创建服务，并行
kubectl create -f webp.yaml

# 扩容仍然并行
kubectl scale sts/web --replicas=4

# 终止时也是同时终止 
kubectl delete sts web

# 删除服务
kubectl delete svc nginx

# 删除持久卷
kubectl delete pv --all
```

