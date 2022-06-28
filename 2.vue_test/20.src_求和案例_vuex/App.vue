<!--
 * @Date: 2021-11-04 11:20:03
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-04 11:28:40
 * @FilePath: /vue_test/19.src_求和案例_纯vue/App.vue
-->
<template>
  <div>
      <Count/>
  </div>
</template>

<script>
import Count from './components/Count.vue'
export default {
  name: 'App',
  components: {Count}
}
</script>
