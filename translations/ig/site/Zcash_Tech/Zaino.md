<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zaino.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Ibe"/>
</a>

# Onye ndepụta Zaino

## Na nkenke

* **Zebra** na-akwado chain Zcash.
* **Zaino** na-edepụta data chain nke Zebra ma na-ekpughe API ndị chere ndị ahịa ihu.
* **Zallet** bụ akụrụngwa e-akpa ego na nchịkọta Z3. N'ime nhazi Z3 ndabara, Zallet na-ekwurịta okwu na Zebra ozugbo, ọ dịghịkwa achọ ọrụ Zaino kwụụrụ onwe ya.
* Ọrụ Zaino kwụụrụ onwe ya bara uru mgbe ndị na-arụ ọrụ chọrọ njedebe gRPC kwekọrọ na lightwalletd, proxy JSON-RPC, ma ọ bụ akụrụngwa maka e-akpa ego dị mfe, ndị nyocha, faucet, na ọrụ ndị yiri ya.
* Zaino bụ akụrụngwa na-arụ ọrụ, mana ndị na-arụ ọrụ kwesịrị ilele akwụkwọ Zaino gọọmentị na nke Z3 maka nkọwa mbugharị dị ugbu a tupu ha agba ya n'ime mmepụta.

## Nkọwa bụ isi

Zaino bụ indexer Rust maka Zcash blockchain. Ọ na-agụ data chain site na full node Zebra. Ọ na-eje ozi data e-akpa ego, ndị na-enyocha blockchain, faucet, na ọrụ ndị ọzọ chọrọ, n’emeghị ka Zebra buru ibu ọrụ maka ndeksi niile ndị ngwa ndị ahịa na-eji.

### Ihe Zaino Na-eme

Zaino nọ n'etiti Zebra na sọftụwia onye ahịa. Zebra bụ consensus node: ọ na-ebudata, na-enyocha, ma na-esochi Zcash blockchain. Zaino na-eji Zebra dị ka ebe data chain ya si abịa, wee kwadebe echiche ndị edepụtara nke ngwa ndị ahịa pụrụ ịjụ nke ọma.

Nkewa a na-eme ka ọrụ ndị ahụ doo anya:

| Akụrụngwa | Ọrụ |
|:--|:--|
| Zebra | Full node na onye nkwado |
| Zaino | Onye ndepụta na ọrụ API chere ndị ahịa ihu |
| Zallet | Ọrụ e-akpa ego |
| lightwalletd | Sava e-akpa ego dị mfe ochie nke e mere Zaino iji dochie ma ọ bụ kwado |

Zaino na-enye ọrụ maka light clients, full clients ma ọ bụ e-akpa ego, na ndị na-enyocha blocks. Ọ na-enye ohere ịnweta chain ikpeazụ, chain kacha mma nke a na-emechabeghị, na data mempool nke Zebra na-ejide.

### Ebe Ọ Dị n’ime Zcash Stack Dị Ugbu a

A na-ewu usoro Z3 dị ugbu a gburugburu Zebra, Zallet, na Zaino nhọrọ.

N'ime mbugharị Z3 ndabara, Zebra na Zallet na-agba ọnụ. Zallet na-eru Zebra ozugbo, yabụ onye na-arụ ọrụ nke na-agba naanị nchịkọta e-akpa ego mpaghara adịghị mkpa ịmalite ọrụ Zaino kwụụrụ onwe ya.

A na-agbakwunye Zaino mgbe onye na-arụ ọrụ chọrọ ijere ndị ahịa mpụga ozi. Na Z3, ọ na-agba n'azụ profaịlụ Compose `indexer` ma na-agbakwunye:

* njedebe gRPC kwekọrọ na lightwalletd maka ndị ahịa e-akpa ego dị mfe
* proxy JSON-RPC maka ndị nyocha, faucet, na azụ ọrụ
* nchekwa data onye ndepụta dị iche na ọnọdụ chain nke Zebra

Nke a na-eme Zaino ka ọ dị mkpa karịsịa maka azụ ọrụ e-akpa ego, ndị na-arụ akụrụngwa ọha, ndị nyocha, faucet, na ndị mmepụta na-anwale ọrụ chọrọ data chain Zcash edepụtara.

### Zaino na lightwalletd

lightwalletd bụ sava e-akpa ego dị mfe mbụ. Zaino bụ ụzọ onye ga-anọchi ya dabere na Rust maka ọrụ a. Ebumnuche ya bụ inye API kwekọrọ ebe o kwere omume, ka e-akpa ego na ọrụ nwee ike ịkwaga n'enweghị idegharị ha kpamkpam n'otu oge.

Nke ahụ apụtaghị na mbugharị lightwalletd ọ bụla akwagala na Zaino. Ndị na-arụ ọrụ kwesịrị iwere Zaino dịka akụkụ nke usoro dabere na Zebra dị ugbu a ma lelee akwụkwọ ọrụ kachasị ọhụrụ, mwepụta, na dashboard ọrụ tupu ha ahọrọ ihe ha ga-agba.

## Ihe atụ / Ntụnyere

Chee echiche banyere Zcash blockchain dịka nnukwu ebe nchekwa akwụkwọ ndekọ ego.

Zebra bụ onye na-elekọta ebe nchekwa ahụ. Ọ na-anata ibe ọhụrụ ọ bụla, na-enyocha ma ibe ahụ na-agbaso iwu, wee debe ya n’ebe kwesịrị ekwesị.

Zaino bụ tebụl ntụaka dị n’ihu ebe nchekwa ahụ. Ọ na-agụ ihe Zebra debere, na-arụ katalọgụ maka ịchọta ihe ngwa ngwa, ma na-aza ndị bịara ajụjụ ọsọ ọsọ. Light wallets, ndị na-enyocha blockchain, na faucet na-abịakwute tebụl a ịjụ ajụjụ dịka …gịnị dị n’ime block a?… ma ọ bụ …kedu Azụmahịa ndị na-eche n’ime mempool?…. Tebụl ntụaka anaghị ekpebi ibe ndị bụ eziokwu. Ọrụ ahụ bụ nke onye na-elekọta ebe nchekwa ahụ.

Zallet, n’nhazi Z3 ndabara, na-arụ ọrụ n’otu ụlọ ahụ, ọ na-agakwa ozugbo n’ebe onye na-elekọta ebe nchekwa ahụ nọ. Ọ chọghị tebụl ntụaka ahụ.

### Ụfọdụ eserese na-egosi otu Zaino si arụ ọrụ

#### Nhazi ime nke Zaino

![Nhazi ime Zaino](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

#### Nhazi ọrụ dị ndụ nke Zaino

![Nhazi ọrụ Zebra dị ndụ](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

#### Nhazi sistemụ nke Zaino

![Nhazi sistemụ Zaino](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Nkọwa miri emi

### Ihe ndị na-arụ ọrụ kwesịrị ịma

Ụzọ mbugharị kachasị mfe na nke nwere ikike bụ ebe nchekwa Z3. Z3 gụnyere Zaino dịka ọrụ nhọrọ:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Buru ụzọ gbaa nhazi Z3 nkịtị ma chere ka Zebra mekọrịta tupu ịmalite ọrụ ndị dabere na ya na mainnet ma ọ bụ testnet.

Zaino na-enye ụdị ọrụ netwọk abụọ. Ọrụ gRPC bụ API nke lightwallet na-eji. E bu n’obi ka ọrụ JSON-RPC jiri naanị n’ime loopback ma ọ bụ netwọk nzuzo a tụkwasịrị obi, ọ gwụla ma oyi akwa ọzọ na-enye nchedo. Ekwela ka ebe JSON-RPC na-enweghị nyocha onye ọrụ ma ọ bụ izo ya ezo pụta n’ihu ọha n’ịntanetị.

## Njehie A Na-ahụkarị

**Iwere Zaino dị ka full node.** Zaino abụghị onye nkwado. Zebra na-akwado chain; Zaino na-edepụta data sitere na Zebra.

**Iche na mbugharị Z3 ọ bụla chọrọ Zaino kwụụrụ onwe ya.** Zallet nwere ike iru Zebra ozugbo n'ime usoro Z3 ndabara. Malite Zaino mgbe ịchọrọ ọrụ onye ndepụta kwụụrụ onwe ya maka ndị ahịa mpụga.

**Igosipụta atụmatụ e zubere dịka ndị ebularị.** A na-emepụta Zaino n'ọrụ, yabụ lelee ndetu mwepụta na akwụkwọ dị ugbu a tupu ịkọwa atụmatụ dịka nke dị.

**Ikpughe JSON-RPC n'enweghị nlezianya.** Ihe nkenye JSON-RPC nke Zaino bụ maka loopback ma ọ bụ netwọk nzuzo a tụkwasịrị obi, ọ gwụla ma oyi akwa ọzọ chebere ya.

## Ibe ndị metụtara ya

- [Ọnụ node Lightwallet](/zcash-tech/lightwallet-nodes): sava light wallets na-ejikọ na ha, lightwalletd na Zaino, na otu esi agbanwe n’etiti ha.
- [Zinder](/zcash-tech/zinder), indexer Rust ọzọ, sitere na Zcash Foundation (alpha)
- [Full Node Zebra](/zcash-tech/zebra-full-node): node nke Zaino na-agụ data chain ya na ya.
- [Zallet](/zcash-tech/zallet): e-akpa ego full node dị n’ime Z3 stack.
- [Z3 Stack](/zcash-tech/z3-stack): Zebra, Zallet na indexer Zaino nhọrọ e chịkọtara ọnụ.
- [Ntụnyere arụmọrụ Indexer: Zaino na Ztreamer](/zcash-tech/indexer-benchmark-zaino-vs-ztreamer): ntụnyere a pụrụ imegharị n’etiti indexer lightwallet abụọ.
- [Full Nodes](/zcash-tech/full-nodes): nkọwa gbasara ngwanrọ full node nke Zcash.
- [ZcashMmekọrịta e-akpa ego](/zcash-tech/zcash-wallet-syncing): ihe mere e-akpa ego nke nwere nchedo ji chọọ usoro mmekọrịta.

### Akụrụngwa

* [Ebe nchekwa koodu GitHub Zaino](https://github.com/zingolabs/zaino)
* [Mwepụta Zaino](https://github.com/zingolabs/zaino/releases)
* [Akwụkwọ e mepụtara Zaino](https://zingolabs.github.io/zaino/)
* [Ebe nchekwa koodu mbunye Z3](https://github.com/ZcashFoundation/z3)
* [Akwụkwọ Zebra](https://zebra.zfnd.org/)
* [Mkparịta ụka gbasara ikike na ọrụ Zaino](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Emelitere ikpeazụ:** Nọvemba 2026
