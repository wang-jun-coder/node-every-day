<template>
  <div id="app">
    <nav-bar
      :items="navbarItems"
      :search="searchClick"
    >
    </nav-bar>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar';
export default { 
  components: {
    NavBar
  },
  computed: {
    isLogin() {
      return this.$store.state.userInfo && this.$store.state.accessToken;
    },
    navbarItems() {
      let items = [];
      items.push({id: 1,text: '首页',link: '/'});
      if(this.isLogin) {
        items.push({id: 2,text: '未读消息',link: '/my/message'});
      }
      items.push({id: 3,text: '新手入门',link: '/getstart'});
      items.push({id: 4,text: 'API',link: '/api'});
      items.push({id: 5,text: '关于',link: '/about'});
      if(!this.isLogin) {
        items.push({id: 6,text: '登录',link: '/login'});
      }
      if(this.isLogin) {
        items.push({id: 6,text: '设置',link: '/setting'});
        items.push({id: 7,text: '退出',link: '/logout'});
      }
      return items;
    }
  },
  methods: {
    searchClick(text) {
      window.open(`https://www.google.com/search?hl=zh-CN&q=site:cnodejs.org+${text}`)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  padding: 0;
  margin: 0;
}

</style>
