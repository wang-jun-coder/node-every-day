const http = require('http');
const FileUtil = require('./utils/FileUtil');
const fileUtil = new FileUtil(__dirname + '/assets');

// 简单解析 url 中的参数
const queryParser = (req) => {
    const ret = {};
    const queryStr = req.url.split('?')[1];
    if (!queryStr) return ret;
    const queryItems = queryStr.split('&');
    queryItems.forEach(itemStr => {
        const [key, value] = itemStr.split('=');
        ret[key] = value;
    });
    return ret;
};

// 有请求进入
const onRequest = (req, res) => {
    try {
        const url = req.url.split('?')[0];
        req.query = queryParser(req);
        if (url === `/readFileAsync`) {
            readFileAsync(req, res);
        }else if (url === `/readFileSync`) {
            readFileSync(req, res);
        } else {
            console.log(`url not found`);
            res.statusCode = 404;
            res.statusMessage = 'Not Found';
            res.end();
        }
    } catch (e) {
        res.statusCode = 500;
        res.statusMessage = 'Internal Server Error';
        res.end();
    }
};

// ab -k -c 20 -n 250 "http://127.0.0.1:3000/readFileAsync?fileName=data.txt"
const readFileAsync = (req, res) => {
    const fileName = req.query.fileName;
    fileUtil.readFileAsync(fileName)
        .then(content => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('charset', 'utf-8');
            res.end(content);
        })
        .catch(e => {
            res.statusCode = 500;
            res.statusMessage = e.message;
            res.end()
        });
};
// ab -k -c 20 -n 250 http://127.0.0.1:3000/readFileSync?fileName=data.txt
const readFileSync = (req, res) => {
    const fileName = req.query.fileName;
    try {
        const content =fileUtil.readFileSync(fileName);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('charset', 'utf-8');
        res.end(content);
    } catch (e) {
        res.statusCode = 500;
        res.statusMessage = e.message;
        res.end();
    }
};



// 做一个极为简单的路由分发
const server = http.createServer(onRequest);
server.on("error", err => {
    console.log(`server on error: ${err}`);
});
// NODE_ENV=production node app.js
server.listen(3000);


module.exports = onRequest;
