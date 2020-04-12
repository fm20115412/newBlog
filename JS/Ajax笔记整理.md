AJAX即“Asynchronous Javascript And XML”，它可以在页面不刷新的情况下，异步请求服务端加载数据。
### Ajax的使用
1. 创建Ajax核心对象XMLHttpRequest
```
xhr=new XMLHttpRequest(); 
```
2. 向服务器发送请求
```
xhr.open(method,url,async);  
xhr.send(string);//post请求时才使用字符串参数，get请求不用带参数
```
- method：请求的类型；GET 或 POST
- url：请求url
- async：true（异步）或 false（同步）
  
需要注意的是，调用open()方法并不会真正发送请求，而只是启动一个请求以备发送，要发送请求，还需调用send()方法。
3. 服务器响应处理（分同步和异步两种情况）

**GET异步请求**

在很多情况下，我们还是要发送异步请求，才能让js继续执行而不必等待响应，此时可以通过检测xhr对象的readyState属性，该属性表示请求/响应过程的当前活动阶段，readyState总共有5个状态值，分别为0~4，每个值代表了不同的含义：
- 0：未初始化 -- 尚未调用.open()方法；
- 1：启动 -- 已经调用.open()方法，但尚未调用.send()方法；
- 2：发送 -- 已经调用.send()方法，但尚未接收到响应；
- 3：接收 -- 已经接收到部分响应数据；
- 4：完成 -- 已经接收到全部响应数据，而且已经可以在客户端使用了；

只要readyState属性的值由一个值变成另一个值，都会触发一次readystatechange事件。可以利用这个事件来检测每次状态变化后readyState的值。通常，我们只对readyState值为4的阶段感兴趣，因为这时所有数据都已经就绪。不过，必须在调用open()之前指定onreadystatechange事件处理程序才能确保跨浏览器兼容性。
```
// 客户端代码
<div id='root'></div>
<script>
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                document.querySelector('#root').innerText = xhr.responseText
            } else {
                console.log('服务器异常');
            }
        }
    }
    xhr.onerror = function () {
        console.log('服务器异常');
    }
    xhr.open('GET', '/data', true);
    xhr.send();
</script>

// 服务端代码
const koa = require('koa');
const router = require('koa-router')();
const server = require('koa-static');

const app = new koa();
router.get('/data', async (ctx, next) => {
    ctx.body = 'hello world';
    await next();
})
app.use(server('.'));
app.use(router.routes());
app.listen(3000);
```
**GET同步请求**

对于同步请求，js代码会等到服务器响应之后再继续执行。
```
// 客户端代码
<div id='root'></div>
<script>
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/data', false);
    xhr.send();
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        document.querySelector('#root').innerText = xhr.responseText
    } else {
        onsole.log('服务器异常');
    }
    xhr.onerror = function () {
        console.log('服务器异常');
    }
</script>
// 服务端代码同上
```
### POST异步请求
```
// 客户端代码
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id='root'></div>
    <script>
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    document.querySelector('#root').innerText = xhr.responseText
                } else {
                    console.log('服务器异常');
                }
            }
        }
        xhr.onerror = function () {
            console.log('服务器异常');
        }
        xhr.open('POST', '/data', true);
        // 注意这行代码千万不能少，否则服务端拿不到post请求的数据
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send('name=lucy&age=10');
    </script>
</body>
</html>

// 服务端代码
const koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const server = require('koa-static');

const app = new koa();
app.use(server('.'));
app.use(bodyParser());

router.post('/data', async (ctx, next) => {
    let { name, age } = ctx.request.body;
    console.log(ctx.request.body);
    ctx.body = `your name is ${name}, age is ${age}`;
    await next();
})
app.use(router.routes());
app.listen(3000);
```
### Fetch的使用
Fetch API 是近年来被提及将要取代 XHR 的技术新标准，是一个 HTML5 的 API。
**GET请求**
```
// 获取 some.json 资源
fetch('some.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log('data', data);
  })
  .catch(function(error) {
    console.log('Fetch Error: ', error);
  });

// 采用ES2016的 async/await 语法
async function() {
  try {
    const response = await fetch('some.json');
    const data = response.json();
    console.log('data', data);
  } catch (error) {
    console.log('Fetch Error: ', error)
  }
}
```
**POST请求**
```
fetch('/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Hubot',
    login: 'hubot',
  })
})
```
### 参考文章
[1. 了解 Fetch API](https://aotu.io/notes/2017/04/10/fetch-API/index.html)
[2. Ajax原理一篇就够了](https://github.com/ljianshu/Blog/issues/45)