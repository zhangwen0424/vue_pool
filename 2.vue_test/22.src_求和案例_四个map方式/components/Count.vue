<!--
 * @Date: 2021-11-04 11:28:01
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-08 14:07:15
 * @FilePath: /vue_test/22.src_求和案例_四个map方式/components/Count.vue
-->
<template>
  <div>
    <h1>当前求和的值为:{{sum}}</h1>
    <h1>当前求和值放大10倍: {{bigSum}}</h1>
    <h1>我在 {{address}} 上学，我的学校名称是 {{school}} </h1>
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
    // 对象写法
    // ...mapState({sum: 'sum'}),
    // 数组写法
    ...mapState(['sum', 'address', 'school']),
    ...mapGetters(['bigSum'])
  },
  methods: {
    ...mapMutations({increment: 'JIA', decrement:'JIAN'}),
    // ...mapMutations(['JIA', 'JIAN']),
    
   /*  increment(){
      this.$store.commit('JIA', this.n);
      // this.sum += this.n;
    },
    decrement(){
      this.$store.commit('JIAN', this.n)
      // this.sum -= this.n;
    }, */

    ...mapActions(['incrementOdd', 'incrementWait']),

    /* incrementOdd(){
      this.$store.dispatch('incrementOdd', this.n)
      // if(this.n%2){
      //   this.sum += this.n
      // }
    },
    incrementWait(){
      this.$store.dispatch('incrementWait', this.n);
      // setTimeout(() => {
      //   this.sum += this.n;
      // }, 1000);
    } */
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
