// Use-case presets for a vault, and the display metadata for a vault's purpose.
//
// A vault is created for a concrete purpose. The **inheritance** preset turns the
// dead-man's-switch ON (heartbeat + heir); every other preset is a **plain t-of-n
// multisig with the switch OFF** — which is exactly what proves the multisig claim.

/** One use-case preset shown on the wizard's first step. */
export interface Preset {
  id: string
  /** The label sent to the coordinator as `purpose` (and stored in the local index). */
  purpose: string
  /** The card title. */
  label: string
  /** A sensible default vault NAME to prefill on the wizard (the owner can edit it). */
  defaultName: string
  /** Default threshold `t`. */
  threshold: number
  /** Default guardian count `n`. */
  n: number
  /** Whether the dead-man's-switch is on: `true` (Inheritance), `false` (the plain-multisig
   *  presets), or `'toggle'` (Custom — the owner chooses with an explicit switch). */
  inheritance: boolean | 'toggle'
  /** The one-line description under the title. */
  line: string
}

export const PRESETS: Preset[] = [
  {
    id: 'inheritance',
    purpose: 'inheritance',
    label: 'Inheritance vault',
    defaultName: 'Inheritance vault',
    threshold: 2,
    n: 3,
    inheritance: true,
    line: 'Pass your shielded ZEC to an heir if your heartbeats ever lapse.',
  },
  {
    id: 'treasury',
    purpose: 'treasury',
    label: 'DAO / Treasury',
    defaultName: 'DAO treasury',
    threshold: 3,
    n: 5,
    inheritance: false,
    line: 'Org funds no one can move alone — a quorum must approve every spend.',
  },
  {
    id: 'family',
    purpose: 'family',
    label: 'Family / Shared',
    defaultName: 'Family vault',
    threshold: 2,
    n: 3,
    inheritance: false,
    line: 'A shared account; no single person can spend.',
  },
  {
    id: 'personal',
    purpose: 'personal',
    label: 'Personal cold vault',
    defaultName: 'Personal cold vault',
    threshold: 2,
    n: 3,
    inheritance: false,
    line: "Funds you can't drain alone — and guardians can restore you if you lose a device.",
  },
  {
    id: 'custom',
    purpose: 'custom',
    label: 'Custom',
    defaultName: 'My vault',
    threshold: 2,
    n: 3,
    inheritance: 'toggle',
    line: 'Set it up your own way.',
  },
]

/** Display metadata for a vault's purpose — used by the vault home + the "My vaults" cards. */
export interface PurposeMeta {
  /** A short kind name for the badge ("Inheritance", "Treasury", …). */
  kind: string
  /** A one-line description of the vault's job. */
  blurb: string
}

const META: Record<string, PurposeMeta> = {
  inheritance: {
    kind: 'Inheritance',
    blurb: 'Passes to an heir if the owner’s heartbeats lapse.',
  },
  treasury: {
    kind: 'Treasury',
    blurb: 'Org funds no one can move alone — a quorum must approve every spend.',
  },
  family: {
    kind: 'Family',
    blurb: 'A shared account; no single person can spend.',
  },
  personal: {
    kind: 'Personal cold vault',
    blurb: 'Funds you can’t drain alone — and guardians can restore you if you lose a device.',
  },
  custom: {
    kind: 'Shared vault',
    blurb: 'A t-of-n multisig; no single person can spend.',
  },
}

/** Look up display metadata for a purpose label, falling back by kind for unknown/empty labels
 *  (e.g. a vault sealed before presets, or one restored with an empty purpose). */
export function purposeMeta(
  purpose: string | undefined | null,
  inheritance: boolean,
): PurposeMeta {
  const key = (purpose ?? '').toLowerCase()
  if (META[key]) return META[key]
  return inheritance ? META.inheritance : META.custom
}

/** A short badge label for a vault kind — the purpose's `kind` name. */
export function kindBadge(purpose: string | undefined | null, inheritance: boolean): string {
  return purposeMeta(purpose, inheritance).kind
}
