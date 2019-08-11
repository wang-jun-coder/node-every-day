const http = require('http');

const express = require('express');
const app = new express();

// app 实例级配置, 最终设置到 app._router 中去
app.use(function (req, res, next) {
    console.log(`app set middleware`);
    next()
});
app.get('/', function (req, res, next) {
    res.end(`hello express`);
});
app.post('/', function (req, res, next) {
    res.json({
        path: '/',
        method: 'post'
    });
});

// 单个 router 设置
const routerA = express.Router();
routerA.param('id', function (req, res, next, id) {
    console.log(`app.param id: ${id}`);
    next();
});
routerA.get('/user/:id', function (req, res, next) {
    res.end(`id is ${req.params.id}`);
});
app.use('/a', routerA);


// 单个 router 设置
const routerB = express.Router();
routerB.get('/', function (req, res, next) {
    res.end(`this is router B root path`);
});
app.use('/b', routerB);


// 全局异常处理
app.use(function (err, req, res, next) {
    console.log(`${err}`);
    res.statusCode = 500;
    res.end();
});

const server = http.createServer(app);
server.listen(3000, () => console.log(`express has listen`));
