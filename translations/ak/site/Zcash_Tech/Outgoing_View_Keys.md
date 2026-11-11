<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Outgoing_Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nneɛma a Wɔde Hwɛ Nneɛma a Wɔde Kɔ Afiri (OVKs)

Outgoing viewing key (OVK) yɛ 32-byte botae a wɔde di dwuma de encrypt *outgoing* ciphertext a ɛwɔ shielded output mu nkutoo. Ɛma ɔfã bi nya nsɛm a wɔakyerɛw no pefee a wɔde kɔmaa no (address a wɔde kɔmaa no, ne bo, ne memo) a entumi nsɛe sika anaasɛ enhu nkyerɛwde a ɛba.

Bere nyinaa nea ogye no de n’ankasa hwɛ safe a ɛba no decrypt krataa a ɛba no. OVK a wɔpaw no nsakra nea nea wɔde ma no no hu. Encoding a ɛyɛ gyinapɛn biara nni hɔ ma OVK a wɔanhyehyɛ no yiye; ɛyɛ baiti 32 kɛkɛ.

## TL;DR

- OVK na ɛhwɛ nea obetumi asan anya nsɛm a ɛda adi pefee a efi sika a wɔabɔ ho ban mu no nkutoo so.
- Walets paw nhyehyɛe abiɛsa bi: **Sender** (wɔde sika a wɔtaa de ba a wɔde akontaabu no UFVK di dwuma), **Custom** (wɔsan de safe a wode ma), anaa **Discard** (obiara ntumi nsan nnye nsɛm a ɛda adi pefee a ɛrekɔ no mfi nkɔnsɔnkɔnsɔn no mu).
- Wɔ Discard anaa custom OVK mpo mu no, UFVK wura da so ara hu sika a wɔsɛee no na obetumi abu sika a efi akontaabu no mu no ho akontaa.
- Ɔkwan baako pɛ a wotumi de ho to so a wobɛfa so ama sika bi ayɛ nea UFVK pɔtee bi nhu ne sɛ wobɛhwɛ sɛ nsɛm a wɔakyerɛw no nyɛ saa akontaabu no dea da (akonta a ɛyɛ soronko anaa sika kotoku a ɛyɛ soronko).
- Nhyehyɛe abiɛsa no wɔ hɔ dedaw wɔ `zcash_client_backend`; ɛkame ayɛ sɛ sika kotoku biara a ɛwɔ hɔ nnɛ no de Sender nhyehyɛe a wɔahyɛ da ayɛ no nkutoo na edi dwuma.

---

## Nhyehyɛe abiɛsa no

Walets a wɔde asi so `zcash_client_backend` paw an `OvkPolicy` bere a wɔkyekye asɛm bi a wɔde di gua no:

| Nhyehyɛeɛ | Nsɛm a wɔde sie a ɛkɔ abɔnten | Hena na akyiri yi obetumi asan anya nsɛm a ɛda adi pefee a ɛrekɔ no |
|--------|----------------------|----------------------------------------------|
| **Ɔsomafo** (default) | Encrypted to akontaabu no OVK a ɛyɛ daa no | Akontaabu a wɔde mena no Unified Full Viewing Key |
| **Amaneɛ** | Encrypted to the key(s) a wode ma no | Obiara a okura safe (safoa) a wɔde ama no |
| **Discard** | Wɔmfa OVK biara nni dwuma (`ovk = ⊥`) | Obiara nni hɔ (nea ɔde kɔmaa no mpo) |

Ɔdansifo a ɔyɛ mmerɛw bɔ a `Custom` nhyehyeɛ a ɛfiri 32-byte botaeɛ baako mu sɛdeɛ ɛbɛyɛ a abɔnten ne emu OVK nyinaa bɛyɛ safoa korɔ.

![Outgoing Viewing Key policy comparison](/content-images/ovk-policies.webp)

Hwɛ sɛnea [OvkPolicy nkrataa a wɔde kyerɛw](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html) ne [ZIP 310 na ɛwɔ hɔ](https://zips.z.cash/zip-0310).

## Nea nhyehyɛe biara yɛ ma

**Sender** yɛ sika kotoku suban a ɛyɛ mpapahwekwa. Sɛ wɔtu asɛm no wie a, obiara a okura akontaabu no UFVK no betumi decrypt ciphertexts a ɛrekɔ no na wasan anya address a wɔde gyee no, sika dodow, ne memos no.

**Custom** ma wo de tumi a ɛbɛma obi a ɔto so abiɛsa (auditor, payment processor, receipt system, anaa separate device) tumi a ɔde bɛtwetwe sika pɔtee a ɛrekɔ so no ma wɔn a womma wɔn viewing key no nyinaa. Wubetumi nso de bere tiaa mu safe a wotow gu wɔ asɛm no akyi adi dwuma, anaasɛ wode safe ahorow adi dwuma ama counterpartes ahorow sɛnea ɛbɛyɛ a safoa biako biara renhu sika biara a wɔde rekɔ.

**Discard** kyerɛ sɛ sika kotoku a ɛde rema no ntumi nsan nnye nsɛm a ɛda adi pefee a ɛrekɔ no mfi nkɔnsɔnkɔnsɔn no mu. Eyi ho wɔ mfaso bere a wopɛ sɛ wotew nea wobetumi asan anya sɛ akyiri yi UFVK no ayɛ basaa a, anaasɛ bere a wohyɛ da mpɛ on-chain record a akontaabu no OVK betumi abue.

## Nea obi a ɔwɔ UFVK da so ara hu

Sɛ wɔde Discard anaa custom OVK di dwuma mpo a, obi a ɔwɔ akontaabu no UFVK no da so ara betumi:

- Hu akontaabu no mu nsɛm a wɔakyerɛw no mu nea wɔsɛee no (ɛnam nullifiers so).
- Hu saa nsɛm a wɔde hyɛ mu no botae ahorow.
- San fa nsakraeɛ nsɛm biara (wɔde encrypt wɔ incoming incoming viewing key no so, ɛnyɛ OVK).
- Enti bu sika a efi akontaabu no mu no ho akontaa.

Nea wontumi nhu ne ankorankoro address ahorow a wɔde ma no, sika a wɔakyekyɛ mu, ne nkrataa a wɔde kyerɛw nsɛm no. No `WalletWrite` nkrataa bɔ kɔkɔ sɛ data a ɛfa nnwuma a wɔayɛ wɔ Discard ase (anaasɛ random custom OVK) no, wontumi nnya mfi nkɔnsɔnkɔnsɔn data mu sɛ mpɔtam hɔ kyerɛwtohɔ no yera a.

## Sika dodow a wɔbɛkora so afi UFVK pɔtee bi mu

`OvkPolicy` nkutoo na ɛhwɛ sɛnea wɔsan nya nsɛm a ɛda adi pefee a ɛrekɔ no so. Ɛnsie sika a wɔsɛe no anaa sika a wɔabɔ no ankasa mfi akontaabu no ankasa UFVK mu.

Ɔkwan biako pɛ a wotumi de ho to so a wobɛfa so ama sika bi anhu ama UFVK pɔtee bi ne sɛ wobɛhwɛ ahu sɛ nkrataa a na ɛwɔ saa sika no mu no nyɛ akontaabu a UFVK di so no dea da:

1. **Tetew ZIP-32 akontaabu ahorow mu** (aba koro) — Yɛ akontaabu index foforo, fa sika kɔ mu, na fa saa akontaabu no UFVK no nkɔ amannɔne da. Mfitiaseɛ akonta no UFVK nko ara na ɛhunu sɛ wɔde kɔ akonta foforɔ no mu.
2. **Wɔtetew sika kotoku mu koraa** (aba soronko) — Fa sika kotoku foforo ho ka, sɛe sika fi mu, na tow aba anaa UFVK no gu. Mfitiase sika kotoku no kyerɛw sika a wɔde mae no nkutoo.
3. **Ephemeral one-time wallet** — Saa ara na ɛwɔ atifi hɔ no, nanso fa sika kotoku a wɔsɛe no no di dwuma sɛ nea wɔtow gu.

UFVK yɛ akontaabu biara. Nsɛm a wɔakyerɛw a ɛntra saa akontaabu no mu da no mpue da wɔ ne sika a aka anaasɛ nea efi mu ba no nyinaa mu.

## Sɛnea sika kotoku de nhyehyɛe ahorow no di dwuma nnɛ

Ɛkame ayɛ sɛ production wallet biara de **Sender** nhyehyɛe a wɔahyɛ da ayɛ no nkutoo na edi dwuma, enti abakɔsɛm a ɛkɔ akyiri a edi mũ no yɛ nea wobetumi asan anya afi UFVK no mu. Nhyehyɛeɛ mmienu a aka no wɔ nwomakorabea no mu nanso ɛntaa mma wɔ dwumadiefoɔ ntam nkitahodiɛ mu.

Nneɛma a wubetumi apaw daakye bi ne:

- Frɛmfrɛm a ɛfa asɛm biara ho a ɛma nea ɔde di dwuma no paw Custom anaa Discard ma sikatua biako.
- A permanent Discard mode (afei aba sanba bɛkyerɛ net outflows nkutoo).
- OVK ahorow a wɔahyɛ da ayɛ a wɔde da ankorankoro sikatua adi (a emu yɛ hare sen nea ɛyɛ ma [ZIP 311 na ɛwɔ hɔ](https://zips.z.cash/zip-0311) sikatua ho nsɛm a wɔda no adi).
- Akontaabu anaa sika kotoku mu mpaapaemu a wɔbɛkɔ so de adi dwuma ma wɔatew wɔn ho denneennen.

## Akadeɛ

- [ZIP 310: Ahobanbɔ Su a ɛwɔ Sapling Viewing Keys mu](https://zips.z.cash/zip-0310)
- [ZIP 316: Address a Wɔaka abom ne Hwɛ Safoa a Wɔaka abom](https://zips.z.cash/zip-0316)
- [ZIP 315: Nneyɛe Pa a Wɔde Di Dwuma wɔ Wallet Ho](https://zips.z.cash/zip-0315)
- [OvkPolicy wɔ zcash_client_backend mu](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)
- [librustzcash](https://github.com/zcash/librustzcash)
- [zingolib](https://github.com/zingolabs/zingolib)

## Nkratafa a ɛfa ho

- [Nneɛma a Wɔde Hwɛ Nneɛma](/zcash-tech/viewing-keys)
- [Katua a Wɔda no Adi](/zcash-tech/payment-disclosures)
- [Address ahorow a Wɔaka abom](/zcash-tech/unified-addresses)
- [Nea Block Explorer Betumi Ahu](/zcash-tech/what-a-block-explorer-can-see)
