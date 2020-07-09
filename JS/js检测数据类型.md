[toc]
### typeof
`typeof`一般只能返回如下几个结果：`number`,`boolean`,`string`,`function`,`object`,`undefined`
|       Value        |  typeof  |
| :----------------: | :------: |
|       "foo"        |  string  |
| new String("foo")  |  object  |
|        1.2         |  number  |
|  new Number(1.2)   |  object  |
|        true        | boolean  |
| new Boolean(true)  |  object  |
|     new Date()     |  object  |
|    new Error()     |  object  |
|      [1,2,3]       |  object  |
| new Array(1, 2, 3) |  object  |
|  new Function("")  | function |
|       /abc/g       |  object  |
| new RegExp("meow") |  object  |
|         {}         |  object  |
|    new Object()    |  object  |

在实际的项目应用中，`typeof`只有两个**用途**：
- 检测一个元素是否为`undefined`

我们可以使用`typeof`来获取一个变量是否存在，如`if(typeof a!="undefined"){}`，而不要去使用`if(a)`因为如果`a`不存在（未声明）则会出错

- 是否为`function`。
```
typeof new Function();  // function
```
**缺陷：** 对于 `Array`,`Null`等特殊对象使用`typeof`一律返回`object`，这正是`typeof`的局限性。
### instance
所有可以通过构造函数创建的对象都可以用 `instanceof` 检查。
`instanceof` 是用来判断 `A` 是否为 `B` 的实例对，表达式为：`A instanceof B`，如果A是B的实例，则返回`true`,否则返回`false`。 在这里需要特别注意的是：`instanceof`检测的是原型。当 `A` 的 `proto` 指向 `B` 的 `prototype` 时，就认为A就是B的实例。

```
var a=new Array();
alert(a instanceof Array);  // true
alert(a instanceof Object) // true
```
`instanceof` 三大弊端：
- 对于基本数据类型来说，字面量方式创建出来的结果和实例方式创建的是有一定的区别的。
```
console.log(1 instanceof Number)    //false
console.log(new Number(1) instanceof Number)    //true
```
- 只要在当前实例的原型链上，我们用其检测出来的结果都是`true`。在类的原型继承中，我们最后检测出来的结果未必准确。
```
var arr = [1, 2, 3];
console.log(arr instanceof Array) // true
console.log(arr instanceof Object);  // true
function fn(){}
console.log(fn instanceof Function)// true
console.log(fn instanceof Object)// true
```
- 不能检测`null` 和 `undefined`

对于特殊的数据类型`null`和`undefined`，他们的所属类是`Null`和`Undefined`，但是浏览器把这两个类保护起来了，不允许我们在外面访问使用。

### Object.prototype.toString.call()
`toString`是`Object`原型对象上的一个方法，该方法默认返回其调用者的具体类型，更严格的讲，是 `toString`运行时`this`指向的对象类型, 返回的类型格式为`[object,xxx]`,`xxx`是具体的数据类型，其中包括：`String,Number,Boolean,Undefined,Null,Function,Date,Array,RegExp,Error,HTMLDocument`,... 基本上所有对象的类型都可以通过这个方法获取到。
```
Object.prototype.toString.call('') ;   // [object String]
Object.prototype.toString.call(1) ;    // [object Number]
Object.prototype.toString.call(true) ; // [object Boolean]
Object.prototype.toString.call(undefined) ; // [object Undefined]
Object.prototype.toString.call(null) ; // [object Null]
Object.prototype.toString.call(new Function()) ; // [object Function]
Object.prototype.toString.call(new Date()) ; // [object Date]
Object.prototype.toString.call([]) ; // [object Array]
Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
Object.prototype.toString.call(new Error()) ; // [object Error]
Object.prototype.toString.call(document) ; // [object HTMLDocument]
Object.prototype.toString.call(window) ; //[object global] window是全局对象global的引用
```
需要注意的是，必须通过`Object.prototype.toString.call`来获取，而不能直接 `new Date().toString()`, 从原型链的角度讲，所有对象的原型链最终都指向了`Object`, 按照JS变量查找规则，其他对象应该也可以直接访问到`Object`的`toString`方法，而事实上，大部分的对象都实现了自身的`toString`方法，这样就可能会导致`Object的toString`被终止查找，因此要用`call`来强制执行`Object的toString`方法。