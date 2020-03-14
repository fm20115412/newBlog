[TOC]
## HTTP协议是什么
HTTP是超文本传输协议，它的英文名是HyperText Transfer Protocol。

- HTTP协议是用于**客户端和服务端**之间通信的。请求访问资源的一方，叫做客户端；提供响应的一端称为服务端。
- HTTP 是TCP/IP 4层网络模型中**应用层**的协议。
- HTTP是**无状态**的，每次HTTP请求都是独立的，任何两个请求之间没有必然的联系。
- HTTP 1.0是**无连接**的，无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。HTTP 1.1 是**持久化连接**的，持久化连接的特点是只要任意一端没有明确提出断开连接，则保持TCP连接状态。
- HTTP允许传输**任意类型**的数据对象。正在传输的类型由Content-Type加以标记。这意味着，只要客户端和服务器知道如何处理的数据内容，任何类型的数据都可以通过HTTP发送。

> 超文本指的是HTML，css，JavaScript和图片等，HTTP的出现是为了接收和发布HTML页面的，经过不断的发展也可以用于接收一些音频，视频，文件等内容。

## HTTP协议组成
由两部分组成：**请求报文**和**响应报文**。

### 请求报文
HTTP请求报文由四部分组成：请求行、请求头、空行、请求体。

![](./images/2.png)

#### 请求行

请求行由请求方法、URI和HTTP协议版本3个字段组成，用空格分隔，比如：
```
GET /data/info.html HTTP/1.1
```
请求方法有如下几种，最常用的是 **GET** 和 **POST**
|  方法|  描述|
| :--- | :--- |
|GET|发送请求获取服务器上的资源|
|POST|向服务器提交资源让服务器处理|
|HEAD|HEAD跟GET相似，不过服务端接收到HEAD请求时只返回响应头，不发送响应内容。该请求方法的一个使用场景是在下载一个大文件前先获取其大小再决定是否要下载, 以此可以节约带宽资源|
|PUT|把一个资源存放在指定的位置上。本质上来讲，PUT和POST极为相似，都是向服务器发送数据，但它们之间有一个重要区别，PUT通常指定了资源的存放位置，而POST则没有，POST的数据存放位置由服务器自己决定。|
|DELETE|用于删除指定的资源|
|CONNECT|CONNECT方法是HTTP/1.1协议预留的，能够将连接改为管道方式的代理服务器。通常用于SSL加密服务器的链接与非加密的HTTP代理服务器的通信|
|OPTIONS|获取http服务器支持的http请求方法，允许客户端查看服务器的性能|
|TRACE|回显服务器收到的请求，主要用于测试或诊断。一般禁用，防止被恶意攻击或盗取信息。|

#### 请求头

请求头部由关键字/值对组成，每行一对，关键字和值用英文冒号“:”分隔。
```java
Accept: image/webp,image/apng,image/*,*/*;q=0.8
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: no-cache
Connection: keep-alive
Cookie: plus_lsv=f197ee21ffd230fd; plus_cv=1::m:49a3f4a6; MSA_WH=375_667; MSA_PBT=146; MSA_ZOOM=1056; BAIDUID=3CA8D598558396E8A96956264AA050B0:FG=1
Host: m.baidu.com
Pragma: no-cache
Referer: https://www.baidu.com/
Sec-Fetch-Mode: no-cors
Sec-Fetch-Site: same-site
User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1
```
常用请求头如下：
|header|解释|示例|
| :---: | --- | --- |
|Host|指定请求的服务器的域名和端口号|Host: m.baidu.com|
|Accept|指定客户端能够接收的内容类型|Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3|
|Accept-Encoding|浏览器申明自己接收的编码方法，通常指定压缩方法，是否支持压缩，支持什么压缩方法（gzip，deflate）|Accept-Encoding: gzip, deflate, br|
|Accept-Language|浏览器可接受的语言|Accept-Language: zh-CN,zh;q=0.9|
|Cache-Control|指定请求和响应遵循的缓存机制|Cache-Control: no-cache|
|Connection|表示是否需要持久连接。（HTTP 1.1默认进行持久连接）|Connection: keep-alive|
|Cookie|Cookie是用来存储一些用户信息以便让服务器辨别用户身份的|Cookie: plus_lsv=f197ee21ffd230fd; plus_cv=1::m:49a3f4a6; MSA_WH=375_667; MSA_PBT=146; MSA_ZOOM=1056; BAIDUID=3CA8D598558396E8A96956264AA050B0:FG=1|
|Content-Length|以8进制表示的请求体的长度|Content-Length: 348|
|Content-Type|请求体的MIME类型 （用于POST和PUT请求中）|Content-Type: application/x-www-form-urlencoded	|
|Date|发送该消息的日期和时间|Date: Dec, 26 Dec 2015 17:30:00 GMT|
|Referer|当浏览器向web服务器发送请求的时候，一般会带上Referer，告诉服务器我是从哪个页面链接过来的，服务器籍此可以获得一些信息用于处理。|Referer: https://www.baidu.com/|
|User-Agent|告诉HTTP服务器， 客户端使用的操作系统和浏览器的名称和版本。|User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1|

#### 空行
最后一个响应头部之后是一个空行，通知服务器以下不再有响应头部。
#### 请求体
请求的最后一部分是请求体。不是所有的请求都有请求体：例如获取资源的请求，GET，HEAD，DELETE 和 OPTIONS，通常它们不需要请求体。 有些请求将数据发送到服务器以便更新数据：常见的的情况是 POST 请求（包含表单数据）。
```
email=12131231%40qq.com&password=dadadada
```

### 响应报文

## 参考文章
[1. 关于常用的http请求头以及响应头详解](https://juejin.im/post/5c17d3cd5188250d9e604628)
[2. 可能是全网最全的http面试答案](https://juejin.im/post/5d032b77e51d45777a126183#heading-6)

