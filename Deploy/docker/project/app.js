const Koa = require("koa");
const HOST = "0.0.0.0"; // 注意: 127.0.0.1 和 0.0.0.0 的区别
const PORT = 3000;


const app = new Koa();
app.use(async ctx => {
    ctx.body = "this is response from docker";
});


app.listen(PORT, HOST);
console.log(`server running on http://${HOST}:${PORT}/`);
