<!--
 * @Date: 2021-11-09 11:10:09
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-09 11:23:55
 * @FilePath: /vue_test/26.src_多级路由/pages/Message.vue
-->
<template>
  <ul>
    <li>
      <a href="/message1">message001</a>&nbsp;&nbsp;
    </li>
    <li>
      <a href="/message2">message002</a>&nbsp;&nbsp;
    </li>
    <li>
      <a href="/message/3">message003</a>&nbsp;&nbsp;
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Message',
  mounted () {
    console.log("Message mounted!")
  },
  beforeDestroy(){
    console.log("Message beforeDestroy")
  }
}
</script>

<style scoped>

</style>
