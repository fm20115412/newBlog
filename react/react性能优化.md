[TOC]
## class组件
1. 实现shouldComponentUpdate()
当React想要渲染一个组件的时候，它将会调用这个组件的shouldComponentUpdate函数, 这个函数会告诉它是不是真的要渲染这个组件。当你想要React重新渲染你的组件的时候，就在这个方法中返回true，否则返回false。
```javascript
shouldComponentUpdate(nextProps, nextState) {
    if
    return true        
}
```

2. 继承React.pureComponent
React在v15.5的时候引入了Pure Component组件。React在进行组件更新时，如果发现这个组件是一个PureComponent，它会将组件现在的state和props和其下一个state和props进行浅比较，如果它们的值没有变化，就不会进行更新。要想让你的组件成为Pure Component，只需要extends React.PureComponent即可。

```
class App extends React.PureComponent {
    ...
}
```
如果 PureComponent 里有 shouldComponentUpdate 函数的话，直接使用 shouldComponentUpdate 的结果作为是否更新的依据，没有shouldComponentUpdate 函数的话，才会去判断是不是 PureComponent ，是的话再去做 shallowEqual浅比较。

## 函数组件
### React.memo()
React.memo(...)是React v16.6引进来的新属性。它的作用和React.PureComponent类似，是用来控制函数组件的重新渲染的。React.memo(...) 其实就是函数组件的React.PureComponent。

```javascript
const Funcomponent = ()=> {
    return (
        <div>
            Hiya!! I am a Funtional component
        </div>
    )
}
const MemodFuncComponent = React.memo(FunComponent)
```
React.memo会返回一个纯化(purified)的组件MemoFuncComponent，这个组件将会在JSX标记中渲染出来。当组件的参数props和状态state发生改变时，React将会检查前一个状态和参数是否和下一个状态和参数是否相同，如果相同，组件将不会被渲染，如果不同，组件将会被重新渲染。

## 使用React.Fragment避免添加额外的DOM
