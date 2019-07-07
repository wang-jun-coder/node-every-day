### 部署一个 Zookeeper

[运行 ZooKeeper， 一个 CP 分布式系统](https://kubernetes.io/zh/docs/tutorials/stateful-application/zookeeper/)

[zookeeper.yaml](config/zookeeper.yaml)

注意：

* yaml 中的镜像可用性
* 集群资源上限（minikube 默认只有 2 核 2G，20G 硬盘，此处我临时扩容至 4 核 4G，20G硬盘，并注释了对内存的要求）

#### 创建一个 ZooKeeper Ensemble

```bash
# 创建 zookeeper 服务
kubectl create -f zookeeper.yaml



# 获取 pod 主机名 (zk-0 zk-1 zk-2)
for i in 0 1 2; do kubectl exec zk-$i -- hostname; done

# 检查 myid(1 2 3) 
for i in 0 1 2; do echo "myid zk-$i"; kubectl exec zk-$i -- cat /var/lib/zookeeper/data/myid; done

# 获取 Fully Qualified Domain Name （正式域名）
for i in 0 1 2; do kubectl exec zk-$i -- hostname -f; done

# 查看 zookeeper 应用配置
kubectl exec zk-0 -- cat /opt/zookeeper/conf/zoo.cfg

#Ensemble 健康检查
# 直接在 zk-0 pod 上写入 world 到路径 /hello
kubectl exec zk-0 zkCli.sh create /hello word
# 从 zk-1 pod 获取数据
 kubectl exec zk-1 zkCli.sh get /hello
 
# 关闭 statefulset 
kubectl delete sts zk

# 重启sts, 其余服务因为尚未删除，不会被修改
kubectl create -f zookeeper.yaml

# 从 zk-2 中获取刚存储的数据
 kubectl exec zk-2 zkCli.sh get /hello
 
# 获取 zk 的环境变量
for i in 0 1 2; do kubectl exec zk-$i env | grep ZK_*; echo ""; done

# 查看日志配置
kubectl exec zk-0 cat /usr/etc/zookeeper/log4j.properties

# 查看最后20 行日志
kubectl logs zk-0 --tail 20

# 查看 zookeeper 进程信息
kubectl exec zk-0 -- ps -elf

# 查看文件权限
kubectl exec -it zk-0 -- ls -ld /var/lib/zookeeper/data
```

#### 管理 zookeeper 进程
```bash
# 查看 zk-0 的进程树
kubectl exec  zk-0 -- ps -ef

# 监视 zk pods，并杀死 zk-0 中的 zookeeper 进程
 # 可以看到 zk-0 状态变为 error，进而重启 zk-0
 kubectl get pods -w -l app=zk
 kubectl exec zk-0 -- pkill java

# 监视 zk pods， 并删除监视探针脚本 zkOK.sh
 # 一段时间后可以看到 zk-0 自动重启
 kubectl exec zk-0 -- rm /opt/zookeeper/bin/zkOk.sh
```

#### 容忍结点故障

```bash
# 看看 zk 中 pod 所在结点
for i in 0 1 2; do kubectl get pod zk-$i --template {{.spec.nodeName}}; echo ""; done
```

#### 存活管理

本机使用 minikube 模拟，暂时只有一个结点，此处功能待后续开启多虚拟机使用 kubeadm 部署集群再模拟

```bash
# 查看结点
kubectl get nodes

# 本机使用minikube 模拟， 没有多余结点，故不隔离结点
# kubectl crodn <node name>

# 获取 zk-budget PodDisruptionBudget
kubectl get poddisruptionbudget zk-budget
```






































