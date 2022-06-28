<!--
 * @Date: 2021-11-09 11:03:02
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-09 14:50:10
 * @FilePath: /vue_test/31.src_编程式路由/components/Banner.vue
-->
<template>
  <div class="row">
    <div class="col-xs-offset-2 col-xs-8">
      <div class="page-header">
        <h2>Vue Router Demo</h2>
        <button @click="back">后退</button>
        <button @click="forward">前进</button>
        <button @click="go">测试下go</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  methods: {
    back(){
      this.$router.back()
    },
    forward(){
      this.$router.forward()
    },
    go(){
      this.$router.go(-2)
    }
  },
  mounted(){
    console.log("Banner mounted", this)
  }
}
</script>
