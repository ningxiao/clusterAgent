import net from 'net';
import Response from "../utils/Response";
import IncomingMessage from "../utils/IncomingMessage";
const port = 8888;
const sockets: Array<net.Socket> = [];
const code = `
    ((data) => {
        data.job = '富二代';
        if (data.id === 2163811) {
            data.job = '程序员';
            data.explain = '家道中落破产了😿';
        }
        return data;
    })(dataSource)
    `;
const netServer = net.createServer((socket) => {
    sockets.push(socket);
    socket.on('data', (data) => {
        const res = new IncomingMessage(data.toString());
        console.log('Agent服务验证User-Agent', res.httpMessage.headers['user-agent']);
    });
    netServer.getConnections((err, count) => {
        if (!err) {
            console.log("当前连接Agent服务个数为：" + count);
        }
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
    setTimeout(() => {
        const res = new Response();
        res.setStatus(200);
        res.setHeader('Server', 'nxiao');
        res.setCookie('Set-Cookie', 'type=server;Secure;HttpOnly');
        res.setCookie('Set-Cookie', 'language=typescript;Secure;HttpOnly');
        res.setBody(code);
        sockets.forEach(socket => {
            socket.write(res.format(), () => {        //发送数据
                console.log("Agent服务推送算子成功，数据长度为：" + socket.bytesWritten);
            });
        });
    }, 7000);
});
