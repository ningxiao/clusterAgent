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
var import_Response = __toESM(require("../utils/Response"));
var import_IncomingMessage = __toESM(require("../utils/IncomingMessage"));
let body = "Hello World";
const client = new import_net.default.Socket();
client.connect(8888, "localhost", () => {
  console.log("\u8FDE\u63A5Agent\u670D\u52A1\u6210\u529F");
});
client.on("data", (data) => {
  const res = new import_IncomingMessage.default(data.toString());
  body = res.httpMessage.body;
});
client.on("end", () => {
  console.log("\u5BA2\u6237\u7AEF\u53D1\u9001\u6570\u636E\u7ED3\u675F");
});
process.on("message", (msg, socket) => {
  console.log("\u8D1F\u8F7D\u8FD0\u884CPID = %d", process.pid);
  if (msg == "socket" && socket) {
    socket.on("data", (data) => {
      client.write(data);
    });
    const rep = new import_Response.default();
    rep.setStatus(200);
    rep.setHeader("Content-Type", "text/html");
    rep.setHeader("Server", "nxiao");
    rep.setCookie("Set-Cookie", "type=server;Secure;HttpOnly");
    rep.setCookie("Set-Cookie", "language=typescript;Secure;HttpOnly");
    rep.setBody(body);
    socket.write(rep.format());
    socket.end();
  }
});
