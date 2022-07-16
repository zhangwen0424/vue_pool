<template>
  <h1>求和值为：{{ count }}</h1>
  <button @click="count++">点我+1</button>
  <hr />
  <h1>当前信息为：{{ message }}</h1>
  <button @click="message += '!'">点击修改信息</button>
  <hr />
  <h1>姓名：{{ person.name }}</h1>
  <h1>年龄：{{ person.age }}</h1>
  <h1>资产：{{ person.home.num.price }}</h1>
  <button @click="person.name += '~'">修改姓名</button>
  <button @click="person.age += 1">修改年龄</button>
  <button @click="person.home.num.price += 1">修改资产</button>
</template>
<script>
import { reactive, ref, watch, watchEffect } from "vue";
export default {
  name: "Demo",
  setup() {
    let count = ref(0);
    let message = ref("hello");
    let person = reactive({
      name: "张三",
      age: 16,
      home: {
        num: {
          price: 25,
        },
      },
    });
    /* watch(
      count,
      (newValue, oldValue) => {
        console.log("count改变了:", newValue, oldValue); //count改变了: 0 undefined
      },
      { immediate: true }
    ); */

    //watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。初始化时默认会执行一遍
    watchEffect(() => {
      const x1 = person.name;
      const x2 = count.value;
      console.log("watchEffect所指定的回调执行了", x1, x2); // 初始化后打印：watchEffect所指定的回调执行了 张三 0
    });

    return {
      count,
      message,
      person,
    };
  },
};
</script>
