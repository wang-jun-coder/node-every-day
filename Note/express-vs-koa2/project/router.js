const express = require('express');

const expressApp = express();
expressApp.get('/', function (req, res, next) {
    res.end('hello express');
});
// http://locahost:3000
// ab -k  -t 3 -c 150  http://localhost:3000/ > ./express.log 2>&1
expressApp.listen(3000, () => console.log('hello express'));


const Koa = require('koa');
const router = require('koa-router')();
const koaApp = new Koa();

router.get('/', async ctx => {
    ctx.body = `hello koa2`;
});
// koaApp.use( ctx => ctx.body = `hello koa`);
koaApp.use(router.routes(), router.allowedMethods());

// http://locahost:3001
// ab -k  -t 3 -c 150  http://localhost:3001/ > ./koa.log 2>&1
koaApp.listen(3001, () => console.log(`hello koa2`));

// 压测时,
// express 基本稳定在 4700 Requests per second
// koa 在不使用 koa-router 的情况下, 约 5000 Requests per second, 使用 koa-router, 与 express 几乎无差别



