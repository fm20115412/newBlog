### 优化点：体积和打包速度
体积分析：webpack-bundle-analyzer
速度分析：speed-measure-webpack-plugin

### 优化打包速度
1. 使用高版本的node和webpack
2. 使用多进程，多线程，Happypack 和Thread-loader
3. dll动态链接库
4. 利用缓存提升二次构建速度
5. 缩小构建目标

### 优化打包后的体积
1. 对打包的代码进行压缩
2. tree-shaking擦除没有使用的的代码
3. 动态polyfill
