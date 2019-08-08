const express = require('express');
const http = require('http');

const app = new express();

app.use(function (req, res, next) {
    next()
});
app.get('/', function (req, res, next) {
    res.end(`hello express`);
});

app.get('/links', function (req, res, next) {
    res.links({
        next: 'http://localhost:user/2',
        last: 'http://localhost:user/4'
    });
    res.end('links');
});

app.param('id', function (req, res, next, id) {
    console.log(`app.param id: ${id}`);
    next();
});
app.get('/user/:id', function (req, res, next) {
    res.end(`id is ${req.params.id}`);
});


app.use(function (err, req, res, next) {
    console.log(`${err}`);
});

const server = http.createServer(app);
server.listen(3000, () => console.log(`express has listen`));
