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
/*
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
*/
/*
function sleep(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, delay)
    })
}
sleep(1000).then(() => {
    // your code
})

async function sleep(delay) {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, delay)
    })
    // your code
}

function sleep(delay, callback) {
    setTimeout(callback, delay)
}

//Generator
function* sleepGenerator(time) {
    yield new Promise(function (resolve, reject) {
        setTimeout(resolve, time);
    })
}
sleepGenerator(1000).next().value.then(() => {
    // your code
})


Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
    );
};

Promise.resolve('foo').
    finally(() => 'bar').
    then(res => console.log(res));

Promise.resolve(1).then(value => value)

Promise.prototype.finally = function (callback) {
    // this指向调用finally的promise实例
    // this.constructor 指向promise构造函数
    let P = this.constructor
    return this.then(
        value => P.resolve(callback()).then(() => value),
        error => P.resolve(callback()).then(() => { throw error })
    )


}




function fn() {
    console.log('haha');
    return 2;
}
let p1 = Promise.resolve(1)

let p2 = p1.then(value => {
    return Promise.resolve(fn()).then(() => value)
}, reason => {
    return Promise.resolve(fn()).then(() => { throw reason })
})

p2.catch(reason => console.log('reason is ', reason))




Promise.all = function (arr) {
    if (!Array.isArray(arr)) {
        return Promise.reject(new Error('arr is not iterable'))
    }
    return new Promise(function (resolve, reject) {
        let result = [];
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            Promise.resolve(arr[i]).then(
                function (value) {
                    result[i] = value
                    count++;
                    if (count == arr.length) {
                        resolve(result)
                    }
                }, function (error) {
                    reject(error)
                })
        }
    })
}


Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            reject(new TypeError("argument must be anarray"))
        }
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then(value => {
                resolve(result)
            }, reason => {
                reject(reason)
            })
        }
    })
}
*/
/*
function dfs() {
    let marked = [];
    for (let i = 0; i < this.vertices.length; i++) {
        if (!marked[this.vertices[i]]) {
            dfsVisit(this.vertices[i])
        }
    }
    function dfsVisit(v) {
        marked.push(v)
        let neighbors = this.edges.get(v)
        for (let j = 0; j < neighbors.length; j++) {
            if (!marked[neighbors[j]]) {
                dfsVisit(neighbors[j])
            }
        }
    }
}

function bfs(v) {
    let queue = [], marked = [];
    queue.push(v)
    while (queue.length > 0) {
        let current = queue.shift();
        marked.push(current)
        let neighbors = this.edges.get(current)
        for (let i = 0; i < neighbors.length; i++) {
            if (!marked[neighbors[i]]) {
                queue.push(neighbors[i])
            }
        }
    }
}

Graph.prototype.bfs = function (v) {
    var queue = [], marked = []
    marked[v] = true
    queue.push(v) // 添加到队尾
    while (queue.length > 0) {
        var s = queue.shift() // 从队首移除
        if (this.edges.has(s)) {
            console.log('visited vertex: ', s)
        }
        let neighbors = this.edges.get(s)
        for (let i = 0; i < neighbors.length; i++) {
            var w = neighbors[i]
            if (!marked[w]) {
                marked[w] = true
                queue.push(w)
            }
        }
    }
}


// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
    this.left = left;
    this.label = label;
    this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
    if (t) {
        yield* inorder(t.left);
        yield t.label;
        yield* inorder(t.right);
    }
}

// 下面生成二叉树
function make(array) {
    // 判断是否为叶节点
    if (array.length == 1) return new Tree(null, array[0], null);
    return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
    result.push(node);
}
*/

function insertSort(nums) {
    let len = nums.length;
    for (let i = 1; i < len; i++) {
        let current = nums[i];
        let j = i - 1;
        while (j >= 0 && current < nums[j]) {
            nums[j + 1] = nums[j];
            j--;
        }
        nums[j + 1] = current
    }
    return nums;
}

function bubbleSort(nums) {
    let len = nums.length;
    for (let i = 0; i < len - 1; i++) {
        let isSorted = true;
        for (let j = 1; j < (len - i); j++) {
            if (nums[j - 1] > nums[j]) {
                let temp = nums[j - 1];
                nums[j - 1] = nums[j];
                nums[j] = temp;
                isSorted = false;
            }
        }
        if (isSorted) {
            break;
        }
    }
    return nums
}

function mergeSort(nums) {
    if (nums.length == 1) {
        return nums;
    }
    let middle = Math.floor(nums.length / 2);
    let left = mergeSort(nums.slice(0, middle));
    let right = mergeSort(nums.slice(middle));
    return merge(left, right);
}
function merge(left, right) {
    let result = [];
    let i = 0, j = 0, index = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result[index++] = left[i++];
        } else {
            result[index++] = right[j++];
        }
    }
    while (i < left.length) {
        result[index++] = left[i++];
    }
    while (j < right.length) {
        result[index++] = right[j++];
    }
    return result;
}





quickSort([4, 2, 6, 3, 8, 7], 0, 5);
function quickSort(nums, begin, end) {
    if (begin >= end) {
        return;
    }
    let pivot = partition(nums, begin, end)
    quickSort(nums, begin, pivot - 1);
    quickSort(nums, pivot + 1, end)
}
function partition(nums, begin, end) {
    let value = nums[begin]
    while (begin < end) {
        while (begin < end && nums[end] >= value) {
            end--;
        }
        nums[begin] = nums[end]
        while (begin < end && nums[begin] <= value) {
            begin++;
        }
        nums[end] = nums[begin]
    }
    nums[begin] = value;
    return begin;
}

export const fetchWeather = (cityCode) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'weather_fetch_started'
        })
    }
}



class DeepClone {

    constructor() {
        this.cache = []
    }

    clone(src) {
        if (src instanceof Object) {
            // 如果是已经缓存的对象直接返回
            for (var i = 0; i < this.cache.length; i++) {
                if (src == this.cache[i].src) {
                    return this.cache[i].target
                }
            }

            var target = new Object()

            if (src instanceof Array) {
                target = new Array()
            }

            if (src instanceof Function) {
                target = function () {
                    return src.apply(this, arguments)
                }
            }

            if (src instanceof RegExp) {
                target = new RegExp(src.source, src.flags)
            }

            if (src instanceof Date) {
                target = new Date(src)
            }

            this.cache.push({
                src,
                target
            })

            for (let key in src) {
                if (src.hasOwnProperty(key)) {
                    target[key] = this.clone(src[key])
                }
            }
            return target
        }
        return src;
    }
}

var cloner = new DeepClone()
var a = {
    arr: [1, 2, 3, { key: '123' }],//数组测试
};
a.self = a;//循环引用测试
a.common1 = { name: 'bbb' };
a.common2 = a.common1;//相同引用测试

aa = cloner.clone(a)
aa.common1.name = 'ccc'
console.log('aa is ', aa)

class DeepClone {

    constructor() {
        this.cache = []
    }

    clone(src) {
        if (src instanceof Object) {
            // 如果是已经缓存的对象直接返回
            for (var i = 0; i < this.cache.length; i++) {
                if (src == this.cache[i].src) {
                    return this.cache[i].target
                }
            }

            var target = new Object()

            if (src instanceof Array) {
                target = new Array()
            }

            if (src instanceof Function) {
                target = function () {
                    return src.apply(this, arguments)
                }
            }

            if (src instanceof RegExp) {
                target = new RegExp(src.source, src.flags)
            }

            if (src instanceof Date) {
                target = new Date(src)
            }

            this.cache.push({
                src,
                target
            })

            for (let key in src) {
                if (src.hasOwnProperty(key)) {
                    target[key] = this.clone(src[key])
                }
            }
            return target
        }
        return src;
    }
}

var cloner = new DeepClone()
var a = {
    arr: [1, 2, 3, { key: '123' }],//数组测试
};
a.self = a;//循环引用测试
a.common1 = { name: 'bbb' };
a.common2 = a.common1;//相同引用测试

aa = cloner.clone(a)
aa.common1.name = 'ccc'
console.log('aa is ', aa)


class clone {
    constructor() {
        this.cache = [];
    }
    cloner(src) {
        if (src instanceof Object) {
            // 同一引用
            for (let i = 0; i < this.cache.length; i++) {
                if (src == this.cache[i].src) {
                    return this.cache[i].target
                }
            }
            let target = {}
            // 数组
            if (src instanceof Array) {
                target = [];
            }
            // 函数
            if (src instanceof Function) {
                target = function () {
                    return src.apply(this, arguments)
                }
            }
            // 正则
            if (src instanceof RegExp) {
                target = new RegExp(src.source, src.flags)
            }
            // date
            if (src instanceof Date) {
                target = new Date(src);
            }
            this.cache.push({
                src,
                target
            })
            for (let key in src) {
                if (src.hasOwnProperty(key)) {
                    target[key] = this.cloner(src[key])
                }
            }
            return target
        }
        return src;
    }
}


function throttle(fn,delay){
    var last=0,now,context,args,timer;
    return function(){
        context = this;
        args = arguments;
        now = +new Date();
        if (now - last > delay){
            if(timer){
                clearTimeout(timer);
                timer = null;
            }
            last = now
            fn.apply(context,arguments);
        } else if(!timer){
            timer = setTimeout(function(){
                last = +new Date();
                timer = null;
                fn.apply(context, arguments);
            },delay)
        }
    }
}

function fn(a){
    for (var i = 0; i < a.length; i++) {
        if (a[i] == 3) {
            return 'done'
        }
        console.log(a[i])
    }
}
