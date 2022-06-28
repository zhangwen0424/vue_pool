<template>
  <div>
    <!-- 单个元素 -->
    <button @click="isShow = !isShow">点击我显示和隐藏</button>
    <transition name="hello" appear>
      <h1 v-show="isShow">你好，欢迎光临！</h1>
    </transition>
    <hr/>
    <!-- 多个元素 -->
    <button @click="isShowList = !isShowList">点击我显示和隐藏</button>
    <transition-group name="study" appear>
      <h1 v-show="isShowList" key='1'>学js</h1>
      <h1 v-show="isShowList" key='2'>学css</h1>
      <h1 v-show="isShowList" key='3'>学vue</h1>
    </transition-group>
    <hr/>
    <!-- 引入动画组件库 -->
    <button @click="isShowEle = !isShowEle">点击我显示和隐藏</button>
    <transition-group 
      appear
      name="animate__animated animate__bounce" 
      enter-active-class="animate__swing"
      leave-active-class="animate__backOutUp"
    >
      <h1 v-show="!isShowEle" key="1">你好啊！</h1>
      <h1 v-show="isShowEle" key="2">mornki</h1>
    </transition-group>
  </div>
</template>

<script>
// 使用animate组件库
import 'animate.css'
export default {
  name: 'Test',
  data () {
    return {
      isShow:true,
      isShowList: true,
      isShowEle: true,
    }
  },
}
</script>
<style scoped>
  h1 {
    background-color: yellow;
    width: 400px;
  }
  /* 单个元素 */
  .hello-enter-active {
    animation: myIn 1s linear;
  }
  .hello-leave-active {
    animation: myIn 2s ease-out reverse;
  }
  @keyframes myIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0px);
    }
  }

  /* 多个元素 */
  /* 进入的起点，离开的终点 */
  .study-enter, .study-leave-to {
    transform: translateX(-100%);
  }
  .study-enter-active, .study-leave-active {
    transition: 1.5s linear;
  }
  /* 进入的终点, 离开的起点 */
  .study-enter-to, .study-leave {
    transform: translateX(0px);
  }
</style>