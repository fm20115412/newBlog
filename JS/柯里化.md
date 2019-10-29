### 柯里化含义
> Currying —— 只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

> Currying 为实现多参函数提供了一个递归降解的实现思路，把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下参数的新函数
### 柯里化demo
```
// 柯里化之前
function add(x, y) {
  return x + y;
}

add(1, 2) // 3

// 柯里化之后
function add(y) {
  return function (x) {
    return x + y;
  };
}

add(1)(2) // 3
```
### 实现curry
```
function curry(fn,...args){
    if (args.length == fn.length){
        return fn(...args)
    }else{
        return function(...args2){
            return curry(fn,...args,...args2)
        }
    }
}

// 测试
function add(a,b,c,d){
    return a+b+c+d
}
curryAdd = curry(add)
console.log(curryAdd(1)(2)(3)(4))
```
### curry使用场景
1. 复用参数
```
function add(a, b){
    return a+b
}
addTen = curry(add,10)

console.log(a1 = addTen(1))
console.log(a2 = addTen(2))
console.log(a3 = addTen(3))
console.log(a4 = addTen(4))
```

