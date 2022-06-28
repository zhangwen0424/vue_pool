<!--
 * @Date: 2021-11-04 11:20:03
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-08 16:00:15
 * @FilePath: /vue_test/23.src_求和案例_多组件共享数据/App.vue
-->
<template>
  <div>
      <Count/>
      <hr>
      <Person/>
  </div>
</template>

<script>
import Count from './components/Count.vue'
import Person from './components/Person.vue'
export default {
  name: 'App',
  components: {Count,Person}
}
</script>
