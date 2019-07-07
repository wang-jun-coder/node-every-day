### 使用ConfigMap来配置Redis
[ConnfigMap 配置 Redis](https://kubernetes.io/zh/docs/tutorials/configuration/configure-redis-using-configmap/)

[redis-config](config/redis-config)

[redis-pod.yaml](config/redis-pod.yaml)

注意：yaml 的配置redis镜像

#### 创建步骤
```bash
# 创建configmap
kubectl create configmap example-redis-config --from-file=redis-config

# 查看
kubectl get configmap example-redis-config -o yaml

# 创建 pod
kubectl create -f redis-pod.yaml

# 进入 redis pod
kubectl exec -it redis redis-cli

# 查看 redis 配置
config get maxmemory
config get maxmemory-policy

```
