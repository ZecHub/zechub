<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Awɔw bere mu

> Awɔw bere no kɔɔ so traa ase wɔ Zcash mainnet so wɔ block 347,500 (June 26, 2018 UTC).

Nea wobɛfa: sɛnea Zcash suaa sɛ ɔbɛsesa n’ankasa mmara dwoodwoo, ne nea enti a saa fapem no maa akyiri yi nkɔso biara, a efi ase wɔ Sapling, tumi yɛɛ yiye.

Awɔw bere mu yɛ Zcash [network upgrade a wɔde yɛ adwuma](../start-here/network-upgrades), nea edi kan bere a wɔde ntam nkitahodi no fii ase akyi. Wɔakyerɛkyerɛ mu wɔ Zcash Nkɔsoɔ Nsusuiɛ ahodoɔ bi mu: [ZIP 200 na ɛwɔ hɔ](https://zips.z.cash/zip-0200), [ZIP 201 na ɛwɔ hɔ](https://zips.z.cash/zip-0201), [ZIP 202 na ɛwɔ hɔ](https://zips.z.cash/zip-0202), [ZIP 203 na ɛwɔ hɔ](https://zips.z.cash/zip-0203), ne [ZIP 143 na ɛwɔ hɔ](https://zips.z.cash/zip-0143). Overwinter amfa nneɛma foforo biara a wɔabɔ ho ban anhyɛ mu. Mmom no ɛmaa protocol no yɛɛ den sɛnea ɛbɛyɛ a daakye upgrades betumi de amena dwoodwoo. Upgrade no yɛ documented denam... [Electric Coin Company](../zcash-organizations/electric-coin-company) wɔ Zcash upgrade krataafa a ɛyɛ aban de no so.

Nea enti a eyi ho hia. Blockchain a ɛte ase ho mmara a wobɛsakra no yɛ asiane. Get it wrong na network no nkyerɛase abien betumi ampene so, anaasɛ wobetumi ayɛ asɛm bi a wɔahyɛ da ayɛ ama nkɔnsɔnkɔnsɔn biako ho mfonini akɔ foforo so. Ansa na Overwinter reba no, na Zcash nni ɔkwan biara a ɛyɛ gyinapɛn, a ahobammɔ wom a wɔde bɛsan abɔ a wɔbɛfa so ayɛ mmara nsakrae ho nhyehyɛe. Overwinter siesiee saa asɛm no. Ɛmaa Zcash yɛɛ nhyehyɛeɛ a ɛfata ma nkɔsoɔ ne, sɛdeɛ ɛho hia saa ara no, akwan mmienu replay ahobanbɔ, enti asɛm a ɛyɛ adwuma wɔ mmara baako ase no, wɔrentumi nsan nkɔbɔ bio wɔ foforɔ ase. Saa fapem adwuma no ne nea ɛmaa Sapling, ne nkɔso biara a wɔyɛe wɔ ɛno akyi no, tumi yɛɛ adwuma yiye.

![Before and after Overwinter: before, no standard upgrade path and no replay protection. After, a network upgrade mechanism with two-way replay protection and safe future upgrades](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-before-after.png)

## Adwinnade a wɔde yɛ upgrade no

Overwinter de Network Upgrade Mechanism a wɔakyerɛkyerɛ mu wɔ [ZIP 200 na ɛwɔ hɔ](https://zips.z.cash/zip-0200). Mprempren upgrade biara kyerɛkyerɛ nneɛma abien mu: consensus branch id a ɛbɔ mprempren mmara ahorow no din, ne activation height, block a mmara foforo no di dwuma wɔ so. Wei ma obiara a ɔreyɛ Zcash software no nya mfɛnsere a emu da hɔ a ɔde bɛyɛ foforo ansa na wasakra.

Overwinter ankasa yɛɛ adwuma wɔ mainnet so wɔ block 347,500.

[ZIP 201 na ɛwɔ hɔ](https://zips.z.cash/zip-0201) di sɛnea nodes ne wɔn ho wɔn ho di wɔ upgrade bi ho dwuma. Ansa na wɔbɛma ayɛ adwuma no, nodes pɛ sɛ wɔde wɔn ho hyɛ atipɛnfo a wɔde version koro no ara di dwuma no ho. Wɔ activation mu no, node bi twa nkitahodi fi atipɛnfo a wɔwɔ consensus branch soronko so, enti network no mu paapae yiye wɔ mmara foforo no so sen sɛ ɛbɛyɛ basaa.

## Replay ahobammɔ

Replay yɛ bere a obi fa asɛm bi a na ɛyɛ adwuma wɔ nkɔnsɔnkɔnsɔn biako so na ɔsan bɔ amanneɛ wɔ foforo so. Overwinter de nsaano nkyerɛwee nhyehyɛe foforo bi to saa ɔpon no mu, a wɔakyerɛkyerɛ mu wɔ [ZIP 143 na ɛwɔ hɔ](https://zips.z.cash/zip-0143). Sɛ sika kotoku bi de ne nsa hyɛ asɛm bi ase a, afei de nsaano nkyerɛwee no hyɛ bɔ mprempren nkɔnsɔnkɔnsɔn no consensus branch id. Adwuma a wɔde wɔn nsa ahyɛ ase ama baa dwumadibea biako no nyɛ adwuma wɔ baa dwumadibea foforo biara so kɛkɛ, wɔ ɔkwan biara so. Ɛno ne nea akwan abien so replay ahobammɔ kyerɛ.

Eyi yɛ adwuma nsa ne nsa ne foforo version 3 transaction format fi [ZIP 202 na ɛwɔ hɔ](https://zips.z.cash/zip-0202), a ɛtɔ mmere bi a wɔfrɛ no Overwintered format no. Ɛde fOverwintered frankaa ne version kuw id a ɛma ɛda adi pefee sɛ mmara a wɔpene so bɛn na asɛm bi yɛ ne dea. Sɛ́ mfaso a ɛwɔ ɔfã bi no, nhyehyɛe foforo a wɔde wɔn nsa hyɛ ase no nso maa sɛnea wogye nnwuma a ɛda adi pefee tom ntɛmntɛm no yɛɛ yiye.

![How replay protection works: a wallet signs a transaction that commits to the current consensus branch id, so the transaction cannot be replayed on any other branch](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-replay-flow.png)

## Aguadi no bere atwam

[ZIP 203 na ɛwɔ hɔ](https://zips.z.cash/zip-0203) wɔde kaa ho sɛ asɛm no bɛba awiei. Mprempren asɛm bi betumi ahyɛ expiration block height. Sɛ wɔantu no ankɔ saa sorokɔ no so a, node ahorow no tow fi mempool, dan a wɔtwɛn wɔ nnwuma a wɔannye so dua no mu. Ansa na eyi reba no, na asɛm bi betumi atra ase a wontumi nsi so dua bere tenten. Expiry kyerɛ sɛ awiei koraa no, asɛm bi a ɛda hɔ no ankasa fi hɔ, na ɛtew adwenem naayɛ so ma wo na ɛmma mempool no nhyɛ nnwuma dedaw a wɔantu mu ma.

## Baabi a ɛfata

Overwinter yɛ Zcash network upgrade a edi kan wɔ October 2016 mainnet a wɔde sii hɔ akyi, na ɛhyɛɛ da de kɔmaa Sapling. Ná n’adwuma ne infrastructure, na ɛnyɛ features. Ɛdenam upgrade mechanism ne replay-protection machinery a odii kan de sii hɔ so no, ɛmaa upgrade biara a ɛba akyiri yi (Sapling, Blossom, Heartwood, Canopy, NU5, ne nea edi hɔ) nyaa ɔkwan a ahobammɔ wom a wɔbɛfa so ayɛ adwuma.

![Timeline from the October 2016 Sprout launch, through the 2016 to 2018 stretch with no upgrade framework, to Overwinter in June 2018](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-timeline.png)

## Nsɛmfua Nkyerɛase

| Asɛmfua | Plain-English asekyerɛ |
|---|---|
| Netwɛk no mu nkɔso (NU) | Nsakraeɛ a wɔayɛ no pɛpɛɛpɛ wɔ Zcash mmara a wɔpene so, a wɔayɛ adwuma wɔ block height a wɔahyɛ |
| Nhyiamu baa dwumadibea id | Nkyerɛkyerɛmu tiawa a ɛbɔ mprempren mmara a wɔagye atom no din |
| Activation sorokɔ | Block a network upgrade bi mmara foforo no di dwuma |
| Replay ahobammɔ | Mmara a esiw asɛm a ɛyɛ adwuma wɔ nkɔnsɔnkɔnsɔn biako so kwan sɛ wɔbɛsan de adi dwuma wɔ foforo so |
| Mempool | Nkitahodi ahorow a wɔabɔ ho dawuru nanso wonnya ntutuu mu nkɔ block |
| Aguadi no bere atwam | Expiration block height a ɛno akyi no wɔtow asɛm a wɔantow gu |

## FAQ

So Overwinter sesaa me ZEC anaa me kokoam nsɛm? Dabi Overwinter amfa nneɛma foforo biara anhyɛ mu na wanka nnwuma a wɔabɔ ho ban. Na ɛyɛ nsu ho nhama a wɔde bɛyɛ daakye nkɔso a ahobammɔ wom. Wɔannya wo sika ne wo kokoam nsɛm so nkɛntɛnso biara.

So Overwinter de Sapling anaa address ahorow a wɔabɔ ho ban kaa ho? Dabi, Overwinter amfa nneɛma biara a wɔabɔ ho ban anhyɛ mu. Ɛsiesiee asase no sɛnea ɛbɛyɛ a Sapling betumi ayɛ adwuma dwoodwoo akyiri yi.

Dɛn ne consensus branch id? Ɛyɛ nkyerɛwde tiawa a ɛbɔ mmara a ɛwɔ hɔ mprempren no din. Transactions de wɔn ho hyɛ mu bere a wɔde wɔn nsa ahyɛ ase no, ɛno ne nea ɛma Zcash nya ne replay ahobammɔ.

Dɛn nti na nsɛm bi ka sɛ June 25 na afoforo ka sɛ June 26? Overwinter activated at 01:37 UTC on June 26, 2018. Ɛno yɛ anadwo fã UTC akyi pɛɛ, enti wɔ Atɔeɛ fam berɛ dodoɔ mu no mpɔtam hɔ dɔn no da so ara kenkan June 25. Ɛyɛ block korɔ no ara ne berɛ korɔ no ara.

Dɛn na transaction expiry ye ma? Ɛkyerɛ sɛ asɛm a wɔannye da no rentra hɔ daa. Bere a ne sorokɔ a ɛtwam akyi no, nodes tow gu, enti wonnyaw wo nsusuw sika a woatua a akɔ so ayɛ ho.

So ɛsɛ sɛ meyɛ biribi? Dabi Overwinter activated in 2018. Zcash sika kotoku anaa node biara a ɛwɔ hɔ mprempren no di mmara yi akyi dedaw.

## Sɔ wo ntease hwɛ

Overwinter amfa nneɛma foforo biara a wɔabɔ ho ban anhyɛ mu. Enti dɛn nti na wobu no sɛ ɛyɛ nkɔso a ɛho hia sen biara wɔ Zcash abakɔsɛm mu no mu biako?

<details>
<summary>Answer</summary>

Efisɛ ɛno na ɛyɛɛ mfiri a akyiri yi nkɔso biara gyina so no. Overwinter de Network Upgrade Mechanism ne akwan mmienu replay ahobanbɔ baeɛ, na ɛmaa Zcash nyaa ɔkwan a ɛyɛ gyinapɛn, a ahotɔ wɔ so a ɛbɛsesa ne mmara a wɔpene so. Sɛ ɛnyɛ saa fapem no a, anka Sapling ne nkɔso a wɔyɛe wɔ n’akyi no rentumi nyɛ adwuma yiye.
</details>

### Akadeɛ

[ZIP 200: Ntrɛwmu a Wɔde Yɛ Ntrɛwmu](https://zips.z.cash/zip-0200)

[ZIP 201: Network Peer Management ma Awɔw Bere](https://zips.z.cash/zip-0201)

[ZIP 202: Version 3 Nkitahodi Nhyehyɛe a Wɔde Ma Awɔw Bere](https://zips.z.cash/zip-0202)

[ZIP 203: Aguadi no twam](https://zips.z.cash/zip-0203)

[ZIP 143: Aguadi Nsaano Nkyerɛwee a Wɔde Di Dwuma ma Awɔw Bere](https://zips.z.cash/zip-0143)

[Awɔw Bere mu Network Upgrade](https://z.cash/upgrade/overwinter/)

### Hwɛ nso

[Zcash Network Nkɔsoɔ a Wɔayɛ](../start-here/network-upgrades)

[Atare a Wɔabɔ ho Ban](../using-zcash/shielded-pools)

[Nodes a Ɛyɛ Pɛ](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Dɛn ne ZEC ne Zcash](../start-here/what-is-zec-and-zcash)

---

Ntoatoasoɔ: [Network Upgrades ho nkyerɛkyerɛmu](../start-here/network-upgrades) · Dada: [Ffifi](../zcash-tech/sprout) · Deɛ ɛdi hɔ: [Sapling](../zcash-tech/sapling)
