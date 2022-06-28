<!--
 * @Date: 2021-11-09 11:09:57
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-09 11:21:34
 * @FilePath: /vue_test/26.src_多级路由/pages/New.vue
-->
<template>
  <ul>
    <li>news001</li>
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
