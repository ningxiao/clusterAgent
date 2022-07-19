var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var master_exports = {};
__export(master_exports, {
  createWorker: () => createWorker,
  default: () => master_default
});
module.exports = __toCommonJS(master_exports);
var import_child_process = __toESM(require("child_process"));
const workers = [];
const cpus = 4;
const createWorker = () => {
  for (let i = 0; i < cpus; i++) {
    workers.push(import_child_process.default.fork("./dist/master/worker.js", ["normal"]));
  }
};
var master_default = (socket) => {
  socket.pause();
  const fork = workers.shift();
  fork.send("socket", socket);
  workers.push(fork);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createWorker
});