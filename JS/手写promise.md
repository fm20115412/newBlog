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
class Thenable {
    constructor(num) {
        this.num = num;
    }
    then(resolve, reject) {
        setTimeout(() => resolve(this.num * 2), 0); // (*)
    }
}

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
```
