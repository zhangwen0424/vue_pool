<template>
  <div class="app">
    <h1>我是 App组件</h1>
    <!-- 用suspense包裹异步组件 -->
    <suspense>
      <!-- 组件显示正常时加载 -->
      <template v-slot:default>
        <Child />
      </template>
      <!-- 组件显示缓慢时加载 -->
      <template v-slot:fallback>
        <h5>正在加载中...</h5>
      </template>
    </suspense>
  </div>
</template>
<script>
//静态引入
// import Child from "./components/Child.vue";

//异步引入
import { defineAsyncComponent } from "vue";
const Child = defineAsyncComponent(() => import("./components/Child.vue"));

export default {
  name: "App",
  components: { Child },
};
</script>
<style>
.app {
  background-color: skyblue;
  padding: 10px;
}
</style>
