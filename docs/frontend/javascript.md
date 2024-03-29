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

* 防抖和节流可以避免频繁触发事件导致页面性能下降

* 防抖（debounce）：防止单位事件内，事件触发多次。

  * 代码实现重在重新计时。
  * 业务场景：比如用户重复点击登录按钮，使用防抖，可减少发送登录请求的次数
  * 类似于回城，防抖的原理是只执行最后一次操作，当第一次执行操作后，会判断在delay秒中有没有再次触发，如果有再次触发的话，就会重新计时。所以代码中存在clearTimeOut（time）
  * 应用输入框，用户会持续输入，只有当在一段时间内，没有重复输入后，才将结果发送。

  ```javascript
  /**
  * 这里的setTimeout()函数返回是一个数字，代表定时器的id。可以使用clearTimeout(id)来取消定时器
  */
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
  
      function debounce(fun, delay) {
          let time = null;
          return function() {
              let that = this;
              let args = arguments;//每一个函数都有一个arguments对象，类数组对象，收集函数的参数，即使（）中没有写
              if(time) {
                  clearTimeout(time);
              }
              time = setTimeout(function() {
                  fun.apply(that,args);//这里是匿名函数，匿名函数中的this指向由调用它的对象所决定。setTimeout函数是全局的，this指向window对象。为了使用fun本来的this指向，所以需要借助that。如果是箭头函数，箭头函数的this是由定义箭头函数时的作用域所决定的。
              }, delay);
          }
      }
      
  ```

* 节流（throttle）：限制单位时间内事件触发的频率。在单位事件内，事件只能触发一次。

  * 代码实现重在开锁和关锁
  * 比如scroll事件，每隔一秒计算一次位置信息
  * 节流：当事件被触发时，函数会立即执行一次，然后在一段时间内（如100ms）内忽略后续的事件触发，直到该时间段过去后再重新执行。
  * 类似于技能CD，在一定间隔时间内只能执行一次，设置定时器，完成操作后，定时器才会置空。代码中需要判断当定时器为空的时候，才能执行操作。否则不做任何操作。
  * 应用在页面滚动中，当页面滚动到底部时，会触发操作，进行加载页面。为避免一直发送请求加载，在一定时间间隔内只会加载一次。
  
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
  
  function throttle(fun, delay) {
      let time = null;
      return function() {
          let that = this;
          let args = arguments;
          if(!time) {//time为空，可以执行操作
              time = setTimeout(() => {
                  fun.apply(that, args);
                  time = null;//操作执行完成之后，重新计时
              }, delay);
              
          }
      }
  }
  ```


## 3. Undefined == null

* 双等号，结果为true。双等号会进行类型的转换
* 三个等号（绝对相等），结果为false，因为undefined的类型是Undefined，null的类型是Object，所以自然不相等。三个等号不会进行类型的转换

## 4. 闭包、作用域、this

* **闭包：**在一个函数内部再定义一个函数，内层函数可以使用外层函数的变量
  * 当外层函数执行完词法环境销毁之后，由于内层函数可以包含对外层函数词法环境的引用，所以即使创建时所在的执行上下文被销毁，但是词法环境依然存在。从而延长变量的生命周期
  * **作用：**1. 创建私有变量。2. 延长变量的生命周期
  * **缺点**： **a**、会增加对内存的使用量，影响性能。    **b**、不正确的使用闭包会造成内存泄漏。（内存泄漏：由于某些原因导致程序申请的内存无法被及时释放，从而导致内存占用持续上升）
* **作用域**：决定了代码区块中变量和其它区块的可见性。分为全局作用域、函数作用域、块级作用域
  * 全局作用域：全局作用域下声明的变量可以在程序的任意位置访问
  * 函数作用域：如果一个变量是在函数内部声明的它就在一个函数作用域下面。这些变量只能在函数内部访问，不能在函数以外去访问
  * **块级作用域**：在大括号中使用`let`和`const`声明的变量存在于块级作用域中。在大括号之外不能访问这些变量
  * js遵循的**词法作用域**，也叫静态作用域，变量在创建时，其作用域就被确定好了
  * 


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

### this

* **执行上下文**：变量环境、词法环境，outer以及this

 * ```js
   var bar = {
       myName:"time.geekbang.com",
       printName: function () {
           console.log(myName)
       }    
   }
   function foo() {
       let myName = "极客时间"
       return bar.printName
   }
   let myName = "极客邦"
   bar.printName()  // 输出极客棒， 取得是全局的
   ```

 * ```js
   var bar = {
       myName:"time.geekbang.com",
       printName: function () {
           console.log(this.myName) // 注意this
       }    
   }
   function foo() {
       let myName = "极客时间"
       return bar.printName
   }
   let myName = "极客邦"
   bar.printName()  // 输tim. greeban.com， 取得是bar对象的this.
   ```

 * ```js
   var myObj = {
     name : "极客时间",
     showThis: function(){
       this.name = "极客邦"
       console.log(this)
     }
   }
   var foo = myObj.showThis
   foo()     // 输出window，为什么呢？因为foo函数是在全局环境中调用的，全局环境中的this指向window
   ```

* 在全局环境中调用一个函数，函数内部的 this 指向的是全局变量 window。

* 通过一个对象来调用其内部的一个方法，该方法的执行上下文中的 this 指向对象本身

* **this存在的问题**

  * **嵌套函数中的 this 不会从外层函数中继承**

  * ```js
    var myObj = {
      name : "极客时间", 
      showThis: function(){
        console.log(this)
        function bar(){console.log(this)} // bar函数是嵌套函数，this指向了全局对象
        bar()
      }
    }
    myObj.showThis()
    ```

  * 解决办法如下：

  * ```js
    var myObj = {
      name : "极客时间", 
      showThis: function(){
        console.log(this)
        var that = this
        function bar(){
          that.name = "极客邦"  // 传入外层this的值
        }
        bar()
      }
    }
    myObj.showThis()
    console.log(myObj.name)
    console.log(window.name)
    
    
    // 或者使用箭头函数，
    var myObj = {
      name : "极客时间", 
      showThis: function(){
        console.log(this)
        var bar = ()=>{
          this.name = "极客邦"
          console.log(this) // 箭头函数的this指向外城this, 因为箭头函数并不会创建其自身的执行上下文，所以箭头函数中的 this 取决于它的外部函数。
        }
        bar()
      }
    }
    myObj.showThis()
    console.log(myObj.name)
    console.log(window.name)
    ```

  * **this 没有作用域的限制**，这点和变量不一样，所以嵌套函数不会从调用它的函数中继承 this，这样会造成很多不符合直觉的代码。要解决这个问题，你可以有两种思路：

    * 第一种是把 this 保存为一个 self 变量，再利用变量的作用域机制传递给嵌套函数。
    * 第二种是继续使用 this，但是要把嵌套函数改为箭头函数，因为箭头函数没有自己的执行上下文，所以它会继承调用函数中的 this。

  * **普通函数中的 this 默认指向全局对象 window**

  * 当函数作为对象的方法调用时，函数中的 this 就是该对象；

  * 当函数被正常调用时，在严格模式下，this 值是 undefined，非严格模式下 this 指向的是全局对象 window；

  * 嵌套函数中的 this 不会继承外层函数的 this 值。

  * 因为箭头函数没有自己的执行上下文，所以箭头函数的 this 就是它外层函数的 this

### 作用域链

* 每个执行上下文的变量环境中，都包含了**一个外部引用，用来指向外部的执行上下文，我们把这个外部引用称为 outer。**
  * 当一段代码使用了一个变量时，JavaScript 引擎首先会在“当前的执行上下文”中查找该变量，
  * 如果找不到，会通过outer指针取找
* **作用域链是通过词法作用域来确定的，而词法作用域反映了代码的结构。**

### 词法作用域

* 词法作用域就是指作用域是由**代码中函数声明的位置来决定的**，所以词法作用域是**静态的作用域**，通过它就能够预测代码在执行过程中如何查找标识符。
* 词法作用域是代码编译阶段就决定好的，和函数是怎么调用的没有关系。
* 根据词法作用域的规则，内部函数 getName 和 setName 总是可以访问它们的外部函数 foo 中的变量（**注意this不是变量哦，所以内部函数的this不可以访问外部函数的this.**）

### 闭包

* 在 JavaScript 中，根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存在内存中，我们就把这些变量的集合称为闭包。比如外部函数是 foo，那么这些变量的集合就称为 foo 函数的闭包

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

```js
Function.prototype.myCall = function () {
  const [context, ...args] = [...arguments];
  // 在传入的对象上设置属性为待执行函数
  context.fn = this;
  // 执行函数 并获取其返回值
  const res = context.fn(...args);
  // 删除属性
  delete context.fn;
  // 返回执行结果
  return res;
}

const obj = {
  value: '我是obj.value',
}

function fn(canshu1,canshu2,canshu3) {
  console.log(this.value);  // 我是obj.value
  return [canshu1,canshu2,canshu3]
}

const xxx = fn.myCall(obj, 2,3,4);
console.log(xxx) // [2,3,4]

Function.prototye.myCall = function() {
    const [context, ...args] = [...arguments];
    context.fn = this;
    let res = context.fn(...args);
    delete context.fn;
    return res;
}
Function.prototype.myapply = function(context, args) {
    context.fn = this;
    //如果参数不存在
    let res = !args ? context.fn() : context.fn(...args);
    delete context.fn;
    return es;
}
fn.mycall(obj, 2,3,4);
fn.myapply(obj, [2,3,4]);
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

## 13. promise

* 异步编程的解决方案，链式操作降低编码难度，代码可读性强

* promise对象有三种状态：

  * `pending`（进行中）
  * `fulfilled`（已成功）
  * `rejected`（已失败）

* **特点：**

  - 对象的状态不受外界影响，只有异步操作的结果，可以决定当前是哪一种状态
  - 一旦状态改变（从`pending`变为`fulfilled`和从`pending`变为`rejected`），就不会再变，任何时候都可以得到这个结果

* **promise实例**

  ```js
  const promise = new Promise(function(resolve, reject) {});
  ```

  - `resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”
  - `reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”

* **实例方法**

  * `then()：`状态发生改变时的回调函数。第一个参数是`resolved`状态的回调函数，第二个参数是`rejected`状态的回调函数。返回新的`promise`实例
  * `catch()`：发生错误时的回调。错误具有“冒泡”性质，会一直向后传递，直到被捕获为止
  * `finally()`：不管 Promise 对象最后状态如何，都会执行的操作

* **构造函数的方法**

  * all()：将多个 `Promise`实例，包装成一个新的 `Promise`实例。`const p = Promise.all([p1, p2, p3]);`
  * race()：有一个实例率先改变状态，`p`的状态就跟着改变
  * allSettled()：都返回结果了，p才完成
  * resolve()
  * reject()
  * try()
  
* **Promise抛出错误**

  * 在promise中返回任意一个非promise对象都会被包裹成promise对象，比如下面的例子中return的是一个error对象，那么就会被包裹成 `return Promise.resolve(new Error('error!!'))`，所以promise的then返回的promise实例变成了fulfilled状态，而不是rejected状态。所以下面函数的执行结果是`then Error:error`
  * `.then`或者`.catch`中`return`一个`error`对象并不会抛出错误，所以是不会被`catch`捕捉到的

  ```js
  Promise.resolve().then(() => {
    return new Error('error!!!')
  }).then(res => {
    console.log("then: ", res)
  }).catch(err => {
    console.log("catch: ", err)
  })
  ```

* 如果想要抛出错误可以采用：

  ```js
  return Promise.reject(new Error('error!!!'));
  // or
  throw new Error('error!!!')
  ```

* **值穿透**

  * 在链式调用`.then`或者`.catch`中，参数期望是函数，如果传入非函数，会发生值穿透。值穿透是指传入的非函数值将会被忽略，传入的是之前的函数参数。

  ```js
  Promise.resolve(1)
    .then(2)
    .then(Promise.resolve(3))
    .then(console.log)
  //输出结果：1。第1个then和第2个then中的参数，一个是数字，一个是对象，都没有用。
  ```

* **finally**

  * `finally`不同于`.then`和`.catch`，`finally`最终返回的是上一次的`promise`对象值。不过如果抛出的是一个异常对象，则返回异常的`promise`对象。

  ```js
  Promise.resolve('1')
    .then(res => {
      console.log(res)
    })
    .finally(() => {
      console.log('finally')
    })
  Promise.resolve('2')
    .finally(() => {
      console.log('finally2')
    	return '我是finally2返回的值'
    })
    .then(res => {
      console.log('finally2后面的then函数', res)//这里的res是2，因为finally返回的不是promise新的值，是上一次promise对象值
    })
  
  输出结果：'1'
  'finally2'
  'finally'
  'finally2后面的then函数' '2'
  ```

  * `finally()`会等`promise1().then()`执行完才会将`finally()`加入微任务队列

* **async/await**

  * await后面跟的是一个promise对象，await会阻塞后面的代码，可以堪称await后面的代码是promise.then中包裹的

  ```js
  async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
  }
  async function async2() {
    console.log("async2");
  }
  async1();
  console.log('start')
  
  
  async function async1 () {
    console.log('async1 start');
    await new Promise(resolve => {//这个由于await后面跟的promise一直处于pending状态，没有完成，所以后面的两行代码是不会被执行到的
      console.log('promise1')
    })
    console.log('async1 success');
    return 'async1 end'
  }
  console.log('srcipt start')
  async1().then(res => console.log(res))
  console.log('srcipt end')
  
  
  ```

  

## 14. `for...in...`和`for...of...`

* `for...in...`：用于枚举对象中的非符号键的属性。由于ECMAScript中对象的属性是无序的，所以其遍历的结果也是不一样的

* `for...of...`：用于遍历可迭代的对象，会按照可迭代对象的next方法产生值的顺序迭代元素

* ```js
  let map = new Map([[1,3], [2, 0]]);
  let arr = [1,2,3];
  for(let i in arr) {//for in遍历的可枚举对象的属性。输出的是索引
    console.log(i);
  }
  for(let i of arr) {//for of遍历的可迭代对象的值。输出的是值
    console.log(i)
  }
  for(let i in map) {//for in遍历的可枚举对象的属性，无输出，因为map不是可枚举的对象
    console.log(i);
  }
  for(let i of map) {//for of遍历的可迭代对象的值。输出的是[ 1, 3 ] [ 2, 0 ]
    console.log(i)
  }
  ```

## 15. 生成器generator

* 函数名称前面加一个星号（*）表示它是一个生成器。只要是可以定义 函数的地方，就可以定义生成器
* 生成器对象一开始处于暂停执行（suspended）的状态。与 迭代器相似，生成器对象也实现了 Iterator 接口，因此具有 next()方法。调用这个方法会让生成器开始或恢复执行
* 生成器函数在遇到 yield 关键字之前会正常执行。遇到这个关键字后，执行会停止
* 函数作用域的状态会被保留。停止执行的生 成器函数只能通过在生成器对象上调用 next()方法来恢复执行。

```js
function* generatorFn() { 
 yield; 
} 
let generatorObject = generatorFn(); 
console.log(generatorObject.next()); // { done: false, value: undefined } 
console.log(generatorObject.next()); // { done: true, value: undefined } 
```

* **作用**

  1. 生成器对象可作为迭代对象

     ```js
     function* generatorFn() { 
          yield 1; 
          yield 2; 
          yield 3; 
     } 
     for (const x of generatorFn()) { 
      	console.log(x); 
     } 
     ```

  2. 使用yield实现输入和输出

     ```js
     function* generatorFn(initial) { 
          console.log(initial); 
          console.log(yield); 
          console.log(yield); 
     } 
     let generatorObject = generatorFn('foo'); 
     generatorObject.next('bar'); // foo 
     generatorObject.next('baz'); // baz 
     generatorObject.next('qux'); // qux 
     ```

  3. 产生可迭代对象

     ```js
     function* generatorFn() { 
      	yield* [1, 2, 3]; 
     }
     ```

* **使用场景**：

  1. 异步操作同步化

     ```js
     function * loadUI() {
         start();
         yield readFile();
         end();
     }
     var loader = loadUI();
     loader.next()//加载
     loader.next()//卸载
     ```

     

  2. 迭代对象，在对象上实现iterator接口

     ```js
     function* iterEntries(obj) {
       let keys = Object.keys(obj);
       for (let i=0; i < keys.length; i++) {
         let key = keys[i];
         yield [key, obj[key]];
       }
     }
     
     let myObj = { foo: 3, bar: 7 };
     for (let [key, value] of iterEntries(myObj)) {
       console.log(key, value);
     }
     ```

## 16.异步解决方案

1. 回调函数

2. `promise`：解决回调地狱，将回调函数的嵌套调用，改成链式调用

3. `generator`：`yield`可以暂停函数的执行，`next`方法用于恢复函数的执行。（将异步任务同步化）

   ```js
   const gen = function* () {
     const f1 = yield readFile('/etc/fstab');
     const f2 = yield readFile('/etc/shells');
     console.log(f1.toString());
     console.log(f2.toString());
   };
   ```

4. `async/await`：`async`实际是`generator`的语法糖，可以自动执行`generator`函数，不需要使用`next`恢复

   ```js
   const asyncReadFile = async function () {
     const f1 = await readFile('/etc/fstab');
     const f2 = await readFile('/etc/shells');
     console.log(f1.toString());
     console.log(f2.toString());
   };
   ```

* **区别**：
  1. `promise`和`async/await`是专为处理异步操作的
  2. `generator`函数可用于对象迭代，控制输出等
  3. `geneartor`和`async/await`都需要搭配`promise`使用

## 17. ES6数组新增扩展

1. **扩展运算符**：将数组转为逗号分割的参数序列

   * 通过扩展运算符实现的是浅拷贝，修改了引用指向的值，会同步反映到新数组

   ```js
   //转成数组
   [...document.querySelectorAll('div')]
   //数组复制
   const a1 = [1, 2];
   const [...a2] = a1;
   
   ```

2. **`Array.from`**：将两类对象转化成数组，一类是类似数组的对象，一类是可遍历的对象（包括es6新增的set和map）

   ```js
   let arrayLike = {	//注意索引是0，1，2。该类是类似数组的对象
       '0': 'a',
       '1': 'b',
       '2': 'c',
       length: 3
   };
   let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
   
   let map = new Map();//可遍历的对象，也能转化成数组
   map.set("a", 1);
   map.set("b", 2);
   console.log(Array.from(map))//[ [ 'a', 1 ], [ 'b', 2 ] ]
   ```

3. **`Array.of`**：用于将一组值转化成数组，

## 18. ES6对象新增扩展

* **属性的简写**：键名和值名相等的时候，可简写
* **属性名表达式**
* 

## 19. ES6的set和map

1. set：集合，无序，不重复（set的键名和值是相等的）

   * add()
   * delete()
   * has()
   * clear()

   ```js
   const set = new Set([1,3]);
   set.add(4).add(5)//链式调用
   ```

   * 遍历方法：
     - keys()：返回键名的遍历器
     - values()：返回键值的遍历器
     - entries()：返回所有成员的遍历器
     - forEach()：遍历 Map 的所有成员

2. weakset：成员**只能是引用类型，**，**没有遍历操作的API，没有size属性****

3. map：键值对

   * set()、get()、has()、delete()、clear()
   * 遍历方法同set

4. weakmap：**键必须是对象，没有遍历操作的API，没有clear清空方法**

## 20.代理proxy

* 用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）

  ```js
  var proxy = new Proxy(target, handler)

* 拦截和监视外部对对象的访问

* 在复杂操作前，对操作进行校验和对所需资源进行管理

* 降低函数或类的复杂度

  ```js
  //拦截对数组的访问
  function createArray(...elements) {
    let handler = {
      get(target, propKey, receiver) {
        let index = Number(propKey);
        if (index < 0) {
          propKey = String(target.length + index);
        }
        return Reflect.get(target, propKey, receiver);
      }
    };
  
    let target = [];
    target.push(...elements);
    return new Proxy(target, handler);
  }
  
  let arr = createArray('a', 'b', 'c');
  arr[-1] // c
  ```

## 21. ES6的Module

* es6的模块的加载在编译的时候就完成了，其在编译的时候就确定模块之间的依赖关系，以及输出和输出变量。由于是编译时加载的，使得静态分析成为可能。

```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```

* 支持动态加载：import()作为函数，参数是加载的路径

## 22. HasOwnProperty()方法

* hasOwnProperty()用于判断一个对象的是否含有特定的自身属性，返回布尔值
* 因为一个对象，会有继承属性，为了过滤掉继承的属性，就可以使用hasOwnProperty()函数
* for...in...用于遍历可枚举对象的键属性。一个对象是可以枚举的。

```js
for (let i in obj)//遍历obj的键属性,包含了继承属性
    
for(let i in obj) {
    if(obj.hasOwnProperty(i)) {
        //这样才获取到的是obj自己的键属性
    }
}
```

## 23. Object.defineProperty()

* 用于定义对象的属性方法
* 参数有三个：
  * 要定义属性的对象。
  * 要定义或修改的属性的名称。
  * 一个描述符对象，用于指定属性的特性。

```js
const obj = {};

Object.defineProperty(obj, 'name', {
  value: 'John',
  writable: false,
  enumerable: true,//设置是否可枚举，不可枚举的话，就不能使用for...in...访问到
  configurable: true
});

console.log(obj.name); // "John"
obj.name = 'Jane'; // 抛出 TypeError，因为 name 属性是不可写的
```

## 24. Object.getPrototypeOf()

* 用于获取一个对象的原型对象

```js
let map = new Map()//构造函数的方式创建对象
console.log(Object.getPrototypeOf(map))//map
```

* 每个对象都有一个`__proto__`属性，指向该对象的原型对象，是每个对象独有的属性。`__proto__`的使用从而形成原型链
* `Object.prototype`是所有对象所共有的属性

1. 使用 `Object.prototype.toString()` 方法获取变量的类型。

```js
javascriptCopy codelet a = 123;
let b = 'hello';
let c = [1, 2, 3];
console.log(Object.prototype.toString.call(a)); // [object Number]
console.log(Object.prototype.toString.call(b)); // [object String]
console.log(Object.prototype.toString.call(c)); // [object Array]
```

1. 使用 `Object.prototype.hasOwnProperty()` 方法判断对象是否拥有指定的属性。

```js
javascriptCopy codelet obj = {a: 1, b: 2};
console.log(obj.hasOwnProperty('a')); // true
console.log(obj.hasOwnProperty('c')); // false
```

1. 使用 `Object.prototype.isPrototypeOf()` 方法判断对象是否是另一个对象的原型。

```js
javascriptCopy codelet parent = {a: 1};
let child = Object.create(parent);
console.log(parent.isPrototypeOf(child)); // true
console.log(Object.prototype.isPrototypeOf(child)); // true
```

1. 使用 `Object.prototype.valueOf()` 方法获取对象的原始值。

```js
javascriptCopy codelet date = new Date();
console.log(date.valueOf()); // 1646988781000 (当前时间的时间戳)
```

## 25. 原型

* 简单来说，原型就是一个对象，它包含了共享给其他对象的属性和方法。每个对象都有一个指向其原型对象的内部链接，这个链接可以通过 `__proto__` 属性访问。当我们访问一个对象的属性时，如果该对象本身没有该属性，则会在其原型对象中查找，如果还没有，则会在原型链上一层一层地向上查找，直到找到该属性或者到达原型链的末端

## 26. 可枚举属性

* 在 JavaScript 中，对象的属性可以被定义为可枚举或不可枚举。可枚举属性是指可以通过 `for...in` 循环或 `Object.keys()` 方法枚举到的属性。不可枚举属性则是指不能被枚举到的属性。

  在默认情况下，通过对象字面量或 `Object.create()` 方法创建的对象的属性都是可枚举的。而通过 `Object.defineProperty()` 方法创建的属性，可以被显式地定义为可枚举或不可枚举。

##  27. Object.assign

* 将一个或多个源对象的所有可枚举属性复制到目标对象中，并返回目标对象。

* 如果目标对象中有同名属性，那么后面的源对象会覆盖前面的源对象中的属性值。

  ```js
  Object.assign(target, ...sources)
  ```

* 用于对象的浅拷贝，如果源对象中包含嵌套的对象，那么这些嵌套对象的引用会被直接复制到目标对象中，而不会进行深拷贝。

```js
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const result = Object.assign(target, source);

console.log(target); // { a: 1, b: 4, c: 5 }
console.log(result); // { a: 1, b: 4, c: 5 }
```

## 28. constructor属性

constructor属性是一个指向创建该对象的构造函数的引用，通常用于检查对象的类型。例如：

```js
javascriptCopy codefunction Person(name, age) {
  this.name = name;
  this.age = age;
}

const person = new Person('Alice', 30);
console.log(person.constructor === Person); // true
```

## 29. defer和async

* 作用：异步加载js脚本，避免js脚本阻塞渲染的进行
* 不同：
  * defer的脚本会在html解析完成之后，dom树构建完成之后，执行脚本。`async`会在加载完成之后立即执行。
  * `defer`的脚本会按照它在文档中的顺序依次执行。`async`的脚本不是按顺序执行的
  * `defer`一般用于多个有依赖关系的脚本的加载和执行。`async`用于单个脚本的加载，或者多个脚本之间没有依赖关系

## 30. DOM事件流

* **DOM事件流**：dom事件流分为三个阶段，分别是事件捕获、目标阶段、事件冒泡。
* **事件捕获：**就是当点击某个具体的标签的时候，需要找到这个具体标签的事件源，这就是捕获阶段。然后会触发目标阶段，最后上升到冒泡阶段，开始事件调用。
* **事件冒泡：**某个子元素的某类型的事件被触发时，它的父元素同类型的事件也会被触发，一直到触发到根元素，层层网上传递，就是事件冒泡。
  * **注意：**不是 所有的事件都支持事件冒泡的， focus、blur 之类的事件
  * **阻止事件冒泡：**event.stopPropagation()
* **事件委托：**事件委托就是给父元素注册事件，委托给子元素来处理。借助事件冒泡来实现的。
  * **原因：**每一个事件处理程序都是一个对象，对象过多占用内存，会影响性能。而且事件处理程序需要和dom节点进行交互，访问dom的次数越多，也会印象页面的性能（尽量减少dom的操作），所以通过事件委托，可以实现只再父级节点上绑定事件处理程序，进行dom操作。从而减少了与dom的交互次数。
  * **优点：**减少了事件注册，节省内存。支持动态添加子节点。
  * mousemove、mouseout 这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能消耗高，不适合事件委托

* * 

  

## 31. 数组的非数字键属性

* 在 JavaScript 中，数组的长度（length）属性表示数组的元素个数，而不包括非数字键的属性

* ```js
  let arr = [];
  arr['a'] = 1;
  console.log(arr.length);
  // 输出0，因为在 JavaScript 中，数组的长度（length）属性表示数组的元素个数，而不包括非数字键的属性。
  ```

* 如果想要遍历非数字属性，可以使用for...in...或者Object.keys()

  ```js
  let arr = [];
  arr['a'] = 1;
  arr['b'] = 2;
  
  for (let key in arr) {
    console.log(key, arr[key]);
  }
  
  let arr = [];
  arr['a'] = 1;
  arr['b'] = 2;
  
  Object.keys(arr).forEach(key => {
    console.log(key, arr[key]);
  });
  ```


## 32. 类的继承和函数的继承

* 类的继承使用类和原型链，通过 `extends` 关键字实现，子类是父类的实例，可以使用 `instanceof` 运算符进行类型检查。

* 函数的继承是通过在一个函数中调用另一个函数，通过设置上下文来实现属性和行为的继承，无法使用 `instanceof` 运算符进行类型检查。

* ````js
  // 
  class Animal {
    constructor(name) {
      this.name = name;
    }
  
    speak() {
      console.log(`I'm ${this.name}`);
    }
  }
  
  class Dog extends Animal {
    constructor(name, breed) {
      super(name);
      this.breed = breed;
    }
  
    bark() {
      console.log('Woof!');
    }
  }
  
  const dog = new Dog('Buddy', 'Labrador');
  dog.speak(); // Output: I'm Buddy
  dog.bark();  // Output: Woof!
  console.log(dog instanceof Animal); // Output: true
  ```
  ````

* 

* ````js
  // 函数的继承
  function Animal(name) {
    this.name = name;
  }
  
  Animal.prototype.speak = function() {
    console.log(`I'm ${this.name}`);
  };
  
  function Dog(name, breed) {
    Animal.call(this, name);
    this.breed = breed;
  }
  
  Dog.prototype = Object.create(Animal.prototype);
  Dog.prototype.constructor = Dog;
  
  Dog.prototype.bark = function() {
    console.log('Woof!');
  };
  
  const dog = new Dog('Buddy', 'Labrador');
  dog.speak(); // Output: I'm Buddy
  dog.bark();  // Output: Woof!
  console.log(dog instanceof Animal); // Output: false
  ```
  ````

* * *
  * 
## 33. 数组的操作

* forEach: 中途不会跳出循环，无法改变原数组
* map：生成新的数组
* filter：生成新的数组
* some/every： 都返回的是布尔值

## 34. Number的范围

### 1. IEEE 754标准

* 定义了二进制浮点数的表示方法、算术运算规则以及与浮点数相关的异常处理方式。
  * 单精度（Single Precision）：使用32位二进制位来表示一个浮点数，其中包括1位的符号位、8位的指数部分和23位的尾数部分。
  * 双精度（Double Precision）：使用64位二进制位来表示一个浮点数，其中包括1位的符号位、11位的指数部分和52位的尾数部分。

### 2. JS数的范围

* JavaScript遵循IEEE 754标准，使用64位双精度浮点数表示数字，通常称为“双精度”或“64位浮点数”。

## 34. 0.1 + 0.2 ！== 0.3

* 这和二进制浮点数的表示有关
* 0.1 和 0.2 在十进制中是精确的小数，但它们在**二进制浮点表示法中是无限循环小数，因此无法被精确地表示**。当您执行0.1 + 0.2时，JavaScript引擎进行了浮点数的二进制运算，导致一个微小的舍入误差，因此结果不等于 0.3。
* **十进制小数转换为二进制**： 通过不断乘以2并取整数部分的方式来实现。
* 可以通过指定一个误差，判断在误差范围内，是否相等

## 35. setTImeout延迟时间不准确的问题

`setTimeout` 是浏览器提供的一个定时器函数，它用于在一定时间间隔后执行指定的回调函数。尽管在 JavaScript 中存在事件循环机制（Event Loop）和宏任务（Macrotask）的概念，`setTimeout` 是如何实现在延迟时间后执行回调函数的呢？

下面是 `setTimeout` 的工作原理：

1. 当调用 `setTimeout` 时，浏览器会将指定的回调函数（即第一个参数）和延迟时间（即第二个参数，单位是毫秒）添加到一个称为**定时器队列**（Timer Queue）的数据结构中。
2. JavaScript 引擎会继续执行当前任务，直到当前任务完成。在这期间，浏览器会等待计时器的延迟时间。
3. 一旦延迟时间到达，浏览器将会把该定时器标记为**到期**（timeout）。这时，事件循环（Event Loop）会检查是否存在到期的定时器。
4. 如果有到期的定时器，浏览器会将相应的回调函数添加到**任务队列**（Task Queue）中，这个队列也被称为**宏任务队列**。
5. 一旦任务队列中有可执行的宏任务，事件循环会将它们一个一个地执行。
6. 当事件循环执行到某个宏任务时，它会执行该宏任务所包含的回调函数，这就是 `setTimeout` 的回调函数被执行的时刻。

需要注意的是，虽然 `setTimeout` 的延迟时间是相对准确的，但由于 JavaScript 是单线程执行的，因此在特定情况下，可能会受到其他任务的影响，导致回调函数的执行时间略有不同。此外，如果在 `setTimeout` 的回调函数中有耗时的操作，也会影响回调函数的准确执行时间。



## 36. new操作符做的事情

* 首先创建了一个空对象 tempObj；
* 接着调用 CreateObj.call 方法，并将 tempObj 作为 call 方法的参数，这样当 CreateObj 的执行上下文创建时，它的 this 就指向了 tempObj 对象；
* 然后执行 CreateObj 函数，此时的 CreateObj 函数执行上下文中的 this 指向了 tempObj 对象；
* 最后返回 tempObj 对象。

# ES6

## 1. Class类

* 为什么会出现类？因为在js中，生成实例对象的传统发方法是 通过构造函数。这种写法不够明确， 所以出现类，class可以看作只是一个语法糖

* es6的类只是ES5的构造函数的一层封装

  ```js
  //生成实例对象的传统方法，借助函数
  function Point(x, y) {  //函数
      this.x = x;			
      this.y = y;
  }
  
  Point.prototype.toString = function() {
      return '(' + this.x + ", " + this.y + ")";
  }
  
  var p = new Point(1, 2);
  
  ```

* 类的数据类型就是函数，类本身就指向构造函数

  ```js
  class Point {
      constructor(x, y) {
          this.x = x;
          this.y = y;
      }
      
      toString() {
          return '(' + this.x + ", " + this.y + ")";
      }
  }
  typeof Point //Function
  Point === Point.prototype.constructor
  ```

* 类的所有方法都定义在类的`prototye`属性上面

### 1. 类的实例

* 类的属性和方法，除了显式定义在其本身（定义在this对象上），否则都是定义在原型上（定义在class上）

  ```js
  class Point {
    constructor(x, y) {
      this.x = x;	//这个属性是定义在其本身上
      this.y = y;
    }
  
    toString() { //这个方法是定义在原型prototype上
      return '(' + this.x + ', ' + this.y + ')';
    }
  }
  
  var point = new Point(2, 3);
  
  point.toString() // (2, 3)
  
  point.hasOwnProperty('x') // true
  point.hasOwnProperty('y') // true
  point.hasOwnProperty('toString') // false
  point.__proto__.hasOwnProperty('toString') // true
  ```

* 类的所有实例共享一个原型对象

  ```js
  var p1 = new Point(2,3);
  var p2 = new Point(3,2);
  
  p1.__proto__ === p2.__proto__ //true
  //注意这里的实例的__proto__属性不是语言的特性，是私有属性
  //可以使用Object.getPrototypeOf()方法获取实例对象的原型
  ```

### 2. 取值函数getter和存值函数setter

* 在类的内部可以使用get和set关键字，拦截属性的存取行为

  ```js
  class MyClass {
    constructor() {
      // ...
    }
    get prop() {
      return 'getter';
    }
    set prop(value) {
      console.log('setter: '+value);
    }
  }
  
  let inst = new MyClass();
  
  inst.prop = 123;
  // setter: 123
  
  inst.prop
  // 'getter'
  ```

  ### 3. 静态方法

  * 在方法前加上static关键字，则该方法不会被实例继承，直接通过类来调用

## 2. Class的继承

### 1. super()

* super()表示父类的构造函数，用来新建一个父类的实例对象。调用super()的作用是可以形成子类的this对象，把父类的实例属性和方法放到这个this对象上面

* supe()函数只可以用在子类的构造函数之中

* ES6的类的继承机制和ES5的继承有一些不一样。

  * ES6的继承中，子类的构造函数一定要调用super()， 这是因为在ES6中继承在前，实例在后。先将父类的属性和方法加到一个空的对象上，在将该对象作为子类的实例。调用super函数，就相当于执行了父类的构造函数，就有了父类的实例对象
  * ES5的继承中，是实例在前，继承在后。先创建一个子类的实例对象，再把父类的方法添加到这个对象上

  ```js
  class Point { /* ... */ }
  
  class ColorPoint extends Point {
    constructor(x, y, color) {
      super(x, y); // 调用父类的constructor(x, y)
      this.color = color;
    }
  
    toString() {
      return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
  }
  ```

### 2. Object.getPrototypeOf()

* 获取原型，可以从子类上获取父类。也可用于判断一个类是否继承了另一个类

  ```js
  class Point {};
  class ColorPoint extends Point {};
  Object.getPrototypeOf(ColorPoint) === Point  //true
  ```

### 3. super对象

* super可以作为函数调用，调用父类的构造函数
* super还可以作为对象，在普通方法中，super指向父类的原型对象。在静态方法中，super指向父类。

## 3. 模块化规范

* 模块化就是将系统分成独立的功能模块，使得需要什么功能就加载什么功能
* **优点：**
  * 可以避免命名冲突
  * 分离功能，可以实现按需加载
  * 更好的实现了代码的复用

1. **CommonJS**

   * 模块的加载是输出一个对象，一旦输出这个对象后，模块内部的变化就不会影响到这个值
   * **同步性：**模块加载是一项阻塞操作，是同步加载的额，加载的顺序就是代码中出现的顺序
   * **缓存：**模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
   * **作用域：**所有代码都运行在模块作用域，不会污染全局作用域。
   * **服务端**
   * **运行时加载**`，因为ComminJS加载是先`加载整个模块，生成一个对象`（这个对象包含了path这个模块的所有API），然后再从这个对象上面读取方法-

2. **AMD**(Asynchronous Module Definition, **异步模块**机制)

   * **应用于浏览器端**，由于浏览器端js是网络动态加载的，所以需要实现异步加载，就出现了AMD, AMD是规范，对应的就是Require.js
   * 模块在定义的时候就必须先知名它所需要依赖的模块，然后把本模块的代码写在回调函数中执行
   * 使用`define`用来暴露模块，使用`require`用来引入模块；
   * **加载时机：**异步加载
   * **依赖执行：**AMD 模块的依赖关系在模块定义时就被明确指定，并且模块加载器在页面加载时会预先获取这些依赖关系。

3. **CMD****(Common Module Definition)**

   1. 比如seaJS
   2. **加载时机：**延迟加载，模块只有在真正需要使用它时才会被加载和执行。这种加载方式在模块的引入和执行之间存在一种更明显的关联性
   3. **依赖执行：** CMD 模块的依赖关系是在模块内部通过 `require` 函数声明的，这些依赖关系在模块执行时动态解析。

4. **UMD(AMD+Common.js)**

   1.  CommonJS 适用于服务端，AMD、CMD 适用于web端，那么需要同时运行在这两端的模块就可以采用 UMD 的方法，使用该模块化方案，可以很好地兼容AMD、CommonJS语法。UMD 先判断是否支持Node.js的模块（exports）是否存在，存在则使用 node.js 模块模式。再判断是否支持 AMD（define是否存在），存在则使用AMD方式加载模块。由于这种通用模块解决方案的适用性强，很多JS框架和类库都会打包成这种形式的代码。

5. **ES6 Module**同步加载

   1. **仅支持静态的导入导出：**在编译时期就完成模块的导入
      * **原因**：提高性能，在编译阶段即完成所有模块导入，如果在运行时进行会降低速度。更好的检查错误，比如对变量类型进行检查
      * **模块的依赖关系在模块的静态分析阶段就已经确定，**模块的加载发生在模块执行之前。
      * 当一个模块导入（import）其他模块时，这些导入语句会在代码解析阶段被处理，而不是在运行时。这使得 JavaScript 引擎可以在执行代码之前知道模块之间的依赖关系，以及如何加载这些依赖关系。
      * **好处：**
        * **可预测性：** 同步加载使得模块加载顺序更加可控和可预测，有助于避免一些潜在的问题，如循环依赖。
        * **可静态化：** 静态导入可以被静态化，这意味着工具可以在构建时（例如使用 Webpack、Rollup 等）进行模块的静态分析和优化，以生成更小、更高效的包
      * **ES6 模块输出的是值的引用，输出接口动态绑定**，动态关联模块中的值。**而 CommonJS 输出的是值的拷贝**
      * **缓存：**模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
   2. **仅在顶层定义：**因为 ES Module 需要在编译时期进行模块静态优化，import 和 export 命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行，这种设计有利于编译器提高效率，但也导致无法在运行时加载模块（动态加载）。可以使用import()动态加载
      * import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。 它是运行时执行，也就是说，什么时候运行到这句话，就会加载到指定的模块。另外，import()函数所加载的模块没有静态链接关系，这点也是与import语法不同
   3. **编译时加载**`，`ES6模块不是对象`，它的对外接口只是一种静态定义，在代码静态定义阶段就会生成-----编译时加载

6. ### AMD与CMD区别

   1. 模块定义时对依赖的处理不同

      AMD推崇前置依赖，在定义模块时就要声明其依赖的模块；而CMD推从就近依赖，只有在用到某个模块时再使用require导入；

   2. 对依赖模块的处理机制不同

      首先AMD和CMD对模块的加载方式都是异步的 不过区别在于AMD当加载了依赖模块之后立即执行依赖模块，依赖模块的执行顺序和我们书写的顺序不一定一致; 而CMD加载完依赖模块之后，并不会立即执行，等所有的依赖模块都加载好之后，进入回到函数逻辑，遇到require语句的时候，才执行对应的模块，这样模块的执行顺序就和我们书写的时候一致了

   3. CommonJs主要用在服务器端，AMD和CMD用在浏览器环境 AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。 CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。 ES6 规范只支持静态的导入和导出，与CommonJS 的`运行时加载`不同的是ES6是`编译时加载`，ES Module 是在编译时期进行模块静态优化。

   

## 4. 编译VS执行

* JS是一门解释性语言，在运行时，是逐行解释和执行的，也就是说不是先编译后执行的
* **即时编译：**为了优化性能，JavaScript 引擎通常会使用即时编译（Just-In-Time Compilation，JIT Compilation）技术，将某些代码编译成机器码以提高执行速度。如 V8，用于 Node.js 和 Chrome 浏览器）在运行时会执行即时编译，将某些代码编译成机器码，以提高性能。因此，JavaScript 可以被认为是一种“解释型语言和即时编译语言的混合体”。
  * **即时编译：**通过将**热点代码**编译成机器码来提高 JavaScript 代码的执行性能，
  * 在运行时，JavaScript 引擎会分析代码的执行情况，并识别出被频繁执行的代码块，通常称为热点代码（Hot Code）。然后，它将这些热点代码编译成本地机器码，以便更高效地执行。这个机器码可以直接在计算机的 CPU 上运行，因此速度更快。
