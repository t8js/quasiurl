/**
 * `URL`-like object for URL templates.
 * 
 * Unlike `URL`, `QuasiURL`:
 * - can have an empty `origin`, `pathname`, `hostname`, `protocol`;
 * - preserves templating characters without URL-encoding them.
 */
export class QuasiURL {
  _protocol = "";
  _hostname = "";
  _port = "";
  _pathname = "";
  _search = "";
  _hash = "";
  constructor(url: string) {
    this.href = url;
  }
  get href() {
    return `${this.origin}${this.pathname}${this.search}${this.hash}`;
  }
  set href(value: string) {
    let origin = value.match(/^(\w+:)?\/\/[^/:]+(:\d+)?/)?.[0] ?? "";
    let tail =
      value.slice(origin.length).match(/^([^?#]+)?(\?[^#]+)?(#.+)?$/) ?? [];

    this.origin = origin;
    this.pathname = tail[1] ?? "";
    this.search = tail[2] ?? "";
    this.hash = tail[3] ?? "";
  }
  get protocol() {
    return this._protocol;
  }
  set protocol(value: string) {
    if (!value || /^\w+:$/.test(value)) this._protocol = value;
  }
  get hostname() {
    return this._hostname;
  }
  set hostname(value: string) {
    if (!value.includes("/")) this._hostname = value;
  }
  get port(): string {
    return this._port;
  }
  set port(value: string | number) {
    let s = String(value);
    if (!s || /^\d+$/.test(s)) this._port = s;
  }
  get host() {
    return `${this.hostname}${this.port ? `:${this.port}` : ""}`;
  }
  set host(value: string) {
    let [hostname, port = ""] = value.split(":");
    this.hostname = hostname;
    this.port = port;
  }
  get origin() {
    if (!this.protocol && !this.host) return "";
    return `${this.protocol}//${this.host}`;
  }
  set origin(value: string) {
    let [protocol, host = ""] = value.split("//");
    this.protocol = protocol;
    this.host = host;
  }
  get pathname() {
    let p = this._pathname;
    return `${p.startsWith("/") || p.startsWith("{/") ? "" : "/"}${p}`;
  }
  set pathname(value: string) {
    this._pathname = value;
  }
  get search(): string {
    return this._search && `?${this._search}`;
  }
  set search(value: string | URLSearchParams) {
    let s = String(value);
    this._search = s.startsWith("?") ? s.slice(1) : s;
  }
  get hash() {
    return this._hash && `#${this._hash}`;
  }
  set hash(value: string) {
    this._hash = value.startsWith("#") ? value.slice(1) : value;
  }
  toString() {
    return this.href;
  }
}
