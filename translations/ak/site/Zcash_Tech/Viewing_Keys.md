<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nneɛma a Wɔde Hwɛ

Address a wɔabɔ ho ban ma wo di gua bere a ɛda kakraa bi adi sɛnea wubetumi wɔ Zcash blockchain no so. Enti dɛn na ɛba bere a *yɛ* hia sɛ wokyerɛ apontow pɔtee bi nea wokura, anaa nea wode kɔe no? Address biara a wɔabɔ ho ban no wɔ safoa a wɔde hwɛ a ɛma wotumi kenkan a ɛmma wotumi sɛe sika. Wɔde safe a wɔde hwɛ nneɛma bae wɔ [ZIP 310 na ɛwɔ hɔ](https://zips.z.cash/zip-0310) na wɔde kaa protocol no ho wɔ Sapling network upgrade no mu.

Safoa a wɔde hwɛ ade ne adwinnade a wɔde paw nneɛma a wɔda no adi: wopaw nea ohu nea, na womfa tumi a wɔsɛe no nhyɛ da sɛ ɔnyɛ.

## Dɛn nti na wode safe a wɔde hwɛ nneɛma di dwuma?

Electric Coin Company nkyerɛwee a ɛfa asɛm no ho no kyerɛ tebea horow a ɛtaa ba, na ɛda so ara yɛ nea abu so nnɛ:

- **An exchange watching for deposits.** Exchange no de viewing key a ɛba no gu internet-facing detection node so sɛnea ɛbɛyɛ a ebetumi ahyɛ adetɔfo sika a wɔde asie no nsow wɔ shielded address so, bere a spending key no tra hardware a ɛnka network no da so.
- **Ɔhwɛfoɔ a ɔrekyerɛ sɛ ɔwɔ nneɛma.** Ɔhwɛfoɔ no de address biara a wɔabɔ ho ban no safe a ɛwie pɛyɛ ma akontabufoɔ bi. Akontaabufoɔ no bɛtumi ahwɛ saa sika a aka no na wahwɛ dwumadie a atwam a ɛkɔ saa address ahodoɔ no so na ɔsan ba, na ɔrentumi nyɛ biribi foforɔ biara.
- **Due diligence on a counterparty.** Baabi a ɛhia sɛ exchange bi hwɛ adetɔfoɔ bi abakɔsɛm a wɔabɔ ho ban sɛ nhwehwɛmu a ɛfata a wɔama anya nkɔsoɔ no fã no, ɛbɛtumi abisa safe a wɔde hwɛ no mmom sen sɛ ɛbɛbisa sika no.

## Nea safe a wɔde hwɛ ade yɛ ne nea ɛnda no adi

Safe bɛboro biako, na nsonsonoe no na ɛkyerɛ dodow a wode bɛma.

| Safoa | Nsɛmfua a wɔde di kan | Ntoboa a wɔde ma |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | Hwɛ nnwuma a ɛba **ne** a ɛkɔ ma pool biara a ɛwɔ akontaabu |
| Safoa a wɔde hwɛ nneɛma a ɛba a wɔaka abom (UIVK) | `uivk…` | Hwɛ nnwuma a ɛba nkutoo, ma pool biara a ɛwɔ akontaabu |
| Sapling trɛw mu nyinaa hwɛ safoa | `zxviews…` | Hwɛ Sapling dwumadi a ɛba ne nea ɛrekɔ ma safoa no address ahorow |

Eyinom mu biara ntumi nsɛe sika. Wɔn nyinaa yɛ nea ɛtra hɔ daa wɔ ɔkwan a ɛho hia so: wontumi nkae safe bi a wode ama no, nea ɛtra hɔ kyɛ nkutoo, denam sika a wode bɛkɔ akontaabu bi a ɔfã foforo no nkura ne safe mu no so.

Ɛfata sɛ wuhu afiri abien a wɔde da nneɛma adi ansa na woakyɛ biribiara.

**Incoming nkyerɛ sɛ ɛyɛ teateaa.** Wɔde unified incoming viewing key scoped to account no nyinaa so, ɛnyɛ address baako a wobisaa wo ho asɛm no. UIVK a wode bɛkɔ amannɔne ama Sapling address biako no da so ara ma wotumi hu nea ɛba wɔ pool biara a ɛwɔ saa akontaabu no mu, enti ɛda pii adi sen address a ɛbɔ din no. No [Zallet Nhoma no](https://zcash.github.io/zallet/zcashd/json_rpc.html) ka eyi pefee.

**Address a wɔatintim da ne hwɛbea safoa a ɛba no adi dedaw ma daakye ɔtamfo bi.** [ZIP 326 na ɛwɔ hɔ](https://zips.z.cash/zip-0326) hyɛ no nsow sɛ ɔtamfo a ɔwɔ quantum kɔmputa betumi asan anya safoa a ɔde hwɛ ade a ɛba no afi address a wɔatintim a ɛyɛ ahorow ahorow so, na ɛno yɛ nea wobetumi ayɛ wɔ ɔkwan bi so a sɛ wɔbɛsan anya nullifier safoa no. Address a wotintim no ne safe a wɔde hwɛ nneɛma a wotintim no nyɛ ade koro, nanso abien no te bɛn wɔn ho wɔn ho wɔ bere tenten a ɛfata mu.

## Safe a wɔhwɛ wɔ Ironwood akyi

NU6.3 de Ironwood shielded pool no bae na ɛmaa Orchard pool no yɛɛ nea wɔsɛe no nkutoo, enti sika tu fi biako so kɔ foforo so bere kɔ so. Hwɛ [Dade dua](/zcash-tech/ironwood) ne [Nneɛma a wɔde dannan nneɛma](/zcash-tech/the-turnstile) ma upgrade no ankasa.

**Hwɛ safoa a wɔde ama ansa na Ironwood akɔ so ayɛ adwuma wɔ atutra no akyi.** ZIP 326 kyerɛ sɛ wɔde agyefo, ne ne hwɛ safoa a ɛba no a ɛne no hyia no, scoped kɔ Orchard *protocol* sen sɛ wɔde bɛkɔ pool: hwɛ safoa koro no ara a ɛba no sɔhwɛ-decrypt Orchard-pool ne Ironwood-pool note ciphertexts nyinaa. Zallet de di dwuma saa, na ɔka Ironwood nkyerɛwde ho asɛm sɛ ɛyɛ Orchard-shaped na wɔde akontaabu no Orchard hwɛ safe a ɛwɔ Ironwood nkyerɛwde-encryption domain no ase no asɔ ahwɛ.

Nneɛma abiɛsa a efi mu ba ma obiara a okura safe anaa ɔde ma:

1. **Kari pɛ kɔ atare ntam, na nea ɔhwɛ no hu sɛ ɛba saa.** [ZIP 318 na ɛwɔ hɔ](https://zips.z.cash/zip-0318) kyerɛ atutra sɛ Orchard-to-Ironwood nkitahodi nketewa a wɔahyɛ da ayɛ a ɛtoatoa so a wɔbɔ ho dawuru wɔ nhyehyɛe a wɔanhyɛ da ayɛ so, a emu biara sɛe Orchard krataa biako na ɛyɛ Ironwood ade biako a efi asɔre a wɔahyɛ da ayɛ mu. Ɔkontaabufo a ɔde safe a wɔde hwɛ nneɛma rehwɛ no hu sɛ nneɛma a wɔde kura mu no sesa fi ɔtare biako mu kɔ foforo mu wɔ anammɔn anammɔn mu wɔ adapɛn pii mu, na ɛnyɛ ade biako pɛ mu. Wallet betumi asan ayɛ n’ankasa migration nkɔso afi chain data mu denam ne viewing keys so.
2. **Atubra anammɔn biara da boɔ a ɛtu adi.** Ɛno yɛ awosuo a ɛwɔ sɛ wobɛtwa turnstile, na ɛno na ɛma wotumi yɛ atutena no ho akontaabuo. Sɛ wɔkyekyɛ sika a aka no mu yɛ no asɔre a ɛwɔ mmara mu a, ɛkyerɛ sɛ asɛm biako biara nni hɔ a ɛbɛda Orchard-pool sika a aka no nyinaa adi.
3. **Akontaabuo a wɔayɛ wɔ Ironwood akyi no betumi anya wɔn safe no wɔ ɔkwan soronko so.** [ZIP 2005 na ɔkyerɛwee](https://zips.z.cash/zip-2005) de ka ho a `use_qsk` frankaa ma quantum-recoverable keys, na ɛsesa sɛnea wonya incoming, outgoing ne diversifier keys no, enti `use_qsk = true` nsafe yɛ safe ahorow a ɛsono emu biara ankasa. ZIP 326 hwehwɛ sɛ frankaa no yɛ pɛ wɔ akontaabu bi so na ɛbara sɛ wɔbɛbɔ `use_qsk = true` safoa ansa na NU6.3 ayɛ adwuma wɔ Mainnet so. Enti safoa bi a wɔde fi akontaabu bi a na ɛwɔ hɔ ansa na Ironwood reba no mu kɔ amannɔne ne a `use_qsk = false` key, na ɛkɔ so teɛ ma saa akontaabu no. Mfa no sɛ safoa bi a wɔde fi akontaabu biako mu kɔ no kyerɛkyerɛ foforo mu.

## Safoa a wɔde hwɛ nneɛma a wɔde kɔ amannɔne

### Zallet na ɔkyerɛwee

[Zallet na ɔkyerɛwee](https://github.com/zcash/zallet) yɛ full-node sika kotoku a ɛde sika kotoku a ɛwɔ zcashd mu no sii ananmu. Viewing-key export ne import duu **v0.1.0-beta.2 (28 July 2026)**, enti di kan hwɛ wo version no; adan a wɔadi kan asi no nni akwan yi. Ɛsɛ sɛ akyinnyegye biara a ɛwɔ ɔkwan din no akyi no yɛ JSON a ɛfata, a ɛkyerɛ sɛ ahama botae ahorow no sie wɔn ankasa nsɛm a wɔafa aka abien. No [Zallet Ntɛmntɛm Nhwehwɛmu Akwankyerɛ](/using-zcash/zallet-quick-reference-guide) kata ahyɛde a wɔde di dwuma wɔ ɔkwan a ɛkɔ akyiri so no so.

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

Sɛ wode Sapling address bi fa a, ɛma saa akontaabu no Sapling a wɔatrɛw mu no nyinaa hwɛ safoa no ba (`zxviews…`), a ɛne zcashd suban dedaw no hyia. Anohyeto abien a wɔakyerɛw: Wɔpow Sprout address ahorow, na wontumi mfa Sapling extended full viewing key nkɔ amannɔne mfi akontaabu a na ɛno ankasa de bae sɛ view-only, efisɛ sika kotoku no ntumi nsan nsiesie. No `ivk` fom no yɛ adwuma ma akontaabu a wɔde hwɛ nkutoo a wɔde aba.

### Walets a ɛde viewing keys fi wɔn ankasa interface so kɔ amannɔne

No [Sika kotoku](/using-zcash/wallets) krataafa no di viewing-key mmoa ne Ironwood ahoboa ma sika kotoku biara akyi. Bere a yɛrekyerɛw eyi no, sika kotoku a wɔakyerɛw viewing-key support ne **Ironwood: Ready** nyinaa bi ne ZODL, Zingo!, Zkool, Cake, Zallet, Zecd ne Nozy. Hwɛ saa kratafa no mmom sen eyi ansa na wode wo ho ato sika kotoku biako biara so, efisɛ ahoboa sesa.

## Hwɛ safoa a wode bɛba sɛ akontaabu a wɔhwɛ nkutoo

### Zkool na ɔkyerɛwee

[Zkool na ɔkyerɛwee](https://github.com/hhanh00/zkool2) yɛ ɔkwan a ɛyɛ mmerɛw sen biara wɔ ha, efisɛ egye safe a wɔaka abom ne nea ɛyɛ agyapade nso. Ne README kyerɛw akontaabu a wɔhwɛ nkutoo a wɔayɛ afi **hwɛ safoa a wɔaka abom** anaa **Sapling hwɛ safoa a wɔatrɛw mu**, a ɛka safoa a wɔatrɛw mu a wɔabɔ ho ban a ɛyɛ agyapade a wɔde fi zcashd kɔ amannɔne no ho. Fa akontaabu foforo ka ho, paw ɔkwan a wobɛfa so ahwɛ nkutoo, na fa... `uview…` or `zxviews…` safoa; afei akontaabu no yɛ sync na ɛbɔ sika a aka ne abakɔsɛm ho amanneɛ a enni tumi a wɔde di dwuma wɔ sika a wɔsɛe no mu.

Ironwood protocol mmoa ne Orchard-to-Ironwood atutena no sii fam wɔ Zkool 6.24.0 (20 Ɔpɛpɔn 2026), na 6.26.1 (2 Ɔpɛpɔn 2026) siesiee Ironwood ayɔnkofa a wɔhunu wɔ mempool no mu. Tu mmirika 6.26.1 anaa nea ɛba akyiri yi.

### Zallet na ɔkyerɛwee

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Akyinnyegye a ɛto so abien ne rescan nhyehyɛe no: `"whenkeyisnew"` (default no), . `"yes"` or `"no"`. Nea ɛto so abiɛsa ne block no sorokɔ a ɛsɛ sɛ wosan scan fi so. Zallet de safoa no ba sɛ akontaabu a wɔhwɛ nkutoo na ɛhwɛ nnwuma a ɛba ne nea efi mu ba no akyi ma ne address ahorow a enni sika a wɔsɛe no ho tumi.

**Zallet de Sapling extended full viewing keys nkutoo ba.** Ɛremfa a `uview…` unified full viewing key, ɛwom mpo sɛ ebetumi de biako akɔ amannɔne de. Sɛ wopɛ sɛ wode akenkan kwan kɔ akonta a wɔaka abom nyinaa mu a, fa UFVK no fi Zallet na fa kɔ sika kotoku a egye safe a wɔaka abom, te sɛ Zkool mu.

## Nea ɛsakrae, ne nea ɛsɛ sɛ wogyae hwehwɛ

Sɛ wudii kratafa yi dedaw bi akyi, anaasɛ ne nkyerɛase bi akyi a, akwan abiɛsa ntumi nyɛ adwuma bio.

- **`zcash-cli z_exportviewingkey` ne `z_importviewingkey`.** zcashd duu ne mmoa awiei wɔ 18 July 2026 na ɛnkɔ so bio. Zallet akwan a wɔato din saa ara ne nea wɔde besi ananmu; hwɛ [atutra ho akwankyerɛ](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **Ywallet nantew no.** Walets krataafa no hyɛ Ywallet agyirae **Ironwood: Not Ready**, enti ɛnyɛ sika kotoku a wobɛtwe adwene asi so ama nkurɔfo ma Ironwood bere so hwɛ safe. Zkool, a efi developer koro no ara mu, gye keys ahorow koro no ara na wɔahyɛ no agyirae sɛ Ready.
- **zcashblockexplorer.com/vk.** Ɔsom no san de HTTP 503 a ɛwɔ abodin krataa a enni mu ba, na wɔatow agu sen sɛ wɔde besi ananmu. Sɛ wode hwɛ safoa bi hyɛ wɛbsaet bi mu a, ɛde w’adwuma ho abakɔsɛm nyinaa ma obiara a ɔhwɛ saa wɛbsaet no so, a na ɛyɛ mmerɛw sen biara wɔ akwan abiɛsa a ɛwɔ kratafa dedaw no so bere nyinaa. Fa safoa no kɔ sika kotoku a wode di dwuma mmom mu.

## Akadeɛ

Fa safe a wɔde hwɛ nneɛma di dwuma sɛnea ɛho hia, na pɛ safe a ɛyɛ teateaa sen biara a ebua asɛmmisa a wɔrebisa no.

- [ZIP 326: NU6.3 Nea efi mu ba ma Sikakorabea](https://zips.z.cash/zip-0326) — sɛnea safe a wɔde hwɛ ade yɛ wɔn ade wɔ Orchard ne Ironwood atare no atifi
- [ZIP 229: Nkyerɛase 6 Nkitahodi Nhyehyɛe](https://zips.z.cash/zip-0229) — kyerɛkyerɛ Orchard ne Ironwood atare no mu
- [Zallet nsakraeɛ ho kyerɛwtohɔ](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — a release de kaa ho sɛ RPC kwan bɛn na
- [Zkool KENKAN NKYERƐKYERƐMU](https://github.com/hhanh00/zkool2/blob/main/README.md) — akontaabu a wɔboa ne key types
- [ECC, Nkyerɛkyerɛmu a Wɔde Hwɛ Nneɛma a Wɔde Hwɛ Nneɛma Mu](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Nneɛma a Wɔda no Adi ne Nsafo a Wɔpaw](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Nkyerɛkyerɛmu](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
