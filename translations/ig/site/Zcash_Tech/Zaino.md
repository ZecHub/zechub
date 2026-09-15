# Zaino Indexer (Nkọwapụta)

Zaino is a Rust indexer for the Zcash blockchain. It reads chain data from a Zebra full node and serves the data that wallets, explorers, faucets, and other services need without making Zebra itself responsible for every client-facing index.

## TL;DR

* **Zebra** na-akwado usoro Zcash.
* **Zaino** na-edepụta data Zebra's chain ma kpughee API ndị ahịa.
* **Zallet** bụ akpa ego na Z3 stack. Na ndabara ntọala nke Z3, Zallet na-agwa Zebra okwu ozugbo ma ọ chọghị ọrụ Zaino kwụ ọtọ.
* Ọrụ Zaino kwụ ọtọ bara uru mgbe ndị ọrụ chọrọ njedebe gRPC nke kwekọrọ na lightwalletd, onye nnọchi anya JSON-RPC ma ọ bụ akụrụngwa maka obere akpa ego dị mfe, ndị nchọpụta, ọkpọkọ mmiri, yana ọrụ yiri ya.
* Zaino bụ akụrụngwa na-arụ ọrụ, mana ndị ọkwọ ụgbọ ala kwesịrị ịlele akwụkwọ gọọmentị nke Zaino na Z3 maka nkọwapụta nkenye ugbu a tupu ha arụ ya.

## Ihe Zaino Na-eme

Zaino sits between Zebra and client software. Zebra is the consensus node: it downloads, verifies, and follows the Zcash blockchain. Zaino uses Zebra as its source of chain data, then prepares indexed views that client applications can query efficiently.

Nkewa a na-eme ka ọrụ dị iche iche doo anya:

◯ Ihe ndị mejupụtara ya ❑ Ọrụ ọ na-arụ .
|:--|:--|
 Zebra  Full node na validator 
Zaino: Index na onye ahịa-eche ihu API ọrụ.
| Zallet | Wallet service |
 lightwalletd  Ihe nkesa obere akpa ochie nke Zaino haziri iji dochie ma ọ bụ gbakwunye ya.

Zaino na-enye ọrụ maka ndị ahịa ọkụ, ndị ahịa zuru oke ma ọ bụ obere akpa ego, yana onye nchọpụta ngọngọ. Ọ na - enye ohere ịnweta agbụ nke emechara, agbụ kachasị mma a rụzuru arụzu, yana data mempool nke Zebra nwere.

## Otu O Si Dabara Na Zcash Stack Ugbu A

A na-ewu Z3 ugbu a gburugburu Zebra, Zallet, yana Zaino nhọrọ.

Na ndabara Z3 nkesa, Zebra na Zallet agba ọsọ ọnụ. Zallet ruru Zebra ozugbo, yabụ onye ọrụ na-agba naanị obere akpa ego adịghị mkpa ịmalite ọrụ Zaino kwụ ọtọ.

Zaino is added when the operator wants to serve external clients. In Z3, it runs behind the `indexer` Kọwaa profaịlụ ma tinye:

* a lightwalletd-dakọtara gRPC njedebe maka ndị ahịa obere akpa ego dị mfe.
* onye nnọchi anya JSON-RPC maka ndị na - eme nchọpụta, ọkpọkọ mmiri, yana azụ ọrụ.
* nchekwa data indexer dị iche na ọnọdụ agbụ Zebra.

Nke a na-eme ka Zaino dị mkpa maka azụ nke obere akpa, ndị ọrụ akụrụngwa ọha, ndị nyocha, ọkpọkọ mmiri, yana ndị mmepe na-anwale ọrụ chọrọ data Zcash indexed.

## Zaino na lightwalletd

lightwalletd bụ ihe nkesa akpa ego mbụ. Zaino bụ ụzọ Rust-based nke ga - esochi ọrụ a. Ebumnuche ya bụ ịnye API dakọtara ebe enwere ike ka obere akpa na ọrụ nwee ike ibugharị n'enweghị edegharịrị kpamkpam ozugbo.

Nke ahụ apụtaghị na nkesa ọ bụla nke lightwalletd agafeela Zaino. Ndị ọrụ kwesịrị ịgwọ Zaino dị ka akụkụ nke nchịkọta Zebra ugbu a ma lelee akwụkwọ oru ngo kachasị ọhụrụ, ntọhapụ, yana dashboard ọrụ tupu ịhọrọ ihe ga-agba ọsọ.

## Ihe Ndị Na-ahụ Maka Ọrụ Ahụ Ga-edepụta

Ụzọ kachasị mfe maka nkesa bụ ebe nchekwa Z3. Z3 gụnyere Zaino dịka ọrụ nhọrọ:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Gbaa nhazi Z3 mbụ ma chere ka Zebra mekọrịta tupu ịmalite ọrụ ndị dabere na mainnet ma ọ bụ testnet.

Zaino na-ekpughe ụdị ọrụ netwọk abụọ. Ọrụ gRPC bụ API nke dị n'ihu lightwallet. A na -ezube JSON-RPC maka loopback ma ọ bụ tụkwasịrị obi netwọọdụ nzuzo belụsọ ma akwa mpụga nyere nchebe. Ekwela ka njedebe JSON RPC a kwadoghị ma ọ bụkwanụ ezoro ezo gaa na ịntanetị ọha mmadụ.

## Ụfọdụ eserese na-egosi etu Zaino si arụ ọrụ.

### Ụlọ ihe owuwu dị n'ime Zaino.

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Zaino Live Service Architecture (Ụdị ọrụ ndụ)

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Zaino System Architecture (Ụdị Ụlọ Ọrụ)

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Ihe Ndị A Na-emekarịhie Emeghị

** Na-emeso Zaino dị ka ọnụ zuru oke.** Zaino abụghị onye nyocha. Zebra na - enyocha agbụ; Zaino index data sitere na Zebra.

** Iche na nkenye nke Z3 ọ bụla chọrọ Zaino kwụ ọtọ.** Zallet nwere ike iru Zebra ozugbo n'ime ndabara Z3. Malite Zaino mgbe ịchọrọ ọrụ indexer dịpụrụ adịpụ maka ndị ahịa mpụga.

** Na-eweta atụmatụ ndị a na-eme atụmatụ dị ka nke e depụtarala.** Zaino bụ ihe mmepe siri ike, yabụ lelee ndetu ntọhapụ ugbu a na akwụkwọ tupu ịkọwapụta njirimara dịka enwere.

** Na-ekpughe JSON-RPC n'emeghị ihe ọ bụla.** Zaino si interface JSON RPC bụ maka loopback ma ọ bụ tụkwasịrị obi netwọkụ nzuzo belụsọ na echedoro ya site na oyi akwa ọzọ.

## Olee ebe m nwere ike isi mụtakwuo ihe ndị ọzọ?

* [Zaino GitHub ebe nchekwa](https://github.com/zingolabs/zaino)
* [Ihe ndị Zaino na-ewepụta](https://github.com/zingolabs/zaino/releases)
* [Akwụkwọ e ji emepụta Zaino](https://zingolabs.github.io/zaino/)
* [Ebe nchekwa Z3 nke nkesa.](https://github.com/ZcashFoundation/z3)
* [Akwụkwọ Zebra](https://zebra.zfnd.org/)
* [Onyinye ego Zaino na mkparịta ụka oru ngo ahụ](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Emelitere ikpeazụ:** Ọgọstụ 2026
