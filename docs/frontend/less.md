# Less

## 1. 变量

* 使用@符号

  ```less
  @width: 10px;
  @height: @width + 10px;
  
  #header {
    width: @width;
    height: @height;
  }
  ```

## 2. 混合

* 将一组属性从一个规则集混入另一个规则集中

```less
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

#menu a {
  color: #111;
  .bordered();	//注意写法
}

.post a {
  color: red;
  .bordered();
}
```

## 3. 嵌套

* 后代选择器可以嵌套
* 伪选择器也可以与混合一同使用，&代表当前选择器的父级

```less
#header {
  color: black;
}
#header .navigation {
  font-size: 12px;
}
#header .logo {
  width: 300px;
}

//嵌套
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}

.clearfix {
  display: block;
  zoom: 1;

  &:after {		//&代表当前选择器的父级
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}

```

## 4. 导入

* @import导入，如果导入的文件的扩展名是.less，则可以将扩展名省略

```less
@import 'library';	//省略了扩展名
@import 'test.css'; //不能省略扩展名
```





