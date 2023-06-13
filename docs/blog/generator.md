# Generator

## 1. 是什么？

* 生成器函数，返回的是迭代器对象。
* 可通过调用迭代器对象`iter.next（）`方法继续函数的执行。通过`yield`关键字暂停函数的执行

## 2. 语法

* 使用`function*`来定义生成器函数，搭配yield关键字使用

## 3. 有什么用？

1. 实现异步编程，因为可以很好的控制异步操作的执行顺序

```js
function* gen() {
  const data = yield fetch('https://jsonplaceholder.typicode.com/todos/1');
  console.log(data.title);
}

const iterator = gen();
const result = iterator.next();
result.value.then(data => iterator.next(data.json()));
```

1. 作为迭代器，

```js
function* gun(start, end) {
    for(let i = start; i < end; i++) {
        yield i;
    }
}
gun = new gun()
for(let i of gun) {
    console.log(i);
}
```





