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

function add(a,b,c,d){
    return a+b+c+d
}
function add(a, b){
    return a+b
}

function curry(fn,...args){
    if (args.length == fn.length){
        return fn(...args)
    }else{
        return function(...args2){
            return curry(fn,...args,...args2)
        }
    }
}
addTen = curry(add,10)
console.log(a1 = addTen(1))
console.log(a2 = addTen(2))
console.log(a3 = addTen(3))
console.log(a4 = addTen(4))