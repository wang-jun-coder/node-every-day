import request from '../utils/request';

/**
 * 获取未读消息个数
 * 
 * @param {Object} param
 * @param {String} param.accesstoken
 * @returns
 */
export async function unreadCount(param) {
  return request(`/api/v1/message/count`, {
    method: 'get',
    params: {
      ...param
    }
  });
}
/**
 * 获取消息列表
 * 
 * @param {Object} param
 * @param {String} param.accesstoken
 * @param {Boolean} [param.mdrender] 
 * @returns
 */
export async function messages(param) {
  return request(`/api/v1/message`, {
    method:'get',
    params: {
      mdrender: true,
      ...param
    }
  });
}
/**
 * 标记所有消息已读
 * 
 * @param {Object} param
 * @param {String} param.accesstoken
 * @returns
 */
export async function markAll(param) {
  return request(`/api/v1/message/mark_all`, {
    method:'post',
    data: {
      ...param
    }
  });
}

/**
 * 标记单个消息已读
 * 
 * @param {Object} param
 * @param {String} param.accesstoken
 * @param {String} param.msg_id
 * @returns
 */
export async function markOne(param) {
  const { msg_id } = param;
  return request(`/api/v1/message/mark_one/${msg_id}`, {
    method:'post',
    data: {
      ...param
    }
  });
}