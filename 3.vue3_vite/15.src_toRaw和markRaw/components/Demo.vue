<template>
  <h1>姓名：{{ name }}</h1>
  <h1>年龄：{{ age }}</h1>
  <h1>薪资：{{ job.j1.salary }}k</h1>
  <h1 v-show="person.car">座架信息：{{ person.car }}</h1>
  <button @click="name += '~'">改名字</button>
  <button @click="age++">改年龄</button>
  <button @click="job.j1.salary++">涨薪</button>
  <button @click="showRowPerson">输出原始 person</button>
  <button @click="addCar">添加一辆车</button>
  <div v-show="person.car">
    <button @click="person.car.type += '!'">换车名</button>
    <button @click="changePrice">换价格</button>
  </div>
</template>
<script>
import { reactive, toRefs, toRaw, markRaw } from "vue";

export default {
  name: "Demo",
  setup(props) {
    let person = reactive({
      name: "张三",
      age: 22,
      job: {
        j1: {
          salary: 23,
        },
      },
    });
    // 打印 person 信息
    function showRowPerson() {
      const p = toRaw(person);
      p.age++; //这里数据被修改了，但是页面不是响应式的了
      console.log(p);
    }
    // 添加一辆车
    function addCar() {
      let car = { type: "奔驰", price: 24 };
      person.car = markRaw(car); //这里需要在 return 中把 person 暴露出去，因为person属性里面没有 car 属性
    }
    // 更改价格
    function changePrice() {
      person.car.price++;
      console.log(person.car.price); // 这里数据被修改了，但是页面不是响应式的了
    }

    return {
      ...toRefs(person),
      person,
      showRowPerson,
      addCar,
      changePrice,
    };
  },
};
</script>
