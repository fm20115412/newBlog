## 一、单例模式
**两种理解方式:**

> 单体模式提供了一种将代码组织为一个逻辑单元的手段，这个逻辑单元中的代码可以通过单一变量进行访问。

> 单例就是保证一个类只有一个实例，实现的方法一般是先判断实例存在与否，如果存在直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。在JavaScript里，单例作为一个命名空间提供者，从全局命名空间里提供一个唯一的访问点来访问该对象。

**特点：**
- 可以用来划分命名空间，减少全局变量的数量。
- 可以被实例化，且实例化一次

**实现：**

1. 对象字面量，可以创建唯一的实例
```
var singleTon = {
    name : 'lucy',
    age : 18,
    introduce: function () {
        console.log(`hello everyone , my name is ${name} , my age is ${age}`)
    }
}
```
2. 闭包
```
var singleTon = (function () {
    var instance;
    function Person(name) {
        this.name = name;
    }
    Person.prototype.sayHello = function () {
        console.log(`hello everyone , my name is ${this.name} `)
    }
    Person.prototype.setName = function (name){
        this.name = name
    }
    return {
        getInstance: function (name) {
            if (instance == undefined) {
                instance = new Person(name)
            }
            return instance
        }
    }
})()

var firstPersopn = singleTon.getInstance('lucy')       
var secondPersopn = singleTon.getInstance('lily')

console.log(firstPersopn === secondPersopn ? 'true' : 'false')  //true

firstPersopn.sayHello()                  //hello everyone , my name is lucy 
secondPersopn.sayHello()                 //hello everyone , my name is lucy 

secondPersopn.setName('mary')

firstPersopn.sayHello()                  //hello everyone , my name is mary 
secondPersopn.sayHello()                 //hello everyone , my name is mary 
```
3. class
```
class singleTon {
    constructor(name){
        this.name = name
    }
    sayHello(){
        console.log(`hello everyone , my name is ${this.name} `)
    }
    setName(name){
        this.name = name
    }
    static getInstance(name){
        console.log('this ---',this)
        if(!this.instance){
            this.instance = new singleTon(name)
        }
        return this.instance
    }
}

var firstPerson = singleTon.getInstance('lucy')
var secondPerson = singleTon.getInstance('lucy')

console.log(firstPerson === secondPerson ? 'true' : 'false')        //true
firstPerson.sayHello()      //hello everyone , my name is lucy 
secondPerson.sayHello()     //hello everyone , my name is lucy 

secondPerson.setName('mary')

firstPerson.sayHello()       //hello everyone , my name is mary   
secondPerson.sayHello()      //hello everyone , my name is mary 
```

**应用场景：**

1. 比如点击页面某一个button,会弹出一个弹框，弹框就可以使用单例模式
```
var button = document.querySelectorAll('button')[0]
button.addEventListener('click',function(e){
  var div = createDiv('hahaha')
  div.style.display = 'block'
  
})

var createDiv = (function (){
  var div;
  return function(content){
    if(!div){
        div = document.createElement("div");
        div.innerHTML = content
        div.style.width = '50px'
        div.style.height = '30px'
        div.style.display = 'none'
        document.body.appendChild(div)
    }
     return div
  }
}())
```
2.创建对象时耗时过多或者耗资源过多，但又经常用到的对象。 
3.频繁访问数据库或文件的对象。 

**优缺点：**
- 优点：适用于单一对象，只生成一个对象实例，避免频繁创建和销毁实例，减少内存占用。
- 缺点：不适用需创建多个相似对象的场景。

## 二、发布/订阅模式

**定义：**
> 它定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象，这个主题对象的状态发生变化时就会通知所有的观察者对象，使得它们能够自动更新自己。

```
var Event = (function () {
    var eventList = {}

    function listen(key, fn) {
        if (!eventList[key]) {
            eventList[key] = []
        }
        eventList[key].push(fn)
    }

    function trigger(key, params) {
        var fnList = eventList[key]
        if (!fnList || fnList.length == 0) {
            return
        }
        for (var i = 0; i < fnList.length; i++) {
            fnList[i](params)
        }
    }

    function remove(key, fn) {
        var fnList = eventList[key]
        if (!fnList) {
            return
        }
        if (!fn) {
            delete eventList[key]
        } else {
            var fnList = eventList[key]
            var index = -1
            for (var i = 0; i < fnList.length; i++) {
                if (fn == fnList[i]) {
                    index = i;
                    break;
                }
            }
            fnList.splice(i, 1)
        }
    }
    return {
        listen,
        trigger,
        remove
    }
})()
Event.listen('apple', function (num) {
    console.log(`buy  ${num} kilograms apples`)
})

Event.trigger('apple', 3)
```
