<!--
 * @Date: 2021-10-21 22:55:00
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-10-30 14:35:41
 * @FilePath: /vue_test/src/components/MyItem.vue
-->
<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)"/>
      <span>{{todo.name}}</span>
    </label>
    <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
  </li>
</template>

<script>
export default {
  name: 'MyItem',
  props: ['todo'],
  methods: {
    handleCheck(id) {
      console.log("myitem",id)
      // this.changeTodo(id);
      this.$bus.$emit('changeTodo',id)
    },
    handleDelete(id){
      // this.deleteTodo(id);
      this.$bus.$emit('deleteTodo', id);
    }
  }
}
</script>

<style scoped>
  /*item*/
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    display: none;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }

  li:hover button{
    display: block;
  }
</style>
