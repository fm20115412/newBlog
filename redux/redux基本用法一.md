[TOC]
### 设计思想
>- Web 应用是一个状态机，视图与状态是一一对应的。
>- 所有的状态，保存在一个对象里面。
### 基本概念和API
```js
let newStore = applyMiddleware(mid1, mid2, mid3, ...)(createStore)(reducer, null);
```