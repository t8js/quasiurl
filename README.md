# QuasiURL

*`URL`-like object for templated URLs*

[![npm](https://img.shields.io/npm/v/quasiurl?labelColor=345&color=46e)](https://www.npmjs.com/package/quasiurl) ![Lightweight](https://img.shields.io/bundlephobia/minzip/quasiurl?label=minzip&labelColor=345&color=46e)

Installation: `npm i quasiurl`

Unlike `URL`, `QuasiURL`:
- can have an empty `origin`, `pathname`, `hostname`, `protocol`;
- preserves templating characters without URL-encoding them;
- doesn't implement the entire `URL` spec.

```js
import { QuasiURL } from "quasiurl";

new URL("/x").href
// TypeError: URL constructor: /x is not a valid URL.

new QuasiURL("/x").href
// "/x"

new URL("https://a.aa/x{/:name}").pathname
// "/x%7B/:name%7D"

new QuasiURL("https://a.aa/x{/:name}").pathname
// "/x{/:name}"
```
