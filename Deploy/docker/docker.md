### 使用 docker 部署 nodejs 应用

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

#### docker 私有仓库部署

* 除非在集群每个 node 上都编译对应镜像，否则没有镜像的 node 则无法拉取镜像  
* 通常基于 docker 官方的 registry 镜像可以很方便的搭建一个私有镜像仓库，方便集群下载镜像
* 搭建私有仓库，最好配置 tls 访问

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
#http://127.0.0.1:5000/v2/_catalog

# 重新下载镜像
docker image rm 127.0.0.1:5000/node-in-docker:v1.0.0
docker pull 127.0.0.1:5000/node-in-docker:v1.0.0

```
