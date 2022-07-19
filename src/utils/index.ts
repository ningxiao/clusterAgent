import { configure, getLogger } from 'log4js';
configure({
    disableClustering: true,
    appenders: {
        default: {
            type: 'file',
            compress: true,
            numBackups: 15,
            filename: 'logs/info.log',
            pattern: 'yyyy-MM-dd',
            alwaysIncludePattern: true,
        },
        debug: {
            type: 'console',
        },
    },
    categories: {
        default: {
            //开发模式
            level: 'info',
            appenders: ['default'],
        },
        debug: {
            //生产模式
            level: 'debug',
            enableCallStack: true,
            appenders: ['debug'],
        },
    },
});
const processEnv = process.env;
export const isProcess = (pid) => {
    let isPid = true;
    try {
        isPid = process.kill(pid, 0);
    } catch {
        isPid = false;
    }
    return isPid;
};
export const processSend = (body) => {
    if (process.connected) {
        process.send(body);
    }
};
export const NODE_ENV = processEnv.NODE_ENV || 'production';
export const env = {
    isDev() {
        return NODE_ENV === 'dev' || NODE_ENV === 'development';
    },
    isSt() {
        return NODE_ENV === 'st' || NODE_ENV === 'staging';
    },
    isTest() {
        return NODE_ENV === 'test';
    },
    isProd() {
        return NODE_ENV === 'prod' || NODE_ENV === 'production' || !NODE_ENV;
    },
    isMock() {
        return processEnv.MOCK === 'true';
    },
};
/**
 *  产生ID
 * @param key
 * @returns
 */
export const guid = (key: string) => {
    return (
        'xxxxxx4xxyxxxxx'
            .replace(/[xy]/g, (c) => {
                const r = (Math.random() * 16) | 0;
                const v = c === 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            })
            .toUpperCase() + key
    );
};
const logInfo = getLogger(env.isDev() ? 'debug' : 'default');
export const logger = {
    info: (...args) => {
        logInfo.info(`[pid:${process.pid}] `, ...args);
    },
    debug: (...args) => {
        logInfo.debug(`[pid:${process.pid}] `, ...args);
    },
    error: (...args) => {
        logInfo.error(`[pid:${process.pid}] `, ...args);
    },
};
