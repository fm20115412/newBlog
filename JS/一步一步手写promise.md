### 1. promise的简单使用
```
var promise = new Promise((resolve, reject) => {
    setTimeout(() => { resolve('hello') }, 2000)
})
promise.then((result) => {
    console.log('success : ', result);
}, (reason) => {
    console.log('fail : ', reason);
})
```

### 2. 写之前需要明确的点：
```
1. Promise是一个类，其构造函数必须接受一个函数，该函数会立刻执行，且构造函数的两个参数都需要是函数(resolve,reject)；异步任务成功执行resolve(result)，异步失败执行reject(error);
2. Promise实例有一个状态，初始化为'pengding'，当异步任务成功时，状态变为'fulfilled',任务失败时，状态变为'rejected'；
3. Promise实例有一个方法then,它接受两个函数作为参数，异步任务成功时执行第一个函数，并把结果作为参数传给第一个函数，异步任务失败时执行第二个函数，并把失败的error作为参数传给第二个函数。
4. Promise实例可以多次执行then方法，then方法里的函数将按照定义的顺序执行。
```

### 3. 一步一步手写promise
用 😁😁😁😁😁😁标识每一个步骤的改动点
a. promise是一个类
```
class Promise1{

}
```
b. promise的构造函数必须接受一个函数fn作为参数
```
class Promise1 {
    constructor(fn) {
        if (!fn || typeof fn !== 'function') {
            throw new Error('promise的构造必须接受一个函数')
        }
    }
}
```
c. fn是立即执行的，且接受两个函数resolve和reject作为参数
```
class Promise1 {
    constructor(fn) {
        if (!fn || typeof fn !== 'function') {
            throw new Error('promise的构造必须接受一个函数')
        }
        // 😁😁😁😁😁😁
        fn(resolve,reject)
    }
}
```
d. 每个promise实例都有一个初始状态('pending')，和状态完成('fulfilled / rejected')时要调用的函数列表
```
class Promise1 {
    constructor(fn) {
        // 😁😁😁😁😁😁
        this.state = 'pending'
        this.callbacks = []
        if (!fn || typeof fn !== 'function') {
            throw new Error('promise的构造必须接受一个函数')
        }
        fn(resolve,reject)
    }
}
```
e. new Promise(fn)会生成一个Promise实例，实例上有then方法，then方法接受两个函数作为参数，第一个是当Promise的状态变为fulfilled 时要调用的函数，第二个是Promise的状态变为rejected 时要调用的函数。then会将这两个函数分别放在Promise成功时/失败时对应的函数列表里，等待执行。
```
class Promise1 {
    constructor(fn) {
        this.state = 'pending'
        this.callbacks = []
        if (!fn || typeof fn !== 'function') {
            throw new Error('promise的构造必须接受一个函数')
        }
        fn(resolve, reject)
    }
    // 😁😁😁😁😁😁
    then(succeed, fail) {
        this.callbacks.push([succeed, fail])
    }
}
```
f.接下来实现resolve和reject方法
```
class Promise1 {
    constructor(fn) {
        this.state = 'pending'
        this.callbacks = []
        if (!fn || typeof fn !== 'function') {
            throw new Error('promise的构造必须接受一个函数')
        }
        // this.resolve函数需要绑定this
        fn(this.resolve.bind(this), this.reject.bind(this))
    }
    then(succeed, fail) {
        this.callbacks.push([succeed, fail])
    }
    
    // 😁😁😁😁😁😁
    resolve(value) {
        // 避免调用多次resolve reject
        if (this.state == 'pending') {
            /* 
             * 1. 这里要用setTimeout的原因是：resolve函数可能会先于实例的then方法执行，
             * 此时若不用setTimeout包裹， 会导致[succeed, fail]还没有放到callbacks里面，
             * 就要去执行它们。
             * 2. setTimeout第一个参数要使用箭头函数，否则this会指向window
             * 3. succeed 和 fail 必须被作为函数调用（即没有 this 值）
            */
            this.state = 'fulfilled';
            setTimeout(() => {
                this.callbacks.forEach((handle) => {
                    if (typeof handle[0] == 'function') {
                        handle[0].call(undefined, value)
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
                        handle[1].call(undefined, reason)
                    }
                })
            }, 0)
        }
    }
}
```
OK，上面已经是一个promise的简单实现版本
- 实现了Promise状态的切换
- 实现了then方法根据promise的状态执行对应的回调函数
- 实现了一个 promise 上可以多次添加then方法

✨ 接下来，我们来实现promise的链式调用

g. then方法也要返回一个promise，并且我们要拿到前一个promise.then回调函数中返回的值，来决定如何处理后一个promise。
```
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});
```
> then方法返回的是一个新的Promise实例,上面的代码使用then方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。
```
class Promise1 {
    constructor(fn) {
        this.state = 'pending'
        this.callbacks = []
        if (!fn || typeof fn !== 'Function') {
            throw new Error('promise的构造必须接受一个函数')
        }
        // 这里要记得给resolve 和 reject 函数绑定this
        fn(this.resolve.bind(this), this.reject.bind(this))
    }
    then(succeed, fail) {
        // 😁😁😁😁😁😁
        /*  then方法也会返回一个promise,且会将第一个promise回调函数(succeed / fail)的返回值作为参数，
         *  传给返回的promise then方法里面的回调函数。由于第一个promise then方法里的(succeed / fail)resolve
         *  函数里面执行的，所以返回值也只能在那里获取到，因此我们需要将这个新返回的promise 塞到callbacks里面，
        */
        let p = new Promise1(() => { })
        this.callbacks.push([succeed, fail, p])
        return p;
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
                        // 😁😁😁😁😁😁
                        /* 1. 在这里我们需要拿到前一个promise.then回调函数返回的结果，并根据结果决定
                         * 如何处理后一个promise，因此需要新增函数resolveWith。
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
                        // 😁😁😁😁😁😁
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
}
```
h. 实现resolveWith方法，其参数可能是以下值：
- 后一个promise实例本身
- 新的promise实例
- thenable对象
- 普通对象
- 普通值
```
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
    // 😁😁😁😁😁😁
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
```
到这里手写promise，已经算是基本完成了，总结一下，我们实现了如下功能：
- 实现了Promise状态的切换
- 实现了then方法根据promise的状态执行对应的回调函数
- 实现了一个 promise 上可以多次添加then方法
- 实现了promise的链式调用。

### 4. 测试一下我们的promise
a. then方法可以挂载多个then方法
```
let p1 = new Promise1((resolve,reject)=>{
    setTimeout(()=>{
        resolve(2)
    },1000)
})

p1.then((value)=>{
    console.log('success : ', value);  //success :  2
},(reason)=>{
    console.log('fail : ', reason);
})

p1.then((value)=>{
    console.log('success : ', value);   // success :  2
},(reason)=>{
    console.log('fail : ', reason);
})
```
b. then方法的链式调用, then的回调函数返回普通对象
```
let p1 = new Promise1((resolve,reject)=>{
    setTimeout(()=>{
        resolve(2)
    },1000)
})

p1.then((value)=>{
    console.log('success : ', value);  // success :  2
    return {
        name:'hello word'
    }
},(reason)=>{
    console.log('fail : ', reason);  
}).then((obj)=>{
    console.log('obj ', obj);   // obj : {name : 'hello world'}
})
```
c. then方法的链式调用，then的回调函数返回一个新的promise
```
let p1 = new Promise1((resolve,reject)=>{
    setTimeout(()=>{
        resolve(2)
    },1000)
})

let p2 = new Promise1((resolve,reject)=>{
    setTimeout(()=>{
        reject(1)
    },1000)
})
p1.then((value)=>{
    console.log('success : ', value);    // success :  2
    return p2
},(reason)=>{
    console.log('fail : ', reason);
}).then((value)=>{
    console.log('obj is ', value);
},(reason)=>{
    console.log('fail : ', reason);    // fail :  1
})
```
d. then方法的链式调用，then的回调函数返回一个thenable对象
```
class Thenable {
    constructor(num) {
        this.num = num;
    }
    then(resolve, reject) {
        setTimeout(() => resolve(this.num * 2), 0); // (*)
    }
}
let thenobj = new Thenable(10);

let p1 = new Promise1((resolve,reject)=>{
    setTimeout(()=>{
        resolve(2)
    },1000)
})

p1.then(result => thenobj, reason => {
    console.log('fail1 ', reason)
}).then((result) => {
    console.log('result is ', result)   // result is 20
})
```
### 5. 实现Promise的静态方法
a. Promise.resolve
```
Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        resolve(value)
    })
}
```
b. Promise.reject
```
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason)
    })
}
```
c. Promise.all
```
Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            reject(new TypeError("argument must be anarray"))
        }
        let result = [];
        let count = 0;
        for (let i = 0; i < promises.length; i++) {
            /* 1. 数组中的每个item并不一定是promise对象，用Promise.resolve(item)将item转化为promise对象
             * 2. promise是异步执行的，返回是无序的，如果第3个参数先返回值了，则先往result的第3位塞值：
             * result[2] = res，result的第1位、第2位都是空，result的长度还是为3，直接判断
             * result.length === promises.length就会有问题。
            */
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
```
d. Promise.allSettled
```javascript
Promise.allSettled = Promise.allSettled || function(promises) {
    return new Promise(function(resolve, reject) {
        if (!Array.isArray(promises)) {
            return reject(
                new TypeError("arguments must be an array")
            );
        }
        let count = 0;
        const len = promises.length;
        // 统计所有的promise结果并最后返回
        const result = new Array(len);
        for (let i = 0; i < len; i++) {
            Promise.resolve(promises[i]).then(
                function(value) {
                    count++;
                    result[i] = {
                        status:'fullfilled',
                        value
                    };
                    if (count == len) {
                        return resolve(result);
                    }
                },
                function(reason) {
                    count++;
                    result[i] = {
                        status:'rejected',
                        reason
                    };
                    if (count == len) {
                        return resolve(result);
                    }
                }
            );
        }
    });
};
```
e. Promise.race
```
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
};
```
f. Promise.finally
finally的特点如下：
1. 接受一个回调函数作为参数；
2. 该回调函数不接收任何参数，原来的value或者Error在finally的回调函数获取不到；
3. 回调函数的执行不影响原Promise的状态；
4. finally() 会返回一个 Promise，所以你可以使用 .then() / .catch() / .finally() 串联它的返回值。finally() 返回的 Promise 会和它连接到的 Promise 保持相同的 fulfill 条件。

```
Promise.resolve('foo').
    finally(() => 'bar').
    then(res => console.log(res));  //打印foo
```

实现：
```
Promise.prototype.finally = function (callback) {
    // this指向调用finally的promise实例
    // this.constructor 指向promise构造函数
    let P = this.constructor
    return this.then(
        /* P.resolve(callback()),会先执行callback函数，然后再返回一个resolved的promise，假设为p1
         * p1.then()也会返回一个promise对象，且以回调函数返回值决定新的promise的状态
        */
        value => P.resolve(callback()).then(() => value),
        error => P.resolve(callback()).then(() => { throw error })
    )

    //等价于
    let p = this.then(function (value) {
        let p1 = P.resolve(callback())
        let p2 = p1.then(() => value)
        return p2;
    }, function (error) {
        let p1 = P.resolve(callback())
        let p2 = p1.then(() => { throw error })
        return p2;
    })
    return p;
}
```