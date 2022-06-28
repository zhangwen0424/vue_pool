<template>
  <div>
    <p>学校名称：{{name}}</p>
    <p>学校地址：{{address}}</p>
    <p v-if="student.name">学生姓名:{{student.name}}， 学生年龄：{{student.age}}</p>
    <button @click="$destroy()">点我销毁School组件</button>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
  name: 'School',
  data () {
    return {
      name:'南阳理工学院',
      address: '南阳',
      student: {},
    }
  },
  mounted () {
    /* this.$bus.$on('getStudent',(a,b)=>{
      console.log("我是School组件，我收到了数据",a,b)
      this.$set(this.student, 'name', a)
      this.$set(this.student, 'age', b)
    }) */
    // 订阅所有
   /*  pubsub.subscribeAll(function(a) {
      console.log("a",a)
    }); */
    // 订阅hello消息
    pubsub.subscribe('hello',(msgName,data)=>{
      console.log(msgName,data)
    })

  },
  beforeDestroy(){
    console.log('School组件被销毁了')
    // this.$bus.$off();
    pubsub.unsubscribe('hello');
    // pubsub.clearAllSubscriptions()
  }
}
</script>

