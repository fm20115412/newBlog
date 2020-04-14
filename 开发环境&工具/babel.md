### Babel是什么
Babel 是一个广泛使用的转码器，可以将高级语法的JavaScript（如ES8,ES7,ES6）代码转为ES5代码，从而在现有环境执行。这意味着，你可以用高级的的方式编写程序，又不用担心现有环境是否支持。
### Plugins
To make Babel actually do something, we need to add a plugin. It’s the plugins that does the heavy lifting. Each plugin is it’s own NPM library.
比如你的代码里面使用到了箭头函数，那么你就需要使用 @babel/plugin-transform-arrow-functions这个插件来转码。
```
npm install --save-dev @babel/plugin-transform-arrow-functions

// index.js
const hello = () => console.log("hello world!");

// .babelrc
{
    "plugins": [
        "@babel/plugin-transform-arrow-functions"
    ]
}

转码之后:
// output.js
const hello = function () {
  return console.log("hello world!");
};
```
### Presets
If you just want babel to transpile specific features you can specify them with plugins property because there are separate plugins like arrow function, classes, instanceof etc & many more. But defining plugins this way is not a great idea because you want all the features of ES6 to be transpiled so instead of specifying all the plugins in plugins property babel has something called presets. There are many presets. One of them is ES2015. 

**Presets are just a simple collection of babel plugins.**
**Presets are just a simple collection of babel plugins.**
**Presets are just a simple collection of babel plugins.**

比如我们需要将es6的所有新特性都转为es5，我们可以安装`@babel/preset-es2015`
```
npm install –-save-dev @babel/preset-es2015

// .babelrc
{
    "presets": [
        "@babel/preset-es2015"
    ]
}
```
常用的presets有如下：
`@babel/preset-env`: 根据开发者的配置，按需加载插件。
`@babel/preset-react` : 转码react语法。

### 插件执行顺序
如果两个转换插件都将处理“程序（Program）”的某个代码片段，则将根据转换插件或 preset 的排列顺序依次执行。

- 插件在 Presets 前运行。
- 插件顺序从前往后排列。
- Preset 顺序是颠倒的（从后往前）。
例如：
```
{
  "plugins": ["transform-decorators-legacy", "transform-class-properties"]
}
```
先执行`transform-decorators-legacy`，在执行`transform-class-properties`。

重要的是，preset 的顺序是 颠倒的。如下设置：
```
{
  "presets": ["es2015", "react", "stage-2"]
}
```
将按如下顺序执行：`stage-2`、`react` 然后是 `es2015`。

### 配置方式
我们需要一个配置文件来告诉babel如何工作，要怎么去编译，编译哪些内容，配置文件的方式有以下几种：
- 在package.json中设置babel字段。
这种方式不用创建文件，package.json加入babel的配置信息就行。
```
//package.json
{
   "name":"babel-test",
   "version":"1.0.0",
   "devDependencies": {
       "@babel/core":"^7.4.5",
       "@babel/cli":"^7.4.4",
       "@babel/preset-env":"^7.4.5"
   }
   "babel": {
       "presets": ["@babel/preset-env"]
   }
}
```
- .babelrc文件或.babelrc.js

.babelrc和.babelrc.js是同一种配置方式，只是文件格式不同，一个是json文件，一个是js文件。这两个配置文件是针对文件夹的，即该配置文件所在的文件夹包括子文件夹都会应用此配置文件的设置，而且下层配置文件会覆盖上层配置文件，通过此种方式可以给不同的目录设置不同的规则。
```
// .babelrc
{
    "presets": ["@babel/preset-env"]
}

// .babelrc.js
module.exports = {
    presets: ['@babel/preset-env']
};
```
- babel.config.js文件

babel.config.js虽然写法和.babelrc.js一样，但是babel.config.js是针对整个项目，一个项目只有一个，且放在项目根目录。

> 注意1：.babelrc文件放置在项目根目录和babel.config.js效果一致，如果两种类型的配置文件都存在，.babelrc会覆盖babel.config.js的配置。

> 注意2：在package.json里面写配置还是创建配置文件都没有什么区别，看个人习惯。


### 参考文献
[How to use ES6 with Babel and webpack](https://blog.jakoblind.no/babel-webpack-es6/)
[What is babel-preset-env and why do I need it?](https://blog.jakoblind.no/babel-preset-env/)
[babel-preset-env使用指南](https://www.cnblogs.com/chyingp/p/understanding-babel-preset-env.html)
[Babel快速上手使用指南](https://juejin.im/post/5cf45f9f5188254032204df1#heading-8)

