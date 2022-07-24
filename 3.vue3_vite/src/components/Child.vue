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
  async setup() {
    let sum = ref(0);
    // return { sum };
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ sum });
      }, 1000);
    });
  },
};
</script>
<style>
.child {
  background-color: yellow;
  padding: 10px;
}
</style>
