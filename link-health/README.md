# Link health

Weekly scan of the wiki's links, published to a single pinned dashboard issue.

Reporting only. The workflow never edits content and never opens a pull request.

## What it checks

Every link in `site/**/*.md`, including markdown links, images, and the inline
`src` / `href` attributes the icon markup uses. Links inside fenced code blocks
are skipped, since those are examples rather than live links.

| Category | Meaning |
|---|---|
| Domain does not resolve | DNS failure, the site is likely gone |
| Broken links | 4xx or 5xx response |
| Broken internal routes | An in-site link that resolves to no page |
| Missing assets | `/content-images/...` not present in the app repo |
| Certificate problems | TLS failure |
| Timeouts | No response within 15 seconds |
| Invalid URLs | Malformed or protocol-relative |
| Redirects | 3xx, worth pointing at the final destination |
| Duplicate URLs | The same external link repeated within one page |

## Internal routes

Resolving an in-site link is not a plain file lookup. The app converts a URL to a
filename by title-casing each word and turning hyphens into underscores, then
forcing a small set of words to lower or upper case, so `/zcash-use-cases/sign-in-with-zcash`
resolves to `site/Zcash_Use_Cases/Sign_in_With_Zcash.md` with a lowercase `in`.

`check-links.mjs` mirrors that conversion, including the loose fallback match the
app falls back on, so a link that works in production is not reported as broken.
If the rules in the app's `src/lib/helpers.ts` change, update `transformUri` here
to match.

Two things are deliberately not treated as broken routes:

- Pages served by the app rather than by markdown, such as `/wallets` and
  `/dashboard`. The route list is read from the app repo at scan time.
- Absolute links ending in `.md`, which point at repository files. The
  contributing docs use these on purpose.

## Allowlist

`allowlist.txt` holds substrings of URLs to skip. Use it for hosts that block
automated requests or rate-limit hard enough to produce false timeouts, not for
links that are genuinely broken.

```
x.com
medium.com
```

## Running it

```bash
node link-health/check-links.mjs                    # full scan
node link-health/check-links.mjs --offline          # routes and assets only, no network
node link-health/check-links.mjs --concurrency 20   # more parallel requests
```

Outputs `link-health.json` for machines and `link-health.md` for the issue body.

The workflow runs on Mondays and can be started by hand from the Actions tab.
Because a GitHub issue body is capped, the dashboard shows the first 40 rows per
category and says how many were left out; the complete list is attached to the
run as an artifact.
