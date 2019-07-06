## StatefulSet 
[StatefulSet 基本使用](https://kubernetes.io/zh/docs/tutorials/stateful-application/basic-stateful-set/)

### 创建一个 StatefulSet

#### [配置文件](config/web.yaml)
注意事项： 

* 若网络环境允许，可移除配置文件中的本地仓库前缀
* 若网络环境不允许，可寻找替代镜像，转存到私有仓库

#### 相关资命令
```bash
kubectl create -f web.yaml

kubectl get pods -l app=nginx

kubectl get service nginx

kubectl get statefulset -l app=nginx

```

