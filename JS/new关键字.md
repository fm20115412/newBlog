先上代码
```
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

var car1 = new Car('Eagle', 'Talon TSi', 1993);

console.log(car1.make);
```
如上图所示，当代码 new Car(...) 执行时，会发生以下事情：
1. 创建一个对象
```
var obj = new Object()
```
2. 设置原型链，将将构造函数的prototype赋值给新对象的__proto__
```
obj.__proto__ = Car.prototype
```
3. 调用构造函数,且this指向新对象
```
var result = Car.call(obj)
// obj.make = 'Eagle'
// obj.model = 'Talon TSi'
// obj.year = 1993
```
4. 如果构造函数无返回值，或者不是引用类型，则返回新对象；否则为构造函数的返回值。
```
if (typeof(resul   t) == "object"){  
    return result;  
} else {  
    return obj;
}  
```