<template>
  <div class="todo-app">
    <todo-input v-model="newTodo" @add="addNewTodo"></todo-input>
    <todo-list 
      :todos="filterTodos"
      @remove="removeTodo"
      @done="doneTodo"
    ></todo-list>
    <todo-filter v-model="filter"></todo-filter>
  </div>
</template>

<script>
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import TodoFilter from "../components/TodoFilter";

export default {
  name: 'todo-app',
  components: {
    TodoInput,
    TodoList,
    TodoFilter
  },
  data: function() {
    return {
      todos: [{
        id: 1,
        text: "this is a demo todo",
        complete: false
      }],
      filter: "all",
      newTodo: "",
      newTodoId: 1
    };
  },
  watch: {
    todos: {
      handler(newTodos) {
        localStorage.setItem('todos', JSON.stringify(newTodos));
      },
      deep: true
    }
  },
  computed: {
    filterTodos() {
      if(this.filter === 'all') return this.todos;
      if(this.filter === 'finished') return this.todos.filter(todo => todo.complete === true);
      if(this.filter === 'unfinished') return this.todos.filter(todo => todo.complete === false);
    }
  },
  created() {
    let cached = null;
    try {
      cached = JSON.parse(localStorage.getItem('todos'));
    } catch(e) {
      cached = [];
      this.newTodoId = 1;
    }
    this.todos = cached;
    this.todos.forEach(todo => this.newTodoId = todo.id > this.newTodoId ? todo.id : this.newTodoId);
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
