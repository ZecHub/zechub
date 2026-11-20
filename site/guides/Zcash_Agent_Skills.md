<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Agent_Skills.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Agent Skills: Current Zcash Knowledge for AI Coding Agents

[zcash-skills](https://github.com/zcashlabs/zcash-skills) is an open-source set of agent skills published by [Zcash Labs](/zcash-organizations/zcash-labs). A skill is a `SKILL.md` file that an AI coding agent reads before it works on a task, with longer reference notes beside it. This set exists because most models learned an older Zcash: in its own words, "`zcashd` is deprecated, the Orchard pool was sealed at NU6.3 in favor of Ironwood, and the dev stack is Zakura + lightwalletd/Zaino + the `librustzcash`/`zakura-*` crates."

This page summarises what the skills cover, how to install them and how far to trust them. It follows the repository as of November 15, 2026 (last change November 5, 2026). The project's [README](https://github.com/zcashlabs/zcash-skills#readme) is the reference.

## TL;DR

- **14 skills in two groups.** Eight general ones (wallets, payments, light clients, protocol rules, the Zakura node, the zcash.js SDK, Sprout migration, and a router that picks the right one) and six for working inside the [Thus Spoke Zakura](https://github.com/zcashlabs/thus-spoke-zakura) Regtest stack.
- **Install the whole folder.** The skills link to each other, so copying only some of them breaks the routing.
- **Facts are tracked in one table.** Version- and date-sensitive claims live in [`docs/versioned-facts.md`](https://github.com/zcashlabs/zcash-skills/blob/add-initial-skills/docs/versioned-facts.md), and a checker plus a nightly job flag skill text that disagrees with it.
- **Check dates before you rely on them.** The facts table was last verified in October 2026 and still lists NU6.3 as the deployed upgrade and NU7 as a draft. NU7 activated on Mainnet at block 3,543,405 on November 6, 2026 (see [NU7](/zcash-tech/nu7)).
- **MIT licensed.** The default branch is `add-initial-skills`, not `main`.

## The skills

| Skill | What it covers |
|:--|:--|
| `zcash` | The starting point when a task crosses wallet, payment, light-client, node or protocol boundaries, or when it is unclear which layer owns it |
| `zcash-wallet` | Accounts, seeds, keys, viewing keys, Unified Addresses, receiver selection and ZIP 321 payment requests |
| `zcash-payments` | Building, signing, sending, retrying and tracking payments: input selection, ZIP 317 fees, memos, expiry, confirmation |
| `zcash-light-client` | Compact-block sync, birthdays, note discovery, commitment trees, reorgs and wallet recovery against lightwalletd or Zaino |
| `zcash-protocol` | Consensus rules, network-upgrade activation, transaction formats (v5/v6), proof verification and node validation |
| `zcashjs` | The [`@zcashlabs/zcash.js`](/guides/zcash-js) SDK on Node.js and in browsers: chain queries, local wallets, sending, shielding, PCZT signing |
| `zakura` | Running or integrating the [Zakura](/zcash-tech/zakura-node) full node: zcashd compatibility mode, pruning and snapshots, Regtest, its experimental P2P v2 stack |
| `sprout-rescue` | Moving old Sprout funds with zcashd's migration tool (`z_setmigration`, `z_getmigrationstatus`) and the transparent-exposure tradeoff (see [Sprout](/zcash-tech/sprout)) |
| `ths` and five `ths-*` skills | Changes inside the Thus Spoke Zakura repository: the `ths` launcher, the wallet server, the dashboard, live Docker verification and releases |

The `zcash-*` skills are written to work with whatever node or library a project uses. The `ths-*` skills describe one repository, and the project tells agents to confirm their behaviour against that repository's own `AGENTS.md` and source.

Each skill states rules an agent tends to get wrong. A few examples from the general skills: keep amounts in integer zatoshis and format ZEC only for display; treat a send that timed out as an unknown outcome to reconcile, not a failure to retry blindly; a ZIP 321 request with an unknown `req-` parameter is invalid as a whole; ZIP 317's conventional fee is wallet policy, not a consensus rule.

## Installing

Clone the repository and copy the whole `skills/` folder into your agent's skills directory. The README gives two targets:

```bash
git clone https://github.com/zcashlabs/zcash-skills.git
cd zcash-skills
cp -r skills/* ~/.claude/skills/   # user-wide, Claude Code
cp -r skills/* .agents/skills/     # per-project, Devin-compatible agents
```

For an agent that reads a URL instead, point it at [`https://zcashlabs.github.io/zcash-skills/SKILL.md`](https://zcashlabs.github.io/zcash-skills/SKILL.md). That root file routes to the individual skills; it is an entry point, not a skill on its own. The same skill set is browsable at [zcashlabs.github.io/zcash-skills](https://zcashlabs.github.io/zcash-skills/).

To try the skills against a real stack, run [Thus Spoke Zakura](https://github.com/zcashlabs/thus-spoke-zakura), the disposable Regtest environment (node, light wallet server, dashboard, faucet and development wallet) that several skills are written around. ZecHub's [Thus Spoke Zakura on Akash](/guides/thus-spoke-zakura-akash) guide shows one way to host it.

## How the facts are kept current

Claims that go stale, such as upgrade heights, branch IDs, image tags and package versions, are kept in one table, `docs/versioned-facts.md`, each with a value, a "verified" date and a source. `python3 docs/check-facts.py` reports any skill text that contradicts the table, and `--upstream` also compares the table against the upstream sources it names. A nightly drift workflow fails on either kind of mismatch. Since November 5, 2026 the checker accepts GitHub sources only from official Zcash organisations.

This catches skill text that disagrees with the table, but not a table that has fallen behind the network. As of November 15, 2026 the table still describes NU7 as a draft with a November 5 activation target, and pins the Thus Spoke Zakura node image at `zakuracore/zakura:1.7.0`, while Zakura has since released 1.8.x. Check anything height-, version- or upgrade-related against the [NU7](/zcash-tech/nu7), [Zakura Node](/zcash-tech/zakura-node) and [Network Upgrades](/start-here/network-upgrades) pages or the ZIPs before you act on it.

## Evaluations

The repository includes [agent evaluations](https://github.com/zcashlabs/zcash-skills/blob/add-initial-skills/evals/README.md) separate from the fact checker. There are three source-investigation tasks on Thus Spoke Zakura, each with four review criteria, and seventeen routing requests (ten that should pick a given skill and seven near misses that should not). Each task is run twice on the same pinned source, once with the candidate skills and once without, in fresh read-only `codex exec` sessions with the same model settings. The README calls this "an explicit skill-loading ablation, not a native automatic-invocation test": it measures whether the skills help once loaded, not whether an agent finds them on its own.

## Limits

- **They are guidance, not a specification.** The [protocol specification](https://zips.z.cash/protocol/protocol.pdf) and the [ZIPs](https://zips.z.cash) remain the authority. The root `SKILL.md` itself warns agents that a draft ZIP, a wallet convention and a consensus rule carry different weight.
- **Snapshot in time.** Read the "verified" dates in the facts table. A skill that is right for one release can be wrong after the next network upgrade.
- **Narrow on purpose.** Six of the fourteen skills are specific to Thus Spoke Zakura. Projects built on Zebra, Zallet or the mobile SDKs get the general skills only.

## History

The `zcash-*` and `ths-*` skills were seeded from [amiabix/zcash-and-ths-skills](https://github.com/amiabix/zcash-and-ths-skills) and updated against the current Thus Spoke Zakura source. Zcash Labs created the repository on September 30, 2026, added the `zcashjs` and `sprout-rescue` skills in October, and has an open pull request for a ShieldedScan explorer skill.

## Related Pages

- [Zcash Labs](/zcash-organizations/zcash-labs): the organisation behind the skills, zcash.js and Thus Spoke Zakura.
- [Zcash JS Developer Guide](/guides/zcash-js): the SDK the `zcashjs` skill covers.
- [Thus Spoke Zakura on Akash](/guides/thus-spoke-zakura-akash): hosting the Regtest stack the `ths-*` skills describe.
- [Zakura Node](/zcash-tech/zakura-node): the full node the `zakura` skill covers.
- [Developer Resources](/start-here/developer-resources): the wider map of Zcash developer tools.

## Resources

- [zcashlabs/zcash-skills](https://github.com/zcashlabs/zcash-skills) (repository)
- [Skill index site](https://zcashlabs.github.io/zcash-skills/)
- [Versioned facts table](https://github.com/zcashlabs/zcash-skills/blob/add-initial-skills/docs/versioned-facts.md)
- [Agent evaluations](https://github.com/zcashlabs/zcash-skills/blob/add-initial-skills/evals/README.md)
- [zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura)

**Last updated:** November 2026
