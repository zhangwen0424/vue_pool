<template>
  <div class="son">我是 Son 组件（孙）{{ name }} - {{ price }}</div>
</template>
<script>
import { inject } from "@vue/runtime-core";
import { toRefs } from "vue";
export default {
  name: "Son",
  setup() {
    let car = inject("car");
    return { ...toRefs(car) };
  },
};
</script>
<style>
.son {
  background-color: orange;
  padding: 10px;
}
</style>
