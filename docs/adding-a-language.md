# Adding a new language to ZecHub

This page is for ZecHub maintainers and for anyone who wants to propose a new language for the wiki. It explains what a new language involves, who does what, what it costs and what to agree on before starting. The technical steps are in [Adding a new language](translation-contributor-workflow.md#adding-a-language) of the contributor workflow.

Figures were measured in October 2026 on `ZecHub/zechub` and `ZecHub/zechub-wiki` main.

## In short

A new language is not a one-off translation of a few pages. It is a new **locale** of the whole wiki:

- about **230 curated pages**, roughly **240,000 English words**;
- the website's own text (menus, buttons, banners): about **1,000 strings, 4,500 words**;
- a **glossary** that steers every machine translation in that language;
- a **permanent maintenance commitment**: every future change to an English page also creates work in the new language, for as long as the language stays on the site.

The pages are translated by the translation pipeline, so the machine cost is small. The real costs are **native review** and **long-term ownership**.

## What gets added

| Part | Where | Size | Who |
|---|---|---|---|
| Glossary: how Zcash terms are translated (shielded, viewing key, note…) and the writing rules (formal or informal "you", quotation marks, numbers, headings) | `translation/glossary/<locale>.json` | 64 shared terms plus style questions | Native reviewer fills a review file; the translation steward imports it |
| Menu labels | website dictionary and glossary phrases | about 120 labels | Same reviewer, second review file |
| Website text | `dictionaries/<locale>.json` in `ZecHub/zechub-wiki` | about 1,000 strings, 4,500 words | Machine draft, native review |
| Website code | `ZecHub/zechub-wiki`: locale lists (routing, language picker, dictionary loader, Open Graph locale) | small code PR | Steward or a developer |
| Wiki pages | `translations/<locale>/site/…` plus one manifest entry per page in `translation/sync-state.json` | 228 curated pages | Translation pipeline, then native review |
| Sidebar titles | `translation/menu-titles/<locale>.json` | generated | Pipeline |

Pages of a pipeline language are not translated by hand and added one PR at a time. Every translated file needs a manifest entry that records which English version it matches. Without it, CI fails and future English updates never reach the page. Adding a language therefore means a pipeline run by the steward, not a series of contributor PRs.

The site keeps working throughout: a page with no translation shows the English page, and the language appears on the site only once the website PR is merged.

## Roles

| Role | Responsibility | Time |
|---|---|---|
| **Proposer** | Asks for the language in an issue; may apply for the review bounty like anyone else | short |
| **Reviewer** (native speaker, selected through the Translation Quality bounty) | Reviews the glossary and menu files, then the top 10 translated pages; answers wording questions later | Glossary and menus: 2–3 h. Pages: see [Costs](#costs) |
| **Second native speaker** (volunteer) | After the first round is delivered, spot-checks part of the reviewer's glossary and menu answers. The [glossary rules](../translation/glossary/README.md) ask for a second reviewer; with only one speaker, a maintainer may accept a single reviewer and the next reviewer of that language confirms | about 1 h |
| **Translation steward** | Prepares the review files, imports the answers, runs the pipeline and the quality checks, opens the website PR | 1–2 working days at launch, then part of the regular sync windows |
| **Maintainers** | Decide whether to add the language, approve and pay bounties, merge the website PR | short |

## Steps

1. **Proposal and approval.** Open an issue that names the language and its variety (for example Brazilian or European Portuguese). Maintainers decide whether to add it; ZecHub then carries it **permanently**. Proposing a language does not make you its reviewer.
2. **Reviewer selection, then glossary and menus.** The reviewer is selected through a Translation Quality bounty, as for the other languages: an application and a short trial on the first 10 rows. The proposer and anyone else may apply. The reviewer fills the two review files (same format as the reviewed Italian and Indonesian files in `translation/glossary/test-fixtures/`). The steward checks the answers, a volunteer second native speaker spot-checks part of them, and the steward imports them. Every page translation is generated from the glossary, so translating pages first and fixing terms later means rewriting the pages twice.
3. **Machine translation of all pages**, in one or more pipeline runs, with the usual automatic checks (numbers, links, protected names, structure). Pages that fail a check are held back and show English.
4. **Website PR**: website dictionary and locale registration, previewed before merge.
5. **Native review of pages**, starting with the top 10 pages (Start Here). Corrections are sent to the steward as a list, not as PRs, so the manifest stays correct.
6. **Maintenance**: from then on, every sync window also updates the new language.

The native review in steps 2 and 5 is one **Translation Quality bounty in two stages**. Stage 1, the glossary and menus, is paid after validation. Stage 2, the top 10 pages after the pipeline run, is voluntary; contributors who do it can apply for a ZecHub retroactive grant.

## Costs

### Machine translation

- **Current pipeline (Codex):** one page in one language is one unit. A full language is about **228 units, roughly two sync windows**, plus retries. That capacity is not available for the other languages while it runs.
- **Pay-per-use API** (planned): estimated from the tokens per English word measured in an October 2026 model trial, multiplied by 240,000 words. Languages in non-Latin scripts use more tokens, so take the upper end. Prices change; check them before budgeting.

  | Model class | One-off cost for a whole language |
  |---|---|
  | Low-cost open models | about $15–25 |
  | Mid-range models | about $80 |
  | Top closed models | about $20–40 |

  Add about 20% for retries.
- **Ongoing:** with 19 languages today, each extra language adds about 1/19 (≈ 5%) to the cost of every future sync window.

### Native review

| Work | Size | Time (indicative) |
|---|---|---|
| Glossary and menus | 64 terms, about 120 labels | 2–3 h |
| Website text | 4,500 words | 2–3 h |
| Top 10 pages (Start Here) | about 3,500 words | about 4 h |

A full native review of every page is not realistic for one volunteer. The model used for the existing languages is: machine translation of everything; native review of the glossary, the menus, the website text and the most important pages; corrections when readers report problems.

### Steward and maintainer time

- Steward: 1–2 days at launch (review files, import and checks, pipeline runs, quality pass, website PR and preview), then a small share of every sync window.
- Maintainers: the decision, bounty payments, merging the website PR.

## Risks and safeguards

- **Unreviewed terms.** Without a reviewed glossary, the model picks its own terms and switches between them. Safeguard: no page run before the glossary is approved.
- **Reviews filled by an AI.** A review file filled by an AI instead of a native speaker looks plausible. Safeguards: a short application, a small trial before the full review, a check by a second native speaker, payment only after validation.
- **The reviewer leaves.** The pipeline keeps the translations in sync; only the human review stops. Agree upfront whether a language without a reviewer stays online.
- **Manual page PRs in a pipeline language** conflict with the pipeline and its manifest. All page changes in such a language go through the steward.
- **Other translated content** (newsletters, social channels) is outside the wiki pipeline. Propose it separately, with its own owner and budget (see the newsletter section of [CONTRIBUTING.md](../CONTRIBUTING.md)).

## Proposal checklist

- [ ] Language and variety named
- [ ] Proposer's GitHub and Discord handles
- [ ] Translation Quality bounty posted; reviewer selected (application, 10-row trial, second-native spot-check)
- [ ] Everyone involved agrees to: glossary and menus first; page corrections through the steward; no manual page PRs
- [ ] Maintainers agree to carry the language permanently, and to the budget (glossary and menus review, website-text review, optional page-review bounties)
- [ ] Decision recorded on what happens if the language loses its reviewer

## Summary for maintainers

| Question | Answer |
|---|---|
| Is the machine cost a problem? | No: about two sync windows today, or tens of dollars through an API |
| What do we commit to? | Permanent maintenance (about +5% per window), steward time, review bounties |
| What is the minimum for quality? | Reviewed glossary and menus, reviewed website text, reviewed top 10 pages |
| When to say no | No native reviewer found through the bounty, or no willingness to maintain the language long term |
