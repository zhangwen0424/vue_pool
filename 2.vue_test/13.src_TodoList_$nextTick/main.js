import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


const vm = new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this;
  }
}).$mount('#app')
console.log("vm:", vm)
