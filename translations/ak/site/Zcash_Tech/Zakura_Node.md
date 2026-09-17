<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zakura Ntam no

> 🇧🇷 [Portuguese kasa mu nkyerɛaseɛ](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura yɛ kwa, open-source noode nyinaa a wɔde di dwuma ma Zcash. Wɔayɛ wɔ ne kɛse mu. W'ayi afi hɔ [Zebra](Zebra_Full_Node.md) Na wɔama no kwan denam mmɛbom a ɛda **Valar Group** ne **Project Tachyon** ntam so, Zakura de ntɛmntɛm dwumadie mu di dwuma kɛse, na ɛtwe mpuntuo bi ma wɔn ankasa, ɛne nsonsonoe nkataho ama agyapade ahorow. `zcashd` Wɔyii version 1.0.0 adi July 15, 2026.

---

## TL;DR

- Zakura yɛ **consensus-compatible Zcash full node**  a ɛyɛ nsesaeɛ ma Zebra ne zcashd, na ɛfiri Zebra mu.
- Blockchain sync yɛ bɛyɛ **5x ntɛm sen Zebra**; snapshot bootstrapping wie wɔ **mmin 2 ase**.
- **Native block pruning** ma operator tumi de node a ɛboro so nyinaa di dwuma wɔ disk space kakraa bi mu (~11 GB pruned snapshot vs. 300 GB for a full Zebra node).
- **zcashd RPC compatibility mode** ma akwan a ɛwɔ hɔ ne emu afidie yɛ adwuma bere biara.
- **P2P transport layer** (default disabled) a w'ɔwɔ no yɛ adwuma wɔ sub-500ms block propagation ne DoS-resistant gossip.
- Zcash network upgrade a ɛne Ironwood (NU6.3) di nsɛ no bɛyɛ adwuma wɔ afe 2026 mfinimfini mu.
- Wɔn a wɔdi wɔn anim ne Sean Bowe (Zcash fo, Project Tachyon) ɛne Dev Ojha (Valar Group).

---

## Dɛn ne Zakura?

Zakura yɛ Zcash ne nyinaa ano a wɔasiesie no afi mfiase sɛ ɛbɛtumi ayɛ adwuma. Ɛwɔ mu nso, ɛne Zebra di nsɛ  kyerɛsɛ ɛgye tom na edi mmara korɔ so  Zakura de mfidie ho nkɔsoɔ kɛseɛ bi aba ma wɔde rebrɛ wɔn kwan ama wɔatumi adi dwuma yie.

Saa dwumadie yi yɛ adwuma a wɔbom ayɛ no ne "Project Tachyon" (a Sean Bowe, Zcash mfitiaseɛ cryptographic engineer) ɛne Valar Group (a Dev Ojha di anim). Wɔ bom de wɔn adwene si zcash protocol nkɔsoɔ so. Zakura na ɛyɛ saa dwumadi no ho nsunsuansoo node.

---

## Nneɛma Titiriw a Ɛwɔ Mu

### 5x Faster Chain Synchronization (Ɔkyinkyin mu Ntotoho a Ɛwɔ Nsa)

Zakura nya blockchain synchronization a ɛboro Zebra so bɛyɛ mpɛn 5. Eyi ma ɛyɛ yie paa wɔ adwumayɛfoɔ no fam sɛ wɔbɛtumi de node bi adi dwuma ntɛm anaa wɔde wɔn ho bɛhyɛ mu.

### Mfonini a wɔtwe no ntɛmntɛm

Zakura de chain snapshots a wɔasiesie no dada adi dwuma ama abrɛ ase ntɛmntɛm:

nfa ho nsεm kwan no. Bere no.
|-----------------|------|
Archive snapshot. ~Minute 37 - Ɔyɛ a, yɛ bɛhwɛ mu sɛ:
twee mu mfoni a w'ayi no. **Minnimma 2 akyi**
| Zebra (full sync) | ~20 hours |

Mfonini a wɔatwa no yɛ bɛyɛ **11 GB**, na ɛma kwan ma wɔde ntɛmntɛm bɔ nnodoɔ so fa toto syncing firi Genesis ho.

### Ɔman no mu nnua a wɔtwa ho aba

Zakura boa ma wotumi siesie block pruning, na ɛma node operators kyerɛ sɛnea chain abakɔsɛm bɛtra hɔ. Eyi yɛ no yie sɛ wobetumi de full node adi dwuma wɔ hardware a nkorabea kakra wom so  mfasoɔ da so ara wɔ validators, developers ne infrastructure providers a wɔnhia historical chain mũ no nyinaa ho .

### zcashd RPC Compatibility Mode (Ɔkwan a wɔfa so di dwuma ma no)

Zakura de compatibility mode a ɛsan di agyapadeɛ no akyi ka ho. `zcashd` JSON-RPC interface. Nkrataafa, nsesaeԑ ne nkabom a ɛwɔ hɔ no gyina so `zcashd` RPC betumi asesa akɔ Zakura a enhia sɛ wɔyɛ kode no mu nsakrae.

### Experimental P2P Transport Layer (Ɔwɔ sԑ Ɔfa nnipa bebree)

Zakura de ne nkyirimma peer-to-peer transport layer, a seesei **wɔn ntumi mfa nni dwuma no**. Sɛ wɔ ma kwan a, ɛhwɛ:

- Sub-500ms worst-case block propagation wɔ network no so nyinaa.
- Mempool aggregación ama transaction relay a ɛyɛ adwuma yie
- DoS-resistant gossip protocol de bɛboa network no anobaeɛ

Saa ɔfã yi yɛ daakye Zcash network-level nkɔsoɔ a wɔresesa no wɔ Project Tachyon ase ho nhyehyeɛ.

### Ironwood (NU6.3) Compatible

Zakura ne Ironwood network upgrade (NU6.3) a wɔde bɛyɛ adwuma wɔ Zcash mainnet no mu nyinaa yɛ pɛ.

---

## Sɛnea Zakura ne Zcash Nodes afoforɔ di nsɛ no.

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
语言: C++ (forked from Bitcoin) Rust.Rust (forced from Zebra).C++,B,A,D,E,F,G,H,I,N,O,T,L,M ,S,Y,Z,W,X,Y
状态: Deprecated Active. Active (v1.0.0, Jul 2026) 已关闭评论
Sync speed. Baseline: ~1x~5x faster.
 blocks pruning. no,no,yes,yeah,oh yeah!
zcashd RPC compat. Native. Partial. Yes (compact mode)
mpε sε wob3twe w'ani asi fam a, εno de na woabobɔ mmɔden agye atom.
Ԑnyԑ. Dabi (p2P) -Asɔhwɛ no mu, daabi (optin-in).

---

## Mfitiaseɛ no a Yɛbɛkɔ So Ayɛ No

Wobetumi atwe, mfonini ne ntentan ho nkrataa wɔ:

- ** Download & setup guide:** (Nneɛma a wobɛtumi ayɛ de adi dwuma wɔ wo fon so) [zakura.com/download (Ɔwɔ hɔ ma wo)](https://zakura.com/download/)
- **Aguamansɛm a wɔtwe no ntɛm:** [zakura.com/snapshots (Ɛwɔ hɔ bere tiaa bi)](https://zakura.com/snapshots/)
- **Nsɛm a w'akyerɛ mu wɔ ha:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Nkrataafa a Ɛwɔ Ho Nsɛm

- [Zebra Nodoɔ a Ɛwɔ Mu Nyinaa](Zebra_Full_Node.md)  Zcash a ɔwɔ soro no nyinaa wɔ Zakura na ne mu yɛ mmienu.
- [Zaino Nhyehyɛmu no](Zaino.md)  a Rust-based indexer compatible with Zebra and Zakura (Ɔwԑn Aban Ahyehyԑde)
- [Nkɔmmɔ a ɛkorɔn no nyinaa](Full_Nodes.md)  Zcash akwan a wɔfa so de di dwuma no nyinaa ho nsunsuansoɔ.
- [Lightwallet Nodes (Ɔkwan a wɔfa so de sika fa nneɛma mu)](Lightwallet_Nodes.md)  fεfεεfo akwan a εbͻ yεn ani so no

## Nneɛma a wɔde bɔ afɔre

- [Yɛ de Zakura  ho nkrataa rekyerɛ mo kwan.](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub so dwumadie](https://github.com/zakura-core/zakura)
- [Zakura wɛbsaet no so hɔho](https://zakura.com/)
- [Zakura wɔ X/Twitter so](https://x.com/ZakuraZcash)
- [Tachyon Adwuma no](https://electriccoin.co/blog/)
