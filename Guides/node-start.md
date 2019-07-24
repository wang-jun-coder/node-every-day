## Node.js 是如何执行的

### 下载源码并编译

```bash
# 从官网下载 node 源码
wget https://nodejs.org/dist/v10.16.0/node-v10.16.0.tar.gz
# 解压
tar -xzvf node-v10.16.0.tar.gz
# 进入目录，配置并编译
cd node-v10.16.0
./configure --debug 
make -j 4 

# 新建测试 js 文件
# clion 导入目录， 修改配置， 使用 debug 下的 node执行测试 js 文件
# 移除 before launch 中的 build task
```

### 启动执行路径

* node_main.cc 定义 main 函数，程序执行由此开始
* main 转调 node::Start(argc, argv)， 此函数定义于 node.cc 文件
* Start 函数，有以下几个重要步骤
	* `PlatformInit();` 
	* `uv_setup_args(argc, argv);`
	* `Init(&args, &exec_args);`
	* `V8::Initialize();`
	* `Start(uv_default_loop(), args, exec_args);`

#### `PlatformInit();` 
* 确保文件描述符是有效的
* 注册信号处理函数
	* `RegisterSignalHandler(SIGINT, SignalExit, true);`
	* `RegisterSignalHandler(SIGTERM, SignalExit, true);`  
	
#### `uv_setup_args(argc, argv)`
定义于 uv.h 中，用于对 process.title 的设置和读取

#### `Init(&args, &exec_args)`
* 初始化 uptime 值（`prog_start_time = static_cast<double>(uv_now(uv_default_loop()));`）
* 配置 V8 环境变量
* 标记 `node_is_initialized` 为 true

#### `V8::Initialize()`
* 初始化 v8 引擎

#### `Start(uv_default_loop(), args, exec_args)`
* 准备工作新建实例等等
* 加载环境变量 `Start(isolate, isolate_data.get(), args, exec_args);` -> `LoadEnvironment(&env)`
* 开启事件循环 `Start(isolate, isolate_data.get(), args, exec_args);` -> `uv_run(env.event_loop(), UV_RUN_DEFAULT);`
* 收尾，内存回收

	
### 事件循环
```c++
int uv_run(uv_loop_t* loop, uv_run_mode mode) {
  int timeout;
  int r;
  int ran_pending;

  r = uv__loop_alive(loop);
  if (!r)
    uv__update_time(loop);

  while (r != 0 && loop->stop_flag == 0) {
    uv__update_time(loop);
    uv__run_timers(loop);
    ran_pending = uv__run_pending(loop);
    uv__run_idle(loop);
    uv__run_prepare(loop);

    timeout = 0;
    if ((mode == UV_RUN_ONCE && !ran_pending) || mode == UV_RUN_DEFAULT)
      timeout = uv_backend_timeout(loop);

    uv__io_poll(loop, timeout);
    uv__run_check(loop);
    uv__run_closing_handles(loop);

    if (mode == UV_RUN_ONCE) {
      /* UV_RUN_ONCE implies forward progress: at least one callback must have
       * been invoked when it returns. uv__io_poll() can return without doing
       * I/O (meaning: no callbacks) when its timeout expires - which means we
       * have pending timers that satisfy the forward progress constraint.
       *
       * UV_RUN_NOWAIT makes no guarantees about progress so it's omitted from
       * the check.
       */
      uv__update_time(loop);
      uv__run_timers(loop);
    }

    r = uv__loop_alive(loop);
    if (mode == UV_RUN_ONCE || mode == UV_RUN_NOWAIT)
      break;
  }

  /* The if statement lets gcc compile it to a conditional store. Avoids
   * dirtying a cache line.
   */
  if (loop->stop_flag != 0)
    loop->stop_flag = 0;

  return r;
}
```
	
 
