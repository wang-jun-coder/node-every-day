import Vue from 'vue'
import Vuex from 'vuex'
import { Loading, Notification } from 'element-ui'
import { loginByAccessToken } from './service/users';


Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      userInfo: null,
      accessToken: null
    },
    getters: {
      isLogin(state) {
        return state.userInfo && state.accessToken;
      }
    },
    mutations: {
      updateUserInfo: function(state, payload) {
        state.userInfo = payload;
      },
      updateAccessToken: function(state, token) {
        state.accessToken = token;
      }
    },
    actions: {
      login: async function({ commit }, { token }) {
        const loading = Loading.service({
          fullscreen: true
        });
        try {
          const userInfo =  await loginByAccessToken({
            accesstoken: token
          });
          commit('updateUserInfo', userInfo);
          commit('updateAccessToken', token);
          loading.close();
        } catch(e) {
          loading.close();
          Notification({
            title: '登录失败',
            message: e.message || 'token 错误',
            type: 'error'
          });
        }
      }
    }
  });
}


export default createStore();
