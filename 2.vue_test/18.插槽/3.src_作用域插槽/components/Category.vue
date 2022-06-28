<!--
 * @Date: 2021-11-03 15:09:03
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-03 15:51:41
 * @FilePath: /vue_test/18.插槽/3.src_作用域插槽/components/Category.vue
-->
<template>
  <div class="category">
    <h3>{{title}}分类</h3>
    <!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
    <slot :games="games">我是一些默认值，当使用者没有传递具体结构时，我会出现</slot>
  </div>
</template>

<script>
  export default {
    name: 'Category',
    props: ['title'],
    data() {
      return {
        games:['红色警戒','穿越火线','劲舞团','超级玛丽'],
      }
    },
  }
</script>

<style scoped>
  .category {
    background-color: #f5f5f5;
    padding: 50px;
    margin-right: 20px;
    width:30%;
  }
</style>
