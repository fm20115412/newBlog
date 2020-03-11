[TOC]
### 代理是什么
通过调用 new Proxy() ，你可以创建一个代理用来替代另一个对象（被称之为目目标对象） ，这个代理对目标对象进行了虚拟，因此该代理与该目标对象表面上可以被当作同一个对象来对待。

代理允许你拦截目标对象上的底层操作，而这本来是JS引擎的内部能力，拦截行为使用了一个能响应特定操作的函数（被称之为陷阱）。

简单来说:Proxy对象就是可以让你去对JavaScript中的一切合法对象的基本操作进行自定义.然后用你自定义的操作去覆盖其对象的基本操作.也就是当一个对象去执行一个基本操作时,其执行的过程和结果是你自定义的,而不是对象的。

### 如何使用
```
let proxy = new Proxy(target, handler);
```
- target : 用Proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
- proxy : 被代理后的新对象,它拥有target的一切属性和方法.只不过其行为和结果是在handler中自定义的。
- handler : 一个对象，其属性是当执行一个操作时定义代理行为的函数，可以支持以下13种代理操作。

**可分为以下几类：**

- 对代理对象属性进行操作

```
在读取代理对象的某个属性时触发该操作，比如在执行 proxy.foo 时。

✨ get()

在给代理对象的某个属性赋值时触发该操作，比如在执行 proxy.foo = 1 时。

✨ set()

在判断代理对象是否拥有某个属性时触发该操作，比如在执行 "foo" in proxy 时。

✨ has()

在定义代理对象某个属性时的属性描述时触发该操作，比如在执行 Object.defineProperty(proxy, "foo", {}) 时。

✨ defineProperty()

在获取代理对象的所有属性键时触发该操作，比如在执行 Object.getOwnPropertyNames(proxy) 时。

✨ ownKeys()

在删除代理对象的某个属性时触发该操作，比如在执行 delete proxy.foo 时。

✨ deleteProperty()

```
- 目标对象为函数时可触发的操作
```
在调用一个目标对象为函数的代理对象时触发该操作，比如在执行 proxy() 时。

✨ apply()

在给一个目标对象为构造函数的代理对象构造实例时触发该操作，比如在执行new proxy() 时。

✨ construct()
```
- 对代理对象原型进行操作

```
在获取代理对象某个属性的属性描述时触发该操作，比如在执行 Object.getOwnPropertyDescriptor(proxy, "foo") 时。

✨ getOwnPropertyDescriptor()

在读取代理对象的原型时触发该操作，比如在执行 Object.getPrototypeOf(proxy) 时。

✨ getPrototypeOf()

在设置代理对象的原型时触发该操作，比如在执行 Object.setPrototypeOf(proxy, null) 时。

✨ setPrototypeOf()

```
- 对代理对象扩展性进行操作
```
在判断一个代理对象是否是可扩展时触发该操作，比如在执行 Object.isExtensible(proxy) 时。

✨ isExtensible()

在让一个代理对象不可扩展时触发该操作，比如在执行 Object.preventExtensions(proxy) 时。

✨ preventExtensions()
```
### 常用例子
- 返回对象默认值

通常访问对象不存在的属性会返回undefined，我们可以通过get方法使其返回默认值。
```
let target = {
  x: 4,
  y: 19
}
let target = new Proxy(target, {
  get: (obj, prop) => (prop in obj) ? obj[prop] : 0
}
console.log(target.x, target.y, target.z) // 4, 19, 0
```
- 设置属性时对值做限制
```
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对于满足条件的 age 属性以及其他属性，直接保存
    obj[prop] = value;
  }
};

let person = new Proxy({}, validator);

person.age = 100;

person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
```
- 隐藏内部属性
```
var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false
```
- 拦截函数调用
```
const user = {
    firstName: 'John',
    lastName: 'Doe'
}

const getFullName = function (user) {
    return `${user.firstName} ${user.lastName}`;
}


const getFullNameProxy = new Proxy(getFullName, {
    apply(target, thisArg, args) {
        return target(...args).toUpperCase();
    }
});

console.log(getFullNameProxy(user)); // JOHN DOE
```