const Koa = require("koa");
const HOST = "0.0.0.0";
const PORT = 3000;


const app = new Koa();
app.use(async ctx => {
    ctx.body = "hello world\n";
});


app.listen(PORT, HOST);
console.log(`server running on http://${HOST}:${PORT}/`);


