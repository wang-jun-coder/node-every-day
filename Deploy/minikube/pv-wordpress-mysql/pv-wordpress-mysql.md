### 搭建 WordPress 和 MySQL 应用
[基于 Persistent Volumes 搭建 WordPress 和 MySQL 应用](https://kubernetes.io/zh/docs/tutorials/stateful-application/mysql-wordpress-persistent-volume/)
[local-volumes.yaml](config/local-volumes.yaml)
[mysql-deployment.yaml](config/mysql-deployment.yaml)
[wordpress-deployment.yaml](config/wordpress-deployment.yaml)
[password.yaml](config/password.yaml)

#### 快速结束

```bash
kubectl create -f local-volumes.yaml
kubectl create secret generic mysql-pass --from-file=password.txt
kubectl create -f mysql-deployment.yaml
kubectl create -f wordpress-deployment.yaml
```
#### 存储数据

```bash
# 进入 minikube 结点
minikube ssh

# 配置权限
## on every node:
mkdir -p /tmp/data
chmod a+rwt /tmp/data  # match /tmp permissions
# 貌似 minikube 的 vm 不支持 selinux
# chcon -Rt svirt_sandbox_file_t /tmp/data

# 创建持久卷
kubectl create -f local-volumes.yaml

# 创建密码
echo -n "1f2d1e2e67df" > ./password
kubectl create secret generic mysql-pass --from-file=password

# 或直接使用 base64 创建密码
kubectl create -f password.yaml

# 部署 mysql
kubectl create -f mysql-deployment.yaml
 
# 查看当前部署状态
kubectl get deployment,pod,svc,endpoints,pvc -l app=wordpress -o wide && \
  kubectl get secret mysql-pass && \
  kubectl get pv 

# 部署 WordPress
kubectl create -f wordpress-deployment.yaml

# 删除服务
kubectl delete deployment,service -l app=wordpress
kubectl delete secret mysql-pass

# 释放持久空间
kubectl delete pvc -l app=wordpress
kubectl delete pv local-pv-1 local-pv-2


```















