<!--
 * @Date: 2021-10-21 22:55:00
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-01 13:31:36
 * @FilePath: /vue_test/src/components/MyItem.vue
-->
<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)"/>
      <span v-show="!todo.isEdit">{{todo.name}}</span>
      <input type="text" 
        v-show="todo.isEdit"
        ref="todoTitle"
        @blur="handleBlur(todo,$event)"
        @keydown.enter="handleBlur(todo,$event)"
        :value="todo.name"
      />
    </label>
    <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
    <button class="btn btn-info" @click="handleEdit(todo)">编辑</button>
  </li>
</template>

<script>
import pubsub from 'pubsub-js'

export default {
  name: 'MyItem',
  props: ['todo'],
  methods: {
    handleCheck(id) {
      console.log("myitem",id)
      // this.changeTodo(id);
      this.$bus.$emit('changeTodo',id)
    },
    handleEdit(todo){
      console.log("this", this)
      // 判断有无属性，有则更改，无则添加响应式属性
      if(Object.prototype.hasOwnProperty.call(todo,'isEdit')) {
        todo.isEdit = true;
      } else {
        this.$set(todo, 'isEdit', true);
      }
      this.$nextTick(function (){
        this.$refs.todoTitle.focus();
      })
    },
    handleBlur(todo,$event){
      // todo.isEdit = false;
      // todo.name = $event.target.value;
      this.$bus.$emit('updateTodo', todo.id, {
        name: $event.target.value,
        isEdit: false
      });
    },
    handleDelete(id){
      // this.deleteTodo(id);
      // this.$bus.$emit('deleteTodo', id);
      pubsub.publish('deleteTodo', id)
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
    margin-left:10px;
  }
  
</style>
