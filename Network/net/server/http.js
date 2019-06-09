const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`-> ${req.method} ${req.url}`);

    setTimeout(() => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('charset', 'utf-8');
        res.end(`${JSON.stringify({
            errCode: 0,
            msg: '成功',
            data: {
                success: true,
                result: 'response success'
            }
        })}`);
    }, 1000);
});
server.listen(3000, () => {
    console.log(`server has listening ${server.address().port}`);
});
