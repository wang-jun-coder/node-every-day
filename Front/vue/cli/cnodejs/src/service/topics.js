import request from '../utils/request';

/**
 * 获取主题列表
 * 
 * @param {Object} param 
 * @param {Number} param.page  
 * @param {String} param.tab  
 * @param {Number} param.limit
 * @param {Boolean} param.mdrender 
 */
export async function topics(param) {
  return request('/api/v1/topics',  {
    method: 'get',
    params: {
      page: 0,
      tab: 'all',
      limit: 40,
      mdrender: true,
      ...param
    }
  })
}

/**
 * 获取主题详情
 * 
 * @param {Object} param
 * @param {String} param.topic_id
 * @param {String} [param.accesstoken] 
 */
export async function topicDetail(param) {
  const { topic_id } = param;
  return request(`/api/v1/topic/${topic_id}`, {
    method: 'get',
    data: {
      mdrender: true,
      ...param
    }
  })
}

/**
 * 收藏主题
 * 
 * @param {Object} param
 * @param {String} param.topic_id
 * @param {String} param.accesstoken
 */
export async function topicCollect(param) {
  return request(`/api/v1/topic_collect/collect`, {
    method: 'post',
    data: {
      ...param
    }
  })
}

/**
 * 取消收藏主题
 * 
 * @param {Object} param
 * @param {String} param.topic_id
 * @param {String} param.accesstoken
 */
export async function topicDeCollect(param) {
  return request(`/api/v1/topic_collect/de_collect`, {
    method: 'post',
    data: {
      ...param
    }
  })
}

/**
 * 获取用户收藏的主题列表
 * 
 * @param {Object} param
 * @param {String} param.loginname
 */
export async function topicCollectList(param) {
  const { loginname } = param;
  return request(`/api/v1/topic_collect/${loginname}`, {
    method: 'get',
  });
}


export default {
  topics,
  topicDetail,
  topicCollect,
  topicDeCollect,
  topicCollectList
}