<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 kɔɔ so traa ase wɔ Zcash mainnet so wɔ block 1,687,104 (May 31, 2022 UTC).

Nea wobɛfa: sɛnea NU5 maa Zcash shielded pool foforo a enhia nhyehyɛe a wogye di, ne address type biako a ɛyɛ adwuma wɔ pool ahorow nyinaa so.

NU5 (Network Upgrade 5) yɛ Zcash a ɛtɔ so nsia [network upgrade a wɔde yɛ adwuma](../start-here/network-upgrades), a wɔde di dwuma denam [ZIP 252 na ɛwɔ hɔ](https://zips.z.cash/zip-0252). Ɛyɛ cryptographic upgrade kɛse. Ɛde Orchard shielded payment protocol, a wɔasi wɔ Halo 2 proving system so, a Addresses a wɔaka abom ne version 5 transaction format foforo ka ho bae. NU5 a wɔde kɔmaa wɔ Electric Coin Company's zcashd v5.0.0 a wɔayi no adi no mu.

Nea enti a eyi ho hia. Ɔtare a wɔabɔ ho ban no yɛ nea wotumi de ho to so te sɛ nhyehyɛe a ɛyɛɛ no no ara pɛ. Zcash's atare abien a edi kan a wɔabɔ ho ban, Sprout ne Sapling, biara hia nhyehyɛe guasodeyɛ a wogye di pɛnkoro na ama wɔanya wɔn kokoam parameters. Sɛ wɔkora saa parameters no so da bi sen sɛ wɔbɛsɛe no a, anka obi betumi atintim ZEC atoro a obiara renhu. NU5's Orchard pool no to saa dadwen no mu denam Halo 2 proving system a enhia guasodeyɛ a ɛte saa a wɔde di dwuma no so.

## Nhyehyɛe a wotumi de ho to so no

Orchard yɛ shielded protocol a NU5, a wɔakyerɛ aseɛ wɔ [ZIP 224 na ɛwɔ hɔ](https://zips.z.cash/zip-0224). Wɔasi no wɔ Halo 2 proving system so, a ɛde ɔkwan bi a wɔfrɛ no PLONKish arithmetization di dwuma wɔ Pallas ne Vesta curve cycle no so. Akatua a mfaso wɔ so no yɛ mmerɛw: Halo 2 nhia nhyehyɛe a wotumi de ho to so na enhia reference string a wɔahyehyɛ, enti kokoam parameter biara nni hɔ a wobetumi de adi dwuma ɔkwammɔne so da.

Sprout ne Sapling nyinaa gyina nhyehyɛe a wotumi de ho to so so. Nnipa kuw bi tuu mmirika yɛɛ guasodeyɛ bi de kyekyee ɔtare biara parameters, na na ɛsɛ sɛ obiara nya ahotoso sɛ anyɛ yiye koraa no wɔn mu biako sɛee wɔn ahintasɛm no fã bi. Orchard yi saa adwene no fi hɔ. Pool dedaw no da so ara wɔ hɔ wɔ NU5, enti no-setup guarantee no fa sika a wokura wɔ Orchard pool no mu no ho.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## Nea NU5 sesae

NU5 boaboa nsakraeɛ pii a wɔpene so, ne nyinaa bom yɛ adwuma wɔ block 1,687,104.

1. Ɛde Orchard shielded pool (ZIP 224), Halo 2 a egyina protocol a yɛaka ho asɛm wɔ atifi hɔ no kaa ho.
2. Ɛde version 5 transaction format (ZIP 225) kaa ho, nhyehyeɛ a wɔasan asiesie a ɛwɔ mpɔtam ahodoɔ a ɛwɔ hɔ ma transparent, Sapling, ne Orchard data foforɔ. Woyii Sprout fields no fii hɔ, na version 4 format dedaw no kɔɔ so yɛɛ adwuma bere a wɔde yɛɛ adwuma akyi.
3. Ɛde Unified Addresses ne unified viewing keys (ZIP 316) bae, a wɔaka ho asɛm wɔ ɔfã a edi hɔ no mu.
4. Ɛfaa transaction identifier non-malleability (ZIP 244), ɔkwan foforo a wɔfa so bu transaction’s id a ɛtetew nea asɛm bi yɛ fi adanse ne nsaano nkyerɛwee a ɛma ho kwan no ho.
5. Ɛfaa canonical Jubjub point encodings (ZIP 216) de yii encodings a ɛnyɛ gyinapɛn na ɛhyɛɛ mmara a ɛfa nea wɔbu sɛ ɛyɛ asɛm a ɛfata ho no mu den.
6. Ɛmaa relay a ɛfa version 5 nkitahodi ho wɔ peer-to-peer network (ZIP 239) no nyinaa so tumi yɛɛ adwuma.

NU5 nso yɛɛ ZIP dodoɔ bi a ɛwɔ hɔ dada no foforɔ (32, 203, 209, 212, 213, 221, ne 401) enti wɔbu akontaa ma Orchard pool foforɔ no.

## Address ahorow a Wɔaka abom

Ansa na NU5, na pool biara wɔ n’ankasa address type, na na ɛsɛ sɛ obi a ɔde nneɛma mena no hu nea wopɛ. Address ahorow a Wɔaka abom, a wɔakyerɛkyerɛ mu wɔ [ZIP 316 na ɛwɔ hɔ](https://zips.z.cash/zip-0316), sesa saa. Unified address biako betumi aboaboa receivers ano ama bɛboro pool biako, enti nea ɔde kɔma no sika kotoku no paw nea eye sen biara a ɛboa no ara kwa.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](/content-images/nu5-unified-address-6e2c84f66e.webp)

Unified viewing keys yɛ adwuma ɔkwan koro no ara so ma hwɛ. Wɔma wotumi hu akenkan nkutoo wɔ atare ahorow no atifi a address bi kata so. Sɛ wopɛ ɛno ho nsɛm pii a, hwɛ.. [Nneɛma a Wɔde Hwɛ Nneɛma](../zcash-tech/viewing-keys) kratafa.

## Baabi NU5 te

NU5 dii Zcash's nkɔsoɔ a ɛdi kan no akyi: Overwinter, Sapling, Blossom, Heartwood, ne Canopy. It activated on mainnet on May 31, 2022. Wɔpaw Orchard's curve cycle efisɛ ɛboa recursion, a ɛyɛ fapem ma akyiri yi scaling adwuma. NU5 yɛ nea edii NU6 ne NU6.x line of upgrades anim tẽẽ, a ɛkyekyee wɔ Orchard pool no so na akyiri yi ɛyɛɛ patched no.

## Nsɛmfua Nkyerɛase

| Asɛmfua | Plain-English asekyerɛ |
|---|---|
| Network upgrade (NU) | Nsakrae a wɔayɛ no biako wɔ Zcash's mmara a wɔpene so no mu, a wɔayɛ adwuma wɔ block sorokɔ a wɔahyɛ mu |
| Orchard | Shielded pool NU5 de bae, wɔkyekyee wɔ Halo 2 proving nhyehyɛe no so |
| Halo 2 | Proving system a ɛwɔ Orchard akyi a enhia nhyehyɛe biara a wotumi de ho to so |
| Trusted setup | Aguadi a wɔyɛ no pɛnkoro a ɛma ɔtare bi kokoam parameters na ɛsɛ sɛ wogye di sɛ ɔbɛsɛe no |
| Unified Address | Address biako a ebetumi aboaboa receivers ano ama bɛboro pool biako (ZIP 316) |
| Consensus branch id | Nsɛnkyerɛnne a ɛkyerɛ mmara ahorow a asɛm bi yɛ dea agyirae |

## FAQ

So NU5 sesa me ZEC anaa me kokoam nsɛm? Dabi NU5 de shielded pool foforo ne address format foforo kaa ho. Wo ZEC a ɛwɔ hɔ dedaw no nni nkɛntɛnso biara, na wo kokoam nsɛm so ntew. Sika a wode bɛkɔ Orchard no ma wunya ɔtare a enhia nhyehyɛe biara a wotumi de ho to so.

Dɛn ne Orchard? Orchard yɛ Zcash's shielded protocol a NU5. Ɛyɛ adwuma wɔ Halo 2 proving system no so, enti enhia sɛ wɔyɛ nhyehyɛe guasodeyɛ biara a wotumi de ho to so.

So ɛsɛ sɛ meyɛ biribi? Dabi, sika kotoku a wɔboa di NU5 ho dwuma ma wo. Wubetumi akɔ so de address dedaw adi dwuma, na wubetumi afi ase de Address a wɔaka abom adi dwuma bere a wo sika kotoku de ma no.

Dɛn ne Address a wɔaka abom? Address biako a ebetumi akura receivers ama bɛboro pool biako. Nea ɔde kɔma no sika kotoku no paw pool a ɛboa no, enti enhia sɛ wode address soronko ma ma type biara.

So NU5 yi nhyehyɛe a wogye di no fi me sika dedaw no mu? Ɛnyɛ nea wɔde bɛsan akɔ akyi. Orchard nhia nhyehyɛe biara a wotumi de ho to so, nanso Sapling pool no parameters a edi kan no da so ara wɔ hɔ wɔ NU5. No-setup guarantee no fa sika a wɔde asie wɔ Orchard pool no mu ho.

So asɛm dedaw no a wɔde di gua no gyaee adwumayɛ? Dabi NU5 de version 5 format no kaa ho, na version 4 format dedaw no kɔɔ so yɛɛ adwuma bere a wɔde yɛɛ adwuma akyi.

## Sɔ wo ntease hwɛ

Sprout ne Sapling nyinaa hia nhyehyɛe ho guasodeyɛ a wotumi de ho to so. Dɛn na NU5's Orchard pool no sesae wɔ saa asɛm no ho, na dɛn nti na ɛho hia?

<details>
<summary>Answer</summary>

Wɔasisi Orchard wɔ Halo 2 adansedi nhyehyɛe no so, a enhia nhyehyɛe a wotumi de ho to so ne nkyerɛkyerɛmu ahama a wɔahyehyɛ. Ɛno yi asiane a ɛne sɛ wobetumi de kokoam nsɛm a aka no adi dwuma de ayɛ ZEC. Guarantee no fa sika a wɔde asie wɔ Orchard pool no mu ho. Sapling parameters dedaw no da so ara wɔ hɔ wɔ NU5.
</details>

### Akadeɛ

[ZIP 252: NU5 Network Upgrade no a wɔde bedi dwuma](https://zips.z.cash/zip-0252)

[ZIP 224: Orchard a Wɔabɔ ho Ban Protocol](https://zips.z.cash/zip-0224)

[ZIP 225: Nkyerɛase 5 Nkitahodi Nhyehyɛe](https://zips.z.cash/zip-0225)

[ZIP 316: Address a Wɔaka abom ne Hwɛ Safoa a Wɔaka abom](https://zips.z.cash/zip-0316)

[Netwɛk Nkɔsoɔ 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: zcashd 5.0.0 a wɔayi no adi](https://electriccoin.co/blog/new-release-5-0-0/)

### Hwɛ nso

[Zcash Network Nkɔsoɔ a Wɔayɛ](../start-here/network-upgrades)

[Atare a Wɔabɔ Ho Ban](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Nneɛma a Wɔde Hwɛ Nneɛma](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Ntoatoasoɔ: [Network Upgrades ho nkyerɛkyerɛmu](../start-here/network-upgrades) · Dada: [Canopy](../zcash-tech/canopy) · Deɛ ɛdi hɔ: [NU6](../zcash-tech/nu6)
