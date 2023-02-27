# Javascript

## 1. 事件循环机制

* js是单线程的，任务分为同步任务，和异步任务。先执行同步任务，再执行异步任务

  * 同步任务在主线程内执行
  * 异步任务先进行`event table`中，当触发事件完成时，再从`event table`中移入`event queue`
  * 当主线程空闲时，才会读取事件列队中的函数执行，
  * 此过程不断循环

* 异步任务分为宏任务和微任务

  * 宏任务：setTimeOut,`setInterval`, `setImdiate`
  * 微任务：`promise`, `process.nextTick`
  * 宏任务和微任务同为异步任务，但是二者进入的`event queue`是不同的队列
  * 遇到宏任务，先执行宏任务，将宏任务放入eventqueue，然后在执行微任务，将微任务放入eventqueue。这两个queue不是一个queue。当你往外拿的时候先从微任务里拿这个回掉函数，然后再从宏任务的queue上拿宏任务的回掉函数。

* 例子：

  ```javascript
  console.log('1');
  
  setTimeout(function() {
      console.log('2');
      process.nextTick(function() {
          console.log('3');
      })
      new Promise(function(resolve) {
          console.log('4');
          resolve();
      }).then(function() {
          console.log('5')
      })
  })
  process.nextTick(function() {
      console.log('6');
  })
  new Promise(function(resolve) {
      console.log('7');
      resolve();
  }).then(function() {
      console.log('8')
  })
  
  setTimeout(function() {
      console.log('9');
      process.nextTick(function() {
          console.log('10');
      })
      new Promise(function(resolve) {
          console.log('11');
          resolve();
      }).then(function() {
          console.log('12')
      })
  })
  
  ```

  * 输出：1，7，6，8    2，4，3，5  9，11，10，12

  ```javascript
  console.log(1)
  setTimeout(()=>{
      console.log(2)
  }, 0)
  new Promise((resolve, reject)=>{
      console.log('new Promise')
      resolve()
  }).then(()=>{
      console.log('then')
  })
  console.log(3)
  //流程如下：输出1，new Promise, 3, then, 2
  // 遇到 console.log(1) ，直接打印 1
  // 遇到定时器，属于新的宏任务，留着后面执行
  // 遇到 new Promise，这个是直接执行的，打印 'new Promise'
  // .then 属于微任务，放入微任务队列，后面再执行
  // 遇到 console.log(3) 直接打印 3
  // 好了本轮宏任务执行完毕，现在去微任务列表查看是否有微任务，发现 .then 的回调，执行它，打印 'then'
  // 当一次宏任务执行完，再去执行新的宏任务，这里就剩一个定时器的宏任务了，执行它，打印 2
  ```

  

## 2. 防抖和节流

* 防抖（debounce）：防止单位事件内，事件触发多次。

  * 代码实现重在重新计时。
  * 业务场景：比如用户重复点击登录按钮，使用防抖，可减少发送登录请求的次数

  ```javascript
  function debounce(fn, wait) {
    let timer;
    return function () {
      let _this = this;
      let args = arguments;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(function () {
        fn.apply(_this, args);
      }, wait);
    };
  
  ```

* 节流（throttle）：限制单位事件内事件触发的频率。在单位事件内，事件只能触发一次。

  * 代码实现重在开锁和关锁
  * 比如scroll事件，每隔一秒计算一次位置信息

  ```javascript
  function thorttle2(fn, wait) {
    let timer;
    return function () {
      let _this = this;
      let args = arguments;
  
      if (!timer) {
        timer = setTimeout(function () {
          timer = null;
          fn.apply(_this, args);
        }, wait);
      }
    };
  }
  ```


## 3. Undefined == null

* 双等号，结果为true。双等号会进行类型的转换
* 三个等号（绝对相等），结果为false，因为undefined的类型是Undefined，null的类型是Object，所以自然不相等。三个等号不会进行类型的转换

## 4. 闭包、作用域、this

* **闭包：**在一个函数内部再定义一个函数，内层函数可以使用外层函数的变量
  * 当外层函数执行完词法环境销毁之后，由于内层函数可以包含对外层函数词法环境的引用，所以即使创建时所在的执行上下文被销毁，但是词法环境依然存在。从而延长变量的生命周期
  * **作用：**1. 创建私有变量。2. 延长变量的生命周期
  * **缺点**： **a**、会增加对内存的使用量，影响性能。    **b**、不正确的使用闭包会造成内存泄漏。
* **作用域**：决定了代码区块中变量和其它区块的可见性。分为全局作用域、函数作用域、块级作用域
  * 全局作用域：全局作用域下声明的变量可以在程序的任意位置访问
  * 函数作用域：如果一个变量是在函数内部声明的它就在一个函数作用域下面。这些变量只能在函数内部访问，不能在函数以外去访问
  * **块级作用域**：在大括号中使用`let`和`const`声明的变量存在于块级作用域中。在大括号之外不能访问这些变量
  * js遵循的**词法作用域**，也叫静态作用域，变量在创建时，其作用域就被确定好了


```javascript
var a = 2;
function foo(){
    console.log(a)
}
function bar(){
    var a = 3;
    foo();
}
bar()		//输出2，因为foo的作用域是全局的，这里foo取不到bar中的变量
```

* 箭头函数没有this，箭头函数的this指向函数声明时所在的作用域下的this，箭头函数的this在编译的时候就已经确定了。
* 普通函数的this需要在调用的时候才能确定
* **作用域链**：从当前位置的作用域向外层作用域不断的搜查而产生的链表即为作用域链
* **执行上下文**：见下面
* **词法环境**：登记变量声明、函数声明的地方，这样取变量的时候，就知道去哪里取。词法环境是在代码定义的时候就确定了，不是在执行的过程中动态确定的。JS就采用的是这种词法作用域（静态作用域）（比如箭头函数this指向）
* 

## 5. async/await

* await用于等待异步方法的执行，不管await后面跟的是什么，后面的代码都会被阻塞

  ```javascript
  async function fn1 (){
      console.log(1)
      await fn2()
      console.log(2) // 阻塞
  }
  
  async function fn2 (){
      console.log('fn2')
  }
  
  fn1()
  console.log(3)
  //输出结果为：1，fn2，3，2
  ```

  

* await后面跟的是一个promise对象，返回该对象的结果，如果不是promise对象，直接返回对应的值

* async函数返回一个promise对象，

* async用来声明一个方法，await用来等待异步方法的执行

```javascript
async function async1() {
    console.log('async1 start')
    await async2()	//阻塞
    console.log('async1 end')	//加入微任务列表
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('settimeout')	//加入宏任务列表
})
async1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')		//微任务列表
})
console.log('script end')
1. 执行整段代码，遇到 console.log('script start') 直接打印结果，输出 script start
2. 遇到定时器了，它是宏任务，先放着不执行
3. 遇到 async1()，执行 async1 函数，先打印 async1 start，下面遇到await怎么办？先执行 async2，打印 async2，然后阻塞下面代码（即加入微任务列表），跳出去执行同步代码
4. 跳到 new Promise 这里，直接执行，打印 promise1，下面遇到 .then()，它是微任务，放到微任务列表等待执行
最后一行直接打印 script end，现在同步代码执行完了，开始执行微任务，即 await下面的代码，打印 async1 end
5. 继续执行下一个微任务，即执行 then 的回调，打印 promise2
6. **上一个宏任务所有事都做完了，开始下一个宏任务，就是定时器** ，打印 settimeout
所以最后的结果是：script start、async1 start、async2、promise1、script end、async1 end、promise2、settimeout
```

## 6. Ajax原理

* 详见https://vue3js.cn/interview/JavaScript/ajax.html#%E4%B8%80%E3%80%81%E6%98%AF%E4%BB%80%E4%B9%88

* ajax向服务器异步发送javascript和xml，ajax利用`xmlHttpRequest`对象向服务器发送请求，然后浏览器继续做其它的事，等服务器返回响应内容后，再利用javscript操作DOM从而更新页面

* 可以在不重新加载整个页面的情况下，与服务器交换数据，从而更新部分网页

* **实现过程：**

  1. 创建`xmlHttpRequest`对象，
  2. 调用open方法与服务器建立连接
  3. 调用send方法，把数据发送给服务器
  4. 通过xmlHttpRequest对象提供的`onReadyStateChange`监听服务器端的通信状态
     1. 状态分5种，分别取值为0，1，2，3，4
  5. 接收并处理服务器端向客户端响应的数据结果
  6. 把数据结果更新到HTML页面中

* 封装Ajax：

  ```javascript
  //封装一个ajax请求
  function ajax(options) {
      //创建XMLHttpRequest对象
      const xhr = new XMLHttpRequest()
  
  
      //初始化参数的内容
      options = options || {}
      options.type = (options.type || 'GET').toUpperCase()
      options.dataType = options.dataType || 'json'
      const params = options.data
  
      //发送请求
      if (options.type === 'GET') {
          xhr.open('GET', options.url + '?' + params, true)
          xhr.send(null)
      } else if (options.type === 'POST') {
          xhr.open('POST', options.url, true)
          xhr.send(params)
  
      //接收请求
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              let status = xhr.status
              if (status >= 200 && status < 300) {
                  options.success && options.success(xhr.responseText, xhr.responseXML)
              } else {
                  options.fail && options.fail(status)
              }
          }
      }
  }
  ```

  ```javascript
  //使用方式：
  ajax({
      type: 'post',
      dataType: 'json',
      data: {},
      url: 'https://xxxx',
      success: function(text,xml){//请求成功后的回调函数
          console.log(text)
      },
      fail: function(status){////请求失败后的回调函数
          console.log(status)
      }
  })
  ```


## 7. let、const、var

* let声明的变量无法被提升、不允许冗余声明、块作用域

* const基本和let相同，但是const声明的时候就必须被赋值，且值不可变

* var声明的变量会被提升、可以冗余声明，函数作用域

* ##### var变量

  1. ECMAScript是**松散类型**的，所以可以用var声明任意类型的变量。在不初始化的形况下，变量会保存一个特殊值undefined
  2. 声明提升：使用var声明的关键字会自动提升到函数顶部
  3. 反复多次用var声明同一个变量也没有关系

  ##### let变量

  区别：1. let是块作用域，var是函数作用域（块作用域比如if语句的内部）

  			2. let不允许同一个块作用域中出现冗余声明
  			2. let声明的变量不会在作用域中被提升
  			2. let声明的全局变量不会成为window对象的属性，var会。

  ##### const变量

  1. const和let基本相同，唯一区别是声明变量时必须同时初始化变量
  2. const声明的限制只适用于它指向的变量的引用。如果const变量引用的是一个对象，那修改这个对象的内部属性并不违反const的限制
     * const指向基本数据类型，数据不可变
     * const指向引用数据类型，对象内部属性可变（引用数据类型，栈区存放地址，堆区存放数据）

## 8. 函数参数的扩展和收集

1. **参数扩展：**

   * 将扩展操作符应用于可迭代的对象，作为参数传递，则在函数中可以将可迭代对象进行拆分，并将迭代返回的每个值单独传入

   ```javascript
   let value = [1,3,3];
   function getSum () {
       let sum = 0; 
        for (let i = 0; i < arguments.length; ++i) { 	//arguments参数的扩展
        	sum += arguments[i]; 
        } 
        return sum;
   }
   ```

2. **参数的收集**

   * 将扩展操作符应用于函数的形参中，可以**传入任意长度的参数**

   ```javascript
   let value = [3,3,3];
   function getSum(...value) {
       return value.reduce((preValue, nowValue) => return preValue+nowValue, 0);//reduce函数，这里value可以是任意长度 
   }
   ```


## 9. 执行上下文、执行栈

1. 执行上下文：javascript代码执行环境的抽象概念（执行上下文包含词法环境、变量环境、this binding）
   * 全局执行上下文
   * 函数执行上下文
2. 执行栈：调用栈，先进后出，用于存储代码执行期间创建的所有执行上下文
3. **词法环境和变量环境：**词法环境组件登记let/const/class等变量声明，变量环境登记var function等变量声明。（var function有变量提升，预解析阶段进行变量提升）。let/const/class没有变量提升，暂时性死区

## 10.apply/call/bind的区别

* 均是改变函数执行时的上下文，就是改变函数运行时的this指向
* apply用法：`fun.apply(obj, [1,3])`,第一个参数是this的指向，第二个参数是函数可接受的参数，以数组的形式传入
* call用法：`fun.call(obj, 1, 3)`，第一个参数是this的指向，第二个参数是一个参数列表
* bind用法：`const bindFun = fun.bind(obj);  bindFun(1,3)`，与call用法一样，传入的是参数列表
* **不同点：**
  * apply和call用法，改变this指向后，会立即执行原函数。且此方法只是临时改变this一次
  * bind改变this指向后，不会立即执行，而是返回一个永久改变this指向的函数

```javascript
let i = 0;

queueMicrotask(function test() {
  i++;
  console.log("microtask", i);
  if (i < 3) {
    queueMicrotask(test);
  }
});

(async () => {
  console.log("async function start");
  for (let i = 1; i < 3; i++) {
    await null;
    console.log("async function resume", i);
  }
  await null;
  console.log("async function end");
})();

queueMicrotask(() => {
  console.log("queueMicrotask() after calling async function");
});

console.log("script sync part end");
```

## 11. `typeof`和`instanceof`

1. typeof：可以判断基础数据类型，对于引用数据类型返回的是object，对于函数返回的是function（无法细分引用数据类型），对于`typeof null`返回的是`Object`
2. instanceof：检测构造函数的`prototype`属性是否出现在实例的原型链上
   * 用法：`object instanceof constructor`
   * 返回的是`true`或者`false`
   * (无法判断基础数据类型)
3. 要想通用判断类型，可使用`Object.prototype.toString()`，统一返回`[Object xxx]`的字符串

## 12. 函数式编程

* 就是把过程逻辑写成函数，定义好输入参数和输出结果

  ```javascript
  // 命令式编程
  var array = [0, 1, 2, 3]
  for(let i = 0; i < array.length; i++) {
      array[i] = Math.pow(array[i], 2)
  }
  
  // 函数式方式
  [0, 1, 2, 3].map(num => Math.pow(num, 2))
  ```

* 优点：复用代码，逻辑清晰、组合性好，更好的管理状态

* 缺点：开销大，多个执行上下文切换开销大，性能短板、资源占用、递归陷阱

* **组合与管道**：将多个函数合成一个函数。把很多小函数组合起来完成更复杂的逻辑

  ```javascript
  const compose = (...fns)=>val=>fns.reverse().reduce((acc,fn)=>fn(acc),val);
  ```

  ```javascript
  const pipe = (...fns)=>val=>fns.reduce((acc,fn)=>fn(acc),val);
  ```

  `compose`执行是从右到左的。而管道函数，执行顺序是从左到右执行的

