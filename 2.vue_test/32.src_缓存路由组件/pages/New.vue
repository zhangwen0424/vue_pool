<!--
 * @Date: 2021-11-09 11:09:57
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-09 16:32:43
 * @FilePath: /vue_test/32.src_缓存路由组件/pages/New.vue
-->
<template>
  <ul>
    <li>news001
      <input type="text"/>
    </li>
    <li>news002</li>
    <li>news003</li>
  </ul>
</template>

<script>
export default {
  name: 'New',
  mounted () {
    console.log("New mounted!")
  },
  beforeDestroy(){
    console.log("New beforeDestroy")
  }
}
</script>

<style scoped>

</style>
