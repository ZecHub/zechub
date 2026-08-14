<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zakura Node na ɔkyerɛwee

> 🇧🇷 [Versão em Portugalfo na wɔwom](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura yɛ free, open-source full node implementation ma Zcash, wɔasi ama scale. Forked fi [Zebra](Zebra_Full_Node.md) na ɛnam **Valar Kuw** ne **Project Tachyon** ntam adwumayɛ so na ɛyɛɛ no, Zakura de synchronization a ɛyɛ ntɛmntɛm kɛse, native block pruning, ne compatibility layer ma agyapade ma `zcashd` nnwinnade a wɔde yɛ adwuma. Wɔyii Version 1.0.0 adi wɔ July 15, 2026.

---

## TL;DR

- Zakura yɛ **consensus-compatible Zcash full node** — ɔkwan foforo a wɔfa so yɛ Zebra ne zcashd, forked fi Zebra.
- Blockchain sync yɛ bɛyɛ **5× ntɛmntɛm sen Zebra**; snapshot bootstrapping wie wɔ **wɔ simma 2 ase**.
- **Native block pruning** ma adwumayɛfoɔ kwan ma wɔyɛ node a ɛyɛ pɛpɛɛpɛ a disk space sua koraa (~11 GB pruned snapshot vs. 300 GB ma Zebra node a ɛyɛ ma).
- **zcashd RPC compatibility mode** ma sika kotokuo ne nkabom a ɛwɔ hɔ dada no yɛ adwuma a wɔnyɛ nsakraeɛ biara.
- **sɔhwɛ P2P akwantuo layer** (a wɔagyae no default) de n’ani si sub-500ms block propagation so ne DoS-resistant gossip.
- Ɛne **Ironwood (NU6.3)** hyia, Zcash ntwamutam nkɔsoɔ no yɛɛ adwuma wɔ afe 2026 mfimfini.
- **Sean Bowe** (Zcash a ɔka wɔn a wɔhyehyɛɛ, Project Tachyon) ne **Dev Ojha** (Valar Kuw) na wodi wɔn anim.

---

## Dɛn ne Zakura?

Zakura yɛ Zcash full node a wɔayɛ no fi fam sɛ ɛbɛyɛ production-ready wɔ scale. Bere a ɛne Zebra kyɛ adwene a ɛne ne ho hyia — a ɛkyerɛ sɛ ɛgye tom na ɛdi Zcash protocol mmara koro no ara akyi — Zakura de mfiridwuma mu nkɔsoɔ kɛseɛ ba a ne botaeɛ ne sɛ ɛbɛbrɛ akwansideɛ a ɛwɔ Zcash node a ɛyɛ ma a wɔde tu mmirika no ase.

Dwumadie no yɛ mmɔdenbɔ a **Project Tachyon** (Sean Bowe, Zcash mfitiaseɛ cryptographic engineers no mu baako na ɔdi anim) ne **Valar Group** (Dev Ojha na ɔdi anim) abom. Wɔbom de wɔn adwene si awo ntoatoaso a edi hɔ Zcash protocol nkɔso so, na Zakura som sɛ reference node ma saa adwuma no.

---

## Nneɛma Titiriw a Ɛwɔ Hɔ

### 5× Nkɔnsɔnkɔnsɔn a Ɛyɛ Ntɛmntɛm Synchronization

Zakura nya bɛyɛ 5× ntɛmntɛm blockchain synchronization sɛ wɔde toto Zebra ho a. Eyi ma ɛyɛ nea mfaso wɔ so kɛse ma adwumayɛfo a ɛsɛ sɛ wɔtwitwa node bi ntɛmntɛm anaasɛ wɔsan nya ahoɔden fi bere a wɔde ayɛ adwuma no mu.

### Snapshot Bootstrapping a wɔde yɛ adwuma

Zakura tintim nkɔnsɔnkɔnsɔn mfonini ahorow a wɔadi kan ayɛ a ɛtew bere a wɔde yɛ sync mfiase no so kɛse:

| Bootstrap Ɔkwan a Wɔfa so Yɛ | Bere |
|-----------------|------|
| Archive mfonini a wɔde asie | ~simma 37 |
| Pruned snapshot a wɔatwa no | **Ase simma 2** |
| Zebra (a ɛyɛ pɛpɛɛpɛ) | ~ nnɔnhwerew 20 |

Pruned snapshots yɛ bɛyɛ **11 GB**, ɛma **680× ntɛmntɛm** node bootstrap tumi sɛ wɔde toto syncing fi genesis ho a.

### Native Block Ntwitwiridii

Zakura boa configurable block pruning, ma node adwumayɛfo tumi kyerɛkyerɛ nkɔnsɔnkɔnsɔn abakɔsɛm dodow a ɛsɛ sɛ wɔkora so. Wei ma ɛyɛ nea mfaso wɔ so sɛ wobɛma node a edi mũ ayɛ adwuma wɔ hardware a ɛwɔ adekorabea kakraa bi — mfaso wɔ so ma validators, developers, ne infrastructure providers a wonhia abakɔsɛm nkɔnsɔnkɔnsɔn a edi mũ no.

### zcashd RPC Nkitahodi Mode

Zakura de compatibility mode a ɛsan yɛ agyapade no ka ho `zcashd` JSON-RPC ntam nkitahodi. Sika kotoku a ɛwɔ hɔ dedaw, nsakrae, ne nkabom a wɔde wɔn ho to so `zcashd` RPCs betumi adan akɔ Zakura a enhia sɛ wɔsesa code.

### Nsɔhwɛ P2P Transport Layer

Zakura de awo ntoatoaso a edi hɔ peer-to-peer transport layer mena, mprempren **wɔayɛ adwuma default**. Sɛ wɔma ɛyɛ adwuma a, ɛde n’ani si:

- Sub-500ms a enye koraa no block trɛw wɔ network no nyinaa so
- Mempool aggregation ma nkitahodi relay a etu mpɔn kɛse
- DoS-resistant gossip protocol a ɛbɛma network ahoɔden a wɔde gyina ano no atu mpɔn

Saa layer yi gyina hɔ ma daakye Zcash network-level nkɔsoɔ a wɔreyɛ wɔ Project Tachyon ase no ho nhwɛsoɔ.

### Ironwood (NU6.3) Nea ɛne no hyia

Zakura ne Ironwood ntwamutam nkɔsoɔ (NU6.3), a wɔde yɛɛ adwuma wɔ Zcash mainnet so wɔ afe 2026 mfimfini no hyia koraa.

---

## Sɛnea Zakura ne Zcash Nodes Afoforo Di Dwuma

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Language | C++ (forked from Bitcoin) | Rust | Rust (forked from Zebra) |
| Gyinabea | Wɔagyae | Active | Ɛyɛ adwuma (v1.0.0, Ɔpɛpɔn 2026) |
| Sync ahoɔhare | Mfitiaseɛ | ~1× | ~5× ntɛmntɛm |
| Block a wɔde twitwa nneɛma | Dabi | Dabi | Yiw |
| zcashd RPC a ɛne ne ho di nsɛ | Ɔmanfoɔ | Ɔfã bi | Yiw (compat mode) |
| Snapshot bootstrap a wɔde yɛ adwuma | Dabi | Dabi | Yiw (<simma 2) |
| Nsɔhwɛ P2P | Dabi | Dabi | Yiw (opt-in) |

---

## Sɛnea Wofi Ase

Download options, snapshots, ne nhyehyeɛ ho nkrataa wɔ:

- **Twe & nhyehyɛe akwankyerɛ:** [zakura.com/twe kɔ so](https://zakura.com/download/)
- **Nkɔnsɔnkɔnsɔn mfonini ahorow:** [zakura.com/mfonini ahorow a ɛwɔ hɔ](https://zakura.com/snapshots/)
- **Fibea koodu:** [github.com/zakura-asɛmfua/zakura](https://github.com/zakura-core/zakura)

---

## Nkratafa a Ɛfa Ho

- [Zebra Full Node a Ɛyɛ Fɛ](Zebra_Full_Node.md) — na upstream Zcash full node Zakura na forked fi
- [Zaino Indexer a ɔkyerɛwee](Zaino.md) — indexer a egyina Rust so a ɛne Zebra ne Zakura hyia
- [Nodes a Ɛyɛ Pɛ](Full_Nodes.md) — Zcash full node options ho nsɛm a wɔaka abom
- [Lightwallet Nodes a Wɔde Di Dwuma](Lightwallet_Nodes.md) — a ɛyɛ hare client alternatives

## Akadeɛ

- [Zakura a yɛde reba — dawurubɔ](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub a ɛwɔ hɔ](https://github.com/zakura-core/zakura)
- [Zakura Wɛbsaet](https://zakura.com/)
- [Zakura wɔ X/Twitter so](https://x.com/ZakuraZcash)
- [Dwumadie Tachyon](https://electriccoin.co/blog/)
