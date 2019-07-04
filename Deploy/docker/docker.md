## 使用 docker 部署 nodejs 应用

### docker 部署

#### 新建镜像

[project](./project) 目录下有一个 demo 项目

```bash
# 创建一个镜像
docker build -t wj/node-in-docker:v1.0.0 .

# 查看镜像
docker images

# 删除镜像 
docker image rm wj/node-in-docker:v1.0.0 
```

#### 运行镜像

```bash
docker run --name node-in-docker -p 3001:3000 -d wj/node-in-docker:v1.0.0

docker ps -l 

docker logs node-in-docker

docker stop node-in-docker && docker rm node-in-docker
```


### Kubernetes 部署
[hello-minikube](https://kubernetes.io/docs/tutorials/hello-minikube/)

### 搭建本地镜像仓库

除非在每个 node 上都编译对应镜像，否则没有镜像的 node 则无法启动镜像  
通常基于 docker 官方的 registry 镜像可以很方便的搭建一个私有镜像仓库，方便集群下载镜像

```bash
# 启动仓库
docker run \
--name registry-local \
-d \
-p 5000:5000 \
-v $PWD/data/registry:/var/lib/registry \
registry

# 创建镜像
docker build -t wj/node-in-docker:v1.0.0 .

# 上传镜像
docker tag wj/node-in-docker:1.0.0 127.0.0.1:5000/node-in-docker:v1.0.0
docker push 127.0.0.1:5000/node-in-docker:v1.0.0

#查看镜像
http://127.0.0.1:5000/v2/_catalog

# 重新下载镜像
docker image rm 127.0.0.1:5000/node-in-docker:v1.0.0
docker pull 127.0.0.1:5000/node-in-docker:v1.0.0

```

#### 使用 minikube 搭建本机集群
注意： 

* minikube 仅用于本机模拟学习，生产环境并不适用
* minikube 安装过程，部分镜像需要科学上网

```bash
# 开启 minikube 集群，并允许 192.168.31.51 的 http 访问
minikube start --insecure-registry 192.168.31.51:5000

# 创建 deployment
kubectl run node-in-docker --image=192.168.31.51:5000/node-in-docker:v1.0.0.0 --port 3000

kubectl get deployments

kubectl get pods

kubectl describe deployment

# 暴露 node-in-docker 服务
kubectl expose deployment node-in-docker --type=LoadBalancer

kubectl describe service node-in-docker

```
