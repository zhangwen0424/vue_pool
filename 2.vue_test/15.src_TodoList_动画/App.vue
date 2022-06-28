<template>
  <div id="app">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader :todos="todos" :addTodo="addTodo"/>
        <!-- <MyList :todos="todos" :changeTodo="changeTodo" :deleteTodo="deleteTodo"/> -->
        <MyList :todos="todos"/>
        <MyFooter :todos="todos" :checkAll="checkAll" :clearAllTodo="clearAllTodo"/>
      </div>
    </div>
  </div>
</template>
<script>
import MyHeader from './components/MyHeader.vue'
import MyList from './components/MyList.vue'
import MyFooter from './components/MyFooter.vue'
import pubsub from 'pubsub-js'

export default {
  name: "App",
  data(){
    return {
      todos: [
        {id: '001',name: '看书', done: false},
        {id: '002',name: '写字', done:  true},
        {id: '003',name: '学习', done:  true}
      ],
    }
  },
  components: {
    MyHeader,
    MyList,
    MyFooter
  },
  methods: {
    addTodo(todoObj) {
      this.todos.unshift(todoObj);
    },
    changeTodo(id){
      console.log("app",id)
      this.todos.forEach((todo)=>{
        id == todo.id && (todo.done = !todo.done)
      }) 
    },
    deleteTodo(msgName,id){
      this.todos = this.todos.filter((todo)=>{ return todo.id != id})
    },
    checkAll(value){
      this.todos.forEach((todo)=>{
        todo.done = value;
      })
    },
    clearAllTodo(){
      this.todos = this.todos.filter((todo)=>{
        return !todo.done;
      })
    }
  },
  mounted(){
    this.$bus.$on('changeTodo', this.changeTodo);
    // this.$bus.$on('deleteTodo', this.deleteTodo);
    this.pid = pubsub.subscribe('deleteTodo', this.deleteTodo)
    console.log(this);
  },
  beforeDestroy(){
    this.$bus.$off(['changeTodo','deleteTodo'])
    pubsub.unsubscribe(this.pid)
  }
};
</script>
<style lang="css">
  /*base*/
  body {
    background: #fff;
  }

  .btn {
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }

  .btn-danger {
    color: #fff;
    background-color: #da4f49;
    border: 1px solid #bd362f;
  }

  .btn-danger:hover {
    color: #fff;
    background-color: #bd362f;
  }

  .btn:focus {
    outline: none;
  }

  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
