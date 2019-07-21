<template>
  <div class="nav-bar">
    <div class="left">
      <img src="/cnodejs_light.svg" alt="icon" class="brand">
      <input type="text" @keyup.enter="search($event.target.value)">
    </div>
    <div class="right">
      <div class="routers">
        <router-link v-for="item in items" :key="item.id" :to="item.link">
          {{ item.text }}
        </router-link>
      </div>
    </div>
  </div>
</template>  

<script>
export default {
  name: 'NavBar',
  props: {
    items: {
      type: Array,
      required: true
    },
    search: {
      type: Function,
      required: true,
    }
  }
}
</script>

<style scoped>
a {
  color: #ccc;
  text-decoration: none;
  margin-right: 15px;
}

.nav-bar {
  min-height: 50px;
  widows: 100%;
  margin: 0;
  padding: 0;
  background: #444;
}
.left {
  display: flex;
  float: left;
}
.right {
  float: right;
  height: 100%;
}

.brand {
  height: 30px;
  padding: 10px; 
}
input {
  display: inline-block;
  height: 25px;
  margin: auto;
  box-shadow: none;
  background: url('/search.png') 8px no-repeat #888;
  border: none;
  border-radius: 15px;
  padding: 3px 5px 3px 30px;
  font-size: 13px;
}
input:hover {
  background: url('/search.png') 8px no-repeat white;
}
input:focus {
  background: url('/search.png') 8px no-repeat white;
}
.routers {
  height: 30px;
  margin-top: 10px;
  line-height: 30px;
  margin-right: 10px;
}

</style>
