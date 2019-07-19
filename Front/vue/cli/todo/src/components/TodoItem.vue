<template>
  <div class="todo-item" :key="id">
    <input type="checkbox" :checked="complete" @change="$emit('done', id, $event.target.checked)">
    <span :key="id+'-span'" :class="{'fulfilled': complete}">{{text}}</span>
    <button @click="$emit('remove', id)">X</button>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    id: Number,
    text: String,
    complete: Boolean
  }
}
</script>

<style scoped>
.todo-item {
  background-color: lightcyan;
  width: 100%;
  line-height: 50px;
  display: flex;
  flex-direction: row;
  /* justify-content: left; */
  justify-content: center;
  align-items: center;
}

input {
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
  background: white;
}

span {
  height: 100%;
  text-align: center;
  font-size: 20px;
  line-height: 50px;
  margin: 0 10px 3px 10px;
}
button {
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
}



.fulfilled {
  text-decoration: line-through;
}
</style>
