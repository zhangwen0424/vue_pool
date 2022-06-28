<!--
 * @Date: 2021-11-09 11:10:09
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-09 13:58:51
 * @FilePath: /vue_test/27.src_路由query参数/pages/Message.vue
-->
<template>
  <div>
    <ul>
      <li v-for="m in messageList" :key="m.id">
        <!-- 跳转路由并携带query参数，to的字符串写法 -->
        <!-- <router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">{{m.title}}</router-link> -->

        <!-- 跳转路由并携带query参数，to的对象写法 -->
        <!-- <router-link :to="{
          path: '/home/message/detail',
          query: {
            id: m.id,
            title: m.title
          }
        }">{{m.title}}</router-link> -->

        <!-- 命名路由写法 -->
        <!-- <router-link :to="{name:'xiangqing'}">{{m.title}}</router-link> -->
        <router-link :to="{
          name: 'xiangqing',
          query: {
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
