<template>
  <div id="app">
    <h1>你好！{{studentName}}</h1>
    <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
    <School :getSchoolName="getSchoolName"/>
    <hr>

    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第一种写法，使用@或v-on） -->
    <!-- <Student @customEvent="getStudentName"/> -->
    <!-- <Student v-on:customEvent="getStudentName"/> -->
    <!-- <hr> -->

    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第二种写法，使用ref） -->
    <!-- @click.native 原生点击事件：
      1，给vue组件绑定事件时候，必须加上native ，不然不会生效（监听根元素的原生事件，使用.native修饰符）
      2，等同于在子组件中：子组件内部处理click事件然后向外发送click事件：$emit("click".fn)
      -->
    <Student ref="student" @click.native="show"/>
  </div>
</template>

<script>
import School from './components/School.vue'
import Student from './components/Student.vue'

export default {
  name: 'App',
  components: {
    School,
    Student
  },
  data(){
    return {
      studentName: ''
    }
  },
  methods: {
    getSchoolName(name){
      console.log("getSchoolName被触发了 ", name)
    },
    getStudentName(name, ...params){
      console.log("getStudentName被触发了 ", name, params);
      this.studentName = name;
    },
    show(){
      alert('123')
    }
  },
  mounted(){
    // 绑定自定义事件
    this.$refs.student.$on('customEvent', this.getStudentName)
    console.log("this.$refs",this.$refs)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
