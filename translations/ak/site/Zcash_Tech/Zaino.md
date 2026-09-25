# Zaino Nhyehyɛmu no

Zaino yɛ Rust indexer ma Zcash blockchain. Ɛkenkan chain data firi Zebra full node mu na ɛsom de di dwuma sɛ wallets, explorers, faucets ne nnwuma afoforo hia a ɛnhyɛ da mma Zebra ankasa nni asɛyɛde wɔ ɔkyɛnfoɔ-facing index biara ho.

## TL;DR

* **Zebra** di Zcash nkɔnsɔnkɔnsɔn no ho dwuma.
* **Zaino** kyerɛ Zebra chain data mu na ɛda client-facing API adi.
* **Zallet** yɛ wallet no fa wɔ Z3 stack mu. Wɔ default Z3 setup, Zallet ne Zebra di nkitaho tẽẽ na ɛnhia Zaino service a ɛgyina hɔ ma wɔn ankasa.
* The standalone Zaino service is useful when operators need a lightwalletd-compatible gRPC endpoint, a JSON-RPC proxy, or infrastructure for light wallets, explorers, faucets, and similar services.
* Zaino yɛ adwuma, nanso ɛsɛ sɛ wɔn a wɔyɛ dwumadie no hwehwɛ mu wɔ Zaino ne Z3 nkrataa ho ansa na wɔde ayɛ dwuma.

## Nea Zaino Yɛ no

Zaino tena Zebra ne client software ntam. zebra yɛ consensus node: ɛyɛ download, verifies na ɛdi Zcash blockchain akyi. zaino de zebra di dwuma sɛ chain data source no, afei ɔsiesie indexed views a clients application bɛtumi abisa efiri mu.

Saa ntetewee yi ma dwumadi ahorow no da hɔ:

| Component no | Asodie |
|:--|:--|
| Zebra | Node a ɛyɛ pɛpɛɛpɛ ne validator |
| Zaino | Indexer ne API dwumadie a ɛhwɛ akraman |
| Zallet | Wallet service |
| lightwalletd | Older light wallet server a wɔayɛ Zaino sɛ ɛbɛsesa anaasɛ ɛbɛboa |

Zaino ma dwumadie a ɛfa light clients, full clients anaa wallets ne block explorers ho. Ɛma kwan kɔ finalized chain no mu, best chain a ɛnni awieɛ na ɛyɛ papa paa wɔ hɔ, ɛne mempool data a ɛwɔ Zebra nsam.

## Sεnea Ɔfa Yεn Nsa Wɔ Zcash Dwumadibea a Ɛwɔ Hɔ no Mu

Seesei Z3 stack no gyina Zebra, Zallet ne Zaino a w'atumi ayi bi adi so.

Wɔ Z3 de no, Zebra ne Zallet di dwuma wɔ bere koro mu. Zallet kɔdi Zebra anim tẽẽ ma enti obi a ɔrekɔyɛ adwuma bi na ɛhwɛ sɛ wallet nko ara bɛtumi adi dwuma no nhia sɛ ɔbɛhyɛ Zaino dwumadie ase.

Zaino de ka ho sε operator no pεsε ɔbεsom amansanfo a w'ani nhyia. Wͻ Z3 mu, na odi akyi ma nnwumakuo kכnkoaa (external clients). `indexer` Kyerɛw ne ho mfonini na fa ka:

* lightwalletd-compatible gRPC endpoint ma light wallet clients, a yɛ de di dwuma wɔ abɛɛfo mfiri so.
* JSON-RPC proxy ma explorers, faucets ne service backends
* indexers database a ɔtew ne ho firi Zebra chain state no so.

Eyi ma Zaino ho hia paa wɔ sika nkotoku akyi, aban asisifo nnwuma mu adwumayɛfo, nhwehwɛmufoɔ, faucets ne wɔn a wɔyɛ dwumadie ahodoɔ no de hwehwɛ Zcash chain data.

## Zaino ne lightwalletd a wɔagye din no

lightwalletd is the original light wallet server. Zaino is the Rust-based successor path for this role. Its goal is to provide compatible APIs where possible so wallets and services can migrate without being fully rewritten at once.

Ɛno nkyerɛ sɛ lightwalletd dwumadie biara akɔ Zaino. Ɛsɛsɛ adwumafoɔ bu Zaino sε emu bi a εwɔ Zebra-based stack mu na wɔhwɛ nhyehyɛeɛ nkrataa, nsunsuansoɔ ne service dashboards ansa na w'ayi nea wobɛyɛ no asi hɔ.

## Ɔhwɛfoɔ no nkaeɛ

Ɔkwan a ɛyɛ den paa wɔ tumi mu ne sɛ wobɛfa Z3 akoraeɛ no. Z3 de Zaino ka ho te sɛ dwumadie bi:

```bash
docker compose --env-file .env.<network> --profile indexer up -d
```

Di kan yɛ Z3 setup no na twɛn ma Zebra ne wo di nkitaho ansa na wode adi dwuma wɔ mainnet anaa testnet so.

Zaino de network service ahodoɔ mmienu na ɛgu hɔ. gRPC yε lightwallet-facing API no. JSON-RPC dwumadie no yɛ ma loopback anaa trusted private networks gye sɛ external layer bi bɔ ban a. Mma kwan mma w'amumfoɔ internet so mfa ne ho nhyem wɔ JSON RPC endpoint biara a wonnya nkyerɛɛ mu nsɛm nkyerɛ obi bio, anaasɛ wɔnkyerɛw wo din wom.

## Nsekyerɛmu bi a ɛkyerɛ sɛnea Zaino yɛ adwuma no.

### Zaino Abɔde mu Adwumadeyɛ

![Zaino Internal Architecture](/content-images/image-2025-01-02-190143429-3f3cc78fa5.webp)

### Zaino Live Service Architecture (Ɔsom a wɔdi no anikan)

![Zebra Live Service Architecture](/content-images/image-2025-01-02-190349017-892cb409ea.webp)

### Zaino Nhyehyɛeɛ Nkyerɛmu

![Zaino System Architecture](/content-images/image-2025-01-02-190448037-1e4e675ccb.webp)

## Mfomso a Wɔtaa Di

**Wode Zaino yɛ node a ɛwie pɛ.** Zaino nyɛ validator. Zebra na ɛyɛ chain no; Zaino kyerɛ data firi Zebra hɔ ase.

**Wode gye sɛ Z3 biara hia Zaino a ɛgyina hɔ ankasa.** Zallet betumi adu Zebra ho tẽẽ wɔ default Z3 stack no mu. Fa zaino di dwuma bere a wuhia dwumadifoɔ adwuma a ɛwɔ baabiara ma apomudenfo foforo.

** Ayɛ nhyehyeɛ a wɔabɔ ho pɔw sɛ wɔde adi dwuma dada.** Zaino yɛ adwuma paa, enti hwɛ nsɛm ne nkrataa ahodoɔ ansa na woakyerɛkyerɛ dwumadie bi mu.

**Fa JSON-RPC adi dwuma a aniwa nnim.** Zaino's JSON RPC interface no yɛ ma loopback anaa trusted private networks gye sɛ wɔde layer foforo abɔ ho ban.

## Ɛhe na metumi asua nneɛma pii?

* [Zaino GitHub akoraeɛ no](https://github.com/zingolabs/zaino)
* [Zaino nsɛm a wɔayi no adi](https://github.com/zingolabs/zaino/releases)
* [Nhoma a Zaino ayɛ no ho kyerɛwtohɔ](https://zingolabs.github.io/zaino/)
* [Z3 deployment repository (Ɔkwan a wɔfa so de di dwuma)](https://github.com/ZcashFoundation/z3)
* [Zebra nkrataa a w'atwerɛ no](https://zebra.zfnd.org/)
* [Zaino ntoboa ne dwumadie ho nsusuyԑ](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation-with-zaino/48545)

**Nneɛma a etwa toɔ:** Ɔpɛnimaa 2026
