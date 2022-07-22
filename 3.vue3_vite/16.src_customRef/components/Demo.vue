<template>
  <input type="text" v-model="keyWord" />
  <h1>{{ keyWord }}</h1>
</template>

<script>
import { ref, customRef } from "vue";
export default {
  name: "Demo",
  setup(props) {
    //自定义一个ref——名为：myRef
    function myRef(value, delay) {
      let timer = null;
      return customRef((track, trigger) => {
        return {
          get() {
            console.log(`--读: ${value}`);
            track(); //通知Vue追踪value的变化（提前和get商量一下，让他认为这个value是有用的）
            return value;
          },
          set(newValue) {
            clearTimeout(timer);
            timer = setTimeout(() => {
              console.log(`~~写: ${newValue}`);
              value = newValue;
              trigger(); //通知Vue去重新解析模板
            }, delay);
          },
        };
      });
    }
    // let keyWord = ref("hello"); //使用Vue提供的ref
    let keyWord = myRef("hello", 500);
    return { keyWord };
  },
};
</script>
