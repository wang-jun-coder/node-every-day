## [把一个 Node.js web 应用程序给 Docker 化](https://nodejs.org/zh-cn/docs/guides/nodejs-docker-webapp/)

### 初始化工程
**package.json**

```json
{
  "name": "docker_web_app",
  "version": "1.0.0",
  "description": "node.js on docker",
  "scripts": {
    "run": "node server.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "koa": "^2.7.0"
  }
}
```
**server.js**

```js
const Koa = require("koa");
const HOST = "0.0.0.0";
const PORT = 3000;

const app = new Koa();
app.use(async ctx => {
    ctx.body = "hello world\n";
});

app.listen(PORT, HOST);
console.log(`server running on http://${HOST}:${PORT}/`);
```
### docker 
**Dockerfile**

```bash
FROM node:10

# 创建 app 运行目录
WORKDIR /usr/src/app

# 拷贝 package.json package-lock.json
COPY package*.json ./

# 依赖安装
RUN npm install
# RUN npm ci --only=production

# 拷贝工程文件
COPY . .

# 暴露 3000 端口, 与工程配置相通
EXPOSE 3000

# 启动工程
CMD [ "node", "server.js" ]
```
**.dockerignore**

```
node_modules
npm-debug.log
```

**build && run container**

```bash
docker build -t wj/node-web-app .

# 指定本机 3001 映射到容器的 3000 端口
docker run --name app -p 3001:3000 -d wj/node-web-app 

# 进入容器
docker exec -it app /bin/bash

# 测试访问
curl -i localhost:3001

# 关闭
docker stop app && docker rm app 
```




















