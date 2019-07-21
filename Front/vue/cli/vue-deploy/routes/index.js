const router = require('koa-router')();
const superagent = require('superagent');
const fs = require('fs');
const path = require('path');
const { CNODE_HOST } = require('../config');


router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
});

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


// 配置前端路由返回 index.html(配合 history url)
const cnodeHtml = async ctx => {
  const htmlPath = path.resolve(__dirname, '../public/index.html');
  ctx.body = fs.createReadStream(htmlPath);
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
  router.get(route, cnodeHtml);
});



module.exports = router;
