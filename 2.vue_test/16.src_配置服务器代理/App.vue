<template>
  <div class="container">
    <button @click="getStudents">获取学生信息</button>
    <button @click="getCars">获取汽车信息</button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'App',
  methods: {
    getStudents(){
      // 此处必须是当前主机域名，不可用5000端口
      axios.get("http://localhost:8080/server1/students").then(
        response=>{
          console.log("获取成功学生！",response)
        },
        error=>{
          console.log('获取学生信息失败',error)
        }
      )
    },
    getCars(){
      axios.get("http://localhost:8080/server2/cars").then(response=>{
        console.log("获取成功汽车！",response)
      })
    }
  }
}
</script>

<style>
.album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}
</style>
