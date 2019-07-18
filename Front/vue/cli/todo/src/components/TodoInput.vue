<template>
  <div class="todo-input">
    <input 
      type="text" 
      :value="value"
      @input="$emit('input', $event.target.value)"
      @keyup.enter="$emit('add', value)"
    >
    <button @click="$emit('add', value)">add</button>
  </div>
</template>
<script>
export default {
  name: "TodoInput",
  props: {
    value: String
  },
  data: function() {
    return {
      text: ""
    }
  }
}
</script>

<style scoped>
.todo-input {
  
  width: 100%;
  height: 100px;
  padding-top: 10%;
  background-color: lightcyan;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

input {
  width: 200px;
  height: 30px;
  padding: 0;
  margin: 0;
  margin-right: 20px;
  border: 1px solid #dddddd;
  font-size: 20px;
}

button {
  width: 80px;
  height: 32px;
  padding: 0;
  margin: 0;
  border: 1px solid #dddddd;
  font-size: 20px;
  vertical-align: middle;
}

</style>
