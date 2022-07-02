<template>
  <div>
    <p>学校名称：{{name}}</p>
    <p>学校地址：{{ adress}}</p>
    <!-- <button @click="test">点我显示名字</button> -->
  </div>
</template>

<script>
export default {
  name: 'School',
  data () {
    return {
      name:'南阳理工学院',
      adress: '南阳'
    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>

<style scoped>

</style>
