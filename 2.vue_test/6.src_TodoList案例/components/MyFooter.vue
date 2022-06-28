<!--
 * @Date: 2021-10-21 22:55:48
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-10-24 22:18:55
 * @FilePath: /vue_test/src/components/MyFooter.vue
-->
<template>
  <div class="todo-footer" v-if="todos.length">
    <label>
      <input type="checkbox" v-model="isAll"/>
    </label>
    <span> <span>已完成{{doneTotal}}</span> / 全部{{total}} </span>
    <button class="btn btn-danger" @click="clearAllTodo()">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['todos','checkAll','clearAllTodo'],
  computed: {
    total(){
      return this.todos.length
    },
    doneTotal(){
      //此处使用reduce方法做条件统计
      /* const x = this.todos.reduce((pre,current)=>{
        console.log('@',pre,current)
        return pre + (current.done ? 1 : 0)
      },0)
      return x; */
      console.log("done")
      //简写
      return this.todos.reduce((pre,todo)=>pre+(todo.done?1:0),0)
    },
    isAll: {
      //全选框是否勾选
      get(){
        return this.todos.length == this.doneTotal&&this.total>0;
      },
      //isAll被修改时set被调用
      set(value){
        this.checkAll(value);
      }
    }
  }
}
</script>

<style scoped>
  /*footer*/
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>
