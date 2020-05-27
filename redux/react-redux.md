[TOC]
### react-redux基本使用
React Redux is the official React binding for Redux. It lets your React components read data from a Redux store, and dispatch actions to the store to update data.

#### 依赖
```js
npm install react-redux
```

#### UI组件
React-Redux 将所有组件分成两大类：UI 组件（presentational component）和容器组件（container component）。UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。

React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。


**UI 组件**有以下几个特征：
- 只负责 UI 的呈现，不带有任何业务逻辑
- 没有状态（即不使用this.state这个变量）
- 所有数据都由参数（this.props）提供
- 不使用任何 Redux 的 API

因为不含有状态，UI 组件又称为"纯组件"，即它纯函数一样，纯粹由参数决定它的值。
#### 容器组件
**容器组件**的特征恰恰相反：
- 负责管理数据和业务逻辑，不负责 UI 的呈现
- 带有内部状态
- 使用 Redux 的 API

#### UI组件生成容器组件
React Redux provides a connect function for you to connect your component to the store. Normally, you’ll call connect in this way:
```js
import { connect } from 'react-redux'
import { increment, decrement, reset } from './actionCreators'

// const Counter = ...

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = { increment, decrement, reset }

const CounterCt =  connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
```

`React-Redux` 提供`connect`方法，用于从 UI 组件生成容器组件。`connect`的意思，就是将这两种组件连起来。

`connect`方法接受两个参数：`mapStateToProps`和`mapDispatchToProps`
它们定义了 UI 组件的业务逻辑。前者负责输入逻辑，即将`state`映射到 UI 组件的参数`（props）`，后者负责输出逻辑，即将用户对 UI 组件的操作映射成 `Action`。

### 常用Api

#### Provider
React Redux provides <Provider />, which makes the Redux store available to the rest of your app:
```js
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './store'

import App from './App'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
```
#### mapStateToProps

#### mapDispatchToProps



