<template>
  <button @click="isShowDemo = !isShowDemo">点击切换 Demo 的显示和隐藏</button
  ><Demo v-if="isShowDemo" />
</template>
<script>

import { ref } from "vue";
import Demo from "./components/Demo.vue";
export default {
  name: "App",
  components: { Demo },
  setup() {
    let isShowDemo = ref(true);
    return { isShowDemo };
  },
};
</script>
