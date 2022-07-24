<template>
  <div class="son">
    <h1>我是 Son 组件</h1>
    <Dialog />
  </div>
</template>
<script>
import Dialog from "./Dialog.vue";
export default {
  name: "Son",
  components: { Dialog },
};
</script>
<style>
.son {
  background-color: red;
  padding: 10px;
}
</style>
