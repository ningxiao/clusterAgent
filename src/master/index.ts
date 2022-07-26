import net from 'net';
import child_process from 'child_process';
const cpus = 4;
const workers: Array<child_process.ChildProcess> = [];
export const createWorker = () => {
    for (let i = 0; i < cpus; i++) {
        workers.push(child_process.fork('./dist/master/worker.js', ['normal']));
    }
}
export default (socket: net.Socket) => {
    socket.pause();
    const fork = workers.shift();
    fork.send('socket', socket);
    workers.push(fork);
};
