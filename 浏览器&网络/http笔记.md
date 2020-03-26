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

请求头部由关键字/值对组成，每行一对，关键字和值用英文冒号“:”分隔，请求头部通知服务器有关于客户端请求的信息。下面头部的字段会详细介绍。

#### 空行
最后一个请求头部之后是一个空行，通知服务器以下不再有请求头部。
#### 请求体
请求的最后一部分是请求体。不是所有的请求都有请求体：例如获取资源的请求，GET，HEAD，DELETE 和 OPTIONS，通常它们不需要请求体。 有些请求将数据发送到服务器以便更新数据：常见的的情况是 POST 请求（包含表单数据）。
```
email=12131231%40qq.com&password=dadadada
```

### 响应报文

HTTP响应也由四个部分组成，分别是：响应行、响应头、空行、响应体。

![](./images/3.png)

#### 响应行
由3部分组成：协议版本，状态码，状态码文本描述，之间由空格分隔。
```
HTTP/1.1 200 OK
```
- 常用状态码

HTTP状态码被分为五大类:

|状态码|类别|原因短语|
| :---: | --- | --- |
|1xx|Informational(信息性状态码)|接收的请求正在处理|
|2xx|Success(成功性状态码)|请求正常处理完毕|
|3xx|Rediction（重定向状态码）|需要进行附件操作已完成请求|
|4xx|Client Error(客户端错误状态码)|服务器无法处理请求|
|5xx|Server Error(服务端错误状态码)|服务器处理请求出错|

常见的状态码：

|状态码|短语|描述|
| --- | --- | --- |
|200|OK|请求已正常处理|
|204|No Content|表示请求已成功处理，但是没有内容返回|
|206|Partial Content|服务器已经成功处理了部分 GET 请求|
|301|Moved Permanently|永久重定向，表示请求的资源已经永久的搬到了其他位置|
|302|Found|临时重定向，表示请求的资源临时搬到了其他位置|
|303|See Other|表示请求资源存在另一个URI，应使用GET定向获取请求资源|
|304|Not Modified|服务端资源未改变，可直接使用客户端未过期的缓存|
|307|Temporary Redirect|临时重定向，请求的资源现在临时从不同的URI响应请求|
|400|Bad Request|语义有误，当前请求无法被服务器理解；或者请求参数有误|
|401|Unauthorized|当前请求需要用户验证|
|403|Forbidden|服务器已经理解请求，但是拒绝执行它。比如访问服务器上某个不允许访问的文件|
|404|Not Found|服务器上无法找到请求的资源|
|500|Internal Server Error|服务端在执行请求时发生错误|
|503|Service Unavailable|服务器暂时处于超负荷状态或正在停机维护|

#### 响应头
响应头部字段是由服务端向客户端返回响应报文中所使用的字段，用于补充响应的附加信息，服务器信息，以及对客户端的附加要求等信息。详细见下面介绍的头部字段。

#### 空行
最后一个响应头部之后是一个空行，通知客户端以下不再有响应头部。
#### 响应体
服务器发送给客户端的内容
### http头部字段
- **通用头部字段** 既可以出现在请求报文中，也可以出现在响应报文中；
- **请求头部字段** 从客户端向服务端发送请求报文使用的头部；
- **响应头部字段** 从服务端向客户端返回响应时使用的头部；
- **实体头部字段** 针对请求报文和响应报文的实体部分使用的头部。

#### 通用头部字段
常用通用头部如下：
|header|解释|示例|
| --- | --- | --- |
|Cache-Control|指定请求和响应遵循的缓存机制|Cache-Control: no-cache|
|Connection|表示是否需要持久连接。（HTTP 1.1默认进行持久连接）|Connection: keep-alive|
|Date|创建报文的日期和时间|Date: Dec, 26 Dec 2015 17:30:00 GMT|
|Transfer-Encoding| 当HTTP对Body进行分块传送时，需要增加下面的头部信息才可以进行分块传送 | Transfer-Encoding: chunked|
#### 请求头部字段
常用请求头部如下：
|header|解释|示例|
| :---: | --- | --- |
|Host|指定请求的服务器的域名和端口号|Host: m.baidu.com|
|Accept|指定客户端能够接收的内容类型|Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3|
|Accept-Encoding|浏览器申明自己接收的编码方法，通常指定压缩方法，是否支持压缩，支持什么压缩方法（gzip，deflate）|Accept-Encoding: gzip, deflate, br|
|Accept-Language|浏览器可接受的语言（中文或英文）|Accept-Language: zh-CN,zh;q=0.9|
|Accept-Charset|表示客户端期望服务器返回的内容的字符集|Accept-Charset: utf8, gbk; q=0.6|
|Authorization|对于某些需要特殊权限才能访问的资源需要客户端在请求里提供用户名密码的认证信息。它是对WWW-Authenticate的应答。|Authorization: Basic YWRtaW46YWRtaW4xMjM=|
|Cookie|Cookie是用来存储一些用户信息以便让服务器辨别用户身份的|Cookie: plus_lsv=f197ee21ffd230fd; plus_cv=1::m:49a3f4a6; MSA_WH=375_667; MSA_PBT=146; MSA_ZOOM=1056; BAIDUID=3CA8D598558396E8A96956264AA050B0:FG=1|
|Referer|当浏览器向web服务器发送请求的时候，一般会带上Referer，告诉服务器我是从哪个页面链接过来的，服务器籍此可以获得一些信息用于处理。|Referer: https://www.baidu.com/|
|User-Agent|告诉HTTP服务器， 客户端使用的操作系统和浏览器的名称和版本。|User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1|
#### 响应头部字段
常用响应头部字段：
|header|解释|示例|
| :---: | --- | --- |
|Location|服务器向客户端发送302跳转的时候，总会携带Location头信息，它的值为目标URL|Location: https://www-temp.example.org/|
|Server|用于返回服务器相关的软件信息|Server: Apache/2.2.17 (Unix)|
|Set-Cookie|设置Http Cookie|Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1|
|WWW-Authenticate|WWW-Authenticate是401 Unauthorized错误码返回时必须携带的头，它会告知客户端适用于访问请求URI所指定资源的认证方案|WWW-Authenticate: Basic realm=xxx|
#### 实体头部字段
实体首部字段是包含在请求报文和响应报文中的实体部分所使用的头部，用于补充内容更新时间和实体相关的信息，常用头部字段如下：

|header|解释|示例|
| :---: | --- | --- |
|Allow|表示资源支持访问的HTTP Method类型。它是服务器对客户端的建议，告知对方请使用Allow中提到的Method来访问资源。|Allow: GET, HEAD, PUT|
|Content-Length|以8进制表示的请求体的长度|Content-Length: 348|
|Content-Type|Content-Type是服务器向客户端发送的头，代表内容的媒体类型和编码格式|Content-Type: text/html; charset=utf8|
|Content-Encoding|服务器告知客户端对实体内容部分的压缩方式|Content-Encoding:gzip|
|Content-Language|这个头字段内容是对Accept-Language的应答。服务器通过此字段告知客户端返回的Body信息的语言是什么|Content-Language：zh-CN|
|Expires|服务器使用Expect头来告知对方资源何时失效|Expires: Thu, 01 Dec 1994 16:00:00 GMT|
|Last-Modified|标记资源的最近修改时间|Last-Modified: Tue, 15 Nov 2010 12:45:26 GMT|

## 参考文章
[1. 关于常用的http请求头以及响应头详解](https://juejin.im/post/5c17d3cd5188250d9e604628)

[2. 可能是全网最全的http面试答案](https://juejin.im/post/5d032b77e51d45777a126183#heading-6)

[3. 鲜为人知的HTTP协议头字段详解大全「原创」](https://juejin.im/post/5ab341e06fb9a028c6759ce0#heading-19)

视频资料：

[1. 乾颐堂TCP/IP2017](https://www.youtube.com/watch?v=RgKal3zO8Ac&list=PL17RctH5HKX75cTA2zzp-nVw4JkbbLXrc)

[2. 乾颐堂WEB协议](https://www.youtube.com/playlist?list=PL17RctH5HKX4FU3-HpPLDvIrKzdVzYkSS)

