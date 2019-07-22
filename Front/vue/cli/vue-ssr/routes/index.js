const fs = require('fs');
const path = require('path');
const util = require('util');
const router = require('koa-router')();
const Vue = require('vue');
const { createRenderer, createBundleRenderer } = require('vue-server-renderer');
const appBundle = require('../public/vue-ssr-server-bundle');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
});



router.get('/helloWorld', async ctx => {
  const app = new Vue({
    template: `<div>hello world</div>`
  });
  const renderer = createRenderer();
  const html = await renderer.renderToString(app);
  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
      <head><title>Hello</title></head>
      <body>${html}</body>
    </html>
  `;
});


router.get('/demo1', async ctx => {
  const readFileAsync = util.promisify(fs.readFile);
  const template = await readFileAsync(path.resolve(__dirname, '../views/index.template.html'), 'utf-8');
  const renderer = createRenderer({template});
  const app = new Vue({
    template: `<div>demo1</div>`
  });

  const context = {
      title: 'demo1'
  };
  ctx.body = await renderer.renderToString(app, context);

});

//**************************** ssr 配置 ****************************
// 配置请求代理至 cnodejs
const proxyToCnodejs = async ctx => {
  const url = ctx.request.url;
  const body = ctx.request.body;
  const method = ctx.method;

  console.log(`${CNODE_HOST}${url}`);
  if (method === 'GET') {
    ctx.body = (await superagent.get(`${CNODE_HOST}${url}`).send(body)).body;
  }
  if (method === 'POST') {
    ctx.body = (await superagent.post(`${CNODE_HOST}${url}`).send(body)).body;
  }
  console.log(ctx.body);
};

router.get('/api/v1/*', proxyToCnodejs);
router.post('/api/v1/*', proxyToCnodejs);

const ssr = async ctx => {
  const readFileAsync = util.promisify(fs.readFile);
  const template = await readFileAsync(path.resolve(__dirname, '../views/index.template.html'), 'utf-8');
  const renderer = createBundleRenderer(appBundle, {
    runInNewContext: false, // 推荐
    template, // （可选）页面模板
    // clientManifest // （可选）客户端构建 manifest
  });
  const context = { url: ctx.url, title: 'this is a title' };
  ctx.body = renderer.renderToStream(context);
  ctx.set('Content-Type', 'text/html');
};


const cnodeRoutes = [
  '/getstart',
  '/api',
  '/about',
  '/login',
  '/my/message',
  '/setting'
];
cnodeRoutes.forEach(route => {
  router.get(route, ssr);
});


module.exports = router;
