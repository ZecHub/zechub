# Contributing to Turnstile

Turnstile is community infrastructure for the Ironwood transition. The most valuable
contribution right now is not code — it is **information**.

## The readiness board (no code required)

The board at [/readiness](https://turnstile-xi.vercel.app/readiness) tracks *public statements*
about Ironwood support. It is one JSON file: [`frontend/content/readiness.json`](frontend/content/readiness.json).

To correct or add a row, open a PR that:

1. Sets `status` to `ready`, `in-progress`, `at-risk`, or `unknown`.
2. Provides a `source` URL for any status other than `unknown` — a blog post, release notes,
   a GitHub release, or an official support page. **A status without a source will not be merged.**
   Inference ("they're actively developed, surely they're ready") is exactly what the board exists
   to replace.
3. Sets `verifiedOn` to the date you read the source.
4. Keeps the `note` to one factual sentence, no speculation.

If a wallet or exchange makes a statement after the board says `unknown`, that PR takes five
minutes and genuinely helps people decide what to do with their money.

## Guides

Migration guides live in [`frontend/content/guides/`](frontend/content/guides/) as plain data files.
Corrections to menu paths, version caveats, or wallet behaviour are welcome — cite where you
verified the steps (release notes, your own device, the wallet's docs).

## Code

```bash
# Rust — pure logic runs fast, no chain needed
cargo test -p turnstile-core

# Full workspace (needs protoc; first build fetches deps)
cargo test --workspace

# Frontend
cd frontend && npm install && npm test && npm run lint && npm run build
```

Ground rules, enforced by review and CI:

- **Never a spending key.** No code path may accept, parse, or request one. The word `seed`
  appearing in a diff will be read suspiciously.
- **Viewing keys are memory-only.** Never a log line, error message, URL, or database row.
  `ScanRequest`'s redacted `Debug` stays redacted.
- **No false all-clears.** A pool the key cannot see renders "not visible to this key", never `0`.
  The `Undetermined` verdict copy must never contain "ready" or "safe" — there is a test for this.
- Every `ready`/`in-progress` claim anywhere in the product carries a source.

## Reporting a security issue

If you find a way to make Turnstile leak a viewing key, accept a spending key, or show a safe
verdict to an at-risk wallet, please report it privately to the maintainer rather than opening
a public issue. That failure class is the one this project exists to prevent.
