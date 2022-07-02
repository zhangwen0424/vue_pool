/*
 * @Date: 2021-10-18 22:06:07
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-10-19 17:17:03
 * @FilePath: /vue_test/src/mixin.js
 */
export const mixin_a = {
  data(){
    return {
      x: 'xx',
      y: 'yy',
      age: 10
    }
  }
}

export const mixin_b = {
  methods: {
    showName() {
      alert(this.name);
    }
  }
}