/**
 * Unlike URL, QuasiURL:
 * - can have an empty `origin`, `pathname`, `hostname`, `protocol`;
 * - preserves templating characters without URL-encoding them.
 */
export class QuasiURL {
    hash: string;
    hostname: string;
    href: string;
    origin: string;
    pathname: string;
    protocol: string;
    search: string;

    constructor(url: string) {
        let head = url.match(/^((\w+:)?\/\/([^/]+))(\/.*|$)/);
        let tail = url.match(/(\?[^#]+)(#.+)?$/);

        let origin = head?.[1] ?? '';
        let pathname = url
            .replace(/^((\w+:)?\/\/[^/]+)/, '')
            .replace(/\?.*$/, '')
            .replace(/#.*$/, '');
        let search = tail?.[1] ?? '';
        let hash = tail?.[2] ?? '';

        this.origin = origin;
        this.pathname = pathname;
        this.search = search;
        this.hash = hash;

        this.href = `${origin}${pathname}${search}${hash}`;
        this.hostname = head?.[3] ?? '';
        this.protocol = head?.[2] ?? '';
    }
    toString() {
        return this.href;
    }
}
