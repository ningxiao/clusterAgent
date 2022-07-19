import net from 'net';
import Response from "../utils/Response";
import IncomingMessage from "../utils/IncomingMessage";
let body = 'Hello World';
const client = new net.Socket();
client.connect(8888, 'localhost', () => {
    console.log("连接Agent服务成功");
});
//监听data事件
client.on("data", data => {
    const res = new IncomingMessage(data.toString());
    body = res.httpMessage.body;
});
//监听end事件
client.on("end", () => {
    console.log("客户端发送数据结束")
});
process.on('message', (msg, socket: net.Socket) => {
    console.log('负载运行PID = %d', process.pid);
    if (msg == 'socket' && socket) {
        socket.on("data", (data) => {
            client.write(data);
        });
        const rep = new Response();
        rep.setStatus(200);
        rep.setHeader('Content-Type', 'text/html');
        rep.setHeader('Server', 'nxiao');
        rep.setCookie('Set-Cookie', 'type=server;Secure;HttpOnly');
        rep.setCookie('Set-Cookie', 'language=typescript;Secure;HttpOnly');
        rep.setBody(body);
        socket.write(rep.format());
        socket.end();
    }
});
