# Vue-router

## 1. vue-router的原理

* 路由管理器，原理是改变页面内容（更新视图）但是不重新向服务器发送请求

1. **hash模式**
   * 通过监听hashchange事件，实现更新页面部分内容。url后面会带有`#`号


2. **history模式**

   * 使用HTML5 history的接口，读s取浏览器的历史记录栈。监听popState事件，实现更新页面的部分内容

   * 因为没有`#`号，所以当用户刷新页面时会向服务器发请求导致请求资源为404，因此需要对`nginx`进行一个配置，需要把所有路由都重定向到根页面

3. **区别**

   1. URL格式不同
      * hash模式的URL格式为：`http://example.com/#/path/to/page`，其中`#`后面的部分被称为hash，用于标识不同的路由路径。history模式的URL格式为：`http://example.com/path/to/page`，没有`#`符号
   2. 支持情况不同
      * hash模式在所有浏览器中都被支持，而history模式需要浏览器支持HTML5的History API才能使用。
   3. SEO优化
      * 由于hash模式的URL中只有`#`后面的部分会被浏览器发送给服务器，因此搜索引擎无法获得完整的URL信息，导致不利于SEO优化。而history模式的URL中包含完整的路径信息，可以被搜索引擎爬取，有利于SEO优化。
   4. 刷新页面
      * 在hash模式下，刷新页面不会向服务器发送请求，因为`#`后面的内容不会被发送给服务器。而在history模式下，刷新页面会向服务器发送请求，因为完整的URL需要发送给服务器。
   5. 后端支持
      * 在hash模式下，后端不需要做任何特殊的配置；而在history模式下，需要后端配置支持，以避免在刷新页面时出现404错误。


### 扩展知识

* url中的hash(#符号)： 代表网页中的一个位置，就是该位置的标识符
* 改变`#`后的内容，不会触发网页重载，不会向服务器发送请求
* 改变`#`后的内容，会改变浏览器的访问历史

## 2. 路由守卫

路由守卫分为**全局路由守卫**，**路由独享守卫**，**组件路由守卫**

1. **全局路由守卫**

   1. `beforeEach`,接收`to、from、next`三个参数，每个路由跳转前都会触发，登录验证时用的比较多

   2. `beforeResolve`，和`beforeEach`类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后调用

   3. afterEach，在路由跳转完成后调用，接收to、from两个参数


2. **路由独享守卫**

​		`beforeEnter`,一般配置在路由配置文件中（router/index.js），对进入某个路由之前进行相关操作

3. **组件路由守卫**

> 接收`to、from、next`三个参数

1. `beforeRouteEnter`,进入该组件之前调用，无法获取到vue实例
2. `beforeRouteUpdate`，在当前路由改变，但是该组件被复用时调用
3. `beforeRouteLeave`, 在离开当前组件时调用



## 3. Vue3和vue2的区别

写法上的区别:vue2使用的是`options(选项)Api`,vue3的是`composition Api`(当然vue3也兼容`composition api`)。`options Api`中`methods，compute，data`等api都是分散的。而`composition api`中的代码是根据逻辑功能来组织的,我们可以将一个功能所定义的`methods，compute，data`等api会放在一起,让我们可以更灵活地组合组件逻辑。

vue2将响应式数据放到data函数中,而vue3则是使用`ref`和`reactive`将数据声明为响应式

**响应式实现方式:vue2中是通过`Object.defineProperty`对数据劫持实现的,vue3中则是使用`Proxy`对数据代理实现的。**

生命周期区别:vue3中将`beforeCreate`和`created`合并到了`setup`函数中

根节点: vue3组件允许多个根节点,而vue2只允许一个

内置组件: vue3新增了传送组件`Teleport`和异步依赖处理组件`Suspense`

## 4. vue插件

`vue`实例会有一个`use`函数,它接受的是一个带有`install`函数的对象和一个可选的选项对象,当我们使用 `vue.use(plugin)`或者`app.use(plugin)`会调用我们插件的`install`属性的函数,并且将当前组件的实例传进来.所以在插件中就可以对这个实例进行一些操作来实现我们插件的功能

## 5. vue插槽

插槽`slot`可以理解为占坑，当使用一个组件的时候，在组件标签里的对应的内容就会替换掉这个组件中的`slot`标签。

插槽分为`默认插槽`，`具名插槽`，`作用域插槽`。

1. **默认插槽** 

* 子组件中用`slot`标签来确定渲染位置，父组件使用它时直接在子组件的标签内写入内容即可

```javascript
//子组件
<template>
    <slot />
</template>

//父组件
<Child>
  <div>默认插槽</div>  
</Child>
复制代码
```

2. **具名插槽**

顾名思义就是具有名字的插槽，子组件中可以用`name`熟悉对`slot`命名，父组件在使用的时候通过 `template`中的`v-slot:name`或者`#name`来定义这个插槽中的内容

```javascript
//子组件
<template>
  <slot name="content"></slot>
</template>

//父组件
<Child>
    <template v-slot:content>具名插槽内容</template>
</Child>
复制代码
```

3. **作用域插槽**

子组件中的`slot`可以通过类似组件属性传递的方式将子组件的值传递给父组件中这个子组件的`插槽内容中`（子组件标签内），在父组件使用子组件的时候要用`v-slot`的值进行接收这些参数，默认插槽可以将其直接写在子组件标签上，具名插槽则写在`template`上。而传过来的值只能在子组件标签中或者`template`标签中使用。所以在父组件作用域中获取到了子组件作用域中的变量，可以认为作用域插槽延伸了子组件数据的作用范围，因此叫做作用域插槽

## 6. vue异步更新机制

* vue中的数据发生变化之后，不会立即更新DOM，而是异步更新的
* 当数据发生变化，`Vue`将开启一个**异步更新队列**，视图需要等队列中所有数据变化完成之后，再统一进行更新。
* `message`数据在发现变化的时候，`vue`并不会立刻去更新`Dom`，而是将修改数据的操作放在了一个异步操作队列中

  如果我们一直修改相同数据，异步操作队列还会进行去重

  等待同一事件循环中的所有数据变化完成之后，会将队列中的事件拿来进行处理，进行`DOM`的更新
* 异步更新机制：利用**浏览器的异步任务队列**来实现，首选微任务队列，其次是宏任务队列
* 当vue中的响应式数据发生变化之后，会调用dep.notify方法，去通知watcher执行update方法，并将watcher放入异步watcher队列中，如果同一个watcher被触发多次，也只会被推入到队列中一次，这样可以避免重复修改相同的dom节点。同步任务执行完毕之后，才开始执行异步watcher队列，一次性更新DOM

## 7. Vue 的 nextTick 

Vue.nextTick 或者 vm.$nextTick 的原理其实很简单，就做了两件事：

- 将传递的回调函数用 `try catch` 包裹然后放入 callbacks 数组
- 执行 timerFunc 函数，在浏览器的异步任务队列放入一个刷新 callbacks 数组的函数

* nextTick：由于异步更新，所以如果想要在数据发生变化之后，立即得到更新的DOM的话，就可以使用nextTick，

```javascript
// 修改数据
vm.message = '修改后的值'
// DOM 还没有更新
console.log(vm.$el.textContent) // 原始的值
Vue.nextTick(function () {
  // DOM 更新了
  console.log(vm.$el.textContent) // 修改后的值
})
```

步骤：

1. 把回调函数放入callbacks等待执行
2. 将执行函数放到微任务或者宏任务中
3. 事件循环到了微任务或者宏任务，执行函数依次执行callbacks中的回调

* nextTick在下一次DOM更新循环结束之后调用。因为vue是异步更新的，数据发生改变之后，不会立即更新DOM，而是将要修改的数据操作放在异步操作队列中，（如果一直修改相同的数据，异步操作队列还会进行去重）。等待同一事件循环中所有数据变化完成之后，才会执行异步操作队列中的事件，从而更新dom

## 8. vue响应式原理

- 响应式的核心是通过 `Object.defineProperty` **拦截对数据的访问和设置**
- 响应式的数据分为两类：
  - 对象，循环遍历对象的所有属性，**为每个属性设置 getter、setter，**以达到拦截访问和设置的目的，如果属性值依旧为对象，则递归为属性值上的每个 key 设置 getter、setter
    - 访问数据时（obj.key)进行依赖收集，在 dep 中存储相关的 watcher
    - 设置数据时**由 dep 通知相关的 watcher 去更新**
  - 数组，增强数组的那 7 个可以更改自身的原型方法，然后拦截对这些方法的操作
    - 添加新数据时进行响应式处理，然后由 dep 通知 watcher 去更新
    - 删除数据时，也要由 dep 通知 watcher 去更新
    - 数组更改自身的方法，比如有`push/pop/shift/unshift/fill/splice/sort/reverse/`。（不更改自身的方法,返回新数组，比如`map，filter`）
- 当需要给对象新增属性的时候，为使新增属性也是响应式的，需要使用`vm.set(Object, key, value)`；使其成为响应式的

## 9. vue的mixin

* mixin本质是一个js对象，用于分发vue组件中可复用的功能，包含created、methods、data、computed等选项
* 当组件使用mixin对象时，所有mixin对象的选项都被混入到该组件本身的选项中

## 10. vue组件通信方式

1. 父子组件：使用`props`和`emits`。
   * 子组件通过`props`接收父组件传递过来的参数值。
   * 子组件使用`$emits`触发自定义事件，父组件使用v-on绑定监听器获取子组件传递过来的值
2. 兄弟组件：
   1. 使用中央事件总线Eventbus。兄弟组件使用`$emits`触发自定义事件，第二个参数为传递的值，另一个兄弟组件使用`$on`来监听自定义事件
   2. 通过共同祖辈`$parent`搭桥
3. 祖孙组件：
   * 使用`attrs`和`listeners`
   * 使用provide和inject。在祖先组件中使用provide属性，返回传递的值。在孙子组件中使用inject获取传递过来的值
4. vuex：复杂关系组件间数据的传递，相当于一个共享变量的容器
   * state：用来存储共享变量的地方
   * getter：获取共享变量的值
   * mutations：存放修改state的方法
   * actions：也是用来存放修改state的方法，不过`action`是在`mutations`的基础上进行。常用来做一些异步操作

## 11. vue中key的原理

* key一般和v-for指令结合使用，为每一个vnode设置唯一的ID，它是diff的一种优化策略，可以根据key更准确的、更快的找到对应的节点
* 使用了key的话，vue会根据keys的顺序记录element，曾经拥有了key的element不再出现的话，会被直接remove或者destroyed
* 没有使用key的话，vue会采用就地复用的原则，最小化element的移动，（很有可能就会出现比较了不同key的节点，然后进行了DOM的更新）
* 所以设置key是diff的一种优化策略，它可以在页面更新的时候，减少DOM的操作。提高diff效率
* 在v-for指令中，循环数组的时候，如果将index作为key，起始是一种不太好的解决办法，因为可能会对数组进行删除删除操作，那么数组中元素的位置发生了变化，也就是说数组中的元素并没有和它之前的index绑定，那么这个时候就无法实现就地复用的原则了

## 12. 虚拟DOM

* 虚拟DOM是一个对象，对象的属性记载DOM节点的相关信息
* 由于操作真实的DOM节点代价很大，虚拟DOM和真实DOM节点一一对应，当页面视图发生变化后，会通过diff算法比较虚拟DOM和真实DOM的区别，得出修改的最小单元后，再更新真实DOM节点，从而减少了DOM操作，提高了性能。

## 13. diff算法

* diff算法比较虚拟DOM节点和真实DOM节点之间的不同

* **比较策略**：

  1. 同层之间进行比较，不会跨层比较
  2. 在diff比较的过程中，循环从两边向中间比较

* **源码解释**：

  * 当数据发生改变时，订阅者`watcher`就会调用`patch`给真实的`DOM`打补丁

  * 通过`isSameVnode`进行判断，相同则调用`patchVnode`方法

    **patchVnode做了以下操作：**

    - 找到对应的真实`dom`，称为`el`

    - 如果都有都有文本节点且不相等，将`el`文本节点设置为`Vnode`的文本节点

    - 如果`oldVnode`有子节点而`VNode`没有，则删除`el`子节点

    - 如果`oldVnode`没有子节点而`VNode`有，则将`VNode`的子节点真实化后添加到`el`

    - 如果两者都有子节点，则执行`updateChildren`函数比较子节点

    **updateChildren主要做了以下操作：**

    - 设置新旧`VNode`的头尾指针

    - 新旧头尾指针进行比较，循环向中间靠拢，根据情况调用`patchVnode`进行`patch`重复流程、调用`createElem`创建一个新节点，从哈希表寻找 `key`一致的`VNode` 节点再分情况操作

## 14. 跨域

* 同源策略：协议+主机+端口
* 跨域是浏览器的限制，用postman请求是可以请求到数据的，但是浏览器的限制导致获取不到数据

**Proxy代理**

* 一种特殊的网络服务，允许一个（一般为客户端）通过这个服务与另一个网络终端（一般为服务器）进行非直接的连接。

**方案一**

如果是通过`vue-cli`脚手架工具搭建项目，我们可以通过`webpack`为我们起一个本地服务器作为请求的代理对象

通过该服务器转发请求至目标服务器，得到结果再转发给前端，但是最终发布上线时如果web应用和接口服务器不在一起仍会跨域

在`vue.config.js`文件，新增以下代码

```js
amodule.exports = {
    devServer: {
        host: '127.0.0.1',
        port: 8084,
        open: true,// vue项目启动时自动打开浏览器
        proxy: {
            '/api': { // '/api'是代理标识，用于告诉node，url前面是/api的就是使用代理的
                target: "http://xxx.xxx.xx.xx:8080", //目标地址，一般是指后台服务器地址
                changeOrigin: true, //是否跨域
                pathRewrite: { // pathRewrite 的作用是把实际Request Url中的'/api'用""代替
                    '^/api': "" 
                }
            }
        }
    }
}
```

通过`axios`发送请求中，配置请求的根路径

```js
axios.defaults.baseURL = '/api'
```

**方案二**

* 通过服务端实现代理请求转发

**方案三**

* 通过配置`nginx`实现代理

```js
server {
    listen    80;
    # server_name www.josephxia.com;
    location / {
        root  /var/www/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    location /api {
        proxy_pass  http://127.0.0.1:3000;
        proxy_redirect   off;
        proxy_set_header  Host       $host;
        proxy_set_header  X-Real-IP     $remote_addr;
        proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
    }
}
```

## 15. MVVM模型

* `model`：数据模型； `view`：用户界面； `viewModel`：连接`view`和`model`的桥梁
* viewModel监听view中的用户操作，根据用户操作来更新数据模型，并更新页面显示（监听 View 中的用户操作，并更新 Model 中的数据，同时也监听 Model 中数据的变化，然后更新 View 中的显示。）
* 这样就可以做到数据的双向绑定，使得数据和界面保持同步
* vue中modelview是vue实例，model是vue实例的data选项，view是html模板（双向数据绑定）

## 16. 双向绑定原理

* 使用数据劫持和发布-订阅的模式实现。vue.js会对数据对象进行依赖遍历，将每个属性转换成getter和setter。并在每个属性上添加一个依赖收集器。（依赖收集器记录所有的依赖关系，当一个属性发生变化是时，所有依赖该属性的地方都会被通知）
* 在模板编译阶段，解析模板指令，并在数据对象上添加一个监听器，用于监听表达式的值。当表达式的值发生改变的时候，监听器会通知依赖收集器，依赖收集器会通知所有依赖该属性的地方，从而完成更新视图，双向绑定
* 

## 17. vue实例中data为什么是一个函数

* 如果data是对象的话，就会出现多个组件实例共享一个data对象，造成一个组件实例的状态变化会影响到另一个组件实例。
* 为了使得不同的组件实例，拥有各自独立的数据作用域，使用函数，让每个组件实例都调用一次这个函数，返回新的数据对象，这样组件实例之间互补影响。