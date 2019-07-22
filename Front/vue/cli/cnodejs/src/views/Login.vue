<template>
  <div class="login">
    <div v-if="!isLogin" class="login-panel">
      <input type="text" v-model="token" @keyup.enter='checkToken' placeholder="please enter token">
      <button @click="checkToken">登录</button>
    </div>
    <div v-else class="user-info">
      <img :src="userDetail.avatar_url" :alt="userDetail.loginname">
      <p>{{ userDetail.loginname }}</p>
      <p>{{ userDetail.githubUsername }}</p>
      <p>{{ createAt }}</p>
    </div>
  </div>
</template> 

<script>

import { userDetail } from '../service/users';
import moment from 'moment';
export default {
  name: 'Login',
  data() {
    return {
      token: '',
      userDetail: {
        "loginname":"xinweishang",
        "avatar_url":"https://avatars1.githubusercontent.com/u/11389776?v=4&s=120",
        "githubUsername":"wang-jun-coder",
        "create_at":"2018-04-09T09:29:41.917Z",
        "score":0,
        "recent_topics":[],
        "recent_replies":[]
        }
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
    createAt() {
      return moment(this.userDetail.create_at).format('YYYY-MM-DD HH-mm-ss')
    }
  },
  watch: {
    isLogin() {
      this.getUserDetail();
    }
  },
  methods: {
    checkToken() {
      const { dispatch } = this.$store;
      dispatch({
        type: 'login',
        token: this.token
      });
    },
    getUserDetail() {
      const loading = this.$loading({
        fullscreen: true
      });
      userDetail({
        loginname: this.$store.state.userInfo.loginname,
        accesstoken: this.$store.state.accesstoken
      }).then(result => {
        loading.close();
        if(!result.success) {
          this.notify({
            type: 'error',
            title: '获取信息失败',
            message: result.msg || '获取用户信息失败'
          });
          return;
        }
        this.userDetail = result.data;
      }).catch(e => {
        loading.close();
        this.notify({
          type: 'error',
          title: '获取信息失败',
          message: e.message || '获取用户信息失败'
        })
      })
    }
  }
}
</script>