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

