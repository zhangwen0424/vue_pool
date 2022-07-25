# Vue 全家桶

[codeserver 在线查看项目](https://github1s.com/zhangwen0424/vue_pool/tree/main/2.vue_test)

分类导航

- 1.vue_basic [Vue 基础](https://github.com/zhangwen0424/vue_pool/tree/main/1.vue_basic)
- 2.vue_test [Vue 脚手架](https://github.com/zhangwen0424/vue_pool/tree/main/2.vue_test)
- 3.vue3_vite [Vue3 基础](https://github.com/zhangwen0424/vue_pool/tree/main/3.vue3_vite)

本文目录

[toc]

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

#### setup 执行的时机

- 在 beforeCreate 之前执行(一次)，此时组件对象还没创建；
- this 是 undefined，不能通过 this 来访问 data/computed/methods/props；
- 其实所有的 composition API 相关回调函数中也都不可以；

#### setup 的返回值

- 一般都返回一个对象：为模板提供数据，也就是模板中可以直接使用此对象中的所有属性/方法
- 返回对象中的属性会与 data 函数返回对象合并成为组件对象的属性
- 返回对象中的方法会与 methods 中的方法合并成功组件对象的方法
- 如果有重名，setup 优先
- 注意：一般不要混合使用：methods 中可以访问 setup 提供的属性和方法，但在 setup 方法中不能访问 data 和 methods；setup 不能是 async 函数：因为返回值不再是 return 的对象，而不是 promise，模板看不到 return 对象中的属性数据

#### setup 参数

- setup(props,context)/setup(props,{attrs,slots,emit})
- props：包含 props 配置声明且传入了所有属性的对象
- attrs：包含没有在 props 配置中声明的属性的对象，相当于 this.$attrs
- slots：包含所有传入的插槽内容的对象，相当于 this.$slots
- emit：用来分发自定义事件的函数，相当于 this.$emit

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

#### Vue3.0 的响应式

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

代码

```html
<script>
  // 源数据
  let person = {
    name: "张三",
    age: 18,
  };
  // vue2响应式原理
  let p = {};
  Object.defineProperty(p, "name", {
    configurable: true, //属性是否可以删除
    set(newValue) {
      //有人修改name时调用
      console.log("name属性被修改了！", newValue);
      person.name = newValue;
    },
    get() {
      //有人读取name时调用
      console.log("name属性被读取了！值为：", person.name);
      return person.name;
    },
  });
  Object.defineProperty(p, "sex", {
    set(newValue) {
      console.log("sex 被设置了", newValue);
    },
    get() {
      return person.sex;
    },
  });

  // vue3响应式原理
  const pp = new Proxy(person, {
    get(target, propName) {
      console.log("get", target, propName);
      return Reflect.get(target, propName);
    },
    set(target, propName, value) {
      console.log("set", target, propName, value);
      Reflect.set(target, propName, value);
    },
    deleteProperty(target, propName) {
      console.log("deleteProperty", target, propName);
      Reflect.deleteProperty(target, propName);
    },
  });

  // Object.defineProperty(obj, name, desc)方法在无法定义属性的时候会抛出异常，而Reflect.defineProperty(obj, name, desc)方法在操作失败时则会返回false
  let obj = { a: 1, b: 2 };
  //通过Object.defineProperty去操作，报错
  /* try {
        Object.defineProperty(obj, "c", {
          get() {
            return 3;
          },
        });
        Object.defineProperty(obj, "c", {
          get() {
            return 4;
          },
        });
      } catch (error) {
        console.log(error); // TypeError: Cannot redefine property: c
      } */

  //通过Reflect.defineProperty去操作
  /* const x1 = Reflect.defineProperty(obj, "c", {
        get() {
          return 3;
        },
      });
      console.log("x1:", x1); //true

      const x2 = Reflect.defineProperty(obj, "c", {
        get() {
          return 4;
        },
      });
      console.log("x2:", x2); //false */
</script>
```

### 5.reactive 对比 ref

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

### 6.setup 的两个注意点

- setup 执行的时机
  - 在 beforeCreate 之前执行一次，this 是 undefined。
- setup 的参数
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  - context：上下文对象 - attrs: 值为对象，包含：组件外部传递过来，但没有在 props 配置中声明的属性, 相当于 `this.$attrs`。 - slots: 收到的插槽内容, 相当于 `this.$slots`。 - emit: 分发自定义事件的函数, 相当于 `this.$emit`。
    App.vue

```Vue
<template>
  <Demo @showMsg="showMsg" msg="App中国">
    <template v-slot:a="ad">
      <div>我是App组件插槽a，我接收到的数据为：{{ ad }}</div>
    </template>
    <template v-slot:b>我是App组件插槽b</template>
  </Demo>
</template>
<script>
import Demo from "./components/Demo.vue";
export default {
  components: { Demo },
  name: "App",
  setup() {
    function showMsg(value) {
      console.log("App showMsg! hello,", value);
    }
    return { showMsg };
  },
};
</script>

```

Demo.vue

```vue
<template>
  <h1>我是 Demo 组件</h1>
  <h2>人员信息</h2>
  <h2>姓名：{{ name }}</h2>
  <h2>App组件中 msg 信息：{{ msg }}</h2>
  <!-- 具名插槽 -->
  <slot name="b"></slot>
  <!-- 作用域插槽 -->
  <slot name="a" :slot_data="slot_data">{{ a.test_a }}</slot>
  <button @click="test">按钮</button>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Demo",
  // 可以直接这样接收props 中的值
  props: ["msg"],
  // 可以直接这样接收context 中的值
  emit: ["showMsg"],
  // 可以直接这样接收context 中的值
  slots: ["a", "b"],
  setup(props, context) {
    console.log("Demo:", props, context);
    const { attrs, emit, slots } = context;

    // 定义子组件数据
    const name = ref("张三");
    // 定义子组件插槽数据
    const slot_data = { wether: "威风" };

    // 子组件按钮点击事件，触发父组件事件
    function test() {
      console.log("Demo test");
      emit("showMsg", name.value);
    }

    return {
      name,
      slot_data,
      test,
    };
  },
};
</script>
```

### 7.计算属性与监视

#### 1.computed 函数

- 与 Vue2.x 中 computed 配置功能一致

- 写法

  ```js
  <template>
  <h1>个人信息：</h1>
  姓：<input type="text" v-model="person.firstName" /> <br />
  名：<input type="text" v-model="person.lastName" /> <br />
  <span>全名：{{ person.fullName }}</span
  ><br />
  更改全名：<input type="text" v-model="person.fullName" />
  </template>
  <script>
  import { computed, reactive } from "vue";
  export default {
  name: "Demo",
  setup() {
    let person = reactive({
      firstName: "",
      lastName: "",
    });
    //计算属性——简写（没有考虑计算属性被修改的情况）
    // person.fullName = computed(() => {
    //   return person.firstName + "-" + person.lastName;
    // });
    //计算属性——完整写法（考虑读和写）
    person.fullName = computed({
      get() {
        return person.firstName + "-" + person.lastName;
      },
      set(value) {
        let name = value.split("-");
        person.firstName = name[0];
        person.lastName = name[1];
        console.log("value", value);
      },
    });
    //返回一个对象（常用）
    return { person };
  },
  };
  </script>
  ```

#### 2.watch 函数

- 与 Vue2.x 中 watch 配置功能一致

- 两个小“坑”：

  - 监视 reactive 定义的响应式数据时：oldValue 无法正确获取、强制开启了深度监视（deep 配置失效）。
  - 监视 reactive 定义的响应式数据中某个属性时：deep 配置有效。

  ```html
  <template>
    <h1>求和值为：{{ count }}</h1>
    <button @click="count++">点我+1</button>
    <hr />
    <h1>当前信息为：{{ message }}</h1>
    <button @click="message += '!'">点击修改信息</button>
    <hr />
    <h1>姓名：{{ person.name }}</h1>
    <h1>年龄：{{ person.age }}</h1>
    <h1>资产：{{ person.home.num.price }}</h1>
    <button @click="person.name += '~'">修改姓名</button>
    <button @click="person.age += 1">修改年龄</button>
    <button @click="person.home.num.price += 1">修改资产</button>
  </template>
  <script>
    import { reactive, ref, watch } from "vue";
    export default {
      name: "Demo",
      setup() {
        let count = ref(0);
        let message = ref("hello");
        let person = reactive({
          name: "张三",
          age: 16,
          home: {
            num: {
              price: 25,
            },
          },
        });
        console.log(person);
        // reactive时：Proxy {name: '张三', age: 16, home: {…}}
        // ref时: RefImpl {__v_isShallow: false, dep: undefined, __v_isRef: true, _rawValue: {…}, _value: Proxy}

        //情况一：监视ref所定义的一个响应式数据
        /* watch(
      count,
      (newValue, oldValue) => {
        console.log("count改变了:", newValue, oldValue); //count改变了: 0 undefined
      },
      { immediate: true }
    ); */

        //情况二：监视ref所定义的多个响应式数据
        /* watch(
      [count, message],
      (newValue, oldValue) => {
        console.log("count或者 message改变了:", newValue, oldValue);
        //count或者 message改变了: [0, 'hello'] []
      },
      { immediate: true }
    ); */

        /*
      情况三：监视reactive所定义的一个响应式数据的全部属性
          1.注意：此处无法正确的获取oldValue
          2.注意：强制开启了深度监视（deep配置无效）
    */
        /* watch(
      person,
      (newValue, oldValue) => {
        console.log("person改变了", newValue, oldValue);
        //person改变了 Proxy {name: '张三~', age: 16, home: {…}} Proxy {name: '张三~', age: 16, home: {…}}
      },
      { deep: false }
    ); //此处的deep配置无效，deep为false 修改里面的值会调用 */

        //情况四：监视reactive所定义的一个响应式数据中的某个属性
        /*  watch(
      () => person.name,
      (newValue, oldValue) => [console.log("person改变了", newValue, oldValue)] //person改变了 张三~ 张三
    ); */

        //情况五：监视reactive所定义的一个响应式数据中的某些属性
        /* watch([() => person.name, () => person.age], (newValue, oldValue) => {
      console.log("person改变了", newValue, oldValue); //person改变了 (2) ['张三', 17] (2) ['张三', 16]
    }); */

        /* 特殊情况：
        监听的是对象中的基本属性oldValue 可以捕获到，
        监听的是对象中的对象配置{ deep: true }其中任意属性变化watch 函数调用，{deep: false}任意属性变化函数不调用
    */
        /*  watch(
      () => person.home.num.price,
      (newValue, oldValue) => {
        console.log("person改变了", newValue, oldValue); //person改变了 26 25
      }
    ); */
        watch(
          () => person.home,
          (newValue, oldValue) => {
            console.log("person改变了", newValue, oldValue);
          },
          { deep: true } //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
        );

        return {
          count,
          message,
          person,
        };
      },
    };
  </script>
  ```

#### 3.watchEffect 函数

- watch 的套路是：既要指明监视的属性，也要指明监视的回调。

- watchEffect 的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。

- watchEffect 有点像 computed：

  - 但 computed 注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
  - 而 watchEffect 更注重的是过程（回调函数的函数体），所以不用写返回值。

  ```html
  <template>
    <h1>求和值为：{{ count }}</h1>
    <button @click="count++">点我+1</button>
    <hr />
    <h1>当前信息为：{{ message }}</h1>
    <button @click="message += '!'">点击修改信息</button>
    <hr />
    <h1>姓名：{{ person.name }}</h1>
    <h1>年龄：{{ person.age }}</h1>
    <h1>资产：{{ person.home.num.price }}</h1>
    <button @click="person.name += '~'">修改姓名</button>
    <button @click="person.age += 1">修改年龄</button>
    <button @click="person.home.num.price += 1">修改资产</button>
  </template>
  <script>
    import { reactive, ref, watch, watchEffect } from "vue";
    export default {
      name: "Demo",
      setup() {
        let count = ref(0);
        let message = ref("hello");
        let person = reactive({
          name: "张三",
          age: 16,
          home: {
            num: {
              price: 25,
            },
          },
        });
        /* watch(
      count,
      (newValue, oldValue) => {
        console.log("count改变了:", newValue, oldValue); //count改变了: 0 undefined
      },
      { immediate: true }
    ); */

        //watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。初始化时默认会执行一遍
        watchEffect(() => {
          const x1 = person.name;
          const x2 = count.value;
          console.log("watchEffect所指定的回调执行了", x1, x2); // 初始化后打印：watchEffect所指定的回调执行了 张三 0
        });

        return {
          count,
          message,
          person,
        };
      },
    };
  </script>
  ```

#### 4.watch 和 watchEffec 的区别

1、watch 需要明确监听哪个属性
2、watchEffect 会根据其中的属性，自动监听其变化
3、watcheffect 初始化时，一定会执行一次（收集要监听的数据，不然不知道监听的是什么），watch 只有你设置了初始化监听才会监听

```js
const numberRef = ref(100);
const state = reactive({
  name: "test",
  age: 20,
});

// watch
watch(
  numberRef,
  (newNumber, oldNumber) => {
    console.log("ref watch", newNumber, oldNumber);
  },
  {
    immediate: true, // 初始化之前就监听，可选
  }
);

setTimeout(() => {
  numberRef.value = 200;
}, 1500);

watch(
  // 第一个参数，确定要监听哪个属性
  () => state.age,

  // 第二个参数，回调函数
  (newAge, oldAge) => {
    console.log("state watch", newAge, oldAge);
  },

  // 第三个参数，配置项
  {
    immediate: true, // 初始化之前就监听，可选
    // deep: true // 深度监听
  }
);

setTimeout(() => {
  state.age = 25;
}, 1500);
setTimeout(() => {
  state.name = "testA";
}, 3000);
// watcheffect
watchEffect(() => {
  // 初始化时，一定会执行一次（收集要监听的数据）
  console.log("hello watchEffect");
});
watchEffect(() => {
  // 监听的是state.name 不会监听state.age
  console.log("state.name", state.name);
});
watchEffect(() => {
  console.log("state.age", state.age);
});
watchEffect(() => {
  console.log("state.age", state.age);
  console.log("state.name", state.name);
});
setTimeout(() => {
  state.age = 25;
}, 1500);
setTimeout(() => {
  state.name = "test1";
}, 3000);
```

### 8.生命周期

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

App.vue

```vue
<template>
  <button @click="isShowDemo = !isShowDemo">点击切换 Demo 的显示和隐藏</button
  ><Demo v-if="isShowDemo" />
</template>
<script>
import { ref } from "vue";
import Demo from "./components/Demo.vue";
export default {
  name: "App",
  components: { Demo },
  setup() {
    let isShowDemo = ref(true);
    return { isShowDemo };
  },
};
</script>
```

Demo.vue

```vue
<template>
  <h1>当前和为：{{ count }}</h1>
  <button @click="count++">点我+1</button>
</template>
<script>
import {
  onUnmounted,
  onUpdated,
  onBeforeUpdate,
  onBeforeMount,
  onMounted,
  ref,
  onBeforeUnmount,
} from "vue";
export default {
  name: "Demo",
  //通过组合式API的形式去使用生命周期钩子
  setup() {
    console.log("setup");
    let count = ref(0);
    onBeforeMount(() => {
      console.log("onBeforeMount");
    });
    onMounted(() => {
      console.log("onMounted");
    });
    onBeforeUpdate(() => {
      console.log("onbeforeUpdate");
    });
    onUpdated(() => {
      console.log("onUpdated");
    });
    onBeforeUnmount(() => {
      console.log("onBeforeUnmount");
    });
    onUnmounted(() => {
      console.log("onUnmounted");
    });
    return { count };
  },

  //通过配置项的形式使用生命周期钩子
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
};
</script>
```

### 9.自定义 hook 函数

- 什么是 hook？—— 本质是一个函数，把 setup 函数中使用的 Composition API 进行了封装。

- 类似于 vue2.x 中的 mixin。

- 自定义 hook 的优势: 复用代码, 让 setup 中的逻辑更清楚易懂。

hooks/usePoint.js

```js
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
export default function () {
  const x = ref(0);
  const y = ref(0);
  // const point = reactive({
  //   x: 0,
  //   y: 0,
  // });
  function savePoint(e) {
    // point.x = e.pageX;
    // point.y = e.pageY;
    // console.log("e", point.x, point.y);
    x.value = e.pageX;
    y.value = e.pageY;
  }

  onMounted(() => {
    window.addEventListener("click", savePoint);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("click", savePoint);
  });

  // return point;
  return { x, y };
}
```

Demo.vue

```html
<template>
  <h1>当前鼠标的坐标为：x:{{ point.x }} y:{{ point.y }}</h1>
</template>
<script>
  import usePoint from "../hooks/usePoint";
  export default {
    name: "Demo",
    setup() {
      const point = usePoint();
      return { point };
    },
  };
</script>
```

### 10.toRef 和 toRefs

- 作用：创建一个 ref 对象，其 value 值指向另一个对象中的某个属性。
- 语法：`const name = toRef(person,'name')`
- 应用: 要将响应式对象中的某个属性单独提供给外部使用时。

- 扩展：`toRefs` 与`toRef`功能一致，但可以批量创建多个 ref 对象，语法：`toRefs(person)`

```html
<template>
  <h1>{{ person }}</h1>
  <h1>姓名：{{ person.name }} - {{ name }} - {{ x }} - {{ y }}</h1>
  <h1>年龄：{{ person.age }} - {{ age }}</h1>
  <h1>资产：{{ person.home.num.price }} - {{ home.num.price }}</h1>
  <button @click="person.name += '~'">修改姓名</button>
  <button @click="person.age += 1">修改年龄</button>
  <button @click="person.home.num.price++">修改资产</button>
</template>

<script>
  import { reactive, toRef, toRefs } from "vue";
  export default {
    name: "Demo",
    setup() {
      const person = reactive({
        name: "张安",
        age: 23,
        home: {
          num: {
            price: 12,
          },
        },
      });
      // 此处 x 不是响应式的，y 是响应式的
      // toRef 相当于把对象中的属性结构出来使用，toRefs 是批量结构对象属性
      let x = person.name;
      let y = toRef(person, "name");
      console.log("x,y", x, y); //x,y 张安 ObjectRefImpl {_object: '张安', _key: undefined, _defaultValue: undefined, __v_isRef: true}

      return { person, x, y, ...toRefs(person) };
    },
  };
</script>
```

## 三、其它 Composition API

### 1.shallowReactive 与 shallowRef、triggerRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。
- triggerRef 可以直接去更改 shallowRef 创建数据的某一层
  vue3 中值提供了 triggerRef 这个方法，但是并没有提供 triggerReactive 的方法。也就是说 triggerRef 【不可以】去更改 shallowReactive 创建的数据

- 什么时候使用?
  - 如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
  - 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

```html
<template>
  <div>{{ state }}</div>
  <button @click="func1">修改</button>
  <hr />
  <div>{{ st }}</div>
  <button @click="func2">修改</button>
  <hr />
  person: {{ person }}
  <h1>姓名：{{ name }}</h1>
  <h1>年龄：{{ age }}</h1>
  <h1>资产：{{ home.num.price }}</h1>
  <button @click="name += '~'">修改姓名</button>
  <button @click="age++">修改年龄</button>
  <button @click="home.num.price++">修改资产</button>
  <hr />
  <h1>x: {{ x.y }}</h1>
  <button @click="x.y++">修改 y 的值</button>
  <button @click="x = { y: 88 }">重置 y 的值</button>
</template>

<script>
  import { trigger, triggerRef } from "@vue/reactivity";
  import { shallowRef, shallowReactive, toRefs, reactive } from "vue";
  export default {
    name: "Demo",
    setup() {
      //只考虑第一层数据的响应式，name 和 age 为响应式，price 不响应
      const person = shallowReactive({
        // const person = reactive({
        name: "张三",
        age: 20,
        home: {
          num: {
            price: 23,
          },
        },
      });

      const x = shallowRef({
        y: 1,
      });
      console.log("******", x);

      //默认情况它只能够监听数据的第一层。如果想更改多层的数据，你必须先更改第一层的数据。然后在去更改其他层的数据。这样视图上的数据才会发生变化
      let state = shallowReactive({
        a: "a",
        b: {
          b1: "b1",
          c: {
            c1: "c1",
            d1: {
              e1: "e1",
              f1: {
                f1: "f1",
              },
            },
          },
        },
      });
      function func1() {
        console.log(state); //只有第一层
        console.log(state.b.b1);
        console.log(state.b.c);
        console.log(state.b.c.d1);
        console.log(state.b.c.d1.f1);
        //  直接更改其他层的数据，会失败的哈
        // state.b.c.d1.f1.f1 = "f1f1f1f1";

        // 先更改第一层，然后在更改其他层就会成功
        // state.a = "啊啊啊";
        // state.b.c.d1.f1.f1 = "f1f1f1f1";
      }

      // 如果是通过 shallowRef 创建的数据。那么 Vue 监听的是.value 变化。并不是第一层的数据的变化。因此如果要更改 shallowRef 创建的数据。应该 xxx.value={}
      let st = shallowRef({
        a: "a",
        b: {
          b1: "b1",
          c: {
            c1: "c1",
            d1: {
              e1: "e1",
              f1: {
                f1: "f1",
              },
            },
          },
        },
      });
      function func2() {
        // 1. 通过 state.value的方式直接去更改
        st.value = {
          a: "我是a",
          b: {
            b1: "我是b1",
            c: {
              c1: "我是c1",
              d1: {
                e1: "我是e1",
                f1: {
                  f1: "f1",
                },
              },
            },
          },
        };
        // 2. 通过triggerRef 直接更改你需要修改某一层的数据使用下面的语句会生效，只能用于 shallowRef，不能用于 shallowReactive
        // st.value.b.c.d1.e1 = "e1e1e1e1";
        // triggerRef(st);
      }

      return {
        person,
        x,
        state,
        func1,
        st,
        func2,
        ...toRefs(person),
      };
    },
  };
</script>
```

### 2.readonly 与 shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）。
- shallowReadonly：让一个响应式数据变为只读的（浅只读）。
- 应用场景: 不希望数据被修改时。

```vue
<template>
  <h1>求和：{{ count }}</h1>
  <button @click="count++">点我+1</button>
  <hr />
  <h1>姓名：{{ name }}</h1>
  <h1>年龄：{{ age }}</h1>
  <h1>资产：{{ home.num.price }}</h1>
  <button @click="name += '!'">修改姓名</button>
  <button @click="age++">修改年龄</button>
  <button @click="home.num.price++">修改资产</button>
</template>
<script>
import { ref, reactive, toRefs, readonly, shallowReadonly } from "vue";
export default {
  name: "Demo",
  setup() {
    let count = ref(0);
    let person = reactive({
      name: "张三",
      age: 22,
      home: {
        num: {
          price: 22,
        },
      },
    });
    person = readonly(person); //全部属性不可改
    // person = shallowReadonly(person);//home中的属性可以修改
    // count = readonly(count);
    // count = shallowReadonly(count);

    return {
      count,
      ...toRefs(person),
    };
  },
};
</script>
```

### 3.toRaw 与 markRaw

- toRaw：
  - 作用：将一个由`reactive`生成的<strong style="color:orange">响应式对象</strong>转为<strong style="color:orange">普通对象</strong>。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
- markRaw：

  - 作用：标记一个对象，使其永远不会再成为响应式对象。
  - 应用场景:

    1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

    markRaw 与 toRaw 的区别:

- toRaw 和 markRaw 区别

  - toRaw 是让响应式对象变成普通对象。 只能是复杂数据类型 对象与数组都可以。
    这里的让响应式对象变成普通对象说的并不够准确, toRaw 是把响应式对象复制一份数据，让这个数据变成普通对象, 就是不改变原对象, 返回值就是普通对象。
  - markRaw 是让对象永远不称为响应式对象。 同样不改变原对象, 但是可以将响应式对象变成普通对象后,在把整个对象赋值给响应式对象。 但是这样不太好，就像绕了一圈一样。

  区别就是 markRaw 让对象永远不称为响应式对象 toRaw 让响应式对象变成普通对象。

```vue
<template>
  <h1>姓名：{{ name }}</h1>
  <h1>年龄：{{ age }}</h1>
  <h1>薪资：{{ job.j1.salary }}k</h1>
  <h1 v-show="person.car">座架信息：{{ person.car }}</h1>
  <button @click="name += '~'">改名字</button>
  <button @click="age++">改年龄</button>
  <button @click="job.j1.salary++">涨薪</button>
  <button @click="showRowPerson">输出原始 person</button>
  <button @click="addCar">添加一辆车</button>
  <div v-show="person.car">
    <button @click="person.car.type += '!'">换车名</button>
    <button @click="changePrice">换价格</button>
  </div>
</template>
<script>
import { reactive, toRefs, toRaw, markRaw } from "vue";

export default {
  name: "Demo",
  setup(props) {
    let person = reactive({
      name: "张三",
      age: 22,
      job: {
        j1: {
          salary: 23,
        },
      },
    });
    // 打印 person 信息
    function showRowPerson() {
      const p = toRaw(person);
      p.age++; //这里数据被修改了，但是页面不是响应式的了
      console.log(p);
    }
    // 添加一辆车
    function addCar() {
      let car = { type: "奔驰", price: 24 };
      person.car = markRaw(car); //这里需要在 return 中把 person 暴露出去，因为person属性里面没有 car 属性
    }
    // 更改价格
    function changePrice() {
      person.car.price++;
      console.log(person.car.price); // 这里数据被修改了，但是页面不是响应式的了
    }

    return {
      ...toRefs(person),
      person,
      showRowPerson,
      addCar,
      changePrice,
    };
  },
};
</script>
```

- markRaw 与 readonly 的区别.
  - 从结果上来看就是页面的数据都不会改变, 其本质上来看。
  - markRaw 没有做响应式操作页面不会作出数据更新，可以对值本身进行修改。
  - readonly 对禁止对值得修改，响应式本身还存在。
  - markRaw 可以对性能进行提升

### 4.customRef

- 作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。

- 实现防抖效果：

```vue
<template>
  <input type="text" v-model="keyWord" />
  <h1>{{ keyWord }}</h1>
</template>

<script>
import { ref, customRef } from "vue";
export default {
  name: "Demo",
  setup(props) {
    //自定义一个ref——名为：myRef
    function myRef(value, delay) {
      let timer = null;
      return customRef((track, trigger) => {
        return {
          get() {
            console.log(`--读: ${value}`);
            track(); //通知Vue追踪value的变化（提前和get商量一下，让他认为这个value是有用的）
            return value;
          },
          set(newValue) {
            clearTimeout(timer);
            timer = setTimeout(() => {
              console.log(`~~写: ${newValue}`);
              value = newValue;
              trigger(); //通知Vue去重新解析模板
            }, delay);
          },
        };
      });
    }
    // let keyWord = ref("hello"); //使用Vue提供的ref
    let keyWord = myRef("hello", 500);
    return { keyWord };
  },
};
</script>
```

### 5.provide 与 inject

<img src="https://v3.cn.vuejs.org/images/components_provide.png" style="width:300px" />

- 作用：实现<strong style="color:#DD5145">祖与后代组件间</strong>通信

- 套路：父组件有一个 `provide` 选项来提供数据，后代组件有一个 `inject` 选项来开始使用这些数据

- 具体写法：

1. 祖组件中：

   ```js
   setup(){
       let car = reactive({name:'奔驰',price:'40万'})
       provide('car',car)
   }
   ```

2. 后代组件中：

   ```js
   setup(props,context){
       const car = inject('car')
       return {car}
   }
   ```

### 6.响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

```vue
<template>hello</template>
<script>
import {
  isProxy,
  isReactive,
  isReadonly,
  isRef,
  reactive,
  readonly,
  ref,
} from "@vue/reactivity";
export default {
  name: "App",
  setup() {
    let data = reactive({ name: "张三", age: 22 });
    let a = ref(0);
    let c = readonly(data);
    console.log(isRef(a)); //true
    console.log(isReactive(data)); //true
    console.log(isReadonly(c)); //true
    console.log(isProxy(a)); //false
    console.log(isProxy(c)); //true
    console.log(isProxy(data)); //true
  },
};
</script>
```

## 四、Composition API 的优势

### 1.Options API 存在的问题

使用传统 OptionsAPI 中，新增或者修改一个需求，就需要分别在 data，methods，computed 里修改 。

<div style="width:600px;height:370px;overflow:hidden;float:left">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f84e4e2c02424d9a99862ade0a2e4114~tplv-k3u1fbpfcp-watermark.image" style="width:600px;float:left" />
</div>
<div style="width:300px;height:370px;overflow:hidden;float:left">
    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5ac7e20d1784887a826f6360768a368~tplv-k3u1fbpfcp-watermark.image" style="zoom:50%;width:560px;left" /> 
</div>

### 2.Composition API 的优势

我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起。

<div style="width:500px;height:340px;overflow:hidden;float:left">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc0be8211fc54b6c941c036791ba4efe~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>
</div>
<div style="width:430px;height:340px;overflow:hidden;float:left">
    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cc55165c0e34069a75fe36f8712eb80~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>
</div>

## 五、新的组件

### 1.Fragment

- 在 Vue2 中: 组件必须有一个根标签
- 在 Vue3 中: 组件可以没有根标签, 内部会将多个标签包含在一个 Fragment 虚拟元素中
- 好处: 减少标签层级, 减小内存占用

### 2.Teleport

- 什么是 Teleport？—— `Teleport` 是一种能够将我们的<strong style="color:#DD5145">组件 html 结构</strong>移动到指定位置的技术。

```vue
<template>
  <button @click="show = true">点我弹窗</button>
  <teleport to="body">
    <div v-show="show" class="mask">
      <div class="dialog">
        <h1>我是一个弹窗</h1>
        <button @click="show = false">关闭弹窗</button>
      </div>
    </div>
  </teleport>
</template>
<script>
import { ref } from "vue";
export default {
  name: "Dialog",
  setup() {
    let show = ref(true);
    return { show };
  },
};
</script>
<style>
/* 蒙版 */
.mask {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgb(0, 0, 0, 0.5);
}
/* 弹窗 */
.dialog {
  width: 300px;
  height: 200px;
  background-color: rgb(0, 255, 0);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
```

## 3.Suspense

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验

- 使用步骤：

  - 异步引入组件

App.vue

```vue
<template>
  <div class="app">
    <h1>我是 App组件</h1>
    <!-- 用suspense包裹异步组件 -->
    <suspense>
      <!-- 组件显示正常时加载 -->
      <template v-slot:default>
        <Child />
      </template>
      <!-- 组件显示缓慢时加载 -->
      <template v-slot:fallback>
        <h5>正在加载中...</h5>
      </template>
    </suspense>
  </div>
</template>
<script>
//静态引入
// import Child from "./components/Child.vue";

//异步引入
import { defineAsyncComponent } from "vue";
const Child = defineAsyncComponent(() => import("./components/Child.vue"));

export default {
  name: "App",
  components: { Child },
};
</script>
<style>
.app {
  background-color: skyblue;
  padding: 10px;
}
</style>
```

Child.vue

```vue
<template>
  <div class="child">
    <h1>我是 Child组件</h1>
    {{ sum }}
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "Child",
  setup() {
    let sum = ref(0);
    // return { sum };
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ sum });
      }, 1000);
    });
  },
};
</script>
<style>
.child {
  background-color: yellow;
  padding: 10px;
}
</style>
```

# 六、其他

## 1.全局 API 的转移

- Vue 2.x 有许多全局 API 和配置。

  - 例如：注册全局组件、注册全局指令等。

    ```js
    //注册全局组件
    Vue.component('MyButton', {
      data: () => ({
        count: 0
      }),
      template: '<button @click="count++">Clicked {{ count }} times.</button>'
    })

    //注册全局指令
    Vue.directive('focus', {
      inserted: el => el.focus()
    }
    ```

- Vue3.0 中对这些 API 做出了调整：

  - 将全局的 API，即：`Vue.xxx`调整到应用实例（`app`）上

    | 2.x 全局 API（`Vue`）    | 3.x 实例 API (`app`)                        |
    | ------------------------ | ------------------------------------------- |
    | Vue.config.xxxx          | app.config.xxxx                             |
    | Vue.config.productionTip | <strong style="color:#DD5145">移除</strong> |
    | Vue.component            | app.component                               |
    | Vue.directive            | app.directive                               |
    | Vue.mixin                | app.mixin                                   |
    | Vue.use                  | app.use                                     |
    | Vue.prototype            | app.config.globalProperties                 |

## 2.其他改变

- data 选项应始终被声明为一个函数。

- 过度类名的更改：

  - Vue2.x 写法

    ```css
    .v-enter,
    .v-leave-to {
      opacity: 0;
    }
    .v-leave,
    .v-enter-to {
      opacity: 1;
    }
    ```

  - Vue3.x 写法

    ```css
    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }

    .v-leave-from,
    .v-enter-to {
      opacity: 1;
    }
    ```

- <strong style="color:#DD5145">移除</strong>keyCode 作为 v-on 的修饰符，同时也不再支持`config.keyCodes`

- <strong style="color:#DD5145">移除</strong>`v-on.native`修饰符

  - 父组件中绑定事件

    ```vue
    <my-component
      v-on:close="handleComponentEvent"
      v-on:click="handleNativeClickEvent"
    />
    ```

  - 子组件中声明自定义事件

    ```vue
    <script>
    export default {
      emits: ["close"],
    };
    </script>
    ```

- <strong style="color:#DD5145">移除</strong>过滤器（filter）

  > 过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是 “只是 JavaScript” 的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。

- ......
