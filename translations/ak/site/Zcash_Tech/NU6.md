<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU6

> NU6 kɔɔ so yɛɛ adwuma wɔ Zcash mainnet so wɔ block 2,726,400 (November 23, 2024 UTC).

Nea wobɛfa: sɛnea Zcash kɔ so de sika boa n’ankasa nkɔso bere a wɔatew so fã akyi, nea enti a ɛde sika a wɔde asie a na ennya nnim sɛnea wɔde bedi dwuma no sii hɔ, ne sɛnea ɛmaa ZEC nneɛma a wɔde bɛma nyinaa yɛ nea wotumi hyɛ ho nkɔm pɛpɛɛpɛ.

NU6 yɛ Zcash [network upgrade a wɔde yɛ adwuma](../start-here/network-upgrades), a wɔde di dwuma denam [ZIP 253 na ɛwɔ hɔ](https://zips.z.cash/zip-0253), a ɛyɛɛ adwuma wɔ mainnet so wɔ November 2024 mu wɔ block 2,726,400. Ɛyɛ sika ne... [nkɔso-sika a wɔde ma](../start-here/development-fund) upgrade: ɛmaa block subsidy no mu kyɛfa kɔɔ nkɔsoɔ mu twaa November 2024 mu fã, ɛde in-protocol reserve sii hɔ maa daakye mpɔtam hɔfoɔ a wɔasi gyinaeɛ sɛ wɔde bedi dwuma, na ɛhyɛɛ sɛdeɛ wɔkan ZEC foforɔ no mu den. Electric Coin Company ne Zcash Foundation nyinaa na wɔpenee NU6 so.

Nea enti a eyi ho hia. Zcash deɛ [Nkɔso Foto](../zcash-tech/canopy) na wɔayɛ nhyehyɛe sɛ ɛbɛba awiei bɛyɛ November 2024 mu fã a wɔbɛtew so no, na ɛno ne nea ɛto so abien wɔ n’abakɔsɛm mu. NU6 maa saa sika no kɔɔ so, nanso sɛ anka ɛde sika biara bɛhyɛ wɔn a wɔgye no daa no nsa no, ɛde kyɛfa bi siee protocol no mu sɛdeɛ ɛbɛyɛ a mpɔtam hɔfoɔ bɛtumi asi deɛ wɔde bɛyɛ ho gyinaeɛ akyiri yi. Ɛsan nso too akontaabu mu nsonsonoe a ɛyɛ komm mu, enti afei wobetumi ahyɛ ZEC dodow a ɛbɛba da no nyinaa ho nkɔm pɛpɛɛpɛ.

## Nea NU6 sesae

NU6 kɔɔ so de block subsidy no 20% kɔmaa nkɔsoɔ sika wɔ November 2024 a wɔtew so fã akyi, mmara a wɔakyerɛkyerɛ mu wɔ [ZIP 1015 na ɛwɔ hɔ](https://zips.z.cash/zip-1015). Ɛkyekyɛɛ saa 20% no mu akwan mmienu.

1. Block subsidy no mu 8% kɔ Zcash Community Grants (ZCG), a sika a wɔde ma mpɔtam hɔfoɔ na wɔyɛ adwuma ma wɔn.
2. 12% kɔ in-protocol lockbox foforo mu, a wɔakora so ama daakye mpɔtam hɔfo a wɔasi gyinae sɛ wɔde bedi dwuma.

Block subsidy a aka, ne transaction fees, kɔma wɔn a wotu fam a wɔbɔ network no ho ban no. NU6 nso yɛɛ funding-stream ne dev-fund mmara a ɛwɔ hɔ dedaw (ZIP 207 ne ZIP 214) no foforo sɛnea ɛbɛyɛ a ɛbɛfata nhyehyɛe foforo yi.

![NU6 development-fund split: 20 percent of the block subsidy goes to development, with 8 percent to Zcash Community Grants and 12 percent into the Deferred Dev Fund Lockbox](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-dev-fund-split.png)

## Adaka a wɔde tow adaka a wɔatu ahyɛ da no

12% kyɛfa no yɛ adwene foforo a ɛwɔ NU6 mu. Sɛ anka wɔbɛtua no akɔ address a wɔde gye no so no, wɔde saa boɔ no kɔto in-protocol pool a wɔfrɛ no Deferred Dev Fund Lockbox, a wɔakyerɛkyerɛ mu wɔ [ZIP 2001 na ɔkyerɛwee](https://zips.z.cash/zip-2001).

1. Lockbox no yɛ funding-stream type foforɔ (DEFERRED_POOL), a block-reward boɔ kɔ protocol no ankasa mu, ɛnyɛ onipa anaa ahyehyɛdeɛ bi.
2. Network no di no akyi sɛ n’ankasa chain value pool balance, ɔkwan koro no ara a ɛfa so di balances a ɛwɔ shielded pools no akyi no.
3. NU6 hyɛɛ da yɛɛ lockbox no nanso wogyaw asɛmmisa a ɛyɛ den no sɛ: hena na odi saa sika no so, na ɔkwan bɛn so na wogyae?

Wɔmaa saa asɛmmisa no ho mmuae akyiri yi denam [NU6.1](../zcash-tech/nu6-1), a ɛde nnisoɔ no sii hɔ: ɛtoaa 8% block-subsidy stream no so kɔɔ Zcash Community Grants na ɛkyerɛɛ 12% stream kɔɔ sikakorabea a coin-holder-controlled fund a lockbox no guu mu.

## Nhoma ahorow no a wɔbɛkari pɛ

NU6 nso too akontabuo mu nsonsonoeɛ bi mu wɔ sɛdeɛ wɔbɔ ZEC foforɔ, a wɔakyerɛkyerɛ mu wɔ [ZIP 236 na ɛwɔ hɔ](https://zips.z.cash/zip-0236). Coinbase nkitahodi ne nnwuma titiriw a etua block biara ZEC foforo ne ɛka.

1. Ansa na NU6 reba no, na ɛsɛ sɛ coinbase asɛm bi nnye nea ɛboro nea wɔde ka no nkutoo. Ná obi a otu fam betumi aka sɛ ennu mmoa a wɔde ma no nyinaa, na ɛno hyew saa ZEC no komm.
2. NU6 akyi no, ɛsɛ sɛ coinbase asɛm bi kari pɛ pɛpɛɛpɛ: ɛsɛ sɛ nea efi mu ba nyinaa bo yɛ pɛ ne miner subsidy ne fees, ɛnnɔɔso na ɛnnɔɔso.
3. Esiane sɛ wɔn a wotu fagude no ntumi nnye ZEC ntom bio na wɔhyew ZEC wɔ akwanhyia mu nti, mprempren wobetumi ahyɛ ZEC dodow a ɛbɛba da biara ho nkɔm pɛpɛɛpɛ.

![Coinbase balancing before and after NU6: before, coinbase could under-claim and burn ZEC so supply was not exactly predictable. After, coinbase must balance exactly so issuance is exactly predictable](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-coinbase-balance.png)

## Sɛnea sikasɛm mu nkɔso bae

NU6 yɛ ti biako wɔ asɛm tenten bi mu a ɛfa sɛnea Zcash tua ne ho ka ho.

1. Canopy (2020) de mfitiaseɛ founders akatua no baa awieeɛ na ɔbɔɔ... [nkɔso sikakorabea](../start-here/development-fund).
2. NU6 (November 2024) san hyehyɛɛ saa sika no wɔ fã a ɛtɔ so mmienu no akyi na wɔde Deferred Dev Fund Lockbox sii hɔ, de kyɛfa a wɔde bɛma no siee maa daakye mmoa a mpɔtam hɔfoɔ asi ho gyinaeɛ.
3. NU6.1 (2025) buaa asɛmmisa a NU6 gyaa hɔ, a ɔhwɛ sika a wɔde asie no so, denam block subsidy no 8% a ɔtoaa so maa Zcash Community Grants na ɔkyerɛɛ 12% kwan kɔɔ sikakorabea a sika-kurafoɔ di so a wɔde lockbox no ahyɛ mu.

![How Zcash funding evolved: Canopy created the development fund, NU6 set up the lockbox, and NU6.1 set the rules for who controls it](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-funding-timeline.png)

## Nsɛmfua Nkyerɛase

| Asɛmfua | Plain-English asekyerɛ |
|---|---|
| Block mmoa a wɔde ma | ZEC foforo a wɔabɔ no ne block biara a wɔtu |
| Coinbase nkitahodi | Adwuma titiriw a etua block bi mmoa ne sika a wɔbɔ |
| Deferred Dev Sikakorabea Lockbox | In-protocol reserve a ɛkura kyɛfa wɔ sika a wɔde ma mu ma daakye mpɔtam hɔfoɔ a wɔasi gyinaeɛ sɛ wɔde bedi dwuma |
| Zcash Mpɔtam Hɔ Mmoa (ZCG) | Boayikuw a ɛde sika ma adwuma a Zcash mpɔtam hɔfo yɛ ne wɔn a wɔyɛ ma wɔn |
| Nhyiamu baa dwumadibea id | Identifier nodes no de kyerɛ upgrade mmara a block bi di akyi |
| Ntwamutam a wɔde yɛ adwuma (NU) | Nsakraeɛ a wɔayɛ no pɛpɛɛpɛ wɔ Zcash mmara a wɔpene so, a wɔayɛ adwuma wɔ block height a wɔahyɛ |

## FAQ

So NU6 sesa me ZEC anaa me kokoam nsɛm? Dabi NU6 fa sɛnea wɔde sika boa nkɔso ne sɛnea wɔkan sika a wɔde ma ho, na ɛnyɛ wo nnwuma anaa wo kokoam nsɛm ho. Wo sika ne nnwuma a wɔabɔ ho ban no nnya nkɛntɛnso biara.

Ɛhe na sika a wɔde ma no fi? Efi block subsidy no so no, ZEC foforo a wɔde ma bere a wotu block ahorow no. Wɔde kyɛfa 20% kɔ nkɔsoɔ mu sen sɛ ne nyinaa bɛkɔ wɔn a wɔtu fam no nkyɛn.

Dɛn na wɔde lockbox no yɛ? Ɛkora kyɛfa a wɔde ma wɔ protocol no mu sɛnea ɛbɛyɛ a mpɔtam hɔfo betumi asi sɛnea wɔde bedi dwuma akyiri yi ho gyinae. NU6 de reserve no to nkyɛn, na NU6.1 de mmara a ɛkyerɛ nea odi so no si hɔ.

So mmara a ɛne sɛ mɛkari pɛ pɛpɛɛpɛ no sesa me sika? Dabi, nea ɛhwehwɛ sɛ block biara coinbase asɛm no tua nea ɛka no pɛpɛɛpɛ nkutoo. Ɛka akontaabu foforo a wɔde ma, na ɛnyɛ sika a aka dedaw.

Dɛn na ɛkyerɛkyerɛ NU6 mu wɔ mfiridwuma mu? NU6 no, ZIP 253 na ɛde di dwuma, a ɛde ne mainnet dwumadie no si block 2,726,400 ne ne consensus branch id. Nsakraeɛ a wɔpene so no ankasa firi ZIP 236, ZIP 1015, ne ZIP 2001, a wɔayɛ ZIP 207 ne ZIP 214 foforɔ sɛdeɛ ɛfata.

Ɔkwan bɛn so na NU6 yɛ soronko wɔ NU6.1 ho? NU6 san hyehyɛɛ sikasɛm nhyehyɛe na wɔyɛɛ lockbox no. NU6.1 sii nea ɔhwɛ lockbox sika so ne sɛnea wɔkyekyɛ kyɛfa a wɔde asie no mu ho gyinae.

## Sɔ wo ntease hwɛ

NU6 hyehyɛɛ Deferred Dev Fund Lockbox nanso wɔanka onii a ɔhwɛ so. Dɛn nti na upgrade bɛma wɔanya reserve na wɔahyɛ da agyaw ne nniso no ama akyiri yi?

<details>
<summary>Answer</summary>

Creating the reserve locked in sɛ wɔde kyɛfa a wɔde ma no bɛto nkyɛn wɔ protocol no mu sen sɛ wobetua ama fixed recipients. Sɛ́ wobesi nea odi saa sika no so ne sɛnea wogyae no ho gyinae no yɛ nniso ho asɛmmisa a emu yɛ den. NU6 hyɛɛ da gyaw saa asɛm no, na NU6.1 buaa no: block subsidy no mu 8% kɔ so ma Zcash Community Grants, na 12% kɔ sikakorabea a sika-kurafoɔ di so a wɔde lockbox no ahyɛ mu.
</details>

### Akadeɛ

[ZIP 253: NU6 Network Upgrade no a wɔde bedi dwuma](https://zips.z.cash/zip-0253)

[ZIP 236: Ɛsɛ sɛ block ahorow kari pɛ pɛpɛɛpɛ](https://zips.z.cash/zip-0236)

[ZIP 1015: Block Subsidy Allocation a Wɔde Ma Nkɔsoɔ Sika a Ɛnyɛ Tẽẽ](https://zips.z.cash/zip-1015)

[ZIP 2001: Lockbox Sika a Wɔde Ma](https://zips.z.cash/zip-2001)

[Netwɛk Nkɔso 6 (NU6) .](https://z.cash/upgrade/nu6/)

### Hwɛ nso

[Zcash Network Nkɔsoɔ a Wɔayɛ](../start-here/network-upgrades)

[Nkɔso Foto](../start-here/development-fund)

[Zcash Sikasɛm Ho Nhyehyɛe](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[Dɛn ne ZEC ne Zcash](../start-here/what-is-zec-and-zcash)

---

Ntoatoasoɔ: [Network Upgrades ho nkyerɛkyerɛmu](../start-here/network-upgrades) · Dada: [NU5](../zcash-tech/nu5) · Deɛ ɛdi hɔ: [NU6.1](../zcash-tech/nu6-1)
