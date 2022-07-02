<template>
  <div>
    <p>学校名称：{{name}}</p>
    <p>学校地址：{{address}}</p>
    <p v-if="student.name">学生姓名:{{student.name}}， 学生年龄：{{student.age}}</p>
    <button @click="student={}">点我清除student信息</button>
    <button @click="$destroy()">点我销毁School组件</button>
  </div>
</template>

<script>
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
    this.$bus.$on('getStudent',(a,b)=>{
      console.log("我是School组件，我收到了数据",a,b)
      this.$set(this.student, 'name', a)
      this.$set(this.student, 'age', b)
    })
  },
  beforeDestroy(){
    console.log('School组件被销毁了')
    this.$bus.$off();
  }
}
</script>

