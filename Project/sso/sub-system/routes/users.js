const router = require('koa-router')();
const superagent = require('superagent');

router.prefix('/users');

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
});

router.get('/login', function (ctx, next) {
  const ssoUrl = 'http://localhost:3000/users/login';
  const callback = 'http://localhost:3001/users/checkToken';

  ctx.redirect(`${ssoUrl}?redirectUrl=${encodeURIComponent(callback)}`);
});

router.get('/logout', function (ctx, next) {
    ctx.session.user = null;
    let logoutUrl = `http://localhost:3000/users/logout?redirectUrl=${encodeURIComponent('http://localhost:3001/')}&token=${ctx.session.token}`;
    ctx.session.token = null;
    ctx.redirect(logoutUrl);
});

router.get('/checkToken', async ctx => {
  const { token } = ctx.request.query;

  const validatorUrl = 'http://localhost:3000/users/validator';
  const ret = await superagent.post(validatorUrl)
      .send({
        token
      });

  if (ret.body && ret.body.code === 0) {
    ctx.session.user = ret.body.data;
    ctx.session.token = token;
  }
  ctx.redirect('/');
});

module.exports = router;
