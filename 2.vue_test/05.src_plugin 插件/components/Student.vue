<template>
  <div>
    <p>学生姓名：{{name | mySlice}}</p>
    <p>学生年龄：{{age}}</p>
    <input type="text" v-fbind:value="name">
    <button @click="hello">你好</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'mornki',
      age: 18
    }
  },
  mounted(){
    console.log("student",this)
  },
}
</script>

<style scoped>

</style>
