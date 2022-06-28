<template>
  <div>
    <div class="row">
      <div class="card" v-show="info.users.length" v-for="user in info.users" :key="user.login">
        <a href="info.html_url" target="_blank">
          <img src="info.avatar_url" style='width: 100px'/>
        </a>
        <p class="card-text">{{info.login}}</p>
      </div>
      <h1 v-show="info.isFirst">欢迎来到我的搜索！</h1>
      <h1 v-show="info.loading">正在加载请稍后</h1>
      <h1 v-show="info.errMsg">{{info.errMsg}}</h1>
    </div>
  </div>
</template>

<script>
import 'animate.css'
export default {
  name: 'Test',
  data () {
    return {
      info: {
        isFirst: true,
        loading: false,
        errMsg: '',
        users: [],
      }
    }
  },
  mounted(){
    this.$bus.$on('updateStatus', dataObj=>{
      console.log("收到了数据,dataObj:", dataObj)
      this.info = {...this.info, ...dataObj}
    })
  }
}
</script>
<style scoped>
.card {
  float: left;
  width: 33.333%;
  padding: .75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: .75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
} 
</style>
