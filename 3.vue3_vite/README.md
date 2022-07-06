# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## 1.Vue3 简介

- 2020 年 9 月 18 日，Vue.js 发布 3.0 版本，代号：One Piece（海贼王）
- 耗时 2 年多、[2600+次提交](https://github.com/vuejs/vue-next/graphs/commit-activity)、[30+个 RFC](https://github.com/vuejs/rfcs/tree/master/active-rfcs)、[600+次 PR](https://github.com/vuejs/vue-next/pulls?q=is%3Apr+is%3Amerged+-author%3Aapp%2Fdependabot-preview+)、[99 位贡献者](https://github.com/vuejs/vue-next/graphs/contributors)
- github 上的 tags 地址：https://github.com/vuejs/vue-next/releases/tag/v3.0.0

## 2.Vue3 带来了什么

### 1.性能的提升

- 打包大小减少 41%

- 初次渲染快 55%, 更新渲染快 133%

- 内存减少 54%

  ......

### 2.源码的升级

- 使用 Proxy 代替 defineProperty 实现响应式

- 重写虚拟 DOM 的实现和 Tree-Shaking

  ......

### 3.拥抱 TypeScript

- Vue3 可以更好的支持 TypeScript

### 4.新的特性

1. Composition API（组合 API）

   - setup 配置
   - ref 与 reactive
   - watch 与 watchEffect
   - provide 与 inject
   - ......

2. 新的内置组件
   - Fragment
   - Teleport
   - Suspense
3. 其他改变

   - 新的生命周期钩子
   - data 选项应始终被声明为一个函数
   - 移除 keyCode 支持作为 v-on 的修饰符
   - ......

## 一、创建 Vue3.0 工程

### 1.使用 vue-cli 创建

官方文档：https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create

```bash
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version
## 安装或者升级你的@vue/cli
npm install -g @vue/cli
## 创建
vue create vue_test
## 启动
cd vue_test
npm run serve
```

### 2.使用 vite 创建

官方文档：https://v3.cn.vuejs.org/guide/installation.html#vite

vite 官网：https://vitejs.cn

- 什么是 vite？—— 新一代前端构建工具。
- 优势如下：
  - 开发环境中，无需打包操作，可快速的冷启动。
  - 轻量快速的热重载（HMR）。
  - 真正的按需编译，不再等待整个应用编译完成。
- 传统构建 与 vite 构建对比图

<img src="https://cn.vitejs.dev/assets/bundler.37740380.png" style="width:500px;height:280px;float:left" /><img src="https://cn.vitejs.dev/assets/esm.3070012d.png" style="width:480px;height:280px" />

```bash
## yarn 创建
## 新建项目
yarn create vite my-app-project --template vue
## 进入项目目录安装依赖
yarn
## 启动项目
yarn dev

## 创建工程
npm init vite-app <project-name>
## 进入工程目录
cd <project-name>
## 安装依赖
npm install
## 运行
npm run dev
```

## 二、常用 Composition API

官方文档: https://v3.cn.vuejs.org/guide/composition-api-introduction.html

### 1.拉开序幕的 setup

1. 理解：Vue3.0 中一个新的配置项，值为一个函数。
2. setup 是所有<strong style="color:#DD5145">Composition API（组合 API）</strong><i style="color:gray;font-weight:bold">“ 表演的舞台 ”</i>。
3. 组件中所用到的：数据、方法等等，均要配置在 setup 中。
4. setup 函数的两种返回值：
   1. 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。（重点关注！）
   2. <span style="color:#aad">若返回一个渲染函数：则可以自定义渲染内容。（了解）</span>
5. 注意点：
   1. 尽量不要与 Vue2.x 配置混用
      - Vue2.x 配置（data、methos、computed...）中<strong style="color:#DD5145">可以访问到</strong>setup 中的属性、方法。
      - 但在 setup 中<strong style="color:#DD5145">不能访问到</strong>Vue2.x 配置（data、methos、computed...）。
      - 如果有重名, setup 优先。
   2. setup 不能是一个 async 函数，因为返回值不再是 return 的对象, 而是 promise, 模板看不到 return 对象中的属性。（后期也可以返回一个 Promise 实例，但需要 Suspense 和异步组件的配合）

main.js

```js
//引入的不再是Vue构造函数了，引入的是一个名为createApp的工厂函数
import { createApp } from "vue";
import App from "./App.vue";

//创建应用实例对象——app(类似于之前Vue2中的vm，但app比vm更“轻”)
createApp(App).mount("#app");
```

App.vue

```vue
<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <!-- Vue3组件中的模板结构可以没有根标签 -->
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>
```

例子：
main.js

```js
//引入的不再是Vue构造函数了，引入的是一个名为createApp的工厂函数
import { createApp } from "vue";
import App from "./App.vue";

//创建应用实例对象——app(类似于之前Vue2中的vm，但app比vm更“轻”)
const app = createApp(App);

//挂载
app.mount("#app");
```

App.vue

```vue
<template>
  <h1>人员姓名：{{ name }}</h1>
  <h1>人员年龄：{{ age }}</h1>
  <button @click="sayHello">sayHello</button>
</template>

<!-- 写法 1 -->
<!-- <script>
export default {
  name: "App",
  data() {
    return { name: "张三", age: 18 };
  },
  methods: {
    sayHello() {
      console.log("hello");
    },
  }
};
</script> -->

<!-- 写法 2 -->
<!-- <script>
import { h } from "vue";
export default {
  name: "App",
  //此处只是测试一下setup，暂时不考虑响应式的问题。不能加 async
  setup() {
    const name = "王五";
    const age = 20;
    function sayHello() {
      console.log("hello");
    }
    //返回一个对象（常用）
    return { name, age, sayHello };
    //返回一个函数（渲染函数）
    // return () => h("h1", "您好！");
  },
};
</script> -->

<!-- 写法 3 -->
<script setup>
const name = "王五1";
const age = 201;
console.log("this", this);
function sayHello() {
  console.log("您好啊！");
}
</script>
```

### 2.ref 函数

- 作用: 定义一个响应式的数据
- 语法: `const xxx = ref(initValue)`
  - 创建一个包含响应式数据的<strong style="color:#DD5145">引用对象（reference 对象，简称 ref 对象）</strong>。
  - JS 中操作数据： `xxx.value`
  - 模板中读取数据: 不需要.value，直接：`<div>{{xxx}}</div>`
- 备注：
  - 接收的数据可以是：基本类型、也可以是对象类型。
  - 基本类型的数据：响应式依然是靠`Object.defineProperty()`的`get`与`set`完成的。
  - 对象类型的数据：内部 <i style="color:gray;font-weight:bold">“ 求助 ”</i> 了 Vue3.0 中的一个新函数—— `reactive`函数。

App.vue

```vue
<template>
  <h1>人员姓名：{{ name }}</h1>
  <h1>人员年龄：{{ age }}</h1>
  <h3>工作种类：{{ job.type }}</h3>
  <h3>工作薪水：{{ job.salary }}</h3>
  <button @click="changeInfo">修改信息</button>
</template>

<script setup>
import { ref } from "vue";
let name = ref("王五");
let age = ref(20);
let job = ref({
  type: "前端工程师",
  salary: "30K",
});
//方法
function changeInfo() {
  // name.value = "李四";
  // age.value = 48;
  console.log(job.value);
  // job.value.type = "UI设计师";
  // job.value.salary = "60K";
  // console.log(name, age);
}
</script>
```

### 3.reactive 函数

- 作用: 定义一个<strong style="color:#DD5145">对象类型</strong>的响应式数据（基本类型不要用它，要用`ref`函数）
- 语法：`const 代理对象= reactive(源对象)`接收一个对象（或数组），返回一个<strong style="color:#DD5145">代理对象（Proxy 的实例对象，简称 proxy 对象）</strong>
- reactive 定义的响应式数据是“深层次的”。
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。

```vue
<template>
  <h1>人员姓名：{{ name }}</h1>
  <h1>人员年龄：{{ age }}</h1>
  <h3>工作种类：{{ job.type }}</h3>
  <h3>工作薪水：{{ job.salary }}</h3>
  <h3>test: {{ job.test.a.aa.aaa }}</h3>
  <h3>arr: {{ job.arr }}</h3>
  <button @click="changeInfo">修改信息</button>
</template>

<script setup>
import { ref, reactive } from "vue";
let name = ref("王五");
let age = ref(20);
let job = reactive({
  type: "前端工程师",
  salary: "30K",
  test: {
    a: {
      aa: {
        aaa: 2,
      },
    },
  },
  arr: [1, 2, 3],
});
let age_r = reactive(20);
/**
 * reactive 和 ref 都是用来定义响应式数据的 reactive更推荐去定义复杂的数据类型 ref 更推荐定义基本类型
  ref 和 reactive 本质我们可以简单的理解为ref是对reactive的二次包装, ref定义的数据访问的时候要多一个.value
  使用ref定义基本数据类型,ref也可以定义数组和对象。
 */
function changeInfo() {
  console.log(job);
  job.test.a.aa.aaa = 4;
  console.log(age, age_r); //通过 ref 定义的返回对象，通过 reactive 定义的返回值20；
  job.arr[1] = 11;
}
</script>
```

### 4.Vue3.0 中的响应式原理

#### vue2.x 的响应式

- 实现原理：

  - 对象类型：通过`Object.defineProperty()`对属性的读取、修改进行拦截（数据劫持）。

  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

    ```js
    Object.defineProperty(data, "count", {
      get() {},
      set() {},
    });
    ```

- 存在问题：
  - 新增属性、删除属性, 界面不会更新。
  - 直接通过下标修改数组, 界面不会自动更新。

### Vue3.0 的响应式

- 实现原理:

  - 通过 Proxy（代理）: 拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。
  - 通过 Reflect（反射）: 对源对象的属性进行操作。
  - MDN 文档中描述的 Proxy 与 Reflect：

    - Proxy：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

    - Reflect：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

      ```js
      new Proxy(data, {
        // 拦截读取属性值
        get(target, prop) {
          return Reflect.get(target, prop);
        },
        // 拦截设置属性值或添加新属性
        set(target, prop, value) {
          return Reflect.set(target, prop, value);
        },
        // 拦截删除属性
        deleteProperty(target, prop) {
          return Reflect.deleteProperty(target, prop);
        },
      });

      proxy.name = "tom";
      ```

## 5.reactive 对比 ref

- 从定义数据角度对比：
  - ref 用来定义：<strong style="color:#DD5145">基本类型数据</strong>。
  - reactive 用来定义：<strong style="color:#DD5145">对象（或数组）类型数据</strong>。
  - 备注：ref 也可以用来定义<strong style="color:#DD5145">对象（或数组）类型数据</strong>, 它内部会自动通过`reactive`转为<strong style="color:#DD5145">代理对象</strong>。
- 从原理角度对比：
  - ref 通过`Object.defineProperty()`的`get`与`set`来实现响应式（数据劫持）。
  - reactive 通过使用<strong style="color:#DD5145">Proxy</strong>来实现响应式（数据劫持）, 并通过<strong style="color:#DD5145">Reflect</strong>操作<strong style="color:orange">源对象</strong>内部的数据。
- 从使用角度对比：
  - ref 定义的数据：操作数据<strong style="color:#DD5145">需要</strong>`.value`，读取数据时模板中直接读取<strong style="color:#DD5145">不需要</strong>`.value`。
  - reactive 定义的数据：操作数据与读取数据：<strong style="color:#DD5145">均不需要</strong>`.value`。

## 6.setup 的两个注意点

- setup 执行的时机
  - 在 beforeCreate 之前执行一次，this 是 undefined。
- setup 的参数
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  - context：上下文对象
    - attrs: 值为对象，包含：组件外部传递过来，但没有在 props 配置中声明的属性, 相当于 `this.$attrs`。
    - slots: 收到的插槽内容, 相当于 `this.$slots`。
    - emit: 分发自定义事件的函数, 相当于 `this.$emit`。

## 7.计算属性与监视

### 1.computed 函数

- 与 Vue2.x 中 computed 配置功能一致

- 写法

  ```js
  import {computed} from 'vue'

  setup(){
      ...
  	//计算属性——简写
      let fullName = computed(()=>{
          return person.firstName + '-' + person.lastName
      })
      //计算属性——完整
      let fullName = computed({
          get(){
              return person.firstName + '-' + person.lastName
          },
          set(value){
              const nameArr = value.split('-')
              person.firstName = nameArr[0]
              person.lastName = nameArr[1]
          }
      })
  }
  ```

### 2.watch 函数

- 与 Vue2.x 中 watch 配置功能一致

- 两个小“坑”：

  - 监视 reactive 定义的响应式数据时：oldValue 无法正确获取、强制开启了深度监视（deep 配置失效）。
  - 监视 reactive 定义的响应式数据中某个属性时：deep 配置有效。

  ```js
  //情况一：监视ref定义的响应式数据
  watch(
    sum,
    (newValue, oldValue) => {
      console.log("sum变化了", newValue, oldValue);
    },
    { immediate: true }
  );

  //情况二：监视多个ref定义的响应式数据
  watch([sum, msg], (newValue, oldValue) => {
    console.log("sum或msg变化了", newValue, oldValue);
  });

  /* 情况三：监视reactive定义的响应式数据
  			若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
  			若watch监视的是reactive定义的响应式数据，则强制开启了深度监视 
  */
  watch(
    person,
    (newValue, oldValue) => {
      console.log("person变化了", newValue, oldValue);
    },
    { immediate: true, deep: false }
  ); //此处的deep配置不再奏效

  //情况四：监视reactive定义的响应式数据中的某个属性
  watch(
    () => person.job,
    (newValue, oldValue) => {
      console.log("person的job变化了", newValue, oldValue);
    },
    { immediate: true, deep: true }
  );

  //情况五：监视reactive定义的响应式数据中的某些属性
  watch(
    [() => person.job, () => person.name],
    (newValue, oldValue) => {
      console.log("person的job变化了", newValue, oldValue);
    },
    { immediate: true, deep: true }
  );

  //特殊情况
  watch(
    () => person.job,
    (newValue, oldValue) => {
      console.log("person的job变化了", newValue, oldValue);
    },
    { deep: true }
  ); //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
  ```

### 3.watchEffect 函数

- watch 的套路是：既要指明监视的属性，也要指明监视的回调。

- watchEffect 的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。

- watchEffect 有点像 computed：

  - 但 computed 注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
  - 而 watchEffect 更注重的是过程（回调函数的函数体），所以不用写返回值。

  ```js
  //watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
  watchEffect(() => {
    const x1 = sum.value;
    const x2 = person.age;
    console.log("watchEffect配置的回调执行了");
  });
  ```

## 8.生命周期

<div style="border:1px solid black;width:380px;float:left;margin-right:20px;"><strong>vue2.x的生命周期</strong><img src="https://cn.vuejs.org/images/lifecycle.png" alt="lifecycle_2" style="zoom:33%;width:1200px" /></div><div style="border:1px solid black;width:510px;height:985px;float:left"><strong>vue3.0的生命周期</strong><img src="https://v3.cn.vuejs.org/images/lifecycle.svg" alt="lifecycle_2" style="zoom:33%;width:2500px" /></div>

1

- Vue3.0 中可以继续使用 Vue2.x 中的生命周期钩子，但有有两个被更名：
  - `beforeDestroy`改名为 `beforeUnmount`
  - `destroyed`改名为 `unmounted`
- Vue3.0 也提供了 Composition API 形式的生命周期钩子，与 Vue2.x 中钩子对应关系如下：
  - `beforeCreate`===>`setup()`
  - `created`=======>`setup()`
  - `beforeMount` ===>`onBeforeMount`
  - `mounted`=======>`onMounted`
  - `beforeUpdate`===>`onBeforeUpdate`
  - `updated` =======>`onUpdated`
  - `beforeUnmount` ==>`onBeforeUnmount`
  - `unmounted` =====>`onUnmounted`

## 9.自定义 hook 函数

- 什么是 hook？—— 本质是一个函数，把 setup 函数中使用的 Composition API 进行了封装。

- 类似于 vue2.x 中的 mixin。

- 自定义 hook 的优势: 复用代码, 让 setup 中的逻辑更清楚易懂。

## 10.toRef

- 作用：创建一个 ref 对象，其 value 值指向另一个对象中的某个属性。
- 语法：`const name = toRef(person,'name')`
- 应用: 要将响应式对象中的某个属性单独提供给外部使用时。

- 扩展：`toRefs` 与`toRef`功能一致，但可以批量创建多个 ref 对象，语法：`toRefs(person)`
