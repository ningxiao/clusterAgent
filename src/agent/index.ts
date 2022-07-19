import net from 'net';
import Response from "../utils/Response";
import IncomingMessage from "../utils/IncomingMessage";
const port = 8888;
const body = 'Hello Agent';
const sockets: Array<net.Socket> = [];
const netServer = net.createServer((socket) => {
    sockets.push(socket);
    socket.on("data", (data) => {
        const res = new IncomingMessage(data.toString());
        console.log('Agent服务验证User-Agent',res.httpMessage.headers['user-agent']);
    });
    netServer.getConnections((err, count) => {
        console.log("当前连接Agent服务个数为：" + count);
    });
});
netServer.maxConnections = 20;
netServer.on('error', error => {
    let message = error.message;
    if (error['code'] == 'EADDRINUSE') {
        message = 'Agent服务端口占用';
    }
    process.send(
        {
            code: 500,
            data: {
                port
            },
            message,
        }
    );
});
netServer.listen(port, () => {
    process.send(
        {
            code: 200,
            data: {
                port
            },
            message: 'Agent服务启动成功',
        }
    );
    setInterval(() => {
        const res = new Response();
        res.setStatus(200);
        res.setHeader('Server', 'nxiao');
        res.setCookie('Set-Cookie', 'type=server;Secure;HttpOnly');
        res.setCookie('Set-Cookie', 'language=typescript;Secure;HttpOnly');
        res.setBody(`{
                "body": {
                    "data": "${body}",
                    "now": ${Date.now()}
                }
            }`
        );
        sockets.forEach(socket => {
            socket.write(res.format(), () => {        //发送数据
                console.log("Agent服务推送成功，数据长度为：" + socket.bytesWritten);
            });
        });
    }, 7000);
});
