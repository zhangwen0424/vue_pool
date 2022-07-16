<template>
  <h1>求和值为：{{ count }}</h1>
  <button @click="count++">点我+1</button>
  <hr />
  <h1>当前信息为：{{ message }}</h1>
  <button @click="message += '!'">点击修改信息</button>
  <hr />
  <h1>姓名：{{ person.name }}</h1>
  <h1>年龄：{{ person.age }}</h1>
  <h1>资产：{{ person.home.num.price }}</h1>
  <button @click="person.name += '~'">修改姓名</button>
  <button @click="person.age += 1">修改年龄</button>
  <button @click="person.home.num.price += 1">修改资产</button>
</template>
<script>
import { reactive, ref, watch } from "vue";
export default {
  name: "Demo",
  setup() {
    let count = ref(0);
    let message = ref("hello");
    let person = ref({
      name: "张三",
      age: 16,
      home: {
        num: {
          price: 25,
        },
      },
    });
    console.log(person);
    // reactive时：Proxy {name: '张三', age: 16, home: {…}}
    // ref时: RefImpl {__v_isShallow: false, dep: undefined, __v_isRef: true, _rawValue: {…}, _value: Proxy}

    //情况一：监视ref所定义的一个响应式数据
    /* watch(
      count,
      (newValue, oldValue) => {
        console.log("count改变了:", newValue, oldValue); //count改变了: 0 undefined
      },
      { immediate: true }
    ); */

    //情况二：监视ref所定义的多个响应式数据
    /* watch(
      [count, message],
      (newValue, oldValue) => {
        console.log("count或者 message改变了:", newValue, oldValue);
        //count或者 message改变了: [0, 'hello'] []
      },
      { immediate: true }
    ); */

    /*
      情况三：监视reactive所定义的一个响应式数据的全部属性
          1.注意：此处无法正确的获取oldValue
          2.注意：强制开启了深度监视（deep配置无效）
    */
    /* watch(
      person,
      (newValue, oldValue) => {
        console.log("person改变了", newValue, oldValue);
        //person改变了 Proxy {name: '张三~', age: 16, home: {…}} Proxy {name: '张三~', age: 16, home: {…}}
      },
      { deep: false }
    ); //此处的deep配置无效，deep为false 修改里面的值会调用 */

    //情况四：监视reactive所定义的一个响应式数据中的某个属性
    /*  watch(
      () => person.name,
      (newValue, oldValue) => [console.log("person改变了", newValue, oldValue)] //person改变了 张三~ 张三
    ); */

    //情况五：监视reactive所定义的一个响应式数据中的某些属性
    /* watch([() => person.name, () => person.age], (newValue, oldValue) => {
      console.log("person改变了", newValue, oldValue); //person改变了 (2) ['张三', 17] (2) ['张三', 16]
    }); */

    /* 特殊情况：
        监听的是对象中的基本属性oldValue 可以捕获到，
        监听的是对象中的对象配置{ deep: true }其中任意属性变化watch 函数调用，{deep: false}任意属性变化函数不调用
    */
    /*  watch(
      () => person.home.num.price,
      (newValue, oldValue) => {
        console.log("person改变了", newValue, oldValue); //person改变了 26 25
      }
    ); */
    watch(
      () => person.home,
      (newValue, oldValue) => {
        console.log("person改变了", newValue, oldValue);
      },
      { deep: true } //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
    );

    return {
      count,
      message,
      person,
    };
  },
};
</script>
