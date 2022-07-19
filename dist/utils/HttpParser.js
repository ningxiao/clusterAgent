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
var HttpParser_exports = {};
__export(HttpParser_exports, {
  default: () => HttpParser_default
});
module.exports = __toCommonJS(HttpParser_exports);
class HttpParser {
  message;
  httpMessage;
  constructor(message) {
    this.message = message;
    this.parse();
  }
  parse() {
    this.httpMessage = {};
    const messages = this.message.split("\r\n");
    const [head] = messages;
    const headers = messages.slice(1, -2);
    const [body] = messages.slice(-1);
    this.parseHead(head);
    this.parseHeaders(headers);
    this.parseBody(body);
  }
  parseHead(headStr) {
    const [method, url, version] = headStr.split(" ");
    this.httpMessage.method = method;
    this.httpMessage.url = url;
    this.httpMessage.version = version;
  }
  parseHeaders(headerStrList) {
    this.httpMessage.headers = {};
    for (let i = 0; i < headerStrList.length; i++) {
      const header = headerStrList[i];
      let [key, value] = header.split(":");
      key = key.toLocaleLowerCase();
      value = value.trim();
      this.httpMessage.headers[key] = value;
    }
  }
  parseBody(bodyStr = "") {
    this.httpMessage.body = bodyStr;
  }
}
var HttpParser_default = HttpParser;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
