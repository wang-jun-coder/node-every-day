## 操作系统相关

### os 模块

#### 常用 api

```js
const os = require('os');
// 本机 mac 环境

// 不同系统的行末尾标志
console.log(`${JSON.stringify(os.EOL)}`); // "\n", windows 下 "\r\n"

// 操作系统 cpu 架构, 现在可能的值有: 'arm', 'arm64', 'ia32', 'mips', 'mipsel', 'ppc', 'ppc64', 's390', 's390x', 'x32', 'x64'。
console.log(`${os.arch()} ${process.arch}`);    // x64 x64,

// 常见的错误码定义
// console.log(JSON.stringify(os.constants));
// {"UV_UDP_REUSEADDR":4,"errno":{"E2BIG":7,"EACCES":13,"EADDRINUSE":48,"EADDRNOTAVAIL":49,"EAFNOSUPPORT":47,"EAGAIN":35,"EALREADY":37,"EBADF":9,"EBADMSG":94,"EBUSY":16,"ECANCELED":89,"ECHILD":10,"ECONNABORTED":53,"ECONNREFUSED":61,"ECONNRESET":54,"EDEADLK":11,"EDESTADDRREQ":39,"EDOM":33,"EDQUOT":69,"EEXIST":17,"EFAULT":14,"EFBIG":27,"EHOSTUNREACH":65,"EIDRM":90,"EILSEQ":92,"EINPROGRESS":36,"EINTR":4,"EINVAL":22,"EIO":5,"EISCONN":56,"EISDIR":21,"ELOOP":62,"EMFILE":24,"EMLINK":31,"EMSGSIZE":40,"EMULTIHOP":95,"ENAMETOOLONG":63,"ENETDOWN":50,"ENETRESET":52,"ENETUNREACH":51,"ENFILE":23,"ENOBUFS":55,"ENODATA":96,"ENODEV":19,"ENOENT":2,"ENOEXEC":8,"ENOLCK":77,"ENOLINK":97,"ENOMEM":12,"ENOMSG":91,"ENOPROTOOPT":42,"ENOSPC":28,"ENOSR":98,"ENOSTR":99,"ENOSYS":78,"ENOTCONN":57,"ENOTDIR":20,"ENOTEMPTY":66,"ENOTSOCK":38,"ENOTSUP":45,"ENOTTY":25,"ENXIO":6,"EOPNOTSUPP":102,"EOVERFLOW":84,"EPERM":1,"EPIPE":32,"EPROTO":100,"EPROTONOSUPPORT":43,"EPROTOTYPE":41,"ERANGE":34,"EROFS":30,"ESPIPE":29,"ESRCH":3,"ESTALE":70,"ETIME":101,"ETIMEDOUT":60,"ETXTBSY":26,"EWOULDBLOCK":35,"EXDEV":18},"signals":{"SIGHUP":1,"SIGINT":2,"SIGQUIT":3,"SIGILL":4,"SIGTRAP":5,"SIGABRT":6,"SIGIOT":6,"SIGBUS":10,"SIGFPE":8,"SIGKILL":9,"SIGUSR1":30,"SIGSEGV":11,"SIGUSR2":31,"SIGPIPE":13,"SIGALRM":14,"SIGTERM":15,"SIGCHLD":20,"SIGCONT":19,"SIGSTOP":17,"SIGTSTP":18,"SIGTTIN":21,"SIGTTOU":22,"SIGURG":16,"SIGXCPU":24,"SIGXFSZ":25,"SIGVTALRM":26,"SIGPROF":27,"SIGWINCH":28,"SIGIO":23,"SIGINFO":29,"SIGSYS":12}}

// cpu 相关信息
// console.log(os.cpus());
// [{ model: 'Intel(R) Core(TM) i7-8850H CPU @ 2.60GHz',        // cpu 型号
//     speed: 2600,                                             // cpu 频率, 单位: 兆赫兹
//     times: {
//       user: 8320780,                                         // CPU花费在用户模式下的毫秒时间数.
//       nice: 0,                                               // CPU花费在良好模式下的毫秒时间数.
//       sys: 9282500,                                          // CPU花费在系统模式下的毫秒时间数.
//       idle: 73312630,                                        // CPU花费在空闲模式下的毫秒时间数.
//       irq: 0                                                 // CPU花费在中断请求模式下的毫秒时间数.
//     }
// }]

// nodejs 二进制编译环境的字节顺序.
console.log(os.endianness());   // LE, BE 大端模式, LE 小端模式

// 空闲内存
console.log(os.freemem());      // 1657503744, 单位: 字节

// 获取指定进程的优先级
console.log(os.getPriority(process.pid)); // 0

// 获取当前用户的 home 目录
console.log(os.homedir());  // /Users/wangjun

// 作系统的主机名.
console.log(os.hostname()); // wangjundeMacBook-Pro.local

// 系统平均负载, 包含1, 5, 15分钟平均负载, window 无效
console.log(os.loadavg());      // [ 2.1630859375, 2.458984375, 2.8115234375 ]

// 获取系统网络相关信息
// console.log(os.networkInterfaces());
// { lo0:
//    [ { address: '127.0.0.1',             // ipv4/ipv6 地址
//        netmask: '255.0.0.0',             // 子网掩码
//        family: 'IPv4',                   // ipv4/ipv6
//        mac: '00:00:00:00:00:00',         // mac 地址
//        internal: true,                   // 是否为内部接口
//        cidr: '127.0.0.1/8' },            // 带路由前缀的 ipv4/ipv6 地址
//      { address: '::1',
//        netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
//        family: 'IPv6',
//        mac: '00:00:00:00:00:00',
//        scopeid: 0,
//        internal: true,
//        cidr: '::1/128' },
//      { address: 'fe80::1',
//        netmask: 'ffff:ffff:ffff:ffff::',
//        family: 'IPv6',
//        mac: '00:00:00:00:00:00',
//        scopeid: 1,                       // IPv6 数字领域识别码 (只有当 family 是IPv6时可用)
//        internal: true,
//        cidr: 'fe80::1/64' },
//      { address: '127.94.0.1',
//        netmask: '255.0.0.0',
//        family: 'IPv4',
//        mac: '00:00:00:00:00:00',
//        internal: true,
//        cidr: '127.94.0.1/8' } ],
//   en0:
//    [ { address: 'fe80::ce:5077:9570:3dc5',
//        netmask: 'ffff:ffff:ffff:ffff::',
//        family: 'IPv6',
//        mac: 'f0:18:98:13:0e:1b',
//        scopeid: 10,
//        internal: false,
//        cidr: 'fe80::ce:5077:9570:3dc5/64' },
//      { address: '192.168.31.52',
//        netmask: '255.255.255.0',
//        family: 'IPv4',
//        mac: 'f0:18:98:13:0e:1b',
//        internal: false,
//        cidr: '192.168.31.52/24' } ] }

// Node.js编译时的操作系统平台
console.log(`${os.platform()} ${process.platform}`);     // darwin, 可能值有: aix, darwin, freebsd, linux, openbsd, sunos, win32

// 获取 操作系统的发行版.
console.log(os.release());  // 18.6.0

// 设置某进程优先级, -20(高) - 19(低)
// os.setPriority(process.pid, -1);    // 若运行权限不够会报错, SystemError [ERR_SYSTEM_ERROR]: A system error occurred: uv_os_setpriority returned EACCES (permission denied)
// console.log(os.getPriority(process.pid));

// 临时目录
console.log(os.tmpdir());   // /var/folders/87/yfjc65dj7r132llyzkfg733c0000gn/T

// 总内存
console.log(os.totalmem()); // 17179869184

// 操作系统类型
console.log(os.type()); // Darwin, 可能值有, Linux, Darwin, Windows_NT

// 获取用户信息
const userInfo = os.userInfo({
    encoding: "utf8"
});
console.log(userInfo);
// { uid: 501,
//   gid: 20,
//   username: 'wangjun',
//   homedir: '/Users/wangjun',
//   shell: '/bin/zsh' }
```
<!--
#### os 常量

**信号常量**

| 常量  |描述 |
|:------------- | :-------------|
| SIGHUP | 发送来表明当一个控制终端关闭或者是父进程退出.|
| SIGINT | 发送来表明当一个用户期望中断一个进程时. (`(Ctrl+C)`).|
| SIGQUIT | 发送来表明当一个用户希望终止一个进程并且执行核心转储. |
SIGILL	|发送给一个进程来通知它已经试图执行一个非法的,畸形的,未知的或特权的指令.
SIGTRAP|	发送给一个进程当异常已经发生了.
SIGABRT|	发送给一个进程来请求终止
SIGIOT	|SIGABRT的同义词
SIGBUS|	发送给一个进程来通知它已经造成了总线错误.
SIGFPE	|发送给一个进程来通知它已经执行了一个非法的算术操作.
SIGKILL|	发送给一个进程来立即终止它.
SIGUSR1| SIGUSR2	发送给一个进程来确定它的用户定义情况.
SIGSEGV|	发送给一个进程来通知段错误.
SIGPIPE|	发送给一个进程当它试图写入一个非连接的管道时.
SIGALRM|	发送给一个进程当系统时钟消逝时.
SIGTERM|	发送给一个进程来请求终止.
SIGCHLD|	发送给一个进程当一个子进程终止时.
SIGSTKFLT|	发送给一个进程来表明一个协处理器的栈错误.
SIGCONT|	发送来通知操作系统继续一个暂停的进程.
SIGSTOP|	发送来通知操作系统暂停一个进程.
SIGTSTP|	发送给一个进程来请求它停止.
SIGBREAK|	发送来表明当一个用户希望终止一个进程.
SIGTTIN|	发送给一个进程当它在后台读取TTY时.
SIGTTOU|	发送给一个进程当它在后台写入TTY时.
SIGURG	|发送给一个进程当socket由紧急的数据需要读取时.
SIGXCPU|	发送给一个进程当它超过他在CPU使用上的限制时.
SIGXFSZ|	发送给一个进程当它文件成长的比最大允许的值还大时.
SIGVTALRM|	发送给一个进程当一个虚拟时钟消逝时.
SIGPROF|	发送给一个进程当一个系统时钟消逝时.
SIGWINCH|	发送给一个进程当控制终端改变它的大小.
SIGIO|	发送给一个进程当I/O可用时.
SIGPOLL|	SIGIO同义词
SIGLOST|	发送给一个进程当文件锁丢失时.
SIGPWR	|发送给一个进程来通知功率错误.
SIGINFO|	SIGPWR同义词
SIGSYS	|发送给一个进程来通知有错误的参数.
SIGUNUSED|	SIGSYS的同义词
-->


### path 模块
#### path 常用 api

```js
const path = require('path');

// path.basename() 返回 path 的最后一部分
console.log(path.basename(`C:\\temp\\file.html`));          // C:\temp\file.html
console.log(path.win32.basename(`C:\\temp\\file.html`));    // file.html
console.log(path.basename(`/Users/wangjun/Desktop/file.html`));         // file.html
console.log(path.posix.basename(`/Users/wangjun/Desktop/file.html`));   // file.html
console.log(path.basename(`/Users/wangjun/Desktop/file.html`, '.html')); // file
console.log(path.basename(`/Users/wangjun/Desktop/file.html`, '.png')); // file.html

// 路径定界符, : ;
console.log(path.delimiter);    // :
console.log(process.env.PATH);  // /usr/local/opt/apr/bin:/usr/local/opt/apr-util/bin:/usr/local/opt/ruby/bin:/Users/wangjun/.nvm/versions/node/v8.9.1/bin:/Users/wangjun/.cargo/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/X11/bin:/Users/wangjun/Library/Android/sdk/ndk-bundle/:/Users/wangjun/.fzf/bin:/Users/wangjun/Desktop/source/flutter/bin
console.log(process.env.PATH.split(path.delimiter));    // ["/usr/local/opt/apr/bin","/usr/local/opt/apr-util/bin","/usr/local/opt/ruby/bin","/Users/wangjun/.nvm/versions/node/v8.9.1/bin","/Users/wangjun/.cargo/bin","/usr/local/bin","/usr/bin","/bin","/usr/sbin","/sbin","/opt/X11/bin","/Users/wangjun/Library/Android/sdk/ndk-bundle/","/Users/wangjun/.fzf/bin","/Users/wangjun/Desktop/source/flutter/bin"]

// 返回路径的目录
console.log(path.dirname('/Users/wangjun/Desktop/file.html'));  // /Users/wangjun/Desktop

// 返回路径扩展名
console.log(path.extname('file.html'));     // .html
console.log(path.extname('file.html.gz'));  // .gz
console.log(path.extname('file.'));         // .
console.log(path.extname('file'));          // 空字符串
console.log(path.extname('.file'));         // 空字符串

// 格式化一个路径, 注意: 如果提供了 pathObject.dir，则忽略 pathObject.root。如果 pathObject.base 存在，则忽略 pathObject.ext 和 pathObject.name。
console.log(path.format({
    // root: '/',
    dir: '/Users/wangjun',
    base: 'file.html',
    // name: 'file',
    // ext: '.html'
}));    // /Users/wangjun/file.html

// 判断是否为绝对路径
console.log(path.isAbsolute(`/Users/wangjun/Desktop/file.html`));   // true
console.log(path.isAbsolute(`os/path.js`)); // false
console.log(path.isAbsolute(`.`));          // false
console.log(path.isAbsolute(`..`));         // false

// 拼接路径
console.log(path.join('/Users', '.', 'wangjun', '..', 'wangjun', 'Desktop', 'file.html')); // /Users/wangjun/Desktop/file.html

// 规范化路径(解析..和.)
console.log(path.normalize('/Users/./wangjun/../wangjun/Desktop/file.html')); // /Users/wangjun/Desktop/file.html

// 解析路径
console.log(path.parse(`/Users/wangjun/Desktop/file.html`));
// { root: '/',
//   dir: '/Users/wangjun/Desktop',
//   base: 'file.html',
//   ext: '.html',
//   name: 'file' }

// 子对象
console.log(path.posix); // posix 上 path 的相关实现
console.log(path.win32); // win32 上 path 的相关实现

// 计算相对路径
console.log(path.relative('/Users/xx', '/Users/wangjun/Desktop/file.html')); // ../wangjun/Desktop/file.html

// 合并绝对路径
console.log(path.resolve('/Users/xx', '../wangjun/Desktop/file.html')); // /Users/wangjun/Desktop/file.html

// 路径分割符, windows: \  linux/mac: /
console.log(path.sep); // /
```


























