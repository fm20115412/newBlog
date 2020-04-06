[TOC]
## 准备工作
由于decorator是es7提供的方法，在浏览器中是无法直接运行的，所以我们需要提前作准备，对它进行编译。

在这里我们采用typescript的方法将ts文件编译成js
1. 全局安装typescript
```
npm i -g typescript
```
2. 当前目录新建app.ts文件，我们的decorator测试代码将写在这里
3. 新建`tsconfig.json`，启用实验性的装饰器特性。
```
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}
```
4. 执行`tsc app.ts`，生成`app.js`，再执行`node app.js`

## decorator起飞
### decorator的作用
装饰器（Decorator）是一种与类（class）相关的语法，用来注释或修改类和类方法。
### decorator的语法
装饰器是一种函数，写成@ + 函数名。它可以放在类和类方法的定义前面。
```
@decorator
class Cat {}

class Cat {
    @decorator
    run() {}
}
```
### 作用于类的装饰器
类的装饰器函数只接受一个参数，即类的构造函数。
```
function isAnimal(target) {
    target.isAnimal = true;
  	return target;
}

@isAnimal
class Cat {
    ...
}

console.log(Cat.isAnimal);    // true
```
### 作用于类方法的装饰器
比如有的时候，我们希望把我们的部分属性置成只读，以避免别人对其进行修改，如果使用装饰器的话，我们可以这样来做：
```
function readonly(target, name, descriptor) {
    // 更改say方法的discriptor
    discriptor.writable = false;
    // 新的descriptor会被应用到say方法上
    return discriptor;
}

class Cat {
    @readonly
    say() {
        console.log("meow ~");
    }
}

var kitty = new Cat();

kitty.say = function() {
    console.log("woof !");
}

kitty.say()  // meow ~
```
我们通过上面的代码把 say 方法设置成了只读，所以在我们后面再次对它赋值的时候就不会生效，调用的还是之前的方法。
修饰类的方法时，装饰器函数接受三个参数，分别是：
- target ： 类的原型对象， 上例是Cat.prototype
- key : 要装饰的属性名，上例是say
- descriptor ： 该属性的描述对象，Object.getOwnPropertyDescriptor(Cat.prototype, 'say')

## 参考文献
[1. Javascript 中的装饰器](https://aotu.io/notes/2016/10/24/decorator/index.html)
[2. JavaScript 装饰器极速指南](https://juejin.im/post/5ac85f1d6fb9a028bf0590ee)
[3. Typescript对装饰器的介绍](https://zhongsp.gitbooks.io/typescript-handbook/doc/handbook/Decorators.html)