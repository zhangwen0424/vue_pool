/*
 * @Date: 2021-11-08 16:13:11
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-08 16:30:25
 * @FilePath: /vue_test/24.src_求和案例_模块化编码/store/count.js
 */
export default {
  namespaced:true,
  actions:{
    incrementOdd(context,value) {
      console.log("actions",context,value)
      if(value%2){
          context.commit('JIA', value);
        }
    },
    incrementWait(context,value){
      console.log("action",context, value);
      setTimeout(() => {
        context.commit("JIA", value);
      }, 1000);
    }
  },
  mutations:{
    // state中有可操作的数据，state中每个数据有setter和getter进行数据追踪
    JIA(state, value){
      console.log("mutations",state,value)
      state.sum += value;
    },
    JIAN(state, value){
      console.log("mutations", state);
      state.sum -= value;
    },
  },
  state:{
    sum: 0,
    school: '南阳理工',
    address: '南阳',
  },
  getters:{
    bigSum(state){
      return state.sum*10;
    }
  }
}