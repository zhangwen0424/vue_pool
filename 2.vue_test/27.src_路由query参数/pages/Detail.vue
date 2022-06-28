<!--
 * @Date: 2021-11-09 13:33:14
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-09 13:47:41
 * @FilePath: /vue_test/27.src_路由query参数/pages/Detail.vue
-->
<template>
  <div>
    <ul>
      <li>消息编号：{{q.id}}</li>
      <li>消息标题：{{q.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  computed: {
    q(){
      return {...this.$route.query}
    }
  },
  mounted () {
    console.log("Detail mounted", this);
  }
}
</script>
