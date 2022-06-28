<!--
 * @Date: 2021-11-09 10:24:06
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-09 11:23:46
 * @FilePath: /vue_test/26.src_多级路由/pages/Home.vue
-->
<template>
  <div>
      <h2>Home组件内容</h2>
      <div>
        <ul class="nav nav-tabs">
          <li>
            <router-link class="list-group-item" active-class="active" to="/home/news">News</router-link>
          </li>
          <li>
            <router-link class="list-group-item" active-class="active" to="/home/message">Message</router-link>
          </li>
        </ul>
        <router-view></router-view>
        
      </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted () {
    console.log("Home mounted!")
  },
  beforeDestroy(){
    console.log("Home beforeDestroy")
  }
}
</script>
