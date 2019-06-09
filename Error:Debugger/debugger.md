## Debugger

### node inspect script.js

1. 源代码中加入 debugger; 执行时会进入断点
2. 使用命令调试
	* 	cont, c - 继续执行。
	*  next, n - 下一步。
	*  out, o - 步出。
	*  pause - 暂停正在运行的代码（类似开发者工具中的暂停按钮）。
3. 执行过程中动态设置断点
	* 	setBreakpoint(), sb() - 在当前行上设置断点。
	*  setBreakpoint(line), sb(line) - 在特定行上设置断点。
	*  setBreakpoint('fn()'), sb(...) - 在函数体的第一个语句上设置断点。
	*  setBreakpoint('script.js', 1), sb(...) - 在 script.js 的第一行设置断点。
	*  clearBreakpoint('script.js', 1), cb(...) - 清除 script.js 中第一行的断点。

### V8检查器集成
1. node --inspect-brk script.js
2. chrom: chrome://inspect/#devices


### CPU profiling

1. node --prof  script.js（当前目录生成 isolate-0xxxxxxx-v8.log ）
2. node --prof-process isolate-0xxxxxxx-v8.log > log.txt (处理 log 到 > log.txt 文件)

### heapdump

1. require('heapdump'), writeSnapshot
2. kill -USR2 pid, 生成快照
3. chrom: dev-tools -> memory -> load 快照

