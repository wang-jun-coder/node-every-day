
const delay = function (duration) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    });
};

const express = require('express');
const expressApp = express();
expressApp.use((req, res, next) => {
    console.log(`expressApp middleware1 begin`);
    next(); //
    console.log(`expressApp middleware1 end`);
});
expressApp.get('/', function (req, res, next) {

    delay(100).then(() => {
        console.log(`expressApp on / router begin`);
        res.end('hello express');
        console.log(`expressApp on / router end`);
    });
});
// http://locahost:3000
expressApp.listen(3000, () => console.log('hello express'));


const Koa = require('koa');
const router = require('koa-router')();
const koaApp = new Koa();
router.get('/', async ctx => {
    await delay(100);
    console.log(`koaApp on / router begin`);
    ctx.body = `hello koa2`;
    console.log(`koaApp on / router end`);
});

// 注入中间件
koaApp.use( async (ctx, next) => {
    console.log(`koaApp middleware1 begin`);
    await next();
    console.log(`koaApp middleware1 end`);
});
koaApp.use(router.routes(), router.allowedMethods());

// http://locahost:3001
koaApp.listen(3001, () => console.log(`hello koa2`));



/**
 * 使用 delay 模拟获取数据
 *
 * express:
 *  expressApp middleware1 begin
 *  expressApp middleware1 end
 *  expressApp on / router begin
 *  expressApp on / router end
 *
 * koa2:
 *  koaApp middleware1 begin
 *  koaApp on / router begin
 *  koaApp on / router end
 *  koaApp middleware1 end
 *
 * */
