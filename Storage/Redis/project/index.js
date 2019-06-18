const fs = require('fs');
const util = require('util');
const Redis = require('ioredis');

const config = {
    host: '127.0.0.1',
    port: 6378,
    password: '123456',
    db: 0
};
const client = new Redis(config);
const pub = new Redis(config);
const sub = new Redis(config);



// demo 测试
(async function () {

    // normal
    await client.set('key1', 'value1');
    console.log(`get key: ${await client.get('key1')}`);

    // pipeline
    let ret = await client.pipeline()
        .hmset('hash', 'key1', 'value1', 'key2', 'value2')
        .hmget('hash', 'key1', 'key2')
        .exec();
    console.log(`pipeline: ${JSON.stringify(ret)}`);

    // transaction
    ret = await client.multi()
        .hmset('hash', 'key1', 'value1', 'key2', 'value2')
        .zadd('set', '0', 'a', '1', 'b')
        .zrange('set', 0, 10, 'WITHSCORES')
        .exec();
    console.log(`transaction: ${JSON.stringify(ret)}`);

    // pub & sub
    sub.on('message', (channel, message) => {
        console.log(`sub on message: ${channel} ${message}`);
    });
    await sub.subscribe('channel');
    await pub.publish('channel', 'this is message from pub client');


    // lua
    client.defineCommand('script', {
        numberOfKeys: 2,
        lua: await util.promisify(fs.readFile)('lua/script.lua')
    });
    ret = await client.script('key1', 'key2', 1, 2.3);
    console.log(`script: ${JSON.stringify(ret)}`);





})().then(()=> client.disconnect()).catch(e => console.log(e));


