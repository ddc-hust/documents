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