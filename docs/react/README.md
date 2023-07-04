# React

## 1. React基础

### 1. 组件

#### 1. 创建组件

* 单一职责原则：每个组件只做一件事； 如果组件负责，可拆分成小组件
* DRY原则：组件尽量无状态，所需数据通过props获取
* react定义组件可以使用函数定义，也可以使用ES6 Class定义组件。（注意组件名首字母大写，区分html元素名）

```jsx
function HelloMessage(props) {   //函数定义组件，通过props接受参数
    return <h1>Hello {props.name}!</h1>;
}
 class Welcome extends React.Component {  //使用类定义组件
  render() {
    return <h1>Hello World!</h1>;
  }
}
```



#### 2. JSX

* JSX不是模板引擎，而是一种语法糖，为什么呢？
* JSX本质是动态创建组件的语法糖
* 约定：自定义组件以大写字母开头

### 2. React生命周期

#### 1. `constructor`

* 初始化内部状态，唯一可以直接修改state的地方

#### 2.  `getDerivedStateFromProps`

* 每次render都会调用；state从props中获取，显然不推荐使用，需要额外维修二者的一致性。直接使用computed树形计算得到就好，不需要 额外存储
* 典型场景： 表单控件获得默认值

#### 3. `componentDidMount`

* UI渲染完成后调用，只执行一次。
* 典型场景：获取外部资源

#### 4. `componentWillUnmount`

* 组件移除时被调用
* 典型场景：资源释放

#### 5. `getSnapshotBeforUpdate`

* 在页面render之前调用，state已更新
* 典型应用场景：获取render之前的DOM状态

#### 6. `componentDidUpdate`

* 每次UI更新时调用

### 3. Virtual DOM

* 真实DOM节点不是全部更新，而是比较虚拟DOM和真实DOM，拿到差异部分后，只更新差异部分， 不是全部更新
* 如何比较DOM呢？DOM的`diff`算法
  * 广度优先分层比较：使用分层移动完全合理，因为在实际开发中，很少会有标签的跨层移动
  * 虚拟DOM假设：1. 组件的DOM结构是相对稳定的。2. 类型相同的兄弟节点可以被唯一标识（借助key提高diff算法效率）
  * DIFF算法效率复杂度o(n)，线性复杂度

### 4. 组件的设计模式

#### 1. 高阶组件

* 接受组件作为参数，返回新的组件
* 高阶组件的数据来源：父组件传来的数据，以及外部传来的数据

#### 2. 函数作为子组件

* 貌似是把具体的业务逻辑封装起来（不是很懂）

### 5. Context API

### 6. 打包和部署

#### 1. 打包

* 为什么需要打包?
  * 编译ES6语法特性，编译JSX
  * 整合资源，例如图片，Less/sass
  * 优化代码体积
* 打包注意i事项
  * 设置node.js环境为production
  * 禁用开发时专用代码，比如logger
  * 设置应用根路径

## 2. State

* state如同是一张快照，对state进行更改后，不会立即同步更新，而是有更新队列
*  **Hook 只能在组件的顶层被调用**。不能在循环语句、条件语句或 `map()` 函数中调用 `useRef` 。

### 1. 对state进行增删改

* 对state进行增删改时，由于不可以在原来的state基础上 操作，需要在新的 对象上操作，所以需要赋值原有的state。复制的操作: 数组的map和filter都会生成新的对象

* 增加操作：借助对象的展开扩展符，并额外添加要增加的元素

* 删除操作：使用filter，过滤掉特定条件的item

* 修改操作：使用map,对数组中每一项进行修改

  ```js
  function handleAddTask(text) {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }
  
  function handleChangeTask(task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }
  
  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }
  ```

### 2. 使用Immer修改state

* `immer`提供了一种特殊的`draft`对象，通过draft可以安全的修改state对象，在底层，immer会基于当前的state创建一个副本

```js
import { useImmer } from 'use-immer'; 
function handleToggleMyList(id, nextSeen) {
    updateMyList(draft => {
      const artwork = draft.find(a =>
        a.id === id //表面上是直接修改的，其实是创建了副本
      );
      artwork.seen = nextSeen;
    });
  }

  function handleToggleYourList(artworkId, nextSeen) {
    updateYourList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }
```

### 3. 保留和重置state

* state和树 中的位置关联，而不是和特定的组件相关联的
* 保留state:
  * 在相同位置使用相同的组件，就可以保留state
* 重置state:
  * 使用key，使得state和固定的组件关联，而不是依赖于顺序

### 4.  在组件中共享state

* 可以使用状态提升，把子组件的状态提升到父组件中，再从父组件传递状态给子组件，实现不同子组件之间状态的共享
* 父组件通过props将状态传递给子组件
* 当想要改变state时，可以从 父组件中传递事件处理函数给子组件，子组件调用即可操作state

### 5. 使用reducer整合 state的逻辑

* useState虽然可以实现state的更新逻辑，但是当组件复杂的时候，useState不利于展示清新的逻辑。所以使用reducer来整合
* reducer：类似于数组的reduce函数，累加器。输入：当前状态，action(操作)。输出：下一个状态

#### 1. 将设置state的逻辑修改成dispatch一个action

* dispatch函数接收的参数：一个是type（指明要进行的操作），一个是操作需要的参数（比如增加操作需要传递新增对象，删除操作传递删除id，修改参数传递要修改的属性和属性值）

```js
function handleAddTask(text) {
  dispatch({
    type: 'added',
    id: nextId++,
    text: text,
  });
}

function handleChangeTask(task) {
  dispatch({
    type: 'changed',
    task: task,
  });
}

function handleDeleteTask(taskId) {
  dispatch({
    type: 'deleted',
    id: taskId,
  });
}
```

#### 2. 编写reducer函数

* 参数：state和action，返回新的state

```js
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [  //这里是返回了新的对象
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action: ' + action.type);
    }
  }
}
```

#### 3. 在组件中使用state

* useReducer的参数：reducer函数，初始state。返回state和dispatch函数

```js
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);


import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: true},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false}
];

```

#### 4. 使用immer简化reducer

* 借助`useImmerReducer`库
* 注意使用immer简化reducer函数后，reducer函数不需要有return语句返回新的对象，直接在原数组上操作

```js
import { useImmerReducer } from 'use-immer';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

function tasksReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      draft.push({   //直接push
        id: action.id,
        text: action.text,
        done: false,
      });
      break;
    }
    case 'changed': {
      const index = draft.findIndex((t) => t.id === action.task.id);
      draft[index] = action.task;  //直接修改
      break;
    }
    case 'deleted': {
      return draft.filter((t) => t.id !== action.id);  //直接在原数组操作
    }
    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: true},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false},
];

```

### 6. 使用`context`深层传递参数

* prop逐级透传：会比较复杂，冗长

* 使用context，可以使得父组件为它下面的整个组件树提供数据

* 步骤：

  1. 创建context

     ```js
     import { createContext } from 'react';
     
     export const LevelContext = createContext(1);
     ```

  2. 子组件使用context

     ```js
     import { useContext } from 'react';
     import { LevelContext } from './LevelContext.js';
     
     export default function Heading({ children }) {
       const level = useContext(LevelContext);
       // ...
     }
     ```

  3. 父组件提供context

     * 使用context.provider

     ```js
     import { LevelContext } from './LevelContext.js';
     
     export default function Section({ level, children }) {
       return (
         <section className="section">
           <LevelContext.Provider value={level}>
             {children}
           </LevelContext.Provider>
         </section>
       );
     }
     ```

* 使用场景：设置主题

### 7. 使用context和reducer扩展应用

* context：可以将信息深入传递给其它组件

* reducer：整合组件的状态更新逻辑

* reducer中提供state和操作state的dispatch数据，子组件可能需要使用state或者操作state，那么可以将state和dispath作为context，这样方便其它组件使用state和进行state更新

* 步骤：

  1. 创建context。将state和dispatch作为context

     ```js
     import { createContext } from 'react';
     
     export const TasksContext = createContext(null);
     export const TasksDispatchContext = createContext(null);
     ```

  2. 将state和dispatch函数放入context，一般是顶部组件，提供状态更新的操作入口

     * 使用provide，在顶部组件通过useReducer获取state和dispatch后，包裹子组件，使用provider，提供这两个东西

     ```js
     import { TasksContext, TasksDispatchContext } from './TasksContext.js';
     
     export default function TaskApp() {
       const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
       // ...
       return (
         <TasksContext.Provider value={tasks}>
           <TasksDispatchContext.Provider value={dispatch}>
             ...
           </TasksDispatchContext.Provider>
         </TasksContext.Provider>
       );
     }
     ```

  3. 在组件树中使用context, 使用useContext， 就可以使用state和reducer

     ```js
     export default function AddTask() {
       const [text, setText] = useState('');
       const dispatch = useContext(TasksDispatchContext); //使用context
       // ...
       return (
         // ...
         <button onClick={() => {
           setText('');
           dispatch({
             type: 'added',
             id: nextId++,
             text: text,
           });
         }}>Add</button>
         // ...
     ```

  4. 将相关逻辑迁移到一个文件中：

     * 包括使用reducer获取state和dispatch，提供context给子组件（包裹子组件）， 把children作为prop，传递JSX

     ```js
     export function TasksProvider({ children }) {
       const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
     
       return (
         <TasksContext.Provider value={tasks}>
           <TasksDispatchContext.Provider value={dispatch}>
             {children}
           </TasksDispatchContext.Provider>
         </TasksContext.Provider>
       );
     }
     ```

     * 还可以从文件中导出使用context的函数

     ```js
     export function useTasks() {
       return useContext(TasksContext);
     }
     
     export function useTasksDispatch() {
       return useContext(TasksDispatchContext);
     }
     ```

     * 组件中通过函数读取context

     ```js
     const tasks = useTasks();
     const dispatch = useTasksDispatch();

## 3. 应急方案

### 1. 使用Ref应用值

* ref的缩写reference，引用值。ref用于希望组件记住某些值，但是不触发新的渲染时使用。
* 区别于state，state更新后，会存在更新队列中，不会立即同步更新，但是会触发新的渲染。但是ref更新后，会立即更新，本质上ref是一个javascript对象，属性current，更改值后，对象会立即同步更新

#### 1. 给组件添加ref

```js
//导入useRef
import {useRef }  from 'react'

//使用ref
const ref = useRef(0)

useRef返回一个javascript对象
{
    current : 0
}
```

#### 2. 何时使用ref

* 当组件需要跳出react和外部API通信时，可以使用ref
  * 存储timeout ID(如果使用常规变量存储id的话，常规变量不会在每次渲染之间存活，需要使用ref)
  * 存储和操作DOM元素
  * 存储不需要用来计算JSX的其它对象
* 当组件需要存储一些值，但是不影响渲染逻辑的，使用ref
* 存储在ref中的变量，react将在渲染之间保留这个变量。但是普通局部变量，在渲染之间就会丢失值

### 2. 使用ref操作DOM

* 使用`ref={myRef}`将DOM 节点的引用放入到myRef.current中

```js
import {useRef} from 'react'
const myRef = useRef(null);
<div ref={myRef}>
```

