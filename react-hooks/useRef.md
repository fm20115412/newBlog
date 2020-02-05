### 用法
```
const ref = useRef(initialValue);
```
 useRef accepts an initial value as its first argument and it returns an object that has a current property (which will initially be set to whatever the initial value was). From there, anything you add to current will be persisted across renders.
### 作用
useRef can persist a value for a full lifetime of the component. However, note that the component will not rerender when the current value of useRef changes.
### 示例
The most popular use case for useRef is getting access to DOM nodes. If you pass the value you get from useRef as a ref prop on any React element, React will set the current property to the corresponding DOM. This allows you to do things like grab input values or set focus.
```
const FocusInput = () => {
   const inputEl = React.useRef(null)
   const focusInput = () => {
      inputEl.current.focus()
   }
   return (
      <>
         <input ref={inputEl} type="text" />
         <button onClick={focusInput}>Focus input</button>
      </>
   )
}
```
### 参考文献
[Introduction to useRef Hook](https://dev.to/dinhhuyams/introduction-to-useref-hook-3m7n)
[The useRef Hook](https://learn.tylermcginnis.com/courses/613356/lectures/10986143)