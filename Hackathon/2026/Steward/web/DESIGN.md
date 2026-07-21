# Steward — Visual Identity

**Direction: "Ironwood."** Steward is a warm, **physical** heirloom instrument — a wooden
vault / an heirloom safe you'd pass down, not a fintech dashboard. The feeling is a lit hearth
in a wood-panelled room: alive while you tend it, gone cold when you're not. Every screen should
feel *warm, weighty, and hand-made*.

## Distinct from ZecAuth (this is a hard requirement)

ZecAuth's demo owns this signature — **do not reuse any of it**:
- cold near-black `#0b0a07` ground → Steward uses **warm ironwood** `#1A1411`.
- **gold** `#e7b43f` accent → Steward's hero is **oxblood/ember** `#C05C3C` (gold is demoted to a faint line, if used at all).
- **IBM Plex Mono** for data → Steward uses **Space Mono**.
- **mono-uppercase-letterspaced** eyebrow labels → Steward's labels are **engraved small-caps Fraunces**.
- horizontal **ledger-hairline** background → Steward's motif is **vertical wood-grain**.

Side-by-side, the two must read as different products by different teams.

## The two signatures (kept, re-cast in the hearth metaphor)

1. **The proof-of-life pulse = the hearth.** The dead-man's-switch is the soul, rendered as the
   owner's heartbeat. It beats warm (**ember**) while heartbeats are current; **flares** (`--flare`)
   as the deadline nears — the fire guttering; and **goes cold** (`--char`) when the switch trips —
   the hearth gone to ash, the owner gone. (Respects `prefers-reduced-motion`.)
2. **The quorum seal.** The `t-of-n` guardians as arcs of a ring — an iron band around the vault.
   Each guardian who approves lights their arc; when `t` are lit the band closes and it authorizes.

## Ambient state shift (the hearth)

The whole UI's `--state` accent tracks the vault's life, slow and dignified:
- **Active** → **ember** `#C05C3C` (the hearth is lit).
- **Waning** (grace window) → **flare** `#E0913F` (guttering — attention).
- **Recoverable** (tripped) → **char** `#6A625B` (gone cold; the warmth has left). The release CTA
  itself glows ember against the cold, so the guardians' action is unmistakable.

## Palette (Ironwood)

Warm ink-on-wood. Never a bright ground.

| Token | Hex | Role |
|---|---|---|
| `--ironwood` | `#1A1411` | base — warm brown-black |
| `--ironwood-raised` | `#241B15` | raised surfaces / cards |
| `--grain` | `#3B2D23` | wood-grain lines, borders, dividers |
| `--bone` | `#ECE1D0` | primary text — warm bone |
| `--bone-dim` | `#AB9884` | secondary text, captions |
| `--ember` | `#C05C3C` | **hero** — rust/ember; active state |
| `--flare` | `#E0913F` | waning state — hotter flame |
| `--char` | `#6A625B` | recoverable state — gone cold |
| `--brass-faint` | `#997643` | brass, **demoted** to a faint secondary line only |

## Typography

Self-hosted via `@fontsource` (no external CDN).

| Role | Face | Use |
|---|---|---|
| Display | **Fraunces** (soft old-style serif) | headings, the vault name, ceremonial numbers; also the **engraved small-caps eyebrow labels**. |
| Body / UI | **Instrument Sans** | interface text, buttons. |
| Data | **Space Mono** | the cryptographic ledger: ids, fingerprints, thresholds, timestamps, hashes, countdowns. (NOT IBM Plex Mono.) |

## The wood-grain motif

Replaces ZecAuth's ledger hairlines. A subtle **vertical** grain (`.woodgrain` in tokens.css) —
irregular warm streaks + a low hearth-glow from the top. Keep it quiet; text legibility wins.
Panels read as chamfered wooden plates (tight `--radius`, warm `--grain` borders).

## Structure — the multistep "Seal a vault" wizard

Sealing a vault is a ceremony, so it is a **multistep wizard**, one decision per step, not one
long scroll: **Network → Guardians & threshold → Heartbeat cadence → Heir → Review & seal**. A
slim step indicator (engraved marks, not a progress bar) shows where you are; Back/Next move
between steps; the final **Review** restates every choice before the irreversible "Seal the vault."

## Voice & quality floor

Plain, grave, active copy (owner, guardian, heir, heartbeat, quorum, release, sweep). Responsive to
mobile; visible keyboard focus (ember ring); `prefers-reduced-motion` respected. Consume
`web/shared/tokens.css`; never hardcode palette values.
