import Vue from 'vue'
import App from './App.vue'
import {mixin_a,mixin_b} from './mixin'

Vue.config.productionTip = false

// 全局混入
Vue.mixin(mixin_a);
Vue.mixin(mixin_b);

const vm = new Vue({
  render: h => h(App),
}).$mount('#app')
console.log("vm:", vm)
