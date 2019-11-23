### 1.bind的用法
```
var person = {
    name : 'lucy',
}
function fn () {
    console.log(this.name);
}
var newfn = fn.bind(person)
newfn() // lucy

bind
    function.bind(thisArg[, arg1[, arg2[, ...]]])
    参数不固定，可为多个
    第一个参数指定了函数体内this对象的指向

    后面的参数不固定，可以是多个
    不会立即执行
    返回返回一个原函数的拷贝，并拥有指定的this值和初始参数
```

### 2.bind分析
```
fn.bind(thisContext,params) 等价于

fn.bind.call(fn, thisContext, params)

因此bind函数内部的this -> fn
```
### 3.bind基础实现
```
function bind (thisContext, ...params1) {
    var fn = this;
    return function (...params2) {
        return fn.call(thisContext,...params1,...params2);
    }
}
```
### 4.支持new的bind
```
function bind (thisContext, ...params1) {
    var fn = this;
    function resultFn(...params2) {
        return fn.call (
            this instanceof resultFn ? this : thisContext,
            ...params1,
            ...params2
        );
    }
    resultFn.prototype = fn.prototype;
    return resultFn;
}
Function.prototype.bind2 = bind;
function fn(a){
    this.a = a
}
fn.prototype.say = function() {
    console.log(this.a)
}

var fn1 = fn.bind2({name:'lucy'},'x')
var obj = new fn1() 
console.log(obj.a)  // x
obj.say()   //x
```

```
1. this instanceof resultFn ? this : thisContext    //判断fn1是通过new调用还是直接调用。
2. resultFn.prototype = fn.prototype;   //将fn原型(fn.prototype)上的方法绑定给obj
```