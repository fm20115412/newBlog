### 1. 简单版本
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

写之前需要明确的点：
```
1. Promise是一个类，其构造函数必须接受一个函数，该函数会立刻执行，且构造函数的两个参数都需要是函数(resolve,reject)；异步任务成功执行resolve(result)，异步失败执行reject(error);
2. Promise实例有一个状态，初始化为'pengding'，当异步任务成功时，状态变为'fulfilled',任务失败时，状态变为'rejected'；
3. Promise实例有一个方法then,它接受两个函数作为参数，异步任务成功时执行第一个函数，并把结果作为参数传给第一个函数，异步任务失败时执行第二个函数，并把失败的error作为参数传给第二个函数。
4. Promise实例可以多次执行then方法，then方法里的函数将按照定义的顺序执行。
```

```
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
```
