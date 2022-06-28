<!--
 * @Date: 2021-11-09 11:10:09
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-16 11:06:10
 * @FilePath: /vue_test/33.src_两个新的生命周期钩子/pages/Message.vue
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
        <button @click="pushShow(m)">push查看</button>
        <button @click="replaceShow(m)">replace查看</button>
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
  methods: {
    pushShow(m){
      this.$router.push({
        name: 'xiangqing',
        params: {
          id: m.id,
          title: m.title
        }
      })
    },
    replaceShow(m){
      this.$router.replace({
        name: 'xiangqing',
        params: {
          id: m.id,
          title: m.title
        }
      })
    }
  },
  mounted () {
    console.log("Message mounted!")
    // setInterval(() => {
    //   console.log("Message running")
    // }, 100);
  },
  beforeDestroy(){
    console.log("Message beforeDestroy")
  }
}
</script>

<style scoped>

</style>
