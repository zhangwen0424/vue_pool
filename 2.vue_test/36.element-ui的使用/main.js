/*
 * @Date: 2021-11-24 15:33:12
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-24 15:51:42
 * @FilePath: /vue_test/36.element-ui的使用/main.js
 */
import Vue from 'vue'
import App from './App.vue'
// 全局引入
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI)

// 按需引入
import { Button, Row } from 'element-ui'
Vue.component(Button.name, Button);
Vue.component(Row.name, Row)
// Vue.use(Button)
// Vue.use(Row)

Vue.config.productionTip = false;

new Vue({
  el:'#app',
  render:h=>h(App),
})