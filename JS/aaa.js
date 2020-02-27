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
/*
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
        if (source instanceof Array) {
            let target = []
            for (let key in source) {
                target.push(deepClone(source[key]))
            }
            return target
        }
        // 函数类型
        if (source instanceof Function) {
            let target = function () {
                return source.call(this, ...arguments)
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
    name: 'lucy',
    parents: {
        father: 'john',
        mother: 'mary'
    },
    grades: [90, 96, 100],
    sayHello() {
        console.log(`my name is ${this.name}`)
    }
}

let clonePerson = console.log(deepClone(person))
console.log(clonePerson)
clonePerson.sayHello()


let fn = function (x, y) {
    return x + y
}
let cloneFn = deepClone(fn)
console.log(cloneFn(1, 2))

let arr = [[1, 2], [3, 4], [5, 6, 7]]
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


JSON.parse(JSON.stringify(obj))


var cache = [];

function deepClone(src) {

}

class DeepClone {
    constructor() {
        this.cache = []
    }

    clone(src) {
        if (src instanceof Object) {
            // 如果是已经缓存的对象直接返回
            for (var i = 0; i < this.cache.length; i++) {
                if (src == cache[i].src) {
                    return cache[i].target
                }
            }

            var target;
            if (src instanceof Array) {
                target = new Array()
            }
            if (src instanceof Function) {
                target = function () {
                    src.apply(this, arguments)
                }
            }
            if (src instanceof RegExp) {
                target = new RegExp(src.source, src.flags)
            }
            if (src instanceof Date) {
                target = new Date(src.getTime())
            }

            target = new Object()

            this.cache.push({
                src,
                target
            })

            for (let key in src) {
                if (src.hasOwnProperty(key)) {
                    target[key] = deepClone(src[key])
                }
            }


            return target
        }
        return src;
    }
}

function bind(thisContext, ...params1) {
    var fn = this;
    function resultFn(...params2) {
        return fn.call(
            this instanceof resultFn ? this : thisContext,
            ...params1,
            ...params2
        );
    }
    resultFn.prototype = fn.prototype;
    return resultFn;
}
Function.prototype.bind2 = bind;
function fn(a) {
    this.a = a
}
fn.prototype.say = function () {
    console.log(this.a)
}

var fn1 = fn.bind2({ name: 'lucy' }, x)
var obj = new fn1()
console.log(obj.a)  // x
obj.say()   //x

//test
function bind(thisContext, ...params1) {
    var fn = this;
    return function (...params2) {
        return fn.call(thisContext, ...params1, ...params2);
    }
}
Function.prototype.bind2 = bind;
function fn(a) {
    this.a = a
}
fn.prototype.say = function () {
    console.log(this.a)
}

var fn1 = fn.bind2({ name: 'lucy' }, 'x')
var obj = new fn1()
*/
/*
class Promise1 {
    resolve(result) {
        if (this.state != 'pending') return;
        this.state = 'fulfilled'
        this.callbacks.forEach((handle) => {
            if (typeof handle[0] == 'function') {
                setTimeout(() => { handle[0].call('undefined', result) }, 0)
            }
        })

    }
    reject(reason) {
        if (this.state != 'pending') return;
        this.state = 'rejected'
        this.callbacks.forEach((handle) => {
            if (typeof handle[1] == 'function') {
                setTimeout(() => { handle[1].call('undefined', reason) }, 0)
            }
        })
    }
    constructor(fn) {
        this.state = 'pending'
        this.callbacks = [];
        if (!fn || typeof fn !== 'function') {
            throw Error('构造函数需要接受一个函数')
        }
        fn(this.resolve.bind(this), this.reject.bind(this))
    }
    then(succeed, fail) {
        this.callbacks.push([succeed, fail])
    }
}

var p1 = new Promise1((resolve, reject) => {
    setTimeout(() => {
        resolve(123)
    }, 0)
})
p1.then(function (result) {
    console.log('succeed1 ')
}, function (reason) {
    console.log('fail1', reason)
})

var promise2 = p1.then(function (result) {
    console.log('succeed2 ')
    return 'ok'
}, function (reason) {
    console.log('fail2', reason)
    return 'error'
})

promise2.resolveWith(x)


var promise = new Promise((resolve, reject) => {
    setTimeout(() => { resolve('hello') }, 2000)
})
promise.then((result) => {
    console.log('success : ', result);
}, (reason) => {
    console.log('fail : ', reason);
})

loadScript("/article/promise-chaining/one.js").then(
    script1 => {
        loadScript("/article/promise-chaining/two.js").then(
            script2 => {
                loadScript("/article/promise-chaining/three.js").then(
                    script3 => {
                        // this function has access to variables script1, script2 and script3
                        one();
                        two();
                        three();
                    });
            });
    });
loadScript("/article/promise-chaining/one.js")
    .then(script => loadScript("/article/promise-chaining/two.js"))
    .then(script => loadScript("/article/promise-chaining/three.js"))
    .then(script => {
        // scripts are loaded, we can use functions declared there
        one();
        two();
        three();
    });

async function a() {
    try {
        await Promise.reject(1);
    } catch (error) {
        console.log('error is ', error);
    }
}
a()
loadJson('no-such-user.json')

Promise.allSettled([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
    new Promise((resolve, reject) => setTimeout(() => reject(2), 2000)), // 2
    new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(function (result) { console.log(result) });

const fs = require('fs');
const s = fs.createReadStream('./data');
console.log(s);

class App extends Component {
    state = {
        count: 0
    }

    componentDidMount() {
        this.setState({ count: this.state.count + 1 })
        console.log(this.state.count) // 0
    }
}

for (var i = 0; i < 10; i++) {
    (function (i) {
        setTimeout(() => {
            console.log(i);
        }, 1000)
    })(i)
}

for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000)
}

class Thenable {
    constructor(num) {
        this.num = num;
    }
    then(resolve, reject) {
        setTimeout(() => resolve(this.num * 2), 0); // (*)
    }
}

var promise = new Promise((resolve, reject) => {
    setTimeout(() => { resolve('hello') }, 2000)
})
promise.then((result) => {
    console.log('success : ', result);
}, (reason) => {
    console.log('fail : ', reason);
})

class Promise1 {
    resolve(result) {
        if (this.state != 'pending') return;
        this.state = 'fulfilled'
        setTimeout(() => {
            this.callbacks.forEach((handle) => {
                if (typeof handle[0] == 'function') {
                    try {
                        var res = handle[0].call('undefined', result);
                        handle[2].resolveWith(res)
                    } catch (error) {
                        handle[2].reject(error)
                    }
                }
            })
        }, 0)
    }
    reject(reason) {
        if (this.state != 'pending') return;
        this.state = 'rejected'
        setTimeout(() => {
            this.callbacks.forEach((handle) => {
                if (typeof handle[1] == 'function') {
                    try {
                        var res = handle[1].call('undefined', result);
                        handle[2].resolveWith(res)
                    } catch (error) {
                        handle[2].reject(error)
                    }
                }
            })
        }, 0)
    }
    constructor(fn) {
        this.state = 'pending'
        this.callbacks = [];
        if (!fn || typeof fn !== 'function') {
            throw Error('构造函数需要接受一个函数')
        }
        fn(this.resolve.bind(this), this.reject.bind(this))
    }
    then(succeed, fail) {
        var p = new Promise1(() => { })
        this.callbacks.push([succeed, fail, p])
        return p;
    }
    resolveWith(result) {
        if (this === result) {
            this.reject(new TypeError('then的handler返回值异常'))
        } else if (result instanceof Promise1) {
            result.then((res) => {
                this.resolve(res);
            }, (error) => {
                this.reject(error);
            })
        } else if (result instanceof Object) {
            if (result.then instanceof Function) {
                result.then((res) => {
                    this.resolve(res);
                }, (err) => {
                    this.reject(err);
                })
            } else {
                this.resolve(result);
            }
        } else {
            this.resolve(result);
        }
    }
}

var p1 = new Promise1((resolve, reject) => {
    setTimeout(() => {
        resolve(123)
    }, 0)
})
var thenobj = new Thenable(10);
p1.then(result => thenobj, reason => {
    console.log('fail1 ', reason)
}).then((result) => {
    console.log('result is ', result)
})
*/
class Promise1 {
    constructor(fn) {
        this.state = 'pending'
        this.callbacks = []
        if (!fn || typeof fn !== 'Function') {
            throw new Error('promise的构造必须接受一个函数')
        }
        fn(this.resolve.bind(this), this.reject.bind(this))
    }
    then(succeed, fail) {
        /*  then方法也会返回一个promise,且会将第一个promise回调函数(succeed / fail)的返回值作为参数，
         *  传给返回的promise then方法里面的回调函数。由于第一个promise then方法里的(succeed / fail)是在resolve
         *   函数里面执行的，所以返回值也只能在那里获取到，因此我们需要将这个新返回的promise 塞到callbacks里面，
        */

        let p = new Promise1(() => { })
        this.callbacks.push([succeed, fail, p])
        return p
    }
    resolve(value) {
        // 避免调用多次resolve reject
        if (this.state == 'pending') {
            /* 
             * 1. 这里要用setTimeout的原因是：resolve函数可能会先于实例的then方法执行，
             * 此时若不用setTimeout包裹， 会导致[succeed, fail]还没有放到callbacks里面，
             * 就要去执行它们。
             * 2. setTimeout第一个参数要使用箭头函数，否则this会指向window
             * 3. onFulfilled 和 onRejected 必须被作为函数调用（即没有 this 值）
            */
            this.state = 'fulfilled';
            setTimeout(() => {
                this.callbacks.forEach((handle) => {
                    if (typeof handle[0] == 'function') {
                        /* 1. 在这里我们需要拿到前一个promise.then回调函数返回的结果，并根据结果决定
                         * 如何处理后一个promise。
                         * 2. 如果在前一个promise.then方法抛出错误，则后一个promise立即reject
                        */
                        try {
                            let result = handle[0].call(undefined, value)
                            handle[2].resolveWith(result)
                        } catch (e) {
                            handle[2].reject(e)
                        }
                    }
                })
            }, 0)
        }
    }
    reject(reason) {
        if (this.state == 'pending') {
            this.state = 'rejected';
            setTimeout(() => {
                this.callbacks.forEach((handle) => {
                    if (typeof handle[1] == 'function') {
                        try {
                            let result = handle[1].call(undefined, reason)
                            handle[2].resolveWith(result)
                        } catch (e) {
                            handle[2].reject(e)
                        }
                    }
                })
            }, 0)
        }
    }

    resolveWith(result) {
        if (result == this) {
            // 后一个promise实例本身，会造成环引用，抛出异常。
            this.reject(new Error('循环引用'))
        } else if (result instanceof Promise1) {
            // 新的promise实例，则会根据该实例，决定返回promise的状态
            result.then((value) => {
                this.resolve(value)
            }, (reason) => {
                this.reject(reason)
            })
        } else if (result instanceof Object) {
            if (result.then && result.then instanceof Function) {
                // thenable对象，执行其then函数，并根据then函数的执行情况决定返回promise的状态
                result.then((value) => {
                    this.resolve(value)
                }, (reason) => {
                    this.reject(reason)
                })
            } else {
                // 普通对象，返回的promise直接resolve
                this.resolve(result)
            }
        } else {
            // 普通值，返回的promise直接resolve
            this.resolve(result)
        }
    }
}
/*
Promise.all = function (promises) {
    if (!Array.isArray(promises)) {
        throw new Error('参数必须是数组')
    }
    let result = [];
    let count = 0;
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then(value => {
                result[i] = value
                count++
                if (count == promises.length) {
                    resolve(result)
                }
            }, reason => {
                reject(reason)
            })
        }
    })
};

Promise.race = function (promises) {
    if (!Array.isArray(promises)) {
        throw new Error('参数必须是数组')
    }
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then(value => {
                resolve(value)
            }, reason => {
                reject(reason)
            })
        }
    })
};

Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        resolve(value)
    })
}
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason)
    })
} */

function deepTraverse(node) {
    if (node == null) {
        return []
    }
    let stack = [];
    let nodeList = [];
    stack.push(node)
    while (stack.length) {
        let item = stack.pop();
        let children = item.children;
        nodeList.push(item);
        for (let i = children.length - 1; i >= 0; i--) {
            stack.push(children[i])
        }
    }
    return nodeList
}

let deepTraversal3 = (node) => {
    let stack = []
    let nodes = []
    if (node) {
        // 推入当前处理的node
        stack.push(node)
        while (stack.length) {
            let item = stack.pop()
            let children = item.children
            nodes.push(item)
            for (let i = children.length - 1; i >= 0; i--) {
                stack.push(children[i])
            }
        }
    }
    return nodes
}

function breadTraverse(node) {
    if (node == null) {
        return []
    }
    let queue = [];
    let nodeList = [];
    queue.push(node)
    while (queue.length) {
        let item = queue.shift();
        let children = item.children;
        nodeList.push(item);
        for (let i = 0; i < children.length; i++) {
            queue.push(children[i])
        }
    }
    return nodeList
}
let widthTraversal2 = (node) => {
    let nodes = []
    let stack = []
    if (node) {
        stack.push(node)
        while (stack.length) {
            let item = stack.shift()
            let children = item.children
            nodes.push(item)
            for (let i = 0; i < children.length; i++) {
                stack.push(children[i])
            }
        }
    }
    return nodes
}