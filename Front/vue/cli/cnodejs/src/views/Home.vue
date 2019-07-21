<template>
  <div class="home">
    <div class="main">
      <div class="tabs">
        <router-link
          v-for="(item, index) in tabs" 
          :key="index" 
          :to="'/?tab='+item.tab" 
          :class="{current: item.tab === tab, tab: true}"
          @click.native.prevent="tabClick(item.tab)"
        >
          {{ item.text }}
        </router-link>
      </div>
      <div class="topics">
        <topic-item v-for="(topic, index) in topics" :key="index" v-bind=topic></topic-item>
      </div>
    </div>
    <div class="right-side"

    ></div>
  </div>
</template>

<script>
// @ is an alias to /src
import TopicItem from '../components/TopicItem';
import { topics as LoadTopics } from '../service/topics';
export default {
  name: 'home',
  data: function() {
    return {
      tab: this.$route.query.tab || 'all',
      page: 0,    // 页码
      limit: 40,  // 页容量
      tabs: [
        {id: 1, text: '全部', tab:'all'},
        {id: 1, text: '精华', tab:'good'},
        {id: 1, text: '分享', tab:'share'},
        {id: 1, text: '问答', tab:'ask'},
        {id: 1, text: '招聘', tab:'job'},
        {id: 1, text: '客户端测试', tab:'dev'}
      ],
      topics: []
    }
  },
  created() {
    if(this.$route.query.tab) this.tab = this.$route.query.tab;
    this.loadTopics();
  },
  components: {
    TopicItem
  },
  methods: {
    tabClick(tab) {
      this.tab = tab;
      this.loadTopics();
    },
    pageClick(page) {
      this.page = page;
    },
    loadTopics() {
      const loading = this.$loading({fullscreen: true});
      LoadTopics({
        tab: this.tab,
        page: this.page,
        limit: this.limit
      }).then(result => {
        loading.close();
        if(result.success) {
          return this.topics = result.data;
        }
        this.$notify({
          type: 'error',
          title: result.errMsg || '请求失败'
        });
      }).catch(e => {
        loading.close();
        this.$notify({
          type: 'error',
          title: '加载失败',
          message: e.message
        });
      });
    }
  }
}
</script>

<style scoped>
.tab {
  text-decoration: none;
  margin: 0 10px;
  color: #80bd01;
  display: inline-block;
}
.home {
  background: rgb(225, 225, 225);
}
.tabs {
  width: 80%;
  text-align: left;
  background: white;
  margin-left: 10%
}
.current {
  color: white;
  background: #80bd01;
}
.topics {
  width: 80%;
  margin-left: 10%;
}
</style>
