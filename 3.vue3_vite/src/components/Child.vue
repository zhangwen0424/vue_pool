<template>
  <div class="child">
    <h1>我是 Child组件</h1>
    {{ sum }}
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "Child",
  // 支持 async await 语法
  async setup() {
    let sum = ref(0);
    // return { sum };
    let p = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ sum });
      }, 1000);
    });
    return await p;
  },
};
</script>
<style>
.child {
  background-color: yellow;
  padding: 10px;
}
</style>
