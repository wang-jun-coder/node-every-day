const router = require('koa-router')();
const crypto = require('crypto');
const util = require("util");

router.prefix('/users');

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
});

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
});




const Users = {};


router.get('/newUser', async ctx => {
  let username = ctx.request.query.username || '';
  const password = ctx.request.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, '');

  if (!username || !password || Users[username]) {
    ctx.statusCode = 400;
    ctx.body = {
      errorCode: 1,
      errorMsg: "参数错误或用户已存在"
    };
    return ;
  }

  let salt = crypto.randomBytes(128).toString("base64");
  // let hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');
  let hash = await util.promisify(crypto.pbkdf2)(password, salt, 10000, 512, "sha512");
  Users[username] = {salt, hash};

  ctx.body = {
    errorCode: 0,
    errorMsg: "ok",
    body: {
      username
    }
  }
});


router.get("/auth", async ctx => {
  let username = ctx.request.query.username || '';
  const password = ctx.request.query.password || '';
  username = username.replace(/[!@#$%^&*]/g, '');
  if (!username || !password || !Users[username]) {
    ctx.statusCode = 400;
    ctx.body = {
      errorCode: 1,
      errorMsg: "参数错误或用户不存在"
    };
    return ;
  }

  const { salt, hash } = Users[username];

  // const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');
  const encryptHash = await util.promisify(crypto.pbkdf2)(password, salt, 10000, 512, "sha512");
  if (crypto.timingSafeEqual(encryptHash, hash)) {
    ctx.body = {
      errorCode: 0,
      errorMsg: "ok",
      data: {
        username
      }
    }
  } else {
    ctx.statusCode = 400;
    ctx.body = {
      errorCode: 1,
      errorMsg: "密码错误",
    }
  }

});




















module.exports = router;
