<template>
  <div>
      <h2>我是About的内容</h2>
  </div>
</template>

<script>
export default {
  name: 'About',
  mounted () {
    console.log("About mounted!")
  },
  beforeDestroy(){
    console.log("About beforeDestroy")
  }
}
</script>

