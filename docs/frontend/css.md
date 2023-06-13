# CSS

## 1. 盒子模型

* 标准盒子模型：
  * 设置盒子的width，其实是内容区域的width, width = content。实际盒子大小要大一些，因为要加上padding+border+margin
* ie怪异盒子模型
  * 设置盒子的width，是设置border-sizing的大小，即width = content +  padding+border
* **border-sizing ：**定义如何计算一个元素的总高度和总宽度
  * border-sizing: content-box | border- box | inherit

## 2. 选择器

- id选择器（#box），选择id为box的元素

- 类选择器（.one），选择类名为one的所有元素

- 标签选择器（div），选择标签为div的所有元素

- 后代选择器（#box div），选择id为box元素内部所有的div元素

- 子选择器（.one>one_1），选择父元素为.one的所有.one_1的元素

- 相邻同胞选择器（.one+.two），选择紧接在.one之后的所有.two元素

- 群组选择器（div,p），选择div、p的所有元素

- **伪类**：选择器的一些效果

  - ```css
    :link ：选择未被访问的链接
    :visited：选取已被访问的链接
    :active：选择活动链接
    :hover ：鼠标指针浮动在上面的元素
    :focus ：选择具有焦点的
    :first-child：父元素的首个子元素
    ```

* **伪元素**：元素是变化的，判断元素的位置

  * ```css
    :first-letter ：用于选取指定选择器的首字母
    :first-line ：选取指定选择器的首行
    :before : 选择器在被选元素的内容前面插入内容
    :after : 选择器在被选元素的内容后面插入内容
    ```

* **属性选择器**：使用[]表示

* **优先级**

  * 内联 > ID选择器 > 类选择器 > 标签选择器

## 3. rem/px/vh/vw/rm

* **px**：绝对单位，页面按精确像素展示

* **em**：相对单位，基准点为父节点字体的大小，如果自身定义了`font-size`按自身来计算，整个页面内`1em`不是一个固定的值

* **rem**：相对单位，可理解为`root em`, 相对根节点`html`的字体大小来计算

* **vh、vw**：主要用于页面视口大小布局，在页面布局上更加方便简单

## 4. BFC

* BFC实际就是页面的一个独立容器，内部子元素不影响外部元素
* 触发条件：
  * 根元素，即HTML元素
  * 浮动元素：float值为left、right
  * overflow值不为 visible，为 auto、scroll、hidden
  * display的值为inline-block、inltable-cell、table-caption、table、inline-table、flex、inline-flex、grid、inline-grid
  * position的值为absolute或fixed
* **作用**：
  * **阻止外边距重叠：**在同一个BFC中，块级元素的垂直外边距会进行合并。（用不同的BFC，垂直margin就不会合并）
  * **清除浮动**：float浮动元素会使元素脱离正常流，出现高度塌陷的情况（子元素浮动，父元素高度为0），可以通过使该div变成BFC后，父元素就有了高度（因为BFC是独立的布局单位，内部子元素不会影响外部元素，高度塌陷后，为防止溢出的子元素影响其它元素，BFC会自动对浮动元素进行包裹，使得父元素有了高度）

## 5. 实现元素水平垂直居中

1. **定位 + margin:auto：**

   * 父相子绝。top、bottom、left、right设置为0，这样子元素在父元素中撑开了，子元素的虚拟占位占满了父元素，这时候设置margin:auto，就可实现居中

   ```css
   <style>
       .father{
           width:500px;
           height:300px;
           border:1px solid #0a3b98;
           position: relative;	//相对定位
       }
       .son{
           width:100px;	//子元素有宽高
           height:40px;
           background: #f0a238;
           position: absolute;//绝对定位
           top:0;		//撑满父元素
           left:0;
           right:0;
           bottom:0;
           margin:auto;	//居中
       }
   </style>
   <div class="father">
       <div class="son"></div>
   </div>
   ```

2. **定位 + margin 负值**

   * 子元素top和left设置为50%，这样，子元素达到2框的位置，然后设置margin-left和margin-right为子元素宽高的一半负值，就可以把位置移动框3。（也可使用`transform: translate(-50%, -50%)`）

   ```css
   <style>
       .father {
           position: relative;
           width: 200px;
           height: 200px;
           background: skyblue;
       }
       .son {
           position: absolute;
           top: 50%;
           left: 50%;
           margin-left:-50px;	//需要知道子元素的宽高
           margin-top:-50px;
           //transform: translate(-50%,-50%);不需要知道子元素的宽高
           width: 100px;
           height: 100px;
           background: red;
       }
   </style>
   <div class="father">
       <div class="son"></div>
   </div>
   ```

   <img src=".\img\1.png" style="zoom:50%;" />

3. **flex布局：**display: flex、align-items: center、justify-content: center（一维布局）

4. **grid布局**：二维布局，但是存在兼容问题

## 6. 实现两栏布局、三栏布局

1. **两栏布局：**

   1. 左侧使用float，右侧使用margin，container使用BFC（以免高度塌陷）

       <!--两栏布局：宽度要占满全部-->

        <!--左侧使用float浮动，使其脱离文档流，右侧使用margin就可以实现两栏布局-->

        <!--注意left和right要设置高度，子容器的高度不会继承父容器-->
   2. 使用flex，设置左边的宽度，右边的宽度使用100%

   ```css
   <style>
       .box{
           display: flex;
       }
       .left {
           width: 100px;
       }
       .right {
           flex: 1;//== flex: 1 1 0%表示平均展开，flex-grow/flex-shrink/flex-basis
       }
   </style>
   <div class="box">
       <div class="left">左边</div>
       <div class="right">右边</div>
   </div>
   ```

   * 父容器使用flex，left的宽度是固定的，right使用flex-grow为1的话，就可以使得right分到身下得空间。
   * 这个时候，left的高度变化，right的高度也会变化
   * 当right中的子元素的高度超过right的高度的时候，right的高度虽然不会变化，但是right的子元素就溢出了，这不是我们想要的结果，所以我们在right中使用overflow:auto
   * （通过使用flex布局，固定左侧宽度，右侧使用flex-grow。container的高度要固定）
   * **注意：**height属性不能继承，可以使用height:100%使得子容器的高度和父容器的高度相等

2. **三栏布局**：

   1. 左右使用float，中间使用margin设置边距。左右两边固定宽度，中间宽度自适应（缺点：中间内容最后加载）。container使用BFC

   ```html
   <head>
       <meta charset="UTF-8">
       <title>三栏布局</title>
       <!--float+margin。两侧使用浮动，中间宽度自适应，不设置width,缺点中间内容最后加载-->
       <style>
           .container {
               height: 200px;
           }
   
           .left {
               float: left;
               width: 100px;
               height: 100%;
               background-color: aquamarine;
           }
   
           .middle {
               background-color:black;
               height: 100%;
               margin-left : 0px;
               margin-right: 0px;
           }
   
           .right {
               float: right;
               background-color: blueviolet;
               width: 100px;
               height: 100%;
               overflow: auto;
           }
       </style>
   </head>
   
   <body>
       <div class="container">
           <div class="left"></div>
           <div class="right"></div>
           <div class="middle"></div><!--需要把中间放在下面，不然right会沉在middle的下方-->
           
       </div>
   </body>
   
   </html>
   ```

   2. 左右使用absolute定位（脱离文档流），container使用relative定位，中间占满一行，使用margin留出间隔

   ```html
   <head>
       <meta charset="UTF-8">
       <title>三栏布局</title>
       <!--左右两边absolute,注意使用top和right和left，设置便宜，中间使用margin留出固定宽度-->
       <style>
           .container {
               position: relative;
               height: 200px;
           }
   
           .left {
               position: absolute;
               left : 0px;
               width: 100px;
               height: 100%;
               background-color: aquamarine;
           }
   
           .middle {
               background-color:black;
               height: 100%;
               margin-left : 110px;
               margin-right: 110px;
           }
   
           .right {
               position: absolute;
               top:0px;
               right: 0px;
               background-color: blueviolet;
               width: 100px;
               height: 100%;
               overflow: auto;
           }
       </style>
   </head>
   
   <body>
       <div class="container">
           <div class="left"></div>
           <div class="middle"></div>
           <div class="right"></div>
           
       </div>
   </body>
   ```

   3. flex布局：盒内元素两端对其，将中间元素设置为`100%`宽度，或者设为`flex:1`，即可填充空白。盒内元素的高度撑开容器的高度

   ```html
   <head>
       <meta charset="UTF-8">
       <title>三栏布局</title>
       <!--使用flex，左右固定宽度，中间使用width100%或者使用flex1都可以自适应宽度-->
       <style>
           .container {
               height: 100vh;
               overflow-y: hidden;
               display: flex;
           }
           .left {
               background-color: antiquewhite;
               width: 200px;
           }
           .right {
               background-color:aqua;
               width: 200px;
   
           }
           .middle {
               background-color: rgb(81, 217, 97);
               width: 100%;
               margin: 0 20px;
           }
       </style>
   </head>
   
   <body>
       <div class="container">
           <div class="left"></div>
           <div class="middle"></div>
           <div class="right"></div>
           
       </div>
   </body>
   
   </html>
   ```

   

3. 详见https://vue3js.cn/interview/css/column_layout.html#%E4%B8%89%E3%80%81%E4%B8%89%E6%A0%8F%E5%B8%83%E5%B1%80

## 7. display属性

* 块级元素、行内元素、行内块元素的区别：

  1. **块级元素**：独占一行，元素前后都会自动换行。**设置宽高起作用**。如` <div>、<p>、<hn>、<ul>、<li>` 等。
  2. **行内元素：**不会换行，与其他行内元素位于同一行，**设置宽高不起作用**。如` <span>、<a>、<em>、<u>、<i>、<b> `等。
  3. **行内块元素**：它们既**能够并排显示**，**也能够设置宽高**。如 img、表单元素等。

  ```css
  display: none
  display: block
  display: inline
  display: flex;
  ```

## 8. flex：1

* `flex-grow: 1` ：当子容器的宽度大小小于父容器的大小时，瓜分父容器剩余的空间
* `flex-shrink：1`：当子容器的大小大于父容器的大小时，吸收超出的空间
* `flex-basis`：0%：用来设置盒子的基准宽度，并且basis和width同时存在basis会把width干掉

* `justify-content`属性是用于设置项目在容器中的对齐方式，是对子元素有效， 而不是对本身有效
  * `flex-start`规定子元素从左往右排列，左对齐
  * `flex-end`规定子元素右对齐
    * 注意，flex-start和flex-end不是规定元素的排列位置
