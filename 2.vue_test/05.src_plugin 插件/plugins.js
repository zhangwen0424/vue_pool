/*
 * @Date: 2021-10-18 22:06:07
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-10-21 22:43:56
 * @FilePath: /vue_test/src/plugins.js
 */
export default {
  install(Vue, x,y,z) {
    console.log(x,y,z);
    // 定义全局过滤器
    Vue.filter('mySlice',function(value) {
      return value.slice(0,3)
    })
    // 定义全局指令
    Vue.directive('fbind',{
      //指令与元素成功绑定时（一上来）
      bind(element,binding){
        console.log("bind", element, binding)
        element.value = binding.value;
      },
      inserted(element){
        element.focus();
      },
      //指令所在的模板被重新解析时
      update(element, binding){
        console.log("update", element, binding);
        element.value = binding.value;
      }
    })
    // 定义混入
    Vue.mixin({
      data(){
        return {x:20,y:30}
      } 
    })
		//给Vue原型上添加一个方法（vm和vc就都能用了）
    Vue.prototype.hello = ()=>{alert("hello")}
  }
}