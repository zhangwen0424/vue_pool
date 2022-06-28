<template>
  <div>
    <p>学生姓名：{{name}}</p>
    <p>学生年龄：{{age}}</p>
    <button @click="showName">点我显示名字</button>
    <button @click="unbind">解绑自定义事件</button>
    <button @click="death">销毁组件</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'mornki',
      age: 18
    }
  },
  methods: {
    showName(){
      //触发Student组件实例身上的自定义事件
      this.$emit('customEvent', this.name, 'a','b')
    },
    unbind(){
      // this.$off(['customEvent','test']) //解绑多个自定义事件
      this.$off() //解绑所有的自定义事件
    },
    death(){
      this.$destroy();
    }
  },
}
</script>

<style scoped>

</style>
