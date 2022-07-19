var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_net = __toESM(require("net"));
var import_master = __toESM(require("./master"));
var import_child_process = __toESM(require("child_process"));
const netServer = import_net.default.createServer(import_master.default);
netServer.on("error", (error) => {
  if (error["code"] == "EADDRINUSE") {
    console.log("\u670D\u52A1\u7AEF\u53E3\u88AB\u5360\u7528");
  }
});
const agentWork = import_child_process.default.fork("./dist/agent/index.js", ["normal"]);
agentWork.on("message", (body) => {
  if (body.code === 200) {
    netServer.listen({
      port: 8080,
      readableAll: true,
      writableAll: true
    }, () => {
      (0, import_master.createWorker)();
      console.log("\u670D\u52A1\u5668\u8BBF\u95EE\u7AEF\u53E3:8080 ");
    });
  }
  console.log(body);
});
