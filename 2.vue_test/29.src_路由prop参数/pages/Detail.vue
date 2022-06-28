<!--
 * @Date: 2021-11-09 13:33:14
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-09 14:22:46
 * @FilePath: /vue_test/29.src_路由prop参数/pages/Detail.vue
-->
<template>
  <div>
    <ul>
      <li>消息编号：{{id}}</li>
      <li>消息标题：{{title}}</li>
      <!-- <li>消息编号：{{$route.params.id}}</li>
      <li>消息标题：{{$route.params.title}}</li> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: ['id','title'],
  mounted () {
    console.log("Detail mounted", this);
  }
}
</script>
