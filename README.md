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
