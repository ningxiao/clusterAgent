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
var import_vm = __toESM(require("vm"));
var import_net = __toESM(require("net"));
var import_Response = __toESM(require("../utils/Response"));
var import_IncomingMessage = __toESM(require("../utils/IncomingMessage"));
let code = `
    ((data) => {
        data.job = '\u7A0B\u5E8F\u5458';
        if (data.id === 2163811) {
            data.job = '\u5BCC\u4E8C\u4EE3';
        }
        return data;
    })(dataSource)
    `;
const body = { id: 2163811, login: "liergou", email: "liergou@test.com", name: "\u674E\u4E8C\u72D7", now: Date.now() };
const agent = new import_net.default.Socket();
agent.connect(8888, "localhost", () => {
  console.log("\u8FDE\u63A5Agent\u670D\u52A1\u6210\u529F");
});
agent.on("data", (data) => {
  const res = new import_IncomingMessage.default(data.toString());
  code = res.httpMessage.body;
});
agent.on("end", () => {
  console.log("\u5BA2\u6237\u7AEF\u53D1\u9001\u6570\u636E\u7ED3\u675F");
});
process.on("message", (msg, socket) => {
  console.log("\u8D1F\u8F7DPID = %d", process.pid);
  if (msg == "socket" && socket) {
    const rep = new import_Response.default();
    const context = { dataSource: body };
    socket.resume();
    socket.on("data", (data) => {
      agent.write(data);
    });
    const script = new import_vm.default.Script(code);
    script.runInNewContext(context);
    rep.setStatus(200);
    rep.setHeader("Content-Type", "text/html;charset=utf-8");
    rep.setHeader("Server", "nxiao");
    rep.setCookie("Set-Cookie", "type=server;Secure;HttpOnly");
    rep.setCookie("Set-Cookie", "language=typescript;Secure;HttpOnly");
    rep.setBody(JSON.stringify(context.dataSource));
    socket.write(rep.format());
    socket.end();
  }
});
