# Image alt-text report

The image alt-text checker scans English Markdown pages under `site/` and
reports accessibility problems without failing CI. The translated corpus under
`site/zechubglobal/` is excluded from the default scan.

It recognizes:

- Markdown images such as `![description](image.png)`
- Markdown reference images such as `![description][image-ref]`
- Inline HTML `<img>` tags, including multiline tags

It ignores fenced code blocks, inline code, and HTML comments so examples that
are not rendered as page images do not inflate the report.

## Run locally

From the repository root:

```bash
node scripts/check-image-alt-text.mjs
```

To write the machine-readable result as JSON:

```bash
node scripts/check-image-alt-text.mjs --json image-alt-report.json
```

To test the parser:

```bash
node scripts/check-image-alt-text.test.mjs
```

## Placeholder alt text

The configurable placeholder list is stored in
`scripts/image-alt-placeholders.json`. It accepts two shapes:

```json
["logo", "img1"]
```

```json
{
  "exact": ["logo", "img1", "image", "alt text"],
  "patterns": ["^img\\s*\\d+$", "^https?://\\S+$"]
}
```

A bare array is still valid and means the same thing it always did, so an
existing configuration keeps working unchanged.

**To add a fixed phrase**, append it to `exact`. The comparison is
case-insensitive and collapses repeated whitespace, so adding `"photo"` flags
`alt="PHOTO"` and `alt="  photo  "`.

**To add a family of placeholders**, append a JavaScript regular expression
(as a JSON string) to `patterns`. Patterns are tested against the same
normalized form as `exact` entries, so they do not need to account for casing
or repeated spaces. A pattern that does not compile is a configuration error
and fails the job rather than silently matching nothing.

Patterns exist because some placeholder alt text cannot be enumerated. `img1`
was listed while `img2` through `img10` were not, so a bare sequence number was
reported as an acceptable description; `^img\s*\d+$` expresses the whole family
once, and keeps covering `img11` when a page adds one. `^https?://\S+$` catches
an image URL pasted into the alt attribute.

A descriptive phrase containing a placeholder word is not flagged: for example,
`"ZecHub logo on a dark background"` does not equal the placeholder `"logo"`,
and `"Figure 2 of the shielded pool"` is not matched by the numbered-image
pattern.

## Current English baseline

The default corpus is 222 English pages and 755 images, with 60 missing or
empty alt descriptions and 146 placeholder descriptions. These are observations
rather than a threshold: the report never fails on them, and the counts move as
pages are added and edited.

## CI behavior

`.github/workflows/image-alt-text-report.yml` runs the parser test and then
scans the English `site/` corpus (excluding `site/zechubglobal/`) on relevant pull requests and on manual
dispatch.

The scan is intentionally **report-only**. Missing, empty, and placeholder alt
text appears in the job log but does not make the workflow fail. Operational
errors such as a malformed placeholder configuration still fail so a broken
checker cannot silently report success.
