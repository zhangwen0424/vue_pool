<template>
  <div id="app">
    <div class="container">
      <Search/>
      <List/>
    </div>
  </div>
</template>

<script>
import Search from './components/Search.vue'
import List from './components/List.vue'

export default {
  name: 'App',
  components: {
    List,
    Search,
  }
}
</script>

<style>
.album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}
</style>
