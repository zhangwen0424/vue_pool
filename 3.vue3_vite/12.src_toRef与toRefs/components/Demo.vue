<template>
  <h1>{{ person }}</h1>
  <h1>姓名：{{ person.name }} - {{ name }} - {{ x }} - {{ y }}</h1>
  <h1>年龄：{{ person.age }} - {{ age }}</h1>
  <h1>资产：{{ person.home.num.price }} - {{ home.num.price }}</h1>
  <button @click="person.name += '~'">修改姓名</button>
  <button @click="person.age += 1">修改年龄</button>
  <button @click="person.home.num.price++">修改资产</button>
</template>

<script>
import { reactive, toRef, toRefs } from "vue";
export default {
  name: "Demo",
  setup() {
    const person = reactive({
      name: "张安",
      age: 23,
      home: {
        num: {
          price: 12,
        },
      },
    });
    // 此处 x 不是响应式的，y 是响应式的
    // toRef 相当于把对象中的属性结构出来使用，toRefs 是批量结构对象属性
    let x = person.name;
    let y = toRef(person, "name");
    console.log("x,y", x, y); //x,y 张安 ObjectRefImpl {_object: '张安', _key: undefined, _defaultValue: undefined, __v_isRef: true}

    return { person, x, y, ...toRefs(person) };
  },
};
</script>
