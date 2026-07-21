# Translation Contributor Workflow

## Structure

English content in `site/` remains the source of truth. Translated articles are stored at the matching path under `translations/<locale>/site/...`. Italian (`it`) is the pilot locale.

```txt
site/Using_Zcash/Shielded_Pools.md
translations/it/site/Using_Zcash/Shielded_Pools.md
```

If a translated file is missing, the wiki application renders the English article at the localized route. This lets contributors add translated articles incrementally.

## Adding Or Updating Translated Content

1. Start from the current English file in `site/`.
2. Create or update the matching `translations/<locale>/site/...` file.
3. Keep links, image URLs, JSX/MDX markup, code, product names, and protected terms intact.
4. Run `node scripts/check-protected-terms.mjs`.
5. Request technical review and review from a native-speaking contributor.

AI-assisted drafts are acceptable starting points, but they are not publication-ready until a native-speaking reviewer approves accuracy, tone, links, formatting, and protected terminology.
The same terminology check runs automatically on pushes and pull requests that modify translated content, its source pages, or the terminology manifest.

## Adding A New Language

The framework is locale-generic — Italian (`it`) is the pilot. To add another locale (for example Spanish, `es`):

1. **UI dictionary:** copy `dictionaries/en.json` to `dictionaries/<locale>.json` and translate the values, leaving the keys and any protected terms unchanged. The app loads it through `getDictionary(locale)`.
2. **Register the locale:** add `<locale>` to the app's `next-intl` locale configuration so `/<locale>/...` routes resolve. English stays canonical at unprefixed routes; other locales are served under their prefix with automatic English fallback.
3. **Content:** add translated Markdown under `translations/<locale>/site/...`, mirroring the English `site/` paths. Missing files fall back to English, so coverage can grow incrementally.
4. **Validation:** `node scripts/check-protected-terms.mjs` walks the entire `translations/` tree and validates every translated page against its English source under `site/`, regardless of locale — no per-locale configuration is needed. It passes cleanly when no translations exist yet.
5. **Review:** AI-assisted drafts are starting points only — a native-speaker reviewer must approve accuracy, tone, links, formatting, and protected terminology before merge.

## Italian Review Notes

- Pay close attention to `e` versus `è`: when it is the verb "is", use the grave-accented `è`.
- Keep `e` unaccented only when it is the conjunction "and".

## Protected Terms

The canonical validation list is `translation/protected-terms.json`. Terms listed in `preserveVerbatim` must remain unchanged wherever they occur in the English source. Proposed approved localizations must be discussed and added to the glossary before a translated page is merged.

## Translated Pages

The full, always-current list of translated pages (with per-category coverage)
is generated at `translations/TRANSLATION_STATUS.md` — run
`node scripts/gen-translation-status.mjs` to refresh it after adding pages.
Additional pages use the same `translations/<locale>/site/...` directory
convention.
