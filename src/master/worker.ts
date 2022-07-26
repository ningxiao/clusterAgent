import vm from 'vm';
import net from 'net';
import Response from "../utils/Response";
import IncomingMessage from "../utils/IncomingMessage";
let code = `
    ((data) => {
        data.job = '程序员';
        if (data.id === 2163811) {
            data.job = '富二代';
        }
        return data;
    })(dataSource)
    `;
const body = { id: 2163811, login: "liergou", email: "liergou@test.com", name: "李二狗", now: Date.now() };
const agent = new net.Socket();
agent.connect(8888, 'localhost', () => {
    console.log("连接Agent服务成功");
});
//监听data事件
agent.on('data', data => {
    const res = new IncomingMessage(data.toString());
    code = res.httpMessage.body;
});
//监听end事件
agent.on('end', () => {
    console.log("客户端发送数据结束")
});
process.on('message', (msg, socket: net.Socket) => {
    console.log('负载PID = %d', process.pid);
    if (msg == 'socket' && socket) {
        const rep = new Response();
        const context = { dataSource: body };
        socket.resume();
        socket.on("data", (data) => {
            agent.write(data);
            // const res = new IncomingMessage(data.toString());
            // console.log(res.httpMessage.url);
        });
        // 使用vm进行数据归一化处理
        const script = new vm.Script(code);
        script.runInNewContext(context);
        rep.setStatus(200);
        rep.setHeader('Content-Type', 'text/html;charset=utf-8');
        rep.setHeader('Server', 'nxiao');
        rep.setCookie('Set-Cookie', 'type=server;Secure;HttpOnly');
        rep.setCookie('Set-Cookie', 'language=typescript;Secure;HttpOnly');
        rep.setBody(JSON.stringify(context.dataSource));
        socket.write(rep.format());
        socket.end();
    }
});
