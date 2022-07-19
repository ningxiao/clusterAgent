import net from 'net';
import factory, { createWorker } from './master';
import child_process from 'child_process';
const netServer = net.createServer(factory);
netServer.on('error', error => {
    if (error['code'] == 'EADDRINUSE') {
        console.log('服务端口被占用');
    }
});
const agentWork = child_process.fork('./dist/agent/index.js', ['normal']);
agentWork.on('message', (body: { code: number, data: { key: string | number }, message: string }) => {
    if (body.code === 200) {
        netServer.listen(
            {
                port: 8080,
                readableAll: true,
                writableAll: true
            }, () => {
                createWorker();
                console.log('服务器访问端口:8080 ');
            }
        );
    }
    console.log(body);
});
