[TOC]
### websocket是什么
WebSocket是HTML5新增的协议，它的目的是在浏览器和服务器之间建立一个不受限的双向通信的通道，比如说，服务器可以在任意时刻发送消息给浏览器。

为什么传统的HTTP协议不能做到WebSocket实现的功能？这是因为HTTP协议是一个请求－响应协议，请求必须先由浏览器发给服务器，服务器才能响应这个请求，再把数据发送给浏览器。换句话说，浏览器不主动请求，服务器是没法主动发数据给浏览器的。

WebSocket 协议在2008年诞生，2011年成为国际标准。所有浏览器都已经支持了。

![](./IMAGES/28.PNG)
#### websocket特点
- 服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话。
- 建立在 TCP 协议之上，服务器端的实现比较容易。
- 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
- 数据格式比较轻量，性能开销小，通信高效。
- 可以发送文本，也可以发送二进制数据。
- 没有同源限制，客户端可以与任意服务器通信。
- 协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。
```
ws://example.com:80/some/path
```
#### websocket和http的关系
![](./IMAGES/27.PNG)
**相同点：**
二者都属于应用层协议，都是一样基于TCP的，都是可靠性传输协议。

**不同点：**
HTTP通信过程属于“你推一下，我走一下”的方式，客户端不发请求则服务器永远无法发送数据给客户端。而WebSocket服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话。

**联系：**
WebSocket复用了HTTP的握手通道，具体指的是，客户端通过HTTP请求与WebSocket服务端协商升级协议。协议升级完成后，后续的数据交换则遵照WebSocket的协议。

#### websocket的握手过程
**1. 客户端：申请协议升级**
首先，客户端发起协议升级请求。可以看到，采用的是标准的HTTP报文格式，且只支持GET方法。
```http
GET / HTTP/1.1
Host: localhost:8080
Origin: http://127.0.0.1:3000
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: w4v7O6xFTi36lq3RNcgctw==
```
重点请求首部意义如下：
- `Sec-WebSocket-Protocol`：字段表示客户端可以接受的子协议类型，也就是在Websocket协议上的应用层协议类型。上面可以看到客户端支持chat和superchat两个应用层协议，当服务器接受到这个字段后要从中选出一个协议返回给客户端。
- `Upgrade`：告诉服务器这个HTTP连接是升级的Websocket连接。
- `Connection`：告知服务器当前请求连接是升级的。
- `Origin`：该字段是用来防止客户端浏览器使用脚本进行未授权的跨源攻击，这个字段在WebSocket协议中非常重要。服务器要根据这个字段判断是否接受客户端的Socket连接。可以返回一个HTTP错误状态码来拒绝连接。
- `Sec-WebSocket-Version: 13`：表示websocket的版本。如果服务端不支持该版本，需要返回一个`Sec-WebSocket-Versionheader`，里面包含服务端支持的版本号。
- `Sec-WebSocket-Key`：与后面服务端响应首部的Sec-WebSocket-Accept是配套的，提供基本的防护，比如恶意的连接，或者无意的连接。
> 注意，上面请求省略了部分非重点请求首部。由于是标准的HTTP请求，类似Host、Origin、Cookie等请求首部会照常发送。在握手阶段，可以通过相关请求首部进行 安全限制、权限校验等。

**2. 服务端：响应协议升级**
服务端返回内容如下，状态代码101表示协议切换。到此完成协议升级，后续的数据交互都按照新的协议来。
```http
HTTP/1.1 101 Switching Protocols
Connection:Upgrade
Upgrade: websocket
Sec-WebSocket-Accept: Oy4NRAQ13jhfONC7bP8dTKb4PTU=
Sec-WebSocket-Protocol: chat
```
响应头握手过程中是服务器返回的是否同意握手的依据。
- 首行返回的是HTTP/1.1协议版本和状态码101，表示变换协议（Switching Protocol）
- Upgrade 和 Connection：这两个字段是服务器返回的告知客户端同意使用升级并使用websocket协议，用来完善HTTP升级响应
- Sec-WebSocket-Accept：服务器端将加密处理后的握手Key通过这个字段返回给客户端表示服务器同意握手建立连接。
- Sec-Websocket-Procotol：服务器选择的一个应用层协议。
### 简单实现websocket通信
1. 客户端代码
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script>

        var ws = new WebSocket('ws://localhost:3000');
        ws.onopen = function (evt) {
            console.log("Connection open ...");
            ws.send("Hello WebSockets!");
        };

        ws.onmessage = function (evt) {
            console.log("Received Message: " + evt.data);
        };

        ws.onclose = function (evt) {
            console.log("Connection closed.");
        };


    </script>
</body>

</html>
```
2. 服务端代码
```
const WebSocket = require('ws');

const ws = new WebSocket.Server({ port: 3000 });

ws.on('connection', ws => {
    console.log('server connection');
    ws.on('message', msg => {
        console.log('server receive msg：', msg);
    });
    ws.send('Information from the server');
});

```
### websocket心跳检测
在使用websocket的过程中，有时候会遇到网络断开的情况，但是在网络断开的时候服务器端并没有触发onclose的事件。这样会有：服务器会继续向客户端发送多余的链接，并且这些数据还会丢失。所以就需要一种机制来检测客户端和服务端是否处于正常的链接状态。因此就有了websocket的心跳了。还有心跳，说明还活着，没有心跳说明已经挂掉了。

心跳机制：客户端每隔一段时间会向服务器发送一个数据包，告诉服务器自己还活着，同时客户端也会确认服务端是否还活着，如果服务端还活着的话，就会回传一个数据包给客户端来确定服务端也还活着，否则的话，有可能是网络断开连接了，需要重连。

实现心跳检测的思路是：每隔一段固定的时间，向服务器端发送一个ping数据
- 如果在正常的情况下，服务器会返回一个pong给客户端，如果客户端通过onmessage事件能监听到的话，说明请求正常，重置心跳检测过程。
- 如果是网络断开的情况下，在指定的时间内服务器端并没有返回心跳响应消息，这个时候我们使用ws.close关闭连接，在一段时间后，可以通过 onclose事件监听到。因此在onclose事件内，我们可以调用 reconnect事件进行重连操作。

#### 分步实现
1. 通过createWebSocket创建连接
```
function createWebSocket() {
  try {
    ws = new WebSocket(wsUrl);
    init();
  } catch(e) {
    console.log('catch');
    reconnect(wsUrl);
  }
}
```
2. 创建init方法，初始化一些监听事件，如果希望websocket连接一直保持, 我们会在close或者error上绑定重新连接方法。
```
function init() {
  ws.onclose = function () {
    console.log('链接关闭');
    reconnect(wsUrl);
  };
  ws.onerror = function() {
    console.log('发生异常了');
    reconnect(wsUrl);
  };
  ws.onopen = function () {
    //心跳检测重置
    heartCheck.start();
  };
  ws.onmessage = function (event) {
     console.log('接收到消息');
    //拿到任何消息都说明当前连接是正常的
    heartCheck.reset();
  }
}
```
3. 重连操作，通过设置lockReconnect变量避免重复连接
```
var lockReconnect = false;//避免重复连接
function reconnect(url) {
      if(lockReconnect) {
        return;
      };
      lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      tt && clearTimeout(tt);
      tt = setTimeout(function () {
        createWebSocket(url);
        lockReconnect = false;
      }, 4000);
}
```
4. 心跳检测
```
var heartCheck = {
    timeout: 60000,//60ms
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function(){
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
　　　　 this.start();
    },
    start: function(){
        var self = this;
        this.timeoutObj = setTimeout(function(){
            ws.send("HeartBeat");
            self.serverTimeoutObj = setTimeout(function(){
                ws.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            }, self.timeout)
        }, this.timeout)
    },
}
```
#### 完整代码
```
<html>
<head>
  <meta charset="utf-8">
  <title>WebSocket Demo</title>
</head>
<body>
  <script type="text/javascript">
    var lockReconnect = false;//避免重复连接
    var wsUrl = "wss://echo.websocket.org";
    var ws;
    var tt;
    function createWebSocket() {
      try {
        ws = new WebSocket(wsUrl);
        init();
      } catch(e) {
        console.log('catch');
        reconnect(wsUrl);
      }
    }
    function init() {
      ws.onclose = function () {
        console.log('链接关闭');
        reconnect(wsUrl);
      };
      ws.onerror = function() {
        console.log('发生异常了');
        reconnect(wsUrl);
      };
      ws.onopen = function () {
        //心跳检测重置
        heartCheck.start();
      };
      ws.onmessage = function (event) {
        //拿到任何消息都说明当前连接是正常的
        console.log('接收到消息');
        heartCheck.reset();
      }
    }
    function reconnect(url) {
      if(lockReconnect) {
        return;
      };
      lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      tt && clearTimeout(tt);
      tt = setTimeout(function () {
        createWebSocket(url);
        lockReconnect = false;
      }, 4000);
    }
    //心跳检测
    var heartCheck = {
        timeout: 60000,//60ms
        timeoutObj: null,
        serverTimeoutObj: null,
        reset: function(){
            clearTimeout(this.timeoutObj);
            clearTimeout(this.serverTimeoutObj);
    　　　　 this.start();
        },
        start: function(){
            var self = this;
            this.timeoutObj = setTimeout(function(){
                ws.send("HeartBeat");
                self.serverTimeoutObj = setTimeout(function(){
                    ws.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                }, self.timeout)
            }, this.timeout)
        },
    }
    createWebSocket(wsUrl);
  </script>
</body>
</html>
```
### 参考文献
[1. WebSocket教程-阮一峰](https://www.ruanyifeng.com/blog/2017/05/websocket.html)
[2. WebSocket协议：5分钟从入门到精通](https://www.cnblogs.com/chyingp/p/websocket-deep-in.html)
[3. WebSocket教程-廖雪峰](https://www.liaoxuefeng.com/wiki/1022910821149312/1103303693824096)
[4. WebSocket 是什么原理？为什么可以实现持久连接？](https://www.zhihu.com/question/20215561)
[5. 初探和实现websocket心跳重连](https://www.cnblogs.com/1wen/p/5808276.html)