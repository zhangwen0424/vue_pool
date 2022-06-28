<!--
 * @Date: 2021-11-04 11:28:01
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-08 13:43:18
 * @FilePath: /vue_test/21.src_求和案例_getter/components/Count.vue
-->
<template>
  <div>
    <h1>当前求和的值为:{{$store.state.sum}}</h1>
    <h1>当前求和值放大10倍: {{$store.getters.bigSum}}</h1>
    <select v-model.number="n">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click='decrement'>-</button>
    <button @click="incrementOdd">奇数相加</button>
    <button @click='incrementWait'>等一等再加</button>
  </div>
</template>

<script>
export default {
  name: 'Count',
  data () {
    return {
      n: 1,
    }
  },
  methods: {
    increment(){
      this.$store.commit('JIA', this.n);
      // this.sum += this.n;
    },
    decrement(){
      this.$store.commit('JIAN', this.n)
      // this.sum -= this.n;
    },
    incrementOdd(){
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
    }
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
