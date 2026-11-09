<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Memo

## N'okwu nkenke

* Memo bụ note dị mkpirikpi ị na-etinye na Kwụọ ụhwọ [payment] e zigara na Adreesị akpa ego [address] nke e chebere echebe [shielded]. A na-ezo ya, ya mere ndị na-ekiri blockchain enweghị ike ịgụ ya.
* Ebe memo na-ejide ihe ederede ruru byte 512.
* Ndị mmadụ na-eji memo ekwu onye zitere Kwụọ ụhwọ na ihe e ji ya eme, ma ọ bụ izipu ozi nzuzo.
* Kwụọ ụhwọ gaa na Adreesị akpa ego Oha [transparent] enweghị ike iburu memo.
* [njikọ arịrịọ Kwụọ ụhwọ](/using-zcash/payment-request-uris) nwere ike dejupụta memo ahụ maka gị ka ụlọ ahịa nwee ike ịkpọpụta usoro ịzụta ọ bụla aha.

## Nkọwa Isi

### Izipu Memo Ederede Ezoro Ezo

Mgbe ị na-eziga Azụmahia [transaction] Z2Z (nke e chebere echebe gaa na nke e chebere echebe), ị nwere ike itinye memo (ozi) n'ime Azụmahia ahụ. Enwere ike iji memo a mee ọtụtụ ihe dị iche iche.

### Ịbanye Aha na Azụmahia

A na-eji memo eme ihe karịsịa n'ịbanye aha na Kwụọ ụhwọ. Ebe Azụmahia nke e chebere echebe na-ezo data gị, ị gaghị ahụ onye zitere gị ZEC na ihe ZEC nwere ike ịbụ maka ya. Ndị ọrụ nwere ike iji ebe memo bịanye aha ha ma ọ bụ aha nzuzo ha ka onye ha na ya na-emekọrịta mara onye Azụmahia ahụ si n'aka ya bịa. Ha nwekwara ike ịkọwa ihe Azụmahia ahụ bụ maka ya.

### Izipu Ozi

Ojiji [use case] ọzọ maka memo ezoro ezo bụ izigara mmadụ nwere z-addr ozi. Ozi ndị a nwere ike ịbụ gbasara ihe ọ bụla, ma ọ bụ [nchetara enyi](https://twitter.com/iansagstette/status/1542142468505870336) ma ọ bụ [ozi dị nzuzo nke kwesịrị ịnọgide bụrụ nke nzuzo nke ukwuu](https://twitter.com/InsideZcash/status/1545800146352578560).

### Akwụkwọ Ịhụnanya na Blockchain

E nwere otu onye zigara onye ha hụrụ n'anya akwụkwọ ịhụnanya n'otu n'ime block [block] mbụ dị na Zcash blockchain. Otu onye chọpụtara na onye ha hụrụ n'anya zitere ha faịlụ site na Zcash memo. Faịlụ a bụ tiketi maka emume pụrụ iche n'ofesi mba nke ya na onye hụrụ ya n'anya nọ n'ebe dị anya kwurịtara maka ịga ọnụ. Memo ahụ bụ akwụkwọ ịhụnanya.

## Ihe Anya / Ntụnyere

Chee Kwụọ ụhwọ nke e chebere echebe dịka envelopu e mechiri emechi nke nwere ego n'ime ya. Memo bụ note a pịakọrọ n'ime ya na ego ahụ.

Blockchain bụ ụlọ ọrụ ozi. Ọ na-eburu envelopu ahụ ma dekọọ na ọ rutere, ọ dịghịkwa emeghe ya. Onye meghere envelopu ahụ na-agụ note ahụ. Kwụọ ụhwọ Oha dị ka kaadị ozi, ya mere enweghị envelopu a ga-apịakọta note n'ime ya.

## Nkọwa Miri Emi

### Ihe dabara na memo

Ebe memo na-adị mgbe niile kpọmkwem byte 512. A na-etinye byte efu na memo ederede dị mkpirikpi tupu ezoo ya, ya mere memo ọ bụla na-adị otu nha on-chain.

Ọtụtụ memo bụ ederede UTF-8 nkịtị. [ZIP 302](https://zips.z.cash/zip-0302) na-edobekwa memo ndị na-amalite site na byte nke `0xF5` ma ọ bụ karịa maka ụdị data ndị ọzọ, memo nke `0xF6` ma byte efu soro ya pụtara …enweghị memo….

Mpụta nke e chebere echebe ọ bụla n'ime Azụmahia na-ebu memo nke ya, ya mere otu Azụmahia na-akwụ ọtụtụ mmadụ nwere ike ịgụnye note dị iche maka onye ọ bụla n'ime ha.

### Nke Elu

> **Nke akụkọ ihe mere eme. Demo a anaghịzi arụ ọrụ dịka e dere ya.**
>
> Demo dị n'okpuru na-eji zcashd, script [nnata](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) ya na-agụ memo site na `zcash-cli`. zcashd ruru nkwụsị End-of-Support akpaka ya na 18 Julaị 2026, ya mere script ahụ enweghị ike iru node na-arụ ọrụ, ebugharịbeghịkwa ya.
>
> Ịgụ memo nke e chebere echebe site na akara iwu ka na-arụ ọrụ na Zallet: `zallet rpc z_listunspent` na-eweghachi note ọ bụla nke e chebere echebe natara nwere otu ebe `memoStr` script ahụ na-agụ. Lee [Zallet Nduzi Ntụaka Ngwaahịa](/using-zcash/zallet-quick-reference-guide) maka iwu ahụ, na [nduzi mbufe gaa na Zebra na Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) iji wepụ node na zcashd. Zallet ka nọ na beta.
>
> Edebe akụkụ a dịka ndekọ akụkọ ihe mere eme nke demo Magic-Wormhole.

Nke a bụ otu esi eji Zcash Memo nke e chebere echebe na Magic-Wormhole CLI na zcashd iji zipu faịlụ n'enweghị nsogbu site n'otu kọmputa gaa na nke ọzọ!

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Nbufe Faịlụ Ezoro Ezo site na Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Peeji Ndị Metụtara

- [URI Arịrịọ Kwụọ ụhwọ](/using-zcash/payment-request-uris): tinye memo n'ime njikọ `zcash:` ma ọ bụ koodu QR.
- [Azụmahia](/using-zcash/transactions): ụdị Azụmahia nke e chebere echebe na Oha.
- [Pool nke e chebere echebe](/using-zcash/shielded-pools): ebe note nke e chebere echebe na-ebu memo bi.
- [E-akpa ego](/using-zcash/wallets): jiri nzacha Memo nke e chebere echebe chọta e-akpa ego na-akwado memo.
- [Zallet Nduzi Ntụaka Ngwaahịa](/using-zcash/zallet-quick-reference-guide): gụọ memo natara site na akara iwu.
- [Zcash Ngwá ọrụ maka Ndị Okike](/using-zcash/creators-and-tips): ngwá ọrụ inye ego nke na-ezipu ozi yana ego e nyere.

### Akụrụngwa

[Ebe Memo Ezoro Ezo](https://electriccoin.co/blog/encrypted-memo-field/)

**Emelitere ikpeazụ:** Ọktoba 2026
