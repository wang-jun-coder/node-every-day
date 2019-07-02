const fs = require("fs");
const request = require("request");
const OSS = require("ali-oss");
const {appId, secret, accessKeyId, accessKeySecret, region, bucket } = require('./.wj.config');
const MPHelper = require('./wx-mp-helper');

const mp = new MPHelper({appId, secret});
const oss = new OSS({region, accessKeyId, accessKeySecret, bucket});

const streamDownloadMp = async () => {
    const { access_token } = await mp.getAccessToken();

    const stream = await mp.getwxacodeunlimitStream({
        accessToken: access_token,
        scene: "recommend=x",
        width: 420,
    });

    const write = fs.createWriteStream(`./assets/mpCode.jpg`);
    stream.pipe(write);
    write.on("end", () => {
        console.log("write mp code success");
    });
};

const streamDownloadOss = async () => {
    const stream = request({
        method: 'GET',
        url: "https://wj-blog.oss-cn-beijing.aliyuncs.com/object-name",
    });
    const write = fs.createWriteStream(`./assets/oss.jpg`);
    stream.pipe(write);
    write.on("end", () => {
        console.log("write oss success");
    });
};

const streamUpload = async () => {
    const stream = fs.createReadStream("./assets/mpCode.jpg");
    let result = await oss.putStream(`${Date.now()}.jpg`, stream);
    console.log(JSON.stringify(result));
};

const streamPipeMp = async () => {
    const { access_token } = await mp.getAccessToken();

    const stream = await mp.getwxacodeunlimitStream({
        accessToken: access_token,
        scene: "recommend=x",
        width: 420,
    });

    let result = await oss.putStream(`${Date.now()}.jpg`, stream);
    console.log(JSON.stringify(result));
};

const streamPieOss = async () => {

    let stream;
    try {
        const param = {
            customResponse: true,
            method: "GET"
        };
        const result = await oss.urllib.request('http://wj-blog.oss-cn-beijing.aliyuncs.com/object-name', param);
        stream = result.res;

        // let result = await oss.getStream('object-name');
        // stream = result.stream;
    } catch (e) {
        console.log(e);
    }

    let result = await oss.putStream(`${Date.now()}.jpg`, stream);
    console.log(JSON.stringify(result));
};

(async () => {


    // await streamDownloadMp();

    // await streamDownloadOss();

    // await streamUpload();

    await streamPipeMp(); // error

    // await streamPieOss();

})().catch(e => {
    console.log(e);
});

