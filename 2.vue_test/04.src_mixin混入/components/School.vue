<template>
  <div>
    <p>学校名称：{{name}}</p>
    <button @click="showName">点我显示名字</button>
  </div>
</template>

<script>
// import { mixin_b } from '../mixin'
export default {
  name: 'School',
  data () {
    return {
      name:'南阳理工学院'
    }
  },
  // mixins: [mixin_b],
  methods: {

  },
  mounted () {

  }
}
</script>

<style scoped>

</style>
