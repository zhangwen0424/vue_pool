<template>hello</template>
<script>
import {
  isProxy,
  isReactive,
  isReadonly,
  isRef,
  reactive,
  readonly,
  ref,
} from "@vue/reactivity";
export default {
  name: "App",
  setup() {
    let data = reactive({ name: "张三", age: 22 });
    let a = ref(0);
    let c = readonly(data);
    console.log(isRef(a)); //true
    console.log(isReactive(data)); //true
    console.log(isReadonly(c)); //true
    console.log(isProxy(a)); //false
    console.log(isProxy(c)); //true
    console.log(isProxy(data)); //true
  },
};
</script>
