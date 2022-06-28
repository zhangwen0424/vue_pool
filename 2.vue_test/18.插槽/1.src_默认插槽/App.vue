<template>
  <div class="container">
    <Category title='foods'>
      <h4>我是一些食物</h4>
    </Category>
    <Category title='games'>
      <!-- <h4>我是一些游戏</h4> -->
    </Category>
    <Category title='films'>
      <h4>我是一些电影</h4>
    </Category>
  </div>
</template>

<script>
import Category from './components/Category.vue'

export default {
  name: 'App',
  data() {
    return {
      foods:['火锅','烧烤','小龙虾','牛排'],
      games:['红色警戒','穿越火线','劲舞团','超级玛丽'],
      films:['《教父》','《拆弹专家》','《你好，李焕英》','《尚硅谷》']
    }
  },
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
