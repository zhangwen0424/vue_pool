<template>
  <h1>当前和为：{{ count }}</h1>
  <button @click="count++">点我+1</button>
</template>
<script>
import {
  onUnmounted,
  onUpdated,
  onBeforeUpdate,
  onBeforeMount,
  onMounted,
  ref,
  onBeforeUnmount,
} from "vue";
export default {
  name: "Demo",
  //通过组合式API的形式去使用生命周期钩子
  setup() {
    console.log("setup");
    let count = ref(0);
    onBeforeMount(() => {
      console.log("onBeforeMount");
    });
    onMounted(() => {
      console.log("onMounted");
    });
    onBeforeUpdate(() => {
      console.log("onbeforeUpdate");
    });
    onUpdated(() => {
      console.log("onUpdated");
    });
    onBeforeUnmount(() => {
      console.log("onBeforeUnmount");
    });
    onUnmounted(() => {
      console.log("onUnmounted");
    });
    return { count };
  },

  //通过配置项的形式使用生命周期钩子
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
};
</script>
