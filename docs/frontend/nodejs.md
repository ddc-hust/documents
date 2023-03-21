# node

## 1. Node的特点

* node是JavaScript运行时的环境
* 特点：
  1. 非阻塞，异步操作。适合IO密集型任务，
  2. 事件循环，（js单线程，只有一个主线程）
  3. ...

## 2. 全局对象

* node全局对象global，其它任何全局变量，函数、对象都是该对象的一个属性值

1. **真正的全局对象**

   * global
   * process
   * console
   * setInterval
   * setTimeout

2. **模块级别的全局对象**

   * 只是在每一个模块中都有

   ```js
   __dirname：当前文件所在的路径名，不包含后面的文件名
   __filename: 当前文件所在路径+文件名
   exports:
   module:
   require:
   ```

## 3. 全局变量process

* `process.nextTick()`：node是基于事件轮询的，nextTick定义一个动作，该动作在event loop的call stack清空之后，下一次event loop开始之前，调用callback

## 4. fs模块

* 文件的知识

  1. 权限位：mode（rwx，分别取值位4，2，1）分为文件所有者、文件所属组、其它用户
  2. 标识位：flag（r+、w+可读可写）

* 函数：

  ```js
  readFileSync()：同步读取文件
  readFile()：异步读取文件
  writeFileSync()：同步写入文件
  writeFile()：异步写入文件
  appendFileSync()：同步追加文件
  appendFile()：异步追加文件
  copyFileSync()：同步拷贝
  copyFile()：
  mkdirSync()
  mkdir()
  ```

## 5. Stream流

* 数据传输手段，端到端的流向
* `source`和`dest`以及pipe（管道）

## 6. 事件循环

* 事件循环机制：用于管理所有异步操作的执行顺序和事件的触发和处理
* node.js启动后，会创建一个事件队列，当遇到异步操作的时候，会注册异步操作的回调函数。当异步操作完成之后，或者触发的时候，会把异步操作的回调函数加入事件队列中。事件循环机制不断的从事件队列中获取事件，执行回调函数，直到队列为空
* 基于单线程异步非阻塞模型

```js
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')//由于前面的await阻塞，后面的加入微任务队列
}

async function async2() {
    console.log('async2')
}

console.log('script start')

setTimeout(function () {
    console.log('setTimeout0')
}, 0)

setTimeout(function () {
    console.log('setTimeout2')
}, 300)

setImmediate(() => console.log('setImmediate'));

process.nextTick(() => console.log('nextTick1'));//第一轮同步任务执行完毕后执行

async1();

process.nextTick(() => console.log('nextTick2'));//第一轮同步任务执行完毕后执行

new Promise(function (resolve) {
    console.log('promise1')
    resolve();
    console.log('promise2')	//同步任务，立即执行，和promise1一样
}).then(function () {
    console.log('promise3')//加入微任务队列
})

console.log('script end')

//输出结果：
promise1
promise2
script end//本轮同步执行完毕，进入下一轮

nextTick1//两轮的交换阶段，执行nextTick
nextTick2

async1 end
promise3
setTimeout0	//先输出的是setTimeOut0
setImmdediate

setTimeout2

```

____

# 具体面试题

## 1. node.js是什么？有什么特点？

* node.js是js运行时的环境

* 事件循环、非阻塞IO、可处理高并发、异步编程、模块化、可跨平台、单线程

* ```markdown
  Node.js是一个基于Chrome V8引擎的JavaScript运行时环境，可用于开发服务器端应用程序。它是一个轻量级的、高效的、事件驱动的、非阻塞I/O模型的平台。Node.js可以运行在多种操作系统上，例如Windows、Mac OS X、Linux等。
  
  Node.js的特点包括：
  
  高效性：Node.js采用事件驱动、非阻塞I/O模型，能够处理大量的并发连接，且具有较高的I/O吞吐量和较低的延迟。
  
  跨平台性：Node.js可以在多个操作系统上运行，并且具有很好的可移植性。
  
  模块化：Node.js采用模块化的设计，可以方便地管理和复用代码。
  
  生态系统：Node.js拥有庞大的生态系统，提供了大量的第三方模块和工具，可以帮助开发者快速构建应用程序。
  
  单线程：Node.js采用单线程的设计，可以避免多线程之间的竞争和同步问题，简化了开发和调试的难度。
  
  异步编程：Node.js的异步编程模型可以使得程序的执行不会被I/O操作所阻塞，从而提高了应用程序的响应速度和并发性能。
  
  总的来说，Node.js具有高效、跨平台、模块化、生态系统丰富、单线程、异步编程等特点，适用于开发高性能、高并发、可扩展的服务器端应用程序。
  ```

## 2. 什么是模块？Node.js 如何实现模块化？

* 模块可被其它模块引用，代码封装，提高复用
* Node.js使用CommonJS规范实现模块化，开发者可以使用exports对象或module.exports对象将模块的功能暴露出去，然后使用require()函数引用这些模块。

## 3. Node.js 如何处理文件和目录？

在Node.js中，可以使用fs模块来处理文件和目录。fs模块提供了一系列的API，可以对文件和目录进行读取、写入、删除、修改等操作。

以下是一些常见的文件和目录操作：

1. 读取文件内容：可以使用fs.readFile()函数来读取文件的内容。该函数的参数包括文件路径和回调函数，在回调函数中可以获取文件内容或错误信息。

```js
javascriptCopy codeconst fs = require('fs');

fs.readFile('file.txt', function (err, data) {
  if (err) throw err;
  console.log(data.toString());
});
```

1. 写入文件内容：可以使用fs.writeFile()函数来写入文件的内容。该函数的参数包括文件路径、写入内容和回调函数，在回调函数中可以获取写入状态或错误信息。

```js
javascriptCopy codeconst fs = require('fs');

fs.writeFile('file.txt', 'Hello, Node.js!', function (err) {
  if (err) throw err;
  console.log('File saved!');
});
```

1. 创建目录：可以使用fs.mkdir()函数来创建一个新目录。该函数的参数包括目录路径、目录权限和回调函数，在回调函数中可以获取创建状态或错误信息。

```js
javascriptCopy codeconst fs = require('fs');

fs.mkdir('newdir', function (err) {
  if (err) throw err;
  console.log('Directory created!');
});
```

1. 读取目录内容：可以使用fs.readdir()函数来读取目录的内容。该函数的参数包括目录路径和回调函数，在回调函数中可以获取目录内容或错误信息。

```js
javascriptCopy codeconst fs = require('fs');

fs.readdir('somedir', function (err, files) {
  if (err) throw err;
  console.log(files);
});
```

1. 删除文件或目录：可以使用fs.unlink()函数删除文件，使用fs.rmdir()函数删除目录。这两个函数的参数都是要删除的路径和回调函数，在回调函数中可以获取删除状态或错误信息。

```js
javascriptCopy codeconst fs = require('fs');

fs.unlink('file.txt', function (err) {
  if (err) throw err;
  console.log('File deleted!');
});

fs.rmdir('somedir', function (err) {
  if (err) throw err;
  console.log('Directory deleted!');
});
```

总的来说，使用fs模块可以方便地进行文件和目录的读写、创建、删除等操作。开发者可以根据自己的需求选择适合的API进行使用。

## 4. Node.js 如何进行网络编程？

http模块提供了一系列的API，可以实现HTTP和HTTPS通信。通过http.createServer()函数创建一个HTTP服务器，通过http.request()函数创建一个HTTP客户端。

以下是一个简单的HTTP服务器和客户端的示例：

```js
javascriptCopy code// HTTP服务器
const http = require('http');

const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello, client!');
  res.end();
});

server.listen(3000, function () {
  console.log('HTTP server is listening on port 3000.');
});

// HTTP客户端
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET'
};

const req = http.request(options, function (res) {
  res.on('data', function (data) {
    console.log(data.toString());
  });
});

req.end();
```

在上面的代码中，创建了一个HTTP服务器和一个HTTP客户端。当客户端向服务器发送一条GET请求时，服务器向客户端发送一条消息，客户端接收到消息后输出到控制台。

## 5. Node.js 的单线程模型如何处理并发？

> 事件循环实现了非阻塞IO和异步编程，可有效的处理并发

* 虽然 Node.js 是单线程的，但它通过事件循环机制实现了非阻塞 I/O 和异步编程，可以有效地处理并发请求。

  Node.js 采用了基于事件驱动的编程模型，主要包含以下几个组件：

  1. 事件循环：事件循环负责监听事件队列，当有事件发生时，会执行对应的回调函数，然后继续监听事件队列。
  2. I/O 操作：I/O 操作通常是非阻塞的，Node.js 会将请求提交给内核执行，然后继续执行其他操作，等到内核返回结果后再执行对应的回调函数。
  3. 回调函数：回调函数负责处理事件的结果，包括将数据返回给客户端、将数据存储到数据库中等操作。

  在 Node.js 中，使用异步编程可以充分利用事件循环机制，减少 I/O 操作的等待时间，提高程序的响应速度和处理并发的能力。Node.js 的异步编程主要有以下几种方式：

  1. 回调函数：将回调函数作为参数传递给异步函数，在异步函数执行完成后调用回调函数处理结果。
  2. Promise：通过 Promise 对象封装异步操作的结果，可以链式调用 then() 和 catch() 处理异步操作的结果。
  3. async/await：使用 async 和 await 关键字可以更加直观地处理异步操作的结果，不需要编写回调函数或者 Promise。

  总的来说，Node.js 通过事件循环机制和异步编程实现了非阻塞 I/O 和异步处理，可以有效地处理并发请求，提高程序的性能和响应速度。

## 6. Node.js 的内置模块有哪些？

* Node.js 内置了许多常用的模块，可以在开发过程中直接使用，无需安装。以下是 Node.js 内置模块的一些常用例子：

  1. fs：文件系统模块，提供了文件读写、目录操作等函数，可以用于文件和目录的操作。
  2. http：HTTP 模块，提供了创建 HTTP 服务器和客户端的 API，可以用于处理 HTTP 请求和响应。
  3. path：路径模块，提供了处理文件路径的函数，可以用于文件路径的拼接和解析。
  4. os：操作系统模块，提供了与操作系统交互的函数，可以用于获取 CPU、内存、网络等系统信息。
  5. events：事件模块，提供了事件驱动的编程模型，可以用于处理异步操作和事件处理。
  6. stream：流模块，提供了可读、可写、可读写的流对象，可以用于处理大量数据的读写。
  7. crypto：加密模块，提供了一系列加密函数，可以用于生成哈希、加密数据等操作。
  8. zlib：压缩模块，提供了压缩和解压缩函数，可以用于压缩和解压缩数据。
  9. cluster：集群模块，提供了多进程的实现，可以用于充分利用多核 CPU 资源。

  以上只是一些常用的 Node.js 内置模块，还有许多其他模块，例如 DNS、Net、Buffer、Child_process 等模块，可以根据具体的开发需求选择使用。

## 7. path模块

Node.js 中的 path 模块提供了一组用于处理文件路径的工具函数，可以用于文件路径的拼接、解析和转换等操作。以下是 path 模块的常用函数：

1. path.join([...paths]): 将多个路径拼接为一个路径字符串，自动处理路径分隔符和冗余路径。

   ```js
   csharpCopy codepath.join('/usr', 'local', 'bin') // '/usr/local/bin'
   path.join('/usr', 'local/../bin') // '/usr/bin'
   ```

2. path.resolve([...paths]): 将多个路径拼接为一个绝对路径字符串，从右向左处理，返回一个绝对路径，可以处理 `.` 和 `..` 。

   ```js
   luaCopy codepath.resolve('/usr', '/local/bin') // '/local/bin'
   path.resolve('/usr', './local/bin') // '/usr/local/bin'
   ```

3. path.dirname(path): 返回路径字符串的目录名，可以用于获取一个文件的目录路径。

   ```js
   luaCopy code
   path.dirname('/usr/local/bin/node') // '/usr/local/bin'
   ```

4. path.basename(path[, ext]): 返回路径字符串的文件名，可以用于获取一个文件的名称和后缀。

   ```js
   luaCopy codepath.basename('/usr/local/bin/node') // 'node'
   path.basename('/usr/local/bin/node', '.exe') // 'node'
   ```

5. path.extname(path): 返回路径字符串的扩展名，可以用于获取一个文件的后缀。

   ```js
   luaCopy code
   path.extname('/usr/local/bin/node.exe') // '.exe'
   ```

6. path.parse(path): 解析路径字符串，返回一个对象，包含路径的各个部分。

   ```js
   pythonCopy code
   path.parse('/usr/local/bin/node') // { root: '/', dir: '/usr/local/bin', base: 'node', ext: '', name: 'node' }
   ```

7. path.format(pathObject): 将路径对象转换为路径字符串，与 path.parse() 相反。

   ```js
   pythonCopy code
   path.format({ dir: '/usr/local/bin', base: 'node' }) // '/usr/local/bin/node'
   ```

path 模块还提供了许多其他的函数和常量，例如 path.delimiter、path.win32、path.posix 等，可以根据具体需求进行选择和使用。
