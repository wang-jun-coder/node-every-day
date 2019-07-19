<template>
  <div class="todo-filter">
    <button :class="{select: filter === 'all'}" @click="$emit('filter', 'all')">all</button>
    <button :class="{select: filter === 'finished'}" @click="$emit('filter', 'finished')">finished</button>
    <button :class="{select: filter === 'unfinished'}" @click="$emit('filter', 'unfinished')">unfinished</button>
  </div>
</template>

<script>
export default {
  name: 'TodoFilter',
  model: {
    prop: 'filter',
    event: 'filter'
  },
  props: {
    filter: {
      type: String,
      validator(val) {
        return ['all', 'finished', 'unfinished'].includes(val);
      }
    }
  }
}
</script>

<style scoped>
.todo-filter {
  width: 100%;
  height: 50px;
  padding-top: 30px;
  background-color: lightcyan;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
}
button {
  width: 80px;
  height: 30px;
  margin: 10px;
  border: none;
  background-color: white;
}

.select {
  background-color: lightgreen;
}


</style>
