# Vue 全家桶

[codeserver 在线查看项目](https://github1s.com/zhangwen0424/vue_pool/tree/main/2.vue_test)

分类导航

- 1.vue_basic [ Vue 基础](https://github.com/zhangwen0424/vue_pool/tree/main/1.vue_basic)
- 2.vue_test [Vue 脚手架](https://github.com/zhangwen0424/vue_pool/tree/main/2.vue_test)
- 3.vue3_vite [Vue3](https://github.com/zhangwen0424/vue_pool/tree/main/3.vue3_vite)

本文目录

[toc]

# Vue 基础

## 初识 Vue

```txt
初识Vue：
    1.想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象；
    2.root容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法；
    3.root容器里的代码被称为【Vue模板】；
    4.Vue实例和容器是一一对应的；
    5.真实开发中只有一个Vue实例，并且会配合着组件一起使用；
    6.{{xxx}}中的xxx要写js表达式，且xxx可以自动读取到data中的所有属性；
    7.一旦data中的数据发生改变，那么页面中用到该数据的地方也会自动更新；

    注意区分：js表达式 和 js代码(语句)
        1.表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方：
              (1). a
              (2). a+b
              (3). demo(1)
              (4). x === y ? 'a' : 'b'

        2.js代码(语句)
              (1). if(){}
              (2). for(){}
```

```html
<!-- 准备好一个容器 -->
<div id="demo">
  <h1>Hello，{{name.toUpperCase()}}，{{address}}</h1>
</div>

<script type="text/javascript">
  Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示。

  //创建Vue实例
  new Vue({
    el: "#demo", //el用于指定当前Vue实例为哪个容器服务，值通常为css选择器字符串。
    data: {
      //data中用于存储数据，数据供el所指定的容器去使用，值我们暂时先写成一个对象。
      name: "atguigu",
      address: "北京",
    },
  });
</script>
```

## 模板语法

```txt

Vue模板语法有2大类：
  1.插值语法：
      功能：用于解析标签体内容。
      写法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性。
  2.指令语法：
      功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）。
      举例：v-bind:href="xxx" 或  简写为 :href="xxx"，xxx同样要写js表达式，
            且可以直接读取到data中的所有属性。
      备注：Vue中有很多的指令，且形式都是：v-????，此处我们只是拿v-bind举个例子。
```

```html
<!-- 插值语法 -->
<h3>你好，{{name}}</h3>
<!-- 指令语法 -->
<a :href="school.url" x="hello">点我去{{school.name}}学习2</a>
```

## 数据绑定

```txt
Vue中有2种数据绑定的方式：
  1.单向绑定(v-bind)：数据只能从data流向页面。
  2.双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data。
  备注：
    1.双向绑定一般都应用在表单类元素上（如：input、select等）
    2.v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值。
```

```html
<!-- 普通写法 -->
<!-- 单向数据绑定：<input type="text" v-bind:value="name"><br/>
双向数据绑定：<input type="text" v-model:value="name"><br/> -->

<!-- 简写 -->
单向数据绑定：<input type="text" :value="name" /><br />
双向数据绑定：<input type="text" v-model="name" /><br />

<!-- 如下代码是错误的，因为v-model只能应用在表单类元素（输入类元素）上 -->
<!-- <h2 v-model:x="name">你好啊</h2> -->
```

### Vue2.x 响应式数据/双向绑定原理

Vue 数据双向绑定主要是指：数据变化更新视图，视图变化更新数据。其中，View 变化更新 Data，可以通过事件监听的方式来实现，所以 Vue 数据双向绑定的工作主要是如何根据 Data 变化更新 View。
**简述：**
当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，Vue 将遍历此对象所有的 property，并使用 Object.defineProperty 把这些 property 全部转为 getter/setter。这些 getter/setter 对用户来说是不可见的，但是在内部它们让 Vue 能够追踪依赖，在 property 被访问和修改时通知变更。每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。
**深入理解：**

- **监听器** Observer：对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。
- **解析器** Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。
- **订阅者** Watcher：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。每个组件实例都有相应的 watcher 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新——这是一个典型的观察者模式
- **订阅器** Dep：订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。

### Vue3.x 响应式数据原理吗？

- Vue3.x 改用 Proxy 替代 Object.defineProperty。因为 Proxy 可以直接监听对象和数组的变化，并且有多达 13 种拦截方法。并且作为新标准将受到浏览器厂商重点持续的性能优化。Proxy 只会代理对象的第一层，Vue3 是怎样处理这个问题的呢？
  - 判断当前 Reflect.get 的返回值是否为 Object，如果是则再通过 reactive 方法做代理， 这样就实现了深度观测。
  - 监测数组的时候可能触发多次 get/set，那么如何防止触发多次呢？我们可以判断 key 是否为当前被代理对象 target 自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行 trigger。

### Proxy 与 Object.defineProperty 优劣对比

**Proxy 的优势如下**:

- Proxy 可以直接监听对象而非属性；
- Proxy 可以直接监听数组的变化；
- Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；

**Object.defineProperty 的优势如下**:

兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平，因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写

## el 和 data 的两种写法

```txt
data与el的2种写法
  1.el有2种写法
    (1).new Vue时候配置el属性。el:"#root"
    (2).先创建Vue实例，随后再通过vm.$mount('#root')指定el的值。
  2.data有2种写法
    (1).对象式
    (2).函数式
    如何选择：目前哪种写法都可以，以后学习到组件时，data必须使用函数式，否则会报错。
  3.一个重要的原则：
    由Vue管理的函数，一定不要写箭头函数，一旦写了箭头函数，this就不再是Vue实例了。
```

```javascript
//el的两种写法
/* const v = new Vue({
  //el:'#root', //第一种写法
  data:{
    name:'尚硅谷'
  }
})
console.log(v)
v.$mount('#root') //第二种写法 */

// vue3中的写法，需要引入vue3
/* const vm = {
  data(){
    return {
      name:mornki
    }
  }
}
Vue.createApp(vm).mount("#demo") */

//data的两种写法
new Vue({
  el:'#root',
  //data的第一种写法：对象式
  /* data:{
    name:'尚硅谷'
  } */

  //data的第二种写法：函数式
  data(){
    console.log('@@@',this) //此处的this是Vue实例对象
    return{
      name:'尚硅谷'
    }
  }
```

## MVVM 模型

```text
MVVM模型
      1. M：模型(Model) ：data中的数据
      2. V：视图(View) ：模板代码
      3. VM：视图模型(ViewModel)：Vue实例
观察发现：
      1.data中所有的属性，最后都出现在了vm身上。
      2.vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用。
```

```html
<div id="root">
  <h1>测试一下1：{{1+1}}</h1>
  <h1>测试一下2：{{$options}}</h1>
  <h1>测试一下3：{{$emit}}</h1>
  <h1>测试一下4：{{_c}}</h1>
</div>
```

## 数据代理

```javascript
let age = 10;
let obj = {
  name: "1",
  sex: "男",
};
// <!-- 数据代理：通过一个对象代理对另一个对象中属性的操作（读/写）-->
Object.defineProperty(obj, "age", {
  // value: 18,//设置值，单独设置不可枚举，即：Object.keys(obj)=['name', 'sex']
  // enumerable: true,//设置是否可以枚举，设置后：Object.keys(obj)=['name', 'sex', 'age']
  // writable: true,//设置是否可以更改，默认为false
  // configurable: true,//控制属性是否可以被删，默认为false

  //当有人修改person的age属性时，set函数(setter)就会被调用，且会收到修改的具体值
  set(value) {
    console.log("有人修改了age属性：", value);
    age = value;
  },

  //当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
  get() {
    console.log("有人读取了age属性");
    return age;
  },
});
// console.log("obj.keys:",Object.keys(obj));

// 通过修改obj2来修改obj1 ==》 通过obj2对象代理对obj1对象属性操作
let obj1 = { name: "zhangsan" };
let obj2 = { sex: "男" };
Object.defineProperty(obj2, "name", {
  get() {
    return obj1.name;
  },
  set(value) {
    obj1.name = value;
  },
});
/* <!-- 
    1.Vue中的数据代理：
          通过vm对象来代理data对象中属性的操作（读/写）
    2.Vue中数据代理的好处：
          更加方便的操作data中的数据
    3.基本原理：
          通过Object.defineProperty()把data对象中所有属性添加到vm上。
          为每一个添加到vm上的属性，都指定一个getter/setter。
          在getter/setter内部去操作（读/写）data中对应的属性。
  --> */
```

## 事件处理

### 事件基本使用

```html
<div id="demo">
  <!-- 
    事件的基本使用：
      1.使用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名；
      2.事件的回调需要配置在methods对象中，最终会在vm上；
      3.methods中配置的函数，不要用箭头函数！否则this就不是vm了；
      4.methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象；
      5.@click="demo" 和 @click="demo($event)" 效果一致，但后者可以传参；
  -->
  <!-- 事件基本使用 -->
  <button @click="showMsg">点我显示提示信息</button>
  <!-- 事件传参 -->
  <button @click="showInfo($event, 'hello')">点我显示信息（传参）</button>
</div>

<script>
  Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示。
  const vm = new Vue({
    methods: {
      showMsg(event) {
        console.log("event:", event.target);
        alert(1);
      },
      showInfo(event, msg) {
        console.log("$event:", event, msg);
      },
    },
  });
  vm.$mount("#demo");
  console.log(vm);
</script>
```

### 事件修饰符

```html
<div id="demo">
  <!-- 
    Vue中的事件修饰符：
      1.prevent：阻止默认事件（常用）；
      2.stop：阻止事件冒泡（常用）；
      3.once：事件只触发一次（常用）；
      4.capture：使用事件的捕获模式；
      5.self：只有event.target是当前操作的元素时才触发事件；
      6.passive：事件的默认行为立即执行，无需等待事件回调执行完毕；
  -->

  <!-- 阻止默认事件（常用） -->
  <a href="http://baidu.com" @click.prevent>点我跳转</a>
  <!-- 阻止事件冒泡（常用）-->
  <div
    style="width:100px;padding:20px; background-color: red;"
    @click="showMsg('div')"
  >
    <button @click.stop="showMsg('button')">阻止事件冒泡</button>
    <!-- 修饰符可以连用 -->
    <a href="http://baidu.com" @click.prevent.stop>点我跳转</a>
  </div>
  <!-- 事件只触发一次（常用） -->
  <button @click.once="showMsg('我被点击了')">点我显示提示信息</button>
  <!-- 使用事件的捕获模式：点button先弹出div在弹出button -->
  <div
    style="width:100px;padding:20px; background-color: red;"
    @click.capture="showMsg('div')"
  >
    <button @click="showMsg('button')">使用事件的捕获模式</button>
  </div>
  <!-- 只有event.target是当前操作的元素时才触发事件 -->
  <div
    style="width:100px;padding:20px; background-color: blue;"
    @click.self="showMsg('div')"
  >
    <button @click="showMsg('button')">
      只有event.target是当前操作的元素时才触发事件
    </button>
  </div>
  <!-- 事件的默认行为立即执行，无需等待事件回调执行完毕 -->
  <ul
    @wheel.passive="log"
    style="border:1px solid black;height: 50px;width:200px;overflow-y: auto;"
  >
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
</div>

<script>
  Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示。
  const vm = new Vue({
    methods: {
      showMsg(msg) {
        alert(msg);
      },
      log() {
        let i = 0;
        while (i < 100) {
          i++;
          console.log("#");
        }
      },
    },
  });
  vm.$mount("#demo");
  console.log(vm);
</script>
```

### 键盘事件

```html
<div id="demo">
  <!-- 
    1.Vue中常用的按键别名：
        回车 => enter
        删除 => delete (捕获“删除”和“退格”键)
        退出 => esc
        空格 => space
        换行 => tab (特殊，必须配合keydown去使用)
        上 => up
        下 => down
        左 => left
        右 => right
    2.Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名）
    3.系统修饰键（用法特殊）：ctrl、alt、shift、meta
        (1).配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
        (2).配合keydown使用：正常触发事件。
    4.也可以使用keyCode去指定具体的按键（不推荐）
    5.Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名
  -->

  <!-- 鼠标按键 -->
  <input type="text" @keydown.enter="showMsg" placeholder="按下回车打印输入" />
  <!-- 自定义按键 -->
  <input type="text" @keydown.huiche="showMsg" placeholder="按下回车打印输入" />
</div>

<script>
  Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示。
  Vue.config.keyCodes.huiche = 13; //自定义按键别名

  const vm = new Vue({
    methods: {
      showMsg(e) {
        console.log("e.key,e.code:", e.key, e.code); //e.key,e.code: Enter Enter
        console.log(e.target.value);
      },
    },
  });
  vm.$mount("#demo");
</script>
```

## 计算属性

```html
<div id="demo">
  <!-- 
    计算属性：
      1.定义：要用的属性不存在，要通过已有属性计算得来。
      2.原理：底层借助了Objcet.defineproperty方法提供的getter和setter。
      3.get函数什么时候执行？
            (1).初次读取时会执行一次。
            (2).当依赖的数据发生改变时会被再次调用。
      4.优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便。
      5.备注：
          1.计算属性最终会出现在vm上，直接读取使用即可。
          2.如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变。
    -->
  姓：<label for="firstname">{{firstname}}</label><br />
  名：<label for="lastname">{{lastname}}</label><br />

  <!-- 插值语法 -->
  姓名：<label for="fullname">{{firstname}}-{{lastname}}</label><br />
  <!-- methods实现 -->
  姓名：<label for="fullname">{{getFullname()}}</label><br />
  <!-- 计算属性实现 -->
  姓名：<label for="fullname">{{fullname}}</label><br />
</div>

<script>
  Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示。

  const vm = new Vue({
    data() {
      return {
        firstname: "张",
        lastname: "三",
        name: "",
      };
    },
    methods: {
      getFullname() {
        return this.firstname + "-" + this.lastname;
      },
    },
    computed: {
      // 完整写法
      // fullname: {
      //   //get有什么作用？当有人读取fullName时，get就会被调用，且返回值就作为fullName的值
      //   //get什么时候调用？1.初次读取fullName时。2.所依赖的数据发生变化时。
      //   get(){
      //     console.log("get被调用了")
      //     return this.firstname+'-'+this.lastname;
      //   },
      //   //set什么时候调用? 当fullName被修改时。
      //   set(value){
      //     console.log("set被调用了",value);
      //     const arr = value.split('-')
      //     this.firstname = arr[0];
      //     this.lastname = arr[1];
      //   }
      // },
      // 简写
      fullname() {
        console.log("get被调用了");
        return this.firstname + "-" + this.lastname;
      },
    },
  });
  vm.$mount("#demo");
</script>
```

## 监视属性

### 监视属性 watch

```html
<div id="demo">
  <!-- 
    监视属性watch：
      1.当被监视的属性变化时, 回调函数自动调用, 进行相关操作
      2.监视的属性必须存在，才能进行监视！！
      3.监视的两种写法：
          (1).new Vue时传入watch配置
          (2).通过vm.$watch监视

    深度监视：
      (1).Vue中的watch默认不监测对象内部值的改变（一层）。
      (2).配置deep:true可以监测对象内部值改变（多层）。
    备注：
      (1).Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以！
      (2).使用watch时根据数据的具体结构，决定是否采用深度监视。
  -->

  <h1>今天天气很{{info}}</h1>
  <button @click="changeWeather">点击切换天气</button>
  <hr />
  <!-- watch检测一层 -->
  <h1>a值是：{{numbers.a}}</h1>
  <button @click="numbers.a++">点我 a+1</button>
  <hr />
  <!-- watch检测多层 -->
  <h1>bbb值是：{{numbers.b.bb.bbb}}</h1>
  <button @click="numbers.b.bb.bbb++">点我 bbb+1</button>
</div>
<script>
  Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示。

  const vm = new Vue({
    data() {
      return {
        isHot: true,
        numbers: {
          a: 1,
          b: {
            bb: {
              bbb: 2,
            },
          },
        },
      };
    },
    methods: {
      changeWeather() {
        this.isHot = !this.isHot;
        return this.isHot;
      },
    },
    computed: {
      info() {
        return this.isHot ? "炎热" : "凉爽";
      },
    },
    // watch 的第一种写法
    watch: {
      // 正常写法
      isHot: {
        immediate: true, //初始化的时候默认调用一下
        //handler什么时候调用？当isHot发生改变时。
        handler(newValue, oldValue) {
          console.log("isHot 被修改了", newValue, oldValue);
        },
      },
      // 简写
      // isHot(newValue, oldValue){
      //   console.log("isHot 被修改了", newValue, oldValue);
      // },
      // 检测多级结构中某个属性变化，a变化调用handler
      "numbers.a": {
        handler(newValue, oldValue) {
          console.log("a 被改变了", newValue, oldValue);
        },
      },
      // 检测多级结构中全部属性变化，变化不调用 handler
      numbers: {
        deep: true,
        handler(newValue, oldValue) {
          console.log("numbers 被改变了", newValue, oldValue);
        },
      },
    },
  });
  console.log(vm);
  vm.$mount("#demo");
  //  watch 第二种写法
  /* vm.$watch('isHot',{
    immediate: true,
    handler(newValue, oldValue) {
      console.log("isHot被修改了", newValue, oldValue)
    }
  }) */
</script>
```

### watch 和 computed 区别

```html
<div id="demo">
  <!-- 
    computed和watch之间的区别：
        1.computed能完成的功能，watch都可以完成。
        2.watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作。
    两个重要的小原则：
        1.所被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或 组件实例对象。
        2.所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成箭头函数，
          这样this的指向才是vm 或 组件实例对象。
  -->
  姓：<input type="text" v-model="firstname" /><br />
  名：<input type="text" v-model="lastname" /><br />
  姓名(使用 watch )：<label for="fullname">{{fullname}}</label><br />
  姓名(使用 computed )：<label for="fullname">{{name}}</label><br />
</div>
<script>
  Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示。

  const vm = new Vue({
    data() {
      return {
        firstname: "张",
        lastname: "三",
        fullname: "张-三",
      };
    },
    computed: {
      name() {
        console.log("computed： get被调用了");
        return this.firstname + "-" + this.lastname;
        // 下面代码不能正确返回name，返回了空值
        /* setTimeout(()=>{
          console.log("computed： get被调用了")
          return this.firstname + '-' + this.lastname;
        }, 3000) */
      },
    },
    watch: {
      firstname(val) {
        // 下面代码会延迟执行
        setTimeout(() => {
          console.log("watch：this:", this);
          console.log("watch：firstname被改了", val);
          this.fullname = val + "-" + this.lastname;
        }, 3000);
      },
      lastname(val) {
        console.log("watch：lastname 被改了", val);
        this.fullname = this.firstname + "-" + val;
      },
    },
  });
  vm.$mount("#demo");
</script>
```

## 绑定样式

```html
<div id="demo">
  <!-- 
    绑定样式：
      1. class样式
          写法:class="xxx" xxx可以是字符串、对象、数组。
              字符串写法适用于：类名不确定，要动态获取。
              对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。
              数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。
      2. style样式
          :style="{fontSize: xxx}"其中xxx是动态值。
          :style="[a,b]"其中a、b是样式对象。
  -->

  <!-- 绑定class样式 -->
  <h1>绑定class样式</h1>
  <!-- 绑定class样式--字符串写法，适用于：样式的类名不确定，需要动态指定 -->
  <div :class="mood" @click="changeMood">字符串写法,点我改变样式</div>
  <!-- 绑定class样式--数组写法，适用于：要绑定的样式个数不确定、名字也不确定 -->
  <div :class="classArr">数组绑定</div>
  <!-- 绑定class样式--对象写法，适用于：要绑定的样式个数确定、名字也确定，但要动态决定用不用 -->
  <div :class="classObj">对象绑定</div>

  <h1>绑定style样式</h1>
  <!-- 绑定style样式--对象写法 -->
  <div :style="styleObj">数组绑定</div>
  <!-- 绑定style样式--数组写法 -->
  <div :style=""></div>
</div>
<style>
  #demo div {
    width: 200px;
    height: 30px;
    padding: 20px;
  }
  .border {
    border: 1px solid #000;
  }
  .background {
    background-color: red;
  }
  .color {
    color: blue;
  }
</style>
<script>
  Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示。

  const vm = new Vue({
    data() {
      return {
        mood: "",
        classArr: ["border", "color"],
        classObj: {
          border: true,
          color: false,
        },
        styleObj: {
          backgroundColor: "red",
        },
        styleObj2: [
          {
            backgroundColor: "grey",
          },
          {
            fontSize: "12px",
          },
        ],
      };
    },
    methods: {
      changeMood() {
        const arr = ["border", "background", "color"];
        const index = Math.floor(Math.random() * 3);
        this.mood = arr[index];
      },
    },
  });
  console.log(vm);
  vm.$mount("#demo");
</script>
```

## 条件渲染

```html
<!-- 
  条件渲染：
    1.v-if
        写法：
          (1).v-if="表达式" 
          (2).v-else-if="表达式"
          (3).v-else="表达式"
        适用于：切换频率较低的场景。
        特点：不展示的DOM元素直接被移除。
        注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”。
    2.v-show
        写法：v-show="表达式"
        适用于：切换频率较高的场景。
        特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉
    3.备注：使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到。
  -->
<div id="root">
  <!-- v-show做条件渲染 -->
  (使用v-show) 您好！<span v-show="bool">{{name}}</span>
  <hr />
  <!-- v-if做条件渲染 -->
  (使用v-if) hello！<span v-if="bool">{{name}}</span>
  <hr />
  <!-- v-if和else-if连用 -->
  n的值为：<input type="text" v-model="n" /><br />
  (v-if、v-else-if、v-else) 判断n：
  <span v-if="n<0">n小于0</span>
  <span v-else-if="n==0">n等于0</span>
  <span v-else>n大于0</span>
</div>
<script>
  Vue.config.productionTip = false; //阻止vue在启动时生成生产环境提示

  const vm = new Vue({
    el: "#root",
    data: {
      name: "mornki",
      bool: true,
      n: 2,
    },
  });
</script>
```

## 列表渲染

### 基本列表

```html
<div id="root">
  <!-- 
      v-for指令:
        1.用于展示列表数据
        2.语法：v-for="(item, index) in xxx" :key="yyy"
        3.可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）
    -->
  <!-- 遍历数组 -->
  <h1>遍历数组</h1>
  <ul>
    <li v-for="(p,index) of peoples">
      <p>姓名：{{p.name}}, 年龄：{{p.age}}</p>
    </li>
  </ul>
  <!-- 遍历对象 -->
  <h1>遍历对象</h1>
  <ul>
    <li v-for="(val,key) of note">{{key}}：{{val}}</li>
  </ul>
  <!-- 遍历字符串 -->
  <h1>遍历字符串</h1>
  <ul>
    <li v-for="(char, index) of str">{{char}}：{{index}}</li>
  </ul>
  <!-- 指定次数(n从1开始，index为下标从0开始) -->
  <h1>指定次数</h1>
  <ul>
    <li v-for="(n, index) of 4">{{n}}：{{index}}</li>
  </ul>
</div>
<script>
  Vue.config.productionTip = false; //阻止vue在启动时生成生产环境提示

  const vm = new Vue({
    el: "#root",
    data: {
      peoples: [
        { id: 1, name: "张三", age: 18 },
        { id: 2, name: "王五", age: 19 },
        { id: 3, name: "李四", age: 26 },
      ],
      note: {
        title: "vue记录",
        page: 1000,
        author: "mornki",
      },
      str: "hello!mornki!",
    },
  });
</script>
```

### key 的原理

```html
<div id="root">
  <!-- 
      面试题：react、vue中的key有什么作用？（key的内部原理）
          1. 虚拟DOM中key的作用：
              key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 
              随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：
          2.对比规则：
              (1).旧虚拟DOM中找到了与新虚拟DOM相同的key：
                  ①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！
                  ②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
              (2).旧虚拟DOM中未找到与新虚拟DOM相同的key
                  创建新的真实DOM，随后渲染到到页面。
          3. 用index作为key可能会引发的问题：
              1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
                  会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。
              2. 如果结构中还包含输入类的DOM：
                  会产生错误DOM更新 ==> 界面有问题。
          4. 开发中如何选择key?:
              1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
              2.如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，
                使用index作为key是没有问题的。
      -->

  <!-- 遍历数组 -->
  <h1>遍历数组</h1>
  <button @click.once="add">添加一个老王</button>
  <ul>
    <li v-for="(p,index) of peoples">
      <p>
        姓名：{{p.name}}, 年龄：{{p.age}}
        <input type="text" />
      </p>
    </li>
  </ul>
</div>
<script>
  Vue.config.productionTip = false; //阻止vue在启动时生成生产环境提示

  const vm = new Vue({
    el: "#root",
    data: {
      peoples: [
        { id: 1, name: "张三", age: 18 },
        { id: 2, name: "王五", age: 19 },
        { id: 3, name: "李四", age: 26 },
      ],
    },
    methods: {
      add() {
        const people = { id: 4, name: "老王", age: 45 };
        this.peoples.unshift(people);
      },
    },
  });
</script>
```

### 列表的过滤

```html
<div id="root">
  <!-- 列表过滤 -->
  <h1>列表过滤</h1>
  过滤：<input type="text" v-model="keyWord" placeholder="请输入姓名关键字" />
  <ul>
    <li v-for="(p,index) of filterPeoples" :key="p.id">
      <p>姓名：{{p.name}}, 年龄：{{p.age}}</p>
    </li>
  </ul>
</div>
<script>
  Vue.config.productionTip = false; //阻止vue在启动时生成生产环境提示

  // watch实现
  /* const vm = new Vue({
    el:'#root',
    data: {
      keyWord: '',
      peoples: [
        {id:1, name: '张三', age:18},
        {id:2, name: '王五', age:19},
        {id:3, name: '李四', age:26},
      ],
      filterPeoples: [],
    },
    watch: {
      keyWord: {
        immediate:true,
        handler(val) {
          this.filterPeoples = this.peoples.filter(function(p) {
            return p.name.indexOf(val) != -1;
          })
        }
      }
    },
  }); */

  // computed实现
  const vm = new Vue({
    el: "#root",
    data: {
      keyWord: "",
      peoples: [
        { id: 1, name: "张三", age: 18 },
        { id: 2, name: "王五", age: 19 },
        { id: 3, name: "李四", age: 26 },
      ],
    },
    computed: {
      filterPeoples() {
        // 注意filter里面需要是箭头函数，不然this指向不是vm
        return this.peoples.filter((p) => {
          return p.name.indexOf(this.keyWord) != -1;
        });
      },
    },
  });
</script>
```

### 列表排序

```html
<div id="root">
  <!-- 列表排序 -->
  <h1>列表排序</h1>
  <p>
    过滤：<input type="text" v-model="keyWord" placeholder="请输入姓名关键字" />
  </p>
  <p>
    排序：<span v-if="sortType==0">原顺序</span>
    <span v-else-if="sortType==-1">降序</span>
    <span v-else>升序</span>
    <button @click="sortType = 0">原顺序</button>
    <button @click="sortType = -1">年龄降序</button>
    <button @click="sortType = 1">年龄升序</button>
  </p>
  <ul>
    <li v-for="(p,index) of filterPeoples" :key="p.id">
      <p>姓名：{{p.name}}, 年龄：{{p.age}}</p>
    </li>
  </ul>
</div>
<script>
  Vue.config.productionTip = false; //阻止vue在启动时生成生产环境提示

  // computed实现
  const vm = new Vue({
    el: "#root",
    data: {
      keyWord: "",
      peoples: [
        { id: 1, name: "张三", age: 18 },
        { id: 2, name: "王五", age: 19 },
        { id: 3, name: "李四", age: 26 },
        { id: 4, name: "李四四", age: 16 },
        { id: 5, name: "王三", age: 22 },
      ],
      sortType: 0,
    },
    computed: {
      filterPeoples() {
        // 注意filter里面需要是箭头函数，不然this指向不是vm
        const arr = this.peoples.filter((p) => {
          return p.name.indexOf(this.keyWord) != -1;
        });
        // 判断是否需要排序
        if (this.sortType) {
          arr.sort((p1, p2) => {
            return this.sortType == 1 ? p1.age - p2.age : p2.age - p1.age;
          });
        }
        return arr;
      },
    },
  });
</script>
```

### 模拟一个数据监测

```javascript
let data = {
  name: "mornki",
  age: "18",
};
// 创建一个监测的实例对象，用于监测data中的数据
const obs = new Observer(data);
console.log("obs:", obs);

function Observer(obj) {
  let keys = Object.keys(obj);
  keys.forEach((k) => {
    Object.defineProperty(this, k, {
      set(val) {
        console.log("set被调用", val);
        obj[k] = val;
      },
      get() {
        console.log("get被调用了");
        return obj[k];
      },
    });
  });
}
```

### Vue 数据监测原理

```html
<!--
  Vue监视数据的原理：
    1. vue会监视data中所有层次的数据。
    2. 如何监测对象中的数据？
          通过setter实现监视，且要在new Vue时就传入要监测的数据。
            (1).对象中后追加的属性，Vue默认不做响应式处理
            (2).如需给后添加的属性做响应式，请使用如下API：
                    Vue.set(target，propertyName/index，value) 或 
                    vm.$set(target，propertyName/index，value)
    3. 如何监测数组中的数据？
          通过包裹数组更新元素的方法实现，本质就是做了两件事：
            (1).调用原生对应的方法对数组进行更新。
            (2).重新解析模板，进而更新页面。
    4.在Vue修改数组中的某个元素一定要用如下方法：
          1.使用这些API:
              push() // 向数组的末尾添加一个或更多元素，并返回新的长度
              pop() // 删除并返回数组的最后一个元素
              shift() // 删除并返回数组的第一个元素
              unshift() // 向数组的开头添加一个或更多元素，并返回新的长度
              splice() // 删除元素，并向数组添加新元素，如：arr.splice(2, 3); // 删除第三个元素以后的三个数组元素(包含第三个元素)
              sort() // 对数组元素排序，返回数组地址, 在原数组上进行排序，不生成副本
              reverse() // 颠倒数组中元素的顺序
          2.Vue.set() 或 vm.$set()
        注意：直接对数组中数据通过下标方式更改也不会触发响应式页面
        特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！
        
        splice和slice(补充js数组知识)
            
            splice()
                定义：从数组中添加或删除元素，然后返回被删除的数组元素
                语法：arrayObject.splice(start,deleteCount,item1,.....,itemX)
                参数说明：
                    ①：start： 必需。规定从何处添加/删除元素。该参数是开始插入和（或）删除的数组元素的下标，必须是数字。
                    ②：deleteCount：必需。表示删除的元素数量，如果为0，则表示不删除数组元素。如果未规定此参数，则删除从 index 开始到原数组结尾的所有元素。
                    ③：item1：可选。规定要添加到数组的新元素。从 index 所指的下标处开始插入。
                    ④：itemX ：可选。可向数组添加若干元素。
                
                注意：参数为负数的问题，如果start为负数，则会从数组的最后开始计数，如果start为-1，则表明是数组的最后一个数，如果start为-2，则为数组的倒数第二个数。
           
            slice()
        　　　　  定义：从已有的数组中返回你选择的某段数组元素
        　　　　  语法：arrayObject.slice(start,end)
                 参数说明：
          　　　　　　①：start表示从何处开始选取，end表示从何处开始结束选取，表示一个选取的范围
          　　　　　　②：start可以为负数，此时它规定从数组尾部开始算起的位置。也就是-1 ，指最后一个元素，-2 指倒数第二个元素，以此类推
          　　　　　　③：end如果没有被指定参数，数组会包含从 start 到最后一个数组元素的所有元素
          　　　　　　④：slice()方法不会修改数组本身，而是返回所选取范围的数组元素。如果想删除数组中的某一个元素，需要使用splice()
-->
<div id="root">
  <h1>学生信息</h1>
  <button @click.once="addAttr">添加性别属性</button>
  <p>姓名：{{student.name}}</p>
  <p>性别：{{student.sex}}</p>
  <p v-if="student.age">年龄：{{student.age}}</p>
</div>
<script>
  Vue.config.productionTip = false;
  const vm = new Vue({
    el: "#root",
    data: {
      student: {
        name: "mornki",
        sex: "女",
      },
    },
    methods: {
      addAttr() {
        // this.student.age = 10;//可以添加到vm中，但是不会更新页面，不受vue监管
        // 添加属性并托管给vue管理的两种写法
        Vue.set(this.student, "age", 18);
        // this.$set(this.student, 'age', 18)
      },
    },
  });
</script>
```

## 收集表单数据

```html
<div id="root">
  <!-- 
      收集表单数据：
        若：<input type="text"/>，则v-model收集的是value值，用户输入的就是value值。
        若：<input type="radio"/>，则v-model收集的是value值，且要给标签配置value值。
        若：<input type="checkbox"/>
            1.没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）
            2.配置input的value属性:
                (1)v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）
                (2)v-model的初始值是数组，那么收集的的就是value组成的数组
        备注：v-model的三个修饰符：
                lazy：失去焦点再收集数据
                number：输入字符串转为有效的数字
                trim：输入首尾空格过滤
      -->
  <form @submit.prevent="demo">
    <br />
    账号：<input type="text" v-model.trim="form.account" /><br /><br />
    密码：<input type="password" v-model.trim="form.password" /><br /><br />
    年龄：<input type="number" v-model.number="form.age" /><br /><br />
    性别：<input type="radio" v-model="form.sex" value="female" />女
    <input type="radio" v-model="form.sex" value="male" />男<br /><br />
    <!-- 值为数组 -->
    爱好（arr）：<input type="checkbox" v-model="form.hobby" value="eat" />吃
    <input type="checkbox" v-model="form.hobby" value="look" />看
    <input type="checkbox" v-model="form.hobby" value="read" />读<br /><br />
    <!-- 值为非数组 -->
    爱好（obj）：<input
      type="checkbox"
      v-model="form.hobbyObj.eat"
      value="eat"
    />吃 <input type="checkbox" v-model="form.hobbyObj.look" value="look" />看
    <input
      type="checkbox"
      v-model="form.hobbyObj.read"
      value="read"
    />读<br /><br />
    地区：
    <select v-model="form.city">
      <option value="beijing">北京</option>
      <option value="shanghai">上海</option>
      <option value="henan">河南</option></select
    ><br /><br />
    其他：
    <textarea v-model.lazy="form.other"></textarea><br /><br />
    <input type="checkbox" v-model="form.agree" />阅读并接受<a
      href="https://github.com/zhangwen0424/vue_basic"
      >用户协议</a
    >

    <br /><br /><button>提交</button>
  </form>
</div>
<script>
  Vue.config.productionTip = false; //阻止vue在启动时生成生产环境提示

  const vm = new Vue({
    el: "#root",
    data: {
      form: {
        account: "",
        password: "",
        age: 18,
        sex: "female",
        hobby: ["look"],
        hobbyObj: {
          look: true,
          eat: false,
          read: true,
        },
        city: "beijing",
        other: "",
        agree: "",
      },
    },
    methods: {
      demo() {
        console.log("表单被提交了", JSON.stringify(this.form));
      },
    },
  });
</script>
```

## 过滤器

```html
<!-- 
      过滤器：
        定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。
        语法：
            1.注册过滤器：Vue.filter(name,callback) 或 new Vue{filters:{}}
            2.使用过滤器：{{ xxx | 过滤器名}}  或  v-bind:属性 = "xxx | 过滤器名"
        备注：
            1.过滤器也可以接收额外参数、多个过滤器也可以串联
            2.并没有改变原本的数据, 是产生新的对应的数据
            3.过滤器中this指向window
    -->
<div id="root">
  全部数据：
  <p>{{peoples}}</p>
  过滤年龄>18：
  <p>{{peoples | filterAge}}</p>
  过滤年龄>18且为女：
  <p>{{peoples | filterAge('女')}}</p>
  <span :x="str | mySlice(1212)"></span>
</div>
<script>
  Vue.config.productionTip = false; //阻止vue在启动时生成生产环境提示
  // 全局注册
  Vue.filter("mySlice", function (str, val) {
    return str.slice(0, 5);
  });
  const vm = new Vue({
    el: "#root",
    data: {
      peoples: [
        { id: 1, name: "mornki", age: 19, sex: "女" },
        { id: 2, name: "小名", age: 29, sex: "男" },
        { id: 3, name: "小米", age: 16, sex: "女" },
        { id: 4, name: "小花", age: 10, sex: "男" },
      ],
      str: "hello!mornki",
    },
    // 局部注册
    filters: {
      filterAge(peoples, sex) {
        return peoples.filter((p) => {
          return p.age >= 18 && (sex ? p.sex == sex : true);
        });
      },
    },
  });
</script>
```

## 内置指令

```html
<!-- 
    我们学过的指令：
        v-bind	: 单向绑定解析表达式, 可简写为 :xxx，动态参数的缩写 (2.6.0+) <a :[key]="url"> ... </a>
        v-model	: 双向数据绑定
        v-for  	: 遍历数组/对象/字符串
        v-on   	: 绑定事件监听, 可简写为@， 动态参数的缩写 (2.6.0+) <a @[event]="doSomething"> ... </a>
        v-if 	 	: 条件渲染（动态控制节点是否存存在）
        v-else 	: 条件渲染（动态控制节点是否存存在）
        v-show 	: 条件渲染 (动态控制节点是否展示)
    v-text指令：
        1.作用：向其所在的节点中渲染文本内容。
        2.与插值语法的区别：v-text会替换掉节点中的内容，{{xx}}则不会。
    v-html指令：
        1.作用：向指定节点中渲染包含html结构的内容。
        2.与插值语法的区别：
              (1).v-html会替换掉节点中所有的内容，{{xx}}则不会。
              (2).v-html可以识别html结构。
        3.严重注意：v-html有安全性问题！！！！
              (1).在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
              (2).一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！
    v-cloak指令（没有值）：
        1.本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性。
        2.使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题。
    v-once指令：
          1.v-once所在节点在初次动态渲染后，就视为静态内容了。
          2.以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。
    v-pre指令：
        1.跳过其所在节点的编译过程。
        2.可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。
  -->
<div id="root">
  <p v-text="text"></p>
  <p v-html="html"><span>haha</span></p>
  <p v-cloak>{{msg}}</p>
  <button @click.once="n++;">点我n+1(只执行一次)</button> n的值：{{n}}
  <h2 v-pre>Vue其实很简单</h2>
</div>
<style>
  [v-cloak] {
    display: none;
  }
</style>
<script>
  Vue.config.productionTip = false;
  const vm = new Vue({
    el: "#root",
    data: {
      text: "hello mornki!",
      html: "<h4>你好啊!</h4>",
      msg: "2s后我变化啦！ ",
      n: 0,
    },
    watch: {
      msg: {
        immediate: true,
        handler() {
          setTimeout(() => {
            console.log("msg被获取啦~");
            this.msg = "你看到我啦~~~~";
          }, 1000 * 2);
        },
      },
    },
  });
</script>
```

## 自定义指令

```html
<div id="root">
  <!-- 
    需求1：定义一个v-big指令，和v-text功能类似，但会把绑定的数值放大10倍。
    需求2：定义一个v-fbind指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点。
    自定义指令总结：
        一、定义语法：
              (1).局部指令：
                    new Vue({
                      directives:{指令名:配置对象}
                      或
                      directives{指令名:回调函数}
                    })
              (2).全局指令：
                      Vue.directive(指令名,配置对象) 或   Vue.directive(指令名,回调函数)
        二、配置对象中常用的3个回调：
              (1).bind：指令与元素成功绑定时调用。
              (2).inserted：指令所在元素被插入页面时调用。
              (3).update：指令所在模板结构被重新解析时调用。
        三、备注：
              1.指令定义时不加v-，但使用时要加v-；
              2.指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。
  -->
  <p>当前n的值为：{{n}}</p>
  <button @click="add">点我n+1</button>
  <p>放大10倍后的n的值为:<span v-big="n"></span></p>
  <input type="text" v-fbind:value="n" />
</div>
<script>
  Vue.config.productionTip = false;

  //定义全局指令
  /* Vue.directive('fbind',{
    //指令与元素成功绑定时（一上来）
    bind(element,binding){
      element.value = binding.value
    },
    //指令所在元素被插入页面时
    inserted(element,binding){
      element.focus()
    },
    //指令所在的模板被重新解析时
    update(element,binding){
      element.value = binding.value
    }
  }) */
  const vm = new Vue({
    el: "#root",
    data: {
      n: 1,
    },
    methods: {
      add() {
        this.n++;
      },
    },
    directives: {
      //big函数何时会被调用？1.指令与元素成功绑定时（一上来）。2.指令所在的模板被重新解析时。
      /* 'big-number'(element,binding){
        // console.log('big')
        element.innerText = binding.value * 10
      }, */
      big(element, binding) {
        console.log("big", this); //注意此处的this是window
        console.log("element", element); //注意此处的this是window
        console.log("binding", binding); //注意此处的this是window
        element.innerText = binding.value * 10;
      },
      fbind: {
        //指令与元素成功绑定时（一上来）
        bind(element, binding) {
          console.log("bind");
          element.value = binding.value;
        },
        //指令所在元素被插入页面时
        inserted(element, binding) {
          element.focus();
        },
        update(element, binding) {
          console.log("update");
          element.value = binding.value;
        },
      },
    },
  });
</script>
```

## 生命周期

![Vue 生命周期](https://raw.githubusercontent.com/zhangwen0424/vue_basic/master/imgs/%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)

```html
<!-- 
    生命周期：
        1.又名：生命周期回调函数、生命周期函数、生命周期钩子。
        2.是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数。
        3.生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的。
        4.生命周期函数中的this指向是vm 或 组件实例对象。
    常用的生命周期钩子：
          1.mounted: 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
          2.beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。
    关于销毁Vue实例
        1.销毁后借助Vue开发者工具看不到任何信息。
        2.销毁后自定义事件会失效，但原生DOM事件依然有效。
        3.一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。
-->
```

- **beforeCreate**
  在当前阶段 data、methods、computed 以及 watch 上的数据和方法都不能被访问
- **created**
  在实例创建完成后发生，当前阶段已经完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发 updated 函数。可以做一些初始数据的获取，在当前阶段无法与 Dom 进行交互，如果非要想，可以通过 vm.$nextTick 来访问 Dom
- **beforeMount**
  发生在挂载之前，在这之前 template 模板已导入渲染函数编译。而当前阶段虚拟 Dom 已经创建完成，即将开始渲染。在此时也可以对数据进行更改，不会触发 updated
- **mounted**
  在挂载完成后发生，在当前阶段，真实的 Dom 挂载完毕，数据完成双向绑定，可以访问到 Dom 节点，使用$refs 属性对 Dom 进行操作
- **beforeUpdate**
  发生在更新之前，也就是响应式数据发生更新，虚拟 dom 重新渲染之前被触发，你可以在当前阶段进行更改数据，不会造成重渲染
- **updated**
  发生在更新完成之后，当前阶段组件 Dom 已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新
- **beforeDestroy**
  发生在实例销毁之前，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除计时器
- **destroyed**
  发生在实例销毁之后，这个时候只剩下了 dom 空壳。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁
- **activited keep-alive** 专属
  组件被激活时调用
- **deactivated keep-alive** 专属
  组件被销毁时调用

### Vue 中组件生命周期调用顺序

- 组件的调用顺序都是先父后子,渲染完成的顺序是先子后父。
- 组件的销毁操作是先父后子，销毁完成的顺序是先子后父。

### 什么阶段才能访问操作 DOM？

在钩子函数 mounted 被调用前，Vue 已经将编译好的模板挂载到页面上，所以在 mounted 中可以访问操作 DOM。

### 你的接口请求一般放在哪个生命周期中？

可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。但是推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：

- 能更快获取到服务端数据，减少页面 loading 时间；
- ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；

## 非单文件组件

```Vue
<!--
  Vue中使用组件的三大步骤：
      一、定义组件(创建组件)
      二、注册组件
      三、使用组件(写组件标签)
  一、如何定义一个组件？
        使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；
        区别如下：
            1.el不要写，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。
            2.data必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系。
        备注：使用template可以配置组件结构。
  二、如何注册组件？
          1.局部注册：靠new Vue的时候传入components选项
          2.全局注册：靠Vue.component('组件名',组件)
  三、编写组件标签：
          <school></school>

  几个注意点：
    1.关于组件名:
          一个单词组成：
                第一种写法(首字母小写)：school
                第二种写法(首字母大写)：School
          多个单词组成：
                第一种写法(kebab-case命名)：my-school
                第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)
          备注：
              (1).组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。
              (2).可以使用name配置项指定组件在开发者工具中呈现的名字。
    2.关于组件标签:
          第一种写法：<school></school>
          第二种写法：<school/>
          备注：不用使用脚手架时，<school/>会导致后续组件不能渲染。
    3.一个简写方式：
          const school = Vue.extend(options) 可简写为：const school = options

  关于VueComponent：
        1.school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。
        2.我们只需要写<school/>或<school></school>，Vue解析时会帮我们创建school组件的实例对象，
          即Vue帮我们执行的：new VueComponent(options)。
        3.特别注意：每次调用Vue.extend，返回的都是一个全新的VueComponent！！！！
        4.关于this指向：
            (1).组件配置中：
                  data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】。
            (2).new Vue(options)配置中：
                  data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】。
        5.VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）。
          Vue的实例对象，以后简称vm。

  1.一个重要的内置关系：VueComponent.prototype.__proto__ === Vue.prototype（prototype：显示原型属性，__proto__：隐式原型属性）
  2.为什么要有这个关系：让组件实例对象（vc）可以访问到 Vue原型上的属性、方法。
-->
<div id="root">
  <hello></hello>
  <school></school>
  <!-- 可以通过vm.$ref获取vc -->
  <student ref="student"></student>
</div>
<script>
  Vue.config.productionTip = false;

  // 定义school组件
  const school = Vue.extend({
    // el:'#root', //组件定义时，一定不要写el配置项，因为最终所有的组件都要被一个vm管理，由vm决定服务于哪个容器。
    name: "SchoolComponent",// 定义组件在开发者工具中显示的名字
    template: `
      <p>{{schoolname}}</p>
    `,
    data() {
      return {
        schoolname: '上海大学',
      }
    }
  });
  // 定义student组件
  const student = Vue.extend({
    template: `
      <div>
        <span>姓名： {{name}}</span>
        <span>年龄： {{age}}</span>
      </div>
    `,
    data() {
      return {
        name: "mornki",
        age: 18
      }
    },
  })
  // 全局注册组件
  Vue.component('hello', {
    template:`
      <div>
        {{msg}}
      </div>
    `,
    data() {
      return {
        msg: '您好啊!'
      }
    }
  })
  const vm = new Vue({
    el: "#root",
    components: {
      school,
      student
    }
  })
</script>
```

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

1. 功能：可以把多个组件共用的配置提取成一个混入对象
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
