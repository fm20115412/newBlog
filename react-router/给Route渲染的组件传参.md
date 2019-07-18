### 说明
如果想要给Route渲染的组件传入参数，可以使用Route中的`render`属性，给它传一个函数，并在函数中传入你想要的参数。
注意，千万不要将函数传给`component`,官方解释如下：


> “When you use the component props, the router uses React.createElement to create a new React element from the given component. That means if you provide an inline function to the component attribute, you would create a new component every render. This results in the existing component unmounting and the new component mounting instead of just updating the existing component.”
### code
```
<Route
  path='/dashboard'
  render={(props) => <Dashboard {...props} isAuthed={true} />}
/>
```