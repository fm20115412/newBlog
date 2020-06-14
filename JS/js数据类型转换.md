[TOC]
## 强制转换
### 其他数据类型转换为string
#### String()
String函数可以将任意类型的值转化成字符串，转换规则如下。
- 原始类型值
> 数值：转为相应的字符串。
字符串：转换后还是原来的值。
布尔值：true转为字符串"true"，false转为字符串"false"。
undefined：转为字符串"undefined"。
null：转为字符串"null"。
```
String(123) // "123"
String('abc') // "abc"
String(true) // "true"
String(undefined) // "undefined"
String(null) // "null"
```
- 对象
  
String方法的参数如果是对象，返回一个类型字符串；如果是数组，返回该数组的字符串形式。
```
String({a: 1}) // "[object Object]"
String([1, 2, 3]) // "1,2,3"
```
String()背后的转换规则 : 
> - 先调用对象自身的toString方法。如果返回原始类型的值，则对该值使用String函数，不再进行以下步骤。
>- 如果toString方法返回的是对象，再调用原对象的valueOf方法。如果valueOf方法返回原始类型的值，则对该值使用String函数，不再进行以下步骤。
>- 如果valueOf方法返回的是对象，就报错。
### 其他数据类型转换为number
#### Number()
使用Number函数，可以将任意类型的值转化成数值。

下面分成两种情况讨论，一种是参数是原始类型的值，另一种是参数是对象。
- 参数是原始类型
```
// 数值：转换后还是原来的值
Number(324) // 324

// 字符串：如果可以被解析为数值，则转换为相应的数值
Number('324') // 324

// 字符串：如果不可以被解析为数值，返回 NaN
Number('324abc') // NaN

// 空字符串转为0
Number('') // 0

// 布尔值：true 转成 1，false 转成 0
Number(true) // 1
Number(false) // 0

// undefined：转成 NaN
Number(undefined) // NaN

// null：转成0
Number(null) // 0
```
- 参数是对象

简单的规则是，Number方法的参数是对象时，将返回NaN，除非是包含单个数值的数组。
```
Number({a: 1}) // NaN
Number([1, 2, 3]) // NaN
Number([5]) // 5
Number(['5']) // 5
```
Number()背后的转换规则 : 
>- 第一步，调用对象自身的valueOf方法。如果返回原始类型的值，则直接对该值使用Number函数，不再进行后续步骤。
>-  第二步，如果valueOf方法返回的还是对象，则改为调用对象自身的toString方法。如果toString方法返回原始类型的值，则对该值使用Number函数，不再进行后续步骤。
>- 第三步，如果toString方法返回的是对象，就报错。

#### parseInt() & parseFloat()
这种方式专门用来对付字符串:
- parseInt()一个字符串转换为一个整数,可以将一个字符串中的有效的整数内容取出来，然后转换为Number。 
-  parseFloat()把一个字符串转换为一个浮点数。parseFloat()作用和parseInt()类似，不同的是它可以获得有效的小数。
```
console.log(parseInt('.21'));        //NaN
console.log(parseInt("10.3"));        //10
console.log(parseFloat('.21'));      //0.21
console.log(parseFloat('.d1'));       //NaN
console.log(parseFloat("10.11.33"));  //10.11
console.log(parseFloat("4.3years"));  //4.3
console.log(parseFloat("He40.3"));    //NaN
```
parseInt()在没有第二个参数时默认以十进制转换数值，有第二个参数时，以第二个参数为基数转换数值，如果基数有误返回NaN。
```
console.log(parseInt("13"));          //13
console.log(parseInt("11",2));        //3
console.log(parseInt("17",8));        //15
console.log(parseInt("1f",16));       //31
```

**Number 和 parseInt、parseFloat 的区别**：
- Number函数将字符串转为数值，要比parseInt函数严格很多。基本上，只要有一个字符无法转成数值，整个字符串就会被转为NaN。parseInt逐个解析字符，而Number函数整体转换字符串的类型。
```
parseInt('42 cats') // 42
Number('42 cats') // NaN
```
- 对空字符串的处理也不一样
```
Number("   ");     //0    
parseInt("   ");   //NaN
```
### 其他数据类型转换为bool
#### Boolean
Boolean函数可以将任意类型的值转为布尔值。
它的转换规则相对简单：除了以下五个值的转换结果为false，其他的值全部为true。

> undefined
null
-0或+0
NaN
''（空字符串）

**注意:**  所有对象（包括空对象）的转换结果都是true，甚至连false对应的布尔对象new Boolean(false)也是true。

```
Boolean({}) // true
Boolean([]) // true
Boolean(new Boolean(false)) // true
```

## 自动转换
### 自动转换为string
JavaScript 遇到预期为字符串的地方，就会将非字符串的值自动转为字符串。具体规则是，先将复合类型的值转为原始类型的值，再将原始类型的值转为字符串。

字符串的自动转换，主要发生在字符串的加法运算时。当一个值为字符串，另一个值为非字符串，则后者转为字符串。
```
'5' + 1 // '51'
'5' + true // "5true"
'5' + false // "5false"
'5' + {} // "5[object Object]"
'5' + [] // "5"
'5' + function (){} // "5function (){}"
'5' + undefined // "5undefined"
'5' + null // "5null"
```
### 自动转换为number
JavaScript 遇到预期为数值的地方，就会将参数值自动转换为数值。系统内部会自动调用Number函数。

除了加法运算符（+）有可能把运算子转为字符串，其他运算符都会把运算子自动转成数值。

```
'5' - '2' // 3
'5' * '2' // 10
true - 1  // 0
false - 1 // -1
'1' - 1   // 0
'5' * []    // 0
false / '5' // 0
'abc' - 1   // NaN
null + 1 // 1
undefined + 1 // NaN
```
> 注意：null转为数值时为0，而undefined转为数值时为NaN。
### 自动转换为bool
JavaScript 遇到预期为布尔值的地方（比如if语句的条件部分），就会将非布尔值的参数自动转换为布尔值。系统内部会自动调用Boolean函数。

因此除了以下五个值，其他都是自动转为true。

> undefined
null
+0或-0
NaN
''（空字符串）
