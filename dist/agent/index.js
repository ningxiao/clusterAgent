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
const sockets = [];
const code = `
    ((data) => {
        data.job = '\u5BCC\u4E8C\u4EE3';
        if (data.id === 2163811) {
            data.job = '\u7A0B\u5E8F\u5458';
            data.explain = '\u5BB6\u9053\u4E2D\u843D\u7834\u4EA7\u4E86\u{1F63F}';
        }
        return data;
    })(dataSource)
    `;
const netServer = import_net.default.createServer((socket) => {
  sockets.push(socket);
  socket.on("data", (data) => {
    const res = new import_IncomingMessage.default(data.toString());
    console.log("Agent\u670D\u52A1\u9A8C\u8BC1User-Agent", res.httpMessage.headers["user-agent"]);
  });
  netServer.getConnections((err, count) => {
    if (!err) {
      console.log("\u5F53\u524D\u8FDE\u63A5Agent\u670D\u52A1\u4E2A\u6570\u4E3A\uFF1A" + count);
    }
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
  setTimeout(() => {
    const res = new import_Response.default();
    res.setStatus(200);
    res.setHeader("Server", "nxiao");
    res.setCookie("Set-Cookie", "type=server;Secure;HttpOnly");
    res.setCookie("Set-Cookie", "language=typescript;Secure;HttpOnly");
    res.setBody(code);
    sockets.forEach((socket) => {
      socket.write(res.format(), () => {
        console.log("Agent\u670D\u52A1\u63A8\u9001\u7B97\u5B50\u6210\u529F\uFF0C\u6570\u636E\u957F\u5EA6\u4E3A\uFF1A" + socket.bytesWritten);
      });
    });
  }, 7e3);
});
