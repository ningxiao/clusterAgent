import { Headers, Cookies } from './HttpParser';
class Response {
    private status = 200;
    private message = 'OK';
    private version = 'HTTP/1.1';
    private headers: Headers = {};
    private cookies: Cookies = [];
    private body = '';
    constructor() {
        this.headers = {
            'Content-Type': 'text/plain;charset=utf-8'
        };
    }
    public setStatus(status: number) {
        this.status = status;
    }
    public setBody(body: string) {
        this.body = body;
        this.setHeader('Content-Length', Buffer.byteLength(body));
    }
    public setHeader(key: string, val: string | number) {
        this.headers[key] = val;
    }
    public setCookie(key: string, val: string | number) {
        this.cookies.push({ key, value: val });
    }
    public format(): string {
        const headers = [`${this.version} ${this.status} ${this.message}`];
        for (const key in this.headers) {
            headers.push(`${key.toLocaleLowerCase()}: ${this.headers[key]}`);
        }
        this.cookies.forEach(vo => {
            headers.push(`${vo.key}: ${vo.value}`);
        });
        return headers.join('\r\n') + '\r\n\r\n' + this.body;
    }
}
export default Response;
