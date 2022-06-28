/*
 * @Date: 2021-11-04 11:19:56
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-05 13:49:23
 * @FilePath: /vue_test/20.src_求和案例_vuex/main.js
 */
import Vue from 'vue';
import App from './App.vue'
import store from './store'
Vue.config.productionTip = false;

new Vue({
  render: h=>h(App),
  store,
}).$mount('#app')