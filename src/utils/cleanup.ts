export default (
    callback = (err) => {
        console.log('cleanup', err);
    },
) => {
    process.on('beforeExit', callback);
    process.once('uncaughtException', callback);
    process.on('exit', callback);
};
