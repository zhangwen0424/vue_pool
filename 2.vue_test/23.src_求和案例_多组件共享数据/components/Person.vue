<!--
 * @Date: 2021-11-08 15:59:00
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-08 16:09:32
 * @FilePath: /vue_test/23.src_求和案例_多组件共享数据/components/Person.vue
-->
<template>
  <div>
    <h1>人员列表</h1>
    <h1 style="color:red">Count组件的和为：{{sum}}</h1>
    <input type="text" v-model="name" placeholder="请输入名字">
    <button @click="addPerson">添加</button>
    <ul>
      <li v-for="p in personList" :key="p.id">{{p.name}}</li>
    </ul>
  </div>
</template>

<script>
import { nanoid } from 'nanoid';
import {mapState} from 'vuex'
export default {
  name: '',
  data () {
    return {
      name: '',
    }
  },
  computed: {
    ...mapState(['personList','sum'])
  },
  methods: {
    addPerson(){
      let personObj = {id:nanoid(),name:this.name}
      this.$store.commit('ADD_PERSON', personObj);
      this.name = ""
    }
  },
}
</script>
