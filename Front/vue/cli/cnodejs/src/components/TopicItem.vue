<template>
  <div class="topic-item">
    <div class="avatar">
      <img :src="author.avatar_url" :alt="author.loginname">
    </div>
    <span class="count"><span class="replay">{{ reply_count }}</span>{{'/' + visit_count }}</span>
    <div class="top" v-if="top">置顶</div>
    <div class="good" v-else-if="good">精华</div>
    <div class="tab" v-else>{{ tabName }}</div>
    <div class="title">{{ title }}</div>
    <div class="from-now">{{ fromNow }}</div>
  </div>
</template>

<script>
import moment from 'moment';
moment.locale('zh-cn');

export default {
  name: 'TopicItem',
  props: ['id', 'author_id', 'tab', 'content', 'title', 'last_reply_at', 'good', 'top', 'reply_count', 'visit_count', 'create_at', 'author'],
  computed: {
    fromNow() {
      // return formatDistance(parse(this.create_at), Date.now(), { addSuffix: true });
      return moment(this.create_at).fromNow();
    },
    tabName() {
      const tabMap = {
        ask: '问答',
        share: '分享',
        job: '招聘',
        dev: '客户端测试'
      }
      return tabMap[this.tab];
    }
  }
}
</script>

<style scoped>
.topic-item {
  width: 100%;
  height: 50px;
  display: flex;
  background: lightcyan;
  border-bottom: 1px solid #eeeeee;
  line-height: 50px;
}
.avatar {
  height: 30px;
  padding: 10px;
}
img {
  height: 100%;
}

.count {
  padding-right: 10px;
  font-size: 10px;
  color: #b4b4b4;
}
.replay {
  font-size: 14px;
  color: #9e78c0;
}
.title {
  max-width: 70%;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  margin-right: 10px;
  text-overflow: ellipsis;
}
.from-now {
  font-size: 13px;
  color: lightgrey;
}

.top, .good {
  
  height: 15px;
  margin-top: 15px;
  padding: 2px 5px;
  margin-right: 10px;
  font-size: 13px;
  line-height: 15px;
  background: #80bd01;
  color: white;
  border-radius: 5px;
}
.tab {
  height: 15px;
  margin-top: 15px;
  padding: 2px 5px;
  margin-right: 10px;
  font-size: 13px;
  line-height: 15px;
  background: #e5e5e5;
  color: #999;
  border-radius: 5px;
}

</style>
