要使函数组件具有状态管理，可以useState() Hook。
### 一、示例
```
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
### 二、说明
1. `const [state, setState] = useState(initState)`的第一个参数是初始状态。返回的数组有两项:当前状态和状态更新函数。

2. 使用 `setState(newState)`来更新状态值。 另外，如果需要根据先前的状态更新状态，可以使用回调函数`setState(prevState => newState)`。

3. 每当 React 重新渲染组件时，都会执行`useState(initialState)`。 如果初始状态是原始值（数字，布尔值等），则不会有性能问题。当初始状态需要昂贵的性能方面的操作时，可以通过为useState(computeInitialState)提供一个函数来使用状态的延迟初始化，如下所示：
```
const [count, setCount] = React.useState(getExpensiveCount())

// getExpensiveCount 消耗很大,可以改成

const [count, setCount] = React.useState(() => getExpensiveCount())

//getExpensiveCount()仅在初始渲染时执行一次，以获得初始状态。在以后的组件渲染中，不会再调用getExpensiveCount()，从而跳过昂贵的操作。
```
4. 调用状态更新函数后，React 会重新渲染组件，以使新状态变为当前状态。
5. 声明多个state变量
```
const [age, setAge] = useState(42);
const [fruit, setFruit] = useState('banana');
const [todos, setTodos] = useState([{ text: '学习 Hook' }]);
```
6. useState不会将新对象与以前的状态合并。相反，它将完全替换它。
```
const [ state, setState ] = React.useState({
  loading: true,
  authed: false,
  repos: []
})

const setLoading = (loading) => {
  setState({
    loading
  }) // state.authed and state.repos are now gone.
}
```
### 三、useState调用规则
1. 仅顶层调用 Hook ：不能在循环，条件，嵌套函数等中调用useState()。在多个useState()调用中，渲染之间的调用顺序必须相同。
2. 仅从React 函数调用 Hook:必须仅在函数组件或自定义钩子内部调用useState()。
