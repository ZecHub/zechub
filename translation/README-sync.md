# Translation staleness tracking

Curated translations under `translations/<locale>/site/**` are point-in-time
snapshots of the English source under `site/**`. When an English page changes,
every locale's copy silently goes stale — and with the runtime Google Translate
widget removed from the frontend, a stale curated page is what the reader sees,
permanently, until it is re-synced. This directory holds the machinery that
detects that staleness deterministically.

## Files

| File | Role | Introduced |
|------|------|-----------|
| `protected-terms.json` | Verbatim terms the validator enforces in translations | (pre-existing) |
| `curated-pages.txt` | Canonical curated page list (paths relative to `site/`), one per line | PR1 |
| `sync-state.json` | Per-locale, per-page provenance manifest (see below) | PR1 |
| `lib/normalize-hash.mjs` | Pure normalized-hash module (shared by detection + operator agent) | PR1 |
| `lib/normalize-hash.test.mjs` | Unit tests for the hash module (`node --test`) | PR1 |
| `seed-sync-state.mjs` | Re-runnable seeder that regenerates the two data files above | PR1 |
| `detect-staleness.mjs` | Deterministic detector: classifies each page per locale | PR2 |
| `check-invariants.mjs` | Blocking CI: manifest ⇔ translations ⇔ curated-list bijection | PR3 |

## The manifest (`sync-state.json`)

```jsonc
{
  "it": {
    "guides/Zgo_Payment_Processor.md": {
      "src": "sha256:…",         // normalized hash of the English source this
                                 // translation was made from — the staleness key
      "src_commit": "…",         // commit the source was read at (audit only)
      "engine": "llm",           // llm | nllb | gt
      "mode": "seed",            // seed | diff | full
      "tool": "gpt-5.4",         // generator tag, for reproducibility
      "edited": false            // true once a human hand-edits — blocks machine clobber
    }
  }
}
```

**Staleness** = current normalized hash of `site/<page>` ≠ recorded `src` for
that locale. Computable with one tree walk plus a JSON diff — no LLM, no API
calls, no PR-history archaeology.

**Normalized, not raw blob SHA.** A raw SHA flips on trailing-newline changes, a
frontmatter `date:` bump, or a repo-wide reformat — none of which change the
translatable prose. `lib/normalize-hash.mjs` strips that churn conservatively
(line endings, volatile frontmatter keys, trailing whitespace, trailing blank
lines) and hashes the result. It deliberately does not canonicalize markdown
formatting: it errs toward flipping the hash, because over-reporting only costs
a little retranslation while under-reporting serves a stale page forever.

## Engine split

| Engine | Locales | Diff-aware? |
|--------|---------|-------------|
| `llm`  | it fr es pt de ar zh hi ru ja ko tr uk (13) | yes — applies only the English delta, preserves prior fixes |
| `nllb` | sw yo ig (3) | no — whole changed page regenerated locally |
| `gt`   | ak ee (2)    | no — whole changed page regenerated (offline GT-static) |

The manifest and gates are identical across all 18 locales; only the operator
agent's *translate* step branches on `engine`.

## Regenerating the data files

```bash
node translation/seed-sync-state.mjs --commit "$(git rev-parse HEAD)"
node --test translation/lib/normalize-hash.test.mjs
```

The seeder stamps the present (every locale fresh at the current source hash);
it never reconstructs history. Real staleness accrues only as `site/` changes.

## Known gate limit: copy, then retire (Q5)

The gate identifies a moved translation by matching its normalized text to a
manifest key removed in the same comparison. Copying a page or locale to a new
key while retaining the old key gives it no predecessor. The new record can
therefore claim a newer `src` without a changed translation or a human exception.
Retiring the old key in a later PR does not recover that relationship. This can
leave stale text marked current indefinitely; it is a freshness gap.

Round 9 accepts this limit under the constraints of one content matcher and no
new false refusals. Searching all base entries would also match legitimate new
translations: English passthrough pages already share text across locales.
Even a unique matching hash does not establish that a new translation was copied
rather than independently produced. Allowing ambiguous additions leaves the
copy route open; refusing them blocks honest seeding. A manifest field declaring
an addition to be a seed cannot independently establish its provenance either.

For a move, retain the old record's `src` unless the translation actually changes
or a human verifies it. Prefer moving the key and file in one PR so the existing
predecessor check can apply. This is an operating convention, not enforcement of
the split-PR case. Closing that case requires revisiting the evidence or the
acceptance policy; the gate does not certify the provenance of new keys.
