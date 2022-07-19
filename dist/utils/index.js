var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var utils_exports = {};
__export(utils_exports, {
  NODE_ENV: () => NODE_ENV,
  env: () => env,
  guid: () => guid,
  isProcess: () => isProcess,
  logger: () => logger,
  processSend: () => processSend
});
module.exports = __toCommonJS(utils_exports);
var import_log4js = require("log4js");
(0, import_log4js.configure)({
  disableClustering: true,
  appenders: {
    default: {
      type: "file",
      compress: true,
      numBackups: 15,
      filename: "logs/info.log",
      pattern: "yyyy-MM-dd",
      alwaysIncludePattern: true
    },
    debug: {
      type: "console"
    }
  },
  categories: {
    default: {
      level: "info",
      appenders: ["default"]
    },
    debug: {
      level: "debug",
      enableCallStack: true,
      appenders: ["debug"]
    }
  }
});
const processEnv = process.env;
const isProcess = (pid) => {
  let isPid = true;
  try {
    isPid = process.kill(pid, 0);
  } catch {
    isPid = false;
  }
  return isPid;
};
const processSend = (body) => {
  if (process.connected) {
    process.send(body);
  }
};
const NODE_ENV = processEnv.NODE_ENV || "production";
const env = {
  isDev() {
    return NODE_ENV === "dev" || NODE_ENV === "development";
  },
  isSt() {
    return NODE_ENV === "st" || NODE_ENV === "staging";
  },
  isTest() {
    return NODE_ENV === "test";
  },
  isProd() {
    return NODE_ENV === "prod" || NODE_ENV === "production" || !NODE_ENV;
  },
  isMock() {
    return processEnv.MOCK === "true";
  }
};
const guid = (key) => {
  return "xxxxxx4xxyxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  }).toUpperCase() + key;
};
const logInfo = (0, import_log4js.getLogger)(env.isDev() ? "debug" : "default");
const logger = {
  info: (...args) => {
    logInfo.info(`[pid:${process.pid}] `, ...args);
  },
  debug: (...args) => {
    logInfo.debug(`[pid:${process.pid}] `, ...args);
  },
  error: (...args) => {
    logInfo.error(`[pid:${process.pid}] `, ...args);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NODE_ENV,
  env,
  guid,
  isProcess,
  logger,
  processSend
});
