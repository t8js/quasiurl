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

let url = createQuasiURL("/x");

assert(url.origin === "");
assert(url.pathname === "/x");
assert(url.search === "");
assert(url.hash === "");
assert(url.href === "/x");
assert(url.hostname === "");
assert(url.protocol === "");

console.log("\nset pathname");
url.pathname = "a/b";

assert(url.origin === "");
assert(url.pathname === "/a/b");
assert(url.search === "");
assert(url.hash === "");
assert(url.href === "/a/b");
assert(url.hostname === "");
assert(url.protocol === "");

console.log("\nset origin");
url.origin = "https://a.aa";

assert(url.origin === "https://a.aa");
assert(url.pathname === "/a/b");
assert(url.search === "");
assert(url.hash === "");
assert(url.href === "https://a.aa/a/b");
assert(url.hostname === "a.aa");
assert(url.protocol === "https:");

console.log("\nreset origin, set search");
url.origin = "";
url.search = "x=1";

assert(url.origin === "");
assert(url.pathname === "/a/b");
assert(url.search === "?x=1");
assert(url.hash === "");
assert(url.href === "/a/b?x=1");
assert(url.hostname === "");
assert(url.protocol === "");

console.log("\nset href");
url.href = "/x#intro";

assert(url.origin === "");
assert(url.pathname === "/x");
assert(url.search === "");
assert(url.hash === "#intro");
assert(url.href === "/x#intro");
assert(url.hostname === "");
assert(url.protocol === "");

url = createQuasiURL("/sections/:id");

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

console.log("\nupdate path template");
url.pathname = "{/:name}";

assert(url.origin === "");
assert(url.pathname === "{/:name}");
assert(url.search === "");
assert(url.hash === "");
assert(url.href === "{/:name}");
assert(url.hostname === "");
assert(url.protocol === "");

console.log("\nset origin to path template");
url.origin = "https://a.aa";

assert(url.origin === "https://a.aa");
assert(url.pathname === "{/:name}");
assert(url.search === "");
assert(url.hash === "");
assert(url.href === "https://a.aa{/:name}");
assert(url.hostname === "a.aa");
assert(url.protocol === "https:");

url = createQuasiURL("https://a.aa/x{/:name}");

assert(url.origin === "https://a.aa");
assert(url.pathname === "/x{/:name}");
assert(url.search === "");
assert(url.hash === "");
assert(url.href === "https://a.aa/x{/:name}");
assert(url.hostname === "a.aa");
assert(url.protocol === "https:");

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
assert(url.host === "a.aa");
assert(url.port === "");
assert(url.protocol === "https:");

console.log("\nset port");
url.port = 123;

assert(url.origin === "https://a.aa:123");
assert(url.pathname === "/chapter/1");
assert(url.search === "");
assert(url.hash === "");
assert(url.href === "https://a.aa:123/chapter/1");
assert(url.hostname === "a.aa");
assert(url.host === "a.aa:123");
assert(url.port === "123");
assert(url.protocol === "https:");

url = createQuasiURL("https://a.aa:42/chapter/1");

assert(url.origin === "https://a.aa:42");
assert(url.pathname === "/chapter/1");
assert(url.search === "");
assert(url.hash === "");
assert(url.href === "https://a.aa:42/chapter/1");
assert(url.hostname === "a.aa");
assert(url.host === "a.aa:42");
assert(url.port === "42");
assert(url.protocol === "https:");

url = createQuasiURL("https://a.aa");

assert(url.origin === "https://a.aa");
assert(url.pathname === "/");
assert(url.search === "");
assert(url.hash === "");
assert(url.href === "https://a.aa/");
assert(url.hostname === "a.aa");
assert(url.protocol === "https:");

url = createQuasiURL("");

assert(url.origin === "");
assert(url.pathname === "/");
assert(url.search === "");
assert(url.hash === "");
assert(url.href === "/");
assert(url.hostname === "");
assert(url.protocol === "");

url = createQuasiURL("?x=321&y=567#start");

assert(url.origin === "");
assert(url.pathname === "/");
assert(url.search === "?x=321&y=567");
assert(url.hash === "#start");
assert(url.href === "/?x=321&y=567#start");
assert(url.hostname === "");
assert(url.protocol === "");

url = createQuasiURL("x/y?a=1");

assert(url.origin === "");
assert(url.pathname === "/x/y");
assert(url.search === "?a=1");
assert(url.hash === "");
assert(url.href === "/x/y?a=1");
assert(url.hostname === "");
assert(url.protocol === "");

console.log("\nURLSearchParams");
url.search = new URLSearchParams({ n: "m" });

assert(url.origin === "");
assert(url.pathname === "/x/y");
assert(url.search === "?n=m");
assert(url.hash === "");
assert(url.href === "/x/y?n=m");
assert(url.hostname === "");
assert(url.protocol === "");

console.log('\n"?" as search');
url.search = "?";

assert(url.origin === "");
assert(url.pathname === "/x/y");
assert(url.search === "");
assert(url.hash === "");
assert(url.href === "/x/y");
assert(url.hostname === "");
assert(url.protocol === "");

console.log("\npassed");
