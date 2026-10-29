<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nneɛma a Wɔde Hwɛ Nneɛma

Address a wɔabɔ ho ban ma wo di gua bere a ɛda kakraa bi adi sɛnea wubetumi wɔ Zcash blockchain no so. Enti dɛn na ɛba bere a *yɛ* hia sɛ wokyerɛ apontow pɔtee bi nea wokura, anaa nea wode kɔe no? Address biara a wɔabɔ ho ban no wɔ safoa a wɔde hwɛ a ɛma wotumi kenkan a ɛmma wotumi sɛe sika. Wɔde safe a wɔde hwɛ nneɛma bae wɔ [ZIP 310 na ɛwɔ hɔ](https://zips.z.cash/zip-0310) na wɔde kaa protocol no ho wɔ Sapling network upgrade no mu.

Safoa a wɔde hwɛ ade ne adwinnade a wɔde paw nneɛma a wɔda no adi: wopaw nea ohu nea, na womfa tumi a wɔsɛe no nhyɛ da sɛ ɔnyɛ.

## TL;DR

Hwɛ safoa ma **akenkan nko ara** kwan kɔ Zcash address anaa akontaabu a wɔabɔ ho ban no dwumadi so: obiara a okura no betumi ahu nnwuma a ɛba (na, wɔ hwɛ safoa a edi mũ ho no, nea ɛkɔ) nnwuma, nanso ontumi nsɛe sika da.

- **Nea ɛyɛ:** adwinnade a wɔde paw-da no adi a ɛwɔ atare a wɔabɔ ho ban no mu. Wɔde bae wɔ [ZIP 310 na ɛwɔ hɔ](https://zips.z.cash/zip-0310), a wɔde kaa protocol no ho wɔ Sapling network upgrade no mu.
- **Nea ɛma ma:** detection of deposits (`uivk…` incoming keys) anaasɛ in/out visibility a edi mũ ma akontaabu bi (`uview…` nkabom safe a wɔde hwɛ ade nyinaa), ne agyapade Sapling `zxviews…` safe ahorow.
- **Nea ɛmma:** sɛe tumidi. Biribiara nni hɔ a obi a ɔwɔ safe a ɔde hwɛ ade yɛ a ebetumi atu sika.
- **Baabi a ɛyɛ adwuma nnɛ:** export/import in [Zallet](https://github.com/zcash/zallet) (v0.1.0-beta.2+, 1999 mu no `z_exportviewingkey` / `z_importviewingkey`) ne watch-only akontaabu a ɛwɔ sika kotoku te sɛ Zkool; hwɛ [Sika kotoku](/using-zcash/wallets) kratafa a ɛfa mprempren mmoa matrix no ho.
- **Mmara a wɔde di dwuma:** pɛ safoa a ɛyɛ teateaa a ɛbua asɛmmisa a wɔrebisa no, na kae sɛ wontumi nkae safe a wɔde ama no — ɛtra ase kyɛ sen sika no nkutoo.

---

## Dɛn nti na wode safe a wɔde hwɛ nneɛma di dwuma?

Electric Coin Company's nkyerɛwee a ɛfa asɛm no ho no kyerɛ tebea horow a ɛtaa ba, na ɛda so ara yɛ nea abu so nnɛ:

- **An exchange watching for deposits.** Exchange no de viewing key a ɛba no gu internet-facing detection node so sɛnea ɛbɛyɛ a ebetumi ahyɛ adetɔfo sika a wɔde asie no nsow wɔ shielded address so, bere a spending key no tra hardware a ɛnka network no da so.
- **Ɔhwɛfoɔ a ɔrekyerɛ sɛ ɔwɔ nneɛma.** Ɔhwɛfoɔ no de address biara a wɔabɔ ho ban no safe a ɛwie pɛyɛ ma akontabufoɔ bi. Akontaabufoɔ no bɛtumi ahwɛ saa sika a aka no na wahwɛ dwumadie a atwam a ɛkɔ saa address ahodoɔ no so na ɔsan ba, na ɔrentumi nyɛ biribi foforɔ biara.
- **Due diligence on a counterparty.** Baabi a ɛhia sɛ exchange bi hwɛ adetɔfoɔ bi abakɔsɛm a wɔabɔ ho ban mu sɛ nhwehwɛmu a ɛfata a wɔama anya nkɔsoɔ no fã no, ɛbɛtumi abisa safe a wɔde hwɛ no mmom sen sɛ ɛbɛbisa sika no.

## Nea safe a wɔde hwɛ ade yɛ ne nea ɛnda no adi

Safe bɛboro biako, na nsonsonoe no na ɛkyerɛ dodow a wode bɛma.

| Safoa | Nsɛmfua a wɔde di kan | Ntoboa a wɔde ma |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | Hwɛ nnwuma a ɛba **ne** a ɛkɔ ma pool biara a ɛwɔ akontaabu no mu |
| Unified incoming viewing key (UIVK) | `uivk…` | Hwɛ nnwuma a ɛba nkutoo, ma pool biara a ɛwɔ akontaabu no mu |
| Sapling extended full viewing key | `zxviews…` | Hwɛ Sapling dwumadi a ɛba ne nea ɛrekɔ ma safoa no address ahorow |

Eyinom mu biara ntumi nsɛe sika. Wɔn nyinaa yɛ nea ɛtra hɔ daa wɔ ɔkwan a ɛho hia so: wontumi nkae safe bi a wode ama no, nea ɛtra hɔ kyɛ nkutoo, denam sika a wode bɛkɔ akontaabu bi a ɔfã foforo no nkura ne safe mu no so.

Ɛfata sɛ wuhu afiri abien a wɔde da nneɛma adi ansa na woakyɛ biribiara.

**Incoming nkyerɛ sɛ ɛyɛ teateaa.** Wɔde unified incoming viewing key scoped to account no nyinaa so, ɛnyɛ address baako a wobisaa wo ho asɛm no. UIVK a wode kɔ amannɔne ma Sapling address biako no da so ara ma wotumi hu nea ɛba wɔ pool biara a ɛwɔ saa akontaabu no mu, enti ɛda pii adi sen address a ɛbɔ din no. No [Zallet Nhoma no](https://zcash.github.io/zallet/zcashd/json_rpc.html) ka eyi pefee.

**Address a wɔatintim da ne hwɛbea safoa a ɛba no adi dedaw ma daakye ɔtamfo bi.** [ZIP 326 na ɛwɔ hɔ](https://zips.z.cash/zip-0326) hyɛ no nsow sɛ ɔtamfo a ɔwɔ quantum kɔmputa betumi asan anya safe a wɔde hwɛ ade a ɛba no afi address a wɔatintim a ɛyɛ ahorow ahorow so, na ɛno yɛ nea wobetumi ayɛ wɔ ɔkwan bi so a sɛ wɔbɛsan anya nullifier safoa no. Address a wotintim no ne safe a wɔde hwɛ nneɛma a wotintim no nyɛ ade koro, nanso abien no te bɛn wɔn ho wɔn ho wɔ bere tenten a ɛfata mu.

## Safe a wɔhwɛ wɔ Ironwood akyi

NU6.3 de Ironwood shielded pool no bae na ɛmaa Orchard pool no yɛɛ nea wɔsɛe no nkutoo, enti sika tu fi biako so kɔ foforo so bere kɔ so. Hwɛ [Ironwood](/zcash-tech/ironwood) ne [Nneɛma a wɔde dannan nneɛma](/zcash-tech/the-turnstile) ma upgrade no ankasa.

**Hwɛ safoa a wɔde ama ansa na Ironwood akɔ so ayɛ adwuma wɔ atutra no akyi.** ZIP 326 kyerɛ sɛ wɔde agyefo, ne ne hwɛ safoa a ɛba no a ɛne no hyia no, scoped kɔ Orchard *protocol* sen sɛ wɔde bɛkɔ pool: hwɛ safoa koro no ara a ɛba no sɔhwɛ-decrypt Orchard-pool ne Ironwood-pool note ciphertexts nyinaa. Zallet de di dwuma saa, na ɔka Ironwood nkyerɛwde ho asɛm sɛ ɛyɛ Orchard-shaped na wɔde akontaabu no Orchard hwɛ safe a ɛwɔ Ironwood nkyerɛwde-encryption domain no ase a wɔasɔ ahwɛ.

Nneɛma abiɛsa a efi mu ba ma obiara a okura safe anaa ɔde ma:

1. **Kari pɛ kɔ atare ntam, na nea ɔhwɛ no hu sɛ ɛba saa.** [ZIP 318 na ɛwɔ hɔ](https://zips.z.cash/zip-0318) kyerɛ atutra sɛ Orchard-to-Ironwood nkitahodi nketewa a wɔahyɛ da ayɛ a ɛtoatoa so a wɔbɔ ho dawuru wɔ nhyehyɛe a wɔanhyɛ da ayɛ so, a emu biara sɛe Orchard krataa biako na ɛyɛ Ironwood ade biako a efi asɔre a wɔahyɛ da ayɛ mu. Ɔkontaabufo a ɔde safe a wɔde hwɛ nneɛma rehwɛ no hu sɛ nneɛma a wɔde kura mu no sesa fi ɔtare biako mu kɔ foforo mu wɔ anammɔn anammɔn mu wɔ adapɛn pii mu, na ɛnyɛ ade biako pɛ mu. Wallet betumi asan ayɛ n’ankasa migration nkɔso afi chain data mu denam ne viewing keys so.
2. **Atubra anammɔn biara da boɔ a ɛtu adi.** Ɛno yɛ awosuo a ɛwɔ sɛ wobɛtwa turnstile, na ɛno na ɛma wotumi yɛ atutena no ho akontaabuo. Sɛ wɔkyekyɛ sika a aka no mu yɛ no asɔre a ɛwɔ mmara mu a, ɛkyerɛ sɛ asɛm biako biara nni hɔ a ɛbɛda Orchard-pool sika a aka no nyinaa adi.
3. **Akontaabuo a wɔayɛ wɔ Ironwood akyi no betumi anya wɔn safe no wɔ ɔkwan soronko so.** [ZIP 2005 na ɔkyerɛwee](https://zips.z.cash/zip-2005) de ka ho a `use_qsk` frankaa ma quantum-recoverable keys, na ɛsesa sɛnea wonya incoming, outgoing ne diversifier keys no, enti `use_qsk = true` nsafe yɛ safe ahorow a ɛsono emu biara ankasa. ZIP 326 hwehwɛ sɛ frankaa no yɛ pɛ wɔ akontaabu bi so na ɛbara sɛ wɔbɛbɔ `use_qsk = true` safoa ansa na NU6.3 ayɛ adwuma wɔ Mainnet so. Enti safoa bi a wɔde fi akontaabu bi a na ɛwɔ hɔ ansa na Ironwood reba no mu kɔ amannɔne ne a `use_qsk = false` key, na ɛkɔ so teɛ ma saa akontaabu no. Mfa no sɛ safoa bi a wɔde fi akontaabu biako mu kɔ no kyerɛkyerɛ foforo mu.

## Safoa a wɔde hwɛ nneɛma a wɔde kɔ amannɔne

### Zallet

[Zallet](https://github.com/zcash/zallet) yɛ full-node sika kotoku a ɛde sika kotoku a ɛwɔ zcashd. Viewing-key export ne import duu **v0.1.0-beta.2 (28 July 2026)**, enti di kan hwɛ wo version no; adan a wɔadi kan asi no nni akwan yi. Ɛsɛ sɛ akyinnyegye biara a ɛwɔ ɔkwan din no akyi no yɛ JSON a ɛfata, a ɛkyerɛ sɛ ahama botae ahorow no sie wɔn ankasa nsɛm a wɔafa aka abien. No [Zallet Ntɛmntɛm Nhwehwɛmu Akwankyerɛ](/using-zcash/zallet-quick-reference-guide) kata ahyɛde a wɔde di dwuma wɔ ɔkwan a ɛkɔ akyiri so no so.

Kyerɛw nea sika kotoku no kura:

```bash
zallet rpc listaddresses
```

Fa akontaabu no safoa a wɔde hwɛ ade nyinaa a wɔaka abom no kɔ amannɔne denam address a wɔaka abom a wode bɛfa so:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Fa akontaabu no mu biakoyɛ a ɛba hwɛ safoa no kɔ amannɔne mmom, fa nea wopɛ no di dwuma `ivk` akyinnyeɛ:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Sɛ wode Sapling address bi fa mu a, ɛma saa akontaabu no Sapling a wɔatrɛw mu no nyinaa hwɛ safoa no ba (`zxviews…`), a ɛne zcashd suban dedaw no hyia. Anohyeto abien a wɔakyerɛw: Wɔpow Sprout address ahorow, na wontumi mfa Sapling extended full viewing key mfi akontaabu a na ɛno ankasa de bae sɛ view-only no nkɔ, efisɛ sika kotoku no ntumi nsan nsiesie. No `ivk` fom no yɛ adwuma ma akontaabu a wɔde hwɛ nkutoo a wɔde aba.

### Walets a ɛde viewing keys fi wɔn ankasa interface so kɔ amannɔne

No [Sika kotoku](/using-zcash/wallets) krataafa no di viewing-key mmoa ne Ironwood ahoboa ma sika kotoku biara akyi. Bere a yɛrekyerɛw eyi no, sika kotoku a wɔakyerɛw viewing-key support ne **Ironwood: Ready** nyinaa bi ne ZODL, Zingo!, Zkool, Cake, Zallet, zecd ne Nozy. Hwɛ saa kratafa no mmom sen eyi ansa na wode wo ho ato sika kotoku biako biara so, efisɛ ahoboa sesa.

## Viewing key a wode bɛba sɛ watch-only account

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) yɛ ɔkwan a ɛyɛ mmerɛw sen biara wɔ ha, efisɛ egye safe a wɔaka abom ne nea ɛyɛ agyapade nso. Ne README kyerɛw akontaabu a wɔhwɛ nkutoo a wɔayɛ afi **hwɛ safoa a wɔaka abom** anaa **Sapling hwɛ safoa a wɔatrɛw mu**, a ɛka safoa a wɔatrɛw mu a wɔabɔ ho ban a ɛyɛ agyapade a wɔde afi zcashd. Fa akontaabu foforo ka ho, paw ɔkwan a wobɛfa so ahwɛ nkutoo, na fa.. `uview…` or `zxviews…` safoa; afei akontaabu no yɛ sync na ɛbɔ sika a aka ne abakɔsɛm ho amanneɛ a enni tumi a wɔde di dwuma wɔ sika a wɔsɛe no mu.

Ironwood protocol mmoa ne Orchard-to-Ironwood atutra no sii fam wɔ Zkool 6.24.0 (20 Ɔpɛpɔn 2026), na 6.26.1 (2 Ɔpɛpɔn 2026) siesiee Ironwood ayɔnkofa a wɔhunu wɔ mempool no mu. Tu mmirika 6.26.1 anaa nea ɛba akyiri yi.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Akyinnyegye a ɛto so abien ne rescan nhyehyɛe no: `"whenkeyisnew"` (default no), `"yes"` or `"no"`. Nea ɛto so abiɛsa ne block no sorokɔ a ɛsɛ sɛ wosan scan fi so. Zallet de safoa no ba sɛ akontaabu a wɔhwɛ nkutoo na ɛhwɛ nnwuma a ɛba ne nea efi mu ba no akyi ma ne address ahorow a enni sika a wɔsɛe no ho tumi.

**Zallet Sapling extended full viewing keys nkutoo ba.** Ɛremfa a `uview…` unified full viewing key, ɛwom mpo sɛ ebetumi de biako akɔ amannɔne de. Sɛ wopɛ sɛ wode akenkan kwan kɔ akonta a wɔaka abom nyinaa mu a, fa UFVK no fi Zallet na fa kɔ sika kotoku a egye safe a wɔaka abom, te sɛ Zkool.

Sɛ wopɛ sɛ wodan safoa a wɔde aba no kɔ atɔfoɔ abakɔsɛm fael a ɛdi mũ, a txids, fees ne memos ka ho a, hwɛ [Nkitahodi Abakɔsɛm a Wɔde Kɔ Amannɔne Fi Viewing Key](/guides/viewing-key-transaction-export).

## Nea ɛsakrae, ne nea ɛsɛ sɛ wogyae hwehwɛ

Sɛ wudii kratafa yi dedaw bi akyi, anaasɛ ne nkyerɛase bi akyi a, akwan abiɛsa ntumi nyɛ adwuma bio.

- **`zcash-cli z_exportviewingkey` ne `z_importviewingkey`.** zcashd duu ne mmoa awiei wɔ 18 July 2026 na ɛnkɔ so bio. Zallet's akwan a wɔato din saa ara ne nea wɔde besi ananmu; hwɛ [atutra ho akwankyerɛ](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **Ywallet nantew no.** Walets krataafa no hyɛ Ywallet **Ironwood: Not Ready**, enti ɛnyɛ sika kotoku a wobɛtwe adwene asi so ama Ironwood-era nsafe a wɔde hwɛ nneɛma. Zkool, a efi developer koro no ara mu, gye keys ahorow koro no ara na wɔahyɛ no agyirae sɛ Ready.
- **zcashblockexplorer.com/vk.** Ɔsom no san de HTTP 503 a ɛwɔ abodin krataa a enni mu ba, na wɔatow agu sen sɛ wɔde besi ananmu. Sɛ wode hwɛ safoa bi hyɛ wɛbsaet bi mu a, ɛde w’adwuma ho abakɔsɛm nyinaa ma obiara a ɔhwɛ saa wɛbsaet no so, a na ɛyɛ mmerɛw sen biara wɔ akwan abiɛsa a ɛwɔ kratafa dedaw no so bere nyinaa. Fa safoa no kɔ sika kotoku a wode di dwuma mmom mu.

## Aniwa so / Nsɛso

### Auditor no mfɛnsere mu

Fa akontaabu a wɔabɔ ho ban sɛ dan a wɔde sika sie wɔ sikakorabea:

- **spending key** no ne dan mu safe. Obiara a okura no betumi abue nnaka na ayi emu nsɛm afi mu.
- **viewing key** yɛ auditor no mfɛnsere a ɛkɔ saa dan no mu. Ɔkontaabufoɔ no tumi hwɛ adaka biara a ɛkɔ mu na ɛfiri mu, kenkan nkyerɛwdeɛ no, na ɔde ledger sie — nanso mfɛnsere no nni nsa. Biribiara nni dan no mu a onipa a ɔrehwɛ mu no ntumi ntutu.

### Nea mfɛnsere no ntumi nkyerɛ

Mfɛnsere no hwɛ dan no, na ɛnyɛ wiase a ɛwɔ akyi no. Ɛkyerɛ akontaabu a wɔhwɛɛ no dwumadi a wɔabɔ ho ban; ɛndan ɔhwɛfo no nyɛ blockchain-wide observer, na ɛmma ɔhwɛfo no mfa akontaabu no dwumadi ne obi foforo biara abakɔsɛm a wɔanbɔ ho ban no ntoto ho. Na esiane sɛ wɔde mfɛnsere no ahyɛ akontaabu gyinabea nti, sɛ wode peephole ma obi ma sika a wɔde asie adaka biako (address biako) da so ara ma wɔn dan no nyinaa mu hwɛbea a ɛba — a ɛno nti pɛpɛɛpɛ narrowest-key mmara no wɔ hɔ.

### Nea enti a wuntumi mfa mfɛnsere no nsan nkɔ

Safoa a wɔde hwɛ ade yɛ nsɛm bi, na ɛnyɛ kwan a wɔde hyɛ mu. Sɛ wɔyɛ kɔpi wie a, ɛwɔ hɔ kosi sɛ sika no befi akontaabu a ɛhwɛ no mu. Aduru a mfaso wɔ so ne sɛ wobɛdannan wo ho: fa sika a aka no kɔ akontaabu foforo a ɔfã foforo no nsa anka ne safe da, na mfɛnsere dedaw no hwɛ dan a hwee nni mu so.

## Deep Dive a Wɔde Nsu Gu Mu

### Trial decryption: sɛnea hwɛ yɛ adwuma ankasa

Aguadi biara a wɔabɔ ho ban no de ne nsɛm a wɔakyerɛw no pefee no sie kɔ nea wɔpɛ sɛ wogye no. Wallet a ɛkura safoa a ɛhwɛ ade yɛ **trial decryption**: wɔ asɛm biara a ɛbɛhunu wɔ nkɔnsɔnkɔnsɔn so no, ɛbɔ mmɔden sɛ ɛde safoa no bɛtwetwe note ciphertexts. Hits da note no bo adi, recipient diversifier ne memo; misses no ho ka nyɛ hwee. Eyi nti na safe koro no ara a ɛba a wɔde hwɛ ade no kɔ so yɛ adwuma wɔ Orchard ne Ironwood atare no atifi no — [ZIP 326 na ɛwɔ hɔ](https://zips.z.cash/zip-0326) scopes a receiver to the Orchard *protocol*, enti Ironwood note ciphertexts yɛ Orchard-shaped na wɔde akontaabu no Orchard hwɛ safoa a ɛwɔ Ironwood note-encryption domain no ase no sɔ hwɛ.

### Full vs incoming: nea derivation si gyinae

**full** viewing key betumi anya outgoing-viewing tumi, a ɛno ne nea ɛma auditor san kyekye *sender* fã a ɛwɔ transfer bi mu bere a wɔabɔ asɛm no mu pɛnkoro no. **incoming** viewing key hyɛ da gyae tiawa: ɛhu na ɛyi nsɛm a ɛba no mu nanso entumi nsan nhyehyɛ outgoing linkage. Derivation a ɛda saa tumi ahorow yi ntam no yɛ ɔkwan biako so — safoa a ɛba no fi *fi* safoa a edi mũ no mu, ɛnyɛ nea ɛdannan da — a ɛno ne nea ɛma "incoming only" yɛ downgrade ankasa sen sɛ ɛbɛyɛ bɔhyɛ. No `use_qsk` frankaa a efi [ZIP 2005 na ɔkyerɛwee](https://zips.z.cash/zip-2005) sesa derivation no ankasa, enti quantum-recoverable keys yɛ key abusua soronko koraa, ɛnyɛ dedaw no fã bi.

### Sɛnea atutra te ma obi a ɔhwɛ

Ɛfiri [ZIP 318 na ɛwɔ hɔ](https://zips.z.cash/zip-0318) atutra yɛ Orchard-to-Ironwood nkitahodi nketewa a ɛyɛ pɛ a wɔanhyɛ da, ɔhwɛfo a okura safe no hu antweri: anammɔn pii a ɛsom bo wɔ canonical-denomination mu sen sɛ obehuruw biako. Anamɔn biako biara nni hɔ a ɛda kari pɛ a wɔretu no adi, nanso *nhwɛso* no yɛ nea wotumi hu — a ɛyɛ aguadi a wɔahyɛ da ayɛ a ɛfa turnstile a wotumi audit ho.

## Nkyerɛkyerɛmu a mfaso wɔ so

- **Wɔ exchanges ne payment processors:** fa account no incoming viewing key (anaa UFVK ma full coverage) gu detection node so na siesie customer deposits automatically, pɛpɛɛpɛ sɛnea wobɛyɛ wɔ address a ɛda adi pefee — nanso customer no spending key no mfi cold storage da.
- **Wɔ akontabufoɔ ne adanseɛ-a-wɔde-sie:** hwɛ safoa a ɛdi mũ dane "gye yɛn di" kɔ "hwɛ sɛ yei yɛ nokware": sika a aka ne asɛmdi ho abakɔsɛm a ɛdi mũ ma akontaabuo a wɔahwɛ no, a tumi biara nni mu sɛ ɛbɛka wɔn. Fa bom ne [Katua ho nsɛm a wɔda no adi](/zcash-tech/payment-disclosures) ama adanse a wɔde ma pɛnkoro a ɛfa sika biako a wotua ho.
- **Sɛ wopɛ sɛ woyɛ nhwehwɛmu a ɛfata a:** fa akontaabu a ɛfa ayeforohyia no ho safe ma wo yɔnko, na ɛnyɛ wo sika kotoku no nyinaa. Sɛ abusuabɔ no ba awiei a, dannan akontaabu no.
- **Sɛ wopɛ nnwinnade a wɔpaw:** Zallet de UFVKs kɔ amannɔne na ɛde Sapling extended full viewing keys ba; Zkool gye safe a wɔaka abom ne agyapadeɛ sɛ akontaabuo a wɔhwɛ nkutoo. Hwɛ sɛnea [Sika kotoku](/using-zcash/wallets) kratafa ma mprempren Ironwood ahoboa matrix ansa na wɔayɛ gyinapɛn wɔ sika kotoku so.
- **Ɛka a wɔbɔ wɔ nsɛm a wɔda no adi ho no yɛ daa:** obiara a ɔwɔ safoa foforo no yɛ kokoam nsɛm ho boseabɔ kwan a ɛtra hɔ daa a wuntumi nto mu. Fa safoa ma wɔ abusuabɔ biara mu, fa scope kɔ akontaabu biako so, na kyerɛw nea okura nea.

## Mfomso a Ɛtaa Tu

| Gyidi a wɔtaa nya | Nea ɛte ankasa |
| --- | --- |
| "Safe a wɔde hwɛ ade betumi asɛe sika no sɛ ɛtwetwe a." | Ɛrentumi nyɛ yiye. Safe a wɔde hwɛ ade nni tumi biara a wɔde di dwuma sɛ wɔsɛe sika; nea enye koraa a leak yɛ ne sɛ ɛbɛda abakɔsɛm adi. |
| "Metumi atwa safoa bi a wɔde hwɛ ade mu akyiri yi." | Worentumi nyɛ saa. Safe a wɔde ma no yɛ adwuma kosi sɛ sika no bɛkɔ akontaabu bi a ɔfã foforo no nkura ne safe mu. |
| "UIVK a wode bɛkɔ amannɔne ama address biako pɛ no kyerɛ saa address no." | Viewing keys yɛ akontaabu-scoped. UIVK kyerɛ dwumadie a ɛreba ma pool biara a ɛwɔ akonta no mu. |
| "`zcash-cli z_exportviewingkey` da so ara yɛ adwuma." | No. zcashd duu ne mmoa awiei wɔ 18 July 2026; fa Zallet's di dwuma `z_exportviewingkey` / `z_importviewingkey` sɛ anka. |
| "Sɛ wode hwɛ safoa bi hyɛ wɛb adwinnade mu a, ahobammɔ wom efisɛ ɛyɛ akenkan nkutoo." | Akenkan-nko da so ara kyerɛ sɛ wɔde wo nkitahodi abakɔsɛm nyinaa ma saa akontaabu no bɛma obiara a ɔhwɛ sait no so. Fa safe no hyɛ sika kotoku a wode di dwuma mu. |
| "Zallet betumi de hwɛ safoa biara a Zallet betumi de akɔ amannɔne aba." | Dabi Zallet de Sapling a wɔatrɛw mu a wɔde hwɛ nneɛma nyinaa ba nkutoo; a wɔaka abom `uview…` ɛsɛ sɛ nsafe kɔ sika kotoku a egye safe a wɔaka abom, te sɛ Zkool. |

## Nkratafa a Ɛfa Ho

- [Katua a Wɔda no Adi](/zcash-tech/payment-disclosures) — a ɛkyerɛ sɛ wɔapaw sikatua biako ho nsɛm a wɔmma kwan mma wɔnkɔ so nkɔ akontaabu bi mu
- [Address ahorow a Wɔaka abom](/zcash-tech/unified-addresses) — address layer a ɛde viewing-key receivers kɔ
- [Ironwood](/zcash-tech/ironwood) — NU6.3 shielded pool a Orchard tu kɔ mu
- [Turnstile a ɛwɔ hɔ no](/zcash-tech/the-turnstile) — Orchard-to-Ironwood atutra afiri a wɔn a wɔhwɛ no betumi ahwɛ
- [Sika kotoku](/using-zcash/wallets) — sika kotoku, hwɛ-safoa mmoa ne Ironwood ahoboa ho kyerɛwtohɔ a edi mũ
- [Nkitahodi Abakɔsɛm a Wɔde Kɔ Amannɔne Fi Viewing Key](/guides/viewing-key-transaction-export) — dane safoa a wɔde aba no ma ɛbɛyɛ txid/fee/memo abakɔsɛm fael a edi mũ

## Akadeɛ

Fa safe a wɔde hwɛ nneɛma di dwuma sɛnea ɛho hia, na pɛ safe a ɛyɛ teateaa sen biara a ebua asɛmmisa a wɔrebisa no.

- [Katua ho nsɛm a wɔda no adi](/zcash-tech/payment-disclosures) - a wodi adansee a woapaw no ho nsem a efa akatua baako ho a womma kwan mma wonnya kwan nkɔ akonta bi mu
- [ZIP 326: NU6.3 Nea efi mu ba ma Sikakorabea](https://zips.z.cash/zip-0326) — sɛnea safe a wɔde hwɛ ade yɛ wɔn ade wɔ Orchard ne Ironwood atare no atifi
- [ZIP 229: Nkyerɛase 6 Nkitahodi Nhyehyɛe](https://zips.z.cash/zip-0229) — kyerɛkyerɛ Orchard ne Ironwood atare no mu
- [ZIP 310 na ɛwɔ hɔ](https://zips.z.cash/zip-0310) — hwɛ safoa nkyerɛkyerɛmu
- [Zallet nsakraeɛ ho kyerɛwtohɔ](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — a release de kaa ho sɛ RPC kwan bɛn na
- [Zkool KENKAN NKYERƐKYERƐMU](https://github.com/hhanh00/zkool2/blob/main/README.md) — akontaabu a wɔboa ne key types
- [ECC, Nkyerɛkyerɛmu a Wɔde Hwɛ Nneɛma a Wɔde Hwɛ Nneɛma Mu](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Nneɛma a Wɔda no Adi ne Nsafo a Wɔpaw](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Nkyerɛkyerɛmu](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)


