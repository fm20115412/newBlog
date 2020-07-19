[TOC]

## 概念：
**Hot Module Replacement ：**（以下简称 HMR）是 webpack 发展至今引入的最令人兴奋的特性之一 ，当你对代码进行修改并保存后，webpack 将对代码重新打包，并将新的模块发送到浏览器端，浏览器通过新的模块替换老的模块，这样在不刷新浏览器的前提下就能够对应用进行更新。例如，在开发 Web 页面过程中，当你点击按钮，出现一个弹窗的时候，发现弹窗标题没有对齐，这时候你修改 CSS 样式，然后保存，在浏览器没有刷新的前提下，标题样式发生了改变。感觉就像在 Chrome 的开发者工具中直接修改元素样式一样。

## 配置
- 在启动时带上--hot参数 ，`webpack-dev-server --hot`
- 使用`HotModuleReplacementPlugin`插件
```
const webpack = require('webpack');
module.exports = {
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        hot: true,
        watchOptions: {
            ignored: /node_modules/,
            aggregateTimeout: 200,
            poll: 500
        }
    }
}
```
## 原理
webpack-dev-server 主要包含了四个部分：

- webpack: 负责编译代码
- webpack-dev-middleware: 主要负责构建内存文件系统，把webpack的 OutputFileSystem 替换成 InMemoryFileSystem。同时作为Express的中间件拦截请求，从内存文件系统中把结果拿出来。
- express：负责搭建请求路由服务。
- websocket：建立本地服务和浏览器的双向通信。这样就可以实现当本地文件发生变化，立马告知浏览器可以热更新代码啦！

**工作流程:**
- 启动webpack-dev-server，webpack开始构建，在编译期间会向 entry 文件注入热更新代码；
- Client 首次打开后，Server 和 Client 基于Socket建立通讯渠道；
- 修改文件，Server 端监听文件发送变动，webpack开始编译，直到编译完成会触发"Done"事件；
- Server通过socket 发送消息告知 Client；
- Client根据Server的消息（hash值和state状态），通过ajax请求获取 Server 的manifest描述文件；
- Client对比当前 modules tree ，再次发请求到 Server 端获取新的JS模块；
- Client获取到新的JS模块后，会更新 modules tree并替换掉现有的模块；
- 最后调用 module.hot.accept() 完成热更新；