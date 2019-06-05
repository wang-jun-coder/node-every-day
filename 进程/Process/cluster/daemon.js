const {spawn}= require('child_process');

const sub = spawn(process.argv0, ['worker.js'], {
    detached: true,
    stdio: "ignore"
});
sub.unref();

console.log(`${process.pid} has create ${sub.pid}`);
process.exit();

// 可通过  ps -ef | grep node 查看当前 node 相关的进程, 使用 kill 命令关闭这个进程
