<template>
  <div>
    <p>学校名称：{{name}}</p>
    <button @click="sendSchoolName">点我显示名字</button>
  </div>
</template>

<script>
export default {
  name: 'School',
  data() {
    return {
      name: '南阳理工学院'
    }
  },
  props: ['getSchoolName'],
  methods: {
    sendSchoolName(){
      this.getSchoolName(this.name);
    }
  }
}
</script>
