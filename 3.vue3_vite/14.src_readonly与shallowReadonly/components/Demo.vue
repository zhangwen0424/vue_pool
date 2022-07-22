<template>
  <h1>求和：{{ count }}</h1>
  <button @click="count++">点我+1</button>
  <hr />
  <h1>姓名：{{ name }}</h1>
  <h1>年龄：{{ age }}</h1>
  <h1>资产：{{ home.num.price }}</h1>
  <button @click="name += '!'">修改姓名</button>
  <button @click="age++">修改年龄</button>
  <button @click="home.num.price++">修改资产</button>
</template>
<script>
import { ref, reactive, toRefs, readonly, shallowReadonly } from "vue";
export default {
  name: "Demo",
  setup() {
    let count = ref(0);
    let person = reactive({
      name: "张三",
      age: 22,
      home: {
        num: {
          price: 22,
        },
      },
    });
    person = readonly(person); //全部属性不可改
    // person = shallowReadonly(person);//home中的属性可以修改
    // count = readonly(count);
    // count = shallowReadonly(count);

    return {
      count,
      ...toRefs(person),
    };
  },
};
</script>
