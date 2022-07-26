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
var Response_exports = {};
__export(Response_exports, {
  default: () => Response_default
});
module.exports = __toCommonJS(Response_exports);
class Response {
  status = 200;
  message = "OK";
  version = "HTTP/1.1";
  headers = {};
  cookies = [];
  body = "";
  constructor() {
    this.headers = {
      "Content-Type": "text/plain;charset=utf-8"
    };
  }
  setStatus(status) {
    this.status = status;
  }
  setBody(body) {
    this.body = body;
    this.setHeader("Content-Length", Buffer.byteLength(body));
  }
  setHeader(key, val) {
    this.headers[key] = val;
  }
  setCookie(key, val) {
    this.cookies.push({ key, value: val });
  }
  format() {
    const headers = [`${this.version} ${this.status} ${this.message}`];
    for (const key in this.headers) {
      headers.push(`${key.toLocaleLowerCase()}: ${this.headers[key]}`);
    }
    this.cookies.forEach((vo) => {
      headers.push(`${vo.key}: ${vo.value}`);
    });
    return headers.join("\r\n") + "\r\n\r\n" + this.body;
  }
}
var Response_default = Response;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
