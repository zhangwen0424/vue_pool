<template>
  <div>{{ state }}</div>
  <button @click="func1">修改</button>
  <hr />
  <div>{{ st }}</div>
  <button @click="func2">修改</button>
  <hr />
  person: {{ person }}
  <h1>姓名：{{ name }}</h1>
  <h1>年龄：{{ age }}</h1>
  <h1>资产：{{ home.num.price }}</h1>
  <button @click="name += '~'">修改姓名</button>
  <button @click="age++">修改年龄</button>
  <button @click="home.num.price++">修改资产</button>
  <hr />
  <h1>x: {{ x.y }}</h1>
  <button @click="x.y++">修改 y 的值</button>
  <button @click="x = { y: 88 }">重置 y 的值</button>
</template>

<script>
import { trigger, triggerRef } from "@vue/reactivity";
import { shallowRef, shallowReactive, toRefs, reactive } from "vue";
export default {
  name: "Demo",
  setup() {
    //只考虑第一层数据的响应式，name 和 age 为响应式，price 不响应
    const person = shallowReactive({
      // const person = reactive({
      name: "张三",
      age: 20,
      home: {
        num: {
          price: 23,
        },
      },
    });

    const x = shallowRef({
      y: 1,
    });
    console.log("******", x);

    //默认情况它只能够监听数据的第一层。如果想更改多层的数据，你必须先更改第一层的数据。然后在去更改其他层的数据。这样视图上的数据才会发生变化
    let state = shallowReactive({
      a: "a",
      b: {
        b1: "b1",
        c: {
          c1: "c1",
          d1: {
            e1: "e1",
            f1: {
              f1: "f1",
            },
          },
        },
      },
    });
    function func1() {
      console.log(state); //只有第一层
      console.log(state.b.b1);
      console.log(state.b.c);
      console.log(state.b.c.d1);
      console.log(state.b.c.d1.f1);
      //  直接更改其他层的数据，会失败的哈
      // state.b.c.d1.f1.f1 = "f1f1f1f1";

      // 先更改第一层，然后在更改其他层就会成功
      // state.a = "啊啊啊";
      // state.b.c.d1.f1.f1 = "f1f1f1f1";
    }

    // 如果是通过 shallowRef 创建的数据。那么 Vue 监听的是.value 变化。并不是第一层的数据的变化。因此如果要更改 shallowRef 创建的数据。应该 xxx.value={}
    let st = shallowRef({
      a: "a",
      b: {
        b1: "b1",
        c: {
          c1: "c1",
          d1: {
            e1: "e1",
            f1: {
              f1: "f1",
            },
          },
        },
      },
    });
    function func2() {
      // 1. 通过 state.value的方式直接去更改
      st.value = {
        a: "我是a",
        b: {
          b1: "我是b1",
          c: {
            c1: "我是c1",
            d1: {
              e1: "我是e1",
              f1: {
                f1: "f1",
              },
            },
          },
        },
      };
      // 2. 通过triggerRef 直接更改你需要修改某一层的数据使用下面的语句会生效，只能用于 shallowRef，不能用于 shallowReactive
      // st.value.b.c.d1.e1 = "e1e1e1e1";
      // triggerRef(st);
    }

    return {
      person,
      x,
      state,
      func1,
      st,
      func2,
      ...toRefs(person),
    };
  },
};
</script>
