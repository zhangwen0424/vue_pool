# Vue 脚手架使用

[codeserver 在线查看](https://github.com/zhangwen0424/vue_pool/tree/main/2.vue_test)

## 开始一个项目

- 全局安装@vue/cli 只需要执行一次  
  **yarn global add @vue/cli**
- 切换到要创建的目录，创建一个项目
  **vue create vue_test**
- 启动一个项目
  **npm run serve** 或者 **yarn serve**

## 脚手架文件结构

```text
  ├── node_modules
  ├── public
  │   ├── favicon.ico: 页签图标
  │   └── index.html: 主页面
  ├── src
  │   ├── assets: 存放静态资源
  │   │   └── logo.png
  │   │── component: 存放组件
  │   │   └── HelloWorld.vue
  │   │── App.vue: 汇总所有组件
  │   │── main.js: 入口文件
  ├── .gitignore: git版本管制忽略的配置
  ├── babel.config.js: babel的配置文件
  ├── package.json: 应用包配置文件
  ├── README.md: 应用描述文件
  ├── package-lock.json：包版本控制文件
```

## 关于不同版本的 Vue

1. vue.js 与 vue.runtime.xxx.js 的区别：
   1. vue.js 是完整版的 Vue，包含：核心功能 + 模板解析器。
   2. vue.runtime.xxx.js 是运行版的 Vue，只包含：核心功能；没有模板解析器。
2. 因为 vue.runtime.xxx.js 没有模板解析器，所以不能使用 template 这个配置项，需要使用 render 函数接收到的 createElement 函数去指定具体内容。

main.js

```js
//引入Vue
import Vue from "vue";
//引入App
import App from "./App.vue";
//关闭Vue的生产提示
Vue.config.productionTip = false;

//创建vm
new Vue({
  el: "#app",
  render: (h) => h(App),
});
```

## vue.config.js 配置文件

1. 使用 vue inspect > output.js 可以查看到 Vue 脚手架的默认配置。
2. 使用 vue.config.js 可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh

```js
module.exports = {
  pages: {
    index: {
      //入口
      entry: "src/main.js",
    },
  },
  lintOnSave: false, //关闭语法检查
  //开启代理服务器（方式一）
  /* devServer: {
    proxy: 'http://localhost:5000'
  }, */
  //开启代理服务器（方式二）
  devServer: {
    proxy: {
      "/atguigu": {
        target: "http://localhost:5000",
        pathRewrite: { "^/atguigu": "" },
        // ws: true, //用于支持websocket
        // changeOrigin: true //用于控制请求头中的host值
      },
      "/demo": {
        target: "http://localhost:5001",
        pathRewrite: { "^/demo": "" },
        // ws: true, //用于支持websocket
        // changeOrigin: true //用于控制请求头中的host值
      },
    },
  },
};
```

## 关闭 eslint

根目录创建 vue.config.js

```javascript
module.exports = {
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
};
```

## 快速生成 vue 文件

- Vetur 语法提示
- vue.json 配置
  - code 中首选项 --》用户片段 --》 vue.json 配置
  - 创建文件输入 vue 回车自动生成

vue.json

```json
{
  // Place your snippets for vue here. Each snippet is defined under a snippet name and has a prefix, body and
  // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
  // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the
  // same ids are connected.
  // Example:
  // "Print to console": {
  //   "prefix": "log",
  //   "body": [
  //     "console.log('$1');",
  //     "$2"
  //   ],
  //   "description": "Log output to console"
  // }
  "Print to console": {
    "prefix": "vue",
    "body": [
      "<template>",
      "  <div>\n",
      "  </div>",
      "</template>\n",
      "<script>",
      "export default {",
      "  name: '',",
      "  data () {",
      "    return {",
      "      msg: ''",
      "    }",
      "  },",
      "  methods: {\n",
      "  },",
      "  mounted () {\n",
      "  }",
      "}",
      "</script>\n",
      "<style scoped>\n",
      "</style>\n"
    ],
    "description": "vue模板"
  }
}
```

## ref 属性

1. 被用来给元素或子组件注册引用信息（id 的替代者）
2. 应用在 html 标签上获取的是真实 DOM 元素，应用在组件标签上是组件实例对象（VueComponent）
3. 使用方式：
   1. 打标识：`<h1 ref="xxx">.....</h1>` 或 `<School ref="xxx"></School>`
   2. 获取：`this.$refs.xxx`

```Vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1 v-text="msg" ref="title"></h1>
    <button @click="showDom" ref="btn">点我输出上方的DOM元素</button>
    <School ref="sch"/>
  </div>
</template>

<script>
import School from './components/School.vue'

export default {
  name: 'App',
  components: {
    School,
  },
  data() {
    return {
      msg: '加油！努力学Vue!'
    }
  },
  methods: {
    showDom() {
      console.log(this.$refs.title);
      console.log(this.$refs.btn);
      console.log(this.$refs.sch);//vm
    }
  }
}
</script>
```

## props 配置项

1. 功能：让组件接收外部传过来的数据 (用于父组件给子组件传递数据)
2. 传递数据：`<Demo name="xxx"/>`
3. 接收数据：
   1. 第一种方式（只接收）：`props:['name']`
   2. 第二种方式（限制类型）：`props:{name:String}`
   3. 第三种方式（限制类型、限制必要性、指定默认值）：
   ```javascript
     props:{
       name:{
         type:String, //类型
         required:true, //必要性
         default:'老王' //默认值
       }
     }
     // 备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。
   ```

App.vue

```html
<template>
  <div id="app">
    <School name="南阳理工大学" address="河南南阳" :grade="5" />
  </div>
</template>

<script>
  import School from "./components/School.vue";

  export default {
    name: "App",
    components: {
      School,
    },
  };
</script>
```

Student.vue

```html
<template>
  <div>
    <p>学校名称：{{name}}</p>
    <p>学校地址：{{address}}</p>
    <p>学校等级：{{grade}} {{itgrade}}级</p>
    <button @click="itgrade++">点我等级+1</button>
  </div>
</template>

<script>
  export default {
    name: "School",
    data() {
      return {
        msg: "我是一个爱学习的学生",
        itgrade: this.grade,
      };
    },
    //简单声明接收
    props: ["name", "address", "grade"],
    // 限制类型的接收
    // props: {
    //   name: String,
    //   address: String,
    //   grade: Number
    // }
    //接收的同时对数据：进行类型限制+默认值的指定+必要性的限制
    /* props: {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
    },
    grade: {
      type: Number,
      default: 10
    }
  } */
  };
</script>
```

## mixin(混入)

1. 功能：可以把多个组件共用的配置提取成一个混入对象，优势提高代码的复用性。
2. 使用方式：
   - 第一步定义混合：
     ```
     {
         data(){....},
         methods:{....}
         ....
     }
     ```
   - 第二步使用混入：  
     ​ 全局混入：`Vue.mixin(xxx)`
     ​ 局部混入：`mixins:['xxx']`
   - 全局混入会增加排查问题难度
3. 合并规则：
   - 不冲突的配置完整合并，冲突的配置以组件中自己配置为准
   - 如果属性冲突，以组件内部定义为准
   - 生命周期函数不重名完整混入，重名混入，在函数触发时先触发 Mixin 对象中的实现，再触发组件内部的实现。
4. 应用场景：
   - 多个组件共用 prop: ["title"] 时，将 title 提取为公共的
   - 全局组件适合开发插件，如组件挂着的记录工具

定义混入：mixin.js

```javascript
export const mixin_a = {
  data() {
    return {
      x: "xx",
      y: "yy",
      age: 10,
    };
  },
};
export const mixin_b = {
  methods: {
    showName() {
      alert(this.name);
    },
  },
};
```

全局混入：main.js

```javascript
import { mixin_a, mixin_b } from "./mixin";
// 全局混入
Vue.mixin(mixin_a);
Vue.mixin(mixin_b);
```

局部混入：component/cildren.js

```javascript
import { mixin_a, mixin_b } from "../mixin";
export default {
  data() {},
  mixins: [mixin_a, mixin_b],
};
```

## 插件（plugin）

1. 功能：用于增强 Vue
2. 本质：包含 install 方法的一个对象，install 的第一个参数是 Vue，第二个以后的参数是插件使用者传递的数据。
3. 定义插件：
   ```js
   对象.install = function (Vue, options) {
       // 1. 添加全局过滤器
       Vue.filter(....)
       // 2. 添加全局指令
       Vue.directive(....)
       // 3. 配置全局混入(合)
       Vue.mixin(....)
       // 4. 添加实例方法
       Vue.prototype.$myMethod = function () {...}
       Vue.prototype.$myProperty = xxxx
   }
   ```
4. 使用插件：`Vue.use()`

定义插件：plugins.js

```javascript
export default {
  install(Vue, x, y, z) {
    console.log(x, y, z);
    // 定义全局过滤器
    Vue.filter("mySlice", function (value) {
      return value.slice(0, 3);
    });
    // 定义全局指令
    Vue.directive("fbind", {
      //指令与元素成功绑定时（一上来）
      bind(element, binding) {
        console.log("bind", element, binding);
        element.value = binding.value;
      },
      inserted(element) {
        element.focus();
      },
      //指令所在的模板被重新解析时
      update(element, binding) {
        console.log("update", element, binding);
        element.value = binding.value;
      },
    });
    // 定义混入
    Vue.mixin({
      data() {
        return { x: 20, y: 30 };
      },
    });
    //给Vue原型上添加一个方法（vm和vc就都能用了）
    Vue.prototype.hello = () => {
      alert("hello");
    };
  },
};
```

使用插件：main.js

```javascript
// 引入插件
import plugins from "./plugins";
// 使用插件
Vue.use(plugins, 1, 2, 3);
```

## scoped 样式

1. 作用：让样式在局部生效，防止冲突。
2. 写法：`<style scoped>`

## 总结 TodoList 案例

```txt
1. 组件化编码流程：
      (1).拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。
      (2).实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：
             1).一个组件在用：放在组件自身即可。
             2). 一些组件在用：放在他们共同的父组件上（<span style="color:red">状态提升</span>）。
    ​  (3).实现交互：从绑定事件开始。
2. props适用于：
    ​ (1).父组件 ==> 子组件 通信
    ​ (2).子组件 ==> 父组件 通信（要求父先给子一个函数）
3. 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！
4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。
```

App.vue

```vue
<template>
  <div id="app">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader :todos="todos" :addTodo="addTodo" />
        <MyList
          :todos="todos"
          :changeTodo="changeTodo"
          :deleteTodo="deleteTodo"
        />
        <MyFooter
          :todos="todos"
          :checkAll="checkAll"
          :clearAllTodo="clearAllTodo"
        />
      </div>
    </div>
  </div>
</template>
<script>
import MyHeader from "./components/MyHeader.vue";
import MyList from "./components/MyList.vue";
import MyFooter from "./components/MyFooter.vue";

export default {
  name: "App",
  data() {
    return {
      todos: [
        { id: "001", name: "看书", done: false },
        { id: "002", name: "写字", done: true },
        { id: "003", name: "学习", done: true },
      ],
    };
  },
  components: {
    MyHeader,
    MyList,
    MyFooter,
  },
  methods: {
    addTodo(todoObj) {
      this.todos.unshift(todoObj);
    },
    changeTodo(id) {
      console.log("app", id);
      this.todos.forEach((todo) => {
        id == todo.id && (todo.done = !todo.done);
      });
    },
    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => {
        return todo.id != id;
      });
    },
    checkAll(value) {
      this.todos.forEach((todo) => {
        todo.done = value;
      });
    },
    clearAllTodo() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done;
      });
    },
  },
};
</script>
```

MyItem.vue

```vue
<template>
  <li>
    <label>
      <input
        type="checkbox"
        :checked="todo.done"
        @change="handleCheck(todo.id)"
      />
      <span>{{ todo.name }}</span>
    </label>
    <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
  </li>
</template>

<script>
export default {
  name: "MyItem",
  props: ["todo", "changeTodo", "deleteTodo"],
  methods: {
    handleCheck(id) {
      console.log("myitem", id);
      this.changeTodo(id);
    },
    handleDelete(id) {
      this.deleteTodo(id);
    },
  },
};
</script>
```

MyList.vue

```vue
<template>
  <ul class="todo-main" v-if="todos.length">
    <MyItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      :changeTodo="changeTodo"
      :deleteTodo="deleteTodo"
    />
  </ul>
</template>

<script>
import MyItem from "../components/MyItem";
export default {
  name: "MyList",
  components: { MyItem },
  //声明接收App传递过来的数据，其中todos是自己用的，checkTodo和deleteTodo是给子组件MyItem用的
  props: ["todos", "changeTodo", "deleteTodo"],
};
</script>
```

MyFooter.vue

```vue
<template>
  <div class="todo-footer" v-if="todos.length">
    <label>
      <input type="checkbox" v-model="isAll" />
    </label>
    <span>
      <span>已完成{{ doneTotal }}</span> / 全部{{ total }}
    </span>
    <button class="btn btn-danger" @click="clearAllTodo()">
      清除已完成任务
    </button>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["todos", "checkAll", "clearAllTodo"],
  computed: {
    total() {
      return this.todos.length;
    },
    doneTotal() {
      //此处使用reduce方法做条件统计
      /* const x = this.todos.reduce((pre,current)=>{
        console.log('@',pre,current)
        return pre + (current.done ? 1 : 0)
      },0)
      return x; */
      console.log("done");
      //简写
      return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0);
    },
    isAll: {
      //全选框是否勾选
      get() {
        return this.todos.length == this.doneTotal && this.total > 0;
      },
      //isAll被修改时set被调用
      set(value) {
        this.checkAll(value);
      },
    },
  },
};
</script>
```

## TodoList 本地存储

App.vue

```javascript
export default {
  name: "App",
  data() {
    return {
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
  },
  watch: {
    todos: {
      deep: true,
      handler(value) {
        localStorage.setItem("todos", JSON.stringify(value));
      },
    },
  },
};
```

## webStorage

1. 存储内容大小一般支持 5MB 左右（不同浏览器可能还不一样）
2. 浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。
3. 相关 API：
   1. `xxxxxStorage.setItem('key', 'value');`
      该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。
   2. `xxxxxStorage.getItem('person');`
      ​ 该方法接受一个键名作为参数，返回键名对应的值。
   3. `xxxxxStorage.removeItem('key');`
      ​ 该方法接受一个键名作为参数，并把该键名从存储中删除。
   4. `xxxxxStorage.clear()`
      ​ 该方法会清空存储中的所有数据。
4. 备注：
   1. SessionStorage 存储的内容会随着浏览器窗口关闭而消失。
   2. LocalStorage 存储的内容，需要手动清除才会消失。
   3. `xxxxxStorage.getItem(xxx)`如果 xxx 对应的 value 获取不到，那么 getItem 的返回值是 null。
   4. `JSON.parse(null)`的结果依然是 null。

## 组件的自定义事件

1. 一种组件间通信的方式，适用于：<strong style="color:red">子组件 ===> 父组件</strong>
2. 使用场景：子组件想给父组件传数据，那么就要在父组件中给子组件绑定自定义事件（<span style="color:red">事件的回调在父组件中</span>）。
3. 绑定自定义事件：
   1. 第一种方式，在父组件中：`<Demo @atguigu="test"/>` 或 `<Demo v-on:atguigu="test"/>`
   2. 第二种方式，在父组件中：
      ```js
        <Demo ref="demo"/>
        ......
        mounted(){
          this.$refs.xxx.$on('atguigu',this.test)
        }
      ```
   3. 若想让自定义事件只能触发一次，可以使用`once`修饰符，或`$once`方法。
4. 触发自定义事件：`this.$emit('atguigu',数据)`
5. 解绑自定义事件`this.$off('atguigu')`
6. 组件上也可以绑定原生 DOM 事件，需要使用`native`修饰符。
7. 注意：通过`this.$refs.xxx.$on('atguigu',回调)`绑定自定义事件时，回调<span style="color:red">要么配置在 methods 中</span>，<span style="color:red">要么用箭头函数</span>，否则 this 指向会出问题！

App.vue

```vue
<template>
  <div id="app">
    <h1>你好！{{ studentName }}</h1>
    <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
    <School :getSchoolName="getSchoolName" />
    <hr />

    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第一种写法，使用@或v-on） -->
    <!-- <Student @customEvent="getStudentName"/> -->
    <!-- <Student v-on:customEvent="getStudentName"/> -->
    <!-- <hr> -->

    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第二种写法，使用ref） -->
    <!-- @click.native 原生点击事件：
      1，给vue组件绑定事件时候，必须加上native ，不然不会生效（监听根元素的原生事件，使用.native修饰符）
      2，等同于在子组件中：子组件内部处理click事件然后向外发送click事件：$emit("click".fn)
      -->
    <Student ref="student" @click.native="show" />
  </div>
</template>

<script>
import School from "./components/School.vue";
import Student from "./components/Student.vue";

export default {
  name: "App",
  components: {
    School,
    Student,
  },
  data() {
    return {
      studentName: "",
    };
  },
  methods: {
    getSchoolName(name) {
      console.log("getSchoolName被触发了 ", name);
    },
    getStudentName(name, ...params) {
      console.log("getStudentName被触发了 ", name, params);
      this.studentName = name;
    },
    show() {
      alert("123");
    },
  },
  mounted() {
    // 绑定自定义事件
    this.$refs.student.$on("customEvent", this.getStudentName);
    // console.log("this.$refs",this.$refs.student.$on)
  },
};
</script>
```

Student.vue

```vue
<template>
  <div>
    <p>学生姓名：{{ name }}</p>
    <p>学生年龄：{{ age }}</p>
    <button @click="showName">点我显示名字</button>
    <button @click="unbind">解绑自定义事件</button>
    <button @click="death">销毁组件</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "mornki",
      age: 18,
    };
  },
  methods: {
    showName() {
      //触发Student组件实例身上的自定义事件
      this.$emit("customEvent", this.name, "a", "b");
    },
    unbind() {
      // this.$off(['customEvent','test']) //解绑多个自定义事件
      this.$off(); //解绑所有的自定义事件
    },
    death() {
      this.$destroy();
    },
  },
};
</script>
```

School.vue

```vue
<template>
  <div>
    <p>学校名称：{{ name }}</p>
    <button @click="sendSchoolName">点我显示名字</button>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: "南阳理工学院",
    };
  },
  props: ["getSchoolName"],
  methods: {
    sendSchoolName() {
      this.getSchoolName(this.name);
    },
  },
};
</script>
```

## 全局事件总线（GlobalEventBus）

1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。
2. 安装全局事件总线：
   ```js
   new Vue({
     ......
     beforeCreate() {
       Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
     },
       ......
   })
   ```
3. 使用事件总线：

   1. 接收数据：A 组件想接收数据，则在 A 组件中给\$bus 绑定自定义事件，事件的<span style="color:red">回调留在 A 组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.$bus.$on('xxxx',this.demo)
      }

      ```

   2. 提供数据：`this.$bus.$emit('xxxx',数据)`

4. 最好在 beforeDestroy 钩子中，用\$off 去解绑<span style="color:red">当前组件所用到的</span>事件。

main.js

```js
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

const vm = new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    console.log("this", this);
  },
}).$mount("#app");
console.log("vm:", vm);
```

School.vue

```vue
<template>
  <div>
    <p>学校名称：{{ name }}</p>
    <p>学校地址：{{ address }}</p>
    <p v-if="student.name">
      学生姓名:{{ student.name }}， 学生年龄：{{ student.age }}
    </p>
    <button @click="student = {}">点我清除student信息</button>
    <button @click="$destroy()">点我销毁School组件</button>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: "南阳理工学院",
      address: "南阳",
      student: {},
    };
  },
  mounted() {
    this.$bus.$on("getStudent", (a, b) => {
      console.log("我是School组件，我收到了数据", a, b);
      this.$set(this.student, "name", a);
      this.$set(this.student, "age", b);
    });
  },
  beforeDestroy() {
    console.log("School组件被销毁了");
    this.$bus.$off();
  },
};
</script>
```

Student.vue

```vue
<template>
  <div>
    <p>学生姓名：{{ name }}</p>
    <p>学生年龄：{{ age }}</p>
    <button @click="sendStudent">给school传数据</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "mornki",
      age: 18,
    };
  },
  methods: {
    sendStudent() {
      console.log("我是Student组件，我要触发全局事件");
      this.$bus.$emit("getStudent", this.name, this.age);
    },
  },
};
</script>
```

## TodoList 使用全局事件总线

祖孙使用
App.vue

```vue
<!-- <MyList :todos="todos" :changeTodo="changeTodo" :deleteTodo="deleteTodo"/> -->
<MyList :todos="todos" />

<script>
methods: {
  changeTodo(id){
    console.log("app",id)
    this.todos.forEach((todo)=>{
      id == todo.id && (todo.done = !todo.done)
    })
  },
  deleteTodo(id){
    this.todos = this.todos.filter((todo)=>{ return todo.id != id})
  },
},
mounted(){
  this.$bus.$on('changeTodo', this.changeTodo);
  this.$bus.$on('deleteTodo', this.deleteTodo);
},
beforeDestroy(){
  this.$bus.$off(['changeTodo','deleteTodo'])
}
</script>
```

MyItem.vue

```html
<label>
  <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)" />
  <span>{{todo.name}}</span>
</label>
<button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
<script>
  export default {
    name: "MyItem",
    props: ["todo"],
    methods: {
      handleCheck(id) {
        console.log("myitem", id);
        // this.changeTodo(id);
        this.$bus.$emit("changeTodo", id);
      },
      handleDelete(id) {
        // this.deleteTodo(id);
        this.$bus.$emit("deleteTodo", id);
      },
    },
  };
</script>
```

## 消息订阅与发布（pubsub）

1.  一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。
2.  使用步骤：
    1.  安装 pubsub：`npm i pubsub-js`
    2.  引入: `import pubsub from 'pubsub-js'`
    3.  接收数据：A 组件想接收数据，则在 A 组件中订阅消息，订阅的<span style="color:red">回调留在 A 组件自身。</span>
        ```js
        methods(){
          demo(data){......}
        }
        ......
        mounted() {
          this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
        }
        ```
    4.  提供数据：`pubsub.publish('xxx',数据)`
    5.  最好在 beforeDestroy 钩子中，用`PubSub.unsubscribe(pid)`去<span style="color:red">取消订阅。</span>

Student.vue

```vue
<template>
  <div>
    <p>学生姓名：{{ name }}</p>
    <p>学生年龄：{{ age }}</p>
    <button @click="sendStudent">给school传数据</button>
  </div>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  data() {
    return {
      name: "mornki",
      age: 18,
    };
  },
  methods: {
    sendStudent() {
      console.log("我是Student组件，我要触发全局事件");
      // this.$bus.$emit('getStudent', this.name, this.age)
      pubsub.publish("hello", 66666);
      pubsub.publish("alert", 5555);
      console.log("pubsub", pubsub);
    },
  },
};
</script>
```

School.vue

```vue
<template>
  <div>
    <p>学校名称：{{ name }}</p>
    <p>学校地址：{{ address }}</p>
    <p v-if="student.name">
      学生姓名:{{ student.name }}， 学生年龄：{{ student.age }}
    </p>
    <button @click="$destroy()">点我销毁School组件</button>
  </div>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  name: "School",
  data() {
    return {
      name: "南阳理工学院",
      address: "南阳",
      student: {},
    };
  },
  mounted() {
    /* this.$bus.$on('getStudent',(a,b)=>{
      console.log("我是School组件，我收到了数据",a,b)
      this.$set(this.student, 'name', a)
      this.$set(this.student, 'age', b)
    }) */
    // 订阅所有
    /*  pubsub.subscribeAll(function(a) {
      console.log("a",a)
    }); */
    // 订阅hello消息
    pubsub.subscribe("hello", (msgName, data) => {
      console.log(msgName, data);
    });
  },
  beforeDestroy() {
    console.log("School组件被销毁了");
    // this.$bus.$off();
    pubsub.unsubscribe("hello");
    // pubsub.clearAllSubscriptions()
  },
};
</script>
```

## nextTick

1. 语法：`this.$nextTick(回调函数)`
2. 作用：在下一次 DOM 更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新 DOM 进行某些操作时，要在 nextTick 所指定的回调函数中执行。

```html
<input
  type="text"
  v-show="todo.isEdit"
  ref="todoTitle"
  @blur="handleBlur(todo,$event)"
  @keydown.enter="handleBlur(todo,$event)"
  :value="todo.name"
/>
<button class="btn btn-info" @click="handleEdit(todo)">编辑</button>
<script>
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
    }
</script>
```

## Vue 封装的过度与动画

1. 作用：在插入、更新或移除 DOM 元素时，在合适的时候给元素添加样式类名。

2. 图示：<img src="https://img04.sogoucdn.com/app/a/100520146/5990c1dff7dc7a8fb3b34b4462bd0105" style="width:60%" />
3. 写法：
   1. 准备好样式：
      - 元素进入的样式：
        1. v-enter：进入的起点
        2. v-enter-active：进入过程中
        3. v-enter-to：进入的终点
      - 元素离开的样式：
        1. v-leave：离开的起点
        2. v-leave-active：离开过程中
        3. v-leave-to：离开的终点
   2. 使用`<transition>`包裹要过度的元素，并配置 name 属性：
      ```vue
      <transition name="hello">
        <h1 v-show="isShow">你好啊！</h1>
      </transition>
      ```
   3. 备注：若有多个元素需要过度，则需要使用：`<transition-group>`，且每个元素都要指定`key`值。 3.引入第三方动画  
      安装动画：`yarn add animate.css`  
      引入动画：`import animate.css`  
      使用动画： `enter-active-class="animate__swing" leave-active-class="animate__backOutUp"`

```vue
<template>
  <div>
    <!-- 单个元素 -->
    <button @click="isShow = !isShow">点击我显示和隐藏</button>
    <transition name="hello" appear>
      <h1 v-show="isShow">你好，欢迎光临！</h1>
    </transition>
    <hr />
    <!-- 多个元素 -->
    <button @click="isShowList = !isShowList">点击我显示和隐藏</button>
    <transition-group name="study" appear>
      <h1 v-show="isShowList" key="1">学js</h1>
      <h1 v-show="isShowList" key="2">学css</h1>
      <h1 v-show="isShowList" key="3">学vue</h1>
    </transition-group>
    <hr />
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
import "animate.css";
export default {
  name: "Test",
  data() {
    return {
      isShow: true,
      isShowList: true,
      isShowEle: true,
    };
  },
};
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
.study-enter,
.study-leave-to {
  transform: translateX(-100%);
}
.study-enter-active,
.study-leave-active {
  transition: 1.5s linear;
}
/* 进入的终点, 离开的起点 */
.study-enter-to,
.study-leave {
  transform: translateX(0px);
}
</style>
```

### 动画知识补充

**transition**

作用：设置元素当过渡效果
语法：transition: property duration timing-function delay;

- **transition-property**: none|all| property; 需要过渡的属性，默认值：all
- **transition-duration**: time; 规定完成过渡效果需要花费的时间（以秒或毫秒计），默认值是 0，意味着不会有效果。
- **transition-timing-function**: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n); 指定过渡的动画类型。可用的类型有 liner（匀速）、ease-in(减速)、ease-out（加速）ease-in-out（先加速再减速）、cubic-bezier：三次贝塞尔曲线，可以定制
- **transition-delay**: time; 指定秒或毫秒数之前要等待切换效果开始

例：宽度从 100px 过渡到 300px

```html
<style>
  div {
    width: 100px;
    height: 100px;
    background: blue;
    transition: width 2s;
    -moz-transition: width 2s; /* Firefox 4 */
    -webkit-transition: width 2s; /* Safari and Chrome */
    -o-transition: width 2s; /* Opera */
  }

  div:hover {
    width: 300px;
  }
</style>
```

**animation**

作用：是一个简写属性，用于设置六个动画属性
语法：animation: name duration timing-function delay iteration-count direction;

- **animation-name**: keyframename|none; 为 @keyframes 动画规定名称,始终规定 animation-duration 属性，否则时长为 0，就不会播放动画了
- **animation-duration**: time; 属性定义动画完成一个周期所需要的时间
- **animation-timing-function**: value; 使用名为三次贝塞尔（Cubic Bezier）函数的数学函数，来生成速度曲线.可用的类型有 liner（匀速）、ease-in(减速)、ease-out（加速）ease-in-out（先加速再减速）
- **animation-delay**: time; 动画开始前等待的时间，以秒或毫秒计。默认值是 0
- **animation-iteration-count**: n|infinite; 定义动画的播放次数. n:定义动画播放次数的数值; infinite:规定动画应该无限次播放。
- **animation-direction**: normal|alternate; 定义是否应该轮流反向播放动画

_其他属性_：

- **animation-play-state** running，可以通过该值将暂停的动画重新播放，这里的重新播放不是从元素动画的开始播放，而是从暂停的那个位置开始播放，paused，暂停播放。可以在 JavaScript 中使用该属性，这样就能在播放过程中暂停动画
- **animation-fill-mode** 控制动画结束后元素的样式，默认情况下，动画结束后，元素的样式将回到起始状态。主要具有四个属性值：
  - none（默认，回到动画没开始时的状态。）
  - forwards（动画结束后动画停留在结束状态）
  - backwords（动画回到第一帧的状态）
  - both（根据 animation-direction 轮流应用 forwards 和 backwards 规则）

**transition 和 animation 区别**
| 区别 | transition | animation |
|:--|:--|:--|
|是否能自动执行| 不能，需要事件触发，比如 hover| 能|
|能否重复发生| 不能，除非在一次触发| 能|
|能否包含多个状态| 不能，只有开始和结束状态| 能，比如从 0% 到 100%，任意指定过渡状态|
|能否暂停| 不能，一次性| 能，比如 hover 事件|触发暂停|
|能否定义速度曲线| 能| 能|
|能否定义某个属性值过渡| 能 |能|

案例 1：

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div {
        width: 100px;
        height: 100px;
        background: red;
        position: relative;
        animation: myfirst 5s infinite;
        animation-direction: alternate;

        /* Safari and Chrome */
        -webkit-animation: myfirst 5s infinite;
        -webkit-animation-direction: alternate;
      }

      @keyframes myfirst {
        0% {
          background: red;
          left: 0px;
          top: 0px;
        }
        25% {
          background: yellow;
          left: 200px;
          top: 0px;
        }
        50% {
          background: blue;
          left: 200px;
          top: 200px;
        }
        75% {
          background: green;
          left: 0px;
          top: 200px;
        }
        100% {
          background: red;
          left: 0px;
          top: 0px;
        }
      }

      @-webkit-keyframes myfirst /* Safari and Chrome */ {
        0% {
          background: red;
          left: 0px;
          top: 0px;
        }
        25% {
          background: yellow;
          left: 200px;
          top: 0px;
        }
        50% {
          background: blue;
          left: 200px;
          top: 200px;
        }
        75% {
          background: green;
          left: 0px;
          top: 200px;
        }
        100% {
          background: red;
          left: 0px;
          top: 0px;
        }
      }
    </style>
  </head>
  <body>
    <p>
      <strong>注释：</strong>Internet Explorer 9 以及更早的版本不支持
      animation-direction 属性。
    </p>
    <div></div>
  </body>
</html>
```

案例 2：

```html
<style>
  div {
    width: 100px;
    height: 100px;
    background: red;
    position: relative;
    animation: mymove 5s;
    animation-play-state: paused;

    /* Safari and Chrome */
    -webkit-animation: mymove 5s;
    -webkit-animation-play-state: paused;
  }

  @keyframes mymove {
    from {
      left: 0px;
    }
    to {
      left: 200px;
    }
  }

  @-webkit-keyframes mymove /* Safari and Chrome */ {
    from {
      left: 0px;
    }
    to {
      left: 200px;
    }
  }
</style>
```

**Transform**

作用：是静态属性，只要写进 style 里就会直接显示生效，不会出现动画过程。能够对元素进行移动（translate）、缩放（scale）、旋转（rotate）、翻转（skew） [应用案例](https://c.runoob.com/iframe/3391)

- translate(x,y) 定义 2D 转换
- translate3d(x,y,z) 定义 3D 转换

## todoList 动画

MyList.vue

```vue
<template>
  <ul class="todo-main" v-if="todos.length">
    <transition-group name="myAnimate">
      <MyItem v-for="todo in todos" :key="todo.id" :todo="todo" />
    </transition-group>
  </ul>
</template>
<style scoped>
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
```

## axios 请求应用

axios

```js
axios.get("/api/students").then(
  (response) => {
    console.log("获取成功学生！", response);
  },
  (error) => {
    console.log("获取学生信息失败", error);
  }
);
```

vue-resource

```js
//引入Vue
import Vue from "vue";
//引入App
import App from "./App.vue";
//引入插件
import vueResource from "vue-resource";
//关闭Vue的生产提示
Vue.config.productionTip = false;
//使用插件
Vue.use(vueResource);

//创建vm
new Vue({
  el: "#app",
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});

this.$http.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
  (response) => {
    console.log("请求成功了");
    //请求成功后更新List的数据
    this.$bus.$emit("updateListData", {
      isLoading: false,
      errMsg: "",
      users: response.data.items,
    });
  },
  (error) => {
    //请求后更新List的数据
    this.$bus.$emit("updateListData", {
      isLoading: false,
      errMsg: error.message,
      users: [],
    });
  }
);
```

## vue 脚手架配置代理

### 方法一

​ 在 vue.config.js 中添加如下配置：

```js
devServer: {
  proxy: "http://localhost:5000";
}
```

说明：

1. 优点：配置简单，请求资源时直接发给前端（8080）即可。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）

### 方法二

​ 编写 vue.config.js 配置具体代理规则：

```js
module.exports = {
  devServer: {
    proxy: {
      "/api1": {
        // 匹配所有以 '/api1'开头的请求路径
        target: "http://localhost:5000", // 代理目标的基础路径
        changeOrigin: true, //用于控制请求头中的host值
        pathRewrite: { "^/api1": "" }, //请求路径是否需要重写，这里是指是否要去掉/api
      },
      "/api2": {
        // 匹配所有以 '/api2'开头的请求路径
        target: "http://localhost:5001", // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { "^/api2": "" },
      },
    },
  },
};
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

说明：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置略微繁琐，请求资源时必须加前缀。

vue.config.js

```js
module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
    },
  },
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  //开启代理服务器（方式一）
  /* devServer: {
    proxy: 'http://localhost:5000'
  }, */
  //开启代理服务器（方式二）
  devServer: {
    proxy: {
      "^/server1": {
        target: "http://localhost:5000", //允许跨域的目标服务器地址
        pathRewrite: { "^/server1": "" }, //请求路径是否要去掉/api
        // ws: true, //用于支持websocket
        changeOrigin: true, //用于控制请求头中的host值
      },
      "^/server2": {
        target: "http://localhost:5001",
        pathRewrite: { "^/server2": "" },
        // ws: true, //用于支持websocket
        // changeOrigin: true //用于控制请求头中的host值
      },
    },
  },
};
```

App.vue

```vue
<template>
  <div class="container">
    <button @click="getStudents">获取学生信息</button>
    <button @click="getCars">获取汽车信息</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "App",
  methods: {
    getStudents() {
      // 此处必须是当前主机域名，不可用5000端口
      axios.get("http://localhost:8080/server1/students").then(
        (response) => {
          console.log("获取成功学生！", response);
        },
        (error) => {
          console.log("获取学生信息失败", error);
        }
      );
    },
    getCars() {
      axios.get("http://localhost:8080/server2/cars").then((response) => {
        console.log("获取成功汽车！", response);
      });
    },
  },
};
</script>
```

### 补充起一个 node 服务

1.安装好 node  
2.mkdir myServer
3.npm init（入口文件为 index.js）
4.index.js 文件引入 express 5.重启服务:node index.js

```js
const express = require("express");
const app = express();

app.use((request, response, next) => {
  console.log("有人请求服务器1了");
  console.log("请求来自于", request.get("Host"));
  console.log("请求的地址", request.url);
  next();
});
app.get("/students", (request, response) => {
  const students = [
    { id: "001", name: "tom", age: 18 },
    { id: "002", name: "jerry", age: 19 },
    { id: "003", name: "tony", age: 120 },
  ];
  response.send(students);
});

app.listen(5000, (err) => {
  if (!err)
    console.log(
      "服务器1启动成功了,请求学生信息地址为：http://localhost:5000/students"
    );
});
```

## 插槽

注意：父组件模板的所有东西都会在父级作用域内编译；子组件模板的所有东西都会在子级作用域内编译。父组件不可以使用子组件的数据，通过 slot-scope 作用域插槽解决此类问题。

1.  作用：让父组件可以向子组件指定位置插入 html 结构，也是一种组件间通信的方式，适用于 <strong style="color:red">父组件 ===> 子组件</strong> 。
2.  分类：默认插槽、具名插槽、作用域插槽
3.  使用方式：

    1.  默认插槽：

        ```vue
        <!-- 父组件中： -->
        <Category>
          <div>html结构1</div>
        </Category>

        <!-- 子组件中： -->
        <template>
          <div>
            <!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
            <slot>插槽默认内容...</slot>
          </div>
        </template>
        ```

    2.  具名插槽：

              Category.vue

              ```vue
                   <template>
                      <h3>{{title}}分类</h3>
                      <!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
                      <!-- 默认插槽 -->
                      <slot>我是一些默认值，当使用者没有传递具体结构时，我会出现</slot>
                      <!-- 具名插槽 -->
                      <slot name="food"></slot>
                      <slot name="game"></slot>
                    </div>
                  </template>

                  <script>
                  export default {
                    name: 'Category',
                    props: ['title']
                  }
                  </script>
              ```

              App.vue

              ```vuexLocal

              <template>
                <div class="container">
                  <!-- 默认插槽内容会出现 -->
                  <Category title="空的"></Category>


                <Category title="foods">
                  <h4>我是一些食物</h4>
                  <h4 slot="food">我是一些食物~~~</h4>
                </Category>

                <Category title="games">
                  <h4>我是一些游戏</h4>
                  <!-- 传入了两个同名插槽 game，两个相同名称插槽都会插入到指定插槽位置 -->
                  <h4 slot="game">我是一些游戏!!!!</h4>
                  <!-- template用于多个插槽内容合并一个插槽，，v-slot写法必须用于template模板中 -->
                  <!-- 报错：v-slot只能用于 template中 <h4 v-slot="game">我是一些游戏!!!!</h4> -->
                  <template slot="game">
                    <h5>我是一些游戏~~~</h5>
                    <h5>我是一些游戏~~~</h5>
                  </template>
                </Category>

                <Category title="films">
                  <h4>我是一些电影</h4>
                </Category>
            </div>

          </template>

          <script>
          import Category from "./components/Category.vue";
        
          export default {
            name: "App",
            data() {
              return {
                foods: ["火锅", "烧烤", "小龙虾", "牛排"],
                games: ["红色警戒", "穿越火线", "劲舞团", "超级玛丽"],
                films: ["《教父》", "《拆弹专家》", "《你好，李焕英》", "《尚硅谷》"],
              };
            },
            components: {
              Category,
            },
          };
          </script>

        ```

        ```

4.  作用域插槽：

    1.  理解：<span style="color:red">数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。</span>（games 数据在 Category 组件中，但使用数据所遍历出来的结构由 App 组件决定）
    2.  具体编码：

        ```vue
        <!-- 父组件中： -->
        <Category>
           <template scope="scopeData">
             <!-- 生成的是ul列表 -->
             <ul>
               <li v-for="g in scopeData.games" :key="g">{{g}}</li>
             </ul>
           </template>
         </Category>

        <Category>
           <template slot-scope="scopeData">
             <!-- 生成的是h4标题 -->
             <h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
           </template>
         </Category>
        <!-- 子组件中： -->
        <template>
          <div>
            <slot :games="games"></slot>
          </div>
        </template>
        <script>
        export default {
          name: "Category",
          props: ["title"],
          //数据在子组件自身
          data() {
            return {
              games: ["红色警戒", "穿越火线", "劲舞团", "超级玛丽"],
            };
          },
        };
        </script>
        ```

```

```

**新的插槽写法(vue2.6 版本后，2019-06 后)**

新语法将普通的插槽 (slot) 和作用域插槽 (scoped slot) 统一在一个指令语法下，并在整体上强调明确性 (explicitness) 和一致性 (consistency)

```html
<!-- 默认作用域插槽 (default scoped slot) -->
<!-- <my-component v-slot:default="{ msg }"> -->
<my-component v-slot="{ msg }"> {{ msg }} </my-component>

<!-- 具名插槽 (named slots) -->
<my-component>
  <template v-slot:header>
    <p>Header</p>
  </template>

  <!-- 对象的结构赋值 -->
  <template v-slot:item="{ data }">
    <h2>{{ data.title }}</h2>
    <p>{{ data.text }}</p>
  </template>

  <template v-slot:footer>
    <p>Footer</p>
  </template>
</my-component>
```

## Vuex

vuex 是专门为 vue 提供的全局状态管理系统

- 用于多个组件中数据共享、数据缓存等。（无法持久化、内部内心原理是通过创造一个全局实例 new Vue
- 适用于中大型单页应用

主要包括以下几个模块：

State:定义了应用状态的数据结构，可以在这里设置默认的初始化状态。
Getter:允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
Mutation:是唯一更改 store 中状态的方法，且必须是同步函数。
Action:用于提交 mutation，而不是直接变更状态，可以包含任意异步请求。
Module:允许将单一的 Store 拆分更多个 store 且同时保存在单一的状态树中

- 项目目录

```txt
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```

**vue component(dispath) --> actions(commit) --> mutations --> state --> vue component**  
actions： 用于可以进行异步操作，异步逻辑都应该封装到 action 里面
mutations：操作可以被开发者工具（Devtools）捕获记录，提交 mutation 是更改状态的唯一方法，并且这个过程是同步的
vue component 可以直接 commit 数据给 mutations

在 vuex 的 Actions 中，this 指向 Vuex 实例。在 this 下有一个 this.\_vm，它就是 Vue 实例，可以使用挂载在 vue 原型上的方法

### 1.概念

​ 在 Vue 中实现集中式状态（数据）管理的一个 Vue 插件，对 vue 应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

### 2.何时使用？

多个组件需要共享数据时

- 多个视图依赖于同一状态。
- 来自不同视图的行为需要变更同一状态

### 3.搭建 vuex 环境

1. 创建文件：`src/store/index.js`

   ```js
   //引入Vue核心库
   import Vue from "vue";
   //引入Vuex
   import Vuex from "vuex";
   //应用Vuex插件
   Vue.use(Vuex);

   //准备actions对象——响应组件中用户的动作
   const actions = {};
   //准备mutations对象——修改state中的数据
   const mutations = {};
   //准备state对象——保存具体的数据
   const state = {};

   //创建并暴露store
   export default new Vuex.Store({
     actions,
     mutations,
     state,
   });
   ```

2. 在`main.js`中创建 vm 时传入`store`配置项

   ```js
   ......
   //引入store
   import store from './store'
   ......

   //创建vm
   new Vue({
      el:'#app',
      render: h => h(App),
      store
    })
   ```

store/index.js

```js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 用于存放数据
const state = {
  sum: 0,
};

// 可以处理一些逻辑和异步请求
const actions = {
  // context执行上下文，其中有dispath、commit、getter、setter等
  incrementOdd(context, value) {
    console.log("actions", context, value);
    if (value % 2) {
      context.commit("JIA", value);
    }
  },
  incrementWait(context, value) {
    console.log("action", context, value);
    setTimeout(() => {
      context.commit("JIA", value);
    }, 1000);
  },
};

// 用于处理state中数据的方法，可以直接和开发者工具进行交互
const mutations = {
  // state中有可操作的数据，state中每个数据有setter和getter进行数据追踪
  JIA(state, value) {
    console.log("mutations", state, value);
    state.sum += value;
  },
  JIAN(state, value) {
    console.log("mutations", state);
    state.sum -= value;
  },
};

export default new Vuex.Store({
  mutations,
  actions,
  state,
});
```

main.js

```js
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
```

components/Count.vue

```vue
<template>
  <div>
    <h1>当前求和的值为:{{ $store.state.sum }}</h1>
    <select v-model.number="n">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementOdd">奇数相加</button>
    <button @click="incrementWait">等一等再加</button>
  </div>
</template>

<script>
export default {
  name: "Count",
  data() {
    return {
      n: 1,
    };
  },
  methods: {
    increment() {
      this.$store.commit("JIA", this.n);
      // this.sum += this.n;
    },
    decrement() {
      this.$store.commit("JIAN", this.n);
      // this.sum -= this.n;
    },
    incrementOdd() {
      this.$store.dispatch("incrementOdd", this.n);
      // if(this.n%2){
      //   this.sum += this.n
      // }
    },
    incrementWait() {
      this.$store.dispatch("incrementWait", this.n);
      // setTimeout(() => {
      //   this.sum += this.n;
      // }, 1000);
    },
  },
  mounted() {
    console.log("mounted：", this);
  },
};
</script>
<style scoped>
button {
  margin: 0px 5px;
}
</style>
```

### 5.getters 的使用

1. 概念：当 state 中的数据需要经过加工后再使用时，可以使用 getters 加工。
2. 在`store.js`中追加`getters`配置

   ```js
   ......

   const getters = {
   	bigSum(state){
   		return state.sum * 10
   	}
   }

   //创建并暴露store
   export default new Vuex.Store({
   	......
   	getters
   })
   ```

3. 组件中读取数据：`$store.getters.bigSum`

```html
<h1>当前求和值放大10倍: {{$store.getters.bigSum}}</h1>
```

### 6.四个 map 方法的使用

导入模块

```js
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
```

1. <strong>mapState 方法：</strong>用于帮助我们映射`state`中的数据为计算属性

   ```js
   computed: {
       //借助mapState生成计算属性：sum、school、subject（对象写法）
        ...mapState({
          sum:'sum',school:'school',subject:'subject',
          // 箭头函数可使代码更简练
          count: state => state.count,
          // 为了能够使用 `this` 获取局部状态，必须使用常规函数
          countPlusLocalState (state) {
            return state.count + this.localCount
          }
        }),

       //借助mapState生成计算属性：sum、school、subject（数组写法）
       ...mapState(['sum','school','subject']),
   },
   ```

2. <strong>mapGetters 方法：</strong>用于帮助我们映射`getters`中的数据为计算属性

   ```js
   computed: {
       //借助mapGetters生成计算属性：bigSum（对象写法）
       ...mapGetters({bigSum:'bigSum'}),

       //借助mapGetters生成计算属性：bigSum（数组写法）
       ...mapGetters(['bigSum'])
   },
   ```

3. <strong>mapActions 方法：</strong>用于帮助我们生成与`actions`对话的方法，即：包含`$store.dispatch(xxx)`的函数

   ```js
   methods:{
       //靠mapActions生成：incrementOdd、incrementWait（对象形式）
       ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})

       //靠mapActions生成：incrementOdd、incrementWait（数组形式）
       ...mapActions(['jiaOdd','jiaWait'])
   }
   ```

4. <strong>mapMutations 方法：</strong>用于帮助我们生成与`mutations`对话的方法，即：包含`$store.commit(xxx)`的函数

   ```js
   methods:{
       //靠mapActions生成：increment、decrement（对象形式）
       ...mapMutations({increment:'JIA',decrement:'JIAN'}),

       //靠mapMutations生成：JIA、JIAN（对象形式）
       ...mapMutations(['JIA','JIAN']),
   }
   ```

   > 备注：mapActions 与 mapMutations 使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。

### 7.模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确。

2. 修改`store.js`

   ```javascript
   const countAbout = {
     namespaced:true,//开启命名空间
     state:{x:1},
     mutations: { ... },
     actions: { ... },
     getters: {
       bigSum(state){
          return state.sum * 10
       }
     }
   }

   const personAbout = {
     namespaced:true,//开启命名空间
     state:{ ... },
     mutations: { ... },
     actions: { ... }
   }

   const store = new Vuex.Store({
     modules: {
       countAbout,
       personAbout
     }
   })
   ```

3. 开启命名空间后，组件中读取 state 数据：

   ```js
   //方式一：自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject']),
   ```

4. 开启命名空间后，组件中读取 getters 数据：

   ```js
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   ```

5. 开启命名空间后，组件中调用 dispatch

   ```js
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   ```

6. 开启命名空间后，组件中调用 commit

   ```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
   ```

### 严格模式

在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

不要在发布环境下启用严格模式！严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。

```js
const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== "production",
});
```

### 双向绑定的计算属性

当在严格模式中使用 Vuex 时，在用户输入时，v-model 会试图直接修改 obj.message。在严格模式中，由于这个修改不是在 mutation 函数中执行的, 这里会抛出一个错误。

方式 1，给 `<input>` 中绑定 value，然后侦听 input 或者 change 事件，在事件回调中调用一个方法

```js
<input :value="message" @input="updateMessage">

// ...
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage (e) {
    this.$store.commit('updateMessage', e.target.value)
  }
}

// ...
mutations: {
  updateMessage (state, message) {
    state.obj.message = message
  }
}
```

方式 2，另一个方法是使用带有 setter 的双向绑定计算属性

```js
<input v-model="message">

// ...
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```

### Vuex 持久化存储 vuex-persist(脯肉塞思特)

引入 vuex-persist 插件，它就是为 Vuex 持久化存储而生的一个插件。不需要你手动存取 storage ，而是直接将状态保存至 cookie 或者 localStorage 中。具体用法如下：

- 安装：

  npm install --save vuex-persist
  or
  yarn add vuex-persist

- 引入：

  `import VuexPersistence from 'vuex-persist'`
  先创建一个对象并进行配置：

  ```js
  const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
  });
  ```

  引入进 vuex 插件：

  ```js
  const store = new Vuex.Store({
  state: { ... },
  mutations: { ... },
  actions: { ... },
  plugins: [vuexLocal.plugin]
  })
  ```

  通过以上设置，在图 3 中各个页面之间跳转，如果刷新某个视图，数据并不会丢失，依然存在，并且不需要在每个 mutations 中手动存取 storage 。

  **vuex-persist 的详细属性：**

  - key，string，将状态存储在存储中的键。默认: 'vuex'
  - storage，Storage (Web API)，可传 localStorage, sessionStorage, localforage 或者你自定义的存储对象. 接口必须要有 get 和 set. 默认是: window.localStorage
  - saveState，function (key, state[, storage])，如果不使用存储，这个自定义函数将保存状态保存为持久性。
  - restoreState，function (key[, storage]) => state，如果不使用存储，这个自定义函数处理从存储中检索状态
  - reducer，function (state) => object，将状态减少到只需要保存的值。默认情况下，保存整个状态。
  - filter，function (mutation) => boolean，突变筛选。看 mutation.type 并返回 true，只有那些你想坚持写被触发。所有突变的默认返回值为 true。
  - modules，string[]，要持久化的模块列表。

### vuex3.x 到 vue4.x

#### 非兼容性变更

使用新引入的 createStore 方法来创建 store 实例

```js
import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      count: 1,
    };
  },
});
```

#### 新特性

Vuex 4 引入了一个新的 API 用于在组合式 API 中与 store 进行交互。可以在组件的 setup 钩子函数中使用 useStore 组合式函数来检索 store。

```js
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
  },
};
```

## vue-router 路由

1. 理解： 一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。
2. 前端路由：key 是路径，value 是组件。

### 1.基本使用

1. 安装 vue-router，命令：`npm i vue-router`
2. 应用插件：main.js

```js
import VueRouter from "vue-router";
Vue.use(VueRouter);
```

3. 编写 router 配置项:

   ```js
   //引入VueRouter
   import VueRouter from "vue-router";
   //引入Luyou 组件
   import About from "../components/About";
   import Home from "../components/Home";

   //创建router实例对象，去管理一组一组的路由规则
   const router = new VueRouter({
     routes: [
       {
         path: "/about",
         component: About,
       },
       {
         path: "/home",
         component: Home,
       },
     ],
   });

   //暴露router
   export default router;
   ```

4. 实现切换（active-class 可配置高亮样式）
   ```vue
   <router-link active-class="active" to="/about">About</router-link>
   ```
5. 指定展示位置
   ```vue
   <router-view></router-view>
   ```

### 2.几个注意点

1. 路由组件通常存放在`pages`文件夹，一般组件通常存放在`components`文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的`$route`属性，里面存储着自己的路由信息。
4. 整个应用只有一个 router，可以通过组件的`$router`属性获取到。
5. 组件挂载：先子后父，组件销毁：先父后子
6. 同一组件有多个 router-view 的情况
   app.vue

```js
  <router-link to="/HelloWorld" > 222 </router-link>
  <router-view/>
  <router-view name="left" class="area left"/>
  <router-view name="right" class="area right"/>
  <router-view name="logo" class="area "/>
  <router-view name="bottom" class="area bottom"/>
```

router.js

```js
routes: [
  {
    path: "/",
    name: "Veaflet",
    meta: { title: "Veaflet" },
    components: {
      default: Veaflet,
      left: containerLeft,
      right: containerRight,
      logo: containerTop,
      bottom: containerBottom,
    },
  },
];
```

### 3.多级路由（多级路由）

1. 配置路由规则，使用 children 配置项：

   ```js
   routes: [
     {
       path: "/about",
       component: About,
     },
     {
       path: "/home",
       component: Home,
       children: [
         //通过children配置子级路由
         {
           path: "news", //此处一定不要写：/news
           component: News,
         },
         {
           path: "message", //此处一定不要写：/message
           component: Message,
         },
       ],
     },
   ];
   ```

2. 跳转（要写完整路径）：
   ```vue
   <router-link to="/home/news">News</router-link>
   ```

### 4.路由的 query 参数

1. 传递参数

   ```vue
   <!-- 跳转并携带query参数，to的字符串写法 -->
   <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>

   <!-- 跳转并携带query参数，to的对象写法 -->
   <router-link
     :to="{
       path: '/home/message/detail',
       query: {
         id: 666,
         title: '你好',
       },
     }"
   >跳转</router-link>
   ```

2. 接收参数：
   ```js
   $route.query.id;
   $route.query.title;
   ```

### 5.命名路由

1. 作用：可以简化路由的跳转。
2. 如何使用
   1. 给路由命名：
      ```js
        {
          path:'/demo',
          component:Demo,
          children:[
            {
              path:'test',
              component:Test,
              children:[
                {
                  name:'hello' //给路由命名
                  path:'welcome',
                  component:Hello,
                }
              ]
            }
          ]
        }
      ```
   2. 简化跳转：
      ```vue
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{ name: 'hello' }">跳转</router-link>
      <!--简化写法配合传递参数 -->
      <router-link
        :to="{
          name: 'hello',
          query: {
            id: 666,
            title: '你好',
          },
        }"
      >跳转</router-link>
      ```

### 6.路由的 params 参数

1. 配置路由，声明接收 params 参数
   ```js
    {
      path:'/home',
      component:Home,
      children:[
        {
          path:'news',
          component:News
        },
        {
          component:Message,
          children:[
            {
              name:'xiangqing',
              path:'detail/:id/:title', //使用占位符声明接收params参数
              component:Detail
            }
          ]
        }
      ]
    }
   ```
2. 传递参数

   ```vue
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link
     :to="`/home/message/detail/${m.id}/${m.title}`"
   >{{m.title}}</router-link>
   <router-link
     :to="{
       path: `/home/message/detail/${m.id}/${m.title}`,
     }"
   >{{m.title}}</router-link>

   <!-- 跳转并携带params参数，to的对象写法，必须使用name配置 -->
   <router-link
     :to="{
       name: 'xiangqing',
       params: {
         id: 666,
         title: '你好',
       },
     }"
   >跳转</router-link>
   ```

   > 特别注意：路由携带 params 参数时，若使用 to 的对象写法，则不能使用 path 配置项，必须使用 name 配置！

3. 接收参数：
   ```js
   $route.params.id;
   $route.params.title;
   ```

### 7.路由的 props 配置

​ 作用：让路由组件更方便的收到参数

```js
  {
    name:'xiangqing',
    path:'detail/:id/:title',
    component:Detail,

    //第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件(相同key，则会覆盖通过path指定的params值)
    // props:{a:900}

    //第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
    // props:true

    //第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
    props(route){
      return {
        id:route.params.id,
        title:route.params.title
      }
    }
  }
```

### 8.`<router-link>`的 replace 属性

1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别为`push`和`replace`，`push`是追加历史记录，`replace`是替换当前记录。路由跳转时候默认为`push`
3. 如何开启`replace`模式：`<router-link replace .......>News</router-link>`

### 9.编程式路由导航

1. 作用：不借助`<router-link>`实现路由跳转，让路由跳转更加灵活
2. 具体编码：

   ```js
   //$router的两个API
   this.$router.push({
     name: "xiangqing",
     params: {
       id: xxx,
       title: xxx,
     },
   });

   this.$router.replace({
     name: "xiangqing",
     params: {
       id: xxx,
       title: xxx,
     },
   });
   this.$router.forward(); //前进
   this.$router.back(); //后退
   this.$router.go(); //可前进也可后退
   ```

### 10.缓存路由组件&动态路由组件

#### 缓存路由组件

1. 作用：让不展示的路由组件保持挂载，不被销毁。
2. 具体编码：

   ```vue
   <!-- 缓存一个路由组件 -->
   <!-- <keep-alive include="New">
      <router-view></router-view>
    </keep-alive> -->

   <!-- 缓存多个路由组件 -->
   <keep-alive :include="['New', 'Message']">
      <router-view></router-view>
    </keep-alive>
   ```

#### 动态路由组件&路由懒加载

全局

```js
// 方式1
Vue.component("async-webpack-example", function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(["./my-async-component"], resolve);
});
// 方式2
Vue.component(
  "async-webpack-example",
  // 这个动态导入会返回一个 `Promise` 对象。
  () => import("./my-async-component")
);
```

局部

```js
new Vue({
  // ...
  components: {
    "my-component": () => import("./my-async-component"),
  },
});
```

#### 动态路由匹配

销毁再创建，复用则显得更加高效。这也意味着组件的生命周期钩子不会再被调用。

```js
const User = {
  template: "...",
  // 方式 1，watch (监测变化) $route 对象
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    },
  },
  // 方式 2，导航守卫
  beforeRouteUpdate(to, from, next) {
    // react to route changes...
    // don't forget to call next()
  },
};
```

### 11.两个新的生命周期钩子

1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
2. 具体名字：
   1. `activated`路由组件被激活时触发。
   2. `deactivated`路由组件失活时触发。

```js
activated(){
  console.log("New activated!")
  this.timer = setInterval(()=>{
    console.log("running...")
    this.opacity -= 0.1;
    if(this.opacity<0) this.opacity=1;
  }, 100)
},
deactivated(){
  console.log("New deactivated!")
  clearInterval(this.timer);
}
```

### 12.路由守卫

1. 作用：对路由进行权限控制
2. 分类：全局守卫、独享守卫、组件内守卫
3. 路由守卫:

- 全局守卫

  - router.beforeEach 全局前置守卫，进入路由之前

    - 每个守卫方法接收三个参数：

      - to: Route: 即将要进入的目标 路由对象
      - from: Route: 当前导航正要离开的路由
      - next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

        - next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。

        - next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。

        - next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。

        - next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调

    - router.beforeResolve（2.5.0+ ）在 beforeRouteEnter 调用之后调用，和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用
    - router.afterEach 全局后置钩子，进入路由之后

- 独享守卫

  - beforeEnter

- 组件内的守卫
  - beforeRouteEnter 进入路由前, 在路由独享守卫后调用 不能 获取组件实例 this，组件实例还没被创建
  - beforeRouteUpdate (2.2) 路由复用同一个组件时, 在当前路由改变，但是该组件被复用时调用 可以访问组件实例 this
  - beforeRouteLeave 离开当前路由时, 导航离开该组件的对应路由时调用，可以访问组件实例 this

_执行顺序：beforeEach -》 beforeResolve -》 afterEach_
1、beforeRouteLeave //路由组件内守卫
2、beforeEach // 全局前置守卫-路由进入开始
3、beforeEnter // 导航路由独享守卫
4、beforeRouteEnter // 路由组件内前置守卫
5、beforeResolve //全局解析守卫
6、afterEach // 全局后置钩子

```js
const router = new VueRouter({
  routes: {
     path: '/home',
     component: Home,
     meta: {'title':'主页'},
     children:[
         {
           name: 'xiangqing',
           path: 'detail/:id/:title',
           component: Detail,
           // 独享路由守卫
           beforeEnter(to,from,next){
             console.log('beforeEnter',to,from)
             if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
               if(localStorage.getItem('school') === 'atguigu'){
                 next()
               }else{
                 alert('暂无权限查看')
                 // next({name:'guanyu'})
               }
             }else{
               next()
             }
           }
           //props的第一种写法，值为对象，该对象中的所有key-value都会以props的形式传给Detail组件。
           // props: {id:"000",title:"标题"}

           //props的第二种写法，值为布尔值，若布尔值为真，就会把该路由组件收到的所有params参数，以props的形式传给Detail组件。
           // props:true

           //props的第三种写法，值为函数
           props($route){
             return {
               id: $route.params.id,
               title: $route.params.title
             }
           }
         }
     ]
   }
})
 //全局前置守卫：初始化时执行、每次路由切换前执行
 router.beforeEach((to,from,next)=>{
   console.log('beforeEach',to,from)
   if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
     if(localStorage.getItem('school') === 'atguigu'){ //权限控制的具体规则
       next() //放行
     }else{
       alert('暂无权限查看')
       // next({name:'guanyu'})
     }
   }else{
     next() //放行
   }
})

 //全局后置守卫：初始化时执行、每次路由切换后执行
 router.afterEach((to,from)=>{
   console.log('afterEach',to,from)
   if(to.meta.title){
     document.title = to.meta.title //修改网页的title
   }else{
     document.title = 'vue_test'
   }
 }
 export default router;
```

```js
   export default {
     name:'About',
     mounted() {
       // console.log('%%%',this.$route)
     },
     //通过路由规则，进入该组件时被调用
     beforeRouteEnter (to, from, next) {
       // 在渲染该组件的对应路由被 confirm 前调用
       // 不！能！获取组件实例 `this`
       // 因为当守卫执行前，组件实例还没被创建
       // 通过传一个回调给 next来访问组件实例： next(vm => { // 通过 `vm` 访问组件实例  })
       console.log('About--beforeRouteEnter',to,from)
       if(to.meta.isAuth){ //判断是否需要鉴权
         if(localStorage.getItem('school')==='atguigu'){
           next()
         }else{
           alert('学校名不对，无权限查看！')
         }
       }else{
         next()
       }
     },
     beforeRouteUpdate(to, from, next) {
       // 在当前路由改变，但是该组件被复用时调用
       // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
       // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
       // 可以访问组件实例 `this`
     },
     //通过路由规则，离开该组件时被调用
     beforeRouteLeave (to, from, next) {
       // 导航离开该组件的对应路由时调用
       // 可以访问组件实例 `this`
       //  通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消
       console.log('About--beforeRouteLeave',to,from)
       next()
     }
   }
 </script>
```

**完整的导航解析流程**

- 导航被触发。
- 在失活的组件里调用 beforeRouteLeave 守卫。
- 调用全局的 beforeEach 守卫。
- 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
- 在路由配置里调用 beforeEnter。
- 解析异步路由组件。
- 在被激活的组件里调用 beforeRouteEnter。
- 调用全局的 beforeResolve 守卫 (2.5+)。
- 导航被确认。
- 调用全局的 afterEach 钩子。
- 触发 DOM 更新。
- 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

### 13.路由器的两种工作模式

```js
const router = new VueRouter({
  // mode: 'history',
  mode: "hash", //默认
});
```

1. 对于一个 url 来说，什么是 hash 值？—— #及其后面的内容就是 hash 值。
2. hash 值不会包含在 HTTP 请求中，即：hash 值不会带给服务器。
3. hash 模式：
   1. 地址中永远带着#号，不美观 。
   2. 若以后将地址通过第三方手机 app 分享，若 app 校验严格，则地址会被标记为不合法(微信 H5 支付的回调地址，不允许有#;App 分享，处理特殊字符时，可能会对#进行编译)。
   3. 兼容性较好。
4. history 模式：

   1. 地址干净，美观 。
   2. 兼容性和 hash 模式相比略差。
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端 404 的问题(connect-history-api-fallback)。

   ```js
   const express = require("express");
   const history = require("connect-history-api-fallback");

   const app = express();
   app.use(history());
   app.use(express.static(__dirname + "/static"));

   app.get("/person", (req, res) => {
     res.send({
       name: "tom",
       age: 18,
     });
   });

   // http://localhost:5005/
   app.listen(5005, (err) => {
     if (!err) console.log("服务器启动成功了！");
   });
   ```

````

### Element-ui组件使用

**全部引入**
main.js
```js
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
````

**按需引入**

1. 安装 babel-plugin-component
2. 配置.babelrc

```js
{
  // "presets": [["es2015", { "modules": false }]],
  "presets": [
    "@vue/cli-plugin-babel/preset",
    ["@babel/preset-env", { "modules": false }
  ]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

3. main.js

```js
import { Button, Row } from "element-ui";
Vue.component(Button.name, Button);
Vue.component(Row.name, Row);
// Vue.use(Button)
// Vue.use(Row)
```

**代码部署与上线**
yarn run builßd  
生成 dist 文件，部署到线上

### 路由元信息 meta

routes 配置中的每个路由对象为 路由记录。路由记录可以是嵌套的，因此，当一个路由匹配成功后，他可能匹配多个路由记录。一个路由匹配到的所有路由记录会暴露为 $route 对象 (还有在导航守卫中的路由对象) 的 $route.matched 数组。因此，我们需要遍历 \$route.matched 来检查路由记录中的 meta 字段。

```js
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // 确保一定要调用 next()
  }
});
```

### 路由导航和数据获取前后顺序问题

- 导航完成之后获取：先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示“加载中”之类的指示。

- 导航完成之前获取：导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航。

导航完成之后获取

```js
// 当你使用这种方式时，我们会马上导航和渲染组件，然后在组件的 created 钩子中获取数据。这让我们有机会在数据获取期间展示一个 loading 状态，还可以在不同视图间展示不同的 loading 状态。

export default {
  data() {
    return {
      loading: false,
      post: null,
      error: null,
    };
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      // replace getPost with your data fetching util / API wrapper
      getPost(this.$route.params.id, (err, post) => {
        this.loading = false;
        if (err) {
          this.error = err.toString();
        } else {
          this.post = post;
        }
      });
    },
  },
};
```

在导航完成前获取数据

```js
// 通过这种方式，我们在导航转入新的路由前获取数据。我们可以在接下来的组件的 beforeRouteEnter 守卫中获取数据，当数据获取成功后只调用 next 方法。在为后面的视图获取数据时，用户会停留在当前的界面，因此建议在数据获取期间，显示一些进度条或者别的指示。如果数据获取失败，同样有必要展示一些全局的错误提醒。
export default {
  data() {
    return {
      post: null,
      error: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    getPost(to.params.id, (err, post) => {
      next((vm) => vm.setData(err, post));
    });
  },
  // 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  beforeRouteUpdate(to, from, next) {
    this.post = null;
    getPost(to.params.id, (err, post) => {
      this.setData(err, post);
      next();
    });
  },
  methods: {
    setData(err, post) {
      if (err) {
        this.error = err.toString();
      } else {
        this.post = post;
      }
    },
  },
};
```

### router-link 的属性汇总

属性有 to 、replace、 append、 tag、 active-class、 exact 、 event、 exact-active-class

- to（必选参数）：类型 string/location

  ```Vue
    //字符串形式
    <router-link to="/home">Home</router-link>
    //动态绑定 v-bind
    <router-link :to="'/home'">Home</router-link>
    <router-link :to="{ path: '/home' }">Home</router-link>
    <router-link :to="{ name: 'User'}">User</router-link>
    // 带参数 参数在url 获取参数 this.$route.query
    <router-link :to="{ name: 'User', query: {color: 'red' }}">query带参数</router-link>
    // 带参数 获取参数 this.$route.params
    <router-link :to="{ name: 'User', params: { color: 'red' }}">params带参数</router-link><br>
  ```

- （vue-route4 已删除）tag 类型 string，默认值 a

  ```Vue
    // 如果想要 <router-link> 渲染成某种标签，例如 <li>
    <router-link :to="'/home'" tag="li">Home</router-link>
    // 如果此时我们想要在这个li标签中添加a标签,如下所示，可以不为a标签添加href属性即可哦
    <router-link :to="{ name: 'User', params: { color: 'red' }}" tag="li">
        <a>User</a>
    </router-link>
  ```

  可以看渲染结果，在这种情况下，<a> 将作为真实的链接 (它会获得正确的 href 的)，而 "激活时的 CSS 类名" 则设置到外层的 li

- active-class : 类型 string 默认值：router-link-active

  ```
  // 修改激活选中的class类名
  <router-link :to="{ name: 'User', query: {color: 'red' }}" active-class="activeClass">带参数</router-link>
  // 全局修改
  const router = new VueRouter({
      mode: 'hash',
      linkActiveClass: 'activeClass', // 全局配置
      routes: [
          { path: '/home', name: 'Home', component: Home, meta: { title: "主页" } },
          { path: '/login', name: 'Login', component: Login, meta: { title: "登录" } },
          { path: '/about', name: 'About', component: About, meta: { title: "关于" } },
          { path: '/user', name: 'User', component: User, meta: { title: "用户" } }
      ]
  })
  ```

- exact-active-class 类型 string 默认值：router-link-exact-active  
   配置当链接被精确匹配的时候应该激活的 class。注意默认值也是可以通过路由构造函数选项 linkExactActiveClass 进行全局配置的，看起来有点模糊，举个栗子，例如：
  router-link 默认情况下的路由是模糊匹配

  ```
  <router-link to="/article" active-class="router-active"></router-link>
  // 当用户访问 /article/1 时会被激活为
  <a href="#/article" class="router-active"></a>

  // 修改一下

  <router-link to="/article" exact-active-class="router-active"></router-link>
  // 当用户访问 /article/1 时会被激活为，不会激活这个link的class
  <a href="#/article"></a>
  ```

- （vue-route4 已删除）exact 类型 boolean 默认值：false
  "是否激活" 默认类名的依据是 inclusive match (全包含匹配)， 举个例子
  `Vue <li><router-link to="/">全局匹配</router-link></li> <li><router-link to="/" exact>exact严格匹配</router-link></li>`
  简单点说，第一个的话，如果地址是/a,或/a/b，……都会匹配成功，
  但加上 exact，只有当地址是/时被匹配，其他都不会匹配成功

- （vue-route4 已删除）event 类型: string | Array<string> 默认值: click
  `<router-link to="/article" event="mouseover">article</router-link>`
  如果我们不加 event，那么默认情况下是当我们点击 article 的时候，跳转到相应的页面，但当我们加上 event 的时候，就可以改变触发导航的事件，比如鼠标移入事件

- replace 类型: boolean 默认值: false
  设置 replace 属性的话，当点击时，会调用 router.replace() 而不是 router.push()，于是导航后不会留下 history 记录
  **push replace go 之间的区别:**

  - router.push() ：导航跑到不同的 URL,这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 url
  - router.replace(): 跟 router.push 作用是一样的，但是，它不会向 history 添加新记录，而是跟它的方法名一样替换掉当前的 history 记录
  - router.go(n): 这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.Go(n)

- append 类型: boolean 默认值: false
  置 append 属性后，则在当前 (相对) 路径前添加基路径
  `<router-link to="a" append>Home</router-link>`
  设置 append 属性后，则在当前路径前添加基路径，例如，我们从/a 导航到一个相对路径 b，如果没有配置 append，则路径为/b，如果配了，则为/a/b

### 快速设置 title

```js
Router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
});
```

### 滚动行为

使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动

```js
/**
 scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
  这个方法返回滚动位置的对象信息，长这样：
  { x: number, y: number }
  { selector: string, offset? : { x: number, y: number }} (offset 只在 2.6.0+ 支持)

  注意: 这个功能只在支持 history.pushState 的浏览器中可用。
 */
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置

    if (savedPosition) {
      return savedPosition;//返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
    } else {
      return { x: 0, y: 0 };//让页面滚动到顶部
    }

    // 模拟“滚动到锚点”
    /* if (to.hash) {
      return {
        selector: to.hash
      }
    } */

    // 异步滚动 2.8.0 新增
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 500);
    }); */

    // 平滑滚动
    /* if (to.hash) {
      return {
        selector: to.hash,
        behavior: 'smooth',
      }
    } */
  }
})
```

### 导航故障|导航失败

- 用户已经位于他们正在尝试导航到的页面
- 一个导航守卫通过调用 next(false) 中断了这次导航
- 一个导航守卫抛出了一个错误，或者调用了 next(new Error())

导航故障是一个 Error 实例，附带了一些额外的属性。要检查一个错误是否来自于路由器，可以使用 isNavigationFailure 函数

- NavigationFailureType 可以帮助开发者来区分不同类型的导航故障。有四种不同的类型：

  - redirected：在导航守卫中调用了 next(newLocation) 重定向到了其他地方。
  - aborted：在导航守卫中调用了 next(false) 中断了本次导航。
  - cancelled：在当前导航还没有完成之前又有了一个新的导航。比如，在等待导航守卫的过程中又调用了 router.push。
  - duplicated：导航被阻止，因为我们已经在目标位置了。

```js
import VueRouter from "vue-router";
const { isNavigationFailure, NavigationFailureType } = VueRouter;

// 正在尝试访问 admin 页面
router.push("/admin").catch((failure) => {
  // isNavigationFailure(failure)，那么就只会检查这个错误是不是一个导航故障
  if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
    // 向用户显示一个小通知
    showToast("Login in order to access the admin panel");

    // 所有的导航故障都会有 to 和 from 属性，分别用来表达这次失败的导航的目标位置和当前位置。
    failure.to.path; // '/admin'
    failure.from.path; // '/'
  }
});
```

### vue-router@4 新功能

#### 组合式 API

在 setup 里面没有访问 this，所以我们不能再直接访问 this.$router 或 this.$route。作为替代，我们使用 useRouter 函数

#### 动态路由

router.addRoute()
router.removeRoute()
router.hasRoute()：检查路由是否存在。
router.getRoutes()：获取一个包含所有路由记录的数组
