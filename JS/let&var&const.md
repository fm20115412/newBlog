
## var vs let vs const in Es6

### 变量的声明和初始化

**变量声明**: a variable declaration introduces a new identifier.
**变量初始化**: variable initialization is when you first assign a value to a variable.
```
var declaration    // 变量声明

declaration = 'This is an initialization'    // 变量初始化

var declaration = 'This is an initialization'    // 变量声明的同时初始化
```
### 函数作用域和块级作用域

**函数作用域：** 在函数内部声明的变量拥有函数作用域，该变量可以被该函数和其嵌套的函数访问。
**块级作用域：** 块级作用域存在于函数内部，或是{}中，如if , for语句中。块级作用域中声明的变量只能在该块或是嵌套的块中访问。

var声明的变量具有函数作用域：
```
function getValue (condition) {
    if (condition) {
        var value = 'blue';
        return value;
    } else {
        console.log(value) //打印出undefined
        return null;
    }
    console.log(value) //打印出undefined
}
```
let声明的变量具有块级作用域：
```
function getValue (condition) {
    if (condition) {
        let value = 'blue';
        return value;
    } else {
        console.log(value) //ReferenceError: value is not defined
        return null;
    }
    console.log(value) //ReferenceError: value is not defined
}
```

### 变量提升
```
function getValue (condition) {
    if (condition) {
        var value = 'blue';
        return value;
    } else {
        return null;
    }
}

// 在预编译截断，js引擎会将上述函数变量提升，如下所示：

function getValue (condition) {
    var value;
    if (condition) {
        value = 'blue';
        return value;
    } else {
        return null;
    }
}
```
变量的声明被提升至函数顶部，而初始化操作依旧留在原处执行。这就意味着在else子句中也可以访问到该变量，且由于此时变量尚未初始化，所以其值是undefined。

var声明的变量会提升至函数顶部，而let声明不会提升。

### const

const声明的变量具有let声明的变量的所有特性，除此之外，它还必须：

1. 声明时必须初始化
```
const name;  ❌ Uncaught SyntaxError: Missing initializer in const declaration
```
2. 初始化后不可再赋值
```
let name = 'Tyler'
const handle = 'tylermcginnis'

name = 'Tyler McGinnis' // ✅
handle = '@tylermcginnis' // ❌ TypeError: Assignment to constant variable.
```

注意： const声明不允许修改绑定，但允许修改值
```
const person = {
  name: 'Kim Kardashian'
}

person.name = 'Kim Kardashian West' // ✅

person = {} // ❌ Assignment to constant variable.
```

### var vs let vs const
```
var VS let VS const

var: 
  函数作用域
  声明之前访问值是undefined
  变量会被提升至函数顶部

let: 
  块级作用域
  声明之前访问值会报错
  不存在变量提升

const:
  块级作用域
  声明之前访问值会报错
  不存在变量提升
  ➕
  声明时必须进行初始化
  声明之后不可再赋值
```

### 参考文章
[var vs let vs const in JavaScript](https://tylermcginnis.com/var-let-const/)