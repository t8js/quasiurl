import { QuasiURL } from ".";

let k = 0;

function assert(predicate: boolean) {
  let n = `00${++k}`.slice(-3);

  if (predicate) console.log(n, "passed");
  else {
    console.error(n, "failed");
    console.error();
    console.error("[!] failed");
    process.exit(1);
  }
}

function createQuasiURL(url: string) {
  console.log(`\n${JSON.stringify(url)}`);
  return new QuasiURL(url);
}

let url = createQuasiURL("/sections/:id");

assert(url.origin === "");
assert(url.pathname === "/sections/:id");
assert(url.search === "");
assert(url.hash === "");
assert(url.href === "/sections/:id");
assert(url.hostname === "");
assert(url.protocol === "");

url = createQuasiURL("/x{/:name}");

assert(url.origin === "");
assert(url.pathname === "/x{/:name}");
assert(url.search === "");
assert(url.hash === "");
assert(url.href === "/x{/:name}");
assert(url.hostname === "");
assert(url.protocol === "");

url = createQuasiURL("/x?a=1&b=nnn#start");

assert(url.origin === "");
assert(url.pathname === "/x");
assert(url.search === "?a=1&b=nnn");
assert(url.hash === "#start");
assert(url.href === "/x?a=1&b=nnn#start");
assert(url.hostname === "");
assert(url.protocol === "");

url = createQuasiURL("https://a.aa/chapter/1");

assert(url.origin === "https://a.aa");
assert(url.pathname === "/chapter/1");
assert(url.search === "");
assert(url.hash === "");
assert(url.href === "https://a.aa/chapter/1");
assert(url.hostname === "a.aa");
assert(url.protocol === "https:");

url = createQuasiURL("https://a.aa");

assert(url.origin === "https://a.aa");
assert(url.pathname === "");
assert(url.search === "");
assert(url.hash === "");
assert(url.href === "https://a.aa");
assert(url.hostname === "a.aa");
assert(url.protocol === "https:");

url = createQuasiURL("");

assert(url.origin === "");
assert(url.pathname === "");
assert(url.search === "");
assert(url.hash === "");
assert(url.href === "");
assert(url.hostname === "");
assert(url.protocol === "");

url = createQuasiURL("?x=321&y=567#start");

assert(url.origin === "");
assert(url.pathname === "");
assert(url.search === "?x=321&y=567");
assert(url.hash === "#start");
assert(url.href === "?x=321&y=567#start");
assert(url.hostname === "");
assert(url.protocol === "");

url = createQuasiURL("x/y?a=1");

assert(url.origin === "");
assert(url.pathname === "x/y");
assert(url.search === "?a=1");
assert(url.hash === "");
assert(url.href === "x/y?a=1");
assert(url.hostname === "");
assert(url.protocol === "");

console.log("\npassed");
