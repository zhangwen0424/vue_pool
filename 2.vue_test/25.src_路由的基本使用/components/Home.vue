<!--
 * @Date: 2021-11-09 10:24:06
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-09 10:55:43
 * @FilePath: /vue_test/src/components/Home.vue
-->
<template>
  <div>
      <h2>我是Home的内容</h2>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted () {
    console.log("About mounted!")
  },
  beforeDestroy(){
    console.log("About beforeDestroy")
  }
}
</script>
