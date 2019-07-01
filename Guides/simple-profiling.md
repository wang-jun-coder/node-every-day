##  [易于分析的 Node.js 应用程序](https://nodejs.org/zh-cn/docs/guides/simple-profiling/)

### 初始项目

```js
// 使用同步方法， 阻塞事件循环导致性能底下
let hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');
```

### 初步测试
```bash
# 加入探测器并启动服务,
NODE_ENV=production node --prof bin/www

# 注册一个用户
curl -X GET http://localhost:3000/users/newUser?username=abcd&password=abcdefghijklmn

# ab 压测, 输出 log 到 ./ab.log
ab -k -c 20 -n 200 http://localhost:3000/users/auth?username=abcd&password=abcdefghijklmn > ./ab.log 2>&1;

```
### 测试结果
本机环境 macbookpro 2018 15寸，标配，可以看到并发 20情况下 qps 只有 13.55，且大部分请求时间需要 1.5s 左右

```
Concurrency Level:      20
Time taken for tests:   18.449 seconds
Complete requests:      250
Failed requests:        0
Keep-Alive requests:    250
Total transferred:      56750 bytes
HTML transferred:       20000 bytes
Requests per second:    13.55 [#/sec] (mean)
Time per request:       1475.915 [ms] (mean)
Time per request:       73.796 [ms] (mean, across all concurrent requests)
Transfer rate:          3.00 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       1
Processing:    75 1414 277.7   1473    2744
Waiting:       75 1413 277.7   1473    2744
Total:         75 1414 277.6   1473    2744

Percentage of the requests served within a certain time (ms)
  50%   1473
  66%   1476
  75%   1477
  80%   1478
  90%   1481
  95%   1483
  98%   1486
  99%   2595
 100%   2744 (longest request)
```

### 解析日志文件
```bash
node --prof-process isolate-0x102802e00-v8.log > process.log
```
```
......

 [Summary]:
   ticks  total  nonlib   name
    120    0.4%    0.4%  JavaScript
  26022   96.8%   96.8%  C++
     31    0.1%    0.1%  GC
     11    0.0%          Shared libraries
    741    2.8%          Unaccounted
    
 [Bottom up (heavy) profile]:
  Note: percentage shows a share of a particular caller in the total
  amount of its parent calls.
  Callers occupying less than 1.0% are not shown.

......

   ticks parent  name
  25791   95.9%  T node::crypto::PBKDF2(v8::FunctionCallbackInfo<v8::Value> const&)
  25791  100.0%    T v8::internal::Builtin_HandleApiCall(int, v8::internal::Object**, v8::internal::Isolate*)
  25791  100.0%      Function: ~pbkdf2 crypto.js:633:16
  25791  100.0%        Function: ~exports.pbkdf2Sync crypto.js:628:30
  25726   99.7%          Function: ~router.get /Users/wangjun/Desktop/practice/opensource/node-every-day/Guides/simple-profiling/routes/users.js:49:21
  25726  100.0%            Function: ~dispatch /Users/wangjun/Desktop/practice/opensource/node-every-day/Guides/simple-profiling/node_modules/_koa-compose@3.2.1@koa-compose/index.js:37:23

    741    2.8%  UNKNOWN    
```

### 异步方法
得益于 async/await 的支持，使得异步写法与同步写法相差不大  
此时再次进行压测，在并发 300 的情况下，qps 约3858   
请求响应时间也从约 1.5 秒降低到了 150毫秒 左右 


```js
let hash = await util.promisify(crypto.pbkdf2)(password, salt, 10000, 512, "sha512");
```
```
Concurrency Level:      300
Time taken for tests:   0.518 seconds
Complete requests:      2000
Failed requests:        0
Keep-Alive requests:    2000
Total transferred:      430000 bytes
HTML transferred:       136000 bytes
Requests per second:    3858.04 [#/sec] (mean)
Time per request:       77.760 [ms] (mean)
Time per request:       0.259 [ms] (mean, across all concurrent requests)
Transfer rate:          810.04 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   2.2      0       9
Processing:     5   71  20.5     72     143
Waiting:        1   71  20.5     72     143
Total:          5   72  20.3     72     145

Percentage of the requests served within a certain time (ms)
  50%     72
  66%     76
  75%     78
  80%     79
  90%     81
  95%    123
  98%    137
  99%    141
 100%    145 (longest request)
```


