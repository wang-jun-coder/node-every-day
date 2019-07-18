<template>
  <div class="todo-app">
    <todo-input v-model="newTodo" @add="addNewTodo"></todo-input>
    <todo-list 
      :todos="todos"
      @remove="removeTodo"
      @done="doneTodo"
    ></todo-list>
    <div class="debug">
      <p>newTodo is: {{ newTodo }}</p>
    </div>
  </div>
</template>

<script>
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
export default {
  name: 'todo-app',
  components: {
    TodoInput,
    TodoList
  },
  data: function() {
    return {
      todos: [{
        id: 1,
        text: "this is a demo todo",
        complete: false
      }],
      filter: "ALL",
      newTodo: "",
      newTodoId: 1
    };
  },
  methods: {
    addNewTodo() {
      if(!this.newTodo) return;
      this.todos.push({
        id: ++this.newTodoId,
        text: this.newTodo,
        complete: false
      });
      this.newTodo = "";
    },
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    doneTodo(id, done) {
      this.todos.find(todo => todo.id===id).complete = done;
    }
  }
}
</script>

<style lang="css" scoped>
.toto-app {
  background-color: lightcyan;
}
</style>
