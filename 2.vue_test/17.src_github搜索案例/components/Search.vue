<template>
  <div>
    <section class="jumbotron">
      <h3 class="jumbotron-heading">Search Github Users</h3>
      <div>
        <input type="text" placeholder="enter the name you search"
          v-model="keywords"
          />&nbsp;
        <button @click="searchUsers">Search</button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Search',
  data () {
    return {
      keywords: "",
    }
  },
  methods: {
    // 搜索用户列表
    searchUsers(){
      this.$bus.$emit("updateStatus", {isFirst:false,loading:true})
      // 获取github列表
      axios.get(`https://api.github.com/search/users?q=${this.keywords}`).then(
        response=>{
          console.log('请求成功了！', response)
          this.$bus.$emit('updateStatus', {users: response.data.items,loading:false})
        },
        error=>{
          console.log('请求失败了！', error)
          this.$bus.$emit('updateStatus', {errMsg: error.message,loading:false});
        }
      )
    }
  },
  mounted () {

  }
}
</script>

<style scoped>

</style>
