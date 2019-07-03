const request = require('request');

request({
  url: 'http://127.0.0.1:3000',
  headers: {
    'service': 'demo'
  }
}, (error, res, body) => {
  console.log(error);
  console.log(res);
  console.log(body)
});
