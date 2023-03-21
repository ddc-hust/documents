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
  * 

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
