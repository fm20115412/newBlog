1. 只在 React 函数组件中调用 Hook 
- ✅ 在 React 的函数组件中调用 Hook
- ✅ 在自定义 Hook 中调用其他 Hook
- ❌ 不可以在class组件中调用Hook
- ❌ 不可以在普通函数中调用Hook
2. 只在最顶层使用 Hook 
- ❌ 不可以在if、循环、嵌套函数中调用Hook
```js
function Counter () {
  // ✅ from the top level function component
  const [count, setCount] = React.useState(0)

  if (count % 2 === 0) {
    // ❌ not from the top level
    React.useEffect(() => {})
  }

  const handleIncrement = () => {
    setCount((c) => c + 1)

    // ❌ not from the top level
    React.useEffect(() => {})
  }

  ...
}

function useAuthed () {
  // ✅ from the top level of a custom Hook
  const [authed, setAuthed] = React.useState(false)
}

class Counter extends React.Component {
  render () {
    // ❌ from inside a Class component
    const [count, setCount] = React.useState(0)
  }
}

function getUser () {
  // ❌ from inside a normal function
  const [user, setUser] = React.useState(null)
}
```