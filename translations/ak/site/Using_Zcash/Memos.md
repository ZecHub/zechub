<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Memos a wɔde kyerɛw nsɛm

## TL;DR

* Memo yɛ krataa tiawa a wode bata sikatua bi a wode kɔ address a wɔabɔ ho ban so ho. Wɔakora so, enti nnipa a wɔrehwɛ blockchain no ntumi nkenkan.
* Memo field no kura nsɛm a ɛkɔ baiti 512.
* Nkurɔfo de memos di dwuma de ka onii a ɔde sika bi kɔmaa ne nea wɔde tuaa no, anaasɛ wɔde kokoam nkrasɛm mena.
* Ka a wotua kɔ address ahorow a ɛda adi pefee so no ntumi mfa memo nkɔ.
* A [sikatua ho abisade link](/using-zcash/payment-request-uris) betumi ahyɛ memo no ma ama wo sɛnea ɛbɛyɛ a sotɔɔ bi betumi ahyɛ biribiara a wɔkra no agyirae.

## Nkyerɛkyerɛmu Titiriw

### Encrypted Memos a Wɔde Kɔma

Sɛ wode Z2Z (shielded-to-shielded) asɛm remena a, wubetumi de memo (nkrasɛm) ahyɛ asɛm no mu. Wobetumi de saa memo yi adi dwuma ama nneɛma ahorow pii.

### Nkitahodi a Wɔde Wɔn Nsa Hyɛ

Wɔde memos di dwuma titiriw de de wɔn nsa hyɛ sikatua ase. Esiane sɛ shielded transactions encrypt wo data nti, wuntumi nhu onii a ɔde ZEC kɔmaa wo ne nea ebia na ZEC no yɛ. Wɔn a wɔde di dwuma no betumi de memo field no adi dwuma de wɔn nsa ahyɛ wɔn din anaa wɔn din a wɔde frɛ wɔn ase de ama wɔn yɔnko no ahu onii ko a na asɛm no fi hɔ. Wobetumi nso akyerɛkyerɛ nea na wɔde di gua no mu.

### Nkrasɛm a Wɔde Kɔma

Ade foforo a wɔde di dwuma ma encrypted memo no ne sɛ wode nkra bɛmena obi a ɔwɔ z-addr. Saa nkrasɛm yi betumi afa biribiara ho, sɛ́ ɛyɛ a [nkaebɔ a wɔde ma n’adamfo bi](https://twitter.com/iansagstette/status/1542142468505870336) or a [nkrasɛm a ɛyɛ nkate a ɛsɛ sɛ ɛkɔ so yɛ kokoam sɛnea ɛbɛyɛ yiye biara](https://twitter.com/InsideZcash/status/1545800146352578560).

### Ɔdɔ Nsɛm a Wɔakyerɛw wɔ Blockchain no so

Na obi wɔ hɔ a ɔde ɔdɔ krataa kɔmaa wɔn hokafo wɔ blocks a edi kan wɔ Zcash blockchain no mu biako mu. Obi hui sɛ wɔn hokafo no nam Zcash memo so de fael bi amena wɔn. Ná saa fael yi yɛ tekiti a wɔde kɔ adeyɛ titiriw bi a wɔyɛe wɔ amannɔne a na ɔne ne dɔfo a ɔwɔ akyirikyiri no reka ho asɛm sɛ wɔbɛbom akɔ. Ná memo no yɛ ɔdɔ ho krataa.

## Aniwa so / Nsɛso

Fa no sɛ sikatua a wɔabɔ ho ban sɛ krataa a wɔatoto mu a sika wɔ mu. Memo no yɛ krataa a wɔabobɔw a sika no ka ho.

Blockchain no ne posɔfese no. Ɛsoa envelope no na ɛkyerɛw sɛ ɛbaa hɔ, na enmmue da. Onipa a obue envelope no kenkan krataa a wɔakyerɛw no. Katua a ɛda adi pefee yɛ postcard, enti envelope biara nni hɔ a wobetumi abɔ krataa bi mu.

## Deep Dive a Wɔde Nsu Gu Mu

### Nea ɛfata wɔ memo mu

Memo field no yɛ baiti 512 pɛpɛɛpɛ bere nyinaa. Wɔde zero bytes ahyɛ text memo tiawa bi mu ansa na wɔde encrypt, enti memo biara hwɛ ne kɛse koro wɔ nkɔnsɔnkɔnsɔn so.

Memo dodow no ara yɛ UTF-8 nkyerɛwee a ɛnyɛ den. [ZIP 302 na ɛwɔ hɔ](https://zips.z.cash/zip-0302) nso de memos a efi ase wɔ byte of `0xF5` anaa nea ɛkorɔn ma data ahorow afoforo, ne memo a ɛfa `0xF6` zeros akyi no kyerɛ "no memo".

Nneɛma biara a wɔabɔ ho ban wɔ asɛm bi mu no kura n’ankasa memo, enti asɛm biako a wotua nnipa pii ka no betumi de krataa soronko bi aka ho ama wɔn mu biara.

### Kɔ anim

> **Abakɔsɛm mu nsɛm. Saa demo yi nkɔ so bio sɛnea wɔakyerɛw no.**
>
> Demo a ɛwɔ aseɛ ha no de zcashd, na ne [script a wogye](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) kenkan memos kɔ akyiri `zcash-cli`. zcashd duu ne automatic End-of-Support halt wɔ 18 July 2026, enti saa script no ntumi nkɔ node a ɛretu mmirika, na wɔankɔ.
>
> Sɛ wokenkan shielded memos fi command line no so a, ɛda so ara yɛ adwuma wɔ Zallet: `zallet rpc z_listunspent` san de krataa a wɔabɔ ho ban biara a wagye no a ɛwɔ saa ara ba `memoStr` field a script no kenkan. Hwɛ sɛnea [Zallet Ntɛmntɛm Nhwehwɛmu Akwankyerɛ](/using-zcash/zallet-quick-reference-guide) ama ahyɛdeɛ no, ne [atutra ho akwankyerɛ a ɛkɔ Zebra ne Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) sɛ wobɛtu node bi afiri zcashd. Zallet da so ara wɔ beta mu.
>
> Wɔde ɔfã yi asie sɛ abakɔsɛm kyerɛwtohɔ a ɛfa Magic-Wormhole demo no ho.

Sɛnea wode Zcash Shielded Memos ne Magic-Wormhole CLI ne zcashd bedi dwuma de akɔma fael ahorow afi kɔmputa biako so akɔ foforo so yiye ni!

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Encrypted File Transfer with Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Nkratafa a Ɛfa Ho

- [Katua Abisade URI ahorow](/using-zcash/payment-request-uris): de memo bi to a `zcash:` link anaa QR code.
- [Nkitahodi ahorow](/using-zcash/transactions): shielded na ɛda adi pefee ayɔnkofa ahorow.
- [Atare a Wɔabɔ ho Ban](/using-zcash/shielded-pools): baabi a nsɛm a wɔakyerɛw a wɔabɔ ho ban a ɛkura memos no te.
- [Sika kotoku](/using-zcash/wallets): fa Shielded Memo filter no hwehwɛ sika kotoku a ɛboa memos.
- [Zallet Ntɛmntɛm Nhwehwɛmu Akwankyerɛ](/using-zcash/zallet-quick-reference-guide): kenkan memos a wɔagye afi ahyɛde kwan no so.
- [Zcash Nnwinnade a Wɔde Yɛ Adebɔfo](/using-zcash/creators-and-tips): tipping nnwinnade a ɛde nkrasɛm bi ka tip no ho.

### Akadeɛ

[Memo Field a Wɔabɔ no Encrypted no](https://electriccoin.co/blog/encrypted-memo-field/)

**Wɔyɛɛ no foforo nea etwa to:** October 2026
