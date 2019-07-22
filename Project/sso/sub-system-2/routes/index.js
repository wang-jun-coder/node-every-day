const router = require('koa-router')();

router.get('/', async (ctx, next) => {

    if (ctx.query.token) {
        return ctx.redirect('/users/checkToken');
    }

    let user = null;
    let subSystemUrl =  `http://localhost:3001/users/checkToken`;

    if (ctx.session.user) {
        user = ctx.session.user;
        subSystemUrl += `?token=${ctx.session.token}`;
    }

    await ctx.render('index', {
        title: 'Hello Koa 2!',
        user: user,
        subSystemUrl
    })
});

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
});

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
});

module.exports = router;
