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