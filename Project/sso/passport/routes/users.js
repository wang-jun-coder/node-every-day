const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const JWTSecret = 'jwt-secret';

// 模拟redis, 存储对应的 token
const TOKEN_POOL = {

};

router.prefix('/users');

router.get('/login', async ctx => {
  await ctx.render('login', {
    title: '登录',
    redirectUrl: ctx.request.query.redirectUrl,
  });
});

router.post('/login', async ctx => {
    const { username, password, redirectUrl } = ctx.request.body;

    // todo 查询数据库, 校验登录
    if (username !== password) {
        ctx.body = {
            code: 1,
            msg: '账户密码不匹配'
        };
        return ;
    }
    const token = jwt.sign({
        username: username,
    },  JWTSecret);
    TOKEN_POOL[`${username}:${token}`] = {};
    ctx.body = {
        code: 0,
        msg: 'ok',
        data: {
            token
        }
    };
    ctx.redirect(`${redirectUrl}?token=${token}`);
});

router.get('/logout', async ctx => {
    const { token, redirectUrl } = ctx.request.query;
    if (!token) {
        return ctx.body = {
            code: 2,
            msg: 'token 无效'
        };
    }
    const { username } = jwt.decode(token, JWTSecret);
    if (username && !TOKEN_POOL[`${username}:${token}`]) {
        delete TOKEN_POOL[`${username}:${token}`];
    }
    return  ctx.redirect(redirectUrl);
});


router.post('/validator', async ctx => {
   const { token } = ctx.request.body;
   if (!token) {
       return ctx.body = {
           code: 2,
           msg: 'token 无效'
       };
   }

   // 应从数据库中获取
   const { username } = jwt.decode(token, JWTSecret);
   if (!username || !TOKEN_POOL[`${username}:${token}`]) {
       return ctx.body = {
           code: 2,
           msg: 'token 无效'
       };
   }

    return ctx.body = {
        code: 0,
        msg: 'ok',
        data: {
            username
        }
    };
});




module.exports = router;
