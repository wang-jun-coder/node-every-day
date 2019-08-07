const Koa =require('koa');
const http = require('http');
const app = new Koa();
app.use(async (ctx, next) => {
    console.log(` <- ${ctx.method} ${ctx.originalUrl} `);
    const begin = Date.now();
    await next();
    console.log(` -> ${ctx.method} ${ctx.originalUrl} ${Date.now()-begin} ms`);
});
app.use( async ctx => {
    ctx.body = 'hello koa';
});

const server = http.createServer(app.callback());
server.on('error', err => console.error);
server.on('listening', () => console.log('server listening'));
server.listen(3000);
