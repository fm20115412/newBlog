### 1. 安装依赖
```
npm i -D style-loader css-loader sass-loader node-sass
```
### 2. 配置loader
{
    test: /\.scss$/,
    use: [
        "style-loader", // 将 JS 字符串生成为 style 节点
        "css-loader", // 将 CSS 转化成 CommonJS 模块
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