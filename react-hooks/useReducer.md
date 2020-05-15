`React` 本身不提供状态管理功能，通常需要使用外部库。这方面最常用的库是 `Redux`。

`Redux` 的核心概念是，组件发出 `action` 与状态管理器通信。状态管理器收到 `action` 以后，使用 `Reducer` 函数算出新的状态，`Reducer` 函数的形式是`(state, action) => newState`。
`useReducers()`钩子用来引入 `Reducer` 功能。

使用reducer通常可以拆分成如下4个步骤：

### 1. 创建初始值
```javascript
const initFormData = {
  name: "",
  age: 18,
  nationality: "汉族"
};
```
### 2. 创建一个reducer函数，根据action更新state
```javascript
function reducer(state, action) {
  switch (action.type) {
    case "patch":
      return { ...state, ...action.formData };
    case "reset":
      return initFormData;
    default:
      throw new Error();
  }
}
```
通常这个`reducer`函数有如下特点：
- 语法：`(state, action) => newState`
- 每次都返回一个newState， 永远不要直接修改state对象
- Action：一个常规的Action对象通常有type和payload（可选）组成
    - type： 本次操作的类型，也是 reducer 条件判断的依据
    - payload： 提供操作附带的数据信息

### 3. 调用useReducer函数
```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```
上面是`useReducer()`的基本用法，它接受`Reducer`函数和状态的初始值作为参数，返回一个数组。数组的第一个成员是状态的当前值，第二个成员是发送 `action` 的`dispatch`函数。

### 4. 在需要更新状态的时候调用`dispatch`，从而执行`reducer`函数。
```
 <div>
    <label>
        姓名
        <input
        value={formData.name}
        onChange={e =>
            dispatch({ type: "patch", formData: { name: e.target.value } })
        }
        />
    </label>
</div>
```
### [完整代码](https://codesandbox.io/s/admiring-framework-4by2t?file=/src/index.js:0-1789)
```js
import React, { useReducer } from "react";
import ReactDOM from "react-dom";

const initFormData = {
  name: "",
  age: 18,
  nationality: "汉族"
};

function reducer(state, action) {
  switch (action.type) {
    case "patch":
      return { ...state, ...action.formData };
    case "reset":
      return initFormData;
    default:
      throw new Error();
  }
}

function App() {
  const [formData, dispatch] = useReducer(reducer, initFormData);
  // const patch = (key, value)=>{
  //   dispatch({ type: "patch", formData: { [key]: value } })
  // }
  const onSubmit = () => {};
  const onReset = () => {
    dispatch({ type: "reset" });
  };
  return (
    <form onSubmit={onSubmit} onReset={onReset}>
      <div>
        <label>
          姓名
          <input
            value={formData.name}
            onChange={e =>
              dispatch({ type: "patch", formData: { name: e.target.value } })
            }
          />
        </label>
      </div>
      <div>
        <label>
          年龄
          <input
            value={formData.age}
            onChange={e =>
              dispatch({ type: "patch", formData: { age: e.target.value } })
            }
          />
        </label>
      </div>
      <div>
        <label>
          民族
          <input
            value={formData.nationality}
            onChange={e =>
              dispatch({
                type: "patch",
                formData: { nationality: e.target.value }
              })
            }
          />
        </label>
      </div>
      <div>
        <button type="submit">提交</button>
        <button type="reset">重置</button>
      </div>
      <hr />
      {JSON.stringify(formData)}
    </form>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```
