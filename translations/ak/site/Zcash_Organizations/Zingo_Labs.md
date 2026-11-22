#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[Ɔmanfo Wɛbsaet](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs yɛ anisoadehunufoɔ kuo a wɔatu wɔn ho ama sɛ wɔbɛma nnipa suahunu akɔ anim. Yɛgye di sɛ ɛsɛ sɛ mfiridwuma so ba adesamma mfaso na yɛnam nkitahodi a yɛpene so so na edi yiye. Yɛrekyerɛ nhwɛso ahorow a ɛma eyi tumi yɛ yiye.

Zingo Lab Cyan yɛ adwuma sɛ Shielded DAO. Yɛkora yɛn sika so wɔ sikakorabea bi a asɔremma biara wɔ view key. Wɔsɛe sika fi sikakorabea hɔ bere a asɔremma tow aba de gyina nyansahyɛ bi akyi no.

## Nnwuma a wɔyɛ

### Zingo! Sikabɔtɔ ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet yɛ Zcash sika kotoku a ɛwɔ nneɛma nyinaa a wɔayɛ ama wɔn a wɔde di dwuma no adamfofa su, ɛwom sɛ ɛde nneɛma bi a ɛkɔ akyiri ka ho ma wɔn a wɔakɔ anim kɛse de. Ɛboa transparent, Sapling ne Ironwood pools, ɛwɔ address book a wɔde tua sika mpɛn pii na ɛwɔ kasa ahodoɔ mu. Ɛyɛ sika kotoku a edi kan a ɛboaa Orchard na ɛde NU5 format ahorow dii dwuma.

Zingo! ne tumi a ɛwɔ sɛ ɛde Memo field no di dwuma de nhumu a ɛsom bo ma wɔ wo nnwuma ho.

Zingo! no wɔ hɔ ma mobile mfiri ne PC ahorow. Wubehu nea wɔatwe nyinaa [ha](https://zingolabs.org/)

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
API ne test-app a ɛda zcash dwumadie adi ma app a wɔde di dwuma. Zingolib de nhomakorabea ma zingo-mobile, ne cli application a ɛka ho a wɔfrɛ no zingo-cli, ahyɛde-kwan hann sika kotoku a ɛne nkɔnsɔnkɔnsɔn indexer te sɛ [Zaino](/zcash-tech/zaino).

### Zaino Indexer ([GitHub](https://github.com/zingolabs/zaino))
Zaino yɛ Rust indexer ma Zcash blockchain, a Zingo kuw no na wɔyɛe. Ɛyɛ indexer a ɛwɔ.. [Z3 stack na ɛyɛ](/zcash-tech/z3-stack): ɛkyerɛ nkɔnsɔnkɔnsɔn data fi a [Zebra](/zcash-tech/zebra-full-node) validator na ɛsom sika kotoku, explorers, ne clients afoforo. Ɛyɛ ɔkwan a edi akyi kɔ lightwalletd.

Zaino de nneɛma a ɛho hia ma akraman a wɔn ho yɛ hare nyinaa, te sɛ sika kotoku ne aplikeshɔn a enhia blockchain abakɔsɛm a edi mũ, ne akraman anaa sika kotoku a edi mũ. Ɛsan nso boa block explorers, ma kwan ma wonya blockchain a wɔawie ne nkɔnsɔnkɔnsɔn ne mempool a eye sen biara a wɔanwie a Zebra full validator di so no nyinaa.

`zcashd` duu ne End-of-Support gyinabea wɔ 18 July 2026 wɔ block 3,417,100 na ɛnboa Ironwood (NU6.3). Zaino kenkan Zebra validator bi.

###  ZLN (zcash-mpɔtam hɔ-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

A set of utilities a ɛde Zcash nhyehyɛe ahorow no fi ase na ɛhwɛ so. Wɔde eyi di dwuma ma nkabom sɔhwɛ wɔ nkɔso a ɛfa:
- lightclients a wɔde wɔn ho hyɛ mu
- indexers a wɔde kyerɛw nsɛm
- validators a wɔyɛ saa

Ne botae ne sɛ ɛbɛma sɔhwɛ tebea a ɛyɛ mmerɛw kɛse na ɛyɛ den ama core nodes (validators) te sɛ Zebra, indexers te sɛ Zaino, ne light client wallets te sɛ zingo-cli.

Default stack a ɛde fi ase ne Zebrad, zainod, ne zcash-devtool. Agyapade no `zcashd` na lightwalletd processes te akyi a ɛnyɛ mmoa `legacy-stack` feature na wɔayɛ nhyehyɛe sɛ wobeyi afi hɔ.

Wɔ nnwinnadeɛ a wɔde hyɛ aseɛ, de sie, na wɔde bɛhyɛ Zcash nkɔnsɔnkɔnsɔn data (ma mainnet, testnet, ne regtest) akyi no, wɔde zcash-local-net di dwuma firi Zaino's sɔhwɛ suite mu de hwɛ Lightwallet RPC dwumadie a wɔagye wɔ Zaino (hwɛ [Zaino sɔhwɛ docs](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)).
