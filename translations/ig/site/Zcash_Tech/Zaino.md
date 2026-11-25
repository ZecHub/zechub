<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zaino.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Ibe"/>
</a>

# Zaino Indexer

## Nchịkọta ngwa ngwa

* **Zebra** na-akwado ịdị irè nke Zcash chain.
* **Zaino** na-edepụta data chain nke Zebra ma na-enye API ndị ngwa ndị ahịa nwere ike iji.
* **Zallet** bụ akụkụ e-akpa ego na Z3 stack. N’nhazi Z3 ndabara, Zallet na-akparịta ụka na Zebra ozugbo, ọ chọghịkwa ọrụ Zaino nọọrọ onwe ya.
* Ọrụ Zaino nọọrọ onwe ya bara uru mgbe ndị na-arụ ọrụ chọrọ ebe njikọ gRPC dakọtara na lightwalletd, proxy JSON-RPC, ma ọ bụ akụrụngwa maka e-akpa ego dị mfe, ndị na-enyocha blockchain, faucet, na ọrụ ndị yiri ha.
* Zaino bụ akụrụngwa na-arụ ọrụ, mana ndị na-arụ ọrụ kwesịrị ịlele Zaino gọọmentị na akwụkwọ Z3 maka nkọwa mbunye dị ugbu a tupu ha agba ya n’ebe mmepụta.

## Nkọwa bụ isi

Zaino bụ indexer Rust maka Zcash blockchain. Ọ na-agụ data chain site na full node Zebra. Ọ na-eje ozi data e-akpa ego, ndị na-enyocha blockchain, faucet, na ọrụ ndị ọzọ chọrọ, n’emeghị ka Zebra buru ibu ọrụ maka ndeksi niile ndị ngwa ndị ahịa na-eji.

### Ihe Zaino Na-eme

Zaino dị n’etiti Zebra na ngwanrọ ndị ahịa. Zebra bụ consensus node: ọ na-ebudata, na-enyocha, ma na-eso Zcash blockchain. Zaino na-eji Zebra dịka isi iyi data chain ya, wee kwadebe nlele ndị e depụtara ka ngwa ndị ahịa nwee ike jụọ ha ngwa ngwa.

Nkewa a na-eme ka ọrụ ndị ahụ doo anya:

| Akụkụ | Ọrụ |
|:--|:--|
| Zebra | Full node na onye na-akwado ịdị irè |
| Zaino | Indexer na ọrụ API ndị ngwa ndị ahịa na-eji |
| Zallet | Ọrụ e-akpa ego |
| lightwalletd | Sava e-akpa ego dị mfe ochie nke e mere Zaino ka ọ dochie ma ọ bụ soro ya rụọ ọrụ |

Zaino na-enye ọrụ maka light clients, full clients ma ọ bụ e-akpa ego, na ndị na-enyocha blocks. Ọ na-enye ohere ịnweta chain ikpeazụ, chain kacha mma nke a na-emechabeghị, na data mempool nke Zebra na-ejide.

### Ebe Ọ Dị n’ime Zcash Stack Dị Ugbu a

E wuru Z3 stack dị ugbu a gburugburu Zebra, Zallet, na Zaino nhọrọ.

N’mbunye Z3 ndabara, Zebra na Zallet na-arụkọ ọrụ. Zallet na-ejikọ ozugbo na Zebra, ya mere onye na-arụ ọrụ naanị stack e-akpa ego dị n’ime obodo achọghị ịmalite ọrụ Zaino nọọrọ onwe ya.

A na-agbakwunye Zaino mgbe onye na-arụ ọrụ chọrọ ijere ndị ahịa si n’èzí ozi. Na Z3, ọ na-arụ ọrụ n’okpuru profaịlụ Compose `indexer` ma na-agbakwunye:

* ebe njikọ gRPC dakọtara na lightwalletd maka ndị ahịa e-akpa ego dị mfe
* proxy JSON-RPC maka ndị na-enyocha blockchain, faucet, na sistemụ azụ ọrụ
* nchekwa data indexer dị iche na ọnọdụ chain nke Zebra

Nke a na-eme ka Zaino dị mkpa karịsịa maka azụ ọrụ e-akpa ego, ndị na-arụ ọrụ akụrụngwa ọha, ndị na-enyocha blockchain, faucet, na ndị mmepe na-anwale ọrụ chọrọ data chain Zcash e depụtara.

### Zaino na lightwalletd

lightwalletd bụ sava e-akpa ego dị mfe mbụ. Zaino bụ ụzọ onye ga-anọchi ya dabere na Rust maka ọrụ a. Ebumnuche ya bụ inye API dakọtara ebe o kwere mee, ka e-akpa ego na ọrụ nwee ike ịkwaga n’enweghị idegharịa ihe niile n’otu oge.

Nke a apụtaghị na mbunye lightwalletd niile agbanweela gaa na Zaino. Ndị na-arụ ọrụ kwesịrị ile Zaino anya dịka akụkụ nke stack Zebra dị ugbu a, ma lelee akwụkwọ ọrụ kacha ọhụrụ, mwepụta, na dashboard ọrụ tupu ha ahọrọ ihe ha ga-agba.

## Ihe atụ / Ntụnyere

Chee echiche banyere Zcash blockchain dịka nnukwu ebe nchekwa akwụkwọ ndekọ ego.

Zebra bụ onye na-elekọta ebe nchekwa ahụ. Ọ na-anata ibe ọhụrụ ọ bụla, na-enyocha ma ibe ahụ na-agbaso iwu, wee debe ya n’ebe kwesịrị ekwesị.

Zaino bụ tebụl ntụaka dị n’ihu ebe nchekwa ahụ. Ọ na-agụ ihe Zebra debere, na-arụ katalọgụ maka ịchọta ihe ngwa ngwa, ma na-aza ndị bịara ajụjụ ọsọ ọsọ. Light wallets, ndị na-enyocha blockchain, na faucet na-abịakwute tebụl a ịjụ ajụjụ dịka …gịnị dị n’ime block a?… ma ọ bụ …kedu Azụmahịa ndị na-eche n’ime mempool?…. Tebụl ntụaka anaghị ekpebi ibe ndị bụ eziokwu. Ọrụ ahụ bụ nke onye na-elekọta ebe nchekwa ahụ.

Zallet, n’nhazi Z3 ndabara, na-arụ ọrụ n’otu ụlọ ahụ, ọ na-agakwa ozugbo n’ebe onye na-elekọta ebe nchekwa ahụ nọ. Ọ chọghị tebụl ntụaka ahụ.

### Ụfọdụ eserese na-egosi otu Zaino si arụ ọrụ

#### Nhazi ime nke Zaino

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

#### Nhazi ọrụ dị ndụ nke Zaino

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

#### Nhazi sistemụ nke Zaino

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Nkọwa miri emi

### Ihe ndị na-arụ ọrụ kwesịrị ịma

Ụzọ mbunye kachasị mfe ma bụrụkwa nke a pụrụ ịtụkwasị obi bụ ebe nchekwa koodu Z3. Z3 nwere Zaino dịka ọrụ nhọrọ:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Buru ụzọ mee nhazi Z3 nkịtị ma chere ka Zebra mekọrịta tupu ịmalite ọrụ ndị dabere na ya na mainnet ma ọ bụ testnet.

Zaino na-enye ụdị ọrụ netwọk abụọ. Ọrụ gRPC bụ API nke lightwallet na-eji. E bu n’obi ka ọrụ JSON-RPC jiri naanị n’ime loopback ma ọ bụ netwọk nzuzo a tụkwasịrị obi, ọ gwụla ma oyi akwa ọzọ na-enye nchedo. Ekwela ka ebe JSON-RPC na-enweghị nyocha onye ọrụ ma ọ bụ izo ya ezo pụta n’ihu ọha n’ịntanetị.

## Mmejọ ndị a na-emekarị

**Iwere Zaino dịka full node.** Zaino abụghị onye na-akwado ịdị irè. Zebra na-akwado ịdị irè nke chain; Zaino na-edepụta data sitere na Zebra.

**Iche na mbunye Z3 niile chọrọ Zaino nọọrọ onwe ya.** Zallet nwere ike jikọọ ozugbo na Zebra n’ime stack Z3 ndabara. Malite Zaino mgbe ịchọrọ ọrụ indexer nọọrọ onwe ya maka ndị ahịa si n’èzí.

**Igosipụta atụmatụ e zubere dịka ihe e tinyelarị n’ọrụ.** A ka na-arụsi ọrụ ike na mmepe Zaino, ya mere lelee ndetu mwepụta na akwụkwọ dị ugbu a tupu ịkọwa atụmatụ dịka nke dị njikere iji.

**Imeghe JSON-RPC n’enweghị nlezianya.** E bu n’obi ka interface JSON-RPC nke Zaino jiri naanị n’ime loopback ma ọ bụ netwọk nzuzo a tụkwasịrị obi, ọ gwụla ma oyi akwa ọzọ na-echebe ya.

## Ibe ndị metụtara ya

- [Ọnụ node Lightwallet](/zcash-tech/lightwallet-nodes): sava light wallets na-ejikọ na ha, lightwalletd na Zaino, na otu esi agbanwe n’etiti ha.
- [Zinder](/zcash-tech/zinder), indexer Rust ọzọ, sitere na Zcash Foundation (alpha)
- [Zebra Full Node](/zcash-tech/zebra-full-node): node nke Zaino na-agụ data chain ya na ya.
- [Zallet](/zcash-tech/zallet): e-akpa ego full node dị n’ime Z3 stack.
- [Z3 Stack](/zcash-tech/z3-stack): Zebra, Zallet na indexer Zaino nhọrọ e chịkọtara ọnụ.
- [Ntụnyere arụmọrụ Indexer: Zaino na Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer): ntụnyere a pụrụ imegharị n’etiti indexer lightwallet abụọ.
- [Full Nodes](/zcash-tech/full-nodes): nkọwa gbasara ngwanrọ full node nke Zcash.
- [ZcashMmekọrịta e-akpa ego](/zcash-tech/zcash-wallet-syncing): ihe mere e-akpa ego nke nwere nchedo ji chọọ usoro mmekọrịta.

### Akụrụngwa

* [Zaino ebe nchekwa koodu GitHub](https://github.com/zingolabs/zaino)
* [Zaino mwepụta](https://github.com/zingolabs/zaino/releases)
* [Zaino akwụkwọ e mepụtara](https://zingolabs.github.io/zaino/)
* [Ebe nchekwa koodu mbunye Z3](https://github.com/ZcashFoundation/z3)
* [Zebra akwụkwọ](https://zebra.zfnd.org/)
* [Zaino mkparịta ụka gbasara ikike na ọrụ](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Emelitere ikpeazụ:** Nọvemba 2026
