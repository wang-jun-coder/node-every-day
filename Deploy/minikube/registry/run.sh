
# 使用此命令在本地创建一个私有仓库，供 minikube 使用
docker run \
--name registry-local \
-d \
-p 5000:5000 \
-v $PWD/data/registry:/var/lib/registry \
registry
