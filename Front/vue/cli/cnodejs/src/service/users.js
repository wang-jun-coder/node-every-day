import request from '../utils/request';

/**
 * 获取用户详情
 * 
 * @param {Object} param
 * @param {String} param.loginname
 * @param {String} param.accesstoken
 */
export async function userDetail(param) {
  const { loginname, accesstoken } = param;
  return request(`/api/v1/user/${loginname}`, {
    method: 'get',
    data: {
      accesstoken: accesstoken
    }
  })
}

/**
 * 验证 accesstoken, 返回用户信息
 * 
 * @param {Object} param
 * @param {String} param.accesstoken
 */
export async function loginByAccessToken(param) {
  return request(`/api/v1/accesstoken`, {
    method: 'post',
    data: {
      ...param
    }
  })
}

export default {
  userDetail,
  loginByAccessToken
}