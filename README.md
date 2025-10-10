# quasiurl

*`URL`-like object for templated URLs*

Unlike `URL`, `QuasiURL`:
- can have an empty `origin`, `pathname`, `hostname`, `protocol`;
- preserves templating characters without URL-encoding them;
- doesn't implement the entire `URL` spec.

```
new URL("/x").href
> TypeError: URL constructor: /x is not a valid URL.

new QuasiURL("/x").href
> "/x"

new URL("https://a.aa/x{/:name}").pathname
> "/x%7B/:name%7D"

new QuasiURL("https://a.aa/x{/:name}").pathname
> "/x{/:name}"
```
