/*
 * @Date: 2021-11-09 10:00:53
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-09 11:00:53
 * @FilePath: /vue_test/25.src_路由的基本使用/main.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;
Vue.use(VueRouter)

new Vue({
  el:'#app',
  render:h=>h(App),
  router,
})