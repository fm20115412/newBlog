**this实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数的调用方法。**
### 绑定规则
1. 默认绑定
```
function foo() 
{ 
    console.log( this.a );
}
var a = 2;
foo(); // 2
```
在代码中，`foo()`是直接使用不带任何修饰的函数引用进行调用的，使用默认绑定，`this.a`使用被解析成了全局变量`a`。

如果使用严格模式(strict mode)，那么全局对象将无法使用默认绑定，因此 this 会绑定 到 undefined:
```
function foo() 
{ 
    "use strict";
    console.log( this.a );
}
var a = 2;
foo(); // TypeError: this is undefined
```
2. 隐式绑定
```
function foo() { console.log( this.a );
}
var obj = { 
    a: 2,
    foo: foo
 };
obj.foo(); // 2

```
