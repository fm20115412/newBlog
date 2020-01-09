### 1. 示例
```
function Counter () {
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    document.title = `Count: ${count}`
  })


  return (
    <React.Fragment>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </React.Fragment>
  )
}
```
### 2. 调用时机：
useEffect内的函数会在组件渲染之后调用,包括初始化的渲染和每次的重新渲染。
### 3. 跳过 对Effect的调用
分为三种情况：
```
✨ 1. 第二个参数省略
React.useEffect(() => {
  // Will be invoked on the initial render 
  // and all subsequent re-renders.
})

✨ 2. 第二个参数是一个数组
React.useEffect(() => {
  // Will be invoked on the initial render
  // and when "id" or "authed" changes.
}, [id, authed])

✨ 3. 第三个参数是一个空数组
React.useEffect(() => {
  // Will only be invoked on the initial render
}, [])
```
### 4. 需要清除的 effect
```
React.useEffect(() => {

  return () => {
    // invoked right before invoking
    // the new effect after a re-render AND
    // right before removing the component
    // from the DOM
  }
})
```
每个 effect 都可以返回一个清除函数。 React 会在
1. 组件卸载之前执行这个清除操作。
2. 会在执行当前 effect 之前对上一个 effect 进行清除。