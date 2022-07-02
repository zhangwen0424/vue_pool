<template>
  <div>
    <p>学生姓名：{{name}}</p>
    <p>学生年龄：{{age}}</p>
    <button @click="showName">点我显示名字</button>
  </div>
</template>

<script>
import { mixin_a, mixin_b } from "../mixin"
export default {
  data () {
    return {
      name: 'mornki',
      age: 18
    }
  },
  methods: {

  },
  mixins: [mixin_a, mixin_b]
}
</script>

<style scoped>

</style>
