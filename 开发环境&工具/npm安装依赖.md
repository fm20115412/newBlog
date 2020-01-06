## npm --save-dev和--save 的区别

a. `npm i package --save`
该命令会将依赖包安装到`package.json`文件下的`dependencies`键下，不加参数默认会是这种形式 。
缩写：`npm i package -S`

`dependencies`是运行时依赖,`dependencies`下的模块，是我们发布后还需要依赖的模块，譬如像jQuery库或者Angular框架类似的，我们在开发完后后肯定还要依赖它们，否则就运行不了。

b. `npm i package --save-dev`
该命令会将依赖包安装到`package.json`文件下的`devDependencies`键下。
缩写：`npm i package -D`

`devDependencies`是开发时依赖，比如项目中使用的gulp，压缩css、js的模块。这些模块在我们的项目部署后是不需要的，所以我们可以使用`-save-dev`的形式安装。

c.补充
正常使用`npm install`时，会下载`dependencies`和`devDependencies`中的模块，当使用`npm install –production`或者注明`NODE_ENV`变量值为`production`时，只会下载`dependencies`中的模块。