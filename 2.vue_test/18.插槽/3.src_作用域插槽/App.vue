<template>
  <div class="container">
    <Category title='食物'>
      <!-- 通过v-slot -->
      <template v-slot="{games}">
        <ul>
          <li v-for="(game,index) in games" :key="index">{{game}}</li>
        </ul>
      </template>
    </Category>

    <Category title='食物'>
      <!-- 通过v-slot -->
      <template v-slot="games">
        <ul>
          <li v-for="(game,index) in games.games" :key="index">{{game}}</li>
        </ul>
      </template>
    </Category>
  </div>
</template>

<script>
import Category from './components/Category.vue'

export default {
  name: 'App',
  
  components: {
    Category,
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: space-around;
}
</style>
