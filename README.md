# quasiurl

*`URL`-like object for templated URLs*

Unlike `URL`, `QuasiURL`:
- can have an empty `origin`, `pathname`, `hostname`, `protocol`;
- preserves templating characters without URL-encoding them;
- doesn't implement the entire `URL` spec.
