<!--
 * @Date: 2021-11-09 11:10:09
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-09 14:18:54
 * @FilePath: /vue_test/29.src_路由prop参数/pages/Message.vue
-->
<template>
  <div>
    <ul>
      <li v-for="m in messageList" :key="m.id">
        <router-link :to="{
          name: 'xiangqing',
          params: {
            id: m.id,
            title: m.title
          }
        }">{{m.title}}</router-link>
      </li>
    </ul>
    <hr/>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data(){
    return {
      messageList:[
        {id:'001',title:'消息001'},
        {id:'002',title:'消息002'},
        {id:'003',title:'消息003'}
      ]
    }
  },
  mounted () {
    console.log("Message mounted!")
  },
  beforeDestroy(){
    console.log("Message beforeDestroy")
  }
}
</script>

<style scoped>

</style>
