<template>
  <div class="app">
    <h1>我是 App 组件</h1>
    <Child />
  </div>
</template>
<script>
import Child from "./components/Child.vue";
export default {
  name: "App",
  components: { Child },
};
</script>
<style>
.app {
  background-color: grey;
  padding: 10px;
}
</style>
