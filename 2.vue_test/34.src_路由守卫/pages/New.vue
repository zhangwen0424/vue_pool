<!--
 * @Date: 2021-11-09 11:09:57
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-16 11:04:59
 * @FilePath: /vue_test/33.src_两个新的生命周期钩子/pages/New.vue
-->
<template>
  <ul>
    <li :style="{opacity}">加油学习Vue</li>
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
  data: function(){
    return {
      opacity:1,
    }
  },
  mounted () {
    console.log("New mounted!")
  },
  beforeDestroy(){
    console.log("New beforeDestroy")
  },
  activated(){
    console.log("New activated!")
    this.timer = setInterval(()=>{
      console.log("running...")
      this.opacity -= 0.1;
      if(this.opacity<0) this.opacity=1;
    }, 100)
  },
  deactivated(){
    console.log("New deactivated!")
    clearInterval(this.timer);
  }
}
</script>

<style scoped>

</style>
