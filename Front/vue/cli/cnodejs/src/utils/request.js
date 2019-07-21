import axios from 'axios';

/**
 *
 *
 * @export
 * @param {String} path 请求 url
 * @param {Object} [options={}] 配置信息
 * @param {Object} [options.method] 请求方式 get/post
 * @param {Object} [options.data] 请求 body 参数
 * @param {Object} [options.params] 请求 query 参数
 * @returns
 */
export default async function(path, options={}) {
  return axios.create()({
    url: path,
    ...options
  }).then(res => {
    if(res.data && res.data.success) {
      return res.data;
    }
    throw new Error('Request Error');
  });
}