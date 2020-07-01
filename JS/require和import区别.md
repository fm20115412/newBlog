# import 和 require的区别：

### require 
1. CommonJS中定义的，应用于服务端。require命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象。
2. 代码
```
// 导出模块
module.exports = {
    foo: function () {},
    bar: 'a'
}

// 加载模块
var dep = require('dep')
console.log(dep.bar)
dep.foo()
```
2. 特点
- 模块的加载是运行时同步加载的
- 所有代码都运行在模块作用域，不会污染全局作用域。
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
- 模块加载的顺序，按照其在代码中出现的顺序。

### import
```
/** 定义模块 math.js **/
var basicNum = 0;
var add = function (a, b) {
    return a + b;
};
export { basicNum, add };
/** 引用模块 **/
import { basicNum, add } from './math';
function test(ele) {
    ele.textContent = add(99 + basicNum);
}
```

### CommonJS 和 ES6模块 的区别
① CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。

② CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
## 参考
![前端模块化详解(完整版)](https://juejin.im/post/5c17ad756fb9a049ff4e0a62#heading-24)