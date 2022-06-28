<!--
 * @Date: 2021-11-04 11:28:01
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-08 16:32:43
 * @FilePath: /vue_test/24.src_求和案例_模块化编码/components/Count.vue
-->
<template>
  <div>
    <h1>当前求和的值为:{{sum}}</h1>
    <h1>当前求和值放大10倍: {{bigSum||0}}</h1>
    <h1>我在 {{address}} 上学，我的学校名称是 {{school}} </h1>
    <h1 style="color:red">Person组件的人数是:{{personList.length}}</h1>
    <select v-model.number="n">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="increment(n)">+</button>
    <button @click='decrement(n)'>-</button>
    <button @click="incrementOdd(n)">奇数相加</button>
    <button @click='incrementWait(n)'>等一等再加</button>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
export default {
  name: 'Count',
  data () {
    return {
      n: 1,
    }
  },
  computed: {
    ...mapState('countAbout', ['sum', 'address', 'school', 'personList']),
    ...mapState('personAbout', ['personList']),
    ...mapGetters('countAbout', ['bigSum'])
  },
  methods: {
    ...mapMutations('countAbout', {increment: 'JIA', decrement:'JIAN'}),
    ...mapActions('countAbout', ['incrementOdd', 'incrementWait']),
  },
  mounted(){
    console.log('mounted：', this);
  }
}
</script>
<style scoped>
  button {
    margin: 0px 5px;
  }
</style>
