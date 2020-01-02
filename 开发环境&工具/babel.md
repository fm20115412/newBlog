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

重要的时，preset 的顺序是 颠倒的。如下设置：
```
{
  "presets": ["es2015", "react", "stage-2"]
}
```
将按如下顺序执行：`stage-2`、`react` 然后是 `es2015`。

### 参考文献
[How to use ES6 with Babel and webpack](https://blog.jakoblind.no/babel-webpack-es6/)
[What is babel-preset-env and why do I need it?](https://blog.jakoblind.no/babel-preset-env/)
[babel-preset-env使用指南](https://www.cnblogs.com/chyingp/p/understanding-babel-preset-env.html)

