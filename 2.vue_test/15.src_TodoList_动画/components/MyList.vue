<!--
 * @Date: 2021-10-21 22:55:13
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-02 17:02:55
 * @FilePath: /vue_test/15.src_TodoList_动画/components/MyList.vue
-->
<template>
  <ul class="todo-main" v-if="todos.length">
    <transition-group name="myAnimate">
      <MyItem 
        v-for="todo in todos" 
        :key="todo.id"
        :todo="todo"/>
    </transition-group>
  </ul>
</template>

<script>
import MyItem from '../components/MyItem'
export default {
  name: 'MyList',
  components: {MyItem},
  //声明接收App传递过来的数据，其中todos是自己用的，checkTodo和deleteTodo是给子组件MyItem用的
  props: ['todos'],
  
}
</script>

<style scoped>
  /*main*/
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }
  .myAnimate-enter-active {
    animation: myAn 0.5s ease;
  } 
  .myAnimate-leave-active {
    animation: myAn 0.5s ease reverse;
  }
  @keyframes myAn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0px);
    }
  }
</style>
