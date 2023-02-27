# 手写题

## 1. 数组扁平化

1. 直接使用`flat`函数。可指定展开的层数

```javascript
const arr = [1,2,[2,3]];
arr.flat(infinity);
//flat函数，参数infinity表示无论嵌套多少层，都转化为一维数组
//不传参数，默认扁平化一层
//传入一个整数参数，整数即代表扁平化的层数
```

* `Array.prototype.flat()` 特性总结：
  - `Array.prototype.flat()` 用于将嵌套的数组扁平化，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
  - 不传参数时，默认扁平化一层，可以传入一个整数，表示想要扁平化的层数。
  - 传入 `<=0` 的整数将返回原数组，不扁平化
  - `Infinity` 关键字作为参数时，无论多少层嵌套，都会转为一维数组
  - 如果原数组有空位，`Array.prototype.flat()` 会跳过空位。

2. **使用reduce方法。**在归并函数中，将当前项后归并项结合作为新的数组返回（一次性展开所有）

```javascript
const arr = [1,2,[2,3]];
function flattenDeep(arr) {
    return Array.isArray(arr) ? reduce((acc, cur) => return [...acc, ...flattenDeep(cur)], []) : [arr]
}
```

* `reduce`函数
  * 第一个参数：对数组每一项都运行的归并函数
    * 归并函数接收四个参数：上一个归并值、当前项、当前项的索引、数组本身
  * 第二个参数：可选的，归并起点的初始值

3. **使用reduce函数实现flat函数**

```javascript
function flattenDeep(arr, depth = 1){
    if(depth > 0) {
        arr.reduce((acc, cur) => {
            if(Array.isArray(cur)) {//cur为数组，需要递归调用，递归时需要将depth减1
                return [...acc, ...flattenDeep(cur, depth-1)]
            }
            return [...acc, cur];//cur不是数组，直接concat,返回
        },[])//初始值为空数组
    }
    return arr;
}
```

## 2. 数组去重

1. 使用`set`

   ```javascript
   const arr = [1,3,3];
   function unique(arr) {
       return Array.from(new Set(arr));
   }
   ```

2. 使用`filter`

   ```javascript
   function unique(arr) {
       return arr.filter((item, index, array) => {//参数：当前项，当前项的索引，数组本身
           return arr.indexOf(item) === index 	//过滤掉index不等于当前index的item，只返回索引相等的item
       })
   }

3. 使用`reduce`。使用`reduce`需要先调用`sort`对数组进行排序，然后比较当前值和前一个值是否相等

   ```javascript
   function unique(arr) {
       return arr.sort.reduce((acc, cur) => {
           if(acc[acc.length -1] !== cur || acc.length === 0) {
               return acc.push(cur);
           }
           return acc;
       },[])
   }
   ```

   
