const http = require('http');

// console.log(`${http.METHODS}`);
// console.log(`${JSON.stringify(http.STATUS_CODES)}`);
// console.log(http.globalAgent);


// http.get({
//     host: '127.0.0.1',
//     port: '3000',
//     path: '/a/b/c',
//     method: 'GET',
//     agent: new http.Agent({
//         keepAlive: true
//     })
// }, res => {
//     res.on("data", chunk => {
//         console.log(chunk.toString());
//     });
// }).on("socket", socket => {
//     socket.emit('agentRemove');
//     socket.on('data', chunk => {
//         console.log(chunk.toString());
//     })
// });


const req = http.request({
    host: '127.0.0.1',
    port: 3000,
    path: '/a/b/c',
    method: 'POST'
}, res => {

    res.on('data', chunk => {
        console.log(`${chunk}`);
    });
    res.on("end", () => {
        console.log(`响应数据传输完毕`);
    });
});
req.end();




