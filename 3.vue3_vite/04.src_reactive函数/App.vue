<template>
  <h1>人员姓名：{{ name }}</h1>
  <h1>人员年龄：{{ age }}</h1>
  <h3>工作种类：{{ job.type }}</h3>
  <h3>工作薪水：{{ job.salary }}</h3>
  <h3>test: {{ job.test.a.aa.aaa }}</h3>
  <h3>arr: {{ job.arr }}</h3>
  <button @click="changeInfo">修改信息</button>
</template>

<script setup>
import { ref, reactive } from "vue";
let name = ref("王五");
let age = ref(20);
let job = reactive({
  type: "前端工程师",
  salary: "30K",
  test: {
    a: {
      aa: {
        aaa: 2,
      },
    },
  },
  arr: [1, 2, 3],
});
let age_r = reactive(20);
/**
 * reactive 和 ref 都是用来定义响应式数据的 reactive更推荐去定义复杂的数据类型 ref 更推荐定义基本类型
  ref 和 reactive 本质我们可以简单的理解为ref是对reactive的二次包装, ref定义的数据访问的时候要多一个.value
  使用ref定义基本数据类型,ref也可以定义数组和对象。
 */
function changeInfo() {
  console.log(job);
  job.test.a.aa.aaa = 4;
  console.log(age, age_r); //通过 ref 定义的返回对象，通过 reactive 定义的返回值20；
  job.arr[1] = 11;
}
</script>
