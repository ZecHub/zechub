# Zaino Onye ndepụta

Zaino bụ onye ndepụta [indexer] Rust maka Zcash blockchain. Ọ na-agụ data chain sitere na Zebra full node ma na-enye data ndị e-akpa ego [wallet], ndị nyocha, faucet, na ọrụ ndị ọzọ chọrọ, na-enweghị ime ka Zebra n'onwe ya bụrụ onye na-ahụ maka ndepụta ọ bụla chere ndị ahịa ihu.

## Na nkenke

* **Zebra** na-akwado chain Zcash.
* **Zaino** na-edepụta data chain nke Zebra ma na-ekpughe API ndị chere ndị ahịa ihu.
* **Zallet** bụ akụrụngwa e-akpa ego na nchịkọta Z3. N'ime nhazi Z3 ndabara, Zallet na-ekwurịta okwu na Zebra ozugbo, ọ dịghịkwa achọ ọrụ Zaino kwụụrụ onwe ya.
* Ọrụ Zaino kwụụrụ onwe ya bara uru mgbe ndị na-arụ ọrụ chọrọ njedebe gRPC kwekọrọ na lightwalletd, proxy JSON-RPC, ma ọ bụ akụrụngwa maka e-akpa ego dị mfe, ndị nyocha, faucet, na ọrụ ndị yiri ya.
* Zaino bụ akụrụngwa na-arụ ọrụ, mana ndị na-arụ ọrụ kwesịrị ilele akwụkwọ Zaino gọọmentị na nke Z3 maka nkọwa mbugharị dị ugbu a tupu ha agba ya n'ime mmepụta.

## Ihe Zaino Na-eme

Zaino nọ n'etiti Zebra na sọftụwia onye ahịa. Zebra bụ consensus node: ọ na-ebudata, na-enyocha, ma na-esochi Zcash blockchain. Zaino na-eji Zebra dị ka ebe data chain ya si abịa, wee kwadebe echiche ndị edepụtara nke ngwa ndị ahịa pụrụ ịjụ nke ọma.

Nkewa a na-eme ka ọrụ ndị ahụ doo anya:

| Akụrụngwa | Ọrụ |
|:--|:--|
| Zebra | Full node na onye nkwado |
| Zaino | Onye ndepụta na ọrụ API chere ndị ahịa ihu |
| Zallet | Ọrụ e-akpa ego |
| lightwalletd | Sava e-akpa ego dị mfe ochie nke e mere Zaino iji dochie ma ọ bụ kwado |

Zaino na-enye arụmọrụ maka light client, full client ma ọ bụ e-akpa ego, na ndị nyocha block. Ọ na-enye ohere ịnweta chain emechara, chain kacha mma nke emechabeghị, na data mempool nke Zebra jidere.

## Otu O Si Daba n'Usoro Zcash Dị Ugbu A

A na-ewu usoro Z3 dị ugbu a gburugburu Zebra, Zallet, na Zaino nhọrọ.

N'ime mbugharị Z3 ndabara, Zebra na Zallet na-agba ọnụ. Zallet na-eru Zebra ozugbo, yabụ onye na-arụ ọrụ nke na-agba naanị nchịkọta e-akpa ego mpaghara adịghị mkpa ịmalite ọrụ Zaino kwụụrụ onwe ya.

A na-agbakwunye Zaino mgbe onye na-arụ ọrụ chọrọ ijere ndị ahịa mpụga ozi. Na Z3, ọ na-agba n'azụ profaịlụ Compose `indexer` ma na-agbakwunye:

* njedebe gRPC kwekọrọ na lightwalletd maka ndị ahịa e-akpa ego dị mfe
* proxy JSON-RPC maka ndị nyocha, faucet, na azụ ọrụ
* nchekwa data onye ndepụta dị iche na ọnọdụ chain nke Zebra

Nke a na-eme Zaino ka ọ dị mkpa karịsịa maka azụ ọrụ e-akpa ego, ndị na-arụ akụrụngwa ọha, ndị nyocha, faucet, na ndị mmepụta na-anwale ọrụ chọrọ data chain Zcash edepụtara.

## Zaino na lightwalletd

lightwalletd bụ sava e-akpa ego dị mfe mbụ. Zaino bụ ụzọ onye ga-anọchi ya dabere na Rust maka ọrụ a. Ebumnuche ya bụ inye API kwekọrọ ebe o kwere omume, ka e-akpa ego na ọrụ nwee ike ịkwaga n'enweghị idegharị ha kpamkpam n'otu oge.

Nke ahụ apụtaghị na mbugharị lightwalletd ọ bụla akwagala na Zaino. Ndị na-arụ ọrụ kwesịrị iwere Zaino dịka akụkụ nke usoro dabere na Zebra dị ugbu a ma lelee akwụkwọ ọrụ kachasị ọhụrụ, mwepụta, na dashboard ọrụ tupu ha ahọrọ ihe ha ga-agba.

## Ihe Ndị Na-arụ Ọrụ Kwesịrị Ịmara

Ụzọ mbugharị kachasị mfe na nke nwere ikike bụ ebe nchekwa Z3. Z3 gụnyere Zaino dịka ọrụ nhọrọ:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Buru ụzọ gbaa nhazi Z3 nkịtị ma chere ka Zebra mekọrịta tupu ịmalite ọrụ ndị dabere na ya na mainnet ma ọ bụ testnet.

Zaino na-ekpughe ụdị ọrụ netwọk abụọ. Ọrụ gRPC bụ API chere e-akpa ego dị mfe ihu. Ọrụ JSON-RPC bụ maka loopback ma ọ bụ netwọk nzuzo a tụkwasịrị obi, ọ gwụla ma oyi akwa mpụga na-enye nchebe. Ekwela ka njedebe JSON-RPC na-enweghị nkwenye ma ọ bụ na-enweghị nzuzo pụta n'ihu ịntanetị ọha.

## Ụfọdụ eserese na-egosi otu Zaino si arụ ọrụ

### Ihe Owuwu Ime Zaino

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Ihe Owuwu Ọrụ Dị Ndụ Zaino

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Ihe Owuwu Usoro Zaino

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Njehie A Na-ahụkarị

**Iwere Zaino dị ka full node.** Zaino abụghị onye nkwado. Zebra na-akwado chain; Zaino na-edepụta data sitere na Zebra.

**Iche na mbugharị Z3 ọ bụla chọrọ Zaino kwụụrụ onwe ya.** Zallet nwere ike iru Zebra ozugbo n'ime usoro Z3 ndabara. Malite Zaino mgbe ịchọrọ ọrụ onye ndepụta kwụụrụ onwe ya maka ndị ahịa mpụga.

**Igosipụta atụmatụ e zubere dịka ndị ebularị.** A na-emepụta Zaino n'ọrụ, yabụ lelee ndetu mwepụta na akwụkwọ dị ugbu a tupu ịkọwa atụmatụ dịka nke dị.

**Ikpughe JSON-RPC n'enweghị nlezianya.** Ihe nkenye JSON-RPC nke Zaino bụ maka loopback ma ọ bụ netwọk nzuzo a tụkwasịrị obi, ọ gwụla ma oyi akwa ọzọ chebere ya.

## Ebee ka m nwere ike ịmụtakwu?

* [ebe nchekwa Zaino GitHub](https://github.com/zingolabs/zaino)
* [mwepụta Zaino](https://github.com/zingolabs/zaino/releases)
* [akwụkwọ emepụtara Zaino](https://zingolabs.github.io/zaino/)
* [ebe nchekwa mbugharị Z3](https://github.com/ZcashFoundation/z3)
* [akwụkwọ Zebra](https://zebra.zfnd.org/)
* [mkparịta ụka ikike na ọrụ Zaino](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Emelitere ikpeazụ:** Ọgọọst 2026
