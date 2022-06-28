<template>
  <div>
    <p>学生姓名：{{name}}</p>
    <p>学生年龄：{{age}}</p>
    <button @click="sendStudent">给school传数据</button>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
  data () {
    return {
      name: 'mornki',
      age: 18
    }
  },
  methods: {
    sendStudent(){
      console.log("我是Student组件，我要触发全局事件")
      // this.$bus.$emit('getStudent', this.name, this.age)
      pubsub.publish("hello", 66666)
      pubsub.publish("alert", 5555)
      console.log("pubsub",pubsub)
    }
  },
}
</script>
