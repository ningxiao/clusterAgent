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
const port = 8888;
const body = "Hello Agent";
const sockets = [];
const netServer = import_net.default.createServer((socket) => {
  sockets.push(socket);
  socket.on("data", (data) => {
    const res = new import_IncomingMessage.default(data.toString());
    console.log("Agent\u670D\u52A1\u9A8C\u8BC1User-Agent", res.httpMessage.headers["user-agent"]);
  });
  netServer.getConnections((err, count) => {
    console.log("\u5F53\u524D\u8FDE\u63A5Agent\u670D\u52A1\u4E2A\u6570\u4E3A\uFF1A" + count);
  });
});
netServer.maxConnections = 20;
netServer.on("error", (error) => {
  let message = error.message;
  if (error["code"] == "EADDRINUSE") {
    message = "Agent\u670D\u52A1\u7AEF\u53E3\u5360\u7528";
  }
  process.send({
    code: 500,
    data: {
      port
    },
    message
  });
});
netServer.listen(port, () => {
  process.send({
    code: 200,
    data: {
      port
    },
    message: "Agent\u670D\u52A1\u542F\u52A8\u6210\u529F"
  });
  setInterval(() => {
    const res = new import_Response.default();
    res.setStatus(200);
    res.setHeader("Server", "nxiao");
    res.setCookie("Set-Cookie", "type=server;Secure;HttpOnly");
    res.setCookie("Set-Cookie", "language=typescript;Secure;HttpOnly");
    res.setBody(`{
                "body": {
                    "data": "${body}",
                    "now": ${Date.now()}
                }
            }`);
    sockets.forEach((socket) => {
      socket.write(res.format(), () => {
        console.log("Agent\u670D\u52A1\u63A8\u9001\u6210\u529F\uFF0C\u6570\u636E\u957F\u5EA6\u4E3A\uFF1A" + socket.bytesWritten);
      });
    });
  }, 7e3);
});
