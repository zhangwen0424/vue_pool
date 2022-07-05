<template>
  <h1>人员姓名：{{ name }}</h1>
  <h1>人员年龄：{{ age }}</h1>
  <button @click="sayHello">sayHello</button>
</template>

<!-- 写法 1 -->
<!-- <script>
export default {
  name: "App",
  data() {
    return { name: "张三", age: 18 };
  },
  methods: {
    sayHello() {
      console.log("hello");
    },
  }
};
</script> -->

<!-- 写法 2 -->
<!-- <script>
import { h } from "vue";
export default {
  name: "App",
  //此处只是测试一下setup，暂时不考虑响应式的问题。不能加 async
  setup() {
    const name = "王五";
    const age = 20;
    function sayHello() {
      console.log("hello");
    }
    //返回一个对象（常用）
    return { name, age, sayHello };
    //返回一个函数（渲染函数）
    // return () => h("h1", "您好！");
  },
};
</script> -->

<!-- 写法 3 -->
<script setup>
const name = "王五1";
const age = 201;
console.log("this", this);
function sayHello() {
  console.log("您好啊！");
}
</script>
