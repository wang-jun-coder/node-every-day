const http = require('http');
const app = require('../app');


// 做一个极为简单的路由分发
const server = http.createServer(app);
server.on("error", err => {
    console.log(`server on error: ${err}`);
});
// NODE_ENV=production node app.js
server.listen(3000);

