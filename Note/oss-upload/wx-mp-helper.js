const superagent = require('superagent');
const request = require('request');
const urllib = require('urllib');

class WxMpHelper {

    constructor(props) {
        const { appId, secret } = props;
        this.appId = appId;
        this.secret = secret;
        this.baseUrl = `https://api.weixin.qq.com`;
    }

    /*
    * 获取 token
    *
    * @see https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html
    *
    * @return {Promise<{
    *   access_token,
    *   expires_in,
    *   errcode,
    *   errmsg
    * }>}
    *
    * */
    async getAccessToken() {
        const url = `${this.baseUrl}/cgi-bin/token?grant_type=client_credential&appid=${this.appId}&secret=${this.secret}`;
        return await superagent.get(url).then(res => {
            const {access_token, expires_in, errcode, errmsg} = res.body;
            return {
                access_token,
                expires_in,
                errcode,
                errmsg
            };
        });
    }
    /*
    * 无个数限制生成小程序码(wxacode.getUnlimited)
    *
    * @see https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/qr-code/wxacode.getUnlimited.html
    * */
    async getwxacodeunlimitBuffer({accessToken, scene, page, width, auto_color, line_color, is_hyaline } = {}) {
        const url = `${this.baseUrl}/wxa/getwxacodeunlimit?access_token=${accessToken}`;
        const param = {
            scene,
            page,
            width,
            auto_color,
            line_color,
            is_hyaline
        };
        return await superagent.post(url).send(param).then(res => {
            const {access_token, expires_in, errcode, errmsg} = res.body;
            return res.body;
        }).catch(e => {
            console.log(e)
        });
    }
    async getwxacodeunlimitStream({accessToken, scene, page, width, auto_color, line_color, is_hyaline } = {}) {
        const url = `${this.baseUrl}/wxa/getwxacodeunlimit?access_token=${accessToken}`;
        const param = {
            scene,
            page,
            width,
            auto_color,
            line_color,
            is_hyaline
        };
        return request({
            method: 'POST',
            url: url,
            body: JSON.stringify(param)
        });

        return  (await urllib.request(url, {method:"POST", data: JSON.stringify(param), streaming:true})).res;
    }
}
module.exports = WxMpHelper;
