<template>
  <ul class="todo-list" v-if="todos && todos.length">
    <todo-item 
      v-for="todo in todos" 
      :key="todo.key" 
      :id="todo.id" 
      :text="todo.text"
      :complete="todo.complete"
      @remove="removeTodo"
      @done="doneTodo"
    ></todo-item>
  </ul>
</template>
<script>
import TodoItem from "./TodoItem";

export default {
  name: "TodoList",
  props: {
    todos: Array
  },
  components: {
    TodoItem
  },
  methods: {
    removeTodo(id) {
      this.$emit('remove', id);
    },
    doneTodo(id, done) {
      this.$emit('done', id, done);
    }
  }
}
</script>

<style scoped>
.todo-list {
  padding: 0;
  margin: 0;
  padding-inline-start: 0;
}
</style>
