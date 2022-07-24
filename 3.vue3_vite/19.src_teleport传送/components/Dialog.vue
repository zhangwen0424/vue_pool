<template>
  <button @click="show = true">点我弹窗</button>
  <teleport to="body">
    <div v-show="show" class="mask">
      <div class="dialog">
        <h1>我是一个弹窗</h1>
        <button @click="show = false">关闭弹窗</button>
      </div>
    </div>
  </teleport>
</template>
<script>
import { ref } from "vue";
export default {
  name: "Dialog",
  setup() {
    let show = ref(true);
    return { show };
  },
};
</script>
<style>
/* 蒙版 */
.mask {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgb(0, 0, 0, 0.5);
}
/* 弹窗 */
.dialog {
  width: 300px;
  height: 200px;
  background-color: rgb(0, 255, 0);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
