#!/usr/bin/env bash

# 加入探测器并启动服务
NODE_ENV=production node --prof bin/www

# 注册一个用户
curl -X GET http://localhost:3000/users/newUser?username=abcd&password=abcdefghijklmn

# ab 压测, 输出 log 到 ./ab.log
ab -k -c 20 -n 250 http://localhost:3000/users/auth?username=abcd&password=abcdefghijklmn > ./ab.log 2>&1;

# 日志处理
node --prof-process isolate-0x102802e00-v8.log > process.log
