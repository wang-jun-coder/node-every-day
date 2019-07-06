### Kubernetes 部署 nodejs 服务
[hello-minikube](https://kubernetes.io/docs/tutorials/hello-minikube/)


#### 使用 minikube 模拟部署 nodejs 服务
注意： 

* minikube 仅用于本机模拟学习，生产环境并不适用
* minikube 安装过程，部分镜像需要科学上网

```bash

minikube start

# 开启 minikube 集群，并允许 192.168.31.51 的 http 访问（本地镜像库，方便拉取镜像）
# minikube start --insecure-registry 192.168.31.51:5000

# 查看集群信息
kubectl cluster-info

# 创建 deployment
kubectl run node-in-docker --image=192.168.31.51:5000/node-in-docker:v1.0.0 --port 3000

kubectl get deployments

kubectl get pods

kubectl describe deployment

# 暴露 node-in-docker 服务
kubectl expose deployment node-in-docker --type=LoadBalancer

kubectl describe service node-in-docker

kubectl get service 

#访问服务 cluster ip + service out port
# http://192.168.99.100:31097

# 查看某 pod 的 logs 
kubectl logs node-in-docker-57d7c49dfd-5q2qc

# 缩放更多实例
kubectl scale deployments/node-in-docker --replicas=4

# 升级镜像
docker build -t 127.0.0.1:5000/node-in-docker:v1.0.1 .
docker push 127.0.0.1:5000/node-in-docker:v1.0.1

# 更新 deployments 中的镜像
kubectl set image deployment/node-in-docker node-in-docker=192.168.31.51:5000/node-in-docker:v1.0.1

# 再次访问服务， 内容已更改
# http://192.168.99.100:31097

# 删除服务
kubectl delete service node-in-docker
kubectl delete deployments node-in-docker

#关闭集群
minikube stop
```

### 配置文件部署
[使用Deployment运行一个无状态应用
](https://kubernetes.io/zh/docs/tasks/run-application/run-stateless-application-deployment/)  
[invalid object doesn't have additional properties](https://stackoverflow.com/questions/55417410/kubernetes-create-deployment-unexpected-schemaerror)

deployment-node-in-docker.yaml

```yaml
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  name: node-in-docker-deployment
spec:
  replicas: 4 
  template: 
    metadata:
      labels:
        app: node-in-docker
    spec:
      containers:
      - name: node-in-docker
        image: 192.168.31.51:5000/node-in-docker:v1.0.1
        ports:
        - containerPort: 3000
```
service-node-in-docker.yaml

```yml
kind: Service
apiVersion: v1
metadata:
  name: node-in-docker-service
spec:
  selector:
    app: node-in-docker
  ports:
    - protocol: TCP
      port: 3000
      targetPort: 3000
  type: LoadBalancer
```

```bash
# 创建、更新 deployment
kubectl create -f ./deployment-node-in-docker.yaml
kubectl apply -f deployment-node-in-docker.yaml
kubectl create -f ./service-node-in-docker.yaml
```
### 可视化部署

```bash
minikube dashboard
```
