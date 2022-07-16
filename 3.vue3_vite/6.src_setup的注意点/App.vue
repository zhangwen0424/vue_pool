<template>
  <Demo @showMsg="showMsg" msg="App中国">
    <template v-slot:a="ad">
      <div>我是App组件插槽a，我接收到的数据为：{{ ad }}</div>
    </template>
    <template v-slot:b>我是App组件插槽b</template>
  </Demo>
</template>
<script>
import Demo from "./components/Demo.vue";
export default {
  components: { Demo },
  name: "App",
  setup() {
    function showMsg(value) {
      console.log("App showMsg! hello,", value);
    }
    return { showMsg };
  },
};
</script>
