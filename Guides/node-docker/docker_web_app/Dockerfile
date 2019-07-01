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

