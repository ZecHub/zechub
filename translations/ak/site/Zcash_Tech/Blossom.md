<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nhwiren a ɛyɛ fɛ

> Blossom kɔɔ so traa ase wɔ Zcash mainnet so wɔ block 653,600 (December 11, 2019 UTC).

Nea wobɛfa akɔ: sɛnea Blossom yɛɛ Zcash blocks no du bɛyɛ mmɔho abien ntɛmntɛm a ɛnsakra ZEC dodow a network no yɛ bere tenten.

Blossom yɛ Zcash a ɔyɛ ɔbarima [network upgrade a wɔde yɛ adwuma](../start-here/network-upgrades). Wɔde sii hɔ denam... [ZIP 206 na ɛwɔ hɔ](https://zips.z.cash/zip-0206), na wɔakyerɛkyerɛ ne nsakrae titiriw a wɔpene so no mu wɔ [ZIP 208 na ɛwɔ hɔ](https://zips.z.cash/zip-0208). Na Blossom yɛ scalability upgrade: ɛmaa bere a wɔde asi wɔn ani so wɔ block ahorow ntam no yɛɛ tiaa fii sikɔne 150 koduu sikani 75, enti block ahorow no ba bɛyɛ mmɔho abien. Electric Coin Company no dii Blossom anim na wɔde too gua.

Nea enti a eyi ho hia. Sɛ wosoma ZEC a, wotwɛn ma network no si so dua wɔ block bi mu. Sɛ block ahorow no yɛ brɛoo a, wotwɛn kyɛ. Ansa na Blossom reba no, na wɔhwɛ kwan sɛ wɔbɛbɔ block foforo bɛyɛ sikɔne 150 biara. Blossom twaa saa botae no mu fã, kɔɔ sikani 75, enti nsɛm a wɔde si so dua no ba ntɛm na nkɔnsɔnkɔnsɔn no betumi de nnwuma pii akɔ so wɔ bere koro no ara mu. Ɛyɛɛ eyi a wanbɔ ZEC pii anaasɛ ankanyan bere a wɔde bɛkyekyɛ daakye no fã.

## Nneɛma a wɔde siw ano ntɛmntɛm

Blossom nsakrae titiriw no yɛ mmerɛw. Zcash target block spacing, bere a network no de asi n’ani so wɔ block biako ne nea edi hɔ ntam no, so tew fii sikɔne 150 kɔɔ sikani 75 ([ZIP 208 na ɛwɔ hɔ](https://zips.z.cash/zip-0208)). Wɔnam adanse a ɛkyerɛ sɛ wɔayɛ adwuma so na ehu block ahorow, enti nsonsonoe ankasa a ɛda wɔn ntam no gu ahorow, nanso mprempren network no de asi n’ani so sɛ obenya block bɛyɛ sikɔne 75 biara sen sɛ ɛbɛyɛ 150 biara.

Nneɛma abien di akyi:

1. Block ahorow ba bɛyɛ mmɔho abien, enti nkɔnsɔnkɔnsɔn no tumi de nnwuma a wɔyɛ no bɛyɛ mmɔho abien wɔ bere biako biara mu.
2. Wo asɛm no nya ne confirmation a edi kan ntɛm, efisɛ wontwɛn bere tenten saa mma block a edi hɔ no.

![Before Blossom the block target was 150 seconds with slower confirmations and lower throughput. After Blossom the target is 75 seconds with faster confirmations and roughly double the throughput](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-block-spacing.png)

## Sɛ wɔbɛma sika a wɔde ma no akɔ so ayɛ nea ɛkɔ so daa

Block ahorow a ɛyɛ ntɛmntɛm ma asɛmmisa bi sɔre. Sɛ Zcash yɛɛ blocks mmɔho abien na block biara da so ara tua akatua koro no ara a, network no bɛbɔ ZEC ntɛmntɛm mmɔho abien. Blossom kwati saa. Ɛtew akatua a wotua wɔ block biara so no so fã, na ɛmaa block-akatua a wɔtew so fã no mmɔho abien fii block 840,000 koduu 1,680,000 ([ZIP 208 na ɛwɔ hɔ](https://zips.z.cash/zip-0208)). Block dodow mmɔho abien, a emu biara tua fã no, yɛ adwuma kodu ZEC dodow koro no ara a wɔbɔ wɔ bere unit biara mu. Nhyehyɛe a wɔde bɛma nyinaa ne bere a wɔbɛtew so daakye, a wɔsusuw no bere ankasa mu no ansakra.

![How Blossom keeps issuance steady: 75 second blocks arrive twice as often, the per-block reward is halved, the halving interval is doubled, so total emission over time stays the same](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-emission-balance.png)

## Nkɔso a ɛyɛ ahyɛde

Na Blossom yɛ nsakrae a aman abien adwene hyia, a ɛkyerɛ sɛ na ɛsɛ sɛ node biara yɛ foforo na ama wɔakɔ so adi nkɔnsɔnkɔnsɔn no akyi ([ZIP 206 na ɛwɔ hɔ](https://zips.z.cash/zip-0206)). Na ɛnyɛ nea wobetumi apaw ama node operator a ɔpɛ sɛ ɔtra sync. Blossom yɛɛ adwuma wɔ mainnet block 653,600 na ɛkura n’ankasa consensus branch id, tag a ɛma nodes ne transactions si so dua sɛ wɔwɔ Blossom mmara no so. Nkɔsoɔ no de Zcash standard network upgrade mechanism ([ZIP 200 na ɛwɔ hɔ](https://zips.z.cash/zip-0200)).

## Baabi a Blossom fata

Blossom yɛ Zcash network upgrade a ɛtɔ so mmiɛnsa. Ɛdii Overwinter ne Sapling akyi, na ɛbaa Heartwood ne Canopy anim. Nea ɛnte sɛ Sapling a ɛsan yɛɛ Zcash shielded cryptography no ho adwuma no, na Blossom de n’adwene asi nsenia ne ahoɔhare so. Na n’adwuma titiriw ne block timing, na ɛnyɛ kokoam nsɛm foforo.

## Nsɛmfua Nkyerɛase

| Asɛmfua | Plain-English asekyerɛ |
|---|---|
| Block botaeɛ ntam kwan | Bere a ntwamutam no de si n’ani so wɔ block biako ne nea edi hɔ ntam |
| Block akatua | ZEC foforo no bɔɔ na wotuae bere a wɔtu block biara |
| Halving ntamgyinafo | Block dodow ahe na ɛtwam wɔ block akatua no fã biara ntam |
| Nhyiamu baa dwumadibea id | Tag a ɛhyɛ network mmara ahorow a node anaa asɛm bi di akyi agyirae |
| Aman abien adwene a ɛwɔ hɔ no nsakrae | Mmara nsakrae a ɛsɛ sɛ node biara gye tom na ama atra netɛw |
| Netwɛk no mu nkɔso (NU) | Nsakraeɛ a wɔayɛ no pɛpɛɛpɛ wɔ Zcash mmara a wɔpene so, a wɔayɛ adwuma wɔ block height a wɔahyɛ |

## FAQ

So Blossom sesa ZEC dodow a ɛwɔ hɔ anaasɛ bere a fã bi ba? Dabi, wɔtew akatua a wɔde ma wɔ block biara so no so fã na wɔmaa bere a wɔde twa fã no mmɔho abien bere koro no ara mu, enti ZEC dodow a wɔbɔe wɔ bere biako biara mu, ne bere a wɔde bɛtew fã daakye no kɔɔ so yɛɛ pɛ.

So Blossom sesa me ZEC anaa me kokoam nsɛm? Dabi Blossom sesaa block bere ne akatua akontaabu. Ɛnka wo sika a aka anaa wo nnwuma a wɔabɔ ho ban no.

Dɛn na sikɔne 75 kyerɛ ankasa? Ɛyɛ botae a wɔde asi wɔn ani so, na ɛnyɛ nea wɔde hyɛ bɔ. Wɔnam adanse a ɛkyerɛ sɛ wɔayɛ adwuma so na ehu block ahorow, enti nsonsonoe ankasa a ɛda block ahorow ntam no gu ahorow. Netwɛk no de asi n’ani so sɛ wɔbɛma biako bɛyɛ sikɔne 75 biara mmom sen sɛ wɔbɛma 150 biara.

So na ɛsɛ sɛ meyɛ biribi bere a Blossom yɛɛ adwuma no? Sɛ wo tuu node a ɛyɛ ma a, na ɛsɛ sɛ wo upgrade no, efisɛ na Blossom yɛ ahyɛde. Sɛ wode sika kotoku dii dwuma a, na wuhia nkyerɛase bi a ɛfoa mmara foforo no so.

Dɛn nti na wɔatew block akatua no so koraa? Efisɛ mprempren block ahorow ba ntɛmntɛm mmɔho abien. Sɛ wɔtew akatua a ɛwɔ block biara so no fã a, ɛmma network no ntumi nnyɛ ZEC ntɛmntɛm mmɔho abien.

Bere bɛn na Blossom yɛɛ adwuma? Wɔ mainnet block 653,600, wɔ December 11, 2019 UTC.

## Sɔ wo ntease hwɛ

Blossom maa Zcash blocks duu hɔ bɛyɛ mmɔho abien. Dɛn nti na ɛno amma sɛnea wɔbɔ ZEC foforo no mmɔho abien?

<details>
<summary>Answer</summary>

Efisɛ Blossom nso tew akatua a wotua wɔ block biara so no so fã na ɔmaa bere a wɔde twaa fã no mmɔho abien fii block 840,000 koduu 1,680,000. Block dodow a ɛboro so mmɔho abien, a emu biara tua fã no, ka bom yɛ ZEC dodow koro wɔ bere biara mu, enti nhyehyɛe a wɔde susuw mframa bɔne a wɔsusuw wɔ bere ankasa mu no ansakra.
</details>

### Akadeɛ

[ZIP 208: Block Target Spacing a Ɛyɛ Tiaa](https://zips.z.cash/zip-0208)

[ZIP 206: Blossom Network Upgrade no a wɔde bedi dwuma](https://zips.z.cash/zip-0206)

[Blossom Ntwamutam Nkɔso](https://z.cash/upgrade/blossom/)

[Blossom Upgrade Tu Ahoɔhare, Scalability, Tumi (Electric Coin Company) Tu mpɔn](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### Hwɛ nso

[Zcash Network Nkɔsoɔ a Wɔayɛ](../start-here/network-upgrades)

[Zcash Sikasɛm Ho Nhyehyɛe](../start-here/zcash-monetary-policy)

[Dɛn ne ZEC ne Zcash](../start-here/what-is-zec-and-zcash)

[Nodes a Ɛyɛ Pɛ](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

Ntoatoasoɔ: [Network Upgrades ho nkyerɛkyerɛmu](../start-here/network-upgrades) · Dada: [Sapling](../zcash-tech/sapling) · Deɛ ɛdi hɔ: [Koma Nnua](../zcash-tech/heartwood)
