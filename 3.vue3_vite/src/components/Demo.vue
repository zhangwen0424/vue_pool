<template>
  <h1>我是 Demo 组件</h1>
  <h2>人员信息</h2>
  <h2>姓名：{{ name }}</h2>
  <h2>App组件中 msg 信息：{{ msg }}</h2>
  <!-- 具名插槽 -->
  <slot name="b"></slot>
  <!-- 作用域插槽 -->
  <slot name="a" :slot_data="slot_data">{{ a.test_a }}</slot>
  <button @click="test">按钮</button>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Demo",
  // 可以直接这样接收props 中的值
  props: ["msg"],
  // 可以直接这样接收context 中的值
  emit: ["showMsg"],
  // 可以直接这样接收context 中的值
  slots: ["a", "b"],
  setup(props, context) {
    console.log("Demo:", props, context);
    const { attrs, emit, slots } = context;

    // 定义子组件数据
    const name = ref("张三");
    // 定义子组件插槽数据
    const slot_data = { wether: "威风" };

    // 子组件按钮点击事件，触发父组件事件
    function test() {
      console.log("Demo test");
      emit("showMsg", name.value);
    }

    return {
      name,
      slot_data,
      test,
    };
  },
};
</script>
