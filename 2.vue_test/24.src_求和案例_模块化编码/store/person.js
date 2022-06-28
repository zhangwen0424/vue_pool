/*
 * @Date: 2021-11-08 16:13:06
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-08 16:22:01
 * @FilePath: /vue_test/24.src_求和案例_模块化编码/store/person.js
 */
export default {
  namespaced: true,
  actions: {},
  mutations: {
    ADD_PERSON(state, value){
      state.personList.unshift(value);
    }
  },
  state: {
    personList: [],
  },
  getters: {} 
}