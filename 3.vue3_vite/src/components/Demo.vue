<template>
  <h1>我是 Demo 组件</h1>
  <h2>人员信息</h2>
  <h2>姓名：{{ name }}</h2>
  <h2>信息：{{ msg }}</h2>
  <slot name="a">{{ a.test_a }}</slot>
  <button @click="test">按钮</button>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Demo",
  // 可以直接这样接收props 中的值
  props: ["msg"],
  // 可以直接这样接收context 中的值
  emit: ["test"],
  slots: ["a", "b"],
  setup(props, context) {
    console.log("Demo:", props, context);
    const { attrs, emit, slots } = context;
    console.log("Demo:", slots, attrs);
    const name = ref("张三");
    function test() {
      emit("showMsg");
    }
    return { name, test };
  },
};
</script>
