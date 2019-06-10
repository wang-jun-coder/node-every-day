## 测试

### 测试分类
* 黑盒测试
	* 不了解具体代码，仅控制输入判断输出是否符合预期
	* 集成测试，系统测试
* 白盒测试
	* 了解具体代码，以编程语言的角度设计测试案例
	* 单元测试，集成测试，等

### 覆盖率
* 行覆盖率
* 函数覆盖率
* 分支覆盖率
* 语句覆盖率

常用覆盖率测试工具 [nyc](https://www.npmjs.com/package/nyc)

### mock && stub
<!-- * mock 用于数据模拟，stub 用于替换部分操作(如：连接数据库) -->


### 常用测试库
* [mocha](https://www.npmjs.com/package/mocha)
* [ava](https://www.npmjs.com/package/ava)
* [jest](https://www.npmjs.com/package/jest)



### 集成测试
集成测试可以是黑盒也可以是白盒，测试对象主要是单元测试过的的模块，主要检查软件模块之间的接口是否正确

### 基准测试
将同一个功能以不同的方式实现，通过基准测试选择最优的方案
常用工具： 

* 白盒基准测试：[benchmark](https://www.npmjs.com/package/benchmark)
* 黑盒基准测试：[AB](https://httpd.apache.org/docs/2.4/programs/ab.html)，[wrk](https://github.com/wg/wrk), [autocannon(基于nodejs)](https://www.npmjs.com/package/autocannon)

### 压力测试
测试系统稳定性
压测工具： [JMeter](http://jmeter.apache.org/)


### 断言
快速判断，并对不符合预期情况进行报错

nodejs 自带 assert 模块，但并非通用断言库，而是满足编写代码的基本断言需求

常用通用断言库： [chai](https://www.npmjs.com/package/chai)，[should.js](https://www.npmjs.com/package/should)


### demo

#### nyc + mocha + chai/expect  
`nyc mocha script.test.js -r chai/register-expect`

```js
const { expect } = require('chai');

expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.lengthOf(3);
expect(tea).to.have.property('flavors')
  .with.lengthOf(3);
                
```
nyc 可输出代码覆盖率，（步骤，分支，函数，行数，以及未覆盖行号）；  
mocha 则可输出单元测试情况，成功个数，失败个数  
chai/expect 方便检查预期结果  

#### ab test

简单使用

```bash
# -k 标记 keep-alive，
# -c 并发数量
# -n 请求数量
# 最后跟地址
# 更多参数可 man ab
ab -k -c 20 -n 250 "http://127.0.0.1:3000/readFileAsync?fileName=data.txt"
```

输出结果

```
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Completed 100 requests
Completed 200 requests
Finished 250 requests


Server Software:        
Server Hostname:        127.0.0.1
Server Port:            3000

Document Path:          /readFileAsync?fileName=data.txt
Document Length:        22890 bytes

Concurrency Level:      20
Time taken for tests:   0.053 seconds
Complete requests:      250
Failed requests:        0
Keep-Alive requests:    0
Total transferred:      5751500 bytes
HTML transferred:       5722500 bytes
Requests per second:    4749.33 [#/sec] (mean)
Time per request:       4.211 [ms] (mean)
Time per request:       0.211 [ms] (mean, across all concurrent requests)
Transfer rate:          106702.24 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       0
Processing:     1    4   0.7      4       6
Waiting:        1    4   0.7      4       6
Total:          1    4   0.7      4       6

Percentage of the requests served within a certain time (ms)
  50%      4
  66%      4
  75%      4
  80%      4
  90%      5
  95%      5
  98%      6
  99%      6
 100%      6 (longest request)
```

#### autocannon
简单使用

```bash
# -c 并发连接数，默认 10
# -d 运行 autocannnon 的时长，默认 10s
# -p 每个链接的请求数量，默认 1
# 更多参数 查看 https://www.npmjs.com/package/autocannon
autocannon -c 100 -d 5 -p 1 "http://127.0.0.1:3000/readFileAsync?fileName=data.txt"
```

输出结果

```
Running 5s test @ http://127.0.0.1:3000/readFileAsync?fileName=data.txt
100 connections

┌─────────┬──────┬──────┬───────┬──────┬─────────┬────────┬──────────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev  │ Max      │
├─────────┼──────┼──────┼───────┼──────┼─────────┼────────┼──────────┤
│ Latency │ 4 ms │ 5 ms │ 7 ms  │ 8 ms │ 5.27 ms │ 0.9 ms │ 23.47 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴────────┴──────────┘
┌───────────┬────────┬────────┬────────┬────────┬─────────┬─────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%  │ Avg     │ Stdev   │ Min    │
├───────────┼────────┼────────┼────────┼────────┼─────────┼─────────┼────────┤
│ Req/Sec   │ 16055  │ 16055  │ 17807  │ 17935  │ 17472.8 │ 716.32  │ 16054  │
├───────────┼────────┼────────┼────────┼────────┼─────────┼─────────┼────────┤
│ Bytes/Sec │ 370 MB │ 370 MB │ 410 MB │ 413 MB │ 402 MB  │ 16.4 MB │ 370 MB │
└───────────┴────────┴────────┴────────┴────────┴─────────┴─────────┴────────┘

Req/Bytes counts sampled once per second.

87k requests in 5.04s, 2.01 GB read
```



















