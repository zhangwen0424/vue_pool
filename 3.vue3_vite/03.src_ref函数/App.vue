<template>
  <h1>人员姓名：{{ name }}</h1>
  <h1>人员年龄：{{ age }}</h1>
  <h3>工作种类：{{ job.type }}</h3>
  <h3>工作薪水：{{ job.salary }}</h3>
  <button @click="changeInfo">修改信息</button>
</template>

<script setup>
import { ref } from "vue";
let name = ref("王五");
let age = ref(20);
let job = ref({
  type: "前端工程师",
  salary: "30K",
});
//方法
function changeInfo() {
  // name.value = "李四";
  // age.value = 48;
  console.log(job.value);
  // job.value.type = "UI设计师";
  // job.value.salary = "60K";
  // console.log(name, age);
}
</script>
