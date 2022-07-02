<template>
  <div class="container">
    <!-- 默认插槽内容会出现 -->
    <Category title="空的"></Category>

    <Category title="foods">
      <h4>我是一些食物</h4>
      <h4 slot="food">我是一些食物~~~</h4>
    </Category>

    <Category title="games">
      <h4>我是一些游戏</h4>
      <!-- 传入了两个同名插槽 game，两个相同名称插槽都会插入到指定插槽位置 -->
      <h4 slot="game">我是一些游戏!!!!</h4>
      <!-- template用于多个插槽内容合并一个插槽，，v-slot写法必须用于template模板中 -->
      <!-- 报错：v-slot只能用于 template中 <h4 v-slot="game">我是一些游戏!!!!</h4> -->
      <template slot="game">
        <h5>我是一些游戏~~~</h5>
        <h5>我是一些游戏~~~</h5>
      </template>
    </Category>

    <Category title="films">
      <h4>我是一些电影</h4>
    </Category>
  </div>
</template>

<script>
import Category from "./components/Category.vue";

export default {
  name: "App",
  data() {
    return {
      foods: ["火锅", "烧烤", "小龙虾", "牛排"],
      games: ["红色警戒", "穿越火线", "劲舞团", "超级玛丽"],
      films: ["《教父》", "《拆弹专家》", "《你好，李焕英》", "《尚硅谷》"],
    };
  },
  components: {
    Category,
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: space-around;
}
</style>
