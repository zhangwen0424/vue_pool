<!--
 * @Date: 2021-11-09 10:24:06
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-09 16:33:25
 * @FilePath: /vue_test/32.src_缓存路由组件/pages/Home.vue
-->
<template>
  <div>
      <h2>Home组件内容</h2>
      <div>
        <ul class="nav nav-tabs">
          <li>
            <router-link class="list-group-item" active-class="active" to="/home/news" replace>News</router-link>
          </li>
          <li>
            <router-link class="list-group-item" active-class="active" to="/home/message">Message</router-link>
          </li>
        </ul>
        <!-- <router-view></router-view> -->

        <!-- 缓存一个路由组件 -->
        <!-- <keep-alive include="New">
          <router-view></router-view>
        </keep-alive> -->

        <!-- 缓存多个路由组件 -->
        <keep-alive :include="['New', 'Message']">
          <router-view></router-view>
        </keep-alive>
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
