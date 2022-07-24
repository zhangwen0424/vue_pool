<template>
  <div class="child">
    <h1>我是 Child组件（子）</h1>
    <Son />
  </div>
</template>
<script>
import Son from "./Son.vue";
export default {
  name: "Child",
  components: { Son },
};
</script>
<style>
.child {
  background-color: skyblue;
  padding: 10px;
}
</style>
