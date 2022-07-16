<template>
  <h1>个人信息：</h1>
  姓：<input type="text" v-model="person.firstName" /> <br />
  名：<input type="text" v-model="person.lastName" /> <br />
  <span>全名：{{ person.fullName }}</span
  ><br />
  更改全名：<input type="text" v-model="person.fullName" />
</template>
<script>
import { computed, reactive } from "vue";
export default {
  name: "Demo",
  setup() {
    let person = reactive({
      firstName: "",
      lastName: "",
    });
    //计算属性——简写（没有考虑计算属性被修改的情况）
    // person.fullName = computed(() => {
    //   return person.firstName + "-" + person.lastName;
    // });
    //计算属性——完整写法（考虑读和写）
    person.fullName = computed({
      get() {
        return person.firstName + "-" + person.lastName;
      },
      set(value) {
        let name = value.split("-");
        person.firstName = name[0];
        person.lastName = name[1];
        console.log("value", value);
      },
    });
    //返回一个对象（常用）
    return { person };
  },
};
</script>
