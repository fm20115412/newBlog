### Compose基本概念
Compose 就是将几个有特点的函数拼凑在一起， 让它们结合， 产生一个崭新的函数，如下就是组合

`const compose = (f,g) => (...arg) => f(g(...arg))`
```javascript
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce(
      (a, b) => (...args) => a(b(...args))
  )
}
```

```javascript
const add = num => num  + 10
const multiply = num => num * 2
const foo = compose(multiply, add)
foo(5) => 30
```