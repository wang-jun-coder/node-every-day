// 强行结束进程
// setTimeout(() => process.abort(), 1000);

// 输出允许的 node 环境变量, 对此数组进行操作静默失败
// process.allowedNodeEnvironmentFlags.forEach(env => console.log(`allowedNodeEnvironmentFlags: ${env}`));

// 输出 CPU 架构, x64, arm64, 等
// console.log(`${process.arch}`);


// 输出启动时的命令行参数列表
// process.argv.forEach(el => console.log(el));


// node 路径
// console.log(`${process.argv0}`);


// 获取工作目录, 切换工作目录
// console.log(`${process.cwd()}`);
// process.chdir(`../`);
// console.log(`${process.cwd()}`);


// 编译当前 node 执行程序的配置信息
// console.log(`${JSON.stringify(process.config)}`);
// {"target_defaults":{"cflags":[],"default_configuration":"Release","defines":[],"include_dirs":[],"libraries":[]},"variables":{"asan":0,"build_v8_with_gn":false,"coverage":false,"debug_nghttp2":false,"enable_lto":false,"enable_pgo_generate":false,"enable_pgo_use":false,"force_dynamic_crt":0,"host_arch":"x64","icu_data_in":"../../deps/icu-small/source/data/in/icudt64l.dat","icu_endianness":"l","icu_gyp_path":"tools/icu/icu-generic.gyp","icu_locales":"en,root","icu_path":"deps/icu-small","icu_small":true,"icu_ver_major":"64","llvm_version":"0","node_byteorder":"little","node_debug_lib":false,"node_enable_d8":false,"node_enable_v8_vtunejit":false,"node_install_npm":true,"node_module_version":64,"node_no_browser_globals":false,"node_prefix":"/","node_release_urlbase":"https://nodejs.org/download/release/","node_shared":false,"node_shared_cares":false,"node_shared_http_parser":false,"node_shared_libuv":false,"node_shared_nghttp2":false,"node_shared_openssl":false,"node_shared_zlib":false,"node_tag":"","node_target_type":"executable","node_use_bundled_v8":true,"node_use_dtrace":true,"node_use_etw":false,"node_use_large_pages":false,"node_use_openssl":true,"node_use_pch":false,"node_use_perfctr":false,"node_use_v8_platform":true,"node_with_ltcg":false,"node_without_node_options":false,"openssl_fips":"","openssl_no_asm":0,"shlib_suffix":"64.dylib","target_arch":"x64","v8_enable_gdbjit":0,"v8_enable_i18n_support":1,"v8_enable_inspector":1,"v8_no_strict_aliasing":1,"v8_optimized_debug":0,"v8_promise_internal_field_count":1,"v8_random_seed":0,"v8_trace_maps":0,"v8_typed_array_max_size_in_heap":0,"v8_use_snapshot":true,"want_separate_host_toolset":0,"xcode_version":"7.0"}}


// 获取 cpu 信息, 或差值
// const first = process.cpuUsage();
// console.log(`${JSON.stringify(first)}`);
// const diff = process.cpuUsage(first);
// console.log(`${JSON.stringify(diff)}`);


// nodejs 调试端口
// console.log(`${process.debugPort}`);


// 加载 c++ 插件, 待试用
// process.dlopen(module, filename)


// 用户环境变量, 可在程序内部修改, 但 work 线程是只读的
// console.log(`${JSON.stringify(process.env)}`);
// {"PATH":"/usr/local/opt/apr/bin:/usr/local/opt/apr-util/bin:/usr/local/opt/ruby/bin:/Users/wangjun/.nvm/versions/node/v8.9.1/bin:/Users/wangjun/.cargo/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/X11/bin:/Users/wangjun/Library/Android/sdk/ndk-bundle/:/Users/wangjun/.fzf/bin:/Users/wangjun/Desktop/source/flutter/bin","FORCE_COLOR":"true","ELECTRON_NO_ATTACH_CONSOLE":"true","FLUTTER_ROOT":"/Users/wangjun/Desktop/source/flutter/bin","DEBUG_COLORS":"true","PUB_HOSTED_URL":"https://pub.flutter-io.cn","COMMAND_MODE":"unix2003","npm_config_color":"always","DISPLAY":"/private/tmp/com.apple.launchd.JxTB3JFO6v/org.macosforge.xquartz:0","MOCHA_COLORS":"1","AUTOJUMP_SOURCED":"1","COLORTERM":"true","LOGNAME":"wangjun","XPC_SERVICE_NAME":"com.apple.xpc.launchd.oneshot.0x1000006e.webstorm","PWD":"/Users/wangjun/Desktop/practice/opensource/node-every-day/进程/Process/process","NVM_CD_FLAGS":"-q","NVM_DIR":"/Users/wangjun/.nvm","SHELL":"/bin/zsh","PAGER":"less","LSCOLORS":"Gxfxcxdxbxegedabagacad","ANDROID_NDK_ROOT":"/Users/wangjun/Library/Android/sdk/ndk-bundle","SECURITYSESSIONID":"186a8","OLDPWD":"/Applications/JetBrains/apps/WebStorm/ch-0/191.6707.60/WebStorm.app/Contents/bin","USER":"wangjun","ANDROID_SDK_ROOT":"/Users/wangjun/Library/Android/sdk","ZSH":"/Users/wangjun/.oh-my-zsh","TMPDIR":"/var/folders/87/yfjc65dj7r132llyzkfg733c0000gn/T/","SSH_AUTH_SOCK":"/private/tmp/com.apple.launchd.kr942ZsIZm/Listeners","XPC_FLAGS":"0x0","__CF_USER_TEXT_ENCODING":"0x1F5:0x19:0x34","Apple_PubSub_Socket_Render":"/private/tmp/com.apple.launchd.av8PM1LU8h/Render","LESS":"-R","FLUTTER_STORAGE_BASE_URL":"https://storage.flutter-io.cn","LC_CTYPE":"","NVM_BIN":"/Users/wangjun/.nvm/versions/node/v8.9.1/bin","HOME":"/Users/wangjun","AUTOJUMP_ERROR_PATH":"/Users/wangjun/Library/autojump/errors.log"}



// node --harmony operation.js --version , --harmony
// console.log(`${process.execArgv}`);


// nodejs 执行文件路径, /Users/wangjun/.nvm/versions/node/v10.16.0/bin/node
// console.log(`${process.execPath}`);


// 尽快关闭进程, 部分异步任务可能会提前终止, 但是在 exit 监听器执行完成前, 程序不会退出
// process.on('exit', code => console.log(code));
// process.exit();


// nodejs 正常退出/process.exit() 时, 默认使用此值作为退出码
// console.log(`${process.exitCode}`);



// 返回Node.js进程的有效数字标记的组身份
// console.log(`${process.getegid()}`);


// 返回Node.js进程的有效数字标记的用户身份
// console.log(`${process.geteuid()}`);


// 返回Node.js进程的数字标记的组身份
// console.log(`${process.getgid()}`);



// 返回数组，其中包含了补充的组ID
// console.log(`${JSON.stringify(process.getgroups())}`);



// 返回Node.js进程的数字标记的用户身份
// console.log(`${process.getuid()}`);



// 返回当前时间以[seconds, nanoseconds] tuple Array表示的高精度解析值
// const first = process.hrtime();
// console.log(`${first}`);
// const diff = process.hrtime(first);
// console.log(`${diff}`);



// returning the current high-resolution real time in a bigint
// console.log(`${process.hrtime.bigint()}`);


//
// console.log(`${process.getgroups()}`);
// console.log(`${process.initgroups('wangjun', 1)}`); // 进程需要权限
// console.log(`${process.getgroups()}`);


// 发送信号至指定进程(虽然名字叫 kill)
// process.on('SIGHUP', e => console.log(`${e}`));
// setTimeout(() => {
//     console.log('Exiting.');
//     process.exit(0);
// }, 100);
// process.kill(process.pid, 'SIGHUP');


// 获取主模块
// console.log(`${process.mainModule === require.main}`);



// 内存使用
// heapTotal 和 heapUsed 代表V8的内存使用情况。 external代表V8管理的，绑定到Javascript的C++对象的内存使用情况。
// rss, 驻留集大小, 是给这个进程分配了多少物理内存(占总分配内存的一部分) 这些物理内存中包含堆，栈，和代码段
// 对象，字符串，闭包等存于堆内存。 变量存于栈内存。 实际的JavaScript源代码存于代码段内存
// console.log(`${JSON.stringify(process.memoryUsage())}`);
// {"rss":29868032,"heapTotal":9682944,"heapUsed":4693976,"external":14864}



// 注意 nextTick Queue 优先级, 死循环, 执行于事件循环各阶段切换
// process.nextTick(() => {
//     console.log(`process.nextTick()`);
//     process.nextTick(() => {
//         console.log(`process.nextTick() 2`);
//     });
// });



// console.log(`${process.noDeprecation}`);
// console.log(`${process.pid}`);
// console.log(`${process.platform}`);
// console.log(`${process.ppid}`); // 父进程的进程id



// 返回与当前发布相关的元数据对象，包括源代码和源代码头文件 tarball的URLs。
// console.log(`${JSON.stringify(process.release)}`);
// {"name":"node","lts":"Dubnium","sourceUrl":"https://nodejs.org/download/release/v10.16.0/node-v10.16.0.tar.gz","headersUrl":"https://nodejs.org/download/release/v10.16.0/node-v10.16.0-headers.tar.gz"}




// process.stdin 是一个双工流
// process.stdin.setEncoding('utf8');
// process.stdin.on('readable', () => {
//     const chunk = process.stdin.read();
//     if (chunk !== null) {
//         process.stdout.write(`数据: ${chunk}`);
//     }
// });
//
// process.stdin.on('end', () => {
//     process.stdout.write('结束');
// });



// 将输入 pipe 到 输出
// process.stdin.pipe(process.stdout);


// 判断流是否在终端中
// console.log(`${process.stdin.isTTY}`);


// nodejs 程序创建文件的默认权限值
// const newmask = 0o022;
// const oldmask = process.umask(newmask);
// console.log(`Changed umask from ${oldmask.toString(8)} to ${newmask.toString(8)}`);



// nodejs 程序启动后运行时间
// setTimeout(() => console.log(`${process.uptime()}`, 1000));
// console.log(`${process.uptime()}`);



// 当前 node 版本信息
// console.log(`${process.version}`);


// 列出了Node.js和其依赖的版本信息
// console.log(JSON.stringify(process.versions));
// {"http_parser":"2.8.0","node":"10.16.0","v8":"6.8.275.32-node.52","uv":"1.28.0","zlib":"1.2.11","brotli":"1.0.7","ares":"1.15.0","modules":"64","nghttp2":"1.34.0","napi":"4","openssl":"1.1.1b","icu":"64.2","unicode":"12.1","cldr":"35.1","tz":"2019a"}
