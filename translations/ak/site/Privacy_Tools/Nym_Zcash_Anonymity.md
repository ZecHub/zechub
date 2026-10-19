<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nym Mixnet Anonymity ma Zcash

> Wɔdii ho adanseɛ a ɛtwa toɔ: Ɔkɔtɔberɛ 18, 2026

Zcash shielded pools sie sika dodow, wɔn a wɔde kɔma, ne wɔn a wogye wɔ nkɔnsɔnkɔnsɔn so. Wɔmfa ntwamutam kwan a ɛda sika kotoku ne lightwallet server ntam no nsie. Nym's mixnet no de saa network-layer ahobammɔ a ɛyera no ka ho. Ɛde besi October 2026 no, nkabom no yɛ live wɔ production wallets (Zingo, Zkool).

Farebae: [Sɛnea Nym de anonymity ka Zcash sika kotoku ho](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13 Ɔkɔtɔberɛ 2026).

## Nea wɔbɔ ho ban

Nym bubu ayɔnkofa packets (mpɛn pii no 7–15 KB a ɛyɛ sika a wɔsɛe no data ne ZK adanse) kɔ Sphinx packets mu na ɛde fa mixnet no so. Wei:

- Ɛde nea ɔde amena no IP sie fi lightwallet server no so
- Blends traffic no ne Nym traffic afoforo
- Ɛma entropy bɛyɛ 17 bits wɔ default nhyehyɛe mu, a cited anonymity a wɔahyehyɛ no boro 100,000 a wɔde di dwuma

Katua ne boɔ a wɔbisa wɔ Zingo v7 mu no di saa kwan yi akyi default so.

## Nea wɔammɔ ho ban

Chain synchronization, nullifier queries, transaction fetches, ne mempool traffic mprempren de indexer nkitahodi a ɛyɛ daa no di dwuma. Device-level anaa application-level metadata a ɛwɔ packets a wɔadi afra no akyi nso wɔ Nym's akyi.

Sɛ wo ahunahuna nhwɛso no hwehwɛ sɛ wode sync traffic sie a, fa native-mixnet sika kotoku ne system-level NymVPN. Hwɛ [Nym VPN na ɛwɔ hɔ](/guides/nym-vpn).

## Sika kotoku

| Sikabɔtɔ | Gyinabea | Nsɛm a Wɔahyɛ no Nsow |
| --- | --- | --- |
| Zingo v7 | Live, default, default | `makers run-cli` bundles a wɔde ahyɛ mu `nym-proxy`. Nhyiam no fi ase wɔ offline; `--online`, `--remember-online`, or `--server` ma wɔpene so. |
| Zkool | Te ase | Native mixnet nkabom. |
| Afoforo nso | Ɛnam NymVPN | Fa sika kotoku no fa system-level Mixnet mode so. |

Setup ho nsɛm ma wallet-level kwan no wɔ mu [Fa Zcash Wallet Traffic no fa Nym Mixnet no so](/guides/nym-mixnet-wallet-setup).

## Nneɛma a wɔde di gua

Nym-routed broadcast yɛ bɛyɛ 12.5× brɛoo sen clearnet (~3.4 s). Tor yɛ ntɛmntɛm (~3.7×) nanso ɛde FIFO nsuten di dwuma a ɛnfrafra, enti wiase nyinaa ɔtamfo da so ara betumi ayɛ abusuabɔ. Nym dwumadiefoɔ a wɔkyɛ no a wobɛma ayɛ kɛseɛ no ma anonymity kɔ soro yie sene sɛ wode akyɛdeɛ foforɔ bɛka ho.

## Ahotew a wɔde di dwuma-layer: nym-swizzle-zcash

Network-layer ahobammɔ nnɔɔso. Sɛ wowɔ mixnet anaa VPN a ɛyɛ pɛ mpo a, lightwallet server da so ara tumi de nhyiam ahorow bata ho denam application-layer nhyehyɛe ahorow a ɔbɛhwɛ so:

- Resume-point chaining: akraman san fi ase sync fi pɛpɛɛpɛ `previous end + 1`, enti server no betumi abɔ nhyiam ahorow no nkɔnsɔnkɔnsɔn denam block height nkutoo so.
- Sync-then-send: sika kotokuo yɛ sync ntɛm ara ansa na wɔabɔ amanneɛ, na ɛma server no de asɛm bi to sync session a atwam no so.

No [`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) crate de ahotew ho nhyehyɛe Zcash-specific a ɛfa abien no nyinaa ho di dwuma. Ɛyɛ packages general no `nym-swizzle` primitives akɔ nkɔnsɔnkɔnsɔn-aware nhyehyɛe ma hann akrafo.

**Quantised sync ranges.** Wɔtrɛw abisadeɛ mu kɔ network-wide grid a ɛwɔ cells a ne kɛseɛ te sɛ da. Wɔyɛ mfiase no kurukuruwa kɔ fam na wɔde awiei no yɛ kurukuruwa kɔ soro. Ranges yɛ nea wɔahyɛ da ayɛ, ɛforo kɔ soro, na ɛnyɛ nea ɛka bom. Reorg checks tra widened range no mu enti wɔda resume point pɔtee no adi. Nnipa a wɔmmɔ wɔn din no fi nhyiam (sika kotoku pii a ɛma ahye koro no ara) mmom sen dede.

**Decoupled broadcasts.** Wɔnam exponential distribution (kyerɛ sɛ 144 blocks ≈ nnɔnhwerew 3, cap 576 blocks ≈ nnɔnhwerew 12) a ɛne ZIP 318 transfer nhyehyɛe hyia so twentwɛn nkitahodi a wɔde mena no ase. Nneɛma a ɛkyɛ boro nhyehyɛe no nkwa nna a wɔtaa de di dwuma no so, enti wɔkɔ so yɛ nhyehyɛe ahorow. Wɔkyekye asɛm no wɔ ogya bere mu nkutoo atia tip foforo. Ɛsɛ sɛ Sync ne broadcast de server ahorow di dwuma.

Crate no da adi `BlockSource` ne `TxBroadcaster` su ahorow, boaboa ano ma `wasm32-unknown-unknown`, na enni n’ankasa network stack biara. Hwɛ sɛnea [Nym docs](https://nym.com/docs/developers/swizzle/zcash) ma API ne nhwɛso ahorow a edi mũ no.

## Nneɛma a wonya fi mu

- [Sɛnea Nym de anonymity ka Zcash sika kotoku ho](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13 Ɔkɔtɔberɛ 2026
- [nym-swizzle-zcash: Ahotew ho nhyehyɛe ma Zcash Light Clients](https://nym.com/docs/developers/swizzle/zcash) — Nym Nsɛm a Wɔakyerɛw
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Fa Zcash Wallet Traffic no fa Nym Mixnet no so](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN na ɛwɔ hɔ](/guides/nym-vpn) — ZecHub
