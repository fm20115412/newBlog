/* function foo(num){
    console.log('foo : ' + num);
    this.count++;
}
foo.count = 0;
for(var i = 0; i < 10; i++){
    if(i > 5){
        foo(i)
    }
}
console.log(foo.count) */

/* function foo () {
    var a = 2;
    this.bar();
}
function bar() {
    console.log(this.a)
}
foo(); */

/* function baz(){
    console.log('baz');
    bar()
}
function bar(){
    console.log('bar');
    debugger;
    foo()
}
function foo(){
    console.log('foo');
}
baz(); */

/* foo();
var a = true;
if(a){
    function foo(){
        console.log('a')
    }
} else {
    function foo() {
        console.log('b')
    }
} */
function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo; // 函数别名!
var a = "oops, global"; // a 是全局对象的属性 bar(); // "oops, global"

function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
var a = "oops, global"; // a 是全局对象的属性 
setTimeout(obj.foo, 100); // "oops, global"

function setTimeout(fn, delay) { // 等待 delay 毫秒
    fn(); // <-- 调用位置!
}

function foo() {
    console.log(this.a);
}
var obj = {
    a: 2
};
foo.call(obj); // 2

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


function foo() {
    console.log(this.a);
}
var a = 2;
foo.call(null); // 2

function foo(a) {
    this.a = a;
}
var bar = new foo(2); console.log(bar.a); // 2


const obj = {
    id: 1,
    name: 'zhangsan',
    age: 18
}

for (let key in obj) {
    console.log(key + '---' + obj[key])
}


const obj = {
    id: 1,
    name: 'zhangsan',
    age: 18
}
console.log(Object.keys(obj))
console.log(Object.values(obj))

const obj = {
    id: 1,
    name: 'zhangsan',
    age: 18
}
Object.getOwnPropertyNames(obj).forEach(function (key) {
    console.log(key + '---' + obj[key])
})

const add = (a, b) => a + b

const curryAdd = a => b => a + b

function add(x, y) {
    return x + y;
}

// 柯里化之前
function add(x, y) {
    return x + y;
}

add(1, 2) // 3

// 柯里化之后
function addX(y) {
    return function (x) {
        return x + y;
    };
}

addX(2)(1) // 3

function add(a, b, c, d) {
    return a + b + c + d
}
function add(a, b) {
    return a + b
}

function curry(fn, ...args) {
    if (args.length == fn.length) {
        return fn(...args)
    } else {
        return function (...args2) {
            return curry(fn, ...args, ...args2)
        }
    }
}
addTen = curry(add, 10)
console.log(a1 = addTen(1))
console.log(a2 = addTen(2))
console.log(a3 = addTen(3))
console.log(a4 = addTen(4))


var singleTon = {
    name: 'lucy',
    age: 18,
    sayHello: function () {
        console.log(`hello everyone , my name is ${name} , my age is ${age}`)
    }
}
var singleTon = (function () {
    var instance;
    function Person(name) {
        this.name = name;
    }
    Person.prototype.sayHello = function () {
        console.log(`hello everyone , my name is ${this.name} `)
    }
    Person.prototype.setName = function (name) {
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

var OnePersopn = singleTon.getInstance('lucy')        //hello everyone , my name is lucy , my age is 18
var secondPersopn = singleTon.getInstance('lily')     //hello everyone , my name is lucy , my age is 18

onlyPersopn.sayHello()
secondPersopn.sayHello()

secondPersopn.setName('mary')

onlyPersopn.sayHello()
secondPersopn.sayHello()

class singleTon {
    constructor(name) {
        this.name = name
    }
    sayHello() {
        console.log(`hello everyone , my name is ${this.name} `)
    }
    setName(name) {
        this.name = name
    }
    static getInstance(name) {
        if (!this.instance) {
            this.instance = new singleTon(name)
        }
        return this.instance
    }
}

var firstPerson = singleTon.getInstance('lucy')
var secondPerson = singleTon.getInstance('lucy')

firstPerson.sayHello()
secondPerson.sayHello()




function createDiv(content) {

}

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


let cache = []
function deepClone(source) {
    // object类型
    
    if (source instanceof Object) {
        if (cache.indexOf(source) >= 0) {
            return source
        } else {
            cache.push(source)
        }
        // 数组类型
        if (source instanceof Array){
            let target = []
            for (let key in source){
                target.push(deepClone(source[key]))
            }
            return target
        }
        // 函数类型
        if(source instanceof Function){
            let target = function(){
                return source.call(this,...arguments)
            }
            for (let key in source) {
                target[key] = deepClone(source[key])
            }
            return target
        }
        // 常规对象类型
        let target = {};
        for (let key in source) {
            target[key] = deepClone(source[key])
        }
        return target
    }
    return source //基本数据类型 str、number、bool、undefined、null、symbol
}

let person = {
    name:'lucy',
    parents :{
        father:'john',
        mother:'mary'
    },
    grades:[90,96,100],
    sayHello(){
        console.log(`my name is ${this.name}`)
    }
}

let clonePerson = console.log(deepClone(person))
console.log(clonePerson)
clonePerson.sayHello()


let fn = function(x,y){
    return x+y
}
let cloneFn = deepClone(fn)
console.log(cloneFn(1,2))

let arr = [[1,2],[3,4],[5,6,7]]
let cloneArr = deepClone(arr)
console.log(cloneArr)

let person = {
    name: 'lucy',
    age: 11,
    parents: {
        mother: 'mary',
        father: 'john'
    }
}
clonePerson = deepClone(person)
console.log(clonePerson)
