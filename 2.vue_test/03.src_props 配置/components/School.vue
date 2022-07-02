<template>
  <div>
    <p>学校名称：{{name}}</p>
    <p>学校地址：{{address}}</p>
    <p>学校等级：{{grade+1}} {{itgrade}}级</p>
    <button @click="itgrade++">点我等级+1</button>
  </div>
</template>

<script>
export default {
  name: 'School',
  data () {
    return {
      msg:'我是一个爱学习的学生',
      itgrade: this.grade
    }
  },
  //简单声明接收
  props: ['name', 'address', 'grade']
  // 限制类型的接收
  // props: {
  //   name: String,
  //   address: String,
  //   grade: Number
  // }
  //接收的同时对数据：进行类型限制+默认值的指定+必要性的限制
  /* props: {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
    },
    grade: {
      type: Number,
      default: 10
    }
  } */
}
</script>
