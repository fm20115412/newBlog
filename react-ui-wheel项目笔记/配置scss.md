### 1. 安装依赖
```
npm i -D style-loader css-loader sass-loader node-sass
```
### 2. 配置loader
{
    test: /\.scss$/,
    use: [
        "style-loader", // 将 JS 字符串生成为 style 节点
        "css-loader", // 将 CSS 转化成 JS字符串
        "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
    ]
}
### 3. 使用scss样式文件
```
// a.scss
.App {
    text-align: center;
    &-logo {
        animation: App-logo-spin infinite 20s linear;
        height: 40vmin;
    }
}
```
在需要用到这个样式文件的地方引入即可
```
import 'a.scss'
```
### 4. .sass和.scss文件区别
Sass 支持两种不同的语法:
- Sass,一种缩进语法
- SCSS,一种 CSS-like 语法

最初Sass的语法用.sass作为文件扩展名，使用缩进来分隔代码块，使用换行符来分隔规则，没有大括号和分号，类似下面这样：
```
#sidebar
  width: 30%
  background-color: #faa
```
有些人非常不喜欢这种语法格式，所以在Sass 3.0中开发者将核心语法改成了.scss。SCSS 是 Sass 3 引入新的语法，并且继承了 Sass 的强大功能，在与 CSS写法完全相同的基础上，还同时兼具了Sass的所有特性。
```
#sidebar {
  width: 30%;
  background-color: #faa;
}
```
目前两种方式都可以使用，选择哪一种语法取决于你和你的团队。