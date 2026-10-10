# Translation glossaries

This folder holds the word lists that native speakers have reviewed for the
ZecHub wiki translations. Each list says how a Zcash word is written in one
language, which renderings are wrong, and how the reader is addressed. The
translation robot, the menu translator and the CI checks all read the same
files, so a decision made once applies everywhere.

## Files

| File | What it is |
|---|---|
| `terms.en.json` | The shared English list: every word that needs a decision, with its meaning and the English forms to look for. One list for all languages. |
| `<loc>.json` | One file per language (`id.json` for Indonesian, `sw.json` for Swahili, ...). The decisions for that language. |
| `schema.json` | JSON Schema describing both kinds of file. |
| `lib/glossary.mjs` | Loader, validator and matcher. Pure code, no file access. |
| `validate.mjs` | Checks every file. Runs in CI. |
| `review-kit.mjs` | Turns a glossary into a review table (`export`) and a filled table back into the glossary (`import`). Logic in `lib/review-kit.mjs`. |
| `prompt-template.md` | The part of the translation prompt that is the same for every language. |
| `render-prompt.mjs` | Prints the prompt for one page of one language. Logic in `lib/render-prompt.mjs`. |
| `test-fixtures/` | The two real Indonesian review tables, and the hand-written prompt heads the generated ones replace (`legacy-heads/`), used by the tests. |

Names of products, companies and protocols (Zcash, Orchard, Zashi, ...) are
not in these files. They stay in English in every language and are listed in
`translation/protected-terms.json` under `preserveVerbatim`. A word is either
a protected name or a glossary entry, never both; CI checks this.

## How prompts are generated

The translation robot sends a language model an instruction text (the
"prompt head") in front of each page or block. It is built from these files,
so a glossary decision reaches the model without anyone copying it by hand:

```
node translation/glossary/render-prompt.mjs id guides/Raspberry_Pi_4_Full_Node.md
node translation/glossary/render-prompt.mjs id guides/Raspberry_Pi_4_Full_Node.md --text-file block.md
node translation/glossary/render-prompt.mjs id ui/dictionary --ui --text-file labels.txt
```

The output is `prompt-template.md` with its placeholders filled from
`<loc>.json`:

| Placeholder | Comes from |
|---|---|
| `{{LANGUAGE}}` | `meta.language_name` |
| `{{VARIETY}}` | `style.variety`, which completes "Translate into ..." (`natural, fluent German`) |
| `{{REGISTER}}` | `style.register`: the first rule whose folder prefix matches the page path wins, else `default`; `--ui` uses `ui`. Same logic as the runner's old `prompt_register.json`. |
| `{{STYLE}}` | `loanwords` or `loanwords_text`, `english_in_brackets`, `capitalise_kept_english_at_sentence_start`, `numerals`, `decimal_separator`, `quotes` |
| `{{TERMS}}` | approved `terms` and `phrases` whose English forms occur in the page (or in `--text-file`), one line each: target, examples, inflection, context and `Never "..."` for rejected renderings |

- Only `approved` entries are listed. A `draft` or `disputed` entry never
  reaches the model.
- Pages get entries with `applies_to` `pages` or `both`; `--ui` gets `ui` or
  `both`.
- Filtering by the text keeps prompts short and stops the model forcing a
  term into a block that does not contain it. A full-page call passes the
  whole page, so it sees every term the page contains.
- `loanwords_text` is for a loanword rule the two values of `loanwords`
  cannot express ("may remain in Latin script where that is the natural
  usage"); it is printed as written.
- `examples` adds a target-language example to the brackets or capitals
  rule, printed as "(e.g. ...)". Small local models follow a rule more
  reliably with an example.

The 13 languages that had only a hand-written head (ar de es fr hi it ja ko
pt ru tr uk zh) have a glossary with `meta`, `style` and the one term rule
their head stated (`node`). Those entries are `approved` with
`reviewed_by: ["@steward (legacy prompt head)"]`: they were the steward's
rules, not a native-speaker review, and the first reviewer of each language
is asked to confirm them.

`lib/render-prompt.test.mjs` checks that every line of the 14 retired heads
(copies in `test-fixtures/legacy-heads/`) has a home in the template, a style
field or a glossary entry (`legacyCoverage()`), and that the Indonesian head
for a real `guides/` page contains every old term line that applies to it,
with the `kamu` register, while a `Zcash_Tech/` page gets `Anda`.

## How a review works

1. **The steward exports a kit.** A kit is a Markdown file with tables, one
   row per word or menu label:

   ```
   node translation/glossary/review-kit.mjs export id --kit pages --out id-pages.md
   node translation/glossary/review-kit.mjs export id --kit ui --dict <website>/dictionaries/id.json --en-dict <website>/dictionaries/en.json --out id-ui.md
   ```

   `--brands <website>/scripts/lib/menu-source.mjs` (or a text file with one
   name per line) adds the website's `MENU_BRANDS` to the names that are
   listed instead of reviewed. `--no-evidence` skips the corpus counts.

   The pages kit lists the words used in wiki pages, with how often they occur
   in English and what the translated pages contain today. The UI kit lists
   the website menu labels. Both start with a list of open conflicts, and the
   pages kit ends with style questions (formal or informal "you", English in
   brackets, and so on).

2. **A native speaker fills the ✅ column.** For each row they write one of:

   | They write | Meaning |
   |---|---|
   | `OK` | The proposed rendering is right. |
   | `keep English` or `keep "proof"` | Use the English word itself. |
   | a single rendering, such as `Top Up Seluler` | Use this instead. The old proposal is recorded as a wrong rendering. |
   | two renderings or a note about verb and noun | A maintainer decides how to record it (see below). |
   | nothing | Not reviewed; nothing changes. |

   Notes go in the Notes column. The kit stays in English; no translation of
   the instructions is needed.

3. **The steward imports the kit.**

   ```
   node translation/glossary/review-kit.mjs import id filled.md --reviewer "@handle" --date 2026-10-09
   ```

   Without `--write` it prints what would change. With `--write` it updates
   `id.json`, raises `version` by one and adds a `changelog` entry. Rows the
   tool cannot read without guessing (two renderings in one cell, a verb and
   noun split, free-text style answers, a label that clashes with another
   entry) are listed under "needs maintainer" with a JSON stub. A maintainer
   completes those by hand. The importer never changes approved entries that
   the kit did not include.

4. **A pull request** changing only `translation/glossary/<loc>.json` goes to
   review. Attach the filled kit or commit it under `translation/glossary/kits/`.

## How to submit a review

- **If you use GitHub:** fill the kit, run the import with `--write`, and open
  a pull request. Put the filled kit in the pull request.
- **If you do not:** send the filled kit to the translation steward (on the
  ZecHub Discord or as a GitHub issue). The steward imports it, opens the pull
  request and credits you in `reviewed_by`. Tell the steward which name or
  GitHub handle you want to be credited with; a generic description is used
  if you prefer not to be named.

## Who approves

A pull request that marks entries `approved` needs:

- one review by a ZecHub maintainer, for the process and the file format, and
- one review by the language lead, or by a second native speaker who did not
  write the change, for the content.

For a new language with only one speaker, a maintainer may accept a single
reviewer; the next reviewer of that language is asked to confirm.

Changing an approved word later means existing pages may need fixing, so the
pull request should say how many pages use the word. Never merge a glossary
change while a translation sync is running: the sync refuses to push when
`translation/` changes under it.

## File format in short

`terms.en.json`:

```json
{
  "version": 1,
  "terms": [
    {
      "id": "shielded",
      "english": "shielded",
      "pos": "adjective",
      "definition": "Protected by Zcash's zero-knowledge encryption ...",
      "match": ["shielded", "Shielded", "unshielded"],
      "category": "protocol",
      "default_policy": "translate",
      "applies_to": "both"
    }
  ]
}
```

- `match` lists the English forms to look for. Matching is case-sensitive and
  whole-word. Forms are listed, never guessed: a tool that stripped a final
  "s" would treat `Argos` as `Argo`.
- `category` is `concept`, `protocol`, `ui` or `style-word`.
- `default_policy` (`translate` or `keep-english`) is only a suggestion shown
  to the first reviewer of a new language.
- `applies_to` is `pages`, `ui` or `both`.

`<loc>.json` has `locale`, `version`, `meta` (language name, script, engine),
`style` (variety, register, brackets, loanwords, abbreviations), `terms` (keyed by the
id from `terms.en.json`), `phrases` (menu labels and fixed phrases, keyed by
their exact English), `gates` and `changelog`. Each term or phrase has:

| Field | Meaning |
|---|---|
| `target` | The approved rendering. |
| `forms` | Every form a checker accepts (plural, verb and noun, capitalised). Must include `target`. Defaults to `[target]`. |
| `keep_english` | `true` when the rendering is the English word. |
| `rejected` | Known wrong renderings. Each can be limited: `word` (whole word only), `ci` (ignore case), `only_when_english_has` / `unless_english_has` (only where the English says, or does not say, a given word). |
| `context` | When the entry applies. |
| `applies_to` | `pages`, `ui` or `both`. |
| `status` | `draft` (not enforced), `approved`, or `disputed` (not enforced). |
| `reviewed_by`, `reviewed_at`, `source` | Who approved it, when, and which kit row it came from. |

Example of a limited rejection: Indonesian `terenkripsi` is wrong for
"shielded" but right for "encrypted", so it is rejected only where the English
contains "shielded" and does not contain "encrypt".

## Rules CI checks

`node translation/glossary/validate.mjs [--base <ref>]`:

1. Every term id exists in `terms.en.json`.
2. `target` is in `forms`, and no rejected rendering matches an accepted form.
3. Two approved entries do not render the same English two ways (for example
   "Tools" as *Alat* and, inside "Privacy Tools", as *Tools*) unless both say
   when they apply in `context`.
4. `keep_english` entries use the English word.
5. Approved entries name a reviewer and a date.
6. No entry is also a protected name.
7. With `--base`: changing an approved entry raises `version` by exactly one
   and the changelog names the change.
8. Every folder named in the register rules exists under `site/`.

The unit tests run with `node --test translation/glossary/lib/*.test.mjs`.
