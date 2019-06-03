// IPC 通道关闭时将触发 'disconnect' 事件, 待验证
process.on('disconnect', function (e) {
    console.log(`disconnect: ${e}`);
});


// 则只要子进程收到父进程使用 childprocess.send() 发送的消息，就会触发 'message' 事件
process.on('message', (message, send) => {
    console.log(`message: content: ${message} send: ${send}`);
});



// 当前频道
console.log(`${process.channel}`);

// 当前是否链接, 若链接则输出 true , 可通过 send 发送信息
console.log(`${process.connected}`);


// 手动断开链接
// process.disconnect()


// 子进程向父进程发送消息
// process.send(message[, sendHandle[, options]][, callback])
