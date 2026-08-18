# Translation Contributor Workflow

## Structure

English content in `site/` is the source of truth. A translated article lives at the matching path under `translations/<locale>/site/...`:

```txt
site/Using_Zcash/Shielded_Pools.md
translations/it/site/Using_Zcash/Shielded_Pools.md
```

Eighteen locales are live — `ar de es fr hi it ja ko pt ru tr uk zh`, `ig sw yo`, `ak ee` — across the 203 pages listed in `translation/curated-pages.txt`, so 3,654 translated pages in total. The remaining English pages under `site/` are not curated for translation. When a translation is missing the wiki renders the English article at the localized route, so coverage can grow one page at a time.

## How translations are produced

Almost all of them are machine-generated and then reviewed. An operator-run sync pipeline compares each English page against the revision its translation was made from and re-translates whatever moved. `translation/sync-state.json` records, per locale and page, which English revision the translation came from and which engine produced it.

| Engine | Locales | Behaviour when the English page changes |
|--------|---------|------------------------------------------|
| LLM | `ar de es fr hi it ja ko pt ru tr uk zh` (13) | applies only the English delta, preserving earlier fixes in untouched blocks |
| NLLB | `ig sw yo` (3) | regenerates the whole page locally |
| GT-static | `ak ee` (2) | regenerates the whole page |

That is the standing assignment, in the `ENGINE` map in `translation/seed-sync-state.mjs`. Each manifest entry separately records the engine that actually produced *that* page, and the two can differ — `ak` and `ee` each have one page recorded as `nllb` rather than `gt`. Trust the entry for what happened and the map for what maintains the locale next.

**Read [`../translation/README-sync.md`](../translation/README-sync.md) before changing anything under `translations/`.** It documents the manifest and the staleness model that the blocking CI gate enforces.

Two consequences matter to a contributor:

- **Machine output is a draft.** A page is not publication-ready until a native-speaking reviewer has approved accuracy, tone, links, formatting and terminology. The pipeline guarantees freshness, not quality.
- **A hand-edit has to be recorded.** A translated file that changed with no matching change in the manifest is indistinguishable from a stale page nobody re-synced, so CI rejects it.

## Editing an existing translation

1. Start from the current English file in `site/` and make the edit in `translations/<locale>/site/...`.
2. Keep links, image URLs, JSX/MDX markup, code and protected terms intact.
3. Record the pass in that page's `translation/sync-state.json` entry by appending a tag to `tool` — `"gpt-5.4"` becomes `"gpt-5.4+linkrepair"`. The field is free-form; it exists so the edit leaves a trace.
4. Run the gates below, then request both a technical review and a review from a native-speaking contributor.

Two manifest fields are easy to get wrong:

- **`edited: true` is not the way to record an edit.** It marks a human-authored fix you want protected from future machine re-translation, and it does that by **removing the page from automated sync permanently** — English updates stop reaching that locale from then on. Setting it to defend a wording preference costs the page every future update. It also only counts as a reason for a change in the pull request that flips it; a page already marked `edited` is not licensed to keep changing without provenance.
- **Never bump `src` by hand without changing the file.** A hash bump alone marks a stale translation fresh, which is the exact failure the manifest exists to prevent, so CI rejects it with no escape hatch.

AI-assisted drafts are acceptable starting points anywhere in this workflow, on the same condition: a native speaker approves before merge.

## Adding a translation for a page that has none

Normally the sync pipeline does this. If you add the file by hand, it needs a manifest entry **in the same commit**, or `manifest-invariants` fails: a translated file with no provenance is precisely the orphan that check exists to catch. The page must also appear in `translation/curated-pages.txt`, or the entry is rejected as non-curated.

The one field you cannot simply type is `src`, the normalized hash of the English source. Compute it with the same module the gate uses:

```bash
node -e 'import("./translation/lib/normalize-hash.mjs").then(async m => {
  const fs = await import("node:fs");
  console.log(m.hashPage(fs.readFileSync(process.argv[1], "utf8")));
})' site/<Category>/<Page>.md
```

Then add, inside that locale's block in `translation/sync-state.json`:

```json
"<Category>/<Page>.md": {
  "src": "sha256:…",
  "src_commit": "<commit you read the English page at>",
  "engine": "llm",
  "mode": "full",
  "tool": "<what produced it>",
  "edited": false
}
```

`engine` must be one of `llm`, `nllb`, `gt` and `mode` one of `seed`, `diff`, `full`; `src_commit` is an abbreviated or full object id. Getting `src` wrong is worse than leaving the page untranslated: a hash that doesn't match the English source declares a freshness that isn't there, and the page will never be picked up as stale.

## Protected terms

`translation/protected-terms.json` is the canonical list — 89 entries under `preserveVerbatim`. Wherever an English page uses one of them, that page's translation must contain it too. Product names, upgrade codenames, wallets, address formats and cryptographic primitives stay in English so a reader meets the same string in wallets, block explorers, ZIPs and the forum.

Proposing a localization for a term instead is a maintainer decision, discussed before the translated page is merged.

### Equivalent forms

Some terms are one word in two shapes. `equivalentForms` declares which:

```json
"equivalentForms": [
  ["ZK-SNARK", "ZK-SNARKs"]
]
```

Any member of a group satisfies the others **in a translation**, so a language that does not pluralize English loanwords is not forced to carry a shape its grammar rejects. The English source side still tests the exact term, because the English page really does use that form.

The pairing is always declared by a maintainer, never inferred from spelling: `Argos` is not a plural of `Argo`, and `CSS` is not a plural of `CS`. A malformed group is a hard error rather than a silent no-op — every member must already appear in `preserveVerbatim`, no term may appear in two groups, and a group needs at least two distinct entries with no surrounding whitespace.

### Plurals

Prefer protecting the singular. Whether an English loanword takes an `-s` is a decision each language makes for itself: Italian writes *gli Unified Address* because it does not pluralize borrowed nouns, and Japanese, Korean and Chinese do not inflect plurals at all. Translate the singular verbatim and pluralize the way your language does.

### Explaining a term

Keep the term and add a short localized gloss in parentheses **on first use in the page**, then use the term alone afterwards:

```md
La Viewing Key (chiave di visualizzazione) consente di visualizzare i dettagli
delle proprie transazioni schermate senza poter spendere i fondi.
```

Term first, because the English string is what the reader meets again elsewhere; the gloss teaches the concept once.

This applies to compound terms whose English words state the meaning — `Unified Address`, `Viewing Key` — and **not** to codenames such as `Sapling`, `Orchard`, `Halo` or `Zebra`, where the literal meaning is irrelevant and a gloss actively misleads: `Sapling (alberello)` tells an Italian reader that a network upgrade is a small tree.

The convention is editorial, not a gate — the check tests only that the term is present, so a glossed and an unglossed first mention both pass. Machine translation is not expected to apply it, because the pipeline re-translates block by block and cannot know whether an earlier block already glossed the term. It is an improvement a reviewer makes while already working in a page.

The full rules — where not to gloss, RTL nesting, the per-category breakdown — are in `docs/translation-protected-terms.md` in the frontend repo (`ZecHub/zechub-wiki`), which also carries a categorized copy of the term list at `src/constants/protectedTranslationTerms.ts`. **`translation/protected-terms.json` in this repo is the list CI enforces.** The categorized copy has drifted from it in both directions — it carries codenames this list does not protect, and omits terms this list does — so check a term against this file before assuming it is enforced.

## Validation

Five jobs run on **every** pull request, and on pushes to `main`. There is deliberately no path filter: `manifest-invariants` and `menu-titles-fresh` are required checks, and a required check that is skipped on unrelated pull requests leaves them stuck at "Expected — waiting for status". So expect these jobs on a pull request that touches no translation at all.

Each one is reproducible locally. CI resolves the base ref from the pull request; substitute your own:

| Job | Run it locally | What it checks |
|-----|----------------|----------------|
| `protected-terms` | `node scripts/check-protected-terms.mjs --base origin/main` | every protected term the English page uses survives in the translation |
| `manifest-invariants` | `node translation/check-invariants.mjs --base origin/main` | manifest ⇔ files ⇔ curated list, plus the two provenance rules above |
| `hash-lib-tests` | `node --test translation/lib/*.test.mjs` | the pure hash, title and term-form modules |
| `menu-titles-fresh` | `node translation/gen-menu-titles.mjs --check` | generated menu-title manifests match the content |
| `frontmatter-parity` | `node scripts/check-frontmatter.mjs --base origin/main` | a translation declares the same leading YAML block as its English source |

`--base` scopes the terminology gate to what your change actually did. It fails only on a violation your change **introduced** — one that did not exist for that page and locale at the merge base. Two other kinds are reported as notices instead of failures: violations already present at the base, and violations that come from an English page edited after the translation was last synced, which are the sync pipeline's work rather than yours.

Run it with no `--base` for a whole-tree audit:

```bash
node scripts/check-protected-terms.mjs
```

Do that as well whenever you change `translation/protected-terms.json`, since a scoped run judges a change to the term list partly by that change's own configuration.

### Front matter

If `site/<page>.md` starts with a YAML block, every translation of it must start with the same block, copied verbatim:

```
---
published: 2025-08-19
---
```

Do not translate the key, do not translate the date, and do not add a block to a page whose English source has none. A stray `---` is not cosmetic: Jekyll builds the GitHub Pages copy of this repo from `main`, reads a leading `---` as a front-matter opener, scans to the next `---` far down the page, and fails the build for the whole site. That happened on 2026-08-14 and the published site stayed frozen for four days — and because the Pages build only runs after a merge, `frontmatter-parity` is the only place a pull request can be stopped.

Three quieter shapes break nothing and are caught by the same job: an empty block ahead of the real one, a translated key such as `wotae:` or `bipụtara:`, and a lost opening `---` with the closing one still there. All three put the date into the page as visible text or lose it entirely.

`--base` scopes this job the same way as the terminology gate; run it bare for a whole-tree sweep.

## Adding a new language

The framework is locale-generic. Adding a locale spans both repositories:

**In the frontend repo (`ZecHub/zechub-wiki`):**

1. Copy `dictionaries/en.json` to `dictionaries/<locale>.json` and translate the values, leaving the keys and any protected terms unchanged. The app loads it through `getDictionary(locale)`.
2. Register `<locale>` in the app's `next-intl` locale configuration so `/<locale>/...` routes resolve. English stays canonical at unprefixed routes; every other locale is served under its prefix with automatic English fallback. That repo is authoritative for both of these steps — nothing in this one can validate them.

**In this repo:**

3. Add `<locale>` to the `ENGINE` map in `translation/seed-sync-state.mjs`, naming the engine that will maintain it. Nothing tracks the locale until this exists: the staleness detector enumerates the manifest, so an unseeded locale is never checked for drift and no English update will ever reach it.
4. Add translated Markdown under `translations/<locale>/site/...`, mirroring the English `site/` paths, **each file together with its manifest entry** (next section). A locale may legitimately be missing curated pages — a missing translation falls back to English — but a translated file with no manifest entry is a hard failure, reported twice over: once as a locale with translations and no manifest block, and once per file with no provenance.
5. Have a native speaker approve accuracy, tone, links, formatting and protected terminology before merge.

`scripts/check-protected-terms.mjs` needs no per-locale configuration; it validates any locale it finds against the English source.

**Do not run `translation/seed-sync-state.mjs` to produce those entries.** It is a whole-corpus operator tool that stamps every locale as freshly seeded at the current source hash. Against a manifest that already holds real provenance it refuses outright and tells you to pass `--force` — and `--force` erases the diff history and resets every `edited: true` to `false`, un-protecting hand fixes. No gate catches that, because none of the translated files change. Adding a locale in practice means an operator sync run, not a re-seed.

## Italian review notes

- Pay close attention to `e` versus `è`: when it is the verb "is", use the grave-accented `è`.
- Keep `e` unaccented only when it is the conjunction "and".

## Translated pages

The full, always-current list of translated pages, with per-category coverage, is generated at `translations/TRANSLATION_STATUS.md` — run `node scripts/gen-translation-status.mjs` to refresh it after adding pages.
