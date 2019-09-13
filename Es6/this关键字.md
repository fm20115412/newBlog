**this实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数的调用方法。**
### 绑定规则
#### 1. 默认绑定
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
#### 2. 隐式绑定
```
function foo() { console.log( this.a );
}
var obj = { 
    a: 2,
    foo: foo
 };
obj.foo(); // 2

```
如果函数引用前有`.`,则 `.`左边的对象便是this所引用的对象。
需要注意的是，对象属性引用链中只有最后一层在调用位置中起作用。
```
function foo() { 
    console.log( this.a );
}
var obj2 = { 
    a: 42,
    foo: foo 
};
var obj1 = { 
    a: 2,
    obj2: obj2 
};
obj1.obj2.foo(); // 42，这里this引用的是obj2
```
**2.1 隐式丢失**
```
function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo; // 函数别名!
var a = "oops, global"; // a 是全局对象的属性 bar(); // "oops, global"
```
虽然bar是obj.foo的一个引用，但是实际上，它引用的是foo函数本身，因此此时的bar()其实是一个不带任何修饰的函数调用，因此应用了默认绑定。

```
function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
var a = "oops, global"; // a 是全局对象的属性 
setTimeout( obj.foo, 100 ); // "oops, global"
```
另外，js环境中内置的`setTimeout`函数实现和下面的代码类似，因此调用`fn()`时，会使用默认绑定，`this`会绑定到全局对象或是`undefined`,取决于是否是严格模式。
```
function setTimeout(fn, delay) { // 等待 delay 毫秒
    fn(); // <-- 调用位置!
}
```
#### 3.显示绑定
使用call、apply，bind，这三个函数的第一个参数是一个对象，在调用时会将其绑定到this。从this绑定的角度来说，call和apply是一样的，他们的差别在于：

> apply 接受两个参数,第一个参数指定了函数体内 this 对象的指向,第二个参数为一个带下标的集合,这个集合可以为数组,也可以为类数组,apply方法会自动帮我们将把集合中的元素展开作为参数传递给被调用的函数。

> call 传入的参数数量不固定, 跟apply 相同的是,第一个参数也是代表函数体内的 this 指向, 从第二个参数开始往后,每个参数被依次传入函数。

```
function greet(l1, l2, l3) {
    alert(
        `Hello, my name is ${this.name} and I know ${l1}, ${l2}, and ${l3}`
    )
}
const user = {
    name: 'Tyler',
    age: 27,
}
const languages = ['JavaScript', 'Ruby', 'Python']

greet.call(user, languages[0], languages[1], languages[2])
greet.apply(user, languages)
```
通过`greet.call()/greet.apply`，我们可以在调用`great`时强制把它的`this`绑定到`user`上。

> bind: 它和 call 很相似，接受的参数有两部分，第一个参数是是作为函数上下文的对象，第二部分参数是个列表，可以接受多个参数。她返回一个原函数的拷贝，并拥有指定的this值和初始参数。

```
function greet (l1, l2, l3) {
  alert(
    `Hello, my name is ${this.name} and I know ${l1}, ${l2}, and ${l3}`
  )
}

const user = {
  name: 'Tyler',
  age: 27,
}

const languages = ['JavaScript', 'Ruby', 'Python']

const newFn = greet.bind(user, languages[0], languages[1], languages[2])
newFn() // alerts "Hello, my name is Tyler and I know JavaScript, Ruby, and Python"
```
```
call VS apply VS bind

call : 
    fun.call(thisArg, arg1, arg2, ...)
    立即执行
    参数不固定，可为多个
    第一个参数指定了函数体内this对象的指向
    后面的参数不固定，可为多个
apply：
    func.apply(thisArg, [argsArray])
    立即执行
    两个参数
    第一个参数指定了函数体内this对象的指向
    第二个参数是数组
bind
    function.bind(thisArg[, arg1[, arg2[, ...]]])
    参数不固定，可为多个
    第一个参数指定了函数体内this对象的指向

    后面的参数不固定，可以是多个
    不会立即执行
    返回返回一个原函数的拷贝，并拥有指定的this值和初始参数

```

apply、call 方法都会使函数立即执行，因此它们也可以用来调用函数。bind 方法不会立即执行，返回一个原函数的拷贝，并拥有指定的this值和初始参数，而原函数中的this 并不会改变。

如果把null 或者 undefined作为this的绑定对象传入call、apply或bind，这些值在调用时会被忽略，实际应用的是默认绑定规则。
```
function foo() {
    console.log(this.a);
}
var a = 2;
foo.call(null); // 2
```
#### 4. new绑定
使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。
1. 创建(或者说构造)一个全新的对象。
2. 这个新对象会被执行[[原型]]连接。
3. 这个新对象会绑定到函数调用的this。
4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。
```
function foo(a) {
    this.a = a;
}
var bar = new foo(2); 
console.log(bar.a); // 2
```
使用new来调用foo()时，我们会构建一个新对象并把它绑定到foo调用中的this上。

#### 5.箭头函数